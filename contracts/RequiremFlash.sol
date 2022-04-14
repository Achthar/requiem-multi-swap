// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./libraries/EnumerableSet.sol";
import "./RequiemWeightedPair.sol";
import "./interfaces/IBackwardFlash.sol";

using EnumerableSet for EnumerableSet.AddressSet global;

abstract contract RequiemBackFlash {
    function backwardTrade(uint256 amountOut, address[] memory backTrades) public {
    
    }
}
