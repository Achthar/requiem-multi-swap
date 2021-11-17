// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import "../RequiemERC20.sol";

contract RequiemERC20Wrapper is RequiemERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}
