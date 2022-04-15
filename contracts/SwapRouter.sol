// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

import "./interfaces/IWeightedPairFactory.sol";
import "./interfaces/IWeightedPair.sol";
import "./interfaces/IWeightedFormula.sol";
import "./interfaces/IWeightedPairManager.sol";
import "./interfaces/ISwap.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/ISwapRouter.sol";
import "./interfaces/IWETH.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract SwapRouter is ISwapRouter {
    address public immutable override factory;
    address public immutable override formula;
    address public immutable override WETH;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    uint256 internal constant Q112 = 2**112;
    uint256 internal constant MIN_VRESERVE_RATIO = 0;
    uint256 internal constant MAX_VRESERVE_RATIO = 2**256 - 1;
    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "Router: EXPIRED");
        _;
    }

    constructor(address _factory, address _WETH) {
        factory = _factory;
        formula = IWeightedPairFactory(_factory).formula();
        WETH = _WETH;
    }

    receive() external payable {
        assert(msg.sender == WETH);
        // only accept ETH via fallback from the WETH contract
    }

    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(
        address tokenIn,
        uint256[] memory amounts,
        address[] memory path,
        address _to
    ) internal virtual {
        address input = tokenIn;
        for (uint256 i = 0; i < path.length; i++) {
            IWeightedPair pairV2 = IWeightedPair(path[i]);
            address token0 = pairV2.token0();
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out, address output) = input == token0 ? (uint256(0), amountOut, pairV2.token1()) : (amountOut, uint256(0), token0);
            address to = i < path.length - 1 ? path[i + 1] : _to;
            // pairV2.swap(amount0Out, amount1Out, to, new bytes(0));
            emit Exchange(address(pairV2), amountOut, output);
            input = output;
        }
    }

    // the onSwap functions are designed to include the stable swap
    // it currenty only allows exactIn structures
    function onSwapExactTokensForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactETHForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external payable virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = msg.value;
        transferETHTo(msg.value, pools[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactTokensForETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? address(this) : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
        transferAll(ETH_ADDRESS, to, amountLast);
    }

    // direct swap function for given exact output
    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256[] memory amounts) {
        // set amount array
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;

        // calculate all amounts to be sent and recieved
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        // check input condition
        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");

        // tranfer amounts
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);

        // use general swap functions that do not execute the full calculation to save gas
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }
    }

    function onSwapETHForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= msg.value, "EXCESSIVE_INPUT");

        transferETHTo(amounts[0], pools[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }

    function onSwapTokensForExactETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? address(this) : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }

        transferAll(ETH_ADDRESS, to, amountOut);
    }

    function transferFromAll(address token, uint256 amount) internal returns (bool) {
        if (isETH(token)) {
            IWETH(WETH).deposit{value: msg.value}();
        } else {
            TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);
        }
        return true;
    }

    function getBalance(address token) internal view returns (uint256) {
        if (isETH(token)) {
            return IWETH(WETH).balanceOf(address(this));
        } else {
            return IERC20(token).balanceOf(address(this));
        }
    }

    // function _swapSingleMixOut(
    //     address tokenIn,
    //     address tokenOut,
    //     address pool,
    //     uint256 swapAmount,
    //     uint256 limitReturnAmount
    // ) internal returns (uint256 tokenAmountIn) {
    //     address[] memory paths = new address[](1);
    //     paths[0] = pool;
    //     uint256[] memory amounts = IWeightedFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, swapAmount, paths);
    //     tokenAmountIn = amounts[0];
    //     require(tokenAmountIn <= limitReturnAmount, "Router: EXCESSIVE_INPUT_AMOUNT");
    //     _swapSingle(tokenIn, pool, tokenAmountIn, amounts[1]);
    // }

    function _swapSingle(
        address tokenIn,
        address pair,
        uint256 targetSwapAmount,
        uint256 targetOutAmount
    ) internal {
        TransferHelper.safeTransfer(tokenIn, pair, targetSwapAmount);
        IWeightedPair pairV2 = IWeightedPair(pair);
        address token0 = pairV2.token0();

        (uint256 amount0Out, uint256 amount1Out, address output) = tokenIn == token0 ? (uint256(0), targetOutAmount, pairV2.token1()) : (targetOutAmount, uint256(0), token0);
        // pairV2.swap(amount0Out, amount1Out, address(this), new bytes(0));

        emit Exchange(pair, targetOutAmount, output);
    }

    // function _swapSingleSupportFeeOnTransferTokens(
    //     address tokenIn,
    //     address tokenOut,
    //     address pool,
    //     uint256 swapAmount,
    //     uint256 limitReturnAmount
    // ) internal returns (uint256 tokenAmountOut) {
    //     TransferHelper.safeTransfer(tokenIn, pool, swapAmount);

    //     uint256 amountOutput;
    //     {
    //         (, uint256 reserveInput, uint256 reserveOutput, uint32 tokenWeightInput, uint32 tokenWeightOutput, uint32 swapFee) = IWeightedFormula(formula).getFactoryReserveAndWeights(
    //             factory,
    //             pool,
    //             tokenIn
    //         );
    //         uint256 amountInput = IERC20(tokenIn).balanceOf(pool) - reserveInput;
    //         amountOutput = IWeightedFormula(formula).getAmountOut(amountInput, reserveInput, reserveOutput, tokenWeightInput, tokenWeightOutput, swapFee);
    //     }
    //     uint256 balanceBefore = IERC20(tokenOut).balanceOf(address(this));
    //     (uint256 amount0Out, uint256 amount1Out) = tokenIn == IWeightedPair(pool).token0() ? (uint256(0), amountOutput) : (amountOutput, uint256(0));
    //     IWeightedPair(pool).swap(amount0Out, amount1Out, address(this), new bytes(0));
    //     emit Exchange(pool, amountOutput, tokenOut);

    //     tokenAmountOut = IERC20(tokenOut).balanceOf(address(this)) - balanceBefore;
    //     require(tokenAmountOut >= limitReturnAmount, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    // }

    // function _validateAmountOut(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountIn,
    //     uint256 amountOutMin,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormula(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
    //     require(amounts[amounts.length - 1] >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    // }

    // function _calculateAmountOut(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountIn,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormula(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
    // }

    // function _validateAmountIn(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     uint256 amountInMax,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
    //     require(amounts[0] <= amountInMax, "Router: EXCESSIVE_INPUT_AMOUNT");
    // }

    // // the same as _validateAmountIn, just with no requirement checking
    // function _calculateAmountIn(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
    // }

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
        address pair,
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256[2] memory vReserveRatioBounds
    ) internal virtual returns (uint256 amountA, uint256 amountB) {
        (uint256 reserveA, uint256 reserveB, uint256 vReserveA, uint256 vReserveB) = IWeightedFormula(formula).getReserves(pair, tokenA, tokenB);
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
        } else {
            uint256 amountBOptimal = IWeightedFormula(formula).quote(amountADesired, reserveA, reserveB);
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, "Router: INSUFFICIENT_B_AMOUNT");
                (amountA, amountB) = (amountADesired, amountBOptimal);
            } else {
                uint256 amountAOptimal = IWeightedFormula(formula).quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, "Router: INSUFFICIENT_A_AMOUNT");
                (amountA, amountB) = (amountAOptimal, amountBDesired);
            }
            uint256 currentRate = (vReserveB * Q112) / vReserveA;
            require(currentRate >= vReserveRatioBounds[0] && currentRate <= vReserveRatioBounds[1], "Router: OUT_OF_BOUNDS_VRESERVE");
        }
    }

    function _addLiquidityToken(
        address pair,
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256[2] memory vReserveRatioBounds
    ) internal returns (uint256 amountA, uint256 amountB) {
        (amountA, amountB) = _addLiquidity(pair, tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, vReserveRatioBounds);
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
    }

    function createPair(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB,
        uint32 tokenWeightA,
        uint32 swapFee,
        uint32 amplification,
        address to
    ) public virtual override returns (uint256 liquidity) {
        address pair = IWeightedPairFactory(factory).createPair(tokenA, tokenB, tokenWeightA, swapFee, amplification);
        uint256[2] memory vReserveRatioBounds = [MIN_VRESERVE_RATIO, MAX_VRESERVE_RATIO];
        _addLiquidityToken(pair, tokenA, tokenB, amountA, amountB, 0, 0, vReserveRatioBounds);
        liquidity = IWeightedPair(pair).mint(to);
    }

    function addLiquidity(
        address pair,
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        uint256[2] memory vReserveRatioBounds,
        address to,
        uint256 deadline
    )
        external
        virtual
        override
        ensure(deadline)
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        )
    {
        (amountA, amountB) = _addLiquidityToken(pair, tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, vReserveRatioBounds);
        liquidity = IWeightedPair(pair).mint(to);
    }

    function _addLiquidityETH(
        address pair,
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        uint256[2] memory vReserveRatioBounds,
        address to
    )
        internal
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        )
    {
        (amountToken, amountETH) = _addLiquidity(pair, token, WETH, amountTokenDesired, msg.value, amountTokenMin, amountETHMin, vReserveRatioBounds);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        transferETHTo(amountETH, pair);
        liquidity = IWeightedPair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }

    function createPairETH(
        address token,
        uint256 amountToken,
        uint32 tokenWeight,
        uint32 swapFee,
        uint32 amplification,
        address to
    ) public payable virtual override returns (uint256 liquidity) {
        address pair = IWeightedPairFactory(factory).createPair(token, WETH, tokenWeight, swapFee, amplification);
        uint256[2] memory vReserveRatioBounds = [MIN_VRESERVE_RATIO, MAX_VRESERVE_RATIO];
        (, , liquidity) = _addLiquidityETH(pair, token, amountToken, 0, 0, vReserveRatioBounds, to);
    }

    function addLiquidityETH(
        address pair,
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        uint256[2] memory vReserveRatioBounds,
        address to,
        uint256 deadline
    )
        public
        payable
        virtual
        override
        ensure(deadline)
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        )
    {
        (amountToken, amountETH, liquidity) = _addLiquidityETH(pair, token, amountTokenDesired, amountTokenMin, amountETHMin, vReserveRatioBounds, to);
    }

    // **** REMOVE LIQUIDITY ****
    function _removeLiquidity(
        address pair,
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to
    ) internal returns (uint256 amountA, uint256 amountB) {
        require(IWeightedPairFactory(factory).isPair(pair), "Router: Invalid pair");
        IWeightedPair(pair).transferFrom(msg.sender, pair, liquidity);
        // send liquidity to pair
        (uint256 amount0, uint256 amount1) = IWeightedPair(pair).burn(to);
        (address token0, ) = IWeightedFormula(formula).sortTokens(tokenA, tokenB);
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
        require(amountA >= amountAMin, "Router: INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "Router: INSUFFICIENT_B_AMOUNT");
    }

    function removeLiquidity(
        address pair,
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountA, uint256 amountB) {
        (amountA, amountB) = _removeLiquidity(pair, tokenA, tokenB, liquidity, amountAMin, amountBMin, to);
    }

    function removeLiquidityETH(
        address pair,
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountToken, uint256 amountETH) {
        (amountToken, amountETH) = _removeLiquidity(pair, token, WETH, liquidity, amountTokenMin, amountETHMin, address(this));
        TransferHelper.safeTransfer(token, to, amountToken);
        transferAll(ETH_ADDRESS, to, amountETH);
    }

    function removeLiquidityWithPermit(
        address pair,
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override ensure(deadline) returns (uint256 amountA, uint256 amountB) {
        {
            uint256 value = approveMax ? type(uint256).max : liquidity;
            IWeightedPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        }
        (amountA, amountB) = _removeLiquidity(pair, tokenA, tokenB, liquidity, amountAMin, amountBMin, to);
    }

    function removeLiquidityETHWithPermit(
        address pair,
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint256 amountToken, uint256 amountETH) {
        uint256 value = approveMax ? type(uint256).max : liquidity;
        IWeightedPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(pair, token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address pair,
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256 amountETH) {
        (, amountETH) = removeLiquidity(pair, token, WETH, liquidity, amountTokenMin, amountETHMin, address(this), deadline);
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        transferAll(ETH_ADDRESS, to, amountETH);
    }

    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address pair,
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external virtual override returns (uint256 amountETH) {
        uint256 value = approveMax ? type(uint256).max : liquidity;
        IWeightedPair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(pair, token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }

    function transferETHTo(uint256 amount, address to) internal {
        IWETH(WETH).deposit{value: amount}();
        assert(IWETH(WETH).transfer(to, amount));
    }

    function transferAll(
        address token,
        address to,
        uint256 amount
    ) internal returns (bool) {
        if (amount == 0) {
            return true;
        }

        if (isETH(token)) {
            IWETH(WETH).withdraw(amount);
            TransferHelper.safeTransferETH(to, amount);
        } else {
            TransferHelper.safeTransfer(token, to, amount);
        }
        return true;
    }

    function isETH(address token) internal pure returns (bool) {
        return (token == ETH_ADDRESS);
    }
}
