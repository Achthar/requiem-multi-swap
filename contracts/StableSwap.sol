// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./libraries/ReentrancyGuard.sol";
import "./libraries/Initializable.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeERC20.sol";
import "./base/OwnerPausable.sol";
import "./StableSwapLib.sol";
import "./interfaces/IStableSwap.sol";
import "./interfaces/ISwap.sol";
import "./interfaces/IFlashLoanRecipient.sol";

using StableSwapLib for StableSwapLib.SwapStorage global;
using SafeERC20 for IERC20 global;

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract StableSwap is ISwap, OwnerPausable, ReentrancyGuard, Initializable, IStableSwap {

    /// constants
    uint256 internal constant MIN_RAMP_TIME = 1 days;
    uint256 internal constant MAX_A = 1e6;
    uint256 internal constant MAX_A_CHANGE = 10;
    uint256 internal constant MAX_ADMIN_FEE = 1e10; // 100%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e8; // 1%

    /// STATE VARS
    StableSwapLib.SwapStorage public swapStorage;
    address public feeDistributor;
    address public feeController;
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "timeout");
        _;
    }

    modifier onlyFeeControllerOrOwner() {
        require(msg.sender == feeController || msg.sender == owner(), "!feeController");
        _;
    }

    function initialize(
        address[] memory _coins,
        uint8[] memory _decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _A,
        uint256 _fee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _feeDistributor
    ) external onlyOwner initializer {
        require(_coins.length == _decimals.length, "arrayError");
        require(_feeDistributor != address(0), "addressError");
        uint256 numberOfCoins = _coins.length;
        uint256[] memory rates = new uint256[](numberOfCoins);
        IERC20[] memory coins = new IERC20[](numberOfCoins);
        for (uint256 i = 0; i < numberOfCoins; i++) {
            require(_coins[i] != address(0), "addressError");
            require(_decimals[i] <= StableSwapLib.POOL_TOKEN_COMMON_DECIMALS, "paramError");
            rates[i] = 10**(StableSwapLib.POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            coins[i] = IERC20(_coins[i]);
            tokenIndexes[address(coins[i])] = uint8(i);
        }

        require(_A < MAX_A, "paramError");
        require(_fee <= MAX_TRANSACTION_FEE, "feeError");
        require(_adminFee <= MAX_ADMIN_FEE, "feeError");
        require(_withdrawFee <= MAX_TRANSACTION_FEE, "feeError");

        swapStorage.lpToken = new LPToken(lpTokenName, lpTokenSymbol);
        swapStorage.balances = new uint256[](numberOfCoins);
        swapStorage.tokenMultipliers = rates;
        swapStorage.pooledTokens = coins;
        swapStorage.initialA = _A * StableSwapLib.A_PRECISION;
        swapStorage.futureA = _A * StableSwapLib.A_PRECISION;
        swapStorage.fee = _fee;
        swapStorage.adminFee = _adminFee;
        swapStorage.defaultWithdrawFee = _withdrawFee;
        feeDistributor = _feeDistributor;
        swapStorage.collectedFees = new uint256[](numberOfCoins);
    }

    /// PUBLIC FUNCTIONS
    function addLiquidity(
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256) {
        return swapStorage.addLiquidity(amounts, minMintAmount);
    }

    // expects amount alrady to be sent to this address
    // calculates the output amount and sends it after deducting the fee
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, to);
    }

    // calculates the input amount from a given output amount
    // will transfer amounts to itself as input is not yet known
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external override whenNotPaused nonReentrant {
        return swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to);
    }

     /**  @notice Flash loan using stable swap balances  */
    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external override nonReentrant whenNotPaused {
        swapStorage.flashLoan(recipient, amounts, userData);
    }

    function removeLiquidity(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory) {
        return swapStorage.removeLiquidity(lpAmount, minAmounts);
    }

    function removeLiquidityOneToken(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256) {
        return swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount);
    }

    function removeLiquidityImbalance(
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256) {
        return swapStorage.removeLiquidityImbalance(amounts, maxBurnAmount);
    }

    /// VIEW FUNCTIONS

    function getVirtualPrice() external view override returns (uint256) {
        return swapStorage.getVirtualPrice();
    }

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view override returns (uint256) {
        return swapStorage.calculateTokenAmount(amounts, deposit);
    }

    // calculates output amount for given input
    function calculateSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256) {
        return swapStorage.calculateSwap(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn);
    }

    // calculates input amount for given output
    function calculateSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) external view returns (uint256) {
        return swapStorage.calculateSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut);
    }

    function calculateRemoveLiquidity(address account, uint256 amount) external view override returns (uint256[] memory) {
        return swapStorage.calculateRemoveLiquidity(account, amount);
    }

    function calculateRemoveLiquidityOneToken(
        address account,
        uint256 amount,
        uint8 index
    ) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityOneToken(account, amount, index);
    }

    function calculateCurrentWithdrawFee(address account) external view override returns (uint256) {
        return swapStorage._calculateCurrentWithdrawFee(account);
    }

    /// RESTRICTED FUNCTION
    /**
     * @notice Updates the user withdraw fee. This function can only be called by
     * the pool token. Should be used to update the withdraw fee on transfer of pool tokens.
     * Transferring your pool token will reset the 4 weeks period. If the recipient is already
     * holding some pool tokens, the withdraw fee will be discounted in respective amounts.
     * @param recipient address of the recipient of pool token
     * @param transferAmount amount of pool token to transfer
     */
    function updateUserWithdrawFee(address recipient, uint256 transferAmount) external override {
        require(msg.sender == address(swapStorage.lpToken), "addressError");
        swapStorage.updateUserWithdrawFee(recipient, transferAmount);
    }


    /**
     * @notice Sets the admin fee
     * @dev adminFee cannot be higher than 100% of the swap fee
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     * @param newAdminFee new admin fee to be applied on future transactions
     * @param newWithdrawFee new initial withdraw fee to be applied on future withdrawal transactions
     */
    function setFee(
        uint256 newSwapFee,
        uint256 newFlashFee,
        uint256 newAdminFee,
        uint256 newWithdrawFee
    ) external onlyOwner {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "feeError");
        require(newFlashFee <= MAX_TRANSACTION_FEE, "feeError");
        require(newAdminFee <= MAX_ADMIN_FEE, "feeError");
        require(newWithdrawFee <= MAX_TRANSACTION_FEE, "feeError");
        swapStorage.adminFee = newAdminFee;
        swapStorage.fee = newSwapFee;
        swapStorage.defaultWithdrawFee = newWithdrawFee;

        emit NewFee(newSwapFee, newFlashFee,  newAdminFee, newWithdrawFee);
    }

    /**
     * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
     * Checks if the change is too rapid, and commits the new A value only when it falls under
     * the limit range.
     * @param futureA the new A to ramp towards
     * @param futureATime timestamp when the new A should be reached
     */
    function rampA(uint256 futureA, uint256 futureATime) external onlyOwner {
        require(block.timestamp >= swapStorage.initialATime + (1 days), "paramError"); // please wait 1 days before start a new ramping
        require(futureATime >= block.timestamp + (MIN_RAMP_TIME), "paramError");
        require(0 < futureA && futureA < MAX_A, "arrayError");

        uint256 initialAPrecise = swapStorage.getAPrecise();
        uint256 futureAPrecise = futureA * StableSwapLib.A_PRECISION;

        if (futureAPrecise < initialAPrecise) {
            require(futureAPrecise * (MAX_A_CHANGE) >= initialAPrecise, "paramError");
        } else {
            require(futureAPrecise <= initialAPrecise * (MAX_A_CHANGE), "paramError");
        }

        swapStorage.initialA = initialAPrecise;
        swapStorage.futureA = futureAPrecise;
        swapStorage.initialATime = block.timestamp;
        swapStorage.futureATime = futureATime;

        emit RampA(initialAPrecise, futureAPrecise, block.timestamp, futureATime);
    }

    function stopRampA() external onlyOwner {
        require(swapStorage.futureATime > block.timestamp, "alreadyStopped");
        uint256 currentA = swapStorage.getAPrecise();

        swapStorage.initialA = currentA;
        swapStorage.futureA = currentA;
        swapStorage.initialATime = block.timestamp;
        swapStorage.futureATime = block.timestamp;

        emit StopRampA(currentA, block.timestamp);
    }

    function setFeeController(address _feeController) external onlyOwner {
        require(_feeController != address(0), "addressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
    }

    function setFeeDistributor(address _feeDistributor) external onlyOwner {
        require(_feeDistributor != address(0), "addressError");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external onlyFeeControllerOrOwner {
        swapStorage.sync(feeDistributor);
    }

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getTokenMultipliers() external view  returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }
}
