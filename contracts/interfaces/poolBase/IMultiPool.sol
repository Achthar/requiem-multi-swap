// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

// solhint-disable var-name-mixedcase

interface IMultiPool {
    // pool data view functions

    function calculateAddLiquidityExactIn(uint256[] calldata amounts) external view returns (uint256);

    function calculateRemoveLiquidityExactOut(uint256[] calldata amounts, address account) external view returns (uint256);

    function calculateRemoveLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint256 tokenIndex,
        address account
    ) external view returns (uint256);

    function calculateRemoveLiquidityExactIn(uint256 amount, address account) external view returns (uint256[] memory);

    // Liquidity functions
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

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 tokenIndex,
        uint256 minAmount,
        uint256 deadline
    ) external returns (uint256);

    function getTokenBalances() external view returns (uint256[] memory);

    function calculateCurrentWithdrawFee(address account) external view returns (uint256);
}
