// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IStakePoolCreator {
    function version() external returns (uint);

    function create() external returns (address);
    function initialize(address poolAddress, address pair, address rewardToken, address timelock, address stakePoolRewardFund, bytes calldata data) external;
}