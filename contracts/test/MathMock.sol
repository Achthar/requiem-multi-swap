// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "../libraries/math/weighted/LogExpMath.sol";
import "../libraries/math/ExpMath.sol";

contract MathMock {
    uint256 public expStorePRB;

    int256 public expStoreWeighted;

    uint256 public powStorePRB;

    uint256 public powStoreWeighted;

    function powWeighted(uint256 x, uint256 y) external pure returns (uint256) {
        return LogExpMath.pow(x, y);
    }

    function powPRB(uint256 x, uint256 y) external pure returns (uint256) {
        return ExpMath.pow(x, y);
    }

    function writePowWeighted(uint256 x, uint256 y) external {
        powStoreWeighted = LogExpMath.pow(x, y);
    }

    function writePowPRB(uint256 x, uint256 y) external {
        powStorePRB = ExpMath.pow(x, y);
    }
}
