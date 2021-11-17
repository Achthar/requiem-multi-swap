// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./libraries/ReentrancyGuard.sol";
import "./libraries/SafeERC20.sol";
import "./libraries/SafeMath.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IRequiemRouterLite.sol";
import "./interfaces/IRequiemFactory.sol";
import "./interfaces/IRequiemPair.sol";
import "./interfaces/IRequiemFormula.sol";
import "./libraries/TransferHelper.sol";
import "./libraries/Babylonian.sol";

contract RequiemZap is ReentrancyGuard {
    using SafeMath for uint;
    using SafeERC20 for IERC20;

    // governance
    address public governance;
    address public WETH;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    IUniswapV2Router public uniRouter;
    IRequiemRouter public requiemRouter;
    IRequiemFactory public requiemFactory;
    IRequiemFormula public requiemFormula;

    mapping(address => mapping(address => address[])) public RequiemPairs; // [input -> output] => requiem pair
    uint public maxResidual = 100; // 1%, set 10000 to disable
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

    constructor(IUniswapV2Router _uniRouter, IRequiemRouter _requiemRouter) {
        governance = msg.sender;
        uniRouter = _uniRouter;
        requiemRouter = _requiemRouter;
        requiemFactory = IRequiemFactory(_requiemRouter.factory());
        requiemFormula = IRequiemFormula(_requiemRouter.formula());
        WETH = _requiemRouter.WETH();
    }

    /* ========== External Functions ========== */

    // _to: must be a pair lp
    // _from: must be in lp
    // _amounts: amount_from, _minTokenB, _minLp
    function zapInToken(address _from, uint[] calldata amounts, address _to, bool transferResidual) external nonReentrant returns (uint256 lpAmt) {
        IERC20(_from).safeTransferFrom(msg.sender, address(this), amounts[0]);
        _approveTokenIfNeeded(_from);

        if (_from == IRequiemPair(_to).token0() || _from == IRequiemPair(_to).token1()) {
            // swap half amount for other
            address other;
            uint256 sellAmount;
            {
                address token0 = IRequiemPair(_to).token0();
                address token1 = IRequiemPair(_to).token1();
                other = _from == token0 ? token1 : token0;
                sellAmount = calculateSwapInAmount(_to, _from, amounts[0], token0);
            }
            uint otherAmount = _swap(_from, sellAmount, other, address(this), _to);
            require(otherAmount >= amounts[1], "Zap: Insufficient Receive Amount");

            lpAmt = _pairDeposit(_to, _from, other, amounts[0].sub(sellAmount), otherAmount, msg.sender, requiemFactory.isPair(_to), transferResidual);
        } else {
            uint bnbAmount = _swapTokenForBNB(_from, amounts[0], address(this), address(0));
            lpAmt = _swapETHToLp(IRequiemPair(_to), bnbAmount, msg.sender, 0, transferResidual);
        }

        require(lpAmt >= amounts[2], "Zap: High Slippage In");
        emit ZapIn(msg.sender, _from, amounts[0], _to, lpAmt);
        return lpAmt;
    }

    // _to: must be a pair lp
    function zapIn(address _to, uint _minTokenB, uint _minLp, bool transferResidual) external payable nonReentrant returns (uint256) {
        uint256 lpAmt = _swapETHToLp(IRequiemPair(_to), msg.value, msg.sender, _minTokenB, transferResidual);
        require(lpAmt >= _minLp, "Zap: High Slippage In");
        emit ZapIn(msg.sender, WETH, msg.value, _to, lpAmt);
        return lpAmt;
    }

    // _from: must be a pair lp
    // _toToken: must be in lp
    function zapOut(address _from, uint amount, address _toToken, uint256 _minTokensRec) public nonReentrant returns (uint256) {
        IERC20(_from).safeTransferFrom(msg.sender, address(this), amount);
        _approveTokenIfNeeded(_from);

        address token0;
        address token1;
        uint256 amountA;
        uint256 amountB;
        {
            IRequiemPair pair = IRequiemPair(_from);
            token0 = pair.token0();
            token1 = pair.token1();
            bool isRequiemPair = requiemFactory.isPair(_from);
            if (isRequiemPair) {
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
            tokenBought = _swapTokenForBNB(token0, amountA, address(this), _lpOfFromAndTo);
            tokenBought = tokenBought.add(_swapTokenForBNB(token1, amountB, address(this), _lpOfFromAndTo));
        } else {
            address _lpOfFromAndTo = _toToken == token0 || _toToken == token1 ? _from : address(0);
            tokenBought = _swap(token0, amountA, _toToken, address(this), _lpOfFromAndTo);
            tokenBought = tokenBought.add(_swap(token1, amountB, _toToken, address(this), _lpOfFromAndTo));
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
        IRequiemPair(_from).permit(
            msg.sender,
            address(this),
            _approvalAmount,
            _deadline,
            v,
            r,
            s
        );

        return zapOut(_from, amount, _toToken, _minTokensRec);
    }

    /* ========== View Functions ===========*/
    // _from: token A
    // return amount B that will be convert from A to perform zap in
    // return amount A that will be convert to B to perform zap in
    function getAmountBToZapIn(address _from, uint _fromAmount, address lp) external view returns (uint256 amountBConverted, uint256 amountASell) {
        address other;
        uint sellAmount;
        {
            IRequiemPair pair = IRequiemPair(lp);
            address token0 = pair.token0();
            address token1 = pair.token1();
            other = _from == token0 ? token1 : token0;
            sellAmount = calculateSwapInAmount(lp, _from, _fromAmount, token0);
        }

        address[] memory path = new address[](1);
        path[0] = lp;
        uint[] memory amounts = requiemFormula.getFactoryAmountsOut(address(requiemFactory), _from, other, sellAmount, path);
        return (amounts[amounts.length - 1], sellAmount);
    }

    // _from: lp pair
    // return amountOtherSell _otherToken that will be removed from pair
    // return amountToConverted _toToken that will be converted from other
    // return amountToOrigin _toToken that will be removed from pair
    function getAmountToZapOut(address _from, uint amount, address _toToken) external view
    returns (uint256 amountOtherSell, uint256 amountToConverted, uint256 amountToOrigin) {
        address other;
        {
            IRequiemPair pair = IRequiemPair(_from);
            address token0 = pair.token0();
            address token1 = pair.token1();
            other = _toToken == token0 ? token1 : token0;
        }
        uint sellAmount;
        uint amountToRemoved;
        {
            uint _totalSupply = IERC20(_from).totalSupply();
            sellAmount = amount.mul(IERC20(other).balanceOf(_from)) / _totalSupply;
            amountToRemoved = amount.mul(IERC20(_toToken).balanceOf(_from)) / _totalSupply;
        }

        uint _amountOut = _getRemovedReserveAmountOut(_from, other, sellAmount, amountToRemoved);
        return (sellAmount, _amountOut, amountToRemoved);
    }

    function calculateSwapInAmount(address pair, address tokenIn, uint256 userIn, address pairToken0) internal view returns (uint256) {
        (uint32 tokenWeight0, uint32 tokenWeight1,) = requiemFactory.getWeightsAndSwapFee(pair);

        if (tokenWeight0 == 50) {
            (uint256 res0, uint256 res1,) = IRequiemPair(pair).getReserves();
            uint reserveIn = tokenIn == pairToken0 ? res0 : res1;
            return Babylonian
                .sqrt(reserveIn.mul(userIn.mul(3988000) + reserveIn.mul(3988009)))
                .sub(reserveIn.mul(1997)) / 1994;
        } else {
            uint256 otherWeight = tokenIn == pairToken0 ? uint(tokenWeight1) : uint(tokenWeight0);
            return userIn.mul(otherWeight).div(100);
        }
    }

    /* ========== Private Functions ========== */
    function _getRemovedReserveAmountOut(address pair, address tokenIn, uint sellAmount, uint amountToRemoved) internal view returns (uint) {
        (, uint reserveIn, uint reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut, uint32 swapFee) =
        requiemFormula.getFactoryReserveAndWeights(address(requiemFactory), pair, tokenIn);
        return requiemFormula.getAmountOut(sellAmount, reserveIn.sub(sellAmount), reserveOut.sub(amountToRemoved), tokenWeightIn, tokenWeightOut, swapFee);
    }

    function _approveTokenIfNeeded(address token) private {
        if (IERC20(token).allowance(address(this), address(uniRouter)) == 0) {
            IERC20(token).safeApprove(address(uniRouter), type(uint).max);
        }
        if (IERC20(token).allowance(address(this), address(requiemRouter)) == 0) {
            IERC20(token).safeApprove(address(requiemRouter), type(uint).max);
        }
    }

    function _pairDeposit(
        address _pair,
        address _poolToken0,
        address _poolToken1,
        uint256 token0Bought,
        uint256 token1Bought,
        address receiver,
        bool isRequiemPair,
        bool transferResidual
    ) internal returns (uint256 lpAmt) {
        _approveTokenIfNeeded(_poolToken0);
        _approveTokenIfNeeded(_poolToken1);

        uint256 amountA;
        uint256 amountB;
        if (isRequiemPair) {
            (amountA, amountB, lpAmt) = requiemRouter.addLiquidity(_pair, _poolToken0, _poolToken1, token0Bought, token1Bought, 1, 1, receiver, block.timestamp);
        } else {
            (amountA, amountB, lpAmt) = uniRouter.addLiquidity(_poolToken0, _poolToken1, token0Bought, token1Bought, 1, 1, receiver, block.timestamp);
        }

        uint amountAResidual = token0Bought.sub(amountA);
        if (transferResidual || amountAResidual > token0Bought.mul(maxResidual).div(10000)) {
            if (amountAResidual > 0) {
                //Returning Residue in token0, if any.
                _transferToken(_poolToken0, msg.sender, amountAResidual);
            }
        }

        uint amountBRedisual = token1Bought.sub(amountB);
        if (transferResidual || amountBRedisual > token1Bought.mul(maxResidual).div(10000)) {
            if (amountBRedisual > 0) {
                //Returning Residue in token1, if any
                _transferToken(_poolToken1, msg.sender, amountBRedisual);
            }
        }

        return lpAmt;
    }

    function _swapETHToLp(IRequiemPair pair, uint amount, address receiver, uint _minTokenB, bool transferResidual) private returns (uint256 lpAmt) {
        address lp = address(pair);

        // Lp
        if (pair.token0() == WETH || pair.token1() == WETH) {
            address token = pair.token0() == WETH ? pair.token1() : pair.token0();
            uint swapValue = calculateSwapInAmount(lp, WETH, amount, pair.token0());
            uint tokenAmount = _swapETHForToken(token, swapValue, address(this), lp);
            require(tokenAmount >= _minTokenB, "Zap: Insufficient Receive Amount");

            uint256 WETHAmount = amount.sub(swapValue);
            IWETH(WETH).deposit{value : WETHAmount}();
            lpAmt = _pairDeposit(lp, WETH, token, WETHAmount, tokenAmount, receiver, requiemFactory.isPair(lp), transferResidual);
        } else {
            address token0 = pair.token0();
            address token1 = pair.token1();
            uint token0Amount;
            uint token1Amount;
            {
                (uint32 tokenWeight0,,) = requiemFactory.getWeightsAndSwapFee(lp);
                uint swap0Value = amount.mul(uint(tokenWeight0)).div(100);
                token0Amount = _swapETHForToken(token0, swap0Value, address(this), address(0));
                token1Amount = _swapETHForToken(token1, amount.sub(swap0Value), address(this), address(0));
            }

            lpAmt = _pairDeposit(lp, token0, token1, token0Amount, token1Amount, receiver, requiemFactory.isPair(lp), transferResidual);
        }
    }

    function _swapETHForToken(address token, uint value, address _receiver, address lpBNBToken) private returns (uint) {
        if (token == WETH) {
            IWETH(WETH).deposit{value : value}();
            if (_receiver != address(this)) {
                IERC20(WETH).safeTransfer(_receiver, value);
            }
            return value;
        }
        address[] memory path = RequiemPairs[WETH][token];
        uint[] memory amounts;
        if (path.length > 0) {
            amounts = requiemRouter.swapExactETHForTokens{value : value}(token, 1, path, _receiver, block.timestamp);
        } else if (lpBNBToken != address(0)) {
            path = new address[](1);
            path[0] = lpBNBToken;
            amounts = requiemRouter.swapExactETHForTokens{value : value}(token, 1, path, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path BNBToken");
        }

        return amounts[amounts.length - 1];
    }

    function _swapTokenForBNB(address token, uint amount, address _receiver, address lpTokenBNB) private returns (uint) {
        if (token == WETH) {
            _transferToken(WETH, _receiver, amount);
            return amount;
        }
        address[] memory path = RequiemPairs[token][WETH];
        uint[] memory amounts;
        if (path.length > 0) {
            amounts = requiemRouter.swapExactTokensForETH(token, amount, 1, path, _receiver, block.timestamp);
        } else if (lpTokenBNB != address(0)) {
            path = new address[](1);
            path[0] = lpTokenBNB;
            amounts = requiemRouter.swapExactTokensForETH(token, amount, 1, path, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path TokenBNB");
        }

        return amounts[amounts.length - 1];
    }

    function _swap(address _from, uint _amount, address _to, address _receiver, address _lpOfFromTo) internal returns (uint) {
        if (_from == _to) {
            if (_receiver != address(this)) {
                IERC20(_from).safeTransfer(_receiver, _amount);
            }
            return _amount;
        }
        address[] memory path = RequiemPairs[_from][_to];
        uint[] memory amounts;
        if (path.length > 0) {// use requiem
            amounts = requiemRouter.swapExactTokensForTokens(_from, _to, _amount, 1, path, _receiver, block.timestamp);
        } else if (_lpOfFromTo != address(0)) {
            path = new address[](1);
            path[0] = _lpOfFromTo;
            amounts = requiemRouter.swapExactTokensForTokens(_from, _to, _amount, 1, path, _receiver, block.timestamp);
        } else {
            revert("RequiemZap: !path swap");
        }

        return amounts[amounts.length - 1];
    }

    function _transferToken(address token, address to, uint amount) internal {
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

    function withdrawTokenAmount(address token, address to, uint256 amount) external onlyGovernance {
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

    function setRequiemPairs(address _input, address _output, address [] memory _pair) external onlyGovernance {
        RequiemPairs[_input][_output] = _pair;
    }

    function setMaxResidual(uint _maxResidual) external onlyGovernance {
        maxResidual = _maxResidual;
    }
}
