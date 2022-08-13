// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolPair/IWeightedPairCreator.sol";
import "./WeightedPair.sol";

// solhint-disable no-inline-assembly

contract RequiemPairCreator is IWeightedPairCreator {
    function createPair() external returns (address pair) {
        pair = address(new RequiemPair());
    }
}
