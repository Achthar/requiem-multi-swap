// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "./Ownable.sol";
import "./Pausable.sol";

// solhint-disable no-empty-blocks

abstract contract OwnerPausable is Ownable, Pausable {
    constructor() Ownable() Pausable() {}

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
