// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ERC20/IERC20.sol";

interface ISwapCreator {

    function create(
        IERC20[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address timeLock
    ) external returns (address);
}