// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./BalancedPool.sol";
import "../interfaces/poolBalanced/IBalancedPoolCreator.sol";

contract BalancedPoolCreator is IBalancedPoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _votingRegister,
        address _creator
    ) external override returns (address) {
        BalancedPool swap = new BalancedPool();
        swap.initialize(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _fee, _flashFee, _adminFee, _withdrawFee, _votingRegister, _creator);
        return address(swap);
    }
}
