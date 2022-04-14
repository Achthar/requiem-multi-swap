// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IBackwardFlash {

    function swapGivenOutFlash(uint256 outAmount, address[] memory swaps) external;
}
