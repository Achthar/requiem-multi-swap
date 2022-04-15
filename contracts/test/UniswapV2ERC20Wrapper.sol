// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import "../WeightedPairERC20.sol";

contract RequiemPairERC20Wrapper is WeightedPairERC20 {
    constructor(uint256 _totalSupply) {
        _mint(msg.sender, _totalSupply);
    }
}
