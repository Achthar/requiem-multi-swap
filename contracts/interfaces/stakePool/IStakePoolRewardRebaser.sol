// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IStakePoolRewardRebaser {
    function getRebaseAmount(address rewardToken, uint baseAmount) external view returns (uint);
}