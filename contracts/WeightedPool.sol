// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "./libraries/ReentrancyGuard.sol";
import "./libraries/Initializable.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeERC20.sol";
import "./base/OwnerPausable.sol";
import "./WeightedPoolLib.sol";
import "./interfaces/IWeightedSwap.sol";
import "./interfaces/ISwap.sol";
import "./interfaces/flashLoan/IPoolFlashLoan.sol";
import "./interfaces/flashLoan/IFlashLoanRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract WeightedPool is ISwap, IPoolFlashLoan, OwnerPausable, ReentrancyGuard, Initializable, IWeightedSwap {
    using WeightedPoolLib for WeightedPoolLib.WeightedSwapStorage;
    using SafeERC20 for IERC20;
    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 5e17; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e16; // 1%
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    WeightedPoolLib.WeightedSwapStorage public swapStorage;
    address public feeDistributor;
    address public feeController;

    // indexes for tokens in array
    mapping(address => uint8) public tokenIndexes;

    // used for validation as tokenIndexes defaults to zero if mapping does not exist
    mapping(address => bool) internal isToken;

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
        uint256[] memory _normalizedWeights,
        uint256[] memory _amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address _feeDistributor
    ) external onlyOwner initializer {
        require(_coins.length == _decimals.length, "arrayError");
        require(_feeDistributor != address(0), "addressError");
        swapStorage.nTokens = _coins.length;
        swapStorage.tokenMultipliers = new uint256[](swapStorage.nTokens);
        swapStorage.pooledTokens = new IERC20[](swapStorage.nTokens);
        require(_fee <= MAX_TRANSACTION_FEE, "feeError");
        require(_adminFee <= MAX_ADMIN_FEE, "feeError");

        {
            // Ensure  each normalized weight is above them minimum and find the token index of the maximum weight
            uint256 normalizedSum = 0;
            for (uint8 i = 0; i < swapStorage.nTokens; i++) {
                require(_coins[i] != address(0), "addressError");
                require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "paramError");
                swapStorage.tokenMultipliers[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
                swapStorage.pooledTokens[i] = IERC20(_coins[i]);
                tokenIndexes[_coins[i]] = uint8(i);
                require(_normalizedWeights[i] >= WeightedMath._MIN_WEIGHT, "MIN_WEIGHT");
                normalizedSum += _normalizedWeights[i];
                isToken[_coins[i]] = true;
            }

            require(normalizedSum == FixedPoint.ONE, "NORMALIZED_WEIGHT_INVARIANT");
        }
        swapStorage.normalizedWeights = _normalizedWeights;

        swapStorage.lpToken = new WeightedLPToken(lpTokenName, lpTokenSymbol);
        swapStorage.balances = new uint256[](swapStorage.nTokens);
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        feeDistributor = _feeDistributor;
        swapStorage.collectedFees = new uint256[](swapStorage.nTokens);

        // add the first liquidity
        swapStorage.initialize(_amounts);
    }

    /// PUBLIC FUNCTIONS

    /**
     * @notice add liquidity for specified pool token amounts input
     * @param amounts amounts of pooled token ordered the same way as in the pool
     *
     */
    function addLiquidityExactIn(
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256 mintAmount) {
        mintAmount = swapStorage.addLiquidityExactTokensIn(amounts, minMintAmount);
        emit AddLiquidity(msg.sender, amounts, mintAmount);
    }

    // expects amount alrady to be sent to this address
    // calculates the output amount and sends it after deducting the fee
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountOut) {
        require(isToken[tokenIn] && isToken[tokenOut] && tokenIn != tokenOut, "invalid tokens");
        amountOut = swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, to);
        emit TokenExchange(to, tokenIn, amountIn, tokenOut, amountOut);
    }

    // calculates the input amount from a given output amount
    // will transfer amounts to itself as input is not yet known
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external override whenNotPaused nonReentrant {
        require(isToken[tokenIn] && isToken[tokenOut] && tokenIn != tokenOut, "invalid tokens");
        uint256 amountIn = swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to);
        emit TokenExchange(to, tokenIn, amountIn, tokenOut, amountOut);
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

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        uint256 totalSupply;
        (amounts, totalSupply) = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts);
        emit RemoveLiquidity(msg.sender, amounts, totalSupply - lpAmount);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256 burnAmount) {
        uint256 totalSupply;
        (burnAmount, totalSupply) = swapStorage.removeLiquidityExactOut(amounts, maxLpBurn);
        emit RemoveLiquidityImbalance(msg.sender, amounts, totalSupply - burnAmount);
    }

    function removeLiquidityOneToken(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amountReceived) {
        amountReceived = swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount);
        emit RemoveLiquidityOne(msg.sender, index, lpAmount, amountReceived);
    }

    /// VIEW FUNCTIONS

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view override returns (uint256 burnAmount) {
        burnAmount = swapStorage.calculateTokenAmount(amounts, deposit);
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
        return swapStorage.calculateRemoveLiquidityExactIn(amount);
    }

    function calculateRemoveLiquidityOneToken(uint256 amount, uint256 index) external view override returns (uint256 amountOut, uint256 fee) {
        (amountOut, fee) = swapStorage.calculateRemoveLiquidityOneTokenExactIn(index, amount);
    }

    /**
     * @notice Sets the all applicable fees
     * @dev adminFee cannot be higher than 50% of the swap fee
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     * @param newAdminFee new admin fee to be applied on future transactions
     * @param newFlashFee new flash lash loan fee
     */
    function setFee(
        uint256 newSwapFee,
        uint256 newAdminFee,
        uint256 newFlashFee
    ) external onlyOwner {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "feeError");
        require(newFlashFee <= MAX_TRANSACTION_FEE, "feeError");
        require(newAdminFee <= MAX_ADMIN_FEE, "feeError");
        swapStorage.adminFee = newAdminFee;
        swapStorage.fee = newSwapFee;
        swapStorage.flashFee = newFlashFee;

        emit NewFee(newSwapFee, newAdminFee, newFlashFee);
    }

    function setFeeControllerAndDistributor(address _feeController, address _feeDistributor) external onlyOwner {
        require(_feeController != address(0) && _feeDistributor != address(0), "addressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external onlyFeeControllerOrOwner {
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
