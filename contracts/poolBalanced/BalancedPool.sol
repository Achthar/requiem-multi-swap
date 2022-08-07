// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../libraries/ReentrancyGuard.sol";
import "../libraries/Initializable.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../interfaces/poolBase/IMultiPool.sol";
import "../interfaces/ISwap.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "./BalancedPoolLib.sol";
import "../poolBase/PoolERC20.sol";
import "../poolBase/PoolFeeManagement.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract BalancedPool is ISwap, IPoolFlashLoan, ReentrancyGuard, Initializable, IMultiPool, PoolERC20, PoolFeeManagement {
    using BalancedPoolLib for BalancedPoolLib.BalancedSwapStorage;
    using SafeERC20 for IERC20;
    /// constants
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    BalancedPoolLib.BalancedSwapStorage public swapStorage;
    address public creator;

    // indexes for tokens in array
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "timeout");
        _;
    }

    constructor() ReentrancyGuard() PoolFeeManagement() {}

    function initialize(
        address[] memory _coins,
        uint8[] memory _decimals,
        string memory _name,
        string memory _symbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _creator
    ) external initializer {
        // init LP token description
        _poolTokenInit(_name, _symbol);

        require(_coins.length == _decimals.length, "ArrayError");
        swapStorage.nTokens = _coins.length;
        swapStorage.tokenMultipliers = new uint256[](swapStorage.nTokens);
        swapStorage.pooledTokens = new IERC20[](swapStorage.nTokens);
        require(_fee <= MAX_TRANSACTION_FEE, "SwapFeeError");
        require(_adminFee <= MAX_ADMIN_FEE, "AdminFeeError");

        for (uint8 i = 0; i < swapStorage.nTokens; i++) {
            require(_coins[i] != address(0), "TokenError");
            require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "DecimalsError");
            swapStorage.tokenMultipliers[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = IERC20(_coins[i]);
            tokenIndexes[_coins[i]] = uint8(i);
        }

        // single weight used for mint and burn amount calculation
        swapStorage.normalizedWeight = FixedPoint.ONE / _coins.length;

        swapStorage.balances = new uint256[](swapStorage.nTokens);
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        swapStorage.adminSwapFee = (_adminFee * _fee) / BalancedPoolLib.FEE_DENOMINATOR;

        swapStorage.defaultWithdrawFee = _withdrawFee;
        swapStorage.withdrawDuration = (4 weeks);
        swapStorage.collectedFees = new uint256[](swapStorage.nTokens);
        creator = _creator;
    }

    /// PUBLIC MUTATIVE FUNCTIONS

    // expects amount alrady to be sent to this address
    // calculates the output amount and sends it after deducting the fee
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountOut) {
        amountOut = swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], to);
    }

    // calculates the input amount from a given output amount
    // will transfer amounts to itself as input is not yet known
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external override whenNotPaused nonReentrant {
        swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to);
    }

    /**
     * @notice Very similar to exact out swap, except that transfer to the to address is done before the flash call on the recipient.
     * If data.length == 0, onSwapGivenOut should be used instead.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountIn target amount send to recipient will be calculated from this value
     * @param to receiver for tokenOut amount - and IFlashSwapReceiver implementation
     * @return inAmount
     */
    function onFlashSwapExactIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, to);
    }

    /**
     * @notice Very similar to exact out swap, except that transfer to the to address is done before the flash call on the recipient.
     * If data.length == 0, onSwapGivenOut should be used instead.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountOut target amount which will be obtained if swap succeeds
     * @param to receiver for tokenOut amount - and IFlashSwapReceiver implementation
     * @return inAmount
     */
    function onFlashSwapExactOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to);
    }

    /**  @notice Flash loan using pool balances  */
    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external override nonReentrant whenNotPaused {
        uint256[] memory feeAmounts = swapStorage.flashLoan(recipient, amounts, userData);
        emit FlashLoan(address(recipient), amounts, feeAmounts);
    }

    /// ADD AND REMOVE LIQUIDITY

    /**
     * @notice add liquidity for specified pool token amounts input
     * @param amounts amounts of pooled token ordered the same way as in the pool
     */
    function addLiquidityExactIn(
        uint256[] memory amounts,
        uint256 minMintAmount,
        address to,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256 mintAmount) {
        if (totalSupply == 0) {
            require(msg.sender == creator, "Can only be inititalized by creator");
            // add the first liquidity
            mintAmount = swapStorage.initialize(amounts);
        } else {
            mintAmount = swapStorage.addLiquidityExactTokensIn(amounts, minMintAmount, totalSupply);
        }
        _mint(to, mintAmount);
        emit AddLiquidity(to, amounts, mintAmount);
    }

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        amounts = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts, totalSupply);
        _burn(msg.sender, lpAmount);
        emit RemoveLiquidity(msg.sender, amounts, totalSupply);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 burnAmount) {
        burnAmount = swapStorage.removeLiquidityExactOut(amounts, maxLpBurn, totalSupply);
        _burn(msg.sender, burnAmount);
        emit RemoveLiquidityImbalance(msg.sender, amounts, totalSupply);
    }

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amountReceived) {
        amountReceived = swapStorage.removeLiquidityOneTokenExactIn(lpAmount, index, minAmount, totalSupply);
        _burn(msg.sender, lpAmount);
        emit RemoveLiquidityOne(msg.sender, index, lpAmount, amountReceived);
    }

    /// VIEW FUNCTIONS

    function calculateAddLiquidityExactIn(uint256[] calldata amounts) external view override returns (uint256) {
        return swapStorage.calculateAddLiquidityExactIn(amounts, totalSupply);
    }

    function calculateRemoveLiquidityExactOut(uint256[] calldata amounts, address account) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityExactOut(amounts, totalSupply, account);
    }

    // calculates output amount for given input
    function calculateSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256) {
        return swapStorage.calculateSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn);
    }

    // calculates input amount for given output
    function calculateSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) external view returns (uint256) {
        return swapStorage.calculateSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut);
    }

    function calculateRemoveLiquidityExactIn(uint256 amount, address account) external view override returns (uint256[] memory) {
        return swapStorage.calculateRemoveLiquidityExactIn(amount, totalSupply, account);
    }

    function calculateRemoveLiquidityOneTokenExactIn(
        uint256 amount,
        uint256 index,
        address account
    ) external view override returns (uint256 amountOut) {
        amountOut = swapStorage.calculateRemoveLiquidityOneTokenExactIn(index, amount, totalSupply, account);
    }

    function calculateCurrentWithdrawFee(address account) external view override returns (uint256) {
        return swapStorage._calculateCurrentWithdrawFee(account);
    }

    /// FEE INTERNALS

    /**
     * @notice Sets the swap fee
     * @param newSwapFee new swap fee to be applied on future transactions
     */
    function _setSwapFee(uint256 newSwapFee) internal override {
        swapStorage.fee = newSwapFee;
        swapStorage.adminSwapFee = (swapStorage.adminFee * newSwapFee) / BalancedPoolLib.FEE_DENOMINATOR;
    }

    /**
     * @notice Sets the fee for flash loans
     * @param newFlashFee new flash loan fee
     */
    function _setFlashFee(uint256 newFlashFee) internal override {
        swapStorage.flashFee = newFlashFee;
    }

    /**
     * @notice Sets the admin fee - accessible only to the fee controller
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function _setAdminFee(uint256 newAdminFee) internal override {
        swapStorage.adminFee = newAdminFee;
        swapStorage.adminSwapFee = (newAdminFee * swapStorage.fee) / BalancedPoolLib.FEE_DENOMINATOR;
    }

    /**
     * @notice Sets the duration for which the withdraw fee is applicable
     * and the fee itself
     * @param newWithdrawDuration new flash loan fee
     * @param newDefaultWithdrawFee new default witdraw fee
     */
    function _setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) internal override {
        swapStorage.defaultWithdrawFee = newDefaultWithdrawFee;
        swapStorage.withdrawDuration = newWithdrawDuration;
    }

    function withdrawAdminFee(address _receiver) external override onlyAdmin {
        swapStorage.withdrawCollectedFees(_receiver);
    }

    /// ERC20 ADDITION FOR FEE CONSIDERATION

    /**
     * @notice Updates the user withdraw fee
     * Transferring your pool token will reset the withdraw durtion. If the recipient is already
     * holding some pool tokens, the withdraw fee will be discounted
     * @dev Overrides ERC20._beforeTokenTransfer() which get called on
     * minting and burning. This ensures that swap.updateUserWithdrawFees are called everytime.
     */
    function _beforeTokenTransfer(
        address,
        address to,
        uint256 amount
    ) internal override(PoolERC20) {
        swapStorage._updateUserWithdrawFee(to, this.balanceOf(to), amount);
    }

    /// VIEWS FOR ARRAYS IN SWAPSTORAGE

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }

    function getTokenMultipliers() external view returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getPooledTokens() external view returns (IERC20[] memory) {
        return swapStorage.pooledTokens;
    }
}
