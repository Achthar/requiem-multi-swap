// SPDX-License-Identifier: MIT

pragma solidity ^0.8.14;

interface IRequiemSwap {
    /**  
    * @notice amount in is expected to be sent to the pool before calling onSwap
    * - This function is designed for a multi swap exact out structure
    * - It just checks the invariant condition or more generally the validity of the swap
    * - No return value required since the amounts are already known in that case
    */
    function onSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        address to
    ) external;

    /**
    * @notice Calculates the swap value internally and sends the amount to the to address 
    * - Returns the calculated output amount.
    * - Can be done without readjusting the invariant as the internally called pricing should ensure validity
     */
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to
    ) external returns (uint256);

    /**
    * @notice Calculates the input amount internally and sends that amount from the caller to the pool and the amountOut to the to address
    * - Returns the calculated input amount.
    * - Can be done without readjusting the invariant as the internally called pricing should ensure validity
     */
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address to
    ) external returns (uint256);

    // calculator functions that should be used in sync with the swap functions above, i.e. most
    // importantly for the exact out swap above

    function calculateSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256);

    function calculateSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) external view returns (uint256);
}
