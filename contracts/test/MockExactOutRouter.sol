// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/ERC20/IERC20.sol";

import "../interfaces/poolBase/IFlashSwap.sol";
import "../interfaces/poolBase/IFlashSwapRecipient.sol";

// solhint-disable no-inline-assembly, avoid-low-level-calls

contract MockExactOutRouter is IFlashSwapRecipient {
    // direct swap function for given exact output
    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to
    ) external virtual {
        uint256 index = pools.length - 1;
        bytes memory data = abi.encode(pools, tokens, msg.sender, index);
        require(IFlashSwap(pools[index]).onFlashSwapGivenOut(this, tokens[index], tokens[pools.length], amountOut, to, data) <= amountInMax, "INPUT_TOO_HIGH");
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
        (address[] memory pools, address[] memory tokens, address origin, uint256 index) = abi.decode(data, (address[], address[], address, uint256));
        if (index == 0) {
            _safeTransferFrom(tokenIn, origin, msg.sender, requiredInAmount);
        } else {
            // shorten the arrays to use less memory
            assembly {
                mstore(pools, sub(mload(pools), 1))
                mstore(tokens, sub(mload(tokens), 1))
            }

            // decrement index
            index--;

            // flash swap with prev pool
            IFlashSwap(pools[index]).onFlashSwapGivenOut(
                this,
                tokens[index], // new tokenIn
                tokenIn, // new tokenOut
                requiredInAmount, // required amount that has to be sent to pool
                msg.sender, // pool address - exact out swap the required amount in
                abi.encode(pools, tokens, origin, index) // args and relevant index
            );
        }
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
        require(success && (data.length == 0 || abi.decode(data, (bool))), "TRANSFER_FROM_FAILED");
    }
}
