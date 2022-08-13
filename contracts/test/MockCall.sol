// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../interfaces/ERC20/IERC20.sol";

import "../interfaces/poolBase/IFlashSwap.sol";

import "../interfaces/poolBase/IFlashSwapRecipient.sol";

contract MyContract {
    function uniswapV2Call(
        address sender,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) external {}

    function passArray() external {
        bytes memory data = abi.encode([address(0x33), address(0x44)]);
        this.uniswapV2Call(address(0x233), 1, 0, data);
    }

    function passFuncionCall() external {
        bytes memory data = abi.encodePacked(
            bytes4(keccak256("anotherfunction(uint256,address)")), // function signature
            abi.encode(
                123, // `anotherfunction()` arguments
                address(0x45)
            )
        );
        this.uniswapV2Call(address(0x233), 1, 0, data);
    }

    function onFlashSwapExactOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external returns (uint256) {}

    // flash swap for exact out swap chain
    function recieveSwapAmount(
        address sender,
        address tokenIn,
        address tokenOut,
        uint256 requiredInAmount,
        uint256 amountOut,
        bytes calldata data
    ) external {
        (address[] memory pools, address[] memory tokens, uint256 index) = abi.decode(data, (address[], address[], uint256));

        if (index == 0) IERC20(tokenIn).transferFrom(sender, pools[0], requiredInAmount);
        else if (index == pools.length) IERC20(tokenOut).transfer(sender, amountOut);
        else {
            // flash swap with prev pool
            IFlashSwap(pools[index]).onFlashSwapExactOut(
                IFlashSwapRecipient(msg.sender),
                tokens[--index], // new tokenIn
                address(tokenIn), // new tokenOut
                requiredInAmount, // required amount that has to be sent to pool
                msg.sender, // pool address - recipient of required tken in amount
                abi.encode(pools, index) // args and relevant index
            );
        }
    }
}
