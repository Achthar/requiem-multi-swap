// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolWeighted/IWeightedPoolFactory.sol";
import "../interfaces/poolWeighted/IWeightedPoolCreator.sol";
import "../libraries/SafeERC20.sol";
import "../poolBase/PoolFactoryManagement.sol";

// solhint-disable max-line-length,

contract WeightedPoolFactory is IWeightedPoolFactory, PoolFactoryManagement {
    using SafeERC20 for IERC20;
    uint256 public poolCount;

    IWeightedPoolCreator public swapCreator;
    bool private _initialized = false;

    function initialize(address _feeToSetter, IWeightedPoolCreator _swapCreator) public {
        require(_initialized == false, "WeightedPoolFactory: initialized");
        feeToSetter = _feeToSetter;
        swapCreator = _swapCreator;
        _initialized = true;
    }

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external override returns (address swap) {
        swap = createPoolInternal(_pooledTokens, decimals, normalizedWeights, lpTokenName, lpTokenSymbol, _fee, _flashFee, _withdrawFee);
    }

    function createPoolInternal(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) public returns (address swap) {
        swap = IWeightedPoolCreator(swapCreator).create(
            _pooledTokens,
            decimals,
            normalizedWeights,
            lpTokenName,
            lpTokenSymbol,
            _fee,
            _flashFee,
            feeAmount,
            _withdrawFee,
            feeToSetter,
            msg.sender
        );

        _postCreation(swap);
        emit SwapCreated(_pooledTokens, swap, allPools.length);
    }

    function setSwapCreator(IWeightedPoolCreator _swapCreator) external {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        swapCreator = _swapCreator;
    }
}
