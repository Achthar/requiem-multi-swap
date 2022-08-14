// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "../interfaces/poolPair/IWeightedPair.sol";
import "../interfaces/poolPair/IWeightedPairERC20.sol";
import "../interfaces/ISwap.sol";
import "../interfaces/poolPair/IWeightedFormula.sol";
import "../interfaces/poolPair/IWeightedPairAdmin.sol";
import "../interfaces/poolPair/IRequiemCallee.sol";
import "../interfaces/poolPair/IUniswapV2TypeSwap.sol";
import "./WeightedPairERC20.sol";
import "../libraries/Math.sol";
import "../libraries/SafeERC20.sol";
import "../libraries/UQ112x112.sol";
import "../interfaces/ERC20/IERC20.sol";
import "../interfaces/ERC20/IERC20Metadata.sol";
import "../interfaces/poolBase/IFlashSwapRecipient.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, avoid-low-level-calls, max-states-count

contract RequiemPair is ISwap, IUniswapV2TypeSwap, IWeightedPair, WeightedPairERC20 {
    using SafeERC20 for IERC20;
    using UQ112x112 for uint224;

    address public admin;
    address public token0;
    address public token1;
    address public votingRegister;
    address public formula;
    bool private locked;

    uint112 private reserve0; // uses single storage slot, accessible via getReserves
    uint112 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 private immutable BPS = 10000;

    uint112 private collectedFee0;
    uint112 private collectedFee1;
    uint32 private tokenWeight0;

    // 1 slot
    // bytes4(keccak256(bytes("transfer(address,uint256)")));
    bytes4 private immutable SELECTOR = 0xa9059cbb;
    uint32 private tokenWeight1;
    uint32 private swapFee;

    // 1 slot
    uint112 private vReserve0; // uses single storage slot, accessible via getReserves
    uint112 private vReserve1; // uses single storage slot, accessible via getReserves
    uint32 private ampBps = 10000; // 10000 is equivalent to a scale of 1

    // ===== modifiers =====

    // custom Reentrancy guard mechanism
    modifier lock() {
        require(!locked, "REQLP: L");
        locked = true;
        _;
        locked = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "REQLP: admin");
        _;
    }

    // ===== views =====

    /** @notice gets bot reserves and virtual reserves */
    function getReserves() public view override returns (ReserveData memory reserveData) {
        reserveData.reserve0 = reserve0;
        reserveData.reserve1 = reserve1;
        reserveData.vReserve0 = vReserve0;
        reserveData.vReserve1 = vReserve1;
    }

    /** @notice Gets fees */
    function getCollectedFees() external view returns (uint112 _collectedFee0, uint112 _collectedFee1) {
        _collectedFee0 = collectedFee0;
        _collectedFee1 = collectedFee1;
    }

    /** @notice Gets static swap parameters */
    function getParameters()
        external
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
        admin = msg.sender;
        // sufficient check
        token0 = _token0;
        token1 = _token1;
        tokenWeight0 = _tokenWeight0;
        tokenWeight1 = 100 - tokenWeight0;
    }

    /**
     * @dev update reserves and, on the first call per block
     *  @param data new data to sync with
     */
    function _update(ReserveData memory data) private {
        reserve0 = uint112(data.reserve0);
        reserve1 = uint112(data.reserve1);
        require(data.vReserve0 >= data.reserve0 && data.vReserve1 >= data.reserve1); // never happen
        vReserve0 = uint112(data.vReserve0);
        vReserve1 = uint112(data.vReserve1);
    }

    /**
     * @notice Calculator of swap fees sent to feeTo address in LP tokens
     * @param reserveData reserve data in uint256
     */
    function _mintFee(ReserveData memory reserveData) private {
        address feeTo = IWeightedPairAdmin(admin).feeTo();

        // one slot
        uint112 protocolFee = uint112(IWeightedPairAdmin(admin).protocolFee(address(this)));
        uint32 _tokenWeight0 = tokenWeight0;

        // one slot
        (uint112 _collectedFee0, uint112 _collectedFee1) = (collectedFee0, collectedFee1);
        uint32 _tokenWeight1 = tokenWeight1;

        if (protocolFee > 0 && feeTo != address(0) && (_collectedFee0 > 0 || _collectedFee1 > 0)) {
            uint256 liquidity;
            liquidity = IWeightedFormula(formula).mintLiquidityFee(
                totalSupply,
                reserveData.vReserve0,
                reserveData.vReserve1,
                _tokenWeight0,
                _tokenWeight1,
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
        _mintFee(reserveData);
        uint256 _totalSupply = totalSupply;
        // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            uint256 _bps = BPS;
            uint32 _ampBps = ampBps;
            _reserveData.vReserve0 = (_reserveData.reserve0 * _ampBps) / _bps;
            _reserveData.vReserve1 = (_reserveData.reserve1 * _ampBps) / _bps;

            liquidity = Math.sqrt(amount0 * amount1) - 1000;
            _mint(address(0), 1000);
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
        return
            tokenIn == token0
                ? IWeightedFormula(formula).getAmountOut(amountIn, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
                : IWeightedFormula(formula).getAmountOut(amountIn, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);
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
        return
            tokenIn == token0
                ? IWeightedFormula(formula).getAmountIn(amountOut, vReserve0, vReserve1, tokenWeight0, tokenWeight1, swapFee)
                : IWeightedFormula(formula).getAmountIn(amountOut, vReserve1, vReserve0, tokenWeight1, tokenWeight0, swapFee);
    }

    /**
     * @notice calculates output amount for given input and executes the respective trade.
     * No check of invariant required as the output amount equation used is equivalent to the invariant condition.
     * The inAmount is directly determined by the new balance of tokenIn - hence the parameter is not needed.
     * @param tokenIn input token
     * @param to reveiver address
     * @return amountOut amount
     */
    function onSwapGivenIn(
        address tokenIn,
        address,
        address to
    ) external override lock returns (uint256 amountOut) {
        //initialized data for new reserves
        ReserveData memory newReserveData;

        // fetch the actual in balance of the input token
        uint256 balanceIn;
        uint256 amountIn;
        address _token0 = token0;
        address _token1 = token1;
        // fetch uint256 reserves
        (uint256 r0, uint256 r1, uint256 v0, uint256 v1) = (reserve0, reserve1, vReserve0, vReserve1);

        if (tokenIn == _token0) {
            balanceIn = IERC20(_token0).balanceOf(address(this));
            // fetch "real" inAmount
            amountIn = balanceIn - r0;
            // calculate output amount
            amountOut = _handleIn0ExactIn(amountIn, v0, v1);

            // transfer token amount
            _safeTransfer(_token1, to, amountOut);
            emit Swap(amountIn, 0, 0, amountOut);
            // update reserves
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));
        } else if (tokenIn == _token1) {
            balanceIn = IERC20(_token1).balanceOf(address(this));
            // get real inAmount
            amountIn = balanceIn - r1;
            // calculate amount out
            amountOut = _handleIn1ExactIn(amountIn, v0, v1);

            newReserveData.reserve1 = balanceIn;

            // transfer token amount
            _safeTransfer(_token0, to, amountOut);

            // update reserves
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));

            emit Swap(0, amountIn, amountOut, 0);
        } else {
            revert("REQLP: T");
        }

        // update virtual reserves
        newReserveData.vReserve0 = v0 + newReserveData.reserve0 - r0;
        newReserveData.vReserve1 = v1 + newReserveData.reserve1 - r1;
        _update(newReserveData);
    }

    /**
     * @notice uniswapV2 type swap function of pair - this low-level function should be called from a contract which performs important safety checks
     * - The function assumes that the correct amount (e.g. using calculateSwapGivenIn) has been sent to this pair already
     * - Amounts are sent to the user and sanity checks are done afterwards (e.g. to ensure that the invariant is unchanged)
     * @param amount0Out token0 output amount
     * @param amount1Out token1 output amount
     * @param to reveiver address
     * @param data flash swap data
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes memory data
    ) external override lock returns (uint256) {
        require(amount0Out > 0 || amount1Out > 0, "REQLP: IOA");
        ReserveData memory reserveData = getReserves(); // gas savings
        require(amount0Out < reserveData.reserve0 && amount1Out < reserveData.reserve1, "REQLP: IL");

        ReserveData memory newReserveData;
        {
            // scope for _token{0,1}, avoids stack too deep errors
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, "REQLP: IT");
            if (amount0Out != 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out != 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
            if (data.length != 0) IRequiemCallee(to).requiemCall(msg.sender, amount0Out, amount1Out, data); // flash swap
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));

            newReserveData.vReserve0 = reserveData.vReserve0 + newReserveData.reserve0 - reserveData.reserve0;
            newReserveData.vReserve1 = reserveData.vReserve1 + newReserveData.reserve1 - reserveData.reserve1;
        }
        uint256 amount0In = newReserveData.reserve0 > reserveData.reserve0 - amount0Out ? newReserveData.reserve0 - (reserveData.reserve0 - amount0Out) : 0;
        uint256 amount1In = newReserveData.reserve1 > reserveData.reserve1 - amount1Out ? newReserveData.reserve1 - (reserveData.reserve1 - amount1Out) : 0;

        require(amount0In != 0 || amount1In != 0, "REQLP: IIA");

        // derive post fee balances - using vReserves for validation of swap
        uint256 balance0Adjusted = newReserveData.vReserve0 * 10000;
        uint256 balance1Adjusted = newReserveData.vReserve1 * 10000;

        // fee handling
        if (amount0In != 0) {
            uint256 amount0InFee = amount0In * swapFee;
            balance0Adjusted -= amount0InFee;
            collectedFee0 = uint112(uint256(collectedFee0) + amount0InFee);
        }
        if (amount1In != 0) {
            uint256 amount1InFee = amount1In * swapFee;
            balance1Adjusted -= amount1InFee;
            collectedFee1 = uint112(uint256(collectedFee1) + amount1InFee);
        }
        // invariant check
        require(IWeightedFormula(formula).ensureConstantValue(reserveData.vReserve0 * 10000, reserveData.vReserve1 * 10000, balance0Adjusted, balance1Adjusted, tokenWeight0), "REQLP: K");

        _update(newReserveData);
        emit Swap(amount0In, amount1In, amount0Out, amount1Out);
        return amount0Out != 0 ? amount0Out : amount1Out;
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
        address to
    ) external override lock {
        //initialized data for new reserves
        ReserveData memory newReserveData;

        uint256 balanceIn;
        uint256 amountIn;

        // fetch uint256 reserves
        (uint256 r0, uint256 r1, uint256 v0, uint256 v1) = (reserve0, reserve1, vReserve0, vReserve1);

        address _token0 = token0;
        address _token1 = token1;
        if (tokenIn == _token0) {
            balanceIn = IERC20(_token0).balanceOf(address(this));
            // calculate input amount
            amountIn = _handleIn0ExactOut(amountOut, v0, v1);

            // transfer token amount
            _safeTransfer(_token1, to, amountOut);

            // update reserves
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));
            require(balanceIn >= amountIn + r0, "insufficient in");

            emit Swap(amountIn, 0, 0, amountOut);
        } else if (tokenIn == _token1) {
            // case token1 is inToken

            balanceIn = IERC20(_token1).balanceOf(address(this));

            // calculate amount in
            amountIn = _handleIn1ExactOut(amountOut, v0, v1);

            newReserveData.reserve1 = balanceIn;

            // transfer token amount
            _safeTransfer(_token0, to, amountOut);

            // update reserves
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));

            require(balanceIn >= amountIn + r1, "insufficient in");

            emit Swap(0, amountIn, amountOut, 0);
        } else {
            revert("REQLP: T");
        }

        // update virtual reserves
        newReserveData.vReserve0 = v0 + newReserveData.reserve0 - r0;
        newReserveData.vReserve1 = v1 + newReserveData.reserve1 - r1;
        _update(newReserveData);
    }

    /**
     * @notice calculates input amount for given output and executes the respective trade
     * calling this one only makes sense if a single trade is supposd to be executed in the tx
     * requires the amount in to be sent to this address beforehand
     * @param tokenIn input token
     * @param amountOut output amount
     * @param to reveiver address
     */
    function onFlashSwapGivenOut(
        IFlashSwapRecipient swapRecipient,
        address tokenIn,
        address,
        uint256 amountOut,
        address to,
        bytes calldata data
    ) external lock returns (uint256 amountIn) {
        //initialized data for new reserves
        ReserveData memory newReserveData;

        // fetch reserves in struct
        ReserveData memory reserveData = getReserves();

        // fetch the actual in balance of the input token
        address _token0 = token0;
        address _token1 = token1;
        uint256 balanceIn;

        if (tokenIn == _token0) {
            // calculate input amount
            amountIn = _handleIn0ExactOut(amountOut, reserveData.vReserve0, reserveData.vReserve1);

            // transfer token amount
            _safeTransfer(_token1, to, amountOut);
            swapRecipient.recieveSwapAmount(msg.sender, _token0, _token1, amountIn, amountOut, data);

            // fetch post swap balance
            balanceIn = IERC20(_token0).balanceOf(address(this));

            // update reserveData
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));
            require(balanceIn >= amountIn + reserveData.reserve0, "insufficient in");

            emit Swap(amountIn, 0, 0, amountOut);
        } else if (tokenIn == _token1) {
            // case token1 is inToken
            // calculate amount in
            amountIn = _handleIn1ExactOut(amountOut, reserveData.vReserve0, reserveData.vReserve1);

            // transfer token amount
            _safeTransfer(_token0, to, amountOut);
            swapRecipient.recieveSwapAmount(msg.sender, _token1, _token0, amountIn, amountOut, data);

            // fetch post swap balance
            balanceIn = IERC20(_token1).balanceOf(address(this));
            // update reserveData
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));

            require(balanceIn >= amountIn + reserveData.reserve1, "insufficient in");

            emit Swap(0, amountIn, amountOut, 0);
        } else {
            revert("REQLP: T");
        }

        // update virtual reserveData
        newReserveData.vReserve0 = reserveData.vReserve0 + newReserveData.reserve0 - reserveData.reserve0;
        newReserveData.vReserve1 = reserveData.vReserve1 + newReserveData.reserve1 - reserveData.reserve1;
        _update(newReserveData);
    }

    /**
     * @notice calculates output amount for given input and executes the respective trade.
     * No check of invariant required as the output amount equation used is equivalent to the invariant condition.
     * The inAmount is directly determined by the new balance of tokenIn - hence the parameter is not needed.
     * @param tokenIn input token
     * @param to reveiver address
     * @return amountOut amount
     */
    function onFlashSwapGivenIn(
        IFlashSwapRecipient swapRecipient,
        address tokenIn,
        address,
        uint256 amountIn,
        address to,
        bytes calldata data
    ) external lock returns (uint256 amountOut) {
        //initialized data for new reserves
        ReserveData memory newReserveData;

        // fetch reserves in struct
        ReserveData memory reserveData = getReserves();

        address _token0 = token0;
        address _token1 = token1;
        if (tokenIn == _token0) {
            // calculate output amount
            amountOut = _handleIn0ExactIn(amountIn, reserveData.vReserve0, reserveData.vReserve1);

            // transfer token amount
            _safeTransfer(_token1, to, amountOut);

            swapRecipient.recieveSwapAmount(msg.sender, _token0, _token1, amountIn, amountOut, data);

            // fetch post trade balance in
            uint256 balanceIn = IERC20(_token0).balanceOf(address(this));
            // validate trade
            require(balanceIn >= amountIn + reserveData.reserve0, "insufficient in0");

            // update reserves
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(_token1).balanceOf(address(this));

            emit Swap(amountIn, 0, 0, amountOut);
        } else if (tokenIn == _token1) {
            // calculate amount out
            amountOut = _handleIn1ExactIn(amountIn, reserveData.vReserve0, reserveData.vReserve1);

            // transfer token amount
            _safeTransfer(_token0, to, amountOut);

            swapRecipient.recieveSwapAmount(msg.sender, _token1, _token0, amountIn, amountOut, data);

            // fetch post trade balance in
            uint256 balanceIn = IERC20(_token1).balanceOf(address(this));
            // validate trade
            require(balanceIn >= amountIn + reserveData.reserve1, "insufficient in1");

            // update reserves
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(_token0).balanceOf(address(this));

            emit Swap(0, amountIn, amountOut, 0);
        } else {
            revert("REQLP: T");
        }

        // update virtual reserves
        newReserveData.vReserve0 = reserveData.vReserve0 + newReserveData.reserve0 - reserveData.reserve0;
        newReserveData.vReserve1 = reserveData.vReserve1 + newReserveData.reserve1 - reserveData.reserve1;
        _update(newReserveData);
    }

    function _handleIn0ExactIn(
        uint256 amountIn,
        uint256 v0,
        uint256 v1
    ) private returns (uint256 amountOut) {
        // calculate output amount
        amountOut = IWeightedFormula(formula).getAmountOut(amountIn, v0, v1, tokenWeight0, tokenWeight1, swapFee);

        // handle fee
        collectedFee0 = uint112(uint256(collectedFee0) + amountIn * swapFee);
    }

    function _handleIn1ExactIn(
        uint256 amountIn,
        uint256 v0,
        uint256 v1
    ) private returns (uint256 amountOut) {
        // calculate output amount
        amountOut = IWeightedFormula(formula).getAmountOut(amountIn, v1, v0, tokenWeight1, tokenWeight0, swapFee);

        // handle fee
        collectedFee1 = uint112(uint256(collectedFee1) + amountIn * swapFee);
    }

    function _handleIn0ExactOut(
        uint256 amountOut,
        uint256 v0,
        uint256 v1
    ) private returns (uint256 amountIn) {
        // calculate input amount
        amountIn = IWeightedFormula(formula).getAmountIn(amountOut, v0, v1, tokenWeight0, tokenWeight1, swapFee);

        // handle fee
        collectedFee0 = uint112(uint256(collectedFee0) + ((amountIn * 10000) / (10000 - swapFee) + 1) - amountIn);
    }

    function _handleIn1ExactOut(
        uint256 amountOut,
        uint256 v0,
        uint256 v1
    ) private returns (uint256 amountIn) {
        // calculate input amount
        amountIn = IWeightedFormula(formula).getAmountIn(amountOut, v1, v0, tokenWeight1, tokenWeight0, swapFee);

        // handle fee
        collectedFee1 = uint112(uint256(collectedFee1) + ((amountIn * 10000) / (10000 - swapFee) + 1) - amountIn);
    }

    /** @notice force reserves to match balances */
    function sync() external override lock {
        ReserveData memory reserveData = getReserves();
        _mintFee(reserveData);
        ReserveData memory newReserveData;
        newReserveData.reserve0 = IERC20(token0).balanceOf(address(this));
        newReserveData.reserve1 = IERC20(token1).balanceOf(address(this));

        // update virtual reserves
        uint256 _totalSupply = totalSupply;
        uint256 b = Math.min((newReserveData.reserve0 * _totalSupply) / reserveData.reserve0, (newReserveData.reserve1 * _totalSupply) / reserveData.reserve1);

        newReserveData.vReserve0 = Math.max((reserveData.vReserve0 * b) / _totalSupply, newReserveData.reserve0);
        newReserveData.vReserve1 = Math.max((reserveData.vReserve1 * b) / _totalSupply, newReserveData.reserve1);

        _update(newReserveData);
    }

    /**
     * @notice Changes cruicial parameters - can only be called by admin - virtual reserves will be adjusted here, too
     * @param _newSwapFee new swap fee to use
     */
    function setSwapFee(uint32 _newSwapFee) external onlyAdmin {
        require(_newSwapFee <= 1000); // 10% is the maximum
        swapFee = _newSwapFee;
    }

    /**
     * @notice Changes cruicial parameters - can only be called by admin - virtual reserves will be adjusted here, too
     * @param _newAmp new amplification parameter to scale virtual reserves
     */
    function setAmplification(uint32 _newAmp) external onlyAdmin {
        vReserve0 = (vReserve0 * _newAmp) / BPS;
        vReserve1 = (vReserve1 * _newAmp) / BPS;
        ampBps = (_newAmp * ampBps) / BPS;
        require(vReserve0 >= reserve0 && vReserve1 >= reserve0 && ampBps >= BPS); // but new amp must still be larger tha one
    }

    /**
     * @notice Allows admin to change the formula
     * @param _newFormula new amplification parameter to scale virtual reserves
     */
    function setFormula(address _newFormula) external onlyAdmin {
        formula = _newFormula;
    }

    /**
     * @notice Changes cruicial parameters - can only be called by admin - virtual reserves will be adjusted here, too
     * @param _newAdmin new swap fee to use
     */
    function switchAdmin(address _newAdmin) external onlyAdmin {
        admin = _newAdmin;
    }
}
