// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

/**
 * StableSwap main algorithm
 */
library StablePoolLib {
    using SafeERC20 for IERC20;

    event TokenExchange(address indexed buyer, uint256 soldId, uint256 tokensSold, uint256 boughtId, uint256 tokensBought);

    event AddLiquidity(address indexed provider, uint256[] token_amounts, uint256[] fees, uint256 invariant, uint256 token_supply);

    event RemoveLiquidity(address indexed provider, uint256[] token_amounts, uint256[] fees, uint256 token_supply);

    event RemoveLiquidityOne(address indexed provider, uint256 index, uint256 token_amount, uint256 coin_amount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] token_amounts, uint256[] fees, uint256 invariant, uint256 token_supply);

    event CollectProtocolFee(address token, uint256 amount);
    /**
     * @dev Emitted for each individual flash loan performed by `flashLoan`.
     */
    event FlashLoan(IFlashLoanRecipient indexed recipient, IERC20 indexed token, uint256 amount, uint256 feeAmount);

    uint256 public constant FEE_DENOMINATOR = 1e18;

    /// @dev protect from division loss when run approximation loop. We cannot divide at the end because of overflow,
    /// so we add some (small) PRECISION when divide in each iteration
    uint256 public constant A_PRECISION = 1e3;
    /// @dev max iteration of converge calccuate
    uint256 internal constant MAX_ITERATION = 256;
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    struct SwapStorage {
        /// @dev tokens in pool
        IERC20[] pooledTokens;
        /// @dev token i multiplier to reach POOL_TOKEN_COMMON_DECIMALS
        uint256[] tokenMultipliers;
        uint256 nTokens;
        /// @dev effective balance which might different from token balance of the contract 'cause it hold admin fee as well
        uint256[] balances;
        /// @dev swap fee ratio. Charge on any action which move balance state far from the ideal state
        uint256 fee;
        /// @dev flash loan fee. Charged on full loan amount, should be acccordingly low
        uint256 flashFee;
        /// @dev admin fee in ratio of swap fee.
        uint256 adminFee;
        uint256 adminSwapFee;
        /// @dev observation of A, multiplied with A_PRECISION
        uint256 initialA;
        uint256 futureA;
        uint256 initialATime;
        uint256 futureATime;
        /// @dev withdrawal fee control
        uint256 defaultWithdrawFee;
        uint256 withdrawDuration;
        mapping(address => uint256) depositTimestamp;
        mapping(address => uint256) feeEndTimestamp;
        mapping(address => uint256) withdrawFeeMultiplier;
        /// @dev array that collects admin fees
        uint256[] collectedFees;
    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @param minMintAmount Minimum amount of LP tokens to mint from the deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidityExactIn(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 tokenSupply
    ) external returns (uint256 mintAmount) {
        uint256 nCoins = self.pooledTokens.length;
        require(amounts.length == nCoins, "arrayError");
        uint256[] memory fees = new uint256[](nCoins);
        uint256 _fee = _feePerToken(self);

        uint256 amp = _getAPrecise(self);

        uint256 D0 = _getD(_xp(self.balances, self.tokenMultipliers), amp);

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            // get real transfer in amount
            newBalances[i] += _doTransferIn(self.pooledTokens[i], amounts[i]);
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        assert(D1 > D0); // double check

        uint256 diff = 0;
        for (uint256 i = 0; i < nCoins; i++) {
            diff = _distance((D1 * self.balances[i]) / D0, newBalances[i]);
            fees[i] = (_fee * diff) / FEE_DENOMINATOR;
            self.balances[i] = newBalances[i];
            // deduct swap fee
            newBalances[i] -= fees[i];
            // collect admin fee
            self.collectedFees[i] += (fees[i] * self.adminFee) / FEE_DENOMINATOR;
        }
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        mintAmount = (tokenSupply * (D1 - D0)) / D0;

        require(mintAmount >= minMintAmount, "slippageError");

        emit AddLiquidity(msg.sender, amounts, fees, D1, mintAmount);
    }

    /**
     * @notice Deposit coins into the pool for the first time
     * @param amounts List of amounts of coins to deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidityInit(SwapStorage storage self, uint256[] memory amounts) external returns (uint256 mintAmount) {
        uint256 nCoins = self.pooledTokens.length;
        require(amounts.length == nCoins, "arrayError");

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            require(amounts[i] > 0, "tokenError");

            // get real transfer in amount
            newBalances[i] += _doTransferIn(self.pooledTokens[i], amounts[i]);
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), _getAPrecise(self));
        assert(D1 > 0); // double check

        self.balances = newBalances;
        mintAmount = D1;

        emit AddLiquidity(msg.sender, amounts, new uint256[](nCoins), D1, mintAmount);
    }

    /**
     *  the same function as swap, but it expects that amounts already have been
     *  sent to the contract
     *   - designed to be used in the Requiem Swap framework
     *   - deducts the fee from the output, in this case simple as the output is the calculated value
     *   - viable function for batch swapping
     * @param i token index in
     * @param j token index out
     */
    function onSwapGivenIn(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        address to
    ) external returns (uint256 dy) {
        uint256 balanceIn = self.pooledTokens[i].balanceOf(address(this));
        uint256 inAmount = balanceIn - self.balances[i];
        uint256[] memory normalizedBalances = _xp(self);
        uint256 x = normalizedBalances[i] + (inAmount * self.tokenMultipliers[i]);
        uint256 y = _getY(self, i, j, x, normalizedBalances);

        dy = (normalizedBalances[j] - y) / self.tokenMultipliers[j]; // denormalize
        uint256 dy_fee = (dy * self.fee) / FEE_DENOMINATOR; // charge fee on actual out amount

        dy -= dy_fee;

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= dy;
        self.collectedFees[j] += (dy_fee * self.adminFee) / FEE_DENOMINATOR;

        self.pooledTokens[j].safeTransfer(to, dy);

        emit TokenExchange(to, i, inAmount, j, dy);
    }

    /**
     * @notice Full swap given out - assumes that correct amount in to be sent in already.
     * @param i token index in
     * @param j token index out
     */
    function onSwapGivenOut(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 outAmount,
        address to
    ) external {
        uint256[] memory normalizedBalances = _xp(self);

        // calculate in balance based on desired output
        uint256 newOutBalance = normalizedBalances[j] - (outAmount * self.tokenMultipliers[j]);
        uint256 inBalanceVirtual = _getY(self, j, i, newOutBalance, normalizedBalances);

        // calculated in amount
        uint256 inAmountNormalized = inBalanceVirtual - normalizedBalances[i];

        // add fee to in Amount
        uint256 inAmount = (inAmountNormalized * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee) / self.tokenMultipliers[i] + 1;

        // get received amount
        uint256 balanceIn = self.pooledTokens[i].balanceOf(address(this));
        uint256 inAmountActual = balanceIn - self.balances[i];

        // check the whether sufficient amounts have been sent in
        require(inAmount <= inAmountActual, "insufficient in");

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= outAmount;

        // collect admin fee
        self.collectedFees[j] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        // finally transfer the tokens
        self.pooledTokens[j].safeTransfer(to, outAmount);

        emit TokenExchange(to, i, inAmount, j, outAmount);
    }

    /**  @notice Flash Loan using the stable swap balances*/
    function flashLoan(
        SwapStorage storage self,
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external {
        uint256[] memory feeAmounts = new uint256[](amounts.length);
        uint256[] memory preLoanBalances = new uint256[](amounts.length);

        for (uint256 i = 0; i < amounts.length; ++i) {
            IERC20 token = self.pooledTokens[i];
            uint256 amount = amounts[i];

            preLoanBalances[i] = token.balanceOf(address(this));
            feeAmounts[i] = (amount * self.flashFee) / FEE_DENOMINATOR;

            require(preLoanBalances[i] >= amount, "pre balances");
            token.safeTransfer(address(recipient), amount);
        }

        recipient.receiveFlashLoan(self.pooledTokens, amounts, feeAmounts, userData);

        for (uint256 i = 0; i < amounts.length; ++i) {
            IERC20 token = self.pooledTokens[i];
            uint256 preLoanBalance = preLoanBalances[i];

            // Checking for loan repayment first (without accounting for fees) makes for simpler debugging, and results
            // in more accurate revert reasons if the flash loan protocol fee percentage is zero.
            uint256 postLoanBalance = token.balanceOf(address(this));
            require(postLoanBalance >= preLoanBalance, "post balances");
            self.balances[i] = postLoanBalance;
            self.collectedFees[i] += (feeAmounts[i] * self.adminFee) / FEE_DENOMINATOR;
            // No need for checked arithmetic since we know the loan was fully repaid.
            uint256 receivedFeeAmount = postLoanBalance - preLoanBalance;
            require(receivedFeeAmount >= feeAmounts[i], "insufficient loan fee");

            emit FlashLoan(recipient, token, amounts[i], receivedFeeAmount);
        }
    }

    function removeLiquidityExactIn(
        SwapStorage storage self,
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 totalSupply
    ) external returns (uint256[] memory amounts) {
        require(lpAmount <= totalSupply);
        uint256 nCoins = self.pooledTokens.length;

        uint256[] memory fees = new uint256[](nCoins);
        amounts = _calculateRemoveLiquidity(self, msg.sender, lpAmount, totalSupply);

        for (uint256 i = 0; i < amounts.length; i++) {
            require(amounts[i] >= minAmounts[i], "slippageError");
            self.balances[i] = self.balances[i] - amounts[i];
            self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
        }

        emit RemoveLiquidity(msg.sender, amounts, fees, totalSupply - lpAmount);
    }

    function removeLiquidityOneToken(
        SwapStorage storage self,
        uint256 lpAmount,
        uint256 index,
        uint256 minAmount,
        uint256 totalSupply
    ) external returns (uint256 dy) {
        uint256 numTokens = self.pooledTokens.length;
        require(index < numTokens, "tokenError");

        uint256 dyFee;

        (dy, dyFee) = _calculateRemoveLiquidityOneToken(self, msg.sender, lpAmount, index, totalSupply);

        require(dy >= minAmount, "slippageError");

        self.balances[index] -= dy;
        self.collectedFees[index] += (dyFee * self.adminFee) / FEE_DENOMINATOR;
        self.pooledTokens[index].safeTransfer(msg.sender, dy);

        emit RemoveLiquidityOne(msg.sender, index, lpAmount, dy);
    }

    function removeLiquidityImbalance(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 totalSupply
    ) external returns (uint256 burnAmount) {
        require(amounts.length == self.nTokens, "arrayError");
        uint256 _fee = _feePerToken(self);
        uint256 amp = _getAPrecise(self);

        uint256[] memory newBalances = self.balances;
        uint256 D0 = _getD(_xp(self), amp);

        for (uint256 i = 0; i < self.nTokens; i++) {
            newBalances[i] -= amounts[i];
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        uint256[] memory fees = new uint256[](self.nTokens);

        for (uint256 i = 0; i < self.nTokens; i++) {
            uint256 idealBalance = (D1 * self.balances[i]) / D0;
            fees[i] = (_fee * _distance(newBalances[i], idealBalance)) / FEE_DENOMINATOR;
            self.balances[i] = newBalances[i];
            self.collectedFees[i] += (fees[i] * self.adminFee) / FEE_DENOMINATOR;
            newBalances[i] -= fees[i];
            if (amounts[i] != 0) {
                self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
            }
        }

        // recalculate invariant with fee charged balances
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        burnAmount = ((D0 - D1) * totalSupply) / D0;
        assert(burnAmount > 0);
        // In case of rounding errors - make it unfavorable for the "attacker"
        burnAmount = ((burnAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, msg.sender));
        require(burnAmount <= maxBurnAmount, "slippageError");

        emit RemoveLiquidityImbalance(msg.sender, amounts, fees, D1, totalSupply - burnAmount);
    }

    function sync(SwapStorage storage self, address receiver) external {
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

    /// VIEW FUNCTIONS
    function getAPrecise(SwapStorage storage self) external view returns (uint256) {
        return _getAPrecise(self);
    }

    /**
     * Returns portfolio virtual price (for calculating profit)
     * scaled up by 1e18
     */
    function getVirtualPrice(SwapStorage storage self, uint256 totalSupply) external view returns (uint256) {
        uint256 D = _getD(_xp(self), _getAPrecise(self));
        return (D * 10**POOL_TOKEN_COMMON_DECIMALS) / totalSupply;
    }

    function getAdminBalance(SwapStorage storage self, uint256 index) external view returns (uint256) {
        require(index < self.pooledTokens.length, "arrayError");
        return self.pooledTokens[index].balanceOf(address(this)) - (self.balances[index]);
    }

    /**
     * Estimate amount of LP token minted at deposit
     * with taking fees into account
     */
    function calculateAddLiquidityExactIn(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply
    ) external view returns (uint256 mintAmount) {
        uint256 nCoins = self.pooledTokens.length;
        require(amounts.length == nCoins, "arrayError");
        uint256 _fee = _feePerToken(self);

        uint256 amp = _getAPrecise(self);

        uint256 D0 = _getD(_xp(self.balances, self.tokenMultipliers), amp);

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            newBalances[i] += amounts[i];
        }
        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);

        for (uint256 i = 0; i < nCoins; i++) {
            uint256 diff = _distance((D1 * self.balances[i]) / D0, newBalances[i]);
            newBalances[i] -= (_fee * diff) / FEE_DENOMINATOR;
        }
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        mintAmount = (totalSupply * (D1 - D0)) / D0;
    }

    /**
     * Estimate amount of LP token burnt on withdrawal
     * with taking fees into account
     */
    function calculateRemoveLiquidityExactOut(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply,
        address account
    ) external view returns (uint256 burnAmount) {
        require(amounts.length == self.nTokens, "arrayError");
        uint256 _fee = _feePerToken(self);
        uint256 amp = _getAPrecise(self);

        uint256[] memory newBalances = self.balances;
        uint256 D0 = _getD(_xp(self), amp);

        for (uint256 i = 0; i < self.nTokens; i++) {
            newBalances[i] -= amounts[i];
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);

        for (uint256 i = 0; i < self.nTokens; i++) {
            uint256 idealBalance = (D1 * self.balances[i]) / D0;
            newBalances[i] -= (_fee * _distance(newBalances[i], idealBalance)) / FEE_DENOMINATOR;
        }

        // recalculate invariant with fee charged balances
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        burnAmount = ((D0 - D1) * totalSupply) / D0;
        burnAmount = ((burnAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account));
    }

    function getA(SwapStorage storage self) external view returns (uint256) {
        return _getAPrecise(self) / A_PRECISION;
    }

    /**  @notice pre-implements calculation for Requiem interface for exat in swap */
    function calculateSwapGivenIn(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inAmount
    ) external view returns (uint256) {
        uint256[] memory normalizedBalances = _xp(self);
        uint256 newInBalance = normalizedBalances[inIndex] + (inAmount * self.tokenMultipliers[inIndex]);
        uint256 outBalance = _getY(self, inIndex, outIndex, newInBalance, normalizedBalances);
        uint256 outAmount = (normalizedBalances[outIndex] - outBalance);
        uint256 _fee = (self.fee * outAmount) / FEE_DENOMINATOR;
        return (outAmount - _fee) / self.tokenMultipliers[outIndex];
    }

    /**
     * @notice pre-implements calculation for Requiem interface for exat out swap
     * that due to the fact that the structure is not symmetric (unlike 50/50 pairs)
     * we require a separate function to calculate the input for a given output
     */
    function calculateSwapGivenOut(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 outAmount
    ) external view returns (uint256) {
        uint256[] memory normalizedBalances = _xp(self);
        // fee has to be deducted on the output
        uint256 newOutBalance = normalizedBalances[outIndex] - (outAmount * self.tokenMultipliers[outIndex]);
        // switch index on regular _getY function
        uint256 inBalance = _getY(self, outIndex, inIndex, newOutBalance, normalizedBalances);

        return ((inBalance - normalizedBalances[inIndex]) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - self.fee) / self.tokenMultipliers[inIndex] + 1;
    }

    function calculateRemoveLiquidityExactIn(
        SwapStorage storage self,
        address account,
        uint256 amount,
        uint256 totalSupply
    ) external view returns (uint256[] memory) {
        return _calculateRemoveLiquidity(self, account, amount, totalSupply);
    }

    function calculateRemoveLiquidityOneToken(
        SwapStorage storage self,
        address account,
        uint256 lpAmount,
        uint256 tokenIndex,
        uint256 totalSupply
    ) external view returns (uint256 amount) {
        (amount, ) = _calculateRemoveLiquidityOneToken(self, account, lpAmount, tokenIndex, totalSupply);
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
    function updateUserWithdrawFee(
        SwapStorage storage self,
        address user,
        uint256 userBalance,
        uint256 toMint
    ) external {
        _updateUserWithdrawFee(self, user, userBalance, toMint);
    }

    /// INTERNAL FUNCTIONS

    /**
     * Ramping A up or down, return A with precision of A_PRECISION
     */
    function _getAPrecise(SwapStorage storage self) internal view returns (uint256) {
        if (block.timestamp >= self.futureATime) {
            return self.futureA;
        }

        if (self.futureA > self.initialA) {
            return self.initialA + ((self.futureA - self.initialA) * (block.timestamp - self.initialATime)) / (self.futureATime - self.initialATime);
        }

        return self.initialA - ((self.initialA - self.futureA) * (block.timestamp - self.initialATime)) / (self.futureATime - self.initialATime);
    }

    /**
     * normalized balances of each tokens.
     */
    function _xp(uint256[] memory balances, uint256[] memory rates) internal pure returns (uint256[] memory) {
        for (uint256 i = 0; i < balances.length; i++) {
            rates[i] = (rates[i] * balances[i]);
        }

        return rates;
    }

    function _xp(SwapStorage storage self) internal view returns (uint256[] memory) {
        return _xp(self.balances, self.tokenMultipliers);
    }

    /**
     * Calculate D for *NORMALIZED* balances of each tokens
     * @param xp normalized balances of token
     */
    function _getD(uint256[] memory xp, uint256 amp) internal pure returns (uint256) {
        uint256 nCoins = xp.length;
        uint256 sum = _sumOf(xp);
        if (sum == 0) {
            return 0;
        }

        uint256 Dprev = 0;
        uint256 D = sum;
        uint256 Ann = amp * nCoins;

        for (uint256 i = 0; i < MAX_ITERATION; i++) {
            uint256 D_P = D;
            for (uint256 j = 0; j < xp.length; j++) {
                D_P = (D_P * D) / (xp[j] * nCoins);
            }
            Dprev = D;
            D = (((Ann * sum) / A_PRECISION + D_P * nCoins) * D) / (((Ann - A_PRECISION) * D) / A_PRECISION + (nCoins + 1) * D_P);
            if (_distance(D, Dprev) <= 1) {
                return D;
            }
        }

        // Convergence should occur in 4 loops or less. If this is reached, there may be something wrong
        // with the pool. If this were to occur repeatedly, LPs should withdraw via `removeLiquidity()`
        // function which does not rely on D.
        revert("calcError");
    }

    /**
     * calculate new balance of when swap
     * Done by solving quadratic equation iteratively.
     *  x_1**2 + x_1 * (sum' - (A*n**n - 1) * D / (A * n**n)) = D ** (n + 1) / (n ** (2 * n) * prod' * A)
     *  x_1**2 + b*x_1 = c
     *  x_1 = (x_1**2 + c) / (2*x_1 + b)
     * @param inIndex index of token to swap in
     * @param outIndex index of token to swap out
     * @param inBalance new balance (normalized) of input token if the swap is successful
     * @return NORMALIZED balance of output token if the swap is successful
     */
    function _getY(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inBalance,
        uint256[] memory normalizedBalances
    ) internal view returns (uint256) {
        require(inIndex != outIndex, "tokenError");
        uint256 nCoins = self.nTokens;
        require(inIndex < nCoins && outIndex < nCoins, "arrayError");

        uint256 amp = _getAPrecise(self);
        uint256 Ann = amp * nCoins;
        uint256 D = _getD(normalizedBalances, amp); // calculate invariant

        uint256 sum = 0; // sum of new balances except output token
        uint256 c = D;
        for (uint256 i = 0; i < nCoins; i++) {
            if (i == outIndex) {
                continue;
            }

            uint256 x = i == inIndex ? inBalance : normalizedBalances[i];
            sum += x;
            c = (c * D) / (x * nCoins);
        }

        c = (c * D * A_PRECISION) / (Ann * nCoins);
        uint256 b = sum + (D * A_PRECISION) / Ann;

        uint256 lastY = 0;
        uint256 y = D;

        for (uint256 index = 0; index < MAX_ITERATION; index++) {
            lastY = y;
            y = (y * y + c) / (2 * y + b - D);
            if (_distance(lastY, y) <= 1) {
                return y;
            }
        }

        revert("calcError");
    }

    function _calculateRemoveLiquidity(
        SwapStorage storage self,
        address account,
        uint256 amount,
        uint256 totalSupply
    ) internal view returns (uint256[] memory) {
        require(amount <= totalSupply, "supplyError");

        uint256 feeAdjustedAmount = (amount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;

        uint256[] memory amounts = new uint256[](self.pooledTokens.length);

        for (uint256 i = 0; i < self.pooledTokens.length; i++) {
            amounts[i] = (self.balances[i] * feeAdjustedAmount) / totalSupply;
        }
        return amounts;
    }

    function _calculateRemoveLiquidityOneToken(
        SwapStorage storage self,
        address account,
        uint256 tokenAmount,
        uint256 index,
        uint256 totalSupply
    ) internal view returns (uint256 dy, uint256 fee) {
        require(index < self.pooledTokens.length, "arrayError");
        uint256 amp = _getAPrecise(self);
        uint256[] memory xp = _xp(self);
        uint256 D0 = _getD(xp, amp);
        uint256 D1 = D0 - (tokenAmount * D0) / totalSupply;
        uint256 newY = _getYD(self, amp, index, xp, D1);
        uint256[] memory reducedXP = xp;
        uint256 _fee = _feePerToken(self);

        for (uint256 i = 0; i < self.pooledTokens.length; i++) {
            uint256 expectedDx;
            if (i == index) {
                expectedDx = (xp[i] * D1) / D0 - newY;
            } else {
                expectedDx = xp[i] - (xp[i] * D1) / D0;
            }
            reducedXP[i] -= (_fee * expectedDx) / FEE_DENOMINATOR;
        }

        dy = reducedXP[index] - _getYD(self, amp, index, reducedXP, D1);
        dy = (dy - 1) / self.tokenMultipliers[index];
        fee = ((xp[index] - newY) / self.tokenMultipliers[index]) - dy;
        dy = (dy * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;
    }

    function _feePerToken(SwapStorage storage self) internal view returns (uint256) {
        uint256 nCoins = self.nTokens;
        return (self.fee * nCoins) / (4 * (nCoins - 1));
    }

    function _getYD(
        SwapStorage storage self,
        uint256 A,
        uint256 index,
        uint256[] memory xp,
        uint256 D
    ) internal view returns (uint256) {
        uint256 nCoins = self.nTokens;
        assert(index < nCoins);
        uint256 Ann = A * nCoins;
        uint256 c = D;
        uint256 s = 0;
        uint256 _x = 0;
        uint256 yPrev = 0;

        for (uint256 i = 0; i < nCoins; i++) {
            if (i == index) {
                continue;
            }
            _x = xp[i];
            s += _x;
            c = (c * D) / (_x * nCoins);
        }

        c = (c * D * A_PRECISION) / (Ann * nCoins);
        uint256 b = s + (D * A_PRECISION) / Ann;
        uint256 y = D;

        for (uint256 i = 0; i < MAX_ITERATION; i++) {
            yPrev = y;
            y = (y * y + c) / (2 * y + b - D);
            if (_distance(yPrev, y) <= 1) {
                return y;
            }
        }
        revert("calcError");
    }

    function _updateUserWithdrawFee(
        SwapStorage storage self,
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
    function _calculateCurrentWithdrawFee(SwapStorage storage self, address user) internal view returns (uint256) {
        uint256 endTime = self.feeEndTimestamp[user];
        if (endTime > block.timestamp) {
            uint256 timeLeftover = endTime - block.timestamp;
            return (self.defaultWithdrawFee * self.withdrawFeeMultiplier[user] * timeLeftover) / self.withdrawDuration / FEE_DENOMINATOR;
        }
        return 0;
    }

    function _doTransferIn(IERC20 token, uint256 amount) internal returns (uint256) {
        uint256 priorBalance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        return token.balanceOf(address(this)) - priorBalance;
    }

    function _sumOf(uint256[] memory x) internal pure returns (uint256 sum) {
        sum = 0;
        for (uint256 i = 0; i < x.length; i++) {
            sum += x[i];
        }
    }

    function _distance(uint256 x, uint256 y) internal pure returns (uint256) {
        return x > y ? x - y : y - x;
    }
}
