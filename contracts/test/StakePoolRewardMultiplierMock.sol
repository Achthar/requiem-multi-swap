// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "../interfaces/stakePool/IStakePoolRewardMultiplier.sol";
import "../libraries/SafeMath.sol";

// solhint-disable state-visibility

contract StakePoolRewardMultiplierMock is IStakePoolRewardMultiplier {
    using SafeMath for uint;
    uint rate;
    constructor (uint _rate) {
        rate = _rate;
    }
    function getRewardMultiplier(uint, uint, uint _from, uint _to, uint _rewardPerBlock) external override view returns (uint) {
        return _to.sub(_from).mul(_rewardPerBlock) .mul(rate).div(1e18);
    }
}