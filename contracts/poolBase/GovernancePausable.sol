// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../libraries/Governable.sol";
import "../libraries/Pausable.sol";

// solhint-disable no-empty-blocks

abstract contract GovernancePausable is Governable, Pausable {
    constructor() Governable() Pausable() {}

    function pause() external onlyGovernance {
        _pause();
    }

    function unpause() external onlyGovernance {
        _unpause();
    }
}
