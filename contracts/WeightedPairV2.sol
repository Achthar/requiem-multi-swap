// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/IRequiemWeightedPairV2.sol";
import "./interfaces/IRequiemSwap.sol";
import "./interfaces/IWeightedFormulaV2.sol";
import "./WeightedPairERC20V2.sol";
import "./libraries/Math.sol";
import "./libraries/TransferHelper.sol";
import "./libraries/UQ112x112.sol";
import "./interfaces/ERC20/IERC20.sol";
import "./interfaces/IRequiemWeightedPairFactory.sol";
import "./interfaces/IRequiemCallee.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, avoid-low-level-calls, max-states-count

contract RequiemWeightedPairV2 is IRequiemSwap, IRequiemWeightedPairV2, WeightedPairERC20V2 {
    using UQ112x112 for uint224;

    uint256 public constant MINIMUM_LIQUIDITY = 10**3;
    // bytes4(keccak256(bytes("transfer(address,uint256)")));
    bytes4 private constant SELECTOR = 0xa9059cbb;
    address public factory;
    address public token0;
    address public token1;

    uint112 private reserve0; // uses single storage slot, accessible via getReserves
    uint112 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 private blockTimestampLast; // uses single storage slot, accessible via getReserves

    address public formula;

    uint112 private collectedFee0; // uses single storage slot, accessible via getReserves
    uint112 private collectedFee1; // uses single storage slot, accessible via getReserves
    uint32 private tokenWeight0;

    // 1 slot
    uint32 internal constant BPS = 10000;
    uint32 private tokenWeight1;
    uint32 private swapFee;
    bool private unlocked = true;

    // 1 slot
    uint112 internal vReserve0;
    uint112 internal vReserve1;
    uint32 private ampBps; // 10000 is equyivalent to a scale of 1

    // ===== modifiers =====
    modifier lock() {
        require(unlocked, "REQLP: L");
        unlocked = false;
        _;
        unlocked = true;
    }

    modifier onlyFactory() {
        require(msg.sender == factory, "auth");
        _;
    }

    // ===== views =====
    function getReserves() public view returns (ReserveData memory reserveData) {
        reserveData.reserve0 = reserve0;
        reserveData.reserve1 = reserve1;
        reserveData.vReserve0 = vReserve0;
        reserveData.vReserve1 = vReserve1;
    }

    function getCollectedFees() public view returns (uint112 _collectedFee0, uint112 _collectedFee1) {
        _collectedFee0 = collectedFee0;
        _collectedFee1 = collectedFee1;
    }

    function getParameters()
        public
        view
        returns (
            uint32 _tokenWeight0,
            uint32 _tokenWeight1,
            uint32 _swapFee,
            uint32 _amp
        )
    {
        _tokenWeight0 = tokenWeight0;
        _tokenWeight1 = tokenWeight1;
        _swapFee = swapFee;
        _amp = ampBps;
    }

    function name() public view override(IRequiemPairERC20) returns (string memory) {
        return string(abi.encodePacked("Requiem ", tokenWeight0, "-", tokenWeight1, " LP"));
    }

    function symbol() public view override returns (string memory) {
        return string(abi.encodePacked("REQ ", tokenWeight0, "-", tokenWeight1, " LP"));
    }

    /**
     * @notice Simple safeTransfer implementation
     * @param token token to send
     * @param to receiver
     * @param value amount to send
     */
    function _safeTransfer(
        address token,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
        require(success && (data.length == 0 || abi.decode(data, (bool))), "REQLP: TF");
    }

    constructor() {
        factory = msg.sender;
    }

    /**
     * @notice called once by the factory at time of deployment - sets static parameters
     * @param _token0 first token
     * @param _token1 second token
     * @param _tokenWeight0 first token weight
     */
    function initialize(
        address _token0,
        address _token1,
        uint32 _tokenWeight0
    ) external {
        require(msg.sender == factory, "REQLP: F");
        // sufficient check
        token0 = _token0;
        token1 = _token1;
        tokenWeight0 = _tokenWeight0;
        tokenWeight1 = 100 - tokenWeight0;
        swapFee = 10; // default fee is 10bps
        formula = IRequiemWeightedPairFactory(factory).formula();
    }

    /**
     * @dev update reserves and, on the first call per block
     *  @param data new data to sync with
     */
    function _update(ReserveData memory data) private {
        reserve0 = uint112(data.reserve0);
        reserve1 = uint112(data.reserve1);
        assert(data.vReserve0 >= data.reserve0 && data.vReserve1 >= data.reserve1); // never happen
        vReserve0 = uint112(data.vReserve0);
        vReserve1 = uint112(data.vReserve1);
        emit Sync(reserve0, reserve1, vReserve0, vReserve1);
    }

    /**
     * @notice Calculator of swap fees sent to feeTo address in LP tokens
     * @param reserveData reserve data in uint256
     */
    function _mintFee(ReserveData memory reserveData) private returns (bool feeOn) {
        address feeTo = IRequiemWeightedPairFactory(factory).feeTo();
        uint112 protocolFee = uint112(IRequiemWeightedPairFactory(factory).protocolFee());
        feeOn = feeTo != address(0);
        (uint112 _collectedFee0, uint112 _collectedFee1) = getCollectedFees();
        if (protocolFee > 0 && feeOn && (_collectedFee0 > 0 || _collectedFee1 > 0)) {
            uint32 _tokenWeight0 = tokenWeight0;
            uint256 liquidity;
            liquidity = IWeightedFormulaV2(formula).mintLiquidityFee(
                totalSupply,
                reserveData.vReserve0,
                reserveData.vReserve1,
                _tokenWeight0,
                _collectedFee0 / protocolFee,
                _collectedFee1 / protocolFee
            );
            if (liquidity > 0) _mint(feeTo, liquidity);
        }
        if (_collectedFee0 > 0) collectedFee0 = 0;
        if (_collectedFee1 > 0) collectedFee1 = 0;
    }

    /**
     * @notice this low-level function should be called from a contract which performs important safety checks
     * @param to recipient of LP tokens
     */
    function mint(address to) external lock returns (uint256 liquidity) {
        ReserveData memory reserveData = getReserves(); // gas savings
        ReserveData memory _reserveData;
        _reserveData.reserve0 = IERC20(token0).balanceOf(address(this));
        _reserveData.reserve1 = IERC20(token1).balanceOf(address(this));
        uint256 amount0 = _reserveData.reserve0 - reserveData.reserve0;
        uint256 amount1 = _reserveData.reserve1 - reserveData.reserve1;
        _mintFee(_reserveData);
        uint256 _totalSupply = totalSupply;
        // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            uint32 _ampBps = ampBps;
            _reserveData.vReserve0 = (_reserveData.reserve0 * _ampBps) / BPS;
            _reserveData.vReserve1 = (_reserveData.reserve1 * _ampBps) / BPS;

            liquidity = Math.sqrt(amount0 * amount1) - MINIMUM_LIQUIDITY;
            _mint(address(0), MINIMUM_LIQUIDITY);
            // permanently lock the first MINIMUM_LIQUIDITY tokens
        } else {
            liquidity = Math.min((amount0 * _totalSupply) / reserveData.reserve0, (amount1 * _totalSupply) / reserveData.reserve1);
            uint256 b = liquidity + _totalSupply;
            _reserveData.vReserve0 = Math.max((reserveData.vReserve0 * b) / _totalSupply, _reserveData.reserve0);
            _reserveData.vReserve1 = Math.max((reserveData.vReserve1 * b) / _totalSupply, _reserveData.reserve1);
        }
        require(liquidity > 0, "REQLP: ILM");
        _mint(to, liquidity);

        _update(_reserveData);
        emit Mint(msg.sender, amount0, amount1);
    }

    /**
     * @notice this low-level function should be called from a contract which performs important safety checks
     * @param to recipient of withdrawn tokens
     */
    function burn(address to) external lock returns (uint256 amount0, uint256 amount1) {
        ReserveData memory reserveData = getReserves(); // gas savings
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        uint256 balance0 = IERC20(_token0).balanceOf(address(this));
        uint256 balance1 = IERC20(_token1).balanceOf(address(this));
        uint256 liquidity = balanceOf[address(this)];
        _mintFee(reserveData);
        uint256 _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = (liquidity * balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = (liquidity * balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, "REQLP: ILB");
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);

        ReserveData memory _reserveData;
        _reserveData.reserve0 = IERC20(_token0).balanceOf(address(this));
        _reserveData.reserve1 = IERC20(_token1).balanceOf(address(this));

        uint256 b = Math.min((_reserveData.reserve0 * _totalSupply) / reserveData.reserve0, (_reserveData.reserve1 * _totalSupply) / reserveData.reserve1);
        _reserveData.vReserve0 = Math.max((reserveData.vReserve0 * b) / _totalSupply, _reserveData.reserve0);
        _reserveData.vReserve1 = Math.max((reserveData.vReserve1 * b) / _totalSupply, _reserveData.reserve1);

        _update(_reserveData);
        emit Burn(msg.sender, amount0, amount1, to);
    }

    /** @notice this low-level function should be called from a contract which performs important safety checks
     * works best with using the calculation methods implemented in this contract
     * @param amount0Out token0 amount out
     * @param amount1Out token1 amount out
     * @param to recipient
     * @param callData info for flash swap exeution
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata callData
    ) external lock {
        _swap(amount0Out, amount1Out, to, callData);
    }

    /**
     * @notice Implementation of Requiem Swap interface - Can be used to swap tokens with this pair
     * @param tokenIn input token
     * @param amountIn input amount
     */
    function calculateSwapGivenIn(
        address tokenIn,
        address,
        uint256 amountIn
    ) external view returns (uint256) {
        IWeightedFormulaV2.PricingData memory pricingData = tokenIn == token0
            ? IWeightedFormulaV2.PricingData(reserve0, reserve1, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
            : IWeightedFormulaV2.PricingData(reserve1, reserve0, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);

        return IWeightedFormulaV2(formula).getAmountOut(amountIn, pricingData);
    }

    /**
     * @notice Implementation of Requiem Swap interface - Has to be used to do exact-out swapss
     * @param tokenIn input token
     * @param amountOut output amount
     */
    function calculateSwapGivenOut(
        address tokenIn,
        address,
        uint256 amountOut
    ) external view returns (uint256) {
        IWeightedFormulaV2.PricingData memory pricingData = tokenIn == token0
            ? IWeightedFormulaV2.PricingData(reserve0, reserve1, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
            : IWeightedFormulaV2.PricingData(reserve1, reserve0, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);
        return IWeightedFormulaV2(formula).getAmountIn(amountOut, pricingData);
    }

    /** @notice force balances to match reserves */
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)) - reserve0);
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)) - reserve1);
    }

    /** @notice force reserves to match balances */
    function sync() external override {
        ReserveData memory reserveData = getReserves();
        _mintFee(reserveData);
        ReserveData memory newReserveData;
        newReserveData.reserve0 = IERC20(token0).balanceOf(address(this));
        newReserveData.reserve1 = IERC20(token1).balanceOf(address(this));

        // update virtual reserves
        uint256 _totalSupply = totalSupply;
        uint256 b = Math.min((reserve0 * _totalSupply) / reserve0, (reserve1 * _totalSupply) / reserve1);

        newReserveData.vReserve0 = Math.max((uint256(vReserve0) * b) / _totalSupply, reserve0);
        newReserveData.vReserve1 = Math.max((uint256(vReserve1) * b) / _totalSupply, reserve1);

        _update(newReserveData);
    }

    /**
     * @notice calculates output amount for given input and executes the respective trade
     * viable for use in multi swaps as it returns the output value
     * requires the amount in to be sent to this address beforehand
     * @param tokenIn input token
     * @param amountIn input amount
     * @param to reveiver address
     */
    function onSwapGivenIn(
        address tokenIn,
        address,
        uint256 amountIn,
        uint256,
        address to
    ) external override lock returns (uint256) {
        bool inToken0 = tokenIn == token0;
        IWeightedFormulaV2.PricingData memory pricingData = inToken0
            ? IWeightedFormulaV2.PricingData(reserve0, reserve1, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
            : IWeightedFormulaV2.PricingData(reserve1, reserve0, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);
        uint256 amountOut = IWeightedFormulaV2(formula).getAmountOut(amountIn, pricingData);
        (uint256 amount0Out, uint256 amount1Out) = inToken0 ? (uint256(0), amountOut) : (amountOut, uint256(0));
        return _swap(amount0Out, amount1Out, to, new bytes(0));
    }

    /**
     * @notice calculates input amount for given output and executes the respective trade
     * calling this one only makes sense if a single trade is supposd to be executed in the tx
     * requires the amount in to be sent to this address beforehand
     * @param tokenIn input token
     * @param amountOut output amount
     * @param to reveiver address
     */
    function onSwapGivenOut(
        address tokenIn,
        address,
        uint256 amountOut,
        uint256,
        address to
    ) external override lock returns (uint256) {
        bool inToken0 = tokenIn == token0;
        IWeightedFormulaV2.PricingData memory pricingData = inToken0
            ? IWeightedFormulaV2.PricingData(reserve0, reserve1, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
            : IWeightedFormulaV2.PricingData(reserve1, reserve0, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);
        uint256 amountIn = IWeightedFormulaV2(formula).getAmountIn(amountOut, pricingData);
        (uint256 amount0Out, uint256 amount1Out) = inToken0 ? (uint256(0), amountIn) : (amountIn, uint256(0));
        return _swap(amount0Out, amount1Out, to, new bytes(0));
    }

    /**
     * @notice Wraps the swap funtion for the Requiem interface which pre-selects the respective token amount
     * @param tokenIn input token
     * @param amountOut output amount
     * @param to reveiver address
     */
    function onSwap(
        address tokenIn,
        address,
        uint256,
        uint256 amountOut,
        address to
    ) external override lock {
        (uint256 amount0Out, uint256 amount1Out) = token0 == tokenIn ? (uint256(0), amountOut) : (amountOut, uint256(0));
        _swap(amount0Out, amount1Out, to, new bytes(0));
    }

    /**
     * @notice swap function of pair - this low-level function should be called from a contract which performs important safety checks
     * - The function assumes that the correct amount (e.g. using calculateSwapGivenIn) has been sent to this pair already
     * - Amounts are sent to the user and sanity checks are done afterwards (e.g. to ensure that the invariant is unchanged)
     * @param amount0Out token0 output amount
     * @param amount1Out token1 output amount
     * @param to reveiver address
     * @param data flash swap data
     */
    function _swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes memory data
    ) internal returns (uint256) {
        require(amount0Out > 0 || amount1Out > 0, "REQLP: IOA");
        ReserveData memory reserveData = getReserves(); // gas savings
        require(amount0Out < reserveData.reserve0 && amount1Out < reserveData.reserve1, "REQLP: IL");

        ReserveData memory newReserveData;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "REQLP: IT");
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            if (data.length > 0) IRequiemCallee(to).requiemCall(msg.sender, amount0Out, amount1Out, data); // flash swap
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));

            newReserveData.vReserve0 = reserveData.vReserve0 + newReserveData.reserve0 - reserveData.reserve0;
            newReserveData.vReserve1 = reserveData.vReserve1 + newReserveData.reserve1 - reserveData.reserve1;
        }
        uint256 amount0In = newReserveData.reserve0 > reserveData.reserve0 - amount0Out ? newReserveData.reserve0 - (reserveData.reserve0 - amount0Out) : 0;
        uint256 amount1In = newReserveData.reserve1 > reserveData.reserve1 - amount1Out ? newReserveData.reserve1 - (reserveData.reserve1 - amount1Out) : 0;

        require(amount0In > 0 || amount1In > 0, "REQLP: IIA");
        {
            // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint256 balance0Adjusted = newReserveData.vReserve0 * 10000;
            uint256 balance1Adjusted = newReserveData.vReserve1 * 10000;
            {
                // avoids stack too deep errors
                if (amount0In > 0) {
                    uint256 amount0InFee = amount0In * swapFee;
                    balance0Adjusted -= amount0InFee;
                    collectedFee0 = uint112(uint256(collectedFee0) + amount0InFee);
                }
                if (amount1In > 0) {
                    uint256 amount1InFee = amount1In * swapFee;
                    balance1Adjusted -= amount1InFee;
                    collectedFee1 = uint112(uint256(collectedFee1) + amount1InFee);
                }
                uint32 _tokenWeight0 = tokenWeight0; // gas savings
                // 50 / 50 weight condition is handled in formula call
                require(IWeightedFormulaV2(formula).ensureConstantValue(reserveData.vReserve0 * 10000, reserveData.vReserve1 * 10000, balance0Adjusted, balance1Adjusted, _tokenWeight0), "REQLP: K");
            }
        }
        _update(newReserveData);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
        return amount0Out > 0 ? amount0Out : amount1Out;
    }

    /**
     * @notice Changes curicial parameters - can only be called by factory - requires a sync() after any change
     */
    function setSwapParams(uint32 _newSwapFee, uint32 _newAmp) external onlyFactory {
        swapFee = _newSwapFee;
        ampBps = _newAmp;
    }
}
