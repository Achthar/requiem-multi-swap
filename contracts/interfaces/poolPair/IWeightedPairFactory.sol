// SPDX-License-Identifier: MIT

pragma solidity >=0.8.16;

interface IWeightedPairFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint32 tokenWeight0);

    function formula() external view returns (address);

    function isPair(address) external view returns (bool);

    function allPairsLength() external view returns (uint256);

    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair);
}
