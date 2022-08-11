// SPDX-License-Identifier: MIT

pragma solidity >=0.8.16;

import "./IFlashSwapRecipient.sol";

interface IFlashSwap {
    function onFlashSwapExactIn(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to, // receiver of funds can be a different contract than the IFlashSwapRecipient
        bytes calldata data
    ) external returns (uint256);

    function onFlashSwapExactOut(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to, // receiver of funds can be a different contract than the IFlashSwapRecipient
        bytes calldata data
    ) external returns (uint256);
}
