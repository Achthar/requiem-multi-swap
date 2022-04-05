// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.13;

library RequiemPairErrors {
    uint8 public constant insufficientOutput = 1; // "RLP IA";
    uint8 public constant zeroAddress = 2; // "RLP ZA";
    uint8 public constant insufficientInput = 3; // "RLP II";
    uint8 public constant insufficientLiquidity = 4; // "RLP IL";
    uint8 public constant authorization = 5; //  "RLP A";
    uint8 public constant params = 6; // "RLP P";
    uint8 public constant token = 7; // "RLP T";
    uint8 public constant invariant = 8; // "K";
}
