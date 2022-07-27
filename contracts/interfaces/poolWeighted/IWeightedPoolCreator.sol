// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IWeightedPoolCreator {
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
    ) external returns (address);
}
