// SPDX-License-Identifier: MIT

import "./interfaces/IPairGovernance.sol";
import "./interfaces/IRequiemWeightedPairV2.sol";

pragma solidity ^0.8.13;

abstract contract WeightedPairGovernance is IPairGovernance {

uint256 public currentVotingPeriod = 5 days;  

struct Vote{

    uint32 fee;

    uint256 amplification;
}

// mapping(address => Vote);

function startVote(address _pair) public {

}

 function vote(address _pair, uint32 _swapFee, uint32 _amplification) public {

 }
}