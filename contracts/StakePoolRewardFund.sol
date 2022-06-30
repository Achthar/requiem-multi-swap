// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./interfaces/stakePool/IStakePoolRewardFund.sol";
import "./interfaces/stakePool/IStakePool.sol";
import "./interfaces/stakePool/IStakePoolRewardRebaser.sol";
import "./interfaces/stakePool/IStakePoolRewardMultiplier.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeMath.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/stakePool/IStakePool.sol";

contract StakePoolRewardFund is IStakePoolRewardFund {
    address public stakePool;
    address public timelock;
    bool private _initialized;

    function initialize(address _stakePool, address _timelock) external override {
        require(_initialized == false, "StakePoolRewardFund: already initialized");
        stakePool = _stakePool;
        timelock = _timelock;
        _initialized = true;
    }

    function safeTransfer(address _token, address _to, uint256 _value) external override {
        require(msg.sender == stakePool, "StakePoolRewardFund: !stakePool");
        TransferHelper.safeTransfer(_token, _to, _value);
    }

    function allowRecoverRewardToken(address _token) public view returns (bool){
        return IStakePool(stakePool).allowRecoverRewardToken(_token);
    }

    function recoverAllRewardToken(
        address _token,
        address _to
    ) external {
        recoverRewardToken(_token, _to, IERC20(address(_token)).balanceOf(address(this)));
    }

    function recoverRewardToken(
        address _token,
        address _to,
        uint256 _amount
    ) public {
        require(msg.sender == timelock, "StakePoolRewardFund: !timelock");
        require(allowRecoverRewardToken(_token), "StakePoolRewardFund: not allow recover reward token");
        TransferHelper.safeTransfer(_token, _to, _amount);
    }
}
