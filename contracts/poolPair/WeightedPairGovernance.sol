// SPDX-License-Identifier: MIT

import "../interfaces/poolPair/IPairGovernance.sol";
import "../interfaces/poolPair/IWeightedPair.sol";
import "../interfaces/poolPair/IWeightedPairFactory.sol";

pragma solidity ^0.8.17;

abstract contract WeightedPairGovernance is IPairGovernance {
    uint256 public currentVotingPeriod = 5 days;

    struct Vote {
        uint32 fee;
        uint256 amplification;
    }

    // mapping(address => Vote);

    function startVote(address _pair) public {}

    function vote(
        address _pair,
        uint32 _swapFee,
        uint32 _amplification
    ) public {}
}
