// SPDX-License-Identifier: MIT
pragma solidity >=0.8.12;

interface IStablePoolFactory {
    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory name,
        string memory symbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external returns (address pool);
}
