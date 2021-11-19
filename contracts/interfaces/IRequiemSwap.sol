// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface IRequiemSwap {
    enum SwapKind {
        GIVEN_IN,
        GIVEN_OUT
    }

    struct QSwapStep {
        uint8 structure;
        address pool;
        address tokenIn;
        address tokenOut;
    }

    struct SwapStep {
        address pool;
        address tokenIn;
        address tokenOut;
        uint256 swapAmount; // tokenInAmount / tokenOutAmount
        uint256 limitReturnAmount; // minAmountOut / maxAmountIn
        uint256 maxPrice;
    }

    function onSwap(SwapStep memory params, address to) external returns (uint256);

    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to
    ) external returns (uint256);

    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address to
    ) external returns (uint256);

    function calculateSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256);

    function calculateSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) external view returns (uint256);
}