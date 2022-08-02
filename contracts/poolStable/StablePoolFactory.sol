// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolStable/IStablePoolFactory.sol";
import "../interfaces/poolStable/IStablePoolCreator.sol";
import "../libraries/SafeERC20.sol";
import "../poolBase/PoolFactoryManagement.sol";

// solhint-disable max-line-length, no-empty-blocks

contract StablePoolFactory is IStablePoolFactory, PoolFactoryManagement {
    using SafeERC20 for IERC20;

    uint256 public poolCount;
    mapping(address => bool) private _pools;
    IStablePoolCreator public swapCreator;
    bool private _initialized = false;

    constructor() PoolFactoryManagement() {}

    function initialize(address _feeToSetter, IStablePoolCreator _swapCreator) public {
        require(_initialized == false, "StablePoolFactory: initialized");
        feeToSetter = _feeToSetter;
        swapCreator = _swapCreator;
        _initialized = true;
    }

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external override onlyCreator returns (address swap) {
        swap = createPoolInternal(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, _withdrawFee);
    }

    function createPoolInternal(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) public returns (address swap) {
        swap = IStablePoolCreator(swapCreator).create(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, feeAmount, _withdrawFee, feeToSetter, msg.sender);
        _postCreation(swap);
        emit SwapCreated(_pooledTokens, swap, allPools.length);
    }

    function setSwapCreator(IStablePoolCreator _swapCreator) external {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        swapCreator = _swapCreator;
    }
}
