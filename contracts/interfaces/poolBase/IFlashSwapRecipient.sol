// SPDX-License-Identifier: MIT

pragma solidity >=0.8.17;

interface IFlashSwapRecipient {
    function recieveSwapAmount(
        address sender,
        address tokenIn,
        address tokenOut,
        uint256 requiredInAmount,
        uint256 amountOut,
        bytes calldata data
    ) external;
}
