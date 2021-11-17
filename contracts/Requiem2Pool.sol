// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./interfaces/IRequiem2Pool.sol";
import "./interfaces/IRequiemPoolFormula.sol";
import "./RequiemERC20.sol";
import "./interfaces/pool/IFormulaProvider.sol";
import "./interfaces/pool/IRequiemWeightedMath.sol";
import "./libraries/UQ112x112.sol";
import "./libraries/math/Math.sol";
import "./libraries/math/FixedPoint.sol";
import "./interfaces/ERC20/IERC20Metadata.sol";
import "./interfaces/IRequiem2PoolFactory.sol";
import "./interfaces/IUniswapV2Callee.sol";

contract Requiem2Pool is IRequiem2Pool, RequiemERC20 {
    using FixedPoint for uint256;

    uint256 public constant MINIMUM_LIQUIDITY = 10**3;
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes("transfer(address,uint256)")));

    address public factory;
    address public baseFormula;
    address public token0;
    address public token1;

    IRequiemWeightedMath private immutable weightedMath;

    event SwapFeePercentageChanged(uint256 swapFeePercentage);

    uint256 private reserve0; // uses single storage slot, accessible via getReserves
    uint256 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 private blockTimestampLast; // uses single storage slot, accessible via getReserves
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    uint256 private unlocked = 1;

    uint256 private collectedFee0; // uses single storage slot, accessible via getReserves
    uint256 private collectedFee1; // uses single storage slot, accessible via getReserves
    uint32 private tokenWeight0;

    uint256 private _lastInvariant;

    address internal _token0;
    address internal _token1;

    uint256 private _normalizedWeight0;
    uint256 private _normalizedWeight1;

    // The protocol fees will always be charged using the token associated with the max weight in the pool.
    // Since these Pools will register tokens only once, we can assume this index will be constant.
    uint256 private _maxWeightTokenIndex;

    // All token balances are normalized to behave as if the token had 18 decimals. We assume a token's decimals will
    // not change throughout its lifetime, and store the corresponding scaling factor for each at construction time.
    // These factors are always greater than or equal to one: tokens with more than 18 decimals are not supported.
    uint256 internal _scalingFactor0;
    uint256 internal _scalingFactor1;

    uint32 private swapFee;

    modifier lock() {
        require(unlocked == 1, "REQLP: LOCKED");
        unlocked = 0;
        _;
        unlocked = 1;
    }

    function getReserves()
        public
        view
        returns (
            uint256 _reserve0,
            uint256 _reserve1,
            uint32 _blockTimestampLast
        )
    {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }

    function getCollectedFees() public view returns (uint256 _collectedFee0, uint256 _collectedFee1) {
        _collectedFee0 = collectedFee0;
        _collectedFee1 = collectedFee1;
    }

    function getTokenWeights() public view returns (uint256 _tokenWeight0, uint256 _tokenWeight1) {
        _tokenWeight0 = _normalizedWeight0;
        _tokenWeight1 = _normalizedWeight1;
    }

    function getSwapFee() public view returns (uint32 _swapFee) {
        _swapFee = swapFee;
    }

    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "REQLP: TRANSFER_FAILED");
    }

    constructor() {
        factory = msg.sender;
        weightedMath = IRequiemWeightedMath(IFormulaProvider(factory).weightedMath());
    }

    // called once by the factory at time of deployment
    function initialize(
        address token0,
        address token1,
        uint256 normalizedWeight0,
        uint32 swapFeePercentage
    ) external override {
        require(msg.sender == factory, "REQLP: FORBIDDEN");

        uint256 normalizedWeight1 = FixedPoint.ONE - normalizedWeight0;
        _scalingFactor0 = _computeScalingFactor(token0);
        _scalingFactor1 = _computeScalingFactor(token1);

        // Ensure each normalized weight is above them minimum and find the token index of the maximum weight
        RequiemErrors._require(FixedPoint.ONE * normalizedWeight0 >= weightedMath._MIN_WEIGHT(), Errors.MIN_WEIGHT);
        RequiemErrors._require(FixedPoint.ONE * normalizedWeight1 >= weightedMath._MIN_WEIGHT(), Errors.MIN_WEIGHT);

        // Ensure that the normalized weights sum to ONE
        uint256 normalizedSum = normalizedWeight0 + normalizedWeight1;
        RequiemErrors._require(normalizedSum == FixedPoint.ONE, Errors.NORMALIZED_WEIGHT_INVARIANT);

        _normalizedWeight0 = uint256(normalizedWeight0);
        _normalizedWeight1 = normalizedWeight1;
        _maxWeightTokenIndex = normalizedWeight0 >= normalizedWeight1 ? 0 : 1;
        swapFee = swapFeePercentage;
    }

    /**
     * @dev Returns a scaling factor that, when multiplied to a token amount for `token`, normalizes its balance as if
     * it had 18 decimals.
     */
    function _computeScalingFactor(address token) private view returns (uint256) {
        // Tokens that don't implement the `decimals` method are not supported.
        uint256 tokenDecimals = IERC20Metadata(address(token)).decimals();

        // Tokens with more than 18 decimals are not supported.
        uint256 decimalsDifference = 18 - tokenDecimals;
        return 10**decimalsDifference;
    }

    // update reserves and, on the first call per block, price accumulators
    function _update(
        uint256 balance0,
        uint256 balance1,
        uint256 _reserve0,
        uint256 _reserve1
    ) private {
        uint256 _tokenWeight0 = tokenWeight0;
        require(balance0 * (100 - _tokenWeight0) <= type(uint256).max && balance1 * _tokenWeight0 <= type(uint256).max, "REQLP: OVERFLOW");
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast;
        // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
            // * never overflows, and + overflow is desired
            uint256 mReserve0 = _reserve0 * (100 - _tokenWeight0);
            uint256 mReserve1 = _reserve1 * _tokenWeight0;
            price0CumulativeLast += (mReserve1 / mReserve0) * timeElapsed;
            price1CumulativeLast += (mReserve0 / mReserve1) * timeElapsed;
        }
        reserve0 = uint256(balance0);
        reserve1 = uint256(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }

    function _mintFee(uint256 _reserve0, uint256 _reserve1) private returns (bool feeOn) {
        address feeTo = IRequiem2PoolFactory(factory).feeTo();
        uint256 protocolFee = uint256(IRequiem2PoolFactory(factory).protocolFee());
        feeOn = feeTo != address(0);
        (uint256 _collectedFee0, uint256 _collectedFee1) = getCollectedFees();
        if (protocolFee > 0 && feeOn && (_collectedFee0 > 0 || _collectedFee1 > 0)) {
            uint256 _tokenWeight0 = tokenWeight0;
            uint256 liquidity = IRequiemFormula(baseFormula).mintLiquidityFee(
                totalSupply,
                _reserve0,
                _reserve1,
                _tokenWeight0,
                100 - _tokenWeight0,
                _collectedFee0 / protocolFee,
                _collectedFee1 / protocolFee
            );
            if (liquidity > 0) _mint(feeTo, liquidity);
        }
        if (_collectedFee0 > 0) collectedFee0 = 0;
        if (_collectedFee1 > 0) collectedFee1 = 0;
    }

    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint256 liquidity) {
        (uint256 _reserve0, uint256 _reserve1, ) = getReserves(); // gas savings
        uint256 balance0 = IERC20(token0).balanceOf(address(this));
        uint256 balance1 = IERC20(token1).balanceOf(address(this));
        uint256 amount0 = balance0.sub(_reserve0);
        uint256 amount1 = balance1.sub(_reserve1);
        _mintFee(_reserve0, _reserve1);
        uint256 _totalSupply = totalSupply;
        // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0 * amount1).sub(MINIMUM_LIQUIDITY);
            _mint(address(0), MINIMUM_LIQUIDITY);
            // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min((amount0 * _totalSupply) / _reserve0, (amount1 * _totalSupply) / _reserve1);
        }
        require(liquidity > 0, "REQLP: INSUFFICIENT_LIQUIDITY_MINTED");
        _mint(to, liquidity);

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Mint(msg.sender, amount0, amount1);
    }

    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint256 amount0, uint256 amount1) {
        (uint256 _reserve0, uint256 _reserve1, ) = getReserves(); // gas savings
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        uint256 balance0 = IERC20(_token0).balanceOf(address(this));
        uint256 balance1 = IERC20(_token1).balanceOf(address(this));
        uint256 liquidity = balanceOf[address(this)];
        _mintFee(_reserve0, _reserve1);
        uint256 _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = (liquidity * balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = (liquidity * balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, "REQLP: INSUFFICIENT_LIQUIDITY_BURNED");
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Burn(msg.sender, amount0, amount1, to);
    }

    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)) - reserve0);
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)) - reserve1);
    }

    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }

    function onSwap(
        SwapRequest memory request,
        uint256 balanceTokenIn,
        uint256 balanceTokenOut
    ) public virtual override returns (uint256) {
        bool tokenInIsToken0 = request.tokenIn == _token0;

        uint256 scalingFactorTokenIn = _scalingFactor(tokenInIsToken0);
        uint256 scalingFactorTokenOut = _scalingFactor(!tokenInIsToken0);

        uint256 normalizedWeightIn = _normalizedWeights(tokenInIsToken0);
        uint256 normalizedWeightOut = _normalizedWeights(!tokenInIsToken0);

        // All token amounts are upscaled.
        balanceTokenIn = _upscale(balanceTokenIn, scalingFactorTokenIn);
        balanceTokenOut = _upscale(balanceTokenOut, scalingFactorTokenOut);

        if (request.kind == SwapKind.GIVEN_IN) {
            // Fees are subtracted before scaling, to reduce the complexity of the rounding direction analysis.
            // This is amount - fee amount, so we round up (favoring a higher fee amount).
            uint256 feeAmount = request.amount.mulUp(getSwapFeePercentage());
            request.amount = _upscale(request.amount.sub(feeAmount), scalingFactorTokenIn);

            uint256 amountOut = _onSwapGivenIn(request, balanceTokenIn, balanceTokenOut, normalizedWeightIn, normalizedWeightOut);

            // amountOut tokens are exiting the Pool, so we round down.
            return _downscaleDown(amountOut, scalingFactorTokenOut);
        } else {
            request.amount = _upscale(request.amount, scalingFactorTokenOut);

            uint256 amountIn = _onSwapGivenOut(request, balanceTokenIn, balanceTokenOut, normalizedWeightIn, normalizedWeightOut);

            // amountIn tokens are entering the Pool, so we round up.
            amountIn = _downscaleUp(amountIn, scalingFactorTokenIn);

            // Fees are added after scaling happens, to reduce the complexity of the rounding direction analysis.
            // This is amount + fee amount, so we round up (favoring a higher fee amount).
            return amountIn.divUp(getSwapFeePercentage().complement());
        }
    }

    function getSwapFeePercentage() public view returns (uint256) {
        return swapFee;
    }

    /**
     * @dev Returns the scaling factor for one of the Pool's tokens. Reverts if `token` is not a token registered by the
     * Pool.
     */
    function _scalingFactor(bool isToken0) internal view returns (uint256) {
        return isToken0 ? _scalingFactor0 : _scalingFactor1;
    }

    /**
     * @dev Applies `scalingFactor` to `amount`, resulting in a larger or equal value depending on whether it needed
     * scaling or not.
     */
    function _upscale(uint256 amount, uint256 scalingFactor) internal pure returns (uint256) {
        return amount * scalingFactor;
    }

    /**
     * @dev Same as `_upscale`, but for an entire array (of two elements). This function does not return anything, but
     * instead *mutates* the `amounts` array.
     */
    function _upscaleArray(uint256[] memory amounts) internal view {
        amounts[0] = amounts[0] * _scalingFactor(true);
        amounts[1] = amounts[1] * _scalingFactor(false);
    }

    /**
     * @dev Reverses the `scalingFactor` applied to `amount`, resulting in a smaller or equal value depending on
     * whether it needed scaling or not. The result is rounded down.
     */
    function _downscaleDown(uint256 amount, uint256 scalingFactor) internal pure returns (uint256) {
        return Math.divDown(amount, scalingFactor);
    }

    /**
     * @dev Same as `_downscaleDown`, but for an entire array (of two elements). This function does not return anything,
     * but instead *mutates* the `amounts` array.
     */
    function _downscaleDownArray(uint256[] memory amounts) internal view {
        amounts[0] = Math.divDown(amounts[0], _scalingFactor(true));
        amounts[1] = Math.divDown(amounts[1], _scalingFactor(false));
    }

    /**
     * @dev Reverses the `scalingFactor` applied to `amount`, resulting in a smaller or equal value depending on
     * whether it needed scaling or not. The result is rounded up.
     */
    function _downscaleUp(uint256 amount, uint256 scalingFactor) internal pure returns (uint256) {
        return Math.divUp(amount, scalingFactor);
    }

    function _onSwapGivenIn(
        SwapRequest memory swapRequest,
        uint256 currentBalanceTokenIn,
        uint256 currentBalanceTokenOut,
        uint256 normalizedWeightIn,
        uint256 normalizedWeightOut
    ) private view returns (uint256) {
        // Swaps are disabled while the contract is paused.
        return weightedMath._calcOutGivenIn(currentBalanceTokenIn, normalizedWeightIn, currentBalanceTokenOut, normalizedWeightOut, swapRequest.amount);
    }

    function _onSwapGivenOut(
        SwapRequest memory swapRequest,
        uint256 currentBalanceTokenIn,
        uint256 currentBalanceTokenOut,
        uint256 normalizedWeightIn,
        uint256 normalizedWeightOut
    ) private view returns (uint256) {
        // Swaps are disabled while the contract is paused.
        return weightedMath._calcInGivenOut(currentBalanceTokenIn, normalizedWeightIn, currentBalanceTokenOut, normalizedWeightOut, swapRequest.amount);
    }

    function getNormalizedWeights() external view returns (uint256[] memory) {
        return _normalizedWeights();
    }

    function _normalizedWeights() internal view virtual returns (uint256[] memory) {
        uint256[] memory normalizedWeights = new uint256[](2);
        normalizedWeights[0] = _normalizedWeights(true);
        normalizedWeights[1] = _normalizedWeights(false);
        return normalizedWeights;
    }

    function _normalizedWeights(bool isToken0) internal view virtual returns (uint256) {
        return isToken0 ? _normalizedWeight0 : _normalizedWeight1;
    }

    function getLastInvariant() external view returns (uint256) {
        return _lastInvariant;
    }
}
