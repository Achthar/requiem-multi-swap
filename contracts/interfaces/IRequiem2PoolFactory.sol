// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface IRequiem2PoolFactory {
    event PoolCreated(address indexed token0, address indexed token1, address pool, uint256 tokenWeight0, uint32 swapFee, uint256);

    function feeTo() external view returns (address);

    function formula() external view returns (address);

    function protocolFee() external view returns (uint256);

    function feeToSetter() external view returns (address);

    function getPool(
        address token0,
        address token1,
        uint256 normalizedWeight0,
        uint32 swapFeePercentage
    ) external view returns (address pool);

    function allPools(uint256) external view returns (address pool);

    function isPool(address) external view returns (bool);

    function allPoolsLength() external view returns (uint256);

    function createPool(
        address token0,
        address token1,
        uint32 normalizedWeight0,
        uint32 swapFeePercentage
    ) external returns (address pool);

    function getWeightsAndSwapFee(address pool)
        external
        view
        returns (
            uint256 tokenWeight0,
            uint256 tokenWeight1,
            uint32 swapFee
        );

    function setFeeTo(address) external;

    function setFeeToSetter(address) external;

    function setProtocolFee(uint256) external;

}
