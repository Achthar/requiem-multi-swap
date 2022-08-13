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
        address tokenIn,
        address,
        uint256 requiredInAmount,
        uint256,
        bytes calldata data
    ) external override {
        (address[] memory pools, address[] memory tokens, uint256 index, address origin) = abi.decode(data, (address[], address[], uint256, address));

        if (index == 0) {
            _safeTransferFrom(tokenIn, origin, msg.sender, requiredInAmount);
        } else {
            // delete pools[index];
            delete tokens[index--];
            // flash swap with prev pool
            IFlashSwap(pools[index]).onFlashSwapExactOut(
                this,
                tokens[index], // new tokenIn
                tokenIn, // new tokenOut
                requiredInAmount, // required amount that has to be sent to pool
                msg.sender, // pool address - exact out swap the required amount in
                abi.encode(pools, tokens, index, origin) // args and relevant index
            );
        }
    }

    /**
     * @notice Simple safeTransfer implementation
     * @param token token to send
     * @param to receiver
     * @param value amount to send
     */
    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value)); // transfer selector
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TRANSACTION_FAILED");
    }

    /**
     * @notice Simple safeTransferFrom implementation
     * @param token token to send
     * @param from sender
     * @param to receiver
     * @param value amount to send
     */
    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value)); // transferFom selector
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TRANSACTION_FAILED");
    }
}
