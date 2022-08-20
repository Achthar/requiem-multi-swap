// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

// solhint-disable no-empty-blocks

// votes register that does nothing
contract MockVotesRegister {
    function onMint(address account, uint256 amount) external {}

    function onBurn(address account, uint256 amount) external {}

    function onAfterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) external {}

    function registerToken(address token) external {}
}
