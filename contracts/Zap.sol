// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./libraries/ReentrancyGuard.sol";
import "./libraries/SafeERC20.sol";
import "./libraries/SafeMath.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/poolPair/ISwapRouter.sol";
import "./interfaces/poolPair/IWeightedPairFactory.sol";
import "./interfaces/poolPair/IWeightedPair.sol";
import "./interfaces/poolPair/IWeightedFormula.sol";
import "./libraries/TransferHelper.sol";
import "./libraries/Babylonian.sol";

// solhint-disable func-name-mixedcase, var-name-mixedcase, not-rely-on-time, avoid-tx-origin

contract Zap is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // governance
    address public governance;
    address public WETH;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    IUniswapV2Router public uniRouter;
    ISwapRouter public requiemRouter;
    IWeightedPairFactory public requiemWeightedPairFactory;
    IWeightedFormula public requiemFormula;

    mapping(address => mapping(address => address[])) public RequiemWeightedPairs; // [input -> output] => requiem pair
    uint256 public maxResidual = 100; // 1%, set 10000 to disable
    address[] public tokensResidual;

    event ZapIn(address indexed sender, address from, uint256 amtFrom, address pool, uint256 amtLp);
    event ZapOut(address indexed sender, address pool, uint256 amtLp, address to, uint256 amtTo);
    event Withdraw(address indexed token, uint256 amount, address to);
    event LogGovernance(address governance);

    receive() external payable {
        require(msg.sender != tx.origin, "Zap: Do not send ETH directly");
    }

    modifier onlyGovernance() {
        require(msg.sender == governance, "Zap: !governance");
        _;
    }

    constructor(IUniswapV2Router _uniRouter, ISwapRouter _requiemRouter) {
        governance = msg.sender;
        uniRouter = _uniRouter;
        requiemRouter = _requiemRouter;
        requiemWeightedPairFactory = IWeightedPairFactory(_requiemRouter.factory());
        requiemFormula = IWeightedFormula(_requiemRouter.formula());
        WETH = _requiemRouter.WETH();
    }

    /* ========== External Functions ========== */

    // _to: must be a pair lp
    // _from: must be in lp
    // _amounts: amount_from, _minTokenB, _minLp
    function zapInToken(
        address _from,
        uint256[] calldata amounts,
        address _to,
        bool transferResidual
    ) external nonReentrant returns (uint256 lpAmt) {
        IERC20(_from).safeTransferFrom(msg.sender, address(this), amounts[0]);
        _approveTokenIfNeeded(_from);

        if (_from == IWeightedPair(_to).token0() || _from == IWeightedPair(_to).token1()) {
            // swap half amount for other
            address other;
            uint256 sellAmount;
            {
                address token0 = IWeightedPair(_to).token0();
                address token1 = IWeightedPair(_to).token1();
                other = _from == token0 ? token1 : token0;
                sellAmount = calculateSwapInAmount(_to, _from, amounts[0], token0);
            }
            uint256 otherAmount = _swap(_from, sellAmount, other, address(this), _to);
            require(otherAmount >= amounts[1], "Zap: Insufficient Receive Amount");

            lpAmt = _pairDeposit(_to, _from, other, amounts[0] - sellAmount, otherAmount, msg.sender, requiemWeightedPairFactory.isPair(_to), transferResidual);
        } else {
            uint256 ETHAmount = _swapTokenForETH(_from, amounts[0], address(this), address(0));
            lpAmt = _swapETHToLp(IWeightedPair(_to), ETHAmount, msg.sender, 0, transferResidual);
        }

        require(lpAmt >= amounts[2], "Zap: High Slippage In");
        emit ZapIn(msg.sender, _from, amounts[0], _to, lpAmt);
        return lpAmt;
    }

    // _to: must be a pair lp
    function zapIn(
        address _to,
        uint256 _minTokenB,
        uint256 _minLp,
        bool transferResidual
    ) external payable nonReentrant returns (uint256) {
        uint256 lpAmt = _swapETHToLp(IWeightedPair(_to), msg.value, msg.sender, _minTokenB, transferResidual);
        require(lpAmt >= _minLp, "Zap: High Slippage In");
        emit ZapIn(msg.sender, WETH, msg.value, _to, lpAmt);
        return lpAmt;
    }

    // _from: must be a pair lp
    // _toToken: must be in lp
    function zapOut(
        address _from,
        uint256 amount,
        address _toToken,
        uint256 _minTokensRec
    ) public nonReentrant returns (uint256) {
        IERC20(_from).safeTransferFrom(msg.sender, address(this), amount);
        _approveTokenIfNeeded(_from);

        address token0;
        address token1;
        uint256 amountA;
        uint256 amountB;
        {
            IWeightedPair pair = IWeightedPair(_from);
            token0 = pair.token0();
            token1 = pair.token1();
            bool isRequiemWeightedPair = requiemWeightedPairFactory.isPair(_from);
            if (isRequiemWeightedPair) {
                (amountA, amountB) = requiemRouter.removeLiquidity(_from, token0, token1, amount, 1, 1, address(this), block.timestamp);
            } else {
                (amountA, amountB) = uniRouter.removeLiquidity(token0, token1, amount, 1, 1, address(this), block.timestamp);
            }
        }

        uint256 tokenBought;
        _approveTokenIfNeeded(token0);
        _approveTokenIfNeeded(token1);
        if (_toToken == ETH_ADDRESS) {
            address _lpOfFromAndTo = WETH == token0 || WETH == token1 ? _from : address(0);
            tokenBought = _swapTokenForETH(token0, amountA, address(this), _lpOfFromAndTo);
            tokenBought += _swapTokenForETH(token1, amountB, address(this), _lpOfFromAndTo);
        } else {
            address _lpOfFromAndTo = _toToken == token0 || _toToken == token1 ? _from : address(0);
            tokenBought = _swap(token0, amountA, _toToken, address(this), _lpOfFromAndTo);
            tokenBought += _swap(token1, amountB, _toToken, address(this), _lpOfFromAndTo);
        }

        require(tokenBought >= _minTokensRec, "Zap: High Slippage Out");
        if (_toToken == ETH_ADDRESS) {
            TransferHelper.safeTransferETH(msg.sender, tokenBought);
        } else {
            IERC20(_toToken).safeTransfer(msg.sender, tokenBought);
        }

        emit ZapOut(msg.sender, _from, amount, _toToken, tokenBought);
        return tokenBought;
    }

    function zapOutWithPermit(
        address _from,
        uint256 amount,
        address _toToken,
        uint256 _minTokensRec,
        uint256 _approvalAmount,
        uint256 _deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256) {
        // permit
        IWeightedPair(_from).permit(msg.sender, address(this), _approvalAmount, _deadline, v, r, s);

        return zapOut(_from, amount, _toToken, _minTokensRec);
    }

    /* ========== View Functions ===========*/
    // _from: token A
    // return amount B that will be convert from A to perform zap in
    // return amount A that will be convert to B to perform zap in
    function getAmountBToZapIn(
        address _from,
        uint256 _fromAmount,
        address lp
    ) external view returns (uint256 amountBConverted, uint256 amountASell) {
        address other;
        uint256 sellAmount;
        {
            IWeightedPair pair = IWeightedPair(lp);
            address token0 = pair.token0();
            address token1 = pair.token1();
            other = _from == token0 ? token1 : token0;
            sellAmount = calculateSwapInAmount(lp, _from, _fromAmount, token0);
        }

        address[] memory path = new address[](1);
        path[0] = lp;
        uint256[] memory amounts = requiemFormula.getFactoryAmountsOut(address(requiemWeightedPairFactory), _from, other, sellAmount, path);
        return (amounts[amounts.length - 1], sellAmount);
    }

    // _from: lp pair
    // return amountOtherSell _otherToken that will be removed from pair
    // return amountToConverted _toToken that will be converted from other
    // return amountToOrigin _toToken that will be removed from pair
    function getAmountToZapOut(
        address _from,
        uint256 amount,
        address _toToken
    )
        external
        view
        returns (
            uint256 amountOtherSell,
            uint256 amountToConverted,
            uint256 amountToOrigin
        )
    {
        address other;
        {
            IWeightedPair pair = IWeightedPair(_from);
            address token0 = pair.token0();
            address token1 = pair.token1();
            other = _toToken == token0 ? token1 : token0;
        }
        uint256 sellAmount;
        uint256 amountToRemoved;
        {
            uint256 _totalSupply = IERC20(_from).totalSupply();
            sellAmount = amount * IERC20(other).balanceOf(_from) / _totalSupply;
            amountToRemoved = amount * IERC20(_toToken).balanceOf(_from) / _totalSupply;
        }

        uint256 _amountOut = _getRemovedReserveAmountOut(_from, other, sellAmount, amountToRemoved);
        return (sellAmount, _amountOut, amountToRemoved);
    }

    function calculateSwapInAmount(
        address pair,
        address tokenIn,
        uint256 userIn,
        address pairToken0
    ) internal view returns (uint256) {
        (uint32 tokenWeight0, uint32 tokenWeight1, , ) = requiemWeightedPairFactory.getParameters(pair);

        if (tokenWeight0 == 50) {
            IWeightedPair.ReserveData memory data = IWeightedPair(pair).getReserves();
            uint256 reserveIn = tokenIn == pairToken0 ? data.reserve0 : data.reserve1;
            return (Babylonian.sqrt(reserveIn * (userIn * 3988000 + reserveIn * 3988009)) - reserveIn * 1997) / 1994;
        } else {
            uint256 otherWeight = tokenIn == pairToken0 ? uint256(tokenWeight1) : uint256(tokenWeight0);
            return (userIn * otherWeight) / 100;
        }
    }

    /* ========== Private Functions ========== */
    function _getRemovedReserveAmountOut(
        address pair,
        address tokenIn,
        uint256 sellAmount,
        uint256 amountToRemoved
    ) internal view returns (uint256) {
        (, uint256 reserveIn, uint256 reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut, uint32 swapFee) = requiemFormula.getFactoryParameters(
            address(requiemWeightedPairFactory),
            pair,
            tokenIn
        );
        return requiemFormula.getAmountOut(sellAmount, reserveIn - sellAmount, reserveOut - amountToRemoved, tokenWeightIn, tokenWeightOut, swapFee);
    }

    function _approveTokenIfNeeded(address token) private {
        if (IERC20(token).allowance(address(this), address(uniRouter)) == 0) {
            IERC20(token).approve(address(uniRouter), type(uint256).max);
        }
        if (IERC20(token).allowance(address(this), address(requiemRouter)) == 0) {
            IERC20(token).approve(address(requiemRouter), type(uint256).max);
        }
    }

    function _pairDeposit(
        address _pair,
        address _poolToken0,
        address _poolToken1,
        uint256 token0Bought,
        uint256 token1Bought,
        address receiver,
        bool isRequiemWeightedPair,
        bool transferResidual
    ) internal returns (uint256 lpAmt) {
        _approveTokenIfNeeded(_poolToken0);
        _approveTokenIfNeeded(_poolToken1);

        uint256 amountA;
        uint256 amountB;
        if (isRequiemWeightedPair) {
            (
                amountA,
                amountB,
                lpAmt
            ) = requiemRouter.addLiquidity(
                _pair, _poolToken0, _poolToken1, token0Bought, token1Bought, 1, 1, [0, type(uint256).max], receiver, block.timestamp
                );
        } else {
            (amountA, amountB, lpAmt) = uniRouter.addLiquidity(_poolToken0, _poolToken1, token0Bought, token1Bought, 1, 1, receiver, block.timestamp);
        }

        uint256 amountAResidual = token0Bought - amountA;
        if (transferResidual || amountAResidual > token0Bought * maxResidual / 10000) {
            if (amountAResidual > 0) {
                //Returning Residue in token0, if any.
                _transferToken(_poolToken0, msg.sender, amountAResidual);
            }
        }

        uint256 amountBRedisual = token1Bought - amountB;
        if (transferResidual || amountBRedisual > token1Bought * maxResidual / 10000) {
            if (amountBRedisual > 0) {
                //Returning Residue in token1, if any
                _transferToken(_poolToken1, msg.sender, amountBRedisual);
            }
        }

        return lpAmt;
    }

    function _swapETHToLp(
        IWeightedPair pair,
        uint256 amount,
        address receiver,
        uint256 _minTokenB,
        bool transferResidual
    ) private returns (uint256 lpAmt) {
        address lp = address(pair);

        // Lp
        if (pair.token0() == WETH || pair.token1() == WETH) {
            address token = pair.token0() == WETH ? pair.token1() : pair.token0();
            uint256 swapValue = calculateSwapInAmount(lp, WETH, amount, pair.token0());
            uint256 tokenAmount = _swapETHForToken(token, swapValue, address(this), lp);
            require(tokenAmount >= _minTokenB, "Zap: Insufficient Receive Amount");

            uint256 WETHAmount = amount - swapValue;
            IWETH(WETH).deposit{value: WETHAmount}();
            lpAmt = _pairDeposit(lp, WETH, token, WETHAmount, tokenAmount, receiver, requiemWeightedPairFactory.isPair(lp), transferResidual);
        } else {
            address token0 = pair.token0();
            address token1 = pair.token1();
            uint256 token0Amount;
            uint256 token1Amount;
            {
                (uint32 tokenWeight0, , , ) = requiemWeightedPairFactory.getParameters(lp);
                uint256 swap0Value = (amount * uint256(tokenWeight0)) / 100;
                token0Amount = _swapETHForToken(token0, swap0Value, address(this), address(0));
                token1Amount = _swapETHForToken(token1, amount - swap0Value, address(this), address(0));
            }

            lpAmt = _pairDeposit(lp, token0, token1, token0Amount, token1Amount, receiver, requiemWeightedPairFactory.isPair(lp), transferResidual);
        }
    }

    function _swapETHForToken(
        address token,
        uint256 value,
        address _receiver,
        address lpETHToken
    ) private returns (uint256) {
        if (token == WETH) {
            IWETH(WETH).deposit{value: value}();
            if (_receiver != address(this)) {
                IERC20(WETH).safeTransfer(_receiver, value);
            }
            return value;
        }
        address[] memory path = RequiemWeightedPairs[WETH][token];
        address[] memory tokens = new address[](2);
        tokens[0] = WETH;
        tokens[1] = token;
        uint256 amount;
        if (path.length > 0) {
            amount = requiemRouter.onSwapExactETHForTokens{value: value}(path, tokens, 1, _receiver, block.timestamp);
        } else if (lpETHToken != address(0)) {
            path = new address[](1);
            path[0] = lpETHToken;
            amount = requiemRouter.onSwapExactETHForTokens{value: value}(path, tokens, 1, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path ETHToken");
        }

        return amount;
    }

    function _swapTokenForETH(
        address token,
        uint256 amount,
        address _receiver,
        address lpTokenETH
    ) private returns (uint256 receiveAmount) {
        if (token == WETH) {
            _transferToken(WETH, _receiver, amount);
            return amount;
        }
        address[] memory path = RequiemWeightedPairs[token][WETH];
        address[] memory tokens = new address[](2);
        tokens[0] = token;
        tokens[1] = WETH;
        if (path.length > 0) {
            receiveAmount = requiemRouter.onSwapExactTokensForETH(path, tokens, amount, 1, _receiver, block.timestamp);
        } else if (lpTokenETH != address(0)) {
            path = new address[](1);
            path[0] = lpTokenETH;
            receiveAmount = requiemRouter.onSwapExactTokensForETH(path, tokens, amount, 1, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path TokenETH");
        }

        return receiveAmount;
    }

    function _swap(
        address _from,
        uint256 _amount,
        address _to,
        address _receiver,
        address _lpOfFromTo
    ) internal returns (uint256 recieveAmount) {
        if (_from == _to) {
            if (_receiver != address(this)) {
                IERC20(_from).safeTransfer(_receiver, _amount);
            }
            return _amount;
        }
        address[] memory path = RequiemWeightedPairs[_from][_to];
        address[] memory tokens = new address[](2);
        tokens[0] = _from;
        tokens[1] = _to;
        if (path.length > 0) {
            // use requiem
            recieveAmount = requiemRouter.onSwapExactTokensForTokens(path, tokens, _amount, 1, _receiver, block.timestamp);
        } else if (_lpOfFromTo != address(0)) {
            path = new address[](1);
            path[0] = _lpOfFromTo;
            recieveAmount = requiemRouter.onSwapExactTokensForTokens(path, tokens, _amount, 1, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path swap");
        }

        return recieveAmount;
    }

    function _transferToken(
        address token,
        address to,
        uint256 amount
    ) internal {
        if (amount == 0) {
            return;
        }

        if (token == WETH) {
            IWETH(WETH).withdraw(amount);
            if (to != address(this)) {
                TransferHelper.safeTransferETH(to, amount);
            }
        } else {
            IERC20(token).safeTransfer(to, amount);
        }
        return;
    }

    /* ========== RESTRICTED FUNCTIONS ========== */
    function withdraw(address to) external onlyGovernance {
        address[] memory _tokens = tokensResidual;
        withdrawToken(_tokens, to);
    }

    function withdrawToken(address[] memory tokens, address to) public onlyGovernance {
        require(to != address(0), "Zap: Invalid Receiver Address");

        for (uint256 i = 0; i < tokens.length; i++) {
            _withdraw(tokens[i], to);
        }
    }

    function withdrawTokenAmount(
        address token,
        address to,
        uint256 amount
    ) external onlyGovernance {
        require(to != address(0), "Zap: Invalid Receiver Address");
        IERC20(token).safeTransfer(to, amount);
        emit Withdraw(token, amount, to);
    }

    function _withdraw(address _token, address _to) internal {
        if (_token == ETH_ADDRESS) {
            TransferHelper.safeTransferETH(_to, address(this).balance);
            emit Withdraw(_token, address(this).balance, _to);
            return;
        }

        uint256 _balance = IERC20(_token).balanceOf(address(this));
        IERC20(_token).safeTransfer(_to, _balance);
        emit Withdraw(_token, _balance, _to);
    }

    function setTokensResidual(address[] memory _tokensResidual) external onlyGovernance {
        tokensResidual = _tokensResidual;
    }

    function addTokensResidual(address _token) external onlyGovernance {
        tokensResidual.push(_token);
    }

    function setGovernance(address _governance) external onlyGovernance {
        governance = _governance;
        emit LogGovernance(governance);
    }

    function setRequiemWeightedPairs(
        address _input,
        address _output,
        address[] memory _pair
    ) external onlyGovernance {
        RequiemWeightedPairs[_input][_output] = _pair;
    }

    function setMaxResidual(uint256 _maxResidual) external onlyGovernance {
        maxResidual = _maxResidual;
    }
}
