// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import "./TestPairERC20.sol";

contract TestERC20 is TestPairERC20 {
    constructor(uint256 _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
