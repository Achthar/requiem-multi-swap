// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IBalancedPoolCreator {

    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address to
    ) external returns (address);
}