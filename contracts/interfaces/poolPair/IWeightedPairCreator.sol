// SPDX-License-Identifier: MIT

pragma solidity >=0.8.17;

interface IWeightedPairCreator {
    function createPair() external returns (address pair);
}
