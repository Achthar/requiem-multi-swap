// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;
import "./libraries/ReentrancyGuard.sol";
import "./libraries/Initializable.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeERC20.sol";
import "./base/OwnerPausable.sol";
import "./RequiemStableSwapLib.sol";
import "./interfaces/IRequiemStableSwap.sol";
import "./interfaces/IRequiemSwap.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract RequiemStableSwap is IRequiemSwap, OwnerPausable, ReentrancyGuard, Initializable, IRequiemStableSwap {
    using RequiemStableSwapLib for RequiemStableSwapLib.SwapStorage;
    using SafeERC20 for IERC20;

    /// constants
    uint256 public constant MIN_RAMP_TIME = 1 days;
    uint256 public constant MAX_A = 1e6;
    uint256 public constant MAX_A_CHANGE = 10;
    uint256 public constant MAX_ADMIN_FEE = 1e10; // 100%
    uint256 public constant MAX_SWAP_FEE = 1e8; // 1%
    uint256 public constant MAX_WITHDRAW_FEE = 1e8; // 1%

    /// STATE VARS
    RequiemStableSwapLib.SwapStorage public swapStorage;
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
        require(_coins.length == _decimals.length, "coinsL != decimalsL");
        require(_feeDistributor != address(0), "feeDistributor = empty");
        uint256 numberOfCoins = _coins.length;
        uint256[] memory rates = new uint256[](numberOfCoins);
        IERC20[] memory coins = new IERC20[](numberOfCoins);
        for (uint256 i = 0; i < numberOfCoins; i++) {
            require(_coins[i] != address(0), "invalidTokenAddress");
            require(_decimals[i] <= RequiemStableSwapLib.POOL_TOKEN_COMMON_DECIMALS, "invalidDecimals");
            rates[i] = 10**(RequiemStableSwapLib.POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            coins[i] = IERC20(_coins[i]);
            tokenIndexes[address(coins[i])] = uint8(i);
        }

        require(_A < MAX_A, "> maxA");
        require(_fee <= MAX_SWAP_FEE, "> maxSFee");
        require(_adminFee <= MAX_ADMIN_FEE, "> maxAFee");
        require(_withdrawFee <= MAX_WITHDRAW_FEE, "> maxWFee");

        swapStorage.lpToken = new LPToken(lpTokenName, lpTokenSymbol);
        swapStorage.balances = new uint256[](numberOfCoins);
        swapStorage.tokenMultipliers = rates;
        swapStorage.pooledTokens = coins;
        swapStorage.initialA = _A * RequiemStableSwapLib.A_PRECISION;
        swapStorage.futureA = _A * RequiemStableSwapLib.A_PRECISION;
        swapStorage.fee = _fee;
        swapStorage.adminFee = _adminFee;
        swapStorage.defaultWithdrawFee = _withdrawFee;
        feeDistributor = _feeDistributor;
    }

    /// PUBLIC FUNCTIONS
    function addLiquidity(
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256) {
        return swapStorage.addLiquidity(amounts, minMintAmount);
    }

    // standard swap function a la curve
    // just the to parameter is added to be more flexible
    function swap(
        uint8 fromIndex,
        uint8 toIndex,
        uint256 inAmount,
        uint256 minOutAmount,
        address to,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256) {
        return swapStorage.swap(fromIndex, toIndex, inAmount, minOutAmount, to);
    }

    // function for the requiem swap interface
    // recalculates the output amount from the input
    // has no check for slippage, that should be wrapped arount that funtion if used
    // calculation-wise not really less efficient than just validating input amounts
    // since the invariant would have to be calculated twice
    // expects amounts to be sent to the contract alreaddy
    function onSwap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        address to
    ) external override whenNotPaused nonReentrant {
        swapStorage.onSwap(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, amountOut, to);
        // swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, 0, to);
    }

    // expects amount alrady to be sent to this address
    // calculates the output amount and sends it after deducting the fee
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, amountOutMin, to);
    }

    // calculates the input amount from a given output amount
    // will transfer amounts to itself as input is not yet known
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, amountInMax, to);
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

    function getA() external view override returns (uint256) {
        return swapStorage.getA();
    }

    function getAPrecise() external view override returns (uint256) {
        return swapStorage.getAPrecise();
    }

    function getTokens() external view override returns (IERC20[] memory) {
        return swapStorage.pooledTokens;
    }

    function getToken(uint8 index) external view override returns (IERC20) {
        return swapStorage.pooledTokens[index];
    }

    function getLpToken() external view override returns (IERC20) {
        return swapStorage.lpToken;
    }

    function getTokenIndex(address token) external view override returns (uint8 index) {
        index = tokenIndexes[token];
        require(address(swapStorage.pooledTokens[index]) == token, "tokenNotFound");
    }

    function getTokenPrecisionMultipliers() external view returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getTokenBalance(uint8 index) external view override returns (uint256) {
        return swapStorage.balances[index];
    }

    function getNumberOfTokens() external view override returns (uint256) {
        return swapStorage.pooledTokens.length;
    }

    function getAdminBalances() external view override returns (uint256[] memory adminBalances) {
        uint256 length = swapStorage.pooledTokens.length;
        adminBalances = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            adminBalances[i] = swapStorage.getAdminBalance(i);
        }
    }

    function getAdminBalance(uint8 index) external view override returns (uint256) {
        return swapStorage.getAdminBalance((index));
    }

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view override returns (uint256) {
        return swapStorage.calculateTokenAmount(amounts, deposit);
    }

    function calculateSwap(
        uint8 inIndex,
        uint8 outIndex,
        uint256 inAmount
    ) external view override returns (uint256) {
        return swapStorage.calculateSwap(inIndex, outIndex, inAmount);
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
        require(msg.sender == address(swapStorage.lpToken), "!lpToken");
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
        uint256 newAdminFee,
        uint256 newWithdrawFee
    ) external onlyOwner {
        require(newSwapFee <= MAX_SWAP_FEE, "> SFee");
        require(newAdminFee <= MAX_ADMIN_FEE, "> AFee");
        require(newWithdrawFee <= MAX_WITHDRAW_FEE, "> WFee");
        swapStorage.adminFee = newAdminFee;
        swapStorage.fee = newSwapFee;
        swapStorage.defaultWithdrawFee = newWithdrawFee;

        emit NewFee(newSwapFee, newAdminFee, newWithdrawFee);
    }

    /**
     * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
     * Checks if the change is too rapid, and commits the new A value only when it falls under
     * the limit range.
     * @param futureA the new A to ramp towards
     * @param futureATime timestamp when the new A should be reached
     */
    function rampA(uint256 futureA, uint256 futureATime) external onlyOwner {
        require(block.timestamp >= swapStorage.initialATime + (1 days), "< rampD"); // please wait 1 days before start a new ramping
        require(futureATime >= block.timestamp + (MIN_RAMP_TIME), "< minRampT");
        require(0 < futureA && futureA < MAX_A, "outOfRange");

        uint256 initialAPrecise = swapStorage.getAPrecise();
        uint256 futureAPrecise = futureA * RequiemStableSwapLib.A_PRECISION;

        if (futureAPrecise < initialAPrecise) {
            require(futureAPrecise * (MAX_A_CHANGE) >= initialAPrecise, "> maxC");
        } else {
            require(futureAPrecise <= initialAPrecise * (MAX_A_CHANGE), "> maxC");
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
        require(_feeController != address(0), "zero");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
    }

    function setFeeDistributor(address _feeDistributor) external onlyOwner {
        require(_feeDistributor != address(0), "zero");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external onlyFeeControllerOrOwner {
        for (uint256 i = 0; i < swapStorage.pooledTokens.length; i++) {
            IERC20 token = swapStorage.pooledTokens[i];
            uint256 balance = token.balanceOf(address(this)) - (swapStorage.balances[i]);
            if (balance != 0) {
                token.safeTransfer(feeDistributor, balance);
                emit CollectProtocolFee(address(token), balance);
            }
        }
    }
}
