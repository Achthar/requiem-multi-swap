// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../libraries/math/BalancedMath.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "../interfaces/poolBase/IFlashSwapRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

/**
 * Balanced Pool main algorithm
 */
library BalancedPoolLib {
    using SafeERC20 for IERC20;

    event CollectProtocolFee(address token, uint256 amount);

    event TokenExchange(address indexed origin, uint256 soldId, uint256 tokensSold, uint256 boughtId, uint256 tokensBought, address indexed repicient);

    uint256 public constant FEE_DENOMINATOR = 1e18; // = 100%

    struct BalancedSwapStorage {
        IERC20[] pooledTokens;
        uint256 nTokens;
        /// @dev token i multiplier to reach POOL_TOKEN_COMMON_DECIMALS
        uint256[] tokenMultipliers;
        /// @dev effective balance which might different from token balance of the contract 'cause it hold admin fee as well
        uint256[] balances;
        /// @dev last invariant
        uint256 lastInvariant;
        /// @dev swap and fee ratio. Charge on any action which move balance state far from the ideal state
        uint256 fee;
        /// @dev flash loan fee ratio. Charge on any action which move balance state far from the ideal state
        uint256 flashFee;
        /// @dev admin fee in ratio of swap fee.
        uint256 adminFee;
        uint256 adminSwapFee;
        /// @dev admin fees that can be withdrawn by feeCollector
        uint256[] collectedFees;
        uint256 normalizedWeight;
        /// @dev withdrawal fee control
        uint256 defaultWithdrawFee;
        uint256 withdrawDuration;
        mapping(address => uint256) depositTimestamp;
        mapping(address => uint256) feeEndTimestamp;
        mapping(address => uint256) withdrawFeeMultiplier;
    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @param minMintAmount Minimum amount of LP tokens to mint from the deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidityExactTokensIn(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 tokenSupply
    ) external returns (uint256 mintAmount) {
        uint256 count = self.balances.length;
        uint256[] memory swapFees;

        (mintAmount, swapFees) = BalancedMath._calcLpOutGivenExactTokensIn(
            _xp(self.balances, self.tokenMultipliers),
            _xp(amounts, self.tokenMultipliers),
            self.normalizedWeight,
            tokenSupply,
            self.fee
        );

        // Note that swapFees is already upscaled
        _processSwapFeeAmounts(self, swapFees);

        for (uint256 i = 0; i < count; i++) {
            self.pooledTokens[i].safeTransferFrom(msg.sender, address(this), amounts[i]);
            self.balances[i] += amounts[i];
        }

        require(mintAmount >= minMintAmount, "s");
    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function initialize(BalancedSwapStorage storage self, uint256[] memory amounts) external returns (uint256 mintAmount) {
        uint256 count = self.balances.length;
        uint256 invariantAfterJoin = FixedPoint.ONE;

        for (uint256 i = 0; i < count; i++) {
            require(amounts[i] > 0, "amnt");
            self.pooledTokens[i].safeTransferFrom(msg.sender, address(this), amounts[i]);
            self.balances[i] = amounts[i];
        }

        mintAmount = invariantAfterJoin * count;
    }

    /**
     *  @notice Calculates the output amount and swaps it. As we use the BalancedMath library, no additional check
     *  of the invariant is needed since the amount out formula is equivalent to the local invariant equation.
     *   - designed to be used in the Requiem Swap framework
     *   - input is derived from increased actual token balance
     * @param inIndex token index in
     * @param outIndex token index out
     */
    function onSwapGivenIn(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        address to
    ) external returns (uint256 outAmount) {
        // fetch in balance
        uint256 balanceIn = self.pooledTokens[inIndex].balanceOf(address(this));

        // calculate amount sent
        uint256 inAmount = (balanceIn - self.balances[inIndex]);

        uint256 amountInWithFee = inAmount * (FEE_DENOMINATOR - self.fee);
        outAmount = (self.balances[outIndex] * amountInWithFee) / (self.balances[inIndex] * FEE_DENOMINATOR + amountInWithFee);

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;
        self.collectedFees[inIndex] += (inAmount * self.adminSwapFee) / FEE_DENOMINATOR;
        // transfer amount
        self.pooledTokens[outIndex].safeTransfer(to, outAmount);

        emit TokenExchange(msg.sender, inIndex, inAmount, outIndex, outAmount, to);
    }

    /**
     *  @notice Calculates the output amount and swaps it. As we use the BalancedMath library, no additional check
     *  of the invariant is needed since the amount out formula is equivalent to the local invariant equation.
     *   - designed to be used in the Requiem Swap framework
     *   - input is derived from increased actual token balance
     * @param inIndex token index in
     * @param outIndex token index out
     */
    function flashSwapExactIn(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inAmount,
        address to
    ) external returns (uint256 outAmount) {
        // we fetch the tokens and provide it as input for the flash call
        IERC20 tokenIn = self.pooledTokens[inIndex];
        IERC20 tokenOut = self.pooledTokens[outIndex];

        uint256 balanceInVirtual = self.balances[inIndex];

        outAmount = _calcOutGivenIn(balanceInVirtual, self.balances[outIndex], inAmount, self.fee);

        // optimistic transfer
        tokenOut.safeTransfer(to, outAmount);

        // flash call of recipient
        IFlashSwapRecipient(to).recieveSwapAmount(msg.sender, tokenIn, tokenOut, inAmount, outAmount);

        // fetch in balance
        uint256 balanceIn = tokenIn.balanceOf(address(this));

        // validate trade against actual amount sent
        require(inAmount <= balanceIn - balanceInVirtual, "insufficient in");

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;
        self.collectedFees[inIndex] += (inAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        emit TokenExchange(msg.sender, inIndex, inAmount, outIndex, outAmount, to);
    }

    /**
     * @notice Swaps for provided amountOut - expects that a sufficient amount of token with inIndex
     *  has been sent to the contract already
     *  - as the out amount is provided as input, the functiomn
     * @param inIndex token index in
     * @param outIndex token index out
     */
    function onSwapGivenOut(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 outAmount,
        address to
    ) external returns (uint256 inAmount) {
        // get tracked in balance (before transfer in)
        uint256 inBalanceVirtual = self.balances[inIndex];

        // calculate in amount
        inAmount = _calcInGivenOut(inBalanceVirtual, self.balances[outIndex], outAmount, self.fee);

        // collect admin fee
        self.collectedFees[outIndex] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        // get actual new in balance (after transfer in)
        uint256 balanceIn = self.pooledTokens[inIndex].balanceOf(address(this));

        // validate trade against actual amount sent
        require(inAmount <= balanceIn - inBalanceVirtual, "insufficient in");

        //send tokens
        self.pooledTokens[outIndex].safeTransfer(to, outAmount);

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;

        emit TokenExchange(msg.sender, inIndex, inAmount, outIndex, outAmount, to);
    }

    /**
     * @notice FlashSwap - sends target outAmount to token with outIndex. Validates that required inAmount has
     * been sent durng or before the receiveSwapAmount function
     * @param inIndex token index in
     * @param outIndex token index out
     * @param outAmount amount of token with outIndex to be sent
     * @param to flash swap recipient
     */
    function flashSwapExactOut(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 outAmount,
        address to
    ) external returns (uint256 inAmount) {
        // get recorded in balance before trade
        uint256 inBalanceVirtual = self.balances[inIndex];

        // calculate in amount
        inAmount = _calcInGivenOut(inBalanceVirtual, self.balances[outIndex], outAmount, self.fee);

        // we fetch the tokens and provide it as input for the flash call
        IERC20 tokenIn = self.pooledTokens[inIndex];
        IERC20 tokenOut = self.pooledTokens[outIndex];

        // optimistic transfer
        tokenOut.safeTransfer(to, outAmount);

        // flash call of recipient
        IFlashSwapRecipient(to).recieveSwapAmount(msg.sender, tokenIn, tokenOut, inAmount, outAmount);

        // get actual new in balance after flash swap call
        uint256 balanceIn = tokenIn.balanceOf(address(this));

        // collect admin fee
        self.collectedFees[outIndex] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;
        // }
        // validate trade against actual amount sent
        require(inAmount <= balanceIn - inBalanceVirtual, "insufficient in");

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;

        emit TokenExchange(msg.sender, inIndex, inAmount, outIndex, outAmount, to);
    }

    /**
     * @notice Flash Loan using the pool balances
     * it has to recalculate the invariant if called, otherwise manipulations are allowed
     * as all balances are greater than zero, it always will satisfy the invariant condition
     * such that it is greater than the previous one
     */
    function flashLoan(
        BalancedSwapStorage storage self,
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external returns (uint256[] memory feeAmounts) {
        uint256 length = amounts.length;
        // array can be too short but not too long
        require(length <= self.nTokens, "Invalid length");
        feeAmounts = new uint256[](length);
        uint256[] memory preLoanBalances = new uint256[](length);
        for (uint256 i = 0; i < length; ++i) {
            uint256 amount = amounts[i];
            if (amount != 0) {
                // ignore zero amounts
                preLoanBalances[i] = self.pooledTokens[i].balanceOf(address(this));
                feeAmounts[i] = (amount * self.flashFee) / FEE_DENOMINATOR;

                require(preLoanBalances[i] >= amount, "pre bals");
                self.pooledTokens[i].safeTransfer(address(recipient), amount);
            }
        }

        recipient.receiveFlashLoan(self.pooledTokens, amounts, feeAmounts, userData);
        for (uint256 i = 0; i < length; ++i) {
            if (amounts[i] != 0) {
                // ignore zero amounts
                uint256 preLoanBalance = preLoanBalances[i];
                uint256 feeAmount = feeAmounts[i];
                // Checking for loan repayment first (without accounting for fees) makes for simpler debugging, and results
                // in more accurate revert reasons if the flash loan protocol fee percentage is zero.
                uint256 postLoanBalance = self.pooledTokens[i].balanceOf(address(this));
                require(postLoanBalance >= preLoanBalance, "post bal");
                self.balances[i] = postLoanBalance;
                self.collectedFees[i] += (feeAmount * self.adminFee) / FEE_DENOMINATOR;
                // No need for checked arithmetic since we know the loan was fully repaid.
                uint256 receivedFeeAmount = postLoanBalance - preLoanBalance;

                require(receivedFeeAmount >= feeAmount, "insufficient loan fee");
            }
        }
    }

    function removeLiquidityExactIn(
        BalancedSwapStorage storage self,
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 totalSupply
    ) external returns (uint256[] memory amounts) {
        require(lpAmount <= totalSupply);
        uint256 feeAdjustedAmount = (lpAmount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, msg.sender))) / FEE_DENOMINATOR;
        // use unnormalized balances as we use just the balance ratios for calculations
        amounts = BalancedMath._calcTokensOutGivenExactLpIn(self.balances, feeAdjustedAmount, totalSupply);

        for (uint256 i = 0; i < amounts.length; i++) {
            require(amounts[i] >= minAmounts[i], "s");
            uint256 amount = amounts[i];
            self.balances[i] = self.balances[i] - amount;
            self.pooledTokens[i].safeTransfer(msg.sender, amount);
        }
    }

    function removeLiquidityOneTokenExactIn(
        BalancedSwapStorage storage self,
        uint256 lpAmount,
        uint256 index,
        uint256 minAmount,
        uint256 totalSupply
    ) external returns (uint256 amountOut) {
        require(lpAmount <= totalSupply, "supply");
        uint256 swapFee;
        uint256 feeAdjustedAmount = (lpAmount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, msg.sender))) / FEE_DENOMINATOR;

        (amountOut, swapFee) = BalancedMath._calcTokenOutGivenExactLpIn(self.balances[index], self.normalizedWeight, feeAdjustedAmount, totalSupply, self.fee);

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmount(self, index, swapFee);

        require(amountOut >= minAmount, "s");

        uint256 amountOutFinal = amountOut / self.tokenMultipliers[index];
        self.pooledTokens[index].safeTransfer(msg.sender, amountOutFinal);
        uint256[] memory amounts = new uint256[](self.nTokens);
        amounts[index] = amountOut;

        self.balances[index] -= amountOutFinal;
    }

    function removeLiquidityExactOut(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 totalSupply
    ) external returns (uint256 burnAmount) {
        require(amounts.length == self.nTokens, "array");
        require(totalSupply > 0, "supply");
        uint256[] memory swapFees;
        (burnAmount, swapFees) = BalancedMath._calcLpInGivenExactTokensOut(_xp(self), _xp(amounts, self.tokenMultipliers), self.normalizedWeight, totalSupply, self.fee);

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmounts(self, swapFees);

        // adjust for withdraw fee
        burnAmount = ((burnAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, msg.sender));

        require(burnAmount <= maxBurnAmount, "b exceeded");

        for (uint256 i = 0; i < self.nTokens; i++) {
            if (amounts[i] != 0) {
                self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
                self.balances[i] -= amounts[i];
            }
        }
    }

    function calculateRemoveLiquidityOneTokenExactIn(
        BalancedSwapStorage storage self,
        uint256 outIndex,
        uint256 lpAmount,
        uint256 totalSupply,
        address account
    ) external view returns (uint256 amountOut) {
        uint256 feeAdjustedAmount = (lpAmount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;
        (amountOut, ) = BalancedMath._calcTokenOutGivenExactLpIn(self.balances[outIndex], self.normalizedWeight, feeAdjustedAmount, totalSupply, self.fee);
    }

    function calculateRemoveLiquidityExactIn(
        BalancedSwapStorage storage self,
        uint256 lpAmount,
        uint256 totalSupply,
        address account
    ) external view returns (uint256[] memory amounts) {
        uint256 feeAdjustedAmount = (lpAmount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;
        amounts = BalancedMath._calcTokensOutGivenExactLpIn(self.balances, feeAdjustedAmount, totalSupply);
    }

    /**
     * Estimate amount of LP token minted at deposit
     */
    function calculateAddLiquidityExactIn(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply
    ) external view returns (uint256 lpTokenAmount) {
        (lpTokenAmount, ) = BalancedMath._calcLpOutGivenExactTokensIn(_xp(self), _xp(amounts, self.tokenMultipliers), self.normalizedWeight, totalSupply, self.fee);
    }

    /**
     * Estimate amount of LP token burned at withdrawal
     */
    function calculateRemoveLiquidityExactOut(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply,
        address account
    ) external view returns (uint256 lpTokenAmount) {
        (lpTokenAmount, ) = BalancedMath._calcLpInGivenExactTokensOut(_xp(self), _xp(amounts, self.tokenMultipliers), self.normalizedWeight, totalSupply, self.fee);
        lpTokenAmount = ((lpTokenAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account));
    }

    function calculateSwapGivenIn(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 amountIn
    ) external view returns (uint256 amountOut) {
        uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - self.fee);
        amountOut = (self.balances[outIndex] * amountInWithFee) / (self.balances[inIndex] * FEE_DENOMINATOR + amountInWithFee);
    }

    function calculateSwapGivenOut(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 amountOut
    ) external view returns (uint256 amountIn) {
        uint256 numerator = self.balances[inIndex] * amountOut * FEE_DENOMINATOR;
        uint256 denominator = (self.balances[outIndex] - amountOut) * (FEE_DENOMINATOR - self.fee);
        amountIn = numerator / denominator + 1;
    }

    function withdrawCollectedFees(BalancedSwapStorage storage self, address receiver) external {
        for (uint256 i = 0; i < self.pooledTokens.length; i++) {
            IERC20 token = self.pooledTokens[i];
            uint256 fee = self.collectedFees[i];
            if (fee != 0) {
                token.safeTransfer(receiver, fee);
                self.collectedFees[i] = 0;
                self.balances[i] = token.balanceOf(address(this));
                emit CollectProtocolFee(address(token), fee);
            }
        }
    }

    /// INTERNAL FUNCTIONS

    function _calcInGivenOut(
        uint256 inBalance,
        uint256 outBalance,
        uint256 outAmount,
        uint256 fee
    ) private pure returns (uint256 inAmount) {
        uint256 numerator = inBalance * outAmount * FEE_DENOMINATOR;
        uint256 denominator = (outBalance - outAmount) * (FEE_DENOMINATOR - fee);
        inAmount = numerator / denominator + 1;
    }

    function _calcOutGivenIn(
        uint256 inBalance,
        uint256 outBalance,
        uint256 inAmount,
        uint256 fee
    ) private pure returns (uint256 outAmount) {
        uint256 amountInWithFee = inAmount * (FEE_DENOMINATOR - fee);
        outAmount = (outBalance * amountInWithFee) / (inBalance * FEE_DENOMINATOR + amountInWithFee);
    }

    /**
     * normalized balances of each tokens.
     */
    function _xp(uint256[] memory balances, uint256[] memory rates) private pure returns (uint256[] memory) {
        for (uint256 i = 0; i < balances.length; i++) {
            rates[i] = (rates[i] * balances[i]);
        }

        return rates;
    }

    function _xp(BalancedSwapStorage storage self) private view returns (uint256[] memory) {
        return _xp(self.balances, self.tokenMultipliers);
    }

    // Helpers

    function _processSwapFeeAmount(
        BalancedSwapStorage storage self,
        uint256 index,
        uint256 amount
    ) private {
        if (amount > 0) {
            self.collectedFees[index] += (amount * self.adminSwapFee) / FEE_DENOMINATOR / self.tokenMultipliers[index];
        }
    }

    function _processSwapFeeAmounts(BalancedSwapStorage storage self, uint256[] memory amounts) private {
        for (uint256 i = 0; i < amounts.length; ++i) {
            _processSwapFeeAmount(self, i, amounts[i]);
        }
    }

    /**
     * @notice Update the withdraw fee for `user`. If the user is currently
     * not providing liquidity in the pool, sets to default value. If not, recalculate
     * the starting withdraw fee based on the last deposit's time & amount relative
     * to the new deposit.
     *
     * @param self Swap struct to read from and write to
     * @param user address of the user depositing tokens
     * @param toMint amount of pool tokens to be minted
     */
    function _updateUserWithdrawFee(
        BalancedSwapStorage storage self,
        address user,
        uint256 userBalance,
        uint256 toMint
    ) internal {
        // If token is transferred to address 0 (or burned), don't update the fee.
        if (user == address(0)) {
            return;
        }
        if (self.defaultWithdrawFee == 0) {
            // If current fee is set to 0%, set multiplier to FEE_DENOMINATOR
            self.withdrawFeeMultiplier[user] = FEE_DENOMINATOR;
        } else {
            // Otherwise, calculate appropriate discount based on last deposit amount
            uint256 currentFee = _calculateCurrentWithdrawFee(self, user);
            uint256 currentBalance = userBalance;

            // ((currentBalance * currentFee) + (toMint * defaultWithdrawFee)) * FEE_DENOMINATOR /
            // ((toMint + currentBalance) * defaultWithdrawFee)
            if ((toMint + currentBalance) * self.defaultWithdrawFee != 0) {
                self.withdrawFeeMultiplier[user] = (((currentBalance * currentFee) + (toMint * self.defaultWithdrawFee)) * (FEE_DENOMINATOR)) / ((toMint + currentBalance) * self.defaultWithdrawFee);
            }
        }
        self.depositTimestamp[user] = block.timestamp;
        self.feeEndTimestamp[user] = block.timestamp + self.withdrawDuration;
    }

    /**
     * @notice Calculate the fee that is applied when the given user withdraws.
     * Withdraw fee decays linearly over the witdhrawDuraion parameter.
     * @param user address you want to calculate withdraw fee of
     * @return current withdraw fee of the user
     */
    function _calculateCurrentWithdrawFee(BalancedSwapStorage storage self, address user) internal view returns (uint256) {
        uint256 endTime = self.feeEndTimestamp[user];
        if (endTime > block.timestamp) {
            uint256 timeLeftover = endTime - block.timestamp;
            return (self.defaultWithdrawFee * self.withdrawFeeMultiplier[user] * timeLeftover) / self.withdrawDuration / FEE_DENOMINATOR;
        }
        return 0;
    }
}
