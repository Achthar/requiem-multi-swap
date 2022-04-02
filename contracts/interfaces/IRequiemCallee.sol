// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

interface IRequiemCallee {
    function requiemCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}