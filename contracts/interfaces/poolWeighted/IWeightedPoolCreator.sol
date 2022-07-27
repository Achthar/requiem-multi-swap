// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IWeightedPoolCreator {
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
    ) external returns (address);
}
