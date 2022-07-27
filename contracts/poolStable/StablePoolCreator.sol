// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./StablePool.sol";
import "../interfaces/poolStable/IStablePoolCreator.sol";

contract StablePoolCreator is IStablePoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee
    ) external override returns (address) {
        StablePool swap = new StablePool();
        swap.initialize(_pooledTokens, decimals, amounts, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, _adminFee, _withdrawFee, msg.sender);
        return address(swap);
    }
}
