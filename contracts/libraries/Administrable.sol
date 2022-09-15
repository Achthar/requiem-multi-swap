// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// solhint-disable reason-string

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (a admin) that can be granted exclusive access to
 * specific functions - slightly amended from Zeppelin's Ownable
 *
 * By default, the admin account or contract will be the one that deploys the contract. This
 * can later be changed with {transferAdministration}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyAdmin`, which can be applied to your functions to restrict their use to
 * admin.
 */
abstract contract Administrable {
    address private _admin;
    bool private _initialized;

    event AdministrationTransferred(address indexed previousOwner, address indexed newAdmin);

    constructor() {
        _initialized = false;
    }

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function adminInit(address _initialAdmin) public {
        require(!_initialized, "already init");
        _admin = _initialAdmin;
        emit AdministrationTransferred(address(0), _initialAdmin);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function admin() public view virtual returns (address) {
        return _admin;
    }

    /**
     * @dev Throws if called by any account other than the admin.
     */
    modifier onlyAdmin() {
        require(admin() == msg.sender, "Administrable: caller is not admin");
        _;
    }

    /**
     * @dev Transfers admin of the contract to a new account (`newAdmin`).
     * Can only be called by the current admin.
     */
    function transferAdministration(address newAdmin) public virtual onlyAdmin {
        require(newAdmin != address(0), "Administrable: new owner is the zero address");
        _transferAdministration(newAdmin);
    }

    /**
     * @dev Transfers Administration of the contract to a new account (`newAdmin`).
     * Internal function without access restriction.
     */
    function _transferAdministration(address newAdmin) internal virtual {
        address oldAdmin = _admin;
        _admin = newAdmin;
        emit AdministrationTransferred(oldAdmin, newAdmin);
    }
}
