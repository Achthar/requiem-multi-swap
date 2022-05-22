// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

import "../interfaces/IIsPair.sol";

contract RequiemMock is IIsPair {
    mapping(address => bool) public override isPair;

    function setIsPair(address pair, bool val) external {
        isPair[pair] = val;
    }
}
