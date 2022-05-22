// SPDX-License-Identifier: MIT

import "./IWeightedPairManager.sol";

pragma solidity ^0.8.14;

// solhint-disable func-name-mixedcase

interface ISwapRouter is IWeightedPairManager {
    event Exchange(address pair, uint256 amountOut, address output);
    struct Swap {
        address pool;
        address tokenIn;
        address tokenOut;
        uint256 swapAmount; // tokenInAmount / tokenOutAmount
        uint256 limitReturnAmount; // minAmountOut / maxAmountIn
        uint256 maxPrice;
    }

    function factory() external view returns (address);

    function formula() external view returns (address);

    function WETH() external view returns (address);

    function onSwapExactTokensForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountLast);

    function onSwapExactETHForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external payable returns (uint256 amountLast);

    function onSwapExactTokensForETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountLast);

    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function onSwapETHForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function onSwapTokensForExactETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}
