// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow checks.
 * Adapted from OpenZeppelin's SafeMath library
 */
library Math {

    /**
     * @dev Returns the largest of two numbers of 256 bits.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers of 256 bits.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    function divUp(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        } else {
            return 1 + (a - 1) / b;
        }
    }
}
