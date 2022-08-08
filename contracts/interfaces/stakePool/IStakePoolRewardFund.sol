// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IStakePoolRewardFund {
    function initialize(address _stakePool, address _timelock) external;

    function safeTransfer(address _token, address _to, uint _value) external;
}