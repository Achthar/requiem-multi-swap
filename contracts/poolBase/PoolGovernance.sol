// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "../interfaces/IOwnable.sol";

// solhint-disable not-rely-on-time, no-inline-assembly, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract PoolGovernance {
    function transferPoolOwnership(address _pool, address _newOwner) public {
        IOwnable(_pool).transferOwnership(_newOwner);
    }
}
