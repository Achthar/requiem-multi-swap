// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./tokens/LPToken.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeERC20.sol";
import "./libraries/math/WeightedMath.sol";
import "./interfaces/IFlashLoanRecipient.sol";


using SafeERC20 for IERC20 global;

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

/**
 * StableSwap main algorithm
 */
library WeightedPoolLib {

    event CollectProtocolFee(address token, uint256 amount);

    uint256 public constant FEE_DENOMINATOR = 1e10;

    struct WeightedSwapStorage {
        IERC20[] pooledTokens;

        LPToken lpToken;

        uint256 nTokens;
        /// @dev token i multiplier to reach POOL_TOKEN_COMMON_DECIMALS
        uint256[] tokenMultipliers;
        /// @dev effective balance which might different from token balance of the contract 'cause it hold admin fee as well
        uint256[] balances;
        /// @dev weights for the tokens
        uint256[] normalizedWeights;
        /// @dev last invariant
        uint256 lastInvariant;
        /// @dev swap and flash loanfee ratio. Charge on any action which move balance state far from the ideal state
        uint256 fee;
        /// @dev admin fee in ratio of swap fee.
        uint256 adminFee;
        /// @dev admin fees that can be withdrawn by feeCollector
        uint256[] collectedFees;

    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @param minMintAmount Minimum amount of LP tokens to mint from the deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidity(
        WeightedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 minMintAmount
    ) external returns (uint256 mintAmount) {
        uint256 count = self.balances.length;
        uint256 tokenSupply = self.lpToken.totalSupply();
        uint256[] memory swapFees;
        (mintAmount, swapFees) = WeightedMath._calcBptOutGivenExactTokensIn(
            self.balances,
            self.normalizedWeights,
            _xp( amounts, self.tokenMultipliers),
            tokenSupply,
            self.fee
        );

        // Note that swapFees is already upscaled
        _processSwapFeeAmounts(self, swapFees);

        uint256[] memory normalizedNewAmounts = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            if (tokenSupply == 0) {
                require(amounts[i] > 0, "amnt");
            }
            self.pooledTokens[i].safeTransferFrom(msg.sender, address(this), amounts[i]);
            self.balances[i] += amounts[i];
            normalizedNewAmounts[i] = (self.balances[i] + amounts[i]) * self.tokenMultipliers[i];
        }

        require(mintAmount >= minMintAmount, "s");

        self.lpToken.mint(msg.sender, mintAmount);

        self.lastInvariant = WeightedMath._calculateInvariant(self.normalizedWeights, normalizedNewAmounts);
       
    }

    /**
     * @notice the same function as swap, but it expects that amounts already have been
     *  sent to the contract
     *   - designed to be used in the Requiem Swap framework
     *   - deducts the fee from the output and caps it at outAmount to
     *   - this is to avoid issues with the rounding when using the calculateSwapGivenOut function to determine the input
     *          -> that is because e.g. a 6 digit input can never exactly hit a 18 digit output, so the input is selected slightly higher
     *              such that the output also is essentially rounded up at the sixth digit
     *          -> the outAmount can only be lower than the actual calculated dy
     *   - viable function for batch swapping
     * @param inIndex token index in
     * @param outIndex token index out
     * @param outAmount the target out amount - only a cap at the decimalplaces of the lower one, the rest is taken as fee
     *                  - that fee is always about the lowes amount possible of the one with the lower decimal number
     *                  this will have a negative
     */
    function onSwap(
        WeightedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256,
        uint256 outAmount,
        address to
    ) external {

        // get actual new in balance
        uint256 balanceIn =  self.pooledTokens[inIndex].balanceOf(address(this));

        // adjust balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= outAmount;

        // based on adjusted vallues, calculate new invariant
        uint256 _newInvariant = _getInvariant(self);

        // compare invariants
        require(self.lastInvariant <= _newInvariant, "invariant");

          // get fee
        uint256 dy_fee = (outAmount * self.fee) /  FEE_DENOMINATOR;
    
        // add admin fees
        self.collectedFees[outIndex] += (dy_fee * self.adminFee) / FEE_DENOMINATOR / self.tokenMultipliers[outIndex];

        // finally transfer the tokens
        self.pooledTokens[outIndex].safeTransfer(to, outAmount);

        // set new invariant
        self.lastInvariant = _newInvariant;
    }

    /**
     *  the same function as swap, but it expects that amounts already have been
     *  sent to the contract
     *   - designed to be used in the Requiem Swap framework
     *   - deducts the fee from the output, in this case simple as the output is the calculated value
     *   - viable function for batch swapping
     * @param inIndex token index in
     * @param outIndex token index out
     */
    function onSwapGivenIn(
        WeightedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inAmount,
        uint256 minOutAmount,
        address to
    ) external returns (uint256 dy) {

        dy = WeightedMath._calcOutGivenIn(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            inAmount
        );

        uint256 dy_fee = (dy * self.fee) / FEE_DENOMINATOR;

        dy = (dy - dy_fee) / self.tokenMultipliers[outIndex]; // denormalize and deduct fee

        require(dy >= minOutAmount, "s");
       
        uint256 balanceIn =  self.pooledTokens[inIndex].balanceOf(address(this));

        // we check whether the balance has increased by the suggested inAmount
        require(self.balances[inIndex] + inAmount <= balanceIn,  "insufficient in");

        // update balances
        self.balances[inIndex] = balanceIn;
        self.balances[outIndex] -= dy ;
        self.collectedFees[outIndex] += (dy_fee * self.adminFee) / FEE_DENOMINATOR / self.tokenMultipliers[outIndex];
        self.pooledTokens[outIndex].safeTransfer(to, dy);
        self.lastInvariant = _getInvariant(self);
    }

    /**
     * the same function as swap, but it espects that amounts already have been
     * sent to the contract and it requires the output to be provided
     *  - designed to be used in the requirem swap framework
     *  - deducts the fees from the output, that means that the
     *    output has to be increased by the fee to then create a highe input
     * @param inIndex token index in
     * @param outIndex token index out
     */
    function onSwapGivenOut(
        WeightedSwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 outAmount,
        uint256 maxInAmount,
        address to
    ) external returns (uint256 dx) {

        // the fee is a percentage from the "actual" amountOut, we have to use the quotient because of that
        uint256 _amountOutInclFee = (outAmount * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee);

        // calculate in balance
        dx = WeightedMath._calcInGivenOut(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            _amountOutInclFee
        );

        dx /= self.tokenMultipliers[inIndex]; // denormalize

        require(dx <= maxInAmount, "s");

        // update balances
        self.balances[inIndex] -= dx;
        self.balances[outIndex] -= _amountOutInclFee;
        self.collectedFees[outIndex] += self.adminFee * _amountOutInclFee / FEE_DENOMINATOR;

        // do the transfer after all calculations
        self.pooledTokens[outIndex].safeTransfer(msg.sender, dx);
        self.pooledTokens[outIndex].safeTransfer(to, outAmount); // transfer the desired amount out

        self.lastInvariant = _getInvariant(self);
    }

    /**  
     * @notice Flash Loan using the pool balances
     * it has to recalculate the invariant if called, otherwise manipulations are allowed
     * as all balances are greater than zero, it always will satisfy the invariant condition
     * such that it is greater than the previous one 
    */
    function flashLoan(
        WeightedSwapStorage storage self,
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) internal returns (uint256[] memory feeAmounts){
        uint256 length = amounts.length;
        feeAmounts = new uint256[](length);
        uint256[] memory preLoanBalances = new uint256[](length);

        for (uint256 i = 0; i <  length; ++i) {
            uint256 amount = amounts[i];
            preLoanBalances[i] = self.pooledTokens[i].balanceOf(address(this));
            feeAmounts[i] = (amount * self.fee) / FEE_DENOMINATOR;

            require(preLoanBalances[i] >= amount, "pre balances");
            self.pooledTokens[i].safeTransfer(address(recipient), amount);
        }

        recipient.receiveFlashLoan(self.pooledTokens, amounts, feeAmounts, userData);

        for (uint256 i = 0; i <  length; ++i) {
            uint256 preLoanBalance = preLoanBalances[i];

            // Checking for loan repayment first (without accounting for fees) makes for simpler debugging, and results
            // in more accurate revert reasons if the flash loan protocol fee percentage is zero.
            uint256 postLoanBalance = self.pooledTokens[i].balanceOf(address(this));
            require(postLoanBalance >= preLoanBalance, "post balances");
            self.balances[i] = postLoanBalance;
            self.collectedFees[i] +=  feeAmounts[i] * self.adminFee / FEE_DENOMINATOR;
            // No need for checked arithmetic since we know the loan was fully repaid.
            uint256 receivedFeeAmount = postLoanBalance - preLoanBalance;
            require(receivedFeeAmount >= feeAmounts[i], "insufficient loan fee");
        }
    }

    function removeLiquidityExactIn(
        WeightedSwapStorage storage self,
        uint256 lpAmount,
        uint256[] memory minAmounts
    ) external returns (uint256[] memory amounts, uint256 totalSupply) {
        totalSupply = self.lpToken.totalSupply();
        require(lpAmount <= totalSupply);

        amounts = WeightedMath._calcTokensOutGivenExactBptIn(self.balances, lpAmount, totalSupply);

        for (uint256 i = 0; i < amounts.length; i++) {
            require(amounts[i] >= minAmounts[i], "s");
            self.balances[i] = self.balances[i] - amounts[i];
            self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
        }

        self.lpToken.burnFrom(msg.sender, lpAmount);

        self.lastInvariant = _invariantAfterExit(
            self.balances,
            self.tokenMultipliers,
            self.normalizedWeights,
            amounts);
    }

    function removeLiquidityOneToken(
        WeightedSwapStorage storage self,
        uint256 lpAmount,
        uint256 index,
        uint256 minAmount
    ) external returns (uint256 amountOut) {
        uint256 totalSupply = self.lpToken.totalSupply();
        require(totalSupply > 0, "supply=0");
        require(lpAmount <= self.lpToken.balanceOf(msg.sender), "balanceError");
        require(lpAmount <= totalSupply, "supplyError");
        uint256 swapFee;
        (amountOut, swapFee) = WeightedMath._calcTokenOutGivenExactBptIn(
            self.balances[index] * self.tokenMultipliers[index],
            self.normalizedWeights[index],
            lpAmount,
            totalSupply,
            self.fee
        );

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmount(self, index, swapFee);

        require(amountOut >= minAmount, "s");

        self.balances[index] -= amountOut;
        self.lpToken.burnFrom(msg.sender, lpAmount);
        self.pooledTokens[index].safeTransfer(msg.sender, amountOut);
        uint256[] memory amounts = new uint256[](self.nTokens);
        amounts[index] = amountOut;
        self.lastInvariant = _invariantAfterExit(
            self.balances,
            self.tokenMultipliers,
            self.normalizedWeights,
            amounts);
    }
    
    function removeLiquidityExactOut(
        WeightedSwapStorage storage self,
        uint256[] memory amounts,
        uint256 maxBurnAmount
    ) external returns (uint256 burnAmount, uint256 totalSupply) {
        require(amounts.length == self.nTokens, "array");
        totalSupply = self.lpToken.totalSupply();
        require(totalSupply != 0, "supply");
        uint256[] memory swapFees;
        ( burnAmount, swapFees) = WeightedMath._calcBptInGivenExactTokensOut(
            self.balances,
            self.normalizedWeights,
            _xp(amounts, self.tokenMultipliers),
            totalSupply,
            self.fee
        );

        // This is an exceptional situation in which the fee is charged on a token out instead of a token in.
        // Note that swapFee is already upscaled.
        _processSwapFeeAmounts(self, swapFees);

        require(burnAmount <= maxBurnAmount, "burn exceeded");

        self.lpToken.burnFrom(msg.sender, burnAmount);

        for (uint256 i = 0; i < self.nTokens; i++) {
            if (amounts[i] != 0) {
                self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
                self.balances[i] -= amounts[i];
            }
        }
        self.lastInvariant =  _invariantAfterExit(
            self.balances,
            self.tokenMultipliers,
            self.normalizedWeights,
            amounts
            );
    }

    function calculateRemoveLiquidityExactIn(
        WeightedSwapStorage storage self,
        uint256 outIndex,
        uint256 lpAmount
            ) external view returns (uint256  , uint256){
        return  WeightedMath._calcTokenOutGivenExactBptIn(
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            lpAmount,
            self.lpToken.totalSupply(),
            self.fee
        );
    }

  function calculateRemoveLiquidityExactIn(
        WeightedSwapStorage storage self,
        uint256 lpAmount
    ) external view returns (uint256[] memory amounts) {
        amounts = WeightedMath._calcAllTokensInGivenExactBptOut(
       _xp(self),
        lpAmount,
        self.lpToken.totalSupply()
        );

    }

    /**
     * Estimate amount of LP token minted or burned at deposit or withdrawal
     * without taking fees into account
     */
    function calculateTokenAmount(
        WeightedSwapStorage storage self,
        uint256[] memory amounts,
        bool deposit
    ) external view returns (uint256 lpTokenAmount) {
            if (deposit) {
                ( lpTokenAmount,) = WeightedMath._calcBptOutGivenExactTokensIn(
                    self.balances,
                    self.normalizedWeights,
                    _xp(amounts, self.tokenMultipliers),
                    self.lpToken.totalSupply(),
                    self.fee
                    );
            } else {
                (lpTokenAmount,) = WeightedMath._calcBptInGivenExactTokensOut(
                    self.balances,
                    self.normalizedWeights,
                    _xp(amounts, self.tokenMultipliers),
                    self.lpToken.totalSupply(),
                    self.fee
                    );
                }
    }

    function calculateSwapGivenIn(WeightedSwapStorage storage self, uint256 inIndex, uint256 outIndex, uint256 amountIn) external view returns(uint256 amountOut) {
        
         amountOut = WeightedMath._calcOutGivenIn(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            amountIn
        );
        amountOut -=  (amountOut * self.fee) /  FEE_DENOMINATOR;

    }


    function calculateSwapGivenOut(WeightedSwapStorage storage self, uint256 inIndex, uint256 outIndex, uint256 amountOut) external view 
    returns(uint256 amountIn) {
        
        // the fee is a percentage from the "actual" amountOut, we have to use the quotient because of that
        uint256 _amountOutInclFee = (amountOut * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee);

        // calculate in balance
        amountIn = WeightedMath._calcInGivenOut(
            self.balances[inIndex] * self.tokenMultipliers[inIndex],
            self.normalizedWeights[inIndex],
            self.balances[outIndex] * self.tokenMultipliers[outIndex],
            self.normalizedWeights[outIndex],
            _amountOutInclFee
        );

        amountIn /= self.tokenMultipliers[inIndex];
    }

    function sync(
        WeightedSwapStorage storage self,
        address receiver
    ) external {
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
        self.lastInvariant = _getInvariant(self);
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

    function _xp(WeightedSwapStorage storage self) internal view returns (uint256[] memory) {
        return _xp(self.balances, self.tokenMultipliers);
    }

    /**
     * @dev Returns the current value of the invariant.
     */
    function getInvariant(WeightedSwapStorage storage self) external view returns (uint256) {
        return _getInvariant(self);
    }

    // Helpers

    function _invariantAfterExit(
       uint256[] memory balances,
        uint256[] memory tokenMultipliers,
        uint256[] memory normalizedWeights,
        uint256[] memory amountsOut
    ) private pure returns (uint256 invariant) {
        uint256 length = balances.length;
        uint256[] memory amounts = new uint256[](length);
        
        for (uint256 i = 0; i < length; ++i) {
            amounts[i] = (balances[i] - amountsOut[i]) * tokenMultipliers[i];
        }

        invariant = WeightedMath._calculateInvariant(normalizedWeights, amounts);
    }

    /**
     * @dev This function returns the appreciation of one BPT relative to the
     * underlying tokens. This starts at 1 when the pool is created and grows over time
     */
    function getRate(WeightedSwapStorage storage self) public view returns (uint256) {
        // The initial BPT supply is equal to the invariant times the number of tokens.
        return (_getInvariant(self) * self.nTokens) / self.lpToken.totalSupply();
    }

        /**
     * @dev Returns the current value of the invariant.
     */
    function _getInvariant(WeightedSwapStorage storage self) internal view returns (uint256) {
        return WeightedMath._calculateInvariant(self.normalizedWeights, _xp(self));
    }

    /**
     * @dev recalcultes invariant.
     */
    function setInvariant(WeightedSwapStorage storage self) external {
        self.lastInvariant = WeightedMath._calculateInvariant(self.normalizedWeights, _xp(self));
    }

    // function _joinExactTokensInForBPTOut(
    //     WeightedSwapStorage storage self,
    //     uint256[] memory amountsIn
    // ) private returns (uint256) {
    //     (uint256 bptAmountOut, uint256[] memory swapFees) = WeightedMath._calcBptOutGivenExactTokensIn(
    //         self.balances,
    //         self.normalizedWeights,
    //         _xp( amountsIn, self.tokenMultipliers),
    //         self.lpToken.totalSupply(),
    //         self.fee
    //     );

    //     // Note that swapFees is already upscaled
    //     _processSwapFeeAmounts(self, swapFees);

    //     return bptAmountOut;
    // }

    // function _joinTokenInForExactBPTOut(
    //     WeightedSwapStorage storage self,
    //     uint256 bptAmountOut, 
    //     uint256 tokenIndex
    // ) private returns ( uint256) {

    //     (uint256 amountIn, uint256 swapFee) = WeightedMath._calcTokenInGivenExactBptOut(
    //         self.balances[tokenIndex],
    //         self.normalizedWeights[tokenIndex],
    //         bptAmountOut,
    //         self.lpToken.totalSupply(),
    //         self.fee
    //     );

    //     // Note that swapFee is already upscaled
    //     _processSwapFeeAmount(self, tokenIndex, swapFee);

    //     return amountIn;
    // }

    // function _joinAllTokensInForExactBPTOut(
    //     WeightedSwapStorage storage self,
    //     uint256 bptAmountOut
    //     )
    //     private
    //     view
    //     returns (uint256[] memory amountsIn)
    // {
    //     amountsIn = WeightedMath._calcAllTokensInGivenExactBptOut(
    //         self.balances,
    //         bptAmountOut,
    //         self.lpToken.totalSupply()
    //     );

    // }

    function _processSwapFeeAmount( WeightedSwapStorage storage self, uint256 index, uint256 amount) internal {
        if (amount > 0) {
            self.collectedFees[index] += amount * self.adminFee / FEE_DENOMINATOR;
        }
    }

    function _processSwapFeeAmounts( WeightedSwapStorage storage self, uint256[] memory amounts) internal {
        for (uint256 i = 0; i < amounts.length; ++i) {
            _processSwapFeeAmount(self, i, amounts[i]);
        }
    }

}
