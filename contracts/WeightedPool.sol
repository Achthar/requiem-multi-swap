// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "./libraries/ReentrancyGuard.sol";
import "./libraries/Initializable.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./libraries/SafeERC20.sol";
import "./base/OwnerPausable.sol";
import "./WeightedPoolLib.sol";
import "./interfaces/IWeightedSwap.sol";
import "./interfaces/IRequiemSwap.sol";
import "./interfaces/IFlashLoanRecipient.sol";

using WeightedPoolLib for WeightedPoolLib.WeightedSwapStorage global;
using SafeERC20 for IERC20 global;

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract WeightedPool is IRequiemSwap, OwnerPausable, ReentrancyGuard, Initializable, IWeightedSwap {

    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 1e10; // 100%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e8; // 1%
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    WeightedPoolLib.WeightedSwapStorage public swapStorage;
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
        uint256[] memory _normalizedWeights,
        uint256[] memory _amounts,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _adminFee,
        address _feeDistributor
    ) external onlyOwner initializer {
        require(_coins.length == _decimals.length, "arrayError");
        require(_feeDistributor != address(0), "addressError");
        uint256 numberOfCoins = _coins.length;
        uint256[] memory rates = new uint256[](numberOfCoins);
        IERC20[] memory coins = new IERC20[](numberOfCoins);
        for (uint256 i = 0; i < numberOfCoins; i++) {
            require(_coins[i] != address(0), "addressError");
            require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "paramError");
            rates[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            coins[i] = IERC20(_coins[i]);
            tokenIndexes[address(coins[i])] = uint8(i);
        }

        require(_fee <= MAX_TRANSACTION_FEE, "feeError");
        require(_adminFee <= MAX_ADMIN_FEE, "feeError");

        swapStorage.lpToken = new WeightedLPToken(lpTokenName, lpTokenSymbol);
        swapStorage.balances = new uint256[](numberOfCoins);
        swapStorage.tokenMultipliers = rates;
        swapStorage.nTokens = numberOfCoins;
        swapStorage.pooledTokens = coins;
        swapStorage.fee = _fee;
        swapStorage.adminFee = _adminFee;
        feeDistributor = _feeDistributor;
        swapStorage.collectedFees = new uint256[](numberOfCoins);

        // Ensure  each normalized weight is above them minimum and find the token index of the maximum weight
        uint256 normalizedSum = 0;
        for (uint8 i = 0; i < numberOfCoins; i++) {
            uint256 normalizedWeight = _normalizedWeights[i];
            require(normalizedWeight >= WeightedMath._MIN_WEIGHT, "MIN_WEIGHT");
            normalizedSum += normalizedWeight;
        }
        require(normalizedSum == FixedPoint.ONE, "NORMALIZED_WEIGHT_INVARIANT");

        swapStorage.normalizedWeights = _normalizedWeights;

        // add the first liquidity
        swapStorage.initialize(_amounts);
    }

    /// PUBLIC FUNCTIONS
    function addLiquidity(
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256 mintAmount) {
        mintAmount = swapStorage.addLiquidity(amounts, minMintAmount);
        emit AddLiquidity(msg.sender, amounts, swapStorage.lastInvariant, mintAmount);
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
        emit TokenExchange(to, tokenIn, amountIn, tokenOut, amountOut);
    }

    // expects amount alrady to be sent to this address
    // calculates the output amount and sends it after deducting the fee
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountOut) {
        amountOut = swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, amountOutMin, to);
        emit TokenExchange(to, tokenIn, amountIn, tokenOut, amountOut);
    }

    // calculates the input amount from a given output amount
    // will transfer amounts to itself as input is not yet known
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        uint256 amountInMax,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountIn) {
        amountIn = swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, amountInMax, to);
        emit TokenExchange(to, tokenIn, amountIn, tokenOut, amountOut);
    }

     /**  @notice Flash loan using weighted pool balances  */
    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external override nonReentrant whenNotPaused {
        uint256[] memory feeAmounts = swapStorage.flashLoan(recipient, amounts, userData);
        // fetch invariant before loan
        uint256 preInvariant = swapStorage.lastInvariant;

        // calculate new one with new balances
        swapStorage.setInvariant();

        // revert if the invariant change is too large
        require( swapStorage.lastInvariant* FixedPoint.ONE / preInvariant > WeightedMath._MAX_INVARIANT_RATIO );
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
        emit RemoveLiquidityImbalance(msg.sender, amounts, swapStorage.lastInvariant, totalSupply - burnAmount);
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

    function calculateRemoveLiquidityOneToken(
        uint256 amount,
        uint256 index
    ) external view override returns (uint256 amountOut, uint256 fee) {
        (amountOut, fee) =  swapStorage.calculateRemoveLiquidityExactIn( index, amount);
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
        swapStorage.adminFee = newAdminFee;
        swapStorage.fee = newSwapFee;

        emit NewFee(newSwapFee, newFlashFee,  newAdminFee, newWithdrawFee);
    }

    function setFeeControllerAndDistributor(address _feeController) external onlyOwner {
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

    function getTokenWeights() external view returns (uint256[] memory) {
        return swapStorage.normalizedWeights;
    }


    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }
}
