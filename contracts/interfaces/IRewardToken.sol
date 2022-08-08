// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "./ERC20/IERC20.sol";

interface IRewardToken is IERC20 {
    function mint(address _recipient, uint256 _amount) external;
}
