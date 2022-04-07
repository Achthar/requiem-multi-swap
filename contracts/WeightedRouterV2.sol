// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

import "./interfaces/IRequiemWeightedPairFactoryV2.sol";
import "./interfaces/IWeightedFormulaV2.sol";
import "./interfaces/IRequiemWeightedPair.sol";
import "./interfaces/IRequiemSwap.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/ISwapRouter.sol";
import "./interfaces/IWETH.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract WeightedRouterV2 is ISwapRouter {
    address public immutable override factory;
    address public immutable override formula;
    address public immutable override WETH;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "Router: EXPIRED");
        _;
    }

    constructor(address _factory, address _WETH) {
        factory = _factory;
        formula = IRequiemWeightedPairFactoryV2(_factory).formula();
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
            IRequiemWeightedPair pairV2 = IRequiemWeightedPair(path[i]);
            address token0 = pairV2.token0();
            uint256 amountOut = amounts[i + 1];
            (uint256 amount0Out, uint256 amount1Out, address output) = input == token0 ? (uint256(0), amountOut, pairV2.token1()) : (amountOut, uint256(0), token0);
            address to = i < path.length - 1 ? path[i + 1] : _to;
            pairV2.swap(amount0Out, amount1Out, to, new bytes(0));
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
    ) public virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
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
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
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
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
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
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        // check input condition
        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");

        // tranfer amounts
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);

        // use general swap functions that do not execute the full calculation to save gas
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
        }
    }

    function onSwapETHForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable virtual ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= msg.value, "EXCESSIVE_INPUT");

        transferETHTo(amounts[0], pools[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
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
    ) external virtual ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? address(this) : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
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
    //     uint256[] memory amounts = IWeightedFormulaV2(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, swapAmount, paths);
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
        IRequiemWeightedPair pairV2 = IRequiemWeightedPair(pair);
        address token0 = pairV2.token0();

        (uint256 amount0Out, uint256 amount1Out, address output) = tokenIn == token0 ? (uint256(0), targetOutAmount, pairV2.token1()) : (targetOutAmount, uint256(0), token0);
        pairV2.swap(amount0Out, amount1Out, address(this), new bytes(0));

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
    //         (, uint256 reserveInput, uint256 reserveOutput, uint32 tokenWeightInput, uint32 tokenWeightOutput, uint32 swapFee) = IWeightedFormulaV2(formula).getFactoryReserveAndWeights(
    //             factory,
    //             pool,
    //             tokenIn
    //         );
    //         uint256 amountInput = IERC20(tokenIn).balanceOf(pool) - reserveInput;
    //         amountOutput = IWeightedFormulaV2(formula).getAmountOut(amountInput, reserveInput, reserveOutput, tokenWeightInput, tokenWeightOutput, swapFee);
    //     }
    //     uint256 balanceBefore = IERC20(tokenOut).balanceOf(address(this));
    //     (uint256 amount0Out, uint256 amount1Out) = tokenIn == IRequiemWeightedPair(pool).token0() ? (uint256(0), amountOutput) : (amountOutput, uint256(0));
    //     IRequiemWeightedPair(pool).swap(amount0Out, amount1Out, address(this), new bytes(0));
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
    //     amounts = IWeightedFormulaV2(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
    //     require(amounts[amounts.length - 1] >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    // }

    // function _calculateAmountOut(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountIn,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormulaV2(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
    // }

    // function _validateAmountIn(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     uint256 amountInMax,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormulaV2(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
    //     require(amounts[0] <= amountInMax, "Router: EXCESSIVE_INPUT_AMOUNT");
    // }

    // // the same as _validateAmountIn, just with no requirement checking
    // function _calculateAmountIn(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     address[] memory path
    // ) internal view returns (uint256[] memory amounts) {
    //     amounts = IWeightedFormulaV2(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
    // }

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
