// SPDX-License-Identifier: MIT

pragma solidity >=0.8.17;

import "../interfaces/ERC20/IERC20.sol";
import "../interfaces/poolBase/IFlashSwap.sol";

// solhint-disable no-empty-blocks

// simple flash swap implementation that just repays the demanded amount
// this implementation is already a router for single swaps with pools
contract RepayFlashSwapRecipient {
    constructor() {}

    function recieveSwapAmount(
        address sender,
        IERC20 tokenIn,
        IERC20,
        uint256 requiredInAmount,
        uint256,
        bytes calldata
    ) external {
        tokenIn.transferFrom(sender, msg.sender, requiredInAmount);
    }
}
