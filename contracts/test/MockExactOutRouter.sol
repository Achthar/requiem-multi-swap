// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/ERC20/IERC20.sol";

import "../interfaces/poolBase/IFlashSwap.sol";
import "../interfaces/poolBase/IFlashSwapRecipient.sol";

contract MockExactOutRouter is IFlashSwapRecipient {
    // direct swap function for given exact output
    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to
    ) external virtual {
        uint256 index = pools.length - 1;
        bytes memory data = abi.encode(pools, tokens, index, msg.sender);
        IFlashSwap(pools[index]).onFlashSwapExactOut(this, tokens[index], tokens[pools.length], amountOut, to, data);
    }

    // flash swap for exact out swap chain
    function recieveSwapAmount(
        address,
        IERC20 tokenIn,
        IERC20,
        uint256 requiredInAmount,
        uint256,
        bytes calldata data
    ) external override {
        (address[] memory pools, address[] memory tokens, uint256 index, address origin) = abi.decode(data, (address[], address[], uint256, address));

        if (index == 0) {
            tokenIn.transferFrom(origin, msg.sender, requiredInAmount);
        } else {
            // delete pools[index];
            delete tokens[index--];
            // flash swap with prev pool
            IFlashSwap(pools[index]).onFlashSwapExactOut(
                this,
                tokens[index], // new tokenIn
                address(tokenIn), // new tokenOut
                requiredInAmount, // required amount that has to be sent to pool
                msg.sender, // pool address - exact out swap the required amount in
                abi.encode(pools, tokens, index, origin) // args and relevant index
            );
        }
    }
}
