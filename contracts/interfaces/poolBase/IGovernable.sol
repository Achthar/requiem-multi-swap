// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

interface IGovernable {
    function governanceInit(address newGovernance) external;
}
