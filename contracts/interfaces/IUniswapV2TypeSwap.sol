// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

interface IUniswapV2TypeSwap {
    /**
    * @notice The classic UniswapV2 interface. Due to its widely used integrations, it is always usefult to have,
    * even though regular implementations lack efficiency when using in standard swap routing
    * The core utility in the requirem framework is the flash swap feature
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes memory data
    ) external returns (uint256);
}