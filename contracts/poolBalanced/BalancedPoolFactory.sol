// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "../interfaces/poolBalanced/IBalancedPoolFactory.sol";
import "../interfaces/poolBalanced/IBalancedPoolCreator.sol";
import "../poolBase/PoolFactoryManagement.sol";

// solhint-disable max-line-length

contract BalancedPoolFactory is IBalancedPoolFactory, PoolFactoryManagement {
    IBalancedPoolCreator public swapCreator;
    bool private _initialized = false;

    function initialize(
        IBalancedPoolCreator _swapCreator,
        address _admin,
        address _votesRegister
    ) public {
        require(_initialized == false, "BalancedPoolFactory: initialized");
        _poolFactoryInit(_admin, _votesRegister);
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
    ) external override onlyCreator whenNotPaused returns (address swap) {
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
        swap = IBalancedPoolCreator(swapCreator).create(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _fee, _flashFee, adminFee, _withdrawFee, votesRegister, msg.sender);
        _postCreation(swap);
        emit SwapCreated(_pooledTokens, swap, allPools.length);
    }

    function setSwapCreator(IBalancedPoolCreator _swapCreator) external onlyOwner {
        swapCreator = _swapCreator;
    }
}
