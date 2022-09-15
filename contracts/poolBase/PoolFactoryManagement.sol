// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "../interfaces/poolBase/IPoolFactoryManagement.sol";
import "../interfaces/poolBase/IAdministrable.sol";
import "../interfaces/governance/IVotesRegister.sol";
import "../libraries/OwnerPausable.sol";

// solhint-disable max-line-length, no-empty-blocks

abstract contract PoolFactoryManagement is IPoolFactoryManagement, OwnerPausable {
    // default pool admin address
    address public admin;

    // admin fee set at creation - can be set by the admin
    uint256 public adminFee;

    // a list of all pools created by this factory
    address[] public override allPools;

    // default governance address assigned to created pools
    address public poolAdmin;

    // votes register infusing ERC20Votes logic to registered tokens
    address public votesRegister;

    // true if pool is deployed through this factory
    mapping(address => bool) public isPool;

    // true if address can crate pool
    mapping(address => bool) public isCreator;

    // if true, anyone can create pool
    bool public anyoneCanCreate;

    // modifier for creations of pools
    modifier onlyCreator() {
        require(anyoneCanCreate || isCreator[msg.sender], "Only creators can interact");
        _;
    }

    constructor() OwnerPausable() {
        // deployer is also a creator
        isCreator[msg.sender] = true;
        anyoneCanCreate = false;
    }

    function _poolFactoryInit(address _admin, address _votesRegister) internal {
        poolAdmin = _admin;
        // votes register cannot be changed
        votesRegister = _votesRegister;
    }

    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    function setPoolAdmin(address _newPoolAdmin) external onlyOwner {
        poolAdmin = _newPoolAdmin;
    }

    function pushCreator(address _creator) external onlyOwner {
        isCreator[_creator] = true;
    }

    function pullCreator(address _creator) external onlyOwner {
        isCreator[_creator] = false;
    }

    function setAnyoneCanCreate() external onlyOwner {
        anyoneCanCreate = true;
    }

    function unsetAnyoneCanCreate() external onlyOwner {
        anyoneCanCreate = false;
    }

    function _postCreation(address _newPool) internal {
        // set values in configuration
        allPools.push(_newPool);
        isPool[_newPool] = true;

        // moves admin rights to the admin address set in this contract
        IAdministrable(_newPool).adminInit(poolAdmin);

        // registers token in voting register
        IVotesRegister(votesRegister).registerToken(_newPool);
    }

    function getPools() external view returns (address[] memory _pools) {
        uint256 length = allPools.length;
        _pools = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _pools[i] = allPools[i];
        }
    }

    function setStandardAdminFee(uint256 _newAdminFee) external onlyOwner {
        require(_newAdminFee <= 0.5e18, "Admin fee to high");
        adminFee = _newAdminFee;
    }
}
