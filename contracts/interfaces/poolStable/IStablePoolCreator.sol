// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../ERC20/IERC20.sol";

interface IStablePoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _votingRegister,
        address _creator
    ) external returns (address);
}
