// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

interface IStakePoolRewardMultiplier {
    function getRewardMultiplier(uint _start, uint _end, uint _from, uint _to, uint _rewardPerSecond) external view returns (uint);
}