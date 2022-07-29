// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./UniPool.sol";
import "../interfaces/poolWeighted/IWeightedPoolCreator.sol";

contract UniPoolCreator is IWeightedPoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address _feeController,
        address _creator
    ) external override returns (address) {
        UniPool swap = new UniPool();
        swap.initialize(_pooledTokens, decimals, normalizedWeights, lpTokenName, lpTokenSymbol, _fee, _flashFee, _adminFee, _feeController, _creator);
        return address(swap);
    }
}
