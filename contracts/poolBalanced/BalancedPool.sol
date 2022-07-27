// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "../libraries/ReentrancyGuard.sol";
import "../libraries/Initializable.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../base/OwnerPausable.sol";
import "./BalancedPoolLib.sol";
import "./BalancedERC20.sol";
import "../interfaces/poolBalanced/IBalancedSwap.sol";
import "../interfaces/ISwap.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract BalancedPool is ISwap, IPoolFlashLoan, OwnerPausable, ReentrancyGuard, Initializable, IBalancedSwap, BalancedERC20 {
    using BalancedPoolLib for BalancedPoolLib.BalancedSwapStorage;
    using SafeERC20 for IERC20;
    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 5e17; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 1e16; // 1%
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    /// STATE VARS
    BalancedPoolLib.BalancedSwapStorage public swapStorage;
    address public creator;
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
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        address _feeController,
        address _creator
    ) external onlyOwner initializer {
        // init LP token description
        _poolTokenInit(_name, _symbol);

        require(_coins.length == _decimals.length, "arrayError");
        require(_feeController != address(0), "addressError");
        swapStorage.nTokens = _coins.length;
        swapStorage.tokenMultipliers = new uint256[](swapStorage.nTokens);
        swapStorage.pooledTokens = new IERC20[](swapStorage.nTokens);
        require(_fee <= MAX_TRANSACTION_FEE, "feeError");
        require(_adminFee <= MAX_ADMIN_FEE, "feeError");

        for (uint8 i = 0; i < swapStorage.nTokens; i++) {
            require(_coins[i] != address(0), "addressError");
            require(_decimals[i] <= POOL_TOKEN_COMMON_DECIMALS, "paramError");
            swapStorage.tokenMultipliers[i] = 10**(POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = IERC20(_coins[i]);
            tokenIndexes[_coins[i]] = uint8(i);
            isToken[_coins[i]] = true;
        }

        // single weight used for mint and burn amount calculation
        swapStorage.normalizedWeight = FixedPoint.ONE / _coins.length;

        swapStorage.balances = new uint256[](swapStorage.nTokens);
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        feeController = _feeController;
        swapStorage.collectedFees = new uint256[](swapStorage.nTokens);
        creator = _creator;
    }

    /// PUBLIC MUTATIVE FUNCTIONS

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
            // add the first liquidity
            mintAmount = swapStorage.initialize(amounts);
        } else {
            mintAmount = swapStorage.addLiquidityExactTokensIn(amounts, minMintAmount, totalSupply);
        }
        _mint(to, mintAmount);
        emit AddLiquidity(to, amounts, swapStorage.lastInvariant, mintAmount);
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
        emit RemoveLiquidityImbalance(msg.sender, amounts, swapStorage.lastInvariant, totalSupply);
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
        swapStorage.flashFee = newFlashFee;

        emit NewTransactionFees(newSwapFee, newFlashFee);
    }

    /**
     * @notice Sets the all applicable fees
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function setAdminFee(
        uint256 newAdminFee
    ) external onlyFeeController {
        require(newAdminFee <= MAX_ADMIN_FEE, "feeError");
        swapStorage.adminFee = newAdminFee;
        emit NewAdminFee(newAdminFee);
    }

    function setFeeControllerAndDistributor(address _feeController, address _feeDistributor) external onlyFeeController {
        require(_feeController != address(0) && _feeDistributor != address(0), "addressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external onlyFeeController {
        swapStorage.sync(feeDistributor);
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
