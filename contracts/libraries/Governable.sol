// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

// solhint-disable reason-string

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (a governance) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the governance account or contract will be the one that deploys the contract. This
 * can later be changed with {transferGovernorship}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyGovernance`, which can be applied to your functions to restrict their use to
 * governance.
 */
abstract contract Governable {
    address private _governance;
    bool private _initialized;

    event GovernorshipTransferred(address indexed previousOwner, address indexed newGovernance);

    constructor() {
        _initialized = false;
    }

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function governanceInit(address _initialGovernance) public {
        require(!_initialized, "already init");
        _governance = _initialGovernance;
        emit GovernorshipTransferred(address(0), _initialGovernance);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function governance() public view virtual returns (address) {
        return _governance;
    }

    /**
     * @dev Throws if called by any account other than the governance.
     */
    modifier onlyGovernance() {
        require(governance() == msg.sender, "Governable: caller is not governance");
        _;
    }

    /**
     * @dev Transfers governance of the contract to a new account (`newGovernance`).
     * Can only be called by the current governance.
     */
    function transferGovernorship(address newGovernance) public virtual onlyGovernance {
        require(newGovernance != address(0), "Governable: new owner is the zero address");
        _transferGovernorship(newGovernance);
    }

    /**
     * @dev Transfers Governorship of the contract to a new account (`newGovernance`).
     * Internal function without access restriction.
     */
    function _transferGovernorship(address newGovernance) internal virtual {
        address oldGovernance = _governance;
        _governance = newGovernance;
        emit GovernorshipTransferred(oldGovernance, newGovernance);
    }
}
