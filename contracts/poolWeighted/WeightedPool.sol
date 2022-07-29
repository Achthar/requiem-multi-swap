// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "../libraries/ReentrancyGuard.sol";
import "../libraries/Initializable.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../base/OwnerPausable.sol";
import "../interfaces/poolWeighted/IWeightedSwap.sol";
import "../interfaces/ISwap.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "./WeightedPoolLib.sol";
import "./WeightedERC20.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract WeightedPool is ISwap, IPoolFlashLoan, OwnerPausable, ReentrancyGuard, Initializable, IWeightedSwap, WeightedERC20 {
    using WeightedPoolLib for WeightedPoolLib.WeightedSwapStorage;
    using SafeERC20 for IERC20;
    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 5e17; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e16; // 1%
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    WeightedPoolLib.WeightedSwapStorage public swapStorage;
    address public creator;
    address public feeDistributor;
    address public feeController;

    // indexes for tokens in array
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "timeout");
        _;
    }

    modifier onlyFeeController() {
        require(msg.sender == feeController, "!feeController");
        _;
    }

    constructor() OwnerPausable() ReentrancyGuard() {}

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
        address _feeController,
        address _creator
    ) external onlyOwner initializer {
        // initialize token
        _poolTokenInit(_name, _symbol);
        // initialize arrays
        _assignArrays(_coins.length, _coins, _normalizedWeights, _decimals);

        require(_fee <= MAX_TRANSACTION_FEE, "feeError");
        require(_adminFee <= MAX_ADMIN_FEE, "feeError");

        swapStorage.normalizedWeights = _normalizedWeights;
        // assign fees
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        swapStorage.adminSwapFee = (_adminFee * _fee) / WeightedPoolLib.FEE_DENOMINATOR;
        swapStorage.defaultWithdrawFee = _withdrawFee;

        // assign creator and fee controller
        creator = _creator;
        feeDistributor = _feeController;
        feeController = _feeController;
    }

    function _assignArrays(
        uint256 _length,
        address[] memory _coins,
        uint256[] memory _normalizedWeights,
        uint8[] memory _decimals
    ) internal {
        swapStorage.nTokens = _length;
        require(_length == _decimals.length, "arrayError");
        swapStorage.withdrawDuration = (4 weeks);
        swapStorage.collectedFees = new uint256[](_length);
        swapStorage.balances = new uint256[](_length);
        swapStorage.tokenMultipliers = new uint256[](_length);
        swapStorage.pooledTokens = new IERC20[](_length);
        // Ensure  each normalized weight is above them minimum and find the token index of the maximum weight
        uint256 normalizedSum = 0;
        for (uint8 i = 0; i < _length; i++) {
            require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "paramError");
            swapStorage.tokenMultipliers[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = IERC20(_coins[i]);
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
        require(to != address(0), "zero Address");
        if (totalSupply == 0) {
            require(msg.sender == creator, "can only be inititalized by creator");
            // add the first liquidity
            mintAmount = swapStorage.initialize(amounts);
        } else {
            mintAmount = swapStorage.addLiquidityExactTokensIn(amounts, minMintAmount, totalSupply);
        }
        _mint(to, mintAmount);
        emit AddLiquidity(msg.sender, amounts, mintAmount);
    }

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        require(this.balanceOf(msg.sender) >= lpAmount, "Insufficient burn amount");
        amounts = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts, totalSupply);
        _burn(msg.sender, lpAmount);
        emit RemoveLiquidity(msg.sender, amounts, totalSupply);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256 burnAmount) {
        burnAmount = swapStorage.removeLiquidityExactOut(amounts, maxLpBurn, totalSupply);
        require(this.balanceOf(msg.sender) >= burnAmount, "Insufficient burn amount");
        _burn(msg.sender, burnAmount);
        emit RemoveLiquidityImbalance(msg.sender, amounts, totalSupply);
    }

    function removeLiquidityOneToken(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amountReceived) {
        require(this.balanceOf(msg.sender) >= lpAmount, "Insufficient burn amount");
        amountReceived = swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount, totalSupply);
        _burn(msg.sender, lpAmount);
        emit RemoveLiquidityOne(msg.sender, index, lpAmount, amountReceived);
    }

    /// VIEW FUNCTIONS

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view override returns (uint256 burnAmount) {
        burnAmount = swapStorage.calculateTokenAmount(amounts, totalSupply, deposit);
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

    function calculateRemoveLiquidityExactIn(uint256 amount) external view override returns (uint256[] memory) {
        return swapStorage.calculateRemoveLiquidityExactIn(amount, totalSupply);
    }

    function calculateRemoveLiquidityOneToken(uint256 amount, uint256 index) external view override returns (uint256 amountOut, uint256 fee) {
        (amountOut, fee) = swapStorage.calculateRemoveLiquidityOneTokenExactIn(index, amount, totalSupply);
    }

    /**
     * @notice Sets the all applicable transaction fees
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     * @param newFlashFee new flash lash loan fee
     */
    function setFee(uint256 newSwapFee, uint256 newFlashFee) external onlyOwner {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "feeError");
        require(newFlashFee <= MAX_TRANSACTION_FEE, "feeError");
        swapStorage.fee = newSwapFee;
        swapStorage.adminSwapFee = (newSwapFee * swapStorage.adminFee) / WeightedPoolLib.FEE_DENOMINATOR;
        swapStorage.flashFee = newFlashFee;

        emit NewTransactionFees(newSwapFee, newFlashFee);
    }

    /**
     * @notice Sets the all applicable fees
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function setAdminFee(uint256 newAdminFee) external onlyFeeController {
        require(newAdminFee <= MAX_ADMIN_FEE, "feeError");
        swapStorage.adminFee = newAdminFee;
        swapStorage.adminSwapFee = (newAdminFee * swapStorage.fee) / WeightedPoolLib.FEE_DENOMINATOR;
        emit NewAdminFee(newAdminFee);
    }

    function setFeeController(address _feeController) external onlyFeeController {
        require(_feeController != address(0), "addressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
    }

    function setFeeDistributor(address _feeDistributor) external onlyFeeController {
        require(_feeDistributor != address(0), "addressError");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

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
    ) internal override(WeightedERC20) {
        swapStorage._updateUserWithdrawFee(to, this.balanceOf(to), amount);
    }

    /**
     * @notice Sets the duration for which the withdraw fee is applicable
     * and the fee itself
     * @param newWithdrawDuration new flash loan fee
     * @param newDefaultWithdrawFee new default witdraw fee
     */
    function setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) external onlyOwner {
        require(newWithdrawDuration <= (4 weeks), "WithdrawDurationError");
        swapStorage.defaultWithdrawFee = newDefaultWithdrawFee;
        swapStorage.withdrawDuration = newWithdrawDuration;
        emit NewWithdrawFee(newWithdrawDuration, newDefaultWithdrawFee);
    }

    function withdrawAdminFee() external onlyFeeController {
        swapStorage.sync(feeDistributor);
    }

    /// VIEWS FOR ARRAYS IN SWAPSTORAGE

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

    function getPooledTokens() external view returns (IERC20[] memory) {
        return swapStorage.pooledTokens;
    }
}
