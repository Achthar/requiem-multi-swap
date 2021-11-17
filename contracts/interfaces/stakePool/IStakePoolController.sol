// SPDX-License-Identifier: MIT
pragma abicoder v2;
pragma solidity ^0.8.10;

interface IStakePoolController {
    event MasterCreated(address indexed farm, address indexed stakeToken, uint256 version, address timelock, address stakePoolRewardFund, uint256 totalStakePool);
    event SetWhitelistStakingFor(address indexed contractAddress, bool value);
    event SetWhitelistStakePool(address indexed contractAddress, int8 value);
    event SetStakePoolCreator(address indexed contractAddress, uint256 verion);
    event SetWhitelistRewardRebaser(address indexed contractAddress, bool value);
    event SetWhitelistRewardMultiplier(address indexed contractAddress, bool value);
    event SetStakePoolVerifier(address indexed contractAddress, bool value);
    event ChangeGovernance(address indexed governance);
    event SetFeeCollector(address indexed feeCollector);
    event SetFeeToken(address indexed token);
    event SetFeeAmount(uint256 indexed amount);
    event SetExtraFeeRate(uint256 indexed amount);

    function allStakePools(uint256) external view returns (address stakePool);

    function isStakePool(address contractAddress) external view returns (bool);

    function isStakePoolVerifier(address contractAddress) external view returns (bool);

    function isWhitelistStakingFor(address contractAddress) external view returns (bool);

    function isWhitelistStakePool(address contractAddress) external view returns (int8);

    function setStakePoolVerifier(address contractAddress, bool state) external;

    function setWhitelistStakingFor(address contractAddress, bool state) external;

    function setWhitelistStakePool(address contractAddress, int8 state) external;

    function addStakePoolCreator(address contractAddress) external;

    function isWhitelistRewardRebaser(address contractAddress) external view returns (bool);

    function isAllowEmergencyWithdrawStakePool(address _address) external view returns (bool);

    function setWhitelistRewardRebaser(address contractAddress, bool state) external;

    function isWhitelistRewardMultiplier(address contractAddress) external view returns (bool);

    function setAllowEmergencyWithdrawStakePool(address _address, bool state) external;

    function setWhitelistRewardMultiplier(address contractAddress, bool state) external;

    function setEnableWhitelistRewardRebaser(bool value) external;

    function setEnableWhitelistRewardMultiplier(bool value) external;

    function allStakePoolsLength() external view returns (uint256);

    function create(
        uint256 version,
        address stakeToken,
        address rewardToken,
        uint256 rewardFundAmount,
        uint256 delayTimeLock,
        bytes calldata data
    ) external returns (address);

    function setGovernance(address) external;

    function setFeeCollector(address _address) external;

    function setFeeToken(address _token) external;

    function setFeeAmount(uint256 _token) external;

    function setExtraFeeRate(uint256 _extraFeeRate) external;
}
