// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IBackwardFlash {
    function swapGivenOutFlash(
        address tokenIn,
        address tokenOut,
        uint256 outAmount,
        address receiver,
        bytes calldata swapdata
    ) external returns (uint256);
}
