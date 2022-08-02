// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolBalanced/IBalancedPoolFactory.sol";
import "../interfaces/poolBalanced/IBalancedPoolCreator.sol";
import "../poolBase/PoolFactoryManagement.sol";

// solhint-disable max-line-length

contract BalancedPoolFactory is IBalancedPoolFactory, PoolFactoryManagement {
    IBalancedPoolCreator public swapCreator;
    bool private _initialized = false;

    function initialize(address _feeToSetter, IBalancedPoolCreator _swapCreator) public {
        require(_initialized == false, "BalancedPoolFactory: initialized");
        _poolFactoryInit(_feeToSetter, msg.sender);
        swapCreator = _swapCreator;
        _initialized = true;
    }

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external override onlyCreator returns (address swap) {
        swap = createPoolInternal(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _fee, _flashFee, _withdrawFee);
    }

    function createPoolInternal(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) public returns (address swap) {
        swap = IBalancedPoolCreator(swapCreator).create(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _fee, _flashFee, feeAmount, _withdrawFee, feeToSetter, msg.sender);
        _postCreation(swap);
        emit SwapCreated(_pooledTokens, swap, allPools.length);
    }
}
