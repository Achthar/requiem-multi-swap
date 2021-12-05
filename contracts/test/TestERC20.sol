// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import "../RequiemERC20.sol";

contract TestERC20 is RequiemERC20 {
    constructor(uint256 _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
