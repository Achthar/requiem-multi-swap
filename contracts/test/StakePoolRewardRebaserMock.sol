// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "../interfaces/stakePool/IStakePoolRewardRebaser.sol";
import "../libraries/SafeMath.sol";

// solhint-disable state-visibility

contract StakePoolRewardRebaserMock is IStakePoolRewardRebaser {
    using SafeMath for uint;
    uint rate;
    constructor (uint _rate) {
        rate = _rate;
    }
    function getRebaseAmount(address, uint baseAmount) external override view returns (uint) {
        return baseAmount.mul(rate).div(1e18);
    }
}