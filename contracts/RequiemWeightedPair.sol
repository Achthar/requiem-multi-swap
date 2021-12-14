// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./interfaces/IRequiemWeightedPair.sol";
import "./interfaces/IRequiemSwap.sol";
import "./interfaces/IRequiemFormula.sol";
import "./RequiemPairERC20.sol";
import "./libraries/Math.sol";
import "./libraries/TransferHelper.sol";
import "./libraries/UQ112x112.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/IRequiemFactory.sol";
import "./interfaces/IUniswapV2Callee.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, avoid-low-level-calls

contract RequiemWeightedPair is IRequiemSwap, IRequiemWeightedPair, RequiemPairERC20 {
    using UQ112x112 for uint224;

    uint256 public constant MINIMUM_LIQUIDITY = 10**3;
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes("transfer(address,uint256)")));

    address public factory;
    address public token0;
    address public token1;

    uint112 private reserve0; // uses single storage slot, accessible via getReserves
    uint112 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 private blockTimestampLast; // uses single storage slot, accessible via getReserves
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    uint256 private unlocked = 1;
    address public formula;

    uint112 private collectedFee0; // uses single storage slot, accessible via getReserves
    uint112 private collectedFee1; // uses single storage slot, accessible via getReserves

    uint32 private tokenWeight0;
    uint32 private tokenWeight1;
    uint32 private swapFee;

    modifier lock() {
        require(unlocked == 1, "REQLP: LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    function getReserves()
        public
        view
        returns (
            uint112 _reserve0,
            uint112 _reserve1,
            uint32 _blockTimestampLast
        )
    {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }

    function getCollectedFees() public view returns (uint112 _collectedFee0, uint112 _collectedFee1) {
        _collectedFee0 = collectedFee0;
        _collectedFee1 = collectedFee1;
    }

    function getTokenWeights() public view returns (uint32 _tokenWeight0, uint32 _tokenWeight1) {
        _tokenWeight0 = tokenWeight0;
        _tokenWeight1 = tokenWeight1;
    }

    function getSwapFee() public view returns (uint32 _swapFee) {
        _swapFee = swapFee;
    }

    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "REQLP: TRANSFER_FAILED");
    }

    constructor() {
        factory = msg.sender;
    }

    // called once by the factory at time of deployment
    function initialize(
        address _token0,
        address _token1,
        uint32 _tokenWeight0,
        uint32 _swapFee
    ) external {
        require(msg.sender == factory, "REQLP: FORBIDDEN");
        // sufficient check
        token0 = _token0;
        token1 = _token1;
        tokenWeight0 = _tokenWeight0;
        tokenWeight1 = 100 - tokenWeight0;
        swapFee = _swapFee;
        formula = IRequiemFactory(factory).formula();
    }

    // update reserves and, on the first call per block, price accumulators
    function _update(
        uint256 balance0,
        uint256 balance1,
        uint112 _reserve0,
        uint112 _reserve1
    ) private {
        uint32 _tokenWeight0 = tokenWeight0;
        require(balance0 * (100 - _tokenWeight0) <= type(uint112).max && balance1 * _tokenWeight0 <= type(uint112).max, "REQLP: OVERFLOW");
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast;
        // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
            // * never overflows, and + overflow is desired
            uint112 mReserve0 = _reserve0 * (100 - _tokenWeight0);
            uint112 mReserve1 = _reserve1 * _tokenWeight0;
            price0CumulativeLast += uint256(UQ112x112.encode(mReserve1).uqdiv(mReserve0)) * timeElapsed;
            price1CumulativeLast += uint256(UQ112x112.encode(mReserve0).uqdiv(mReserve1)) * timeElapsed;
        }
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }

    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
        address feeTo = IRequiemFactory(factory).feeTo();
        uint112 protocolFee = uint112(IRequiemFactory(factory).protocolFee());
        feeOn = feeTo != address(0);
        (uint112 _collectedFee0, uint112 _collectedFee1) = getCollectedFees();
        if (protocolFee > 0 && feeOn && (_collectedFee0 > 0 || _collectedFee1 > 0)) {
            uint32 _tokenWeight0 = tokenWeight0;
            uint256 liquidity = IRequiemFormula(formula).mintLiquidityFee(
                totalSupply,
                _reserve0,
                _reserve1,
                _tokenWeight0,
                100 - _tokenWeight0,
                _collectedFee0 / protocolFee,
                _collectedFee1 / protocolFee
            );
            if (liquidity > 0) _mint(feeTo, liquidity);
        }
        if (_collectedFee0 > 0) collectedFee0 = 0;
        if (_collectedFee1 > 0) collectedFee1 = 0;
    }

    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint256 liquidity) {
        (uint112 _reserve0, uint112 _reserve1, ) = getReserves(); // gas savings
        uint256 balance0 = IERC20(token0).balanceOf(address(this));
        uint256 balance1 = IERC20(token1).balanceOf(address(this));
        uint256 amount0 = balance0 - _reserve0;
        uint256 amount1 = balance1 - _reserve1;
        _mintFee(_reserve0, _reserve1);
        uint256 _totalSupply = totalSupply;
        // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(0), MINIMUM_LIQUIDITY);
            // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min((amount0 * _totalSupply) / _reserve0, (amount1 * _totalSupply) / _reserve1);
        }
        require(liquidity > 0, "REQLP: INSUFFICIENT_LIQUIDITY_MINTED");
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Mint(msg.sender, amount0, amount1);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint256 amount0, uint256 amount1) {
        (uint112 _reserve0, uint112 _reserve1, ) = getReserves(); // gas savings
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        uint256 balance0 = IERC20(_token0).balanceOf(address(this));
        uint256 balance1 = IERC20(_token1).balanceOf(address(this));
        uint256 liquidity = balanceOf[address(this)];
        _mintFee(_reserve0, _reserve1);
        uint256 _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = (liquidity * balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = (liquidity * balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, "REQLP: INSUFFICIENT_LIQUIDITY_BURNED");
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Burn(msg.sender, amount0, amount1, to);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external lock {
        require(amount0Out > 0 || amount1Out > 0, "REQLP: INSUFFICIENT_OUTPUT_AMOUNT");
        uint112 _reserve0 = reserve0; // gas savings
        uint112 _reserve1 = reserve1; // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, "REQLP: INSUFFICIENT_LIQUIDITY");

        uint256 balance0;
        uint256 balance1;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "REQLP: INVALID_TO");
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint256 amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint256 amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;

        require(amount0In > 0 || amount1In > 0, "REQLP: INSUFFICIENT_INPUT_AMOUNT");
        {
            // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint256 balance0Adjusted = balance0 * 10000;
            uint256 balance1Adjusted = balance1 * 10000;
            {
                // avoids stack too deep errors
                if (amount0In > 0) {
                    uint256 amount0InFee = amount0In * swapFee;
                    balance0Adjusted -= amount0InFee;
                    collectedFee0 = uint112(uint256(collectedFee0) + amount0InFee);
                }
                if (amount1In > 0) {
                    uint256 amount1InFee = amount1In * swapFee;
                    balance1Adjusted -= amount1InFee;
                    collectedFee1 = uint112(uint256(collectedFee1) + amount1InFee);
                }
                uint32 _tokenWeight0 = tokenWeight0; // gas savings
                if (_tokenWeight0 == 50) {
                    // gas savings for pair 50/50
                    require(balance0Adjusted * balance1Adjusted >= uint256(_reserve0) * _reserve1 * (10000**2), "REQLP: K");
                } else {
                    require(IRequiemFormula(formula).ensureConstantValue(uint256(_reserve0) * 10000, uint256(_reserve1) * 10000, balance0Adjusted, balance1Adjusted, _tokenWeight0), "REQLP: K");
                }
            }
        }
        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }

    //
    function calculateSwapGivenIn(
        address tokenIn,
        address,
        uint256 amountIn
    ) external view returns (uint256) {
        (uint256 reserveIn, uint256 reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = tokenIn == token0
            ? (reserve0, reserve1, tokenWeight0, tokenWeight1)
            : (reserve1, reserve0, tokenWeight1, tokenWeight0);
        return IRequiemFormula(formula).getAmountOut(amountIn, reserveIn, reserveOut, tokenWeightIn, tokenWeightOut, swapFee);
    }

    function calculateSwapGivenOut(
        address tokenIn,
        address,
        uint256 amountOut
    ) external view returns (uint256) {
        (uint256 reserveIn, uint256 reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = tokenIn == token0
            ? (reserve0, reserve1, tokenWeight0, tokenWeight1)
            : (reserve1, reserve0, tokenWeight1, tokenWeight0);
        return IRequiemFormula(formula).getAmountIn(amountOut, reserveIn, reserveOut, tokenWeightIn, tokenWeightOut, swapFee);
    }

    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)) - reserve0);
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)) - reserve1);
    }

    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }

    // calculates output amount for given input and executes the respective trade
    // viable for use in multi swaps as it returns the output value
    // requires the amount in to be sent to this address beforehand
    function onSwapGivenIn(
        address tokenIn,
        address,
        uint256 amountIn,
        uint256,
        address to
    ) external override lock returns (uint256) {
        bool inToken0 = tokenIn == token0;
        (uint256 reserveIn, uint256 reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = inToken0
            ? (reserve0, reserve1, tokenWeight0, tokenWeight1)
            : (reserve1, reserve0, tokenWeight1, tokenWeight0);
        uint256 amountOut = IRequiemFormula(formula).getAmountOut(amountIn, reserveIn, reserveOut, tokenWeightIn, tokenWeightOut, swapFee);
        (uint256 amount0Out, uint256 amount1Out) = inToken0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
        return _swap(amount0Out, amount1Out, to);
    }

    // calculates input amount for given output and executes the respective trade
    // calling this one only makes sense if a single trade is supposd to be executed in the tx
    // requires the amount in to be sent to this address beforehand
    function onSwapGivenOut(
        address tokenIn,
        address,
        uint256 amountOut,
        uint256,
        address to
    ) external override lock returns (uint256) {
        bool inToken0 = tokenIn == token0;
        (uint256 reserveIn, uint256 reserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = tokenIn == token0
            ? (reserve0, reserve1, tokenWeight0, tokenWeight1)
            : (reserve1, reserve0, tokenWeight1, tokenWeight0);
        uint256 amountIn = IRequiemFormula(formula).getAmountIn(amountOut, reserveIn, reserveOut, tokenWeightIn, tokenWeightOut, swapFee);
        (uint256 amount0Out, uint256 amount1Out) = inToken0 ? (uint256(0), amountIn) : (amountIn, uint256(0));
        return _swap(amount0Out, amount1Out, to);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function _swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to
    ) internal returns (uint256) {
        require(amount0Out > 0 || amount1Out > 0, "REQLP: INSUFFICIENT_OUTPUT_AMOUNT");
        uint112 _reserve0 = reserve0; // gas savings
        uint112 _reserve1 = reserve1; // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, "REQLP: INSUFFICIENT_LIQUIDITY");

        uint256 balance0;
        uint256 balance1;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "REQLP: INVALID_TO");
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint256 amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint256 amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;

        require(amount0In > 0 || amount1In > 0, "REQLP: INSUFFICIENT_INPUT_AMOUNT");
        {
            // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint256 balance0Adjusted = balance0 * 10000;
            uint256 balance1Adjusted = balance1 * 10000;
            {
                // avoids stack too deep errors
                if (amount0In > 0) {
                    uint256 amount0InFee = amount0In * swapFee;
                    balance0Adjusted -= amount0InFee;
                    collectedFee0 = uint112(uint256(collectedFee0) + amount0InFee);
                }
                if (amount1In > 0) {
                    uint256 amount1InFee = amount1In * swapFee;
                    balance1Adjusted -= amount1InFee;
                    collectedFee1 = uint112(uint256(collectedFee1) + amount1InFee);
                }
                uint32 _tokenWeight0 = tokenWeight0; // gas savings
                if (_tokenWeight0 == 50) {
                    // gas savings for pair 50/50
                    require(balance0Adjusted * balance1Adjusted >= uint256(_reserve0) * _reserve1 * (10000**2), "REQLP: K");
                } else {
                    require(IRequiemFormula(formula).ensureConstantValue(uint256(_reserve0) * 10000, uint256(_reserve1) * 10000, balance0Adjusted, balance1Adjusted, _tokenWeight0), "REQLP: K");
                }
            }
        }
        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
        return amount0Out > 0 ? amount0Out : amount1Out;
    }

    // this low-level function should be called from a contract which performs important safety checks
    function onSwap(
        address tokenIn,
        address,
        uint256,
        uint256 amountOut,
        address to
    ) external override lock {
        (uint256 amount0Out, uint256 amount1Out) = token0 == tokenIn ? (uint256(0), amountOut) : (amountOut, uint256(0));
        require(amount0Out > 0 || amount1Out > 0, "REQLP: INSUFFICIENT_OUTPUT_AMOUNT");
        uint112 _reserve0 = reserve0; // gas savings
        uint112 _reserve1 = reserve1; // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, "REQLP: INSUFFICIENT_LIQUIDITY");

        uint256 balance0;
        uint256 balance1;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "REQLP: INVALID_TO");
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
        uint256 amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint256 amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;

        require(amount0In > 0 || amount1In > 0, "REQLP: INSUFFICIENT_INPUT_AMOUNT");
        {
            // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint256 balance0Adjusted = balance0 * 10000;
            uint256 balance1Adjusted = balance1 * 10000;
            {
                // avoids stack too deep errors
                if (amount0In > 0) {
                    uint256 amount0InFee = amount0In * swapFee;
                    balance0Adjusted -= amount0InFee;
                    collectedFee0 = uint112(uint256(collectedFee0) + amount0InFee);
                }
                if (amount1In > 0) {
                    uint256 amount1InFee = amount1In * swapFee;
                    balance1Adjusted -= amount1InFee;
                    collectedFee1 = uint112(uint256(collectedFee1) + amount1InFee);
                }
                uint32 _tokenWeight0 = tokenWeight0; // gas savings
                if (_tokenWeight0 == 50) {
                    // gas savings for pair 50/50
                    require(balance0Adjusted * balance1Adjusted >= uint256(_reserve0) * _reserve1 * (10000**2), "REQLP: K");
                } else {
                    require(IRequiemFormula(formula).ensureConstantValue(uint256(_reserve0) * 10000, uint256(_reserve1) * 10000, balance0Adjusted, balance1Adjusted, _tokenWeight0), "REQLP: K");
                }
            }
        }
        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
}
