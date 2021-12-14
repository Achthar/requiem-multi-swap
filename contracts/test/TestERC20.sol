// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import "../RequiemPairERC20.sol";

contract TestERC20 is RequiemPairERC20 {
    constructor(uint256 _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
