// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

interface IFlashSwap {
    function onFlashSwapExactIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to
    ) external returns (uint256);

    function onFlashSwapExactOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external returns (uint256);
}
