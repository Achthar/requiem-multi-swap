// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolBase/IPoolFactoryManagement.sol";
import "../interfaces/poolBase/IGovernable.sol";
import "./GovernancePausable.sol";

// solhint-disable max-line-length, no-empty-blocks

abstract contract PoolFactoryManagement is IPoolFactoryManagement, GovernancePausable {
    address public override feeTo;
    address public override feeToSetter;
    uint256 public feeAmount;
    address[] public override allPools;

    // default governance address assigned to created pools
    address public poolGovernance;

    // true if pool is deployed through this factory
    mapping(address => bool) public isPool;

    // true if address can crate pool
    mapping(address => bool) public isCreator;

    modifier onlyCreator() {
        require(isCreator[msg.sender], "Only creators can interact");
        _;
    }

    modifier onlyFeeToSetter() {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        _;
    }

    constructor() GovernancePausable() {
        isCreator[msg.sender] = true;
    }

    function _poolFactoryInit(address _feeToSetter, address _governance) internal {
        feeToSetter = _feeToSetter;
        poolGovernance = _governance;
    }

    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    function setFeeTo(address _feeTo) external override onlyFeeToSetter {
        feeTo = _feeTo;
        emit SetFeeTo(_feeTo);
    }

    function setFeeToSetter(address _feeToSetter) external override onlyFeeToSetter {
        feeToSetter = _feeToSetter;
    }

    function setFeeAmount(uint256 _feeAmount) external override onlyFeeToSetter {
        feeAmount = _feeAmount;
        emit SetFeeAmount(_feeAmount);
    }

    function setPoolGovernance(address _newPoolGovernance) external onlyGovernance {
        poolGovernance = _newPoolGovernance;
    }

    function pushCreator(address _creator) external onlyGovernance {
        isCreator[_creator] = true;
    }

    function pullCreator(address _creator) external onlyGovernance {
        isCreator[_creator] = false;
    }

    function _postCreation(address _newPool) internal {
        allPools.push(_newPool);
        isPool[_newPool] = true;
        IGovernable(_newPool).governanceInit(poolGovernance);
    }

    function getPools() external view returns (address[] memory _pools) {
        uint256 length = allPools.length;
        _pools = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _pools[i] = allPools[i];
        }
    }
}
