// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../libraries/Administrable.sol";
import "../libraries/Pausable.sol";

// solhint-disable no-empty-blocks

abstract contract AdminPausable is Administrable, Pausable {
    constructor() Administrable() Pausable() {}

    function pause() external onlyAdmin {
        _pause();
    }

    function unpause() external onlyAdmin {
        _unpause();
    }
}
