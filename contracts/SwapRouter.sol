// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

import "./interfaces/poolPair/IWeightedPairFactory.sol";
import "./interfaces/poolPair/IWeightedPair.sol";
import "./interfaces/poolPair/IWeightedFormula.sol";
import "./interfaces/poolPair/IWeightedPairManager.sol";
import "./interfaces/ISwap.sol";
import "./poolPair/PairLiquidityManager.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/ISwapRouter.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract SwapRouter is ISwapRouter, PairLiquidityManager {
    constructor(address _factory, address _WETH) PairLiquidityManager(_factory, _WETH) {}

    function onSwapExactTokensForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        uint256 _length = pools.length;
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? to : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactETHForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external payable virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = msg.value;
        transferETHTo(msg.value, pools[0]);
        uint256 _length = pools.length;
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? to : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactTokensForETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        uint256 _length = pools.length;
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? address(this) : pools[i + 1];
            amountLast = ISwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
        transferAll(ETH_ADDRESS, to, amountLast);
    }

    // direct swap function for given exact output
    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256[] memory amounts) {
        uint256 _length = pools.length;
        // set amount array
        amounts = new uint256[](tokens.length);
        amounts[_length] = amountOut;

        // calculate all amounts to be sent and recieved
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        // check input condition
        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");

        // tranfer amounts
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);

        // use general swap functions that do not execute the full calculation to save gas
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? to : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }
    }

    function onSwapETHForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable override ensure(deadline) returns (uint256[] memory amounts) {
        uint256 _length = pools.length;
        amounts = new uint256[](tokens.length);
        amounts[_length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= msg.value, "EXCESSIVE_INPUT");

        transferETHTo(amounts[0], pools[0]);
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? to : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }

    function onSwapTokensForExactETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external override ensure(deadline) returns (uint256[] memory amounts) {
        uint256 _length = pools.length;
        amounts = new uint256[](tokens.length);
        amounts[_length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = ISwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);
        for (uint256 i = 0; i < _length; i++) {
            address _to = i == _length - 1 ? address(this) : pools[i + 1];
            ISwap(pools[i]).onSwapGivenOut(tokens[i], tokens[i + 1], amounts[i + 1], _to);
        }

        transferAll(ETH_ADDRESS, to, amountOut);
    }
}
