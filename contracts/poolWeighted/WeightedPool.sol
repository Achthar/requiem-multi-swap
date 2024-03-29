// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "../libraries/ReentrancyGuard.sol";
import "../libraries/Initializable.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../interfaces/poolBase/IMultiPool.sol";
import "../interfaces/ISwap.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "./WeightedPoolLib.sol";
import "../poolBase/PoolERC20.sol";
import "../poolBase/PoolFeeManagement.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract WeightedPool is ISwap, IPoolFlashLoan, ReentrancyGuard, Initializable, IMultiPool, PoolERC20, PoolFeeManagement {
    using WeightedPoolLib for WeightedPoolLib.WeightedSwapStorage;
    /// constants
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    // storage
    WeightedPoolLib.WeightedSwapStorage public swapStorage;
    // creator of the pool
    address public creator;
    // indexes for tokens in array
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "Timeout");
        _;
    }

    constructor() ReentrancyGuard() PoolFeeManagement() {}

    function initialize(
        address[] memory _coins,
        uint8[] memory _decimals,
        uint256[] memory _normalizedWeights,
        string memory _name,
        string memory _symbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _votingRegister,
        address _creator
    ) external initializer {
        // initialize token
        _poolTokenInit(_name, _symbol, _votingRegister);
        // initialize arrays
        _assignArrays(_coins.length, _coins, _normalizedWeights, _decimals);

        require(_fee <= MAX_TRANSACTION_FEE, "SwapFeeError");
        require(_adminFee <= MAX_ADMIN_FEE, "AdminFeeError");

        swapStorage.normalizedWeights = _normalizedWeights;
        // assign fees
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        swapStorage.adminSwapFee = (_adminFee * _fee) / WeightedPoolLib.FEE_DENOMINATOR;
        swapStorage.defaultWithdrawFee = _withdrawFee;

        // assign creator and fee controller
        creator = _creator;
    }

    function _assignArrays(
        uint256 _length,
        address[] memory _coins,
        uint256[] memory _normalizedWeights,
        uint8[] memory _decimals
    ) private {
        swapStorage.nTokens = _length;
        require(_length == _decimals.length, "ArrayError");
        swapStorage.withdrawDuration = (4 weeks);
        swapStorage.collectedFees = new uint256[](_length);
        swapStorage.balances = new uint256[](_length);
        swapStorage.tokenMultipliers = new uint256[](_length);
        swapStorage.pooledTokens = new address[](_length);
        // Ensure  each normalized weight is above them minimum and find the token index of the maximum weight
        uint256 normalizedSum = 0;
        for (uint8 i = 0; i < _length; i++) {
            require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "DecimalError");
            swapStorage.tokenMultipliers[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = _coins[i];
            tokenIndexes[_coins[i]] = i;
            require(_normalizedWeights[i] >= WeightedMath._MIN_WEIGHT, "MIN_WEIGHT");
            normalizedSum += _normalizedWeights[i];
        }
        require(normalizedSum == FixedPoint.ONE, "NORMALIZED_WEIGHT_INVARIANT");
    }

    /// PUBLIC MUTATIVE FUNCTIONS

    /**
     * @notice calculates and executes the exact-in swap for an amount of token in tht has already been sent to this address.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param to receiver for tokenOut amount
     * @return amountOut calculated out amount
     */
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountOut) {
        amountOut = swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], to);
    }

    /**
     * @notice Very similar to exact in swap, except that transfer to the to address is done before the flash call on the recipient.
     * If data.length == 0, onSwapGivenOut should be used instead.
     * @param flashContract contract on which the receiver function is called
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountIn target amount send to recipient will be calculated from this value
     * @param to receiver for tokenOut amount - not necesariliy the flashContract address
     * @return inAmount
     */
    function onFlashSwapGivenIn(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to,
        bytes calldata data
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, to, flashContract, data);
    }

    /**
     * @notice calculates and executes the exact-out swap for an amount of token in tht has already been sent to this address.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountOut target amount which will be obtained if swap succeeds
     * @param to receiver for tokenOut amount
     */
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
     * @param flashContract contract on which the receiver function is called
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountOut target amount which will be obtained if swap succeeds
     * @param to receiver for tokenOut amount - not necesariliy the flashContract address
     * @return inAmount
     */
    function onFlashSwapGivenOut(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to,
        bytes calldata data
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to, flashContract, data);
    }

    /**  @notice Flash loan using weighted pool balances  */
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
        require(to != address(0), "Zero Address");
        mintAmount = swapStorage.addLiquidityExactTokensIn(amounts, minMintAmount, totalSupply, creator);
        _mint(to, mintAmount);
    }

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        amounts = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 burnAmount) {
        burnAmount = swapStorage.removeLiquidityExactOut(amounts, maxLpBurn, totalSupply);
        _burn(msg.sender, burnAmount);
    }

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amountReceived) {
        amountReceived = swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    /// VIEW FUNCTIONS

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

    function calculateAddLiquidityExactIn(uint256[] calldata amounts) external view override returns (uint256) {
        return swapStorage.calculateAddLiquidityExactIn(amounts, totalSupply);
    }

    function calculateRemoveLiquidityExactOut(uint256[] calldata amounts, address account) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityExactOut(amounts, totalSupply, account);
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
        swapStorage.adminSwapFee = (swapStorage.adminFee * newSwapFee) / WeightedPoolLib.FEE_DENOMINATOR;
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
        swapStorage.adminSwapFee = (newAdminFee * swapStorage.fee) / WeightedPoolLib.FEE_DENOMINATOR;
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
        require(_receiver != address(0), "Cannot withdraw to zero address");
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
        swapStorage.updateUserWithdrawFee(to, this.balanceOf(to), amount);
    }

    /// VIEWS FOR VARIABLES IN SWAPSTORAGE

    /**
     * @notice Return timestamp of last deposit of given address
     * @return timestamp of the last deposit made by the given address
     */
    function getDepositTimestamp(address user) external view returns (uint256) {
        return swapStorage.depositTimestamp[user];
    }

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getTokenWeights() external view returns (uint256[] memory) {
        return swapStorage.normalizedWeights;
    }

    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }

    function getTokenMultipliers() external view returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getPooledTokens() external view returns (address[] memory) {
        return swapStorage.pooledTokens;
    }
}
