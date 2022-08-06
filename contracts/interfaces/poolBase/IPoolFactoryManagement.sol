// SPDX-License-Identifier: MIT
pragma solidity >=0.8.12;

interface IPoolFactoryManagement {
    event SwapCreated(address[] pooledTokens, address indexed swap, uint256 length);
    event SetFeeTo(address indexed feeTo);
    event SetFeeToken(address indexed token);
    event SetFeeAmount(uint256 indexed amount);

    function allPools(uint256) external view returns (address pool);

    function isPool(address) external view returns (bool);

    function allPoolsLength() external view returns (uint256);
}
