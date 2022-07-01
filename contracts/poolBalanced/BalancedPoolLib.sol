// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./BalancedLPToken.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../libraries/math/BalancedMath.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

/**
 * Balanced Pool main algorithm
 */
library BalancedPoolLib {
    using SafeERC20 for IERC20;

    event CollectProtocolFee(address token, uint256 amount);

    uint256 public constant FEE_DENOMINATOR = 1e18; // = 100%

    struct BalancedSwapStorage {
        IERC20[] pooledTokens;
        BalancedLPToken lpToken;
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
        /// @dev admin fees that can be withdrawn by feeCollector
        uint256[] collectedFees;
          uint256[] normalizedWeights;


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
        uint256 minMintAmount
    ) external returns (uint256 mintAmount) {
        uint256 count = self.balances.length;
        uint256 tokenSupply = self.lpToken.totalSupply();
        uint256[] memory swapFees;

        (mintAmount, swapFees) = BalancedMath._calcLpOutGivenExactTokensIn(
            _xp(self.balances, self.tokenMultipliers),
            _xp(amounts, self.tokenMultipliers),
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

        self.lpToken.mint(msg.sender, mintAmount);
    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function initialize(BalancedSwapStorage storage self, uint256[] memory amounts) external returns (uint256 mintAmount) {
        uint256 count = self.balances.length;
        uint256 tokenSupply = self.lpToken.totalSupply();
        uint256 invariantAfterJoin = FixedPoint.ONE;
        require(tokenSupply == 0, "supply");

        for (uint256 i = 0; i < count; i++) {
            require(amounts[i] > 0, "amnt");
            self.pooledTokens[i].safeTransferFrom(msg.sender, address(this), amounts[i]);
            self.balances[i] = amounts[i];
        }

        mintAmount = invariantAfterJoin * count;

        self.lpToken.mint(msg.sender, mintAmount);
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
        uint256,
        address to
    ) external returns (uint256 outAmount) {
        // fetch in balance
        uint256 balanceIn = self.pooledTokens[inIndex].balanceOf(address(this));

        // calculate amount sent
        uint256 inAmount = (balanceIn - self.balances[inIndex]) * self.tokenMultipliers[inIndex];

        // respect fee in amount sent
        uint256 amountInWithFee = (inAmount * (FEE_DENOMINATOR - self.fee)) / FEE_DENOMINATOR;

        // get out amount
        outAmount = BalancedMath._calcOutGivenIn(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            amountInWithFee
        );

        // denormalize amount
        outAmount = outAmount / self.tokenMultipliers[outIndex];

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;
        self.collectedFees[inIndex] += (inAmount * self.fee * self.adminFee) / FEE_DENOMINATOR / FEE_DENOMINATOR;
        // transfer amount
        self.pooledTokens[outIndex].safeTransfer(to, outAmount);
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
        // get actual new in balance
        uint256 balanceIn = self.pooledTokens[inIndex].balanceOf(address(this));

        // calculate in amount with upscaled balances
        inAmount = BalancedMath._calcInGivenOut(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            outAmount * self.tokenMultipliers[outIndex]
        );
        // adjust for fee and scale down - rounding up
        inAmount = (inAmount * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee) / self.tokenMultipliers[inIndex] + 1;

        // collect admin fee
        self.collectedFees[inIndex] += (inAmount * self.tokenMultipliers[inIndex] * self.fee * self.adminFee) / FEE_DENOMINATOR / FEE_DENOMINATOR;

        //validate trade
        require(inAmount <= balanceIn - self.balances[inIndex], "insufficient in");

        //send tokens
        self.pooledTokens[outIndex].safeTransfer(to, outAmount);

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;
    }

    /**
     * @notice Flash Loan using the pool balances
     * it has to recalculate the invariant if called, otherwise manipulations are allowed
     * as all balances are greater than zero, it always will satisfy the invariant condition
     * such that it is greater than the previous one
     * the flash fee is 20% of a regular swap fee
     */
    function flashLoan(
        BalancedSwapStorage storage self,
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external returns (uint256[] memory feeAmounts) {
        uint256 length = amounts.length;
        feeAmounts = new uint256[](length);
        uint256[] memory preLoanBalances = new uint256[](length);
        uint256 preInvariant = _getInvariant(self);
        for (uint256 i = 0; i < length; ++i) {
            uint256 amount = amounts[i];
            preLoanBalances[i] = self.pooledTokens[i].balanceOf(address(this));
            feeAmounts[i] = (amount * self.flashFee) / FEE_DENOMINATOR;

            require(preLoanBalances[i] >= amount, "pre bals");
            self.pooledTokens[i].safeTransfer(address(recipient), amount);
        }

        recipient.receiveFlashLoan(self.pooledTokens, amounts, feeAmounts, userData);
        for (uint256 i = 0; i < length; ++i) {
            uint256 preLoanBalance = preLoanBalances[i];

            // Checking for loan repayment first (without accounting for fees) makes for simpler debugging, and results
            // in more accurate revert reasons if the flash loan protocol fee percentage is zero.
            uint256 postLoanBalance = self.pooledTokens[i].balanceOf(address(this));
            require(postLoanBalance >= preLoanBalance, "post bal");
            self.balances[i] = postLoanBalance;
            self.collectedFees[i] += (feeAmounts[i] * self.tokenMultipliers[i] * self.adminFee) / FEE_DENOMINATOR;
            // No need for checked arithmetic since we know the loan was fully repaid.
            uint256 receivedFeeAmount = postLoanBalance - preLoanBalance;

            require(receivedFeeAmount >= feeAmounts[i], "insufficient loan fee");
        }
        self.lastInvariant = _getInvariant(self);
        require(self.lastInvariant >= preInvariant, "invariant");
    }

    function removeLiquidityExactIn(
        BalancedSwapStorage storage self,
        uint256 lpAmount,
        uint256[] memory minAmounts
    ) external returns (uint256[] memory amounts, uint256 totalSupply) {
        totalSupply = self.lpToken.totalSupply();
        require(lpAmount <= totalSupply);

        amounts = BalancedMath._calcTokensOutGivenExactLpIn(_xp(self), lpAmount, totalSupply);

        for (uint256 i = 0; i < amounts.length; i++) {
            require(amounts[i] >= minAmounts[i], "s");
            uint256 amount = amounts[i] / self.tokenMultipliers[i];
            self.balances[i] = self.balances[i] - amount;
            self.pooledTokens[i].safeTransfer(msg.sender, amount);
        }

        self.lpToken.burnFrom(msg.sender, lpAmount);
    }

    function removeLiquidityOneToken(
        BalancedSwapStorage storage self,
        uint256 lpAmount,
        uint256 index,
        uint256 minAmount
    ) external returns (uint256 amountOut) {
        uint256 totalSupply = self.lpToken.totalSupply();
        require(totalSupply > 0, "supply=0");
        require(lpAmount <= self.lpToken.balanceOf(msg.sender), "bal");
        require(lpAmount <= totalSupply, "supply");
        uint256 swapFee;
        (amountOut, swapFee) = BalancedMath._calcTokenOutGivenExactLpIn(self.balances[index] * self.tokenMultipliers[index], self.normalizedWeights[index], lpAmount, totalSupply, self.fee);

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmount(self, index, swapFee);

        require(amountOut >= minAmount, "s");

        uint256 amountOutFinal = amountOut / self.tokenMultipliers[index];
        self.lpToken.burnFrom(msg.sender, lpAmount);
        self.pooledTokens[index].safeTransfer(msg.sender, amountOutFinal);
        uint256[] memory amounts = new uint256[](self.nTokens);
        amounts[index] = amountOut;

        self.balances[index] -= amountOutFinal;
    }

    function removeLiquidityExactOut(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 maxBurnAmount
    ) external returns (uint256 burnAmount, uint256 totalSupply) {
        require(amounts.length == self.nTokens, "array");
        totalSupply = self.lpToken.totalSupply();
        require(totalSupply != 0, "supply");
        uint256[] memory swapFees;
        (burnAmount, swapFees) = BalancedMath._calcLpInGivenExactTokensOut(_xp(self), self.normalizedWeights, _xp(amounts, self.tokenMultipliers), totalSupply, self.fee);

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmounts(self, swapFees);

        require(burnAmount <= maxBurnAmount, "b exceeded");

        self.lpToken.burnFrom(msg.sender, burnAmount);

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
        uint256 lpAmount
    ) external view returns (uint256, uint256) {
        return BalancedMath._calcTokenOutGivenExactLpIn(self.balances[outIndex] * self.tokenMultipliers[outIndex], self.normalizedWeights[outIndex], lpAmount, self.lpToken.totalSupply(), self.fee);
    }

    function calculateRemoveLiquidityExactIn(BalancedSwapStorage storage self, uint256 lpAmount) external view returns (uint256[] memory amounts) {
        amounts = BalancedMath._calcAllTokensInGivenExactLpOut(_xp(self), lpAmount, self.lpToken.totalSupply());
    }

    /**
     * Estimate amount of LP token minted or burned at deposit or withdrawal
     */
    function calculateTokenAmount(
        BalancedSwapStorage storage self,
        uint256[] memory amounts,
        bool deposit
    ) external view returns (uint256 lpTokenAmount) {
        if (deposit) {
            (lpTokenAmount, ) = BalancedMath._calcLpOutGivenExactTokensIn(_xp(self), _xp(amounts, self.tokenMultipliers), self.lpToken.totalSupply(), self.fee);
        } else {
            (lpTokenAmount, ) = BalancedMath._calcLpInGivenExactTokensOut(_xp(self), self.normalizedWeights, _xp(amounts, self.tokenMultipliers), self.lpToken.totalSupply(), self.fee);
        }
    }

    function calculateSwapGivenIn(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 amountIn
    ) external view returns (uint256 amountOut) {
        // use in amount with fee alredy deducted
        uint256 amountInWithFee = (amountIn * self.tokenMultipliers[inIndex] * (FEE_DENOMINATOR - self.fee)) / FEE_DENOMINATOR;
        // calculate out amount
        amountOut = BalancedMath._calcOutGivenIn(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            amountInWithFee
        );
        // downscale out amount
        amountOut = amountOut / self.tokenMultipliers[outIndex];
    }

    function calculateSwapGivenOut(
        BalancedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 amountOut
    ) external view returns (uint256 amountIn) {
        // calculate in amount with upscaled balances
        amountIn = BalancedMath._calcInGivenOut(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            amountOut * self.tokenMultipliers[outIndex]
        );
        // adjust for fee and scale down - rounding up
        amountIn = (amountIn * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee) / self.tokenMultipliers[inIndex] + 1;
    }

    function sync(BalancedSwapStorage storage self, address receiver) external {
        for (uint256 i = 0; i < self.pooledTokens.length; i++) {
            IERC20 token = self.pooledTokens[i];
            uint256 fee = self.collectedFees[i] / self.tokenMultipliers[i] - 1;
            if (fee != 0) {
                token.safeTransfer(receiver, fee);
                self.collectedFees[i] = 0;
                self.balances[i] = token.balanceOf(address(this));
                emit CollectProtocolFee(address(token), fee);
            }
        }
    }

    /// INTERNAL FUNCTIONS

    /**
     * normalized balances of each tokens.
     */
    function _xp(uint256[] memory balances, uint256[] memory rates) internal pure returns (uint256[] memory) {
        for (uint256 i = 0; i < balances.length; i++) {
            rates[i] = (rates[i] * balances[i]);
        }

        return rates;
    }

    function _xp(BalancedSwapStorage storage self) internal view returns (uint256[] memory) {
        return _xp(self.balances, self.tokenMultipliers);
    }

    // Helpers

    /**
     * @dev Returns the current value of the invariant.
     */
    function _getInvariant(BalancedSwapStorage storage self) internal view returns (uint256) {
        return BalancedMath._calculateInvariant( _xp(self));
    }

    function _processSwapFeeAmount(
        BalancedSwapStorage storage self,
        uint256 index,
        uint256 amount
    ) internal {
        if (amount > 0) {
            self.collectedFees[index] += (amount * self.adminFee) / FEE_DENOMINATOR;
        }
    }

    function _processSwapFeeAmounts(BalancedSwapStorage storage self, uint256[] memory amounts) internal {
        for (uint256 i = 0; i < amounts.length; ++i) {
            _processSwapFeeAmount(self, i, amounts[i]);
        }
    }
}
