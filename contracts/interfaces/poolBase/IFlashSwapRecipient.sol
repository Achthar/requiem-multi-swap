// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

import "../../interfaces/ERC20/IERC20.sol";

interface IFlashSwapRecipient {
    function recieveSwapAmount(
        address sender,
        IERC20 tokenIn,
        IERC20 tokenOut,
        uint256 requiredInAmount,
        uint256 amountOut
    ) external;
}
