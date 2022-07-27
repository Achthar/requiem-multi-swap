// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./WeightedPool.sol";
import "../interfaces/poolWeighted/IWeightedPoolCreator.sol";

contract WeightedPoolCreator is IWeightedPoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        uint256[] memory _amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address _to
    ) external override returns (address) {
        WeightedPool swap = new WeightedPool();
        swap.initialize(_pooledTokens, decimals, normalizedWeights, _amounts, lpTokenName, lpTokenSymbol, _fee, _flashFee, _adminFee, _to);
        return address(swap);
    }
}
