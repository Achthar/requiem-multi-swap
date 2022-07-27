// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./BalancedPool.sol";
import "../interfaces/poolBalanced/IBalancedPoolCreator.sol";

contract BalancedPoolCreator is IBalancedPoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address to
    ) external override returns (address) {
        BalancedPool swap = new BalancedPool();
        swap.initialize(_pooledTokens, decimals,amounts, lpTokenName, lpTokenSymbol, _fee, _flashFee, _adminFee, to);
        return address(swap);
    }
}
