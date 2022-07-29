// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

// solhint-disable var-name-mixedcase

interface IBalancedSwap {
    /// EVENTS
    event AddLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 invariant, uint256 tokenSupply);

    event TokenExchange(address indexed buyer, address soldId, uint256 tokensSold, address boughtId, uint256 tokensBought);

    event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 tokenSupply);

    event RemoveLiquidityOne(address indexed provider, uint256 tokenIndex, uint256 tokenAmount, uint256 coinAmount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] tokenAmounts, uint256 invariant, uint256 tokenSupply);

    event NewTransactionFees(uint256 swapFee, uint256 flashFee);

    event NewAdminFee(uint256 adminFee);

    event FeeControllerChanged(address newController);

    event FeeDistributorChanged(address newController);

    // pool data view functions

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view returns (uint256);

    function calculateRemoveLiquidityOneToken(
        uint256 tokenAmount,
        uint256 tokenIndex
    ) external view returns (uint256, uint256);

    function calculateRemoveLiquidityExactIn(uint256 amount) external view returns (uint256[] memory);

    function addLiquidityExactIn(
        uint256[] calldata amounts,
        uint256 minToMint,
        address to,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external returns (uint256[] memory);

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityOneToken(
        uint256 tokenAmount,
        uint8 tokenIndex,
        uint256 minAmount,
        uint256 deadline
    ) external returns (uint256);

    function getTokenBalances() external view returns (uint256[] memory);
}
