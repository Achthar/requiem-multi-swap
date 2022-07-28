// SPDX-License-Identifier: MIT

pragma solidity 0.8.15;

import "../ERC20/IERC20.sol";

// solhint-disable var-name-mixedcase

interface IStablePool {
    /// EVENTS
    event AddLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 tokenSupply);

    event TokenExchange(address indexed buyer, address soldId, uint256 tokensSold, address boughtId, uint256 tokensBought);

    event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 tokenSupply);

    event RemoveLiquidityOne(address indexed provider, uint256 tokenIndex, uint256 tokenAmount, uint256 coinAmount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 tokenSupply);

    event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);

    event StopRampA(uint256 A, uint256 timestamp);

    event NewTransactionFees(uint256 swapFee, uint256 flashFee);

    event NewWithdrawFee(uint256 withdrawDuration, uint256 defaultWithdrawFee);

    event NewAdminFee(uint256 adminFee);

    event FeeControllerChanged(address newController);

    event FeeDistributorChanged(address newController);

    // pool data view functions
    function getVirtualPrice() external view returns (uint256);

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view returns (uint256);

    function calculateRemoveLiquidity(address account, uint256 amount) external view returns (uint256[] memory);

    function calculateRemoveLiquidityOneToken(
        address account,
        uint256 tokenAmount,
        uint8 tokenIndex
    ) external view returns (uint256 availableTokenAmount);

    function calculateCurrentWithdrawFee(address account) external view returns (uint256);

    function addLiquidity(
        uint256[] calldata amounts,
        uint256 minToMint,
        address to,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidity(
        uint256 amount,
        uint256[] calldata minAmounts,
        uint256 deadline
    ) external returns (uint256[] memory);

    function removeLiquidityOneToken(
        uint256 tokenAmount,
        uint8 tokenIndex,
        uint256 minAmount,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityImbalance(
        uint256[] calldata amounts,
        uint256 maxBurnAmount,
        uint256 deadline
    ) external returns (uint256);

    function getTokenBalances() external view returns (uint256[] memory);
}
