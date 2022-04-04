// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

import "./interfaces/IRequiemWeightedPairFactory.sol";
import "./interfaces/IRequiemFormula.sol";
import "./interfaces/IRequiemWeightedPair.sol";
import "./interfaces/IRequiemSwap.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/IRequiemQRouter.sol";
import "./interfaces/IWETH.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract RequiemQRouterV2 is IRequiemQRouter {
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
        formula = IRequiemWeightedPairFactory(_factory).formula();
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

    function swapExactTokensForTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path,
        address to,
        uint256 deadline
    ) public virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountOut(tokenIn, tokenOut, amountIn, amountOutMin, path);
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amounts[0]);
        _swap(tokenIn, amounts, path, to);
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

    function swapTokensForExactTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountIn(tokenIn, tokenOut, amountOut, amountInMax, path);

        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amounts[0]);
        _swap(tokenIn, amounts, path, to);
    }

    function swapExactETHForTokens(
        address tokenOut,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountOut(WETH, tokenOut, msg.value, amountOutMin, path);

        transferETHTo(amounts[0], path[0]);
        _swap(WETH, amounts, path, to);
    }

    function swapTokensForExactETH(
        address tokenIn,
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountIn(tokenIn, WETH, amountOut, amountInMax, path);

        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amounts[0]);
        _swap(tokenIn, amounts, path, address(this));
        transferAll(ETH_ADDRESS, to, amounts[amounts.length - 1]);
    }

    function swapExactTokensForETH(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountOut(tokenIn, WETH, amountIn, amountOutMin, path);

        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amounts[0]);
        _swap(tokenIn, amounts, path, address(this));
        transferAll(ETH_ADDRESS, to, amounts[amounts.length - 1]);
    }

    function swapETHForExactTokens(
        address tokenOut,
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) returns (uint256[] memory amounts) {
        amounts = _validateAmountIn(WETH, tokenOut, amountOut, msg.value, path);

        transferETHTo(amounts[0], path[0]);
        _swap(WETH, amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }

    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(
        address tokenIn,
        address[] memory path,
        address _to
    ) internal virtual {
        address input = tokenIn;
        for (uint256 i; i < path.length; i++) {
            IRequiemWeightedPair pair = IRequiemWeightedPair(path[i]);
            uint256 amountInput;
            uint256 amountOutput;
            address currentOutput;
            {
                (address output, uint256 reserveInput, uint256 reserveOutput, uint32 tokenWeightInput, uint32 tokenWeightOutput, uint32 swapFee) = IRequiemFormula(formula).getFactoryReserveAndWeights(
                    factory,
                    address(pair),
                    input
                );
                amountInput = IERC20(input).balanceOf(address(pair)) - reserveInput;
                amountOutput = IRequiemFormula(formula).getAmountOut(amountInput, reserveInput, reserveOutput, tokenWeightInput, tokenWeightOutput, swapFee);
                currentOutput = output;
            }
            (uint256 amount0Out, uint256 amount1Out) = input == pair.token0() ? (uint256(0), amountOutput) : (amountOutput, uint256(0));
            address to = i < path.length - 1 ? path[i + 1] : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
            emit Exchange(address(pair), amountOutput, currentOutput);
            input = currentOutput;
        }
    }

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amountIn);
        uint256 balanceBefore = IERC20(tokenOut).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(tokenIn, path, to);
        require(IERC20(tokenOut).balanceOf(to) - balanceBefore >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        address tokenOut,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable virtual override ensure(deadline) {
        //            require(path[0] == WETH, "Router: INVALID_PATH");
        uint256 amountIn = msg.value;
        transferETHTo(amountIn, path[0]);
        uint256 balanceBefore = IERC20(tokenOut).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(WETH, path, to);
        require(IERC20(tokenOut).balanceOf(to) - balanceBefore >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, path[0], amountIn);
        _swapSupportingFeeOnTransferTokens(tokenIn, path, address(this));
        uint256 amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
        transferAll(ETH_ADDRESS, to, amountOut);
    }

    function multihopBatchSwapExactIn(
        Swap[][] memory swapSequences,
        address tokenIn,
        address tokenOut,
        uint256 totalAmountIn,
        uint256 minTotalAmountOut,
        uint256 deadline
    ) public payable virtual override ensure(deadline) returns (uint256 totalAmountOut) {
        transferFromAll(tokenIn, totalAmountIn);
        uint256 balanceBefore;
        if (!isETH(tokenOut)) {
            balanceBefore = IERC20(tokenOut).balanceOf(msg.sender);
        }

        for (uint256 i = 0; i < swapSequences.length; i++) {
            uint256 tokenAmountOut;
            for (uint256 k = 0; k < swapSequences[i].length; k++) {
                Swap memory swap = swapSequences[i][k];
                if (k > 0) {
                    // Makes sure that on the second swap the output of the first was used
                    // so there is not intermediate token leftover
                    swap.swapAmount = tokenAmountOut;
                }
                tokenAmountOut = _swapSingleSupportFeeOnTransferTokens(swap.tokenIn, swap.tokenOut, swap.pool, swap.swapAmount, swap.limitReturnAmount);
            }

            // This takes the amountOut of the last swap
            tokenAmountOut += totalAmountOut;
        }

        transferAll(tokenOut, msg.sender, totalAmountOut);
        transferAll(tokenIn, msg.sender, getBalance(tokenIn));

        if (isETH(tokenOut)) {
            require(totalAmountOut >= minTotalAmountOut, "ERR_LIMIT_OUT");
        } else {
            require(IERC20(tokenOut).balanceOf(msg.sender) - balanceBefore >= minTotalAmountOut, "<minTotalAmountOut");
        }
    }

    function multihopBatchSwapExactOut(
        Swap[][] memory swapSequences,
        address tokenIn,
        address tokenOut,
        uint256 maxTotalAmountIn,
        uint256 deadline
    ) public payable virtual override ensure(deadline) returns (uint256 totalAmountIn) {
        transferFromAll(tokenIn, maxTotalAmountIn);

        for (uint256 i = 0; i < swapSequences.length; i++) {
            uint256 tokenAmountInFirstSwap;
            // Specific code for a simple swap and a multihop (2 swaps in sequence)
            if (swapSequences[i].length == 1) {
                Swap memory swap = swapSequences[i][0];
                tokenAmountInFirstSwap = _swapSingleMixOut(swap.tokenIn, swap.tokenOut, swap.pool, swap.swapAmount, swap.limitReturnAmount);
            } else {
                // Consider we are swapping A -> B and B -> C. The goal is to buy a given amount
                // of token C. But first we need to buy B with A so we can then buy C with B
                // To get the exact amount of C we then first need to calculate how much B we"ll need:
                uint256 intermediateTokenAmount;
                // This would be token B as described above
                Swap memory secondSwap = swapSequences[i][1];
                {
                    address[] memory paths = new address[](1);
                    paths[0] = secondSwap.pool;
                    uint256[] memory amounts = IRequiemFormula(formula).getFactoryAmountsIn(factory, secondSwap.tokenIn, secondSwap.tokenOut, secondSwap.swapAmount, paths);
                    intermediateTokenAmount = amounts[0];
                    require(intermediateTokenAmount <= secondSwap.limitReturnAmount, "Router: EXCESSIVE_INPUT_AMOUNT");
                }

                //// Buy intermediateTokenAmount of token B with A in the first pool
                Swap memory firstSwap = swapSequences[i][0];
                tokenAmountInFirstSwap = _swapSingleMixOut(firstSwap.tokenIn, firstSwap.tokenOut, firstSwap.pool, intermediateTokenAmount, firstSwap.limitReturnAmount);

                //// Buy the final amount of token C desired
                _swapSingle(secondSwap.tokenIn, secondSwap.pool, intermediateTokenAmount, secondSwap.swapAmount);
            }

            totalAmountIn += tokenAmountInFirstSwap;
        }

        require(totalAmountIn <= maxTotalAmountIn, "ERR_LIMIT_IN");

        transferAll(tokenOut, msg.sender, getBalance(tokenOut));
        transferAll(tokenIn, msg.sender, getBalance(tokenIn));
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

    function _swapSingleMixOut(
        address tokenIn,
        address tokenOut,
        address pool,
        uint256 swapAmount,
        uint256 limitReturnAmount
    ) internal returns (uint256 tokenAmountIn) {
        address[] memory paths = new address[](1);
        paths[0] = pool;
        uint256[] memory amounts = IRequiemFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, swapAmount, paths);
        tokenAmountIn = amounts[0];
        require(tokenAmountIn <= limitReturnAmount, "Router: EXCESSIVE_INPUT_AMOUNT");
        _swapSingle(tokenIn, pool, tokenAmountIn, amounts[1]);
    }

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

    function _swapSingleSupportFeeOnTransferTokens(
        address tokenIn,
        address tokenOut,
        address pool,
        uint256 swapAmount,
        uint256 limitReturnAmount
    ) internal returns (uint256 tokenAmountOut) {
        TransferHelper.safeTransfer(tokenIn, pool, swapAmount);

        uint256 amountOutput;
        {
            (, uint256 reserveInput, uint256 reserveOutput, uint32 tokenWeightInput, uint32 tokenWeightOutput, uint32 swapFee) = IRequiemFormula(formula).getFactoryReserveAndWeights(
                factory,
                pool,
                tokenIn
            );
            uint256 amountInput = IERC20(tokenIn).balanceOf(pool) - reserveInput;
            amountOutput = IRequiemFormula(formula).getAmountOut(amountInput, reserveInput, reserveOutput, tokenWeightInput, tokenWeightOutput, swapFee);
        }
        uint256 balanceBefore = IERC20(tokenOut).balanceOf(address(this));
        (uint256 amount0Out, uint256 amount1Out) = tokenIn == IRequiemWeightedPair(pool).token0() ? (uint256(0), amountOutput) : (amountOutput, uint256(0));
        IRequiemWeightedPair(pool).swap(amount0Out, amount1Out, address(this), new bytes(0));
        emit Exchange(pool, amountOutput, tokenOut);

        tokenAmountOut = IERC20(tokenOut).balanceOf(address(this)) - balanceBefore;
        require(tokenAmountOut >= limitReturnAmount, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function _validateAmountOut(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address[] memory path
    ) internal view returns (uint256[] memory amounts) {
        amounts = IRequiemFormula(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, "Router: INSUFFICIENT_OUTPUT_AMOUNT");
    }

    function _calculateAmountOut(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address[] memory path
    ) internal view returns (uint256[] memory amounts) {
        amounts = IRequiemFormula(formula).getFactoryAmountsOut(factory, tokenIn, tokenOut, amountIn, path);
    }

    function _validateAmountIn(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address[] memory path
    ) internal view returns (uint256[] memory amounts) {
        amounts = IRequiemFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
        require(amounts[0] <= amountInMax, "Router: EXCESSIVE_INPUT_AMOUNT");
    }

    // the same as _validateAmountIn, just with no requirement checking
    function _calculateAmountIn(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address[] memory path
    ) internal view returns (uint256[] memory amounts) {
        amounts = IRequiemFormula(formula).getFactoryAmountsIn(factory, tokenIn, tokenOut, amountOut, path);
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
