// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

interface IStablePoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _feeController,
        address _creator
    ) external returns (address);
}
