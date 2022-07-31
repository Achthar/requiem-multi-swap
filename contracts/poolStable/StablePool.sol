// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../libraries/ReentrancyGuard.sol";
import "../libraries/Initializable.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../base/OwnerPausable.sol";
import "../interfaces/poolBase/IMultiPool.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "../interfaces/ISwap.sol";
import "./StablePoolLib.sol";
import "./StableERC20.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract StablePool is ISwap, IPoolFlashLoan, OwnerPausable, ReentrancyGuard, Initializable, IMultiPool, StableERC20 {
    using StablePoolLib for StablePoolLib.SwapStorage;
    using SafeERC20 for IERC20;

    event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);

    event StopRampA(uint256 A, uint256 timestamp);

    /// constants
    uint256 internal constant MIN_RAMP_TIME = 1 days;
    uint256 internal constant MAX_A = 1e7;
    uint256 internal constant MAX_A_CHANGE = 100;
    uint256 internal constant MAX_ADMIN_FEE = 5e17; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e16; // 1%

    /// STATE VARS
    StablePoolLib.SwapStorage public swapStorage;
    address public creator;
    address public feeDistributor;
    address public feeController;
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "Timeout");
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
        string memory _name,
        string memory _symbol,
        uint256 _A,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _feeController,
        address _creator
    ) external onlyOwner initializer {
        // initialize pool token data
        _poolTokenInit(_name, _symbol);

        require(_coins.length == _decimals.length, "ArrayError");
        require(_feeController != address(0), "AddressError");
        swapStorage.tokenMultipliers = new uint256[](_coins.length);
        swapStorage.pooledTokens = new IERC20[](_coins.length);
        for (uint8 i = 0; i < _coins.length; i++) {
            require(_decimals[i] <= StablePoolLib.POOL_TOKEN_COMMON_DECIMALS, "DecimalError");
            swapStorage.tokenMultipliers[i] = 10**(StablePoolLib.POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = IERC20(_coins[i]);
            tokenIndexes[address(_coins[i])] = i;
        }

        require(_A < MAX_A, "MaxA");
        require(_fee <= MAX_TRANSACTION_FEE, "MaxSwapFee");
        require(_adminFee <= MAX_ADMIN_FEE, "MaxAdminFee");
        require(_withdrawFee <= MAX_TRANSACTION_FEE, "MaxWithdrawFee");

        swapStorage.balances = new uint256[](_coins.length);
        swapStorage.initialA = _A * StablePoolLib.A_PRECISION;
        swapStorage.futureA = _A * StablePoolLib.A_PRECISION;
        swapStorage.nTokens = _coins.length;

        // initialize fee data
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        swapStorage.adminSwapFee = (_adminFee * _fee) / StablePoolLib.FEE_DENOMINATOR;
        swapStorage.defaultWithdrawFee = _withdrawFee;
        swapStorage.withdrawDuration = (4 weeks);
        swapStorage.collectedFees = new uint256[](_coins.length);

        // assign creator and fee controller
        creator = _creator;
        feeController = _feeController;
        feeDistributor = _feeController;
    }

    /// PUBLIC FUNCTIONS
    function addLiquidityExactIn(
        uint256[] memory amounts,
        uint256 minMintAmount,
        address to,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256 mintAmount) {
        uint256 _totalSupply = totalSupply;
        if (_totalSupply == 0) {
            require(msg.sender == creator, "can only be inititalized by creator");
            mintAmount = swapStorage.addLiquidityInit(amounts);
        } else {
            mintAmount = swapStorage.addLiquidityExactIn(amounts, minMintAmount, totalSupply);
        }
        _mint(to, mintAmount);
    }

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

    /**  @notice Flash loan using stable swap balances  */
    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external override nonReentrant whenNotPaused {
        swapStorage.flashLoan(recipient, amounts, userData);
    }

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        amounts = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amount) {
        amount = swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 burnAmount) {
        burnAmount = swapStorage.removeLiquidityImbalance(amounts, maxBurnAmount, totalSupply);
        _burn(msg.sender, burnAmount);
    }

    /// VIEW FUNCTIONS

    function getVirtualPrice() external view returns (uint256) {
        return swapStorage.getVirtualPrice(totalSupply);
    }

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
        return swapStorage.calculateRemoveLiquidityExactIn(account, amount, totalSupply);
    }

    function calculateRemoveLiquidityOneTokenExactIn(
        uint256 amount,
        uint256 index,
        address account
    ) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityOneToken(account, amount, index, totalSupply);
    }

    function calculateCurrentWithdrawFee(address account) external view override returns (uint256) {
        return swapStorage._calculateCurrentWithdrawFee(account);
    }

    /// RESTRICTED FUNCTION

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
    ) internal override(StableERC20) {
        swapStorage.updateUserWithdrawFee(to, balanceOf[to], amount);
    }

    /**
     * @notice Sets the all applicable transaction fees
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     * @param newFlashFee new flash loan fee
     */
    function setTransactionFees(uint256 newSwapFee, uint256 newFlashFee) external onlyOwner {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "SwapFeeError");
        require(newFlashFee <= MAX_TRANSACTION_FEE, "FlashFeeError");
        swapStorage.fee = newSwapFee;
        swapStorage.flashFee = newFlashFee;
        swapStorage.adminSwapFee = (swapStorage.adminFee * newSwapFee) / StablePoolLib.FEE_DENOMINATOR;
        emit NewTransactionFees(newSwapFee, newFlashFee);
    }

    /**
     * @notice Sets the admin fee - accessible only to the fee controller
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function setAdminFee(uint256 newAdminFee) external onlyFeeController {
        require(newAdminFee <= MAX_ADMIN_FEE, "AdminFeeError");
        swapStorage.adminFee = newAdminFee;
        swapStorage.adminSwapFee = (newAdminFee * swapStorage.fee) / StablePoolLib.FEE_DENOMINATOR;
        emit NewAdminFee(newAdminFee);
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

    /**
     * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
     * Checks if the change is too rapid, and commits the new A value only when it falls under
     * the limit range.
     * @param futureA the new A to ramp towards
     * @param futureATime timestamp when the new A should be reached
     */
    function rampA(uint256 futureA, uint256 futureATime) external onlyOwner {
        require(block.timestamp >= swapStorage.initialATime + (1 days), "Ramp period"); // please wait 1 days before start a new ramping
        require(futureATime >= block.timestamp + (MIN_RAMP_TIME), "Ramp too early");
        require(0 < futureA && futureA < MAX_A, "AError");

        uint256 initialAPrecise = swapStorage.getAPrecise();
        uint256 futureAPrecise = futureA * StablePoolLib.A_PRECISION;

        if (futureAPrecise < initialAPrecise) {
            require(futureAPrecise * (MAX_A_CHANGE) >= initialAPrecise, "TooHigh");
        } else {
            require(futureAPrecise <= initialAPrecise * (MAX_A_CHANGE), "TooLow");
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

    function setFeeController(address _feeController) external onlyFeeController {
        require(_feeController != address(0), "AddressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
    }

    function setFeeDistributor(address _feeDistributor) external onlyFeeController {
        require(_feeDistributor != address(0), "AddressError");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external onlyFeeController {
        swapStorage.sync(feeDistributor);
    }

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getTokenMultipliers() external view returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }

    function getPooledTokens() external view returns (IERC20[] memory) {
        return swapStorage.pooledTokens;
    }

    function getA() external view returns (uint256) {
        return swapStorage.getA();
    }
}
