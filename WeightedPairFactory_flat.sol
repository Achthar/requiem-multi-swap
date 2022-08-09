
// File: contracts/interfaces/ERC20/IERC20.sol



pragma solidity ^0.8.16;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

}
// File: contracts/interfaces/ERC20/IERC20Metadata.sol



pragma solidity ^0.8.16;


/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 *
 * _Available since v4.1._
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}
// File: contracts/libraries/UQ112x112.sol



pragma solidity >=0.8.16;

// a library for handling binary fixed point numbers (https://en.wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 private constant Q112 = 2**112;

    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }

    // divide a UQ112x112 by a uint112, returning a UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}

// File: contracts/libraries/Math.sol



pragma solidity >=0.8.16;

// a library for performing various math operations

library Math {
    function min(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x < y ? x : y;
    }

    function max(uint256 x, uint256 y) internal pure returns (uint256 z) {
        z = x > y ? x : y;
    }

    // babylonian method (https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}

// File: contracts/interfaces/poolPair/IUniswapV2TypeSwap.sol



pragma solidity ^0.8.16;

interface IUniswapV2TypeSwap {
    /**
    * @notice The classic UniswapV2 interface. Due to its widely used integrations, it is always usefult to have,
    * even though regular implementations lack efficiency when using in standard swap routing
    * The core utility in the requirem framework is the flash swap feature
     */
    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes memory data
    ) external returns (uint256);
}
// File: contracts/interfaces/poolPair/IRequiemCallee.sol



pragma solidity >=0.8.16;

interface IRequiemCallee {
    function requiemCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
// File: contracts/interfaces/poolPair/IWeightedPairAdmin.sol



pragma solidity >=0.8.16;

interface IWeightedPairAdmin {
    function feeTo() external view returns (address);

    function protocolFee(address _pair) external view returns (uint256);

    function pushGovernance(address _governance, address _pair) external;

    function inititalizePairAdministration(
        address _pair,
        address _formula,
        address _governance,
        uint256 _protocolFee,
        uint32 _swapFee,
        uint32 _amp
    ) external;
}

// File: contracts/interfaces/poolPair/IWeightedFormula.sol


pragma solidity >=0.8.16;

/*
    Bancor Formula interface
*/
interface IWeightedFormula {
    function getPairParameters(address pair, address tokenA)
        external
        view
        returns (
            address tokenB,
            uint256 reserveA,
            uint256 reserveB,
            uint32 tokenWeightA,
            uint32 tokenWeightB,
            uint32 swapFee
        );

    function getFactoryParameters(
        address factory,
        address pair,
        address tokenA
    )
        external
        view
        returns (
            address tokenB,
            uint256 reserveA,
            uint256 reserveB,
            uint32 tokenWeightA,
            uint32 tokenWeightB,
            uint32 swapFee
        );

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut,
        uint32 tokenWeightIn,
        uint32 tokenWeightOut,
        uint32 swapFee
    ) external view returns (uint256 amountIn);

    function getPairAmountIn(
        address pair,
        address tokenIn,
        uint256 amountOut
    ) external view returns (uint256 amountIn);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut,
        uint32 tokenWeightIn,
        uint32 tokenWeightOut,
        uint32 swapFee
    ) external view returns (uint256 amountOut);

    function getPairAmountOut(
        address pair,
        address tokenIn,
        uint256 amountIn
    ) external view returns (uint256 amountOut);

    function getAmountsIn(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);

    function getFactoryAmountsIn(
        address factory,
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);

    function getAmountsOut(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);

    function getFactoryAmountsOut(
        address factory,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address[] calldata path
    ) external view returns (uint256[] memory amounts);

    function ensureConstantValue(
        uint256 reserve0,
        uint256 reserve1,
        uint256 balance0Adjusted,
        uint256 balance1Adjusted,
        uint32 tokenWeight0
    ) external view returns (bool);

    function getReserves(
        address pair,
        address tokenA,
        address tokenB
    )
        external
        view
        returns (
            uint256 reserveA,
            uint256 reserveB,
            uint256 vReserveA,
            uint256 vReserveB
        );

    function getOtherToken(address pair, address tokenA) external view returns (address tokenB);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function sortTokens(address tokenA, address tokenB) external pure returns (address token0, address token1);

    function mintLiquidityFee(
        uint256 totalLiquidity,
        uint256 reserve0,
        uint256 reserve1,
        uint32 tokenWeight0,
        uint32 tokenWeight1,
        uint112 collectedFee0,
        uint112 collectedFee1
    ) external view returns (uint256 amount);
}

// File: contracts/interfaces/ISwap.sol



pragma solidity ^0.8.16;

interface ISwap {
    /**
    * @notice Calculates the swap value internally and sends the amount to the to address 
    * - Returns the calculated output amount.
    * - Can be done without readjusting the invariant as the internally called pricing should ensure validity
     */
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        address to
    ) external returns (uint256);

    /**
    * @notice Calculates the input amount internally and sends that amount from the caller to the pool and the amountOut to the to address
    * - Returns the calculated input amount.
    * - Can be done without readjusting the invariant as the internally called pricing should ensure validity
     */
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external;

    // calculator functions that should be used in sync with the swap functions above, i.e. most
    // importantly for the exact out swap above

    function calculateSwapGivenIn(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256);

    function calculateSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut
    ) external view returns (uint256);
}

// File: contracts/interfaces/poolPair/IWeightedPairERC20.sol



pragma solidity ^0.8.16;

// solhint-disable func-name-mixedcase

interface IWeightedPairERC20 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

// File: contracts/poolPair/WeightedPairERC20.sol



pragma solidity ^0.8.16;


// solhint-disable not-rely-on-time, no-inline-assembly, var-name-mixedcase, max-line-length

abstract contract WeightedPairERC20 is IWeightedPairERC20 {
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    bytes32 public override DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant override PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    mapping(address => uint256) public nonces;

    constructor() {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                keccak256(bytes("Requiem wPair LP")),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );
    }

    /** @notice Name of pair */
    function name() external pure virtual override returns (string memory) {
        return "Requiem wPair LP";
    }

    /** @notice Symbol of pair */
    function symbol() external pure virtual override returns (string memory) {
        return "REQWP";
    }

    function _mint(address to, uint256 value) internal {
        totalSupply += value;
        balanceOf[to] += value;
        emit Transfer(address(0), to, value);
    }

    function _burn(address from, uint256 value) internal {
        balanceOf[from] -= value;
        totalSupply -= value;
        emit Transfer(from, address(0), value);
    }

    function _approve(
        address owner,
        address spender,
        uint256 value
    ) private {
        allowance[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) private {
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }

    function approve(address spender, uint256 value) external returns (bool) {
        _approve(msg.sender, spender, value);
        return true;
    }

    function transfer(address to, uint256 value) external returns (bool) {
        _transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool) {
        if (allowance[from][msg.sender] != type(uint256).max) {
            allowance[from][msg.sender] -= value;
        }
        _transfer(from, to, value);
        return true;
    }

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(deadline >= block.timestamp, "REQ: EXP");
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))));
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner, "REQ: IS");
        _approve(owner, spender, value);
    }

    function decimals() external pure returns (uint8) {
        return 18;
    }
}

// File: contracts/interfaces/poolPair/IWeightedPair.sol



pragma solidity ^0.8.16;


// solhint-disable func-name-mixedcase

interface IWeightedPair is IWeightedPairERC20 {
    struct ReserveData {
        uint256 reserve0;
        uint256 reserve1;
        uint256 vReserve0;
        uint256 vReserve1;
    }

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);

    // function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function admin() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves() external view returns (ReserveData calldata reserveData);

    function getCollectedFees() external view returns (uint112 _collectedFee0, uint112 _collectedFee1);

    function getParameters()
        external
        view
        returns (
            uint32 _tokenWeight0,
            uint32 _tokenWeight1,
            uint32 _swapFee,
            uint32 _amp
        );

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function setSwapFee(uint32 _newSwapFee) external;

    function setAmplification(uint32 _newAmp) external;

    function switchAdmin(address _newAdmin) external;

    function setFormula(address _newFormula) external;

    function sync() external;

    function initialize(
        address,
        address,
        uint32
    ) external;
}

// File: contracts/poolPair/WeightedPair.sol



pragma solidity ^0.8.16;













// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, avoid-low-level-calls, max-states-count

contract RequiemPair is ISwap, IUniswapV2TypeSwap, IWeightedPair, WeightedPairERC20 {
    using UQ112x112 for uint224;

    address public admin;
    address public token0;
    address public token1;
    address public formula;

    uint112 private reserve0; // uses single storage slot, accessible via getReserves
    uint112 private reserve1; // uses single storage slot, accessible via getReserves
    uint32 internal constant BPS = 10000;

    uint112 private collectedFee0;
    uint112 private collectedFee1;
    uint32 private tokenWeight0;

    // 1 slot
    // bytes4(keccak256(bytes("transfer(address,uint256)")));
    bytes4 private constant SELECTOR = 0xa9059cbb;
    uint32 private tokenWeight1;
    uint32 private swapFee;
    bool private unlocked = true;

    // 1 slot
    uint112 private vReserve0; // uses single storage slot, accessible via getReserves
    uint112 private vReserve1; // uses single storage slot, accessible via getReserves
    uint32 private ampBps = 10000; // 10000 is equivalent to a scale of 1

    // ===== modifiers =====

    // custom Reentrancy guard mechanism
    modifier lock() {
        require(unlocked, "REQLP: L");
        unlocked = false;
        _;
        unlocked = true;
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
    function getCollectedFees() public view returns (uint112 _collectedFee0, uint112 _collectedFee1) {
        _collectedFee0 = collectedFee0;
        _collectedFee1 = collectedFee1;
    }

    /** @notice Gets static swap parameters */
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
        admin = msg.sender;
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
    ) external onlyAdmin {
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
        assert(data.vReserve0 >= data.reserve0 && data.vReserve1 >= data.reserve1); // never happen
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
        (uint112 _collectedFee0, uint112 _collectedFee1) = getCollectedFees();
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
        (uint256 vReserveIn, uint256 vReserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = tokenIn == token0
            ? (vReserve0, vReserve1, tokenWeight0, tokenWeight1)
            : (vReserve1, vReserve0, tokenWeight1, tokenWeight0);

        return IWeightedFormula(formula).getAmountOut(amountIn, vReserveIn, vReserveOut, tokenWeightIn, tokenWeightOut, swapFee);
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
        (uint256 vReserveIn, uint256 vReserveOut, uint32 tokenWeightIn, uint32 tokenWeightOut) = tokenIn == token0
            ? (vReserve0, vReserve1, tokenWeight0, tokenWeight1)
            : (vReserve1, vReserve0, tokenWeight1, tokenWeight0);

        return IWeightedFormula(formula).getAmountIn(amountOut, vReserveIn, vReserveOut, tokenWeightIn, tokenWeightOut, swapFee);
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
        uint256 balanceIn = IERC20(tokenIn).balanceOf(address(this));
        uint256 amountIn;

        // fetch uint256 reserves
        (uint256 r0, uint256 r1, uint256 v0, uint256 v1) = (reserve0, reserve1, vReserve0, vReserve1);

        if (tokenIn == token0) {
            // fetch "real" inAmount
            amountIn = balanceIn - r0;
            // calculate output amount
            amountOut = IWeightedFormula(formula).getAmountOut(amountIn, v0, v1, tokenWeight0, tokenWeight1, swapFee);

            // handle fee
            collectedFee0 = uint112(uint256(collectedFee0) + amountIn * swapFee);

            // transfer token amount
            _safeTransfer(token1, to, amountOut);
            emit Swap(msg.sender, amountIn, 0, 0, amountOut, to);
            // update reserves
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(token1).balanceOf(address(this));
        } else if (tokenIn == token1) {
            // get real inAmount
            amountIn = balanceIn - r1;
            // calculate amount out
            amountOut = IWeightedFormula(formula).getAmountOut(amountIn, v1, v0, tokenWeight1, tokenWeight0, swapFee);

            // handle fee
            collectedFee1 = uint112(uint256(collectedFee1) + amountIn * swapFee);
            newReserveData.reserve1 = balanceIn;

            // transfer token amount
            _safeTransfer(token0, to, amountOut);

            // update reserves
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(token0).balanceOf(address(this));

            emit Swap(msg.sender, 0, 0, amountOut, 0, to);
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
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
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

        // fetch the actual in balance of the input token
        uint256 balanceIn = IERC20(tokenIn).balanceOf(address(this));
        uint256 amountIn;

        // fetch uint256 reserves
        (uint256 r0, uint256 r1, uint256 v0, uint256 v1) = (reserve0, reserve1, vReserve0, vReserve1);

        if (tokenIn == token0) {
            // calculate input amount
            amountIn = IWeightedFormula(formula).getAmountIn(amountOut, v0, v1, tokenWeight0, tokenWeight1, swapFee);

            // handle fee
            collectedFee0 = uint112(uint256(collectedFee0) + ((amountIn * 10000) / (10000 - swapFee) + 1) - amountIn);

            // transfer token amount
            _safeTransfer(token1, to, amountOut);

            // update reserves
            newReserveData.reserve0 = balanceIn;
            newReserveData.reserve1 = IERC20(token1).balanceOf(address(this));
            require(balanceIn >= amountIn + reserve0);

            emit Swap(msg.sender, amountIn, 0, 0, amountOut, to);
        } else if (tokenIn == token1) {
            // case token1 is inToken
            // calculate amount in
            amountIn = IWeightedFormula(formula).getAmountIn(amountOut, v1, v0, tokenWeight1, tokenWeight0, swapFee);

            // handle fee
            collectedFee1 = uint112(uint256(collectedFee1) + ((amountIn * 10000) / (10000 - swapFee) + 1) - amountIn);
            newReserveData.reserve1 = balanceIn;

            // transfer token amount
            _safeTransfer(token0, to, amountOut);

            // update reserves
            newReserveData.reserve1 = balanceIn;
            newReserveData.reserve0 = IERC20(token0).balanceOf(address(this));

            require(balanceIn >= amountIn + reserve1, "insufficient in");

            emit Swap(msg.sender, 0, amountIn, amountOut, 0, to);
        } else {
            revert("REQLP: T");
        }

        // update virtual reserves
        newReserveData.vReserve0 = v0 + newReserveData.reserve0 - r0;
        newReserveData.vReserve1 = v1 + newReserveData.reserve1 - r1;
        _update(newReserveData);
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
        require(_newAmp >= 5000); // allows de-amplification
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

// File: contracts/libraries/EnumerableSetLite.sol



// Based on the EnumerableSet library from OpenZeppelin Contracts, altered to remove the base private functions that
// work on bytes32, replacing them with a native implementation for address and bytes32 values, to reduce bytecode
// size and runtime costs.
// The `unchecked_at` function was also added, which allows for more gas efficient data reads in some scenarios.

pragma solidity ^0.8.16;

// solhint-disable func-name-mixedcase

/**
 * @dev Library for managing
 * https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive
 * types.
 *
 * Sets have the following properties:
 *
 * - Elements are added, removed, and checked for existence in constant time
 * (O(1)).
 * - Elements are enumerated in O(n). No guarantees are made on the ordering.
 *
 * ```
 * contract Example {
 *     // Add the library methods
 *     using EnumerableSet for EnumerableSet.AddressSet;
 *
 *     // Declare a set state variable
 *     EnumerableSet.AddressSet private mySet;
 * }
 * ```
 *
 * As of v3.3.0, sets of type `bytes32` (`Bytes32Set`), `address` (`AddressSet`)
 * and `uint256` (`UintSet`) are supported.
 */
library EnumerableSetLite {
    // The original OpenZeppelin implementation uses a generic Set type with bytes32 values: this was replaced with
    // AddressSet, which uses address keys natively, resulting in more dense bytecode.

    struct AddressSet {
        // Storage of set values
        address[] _values;
        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping(address => uint256) _indexes;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressSet storage set, address value) internal returns (bool) {
        if (!contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return set._indexes[value] != 0;
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function length(AddressSet storage set) internal view returns (uint256) {
        return set._values.length;
    }

    /**
     * @dev Returns the value stored at position `index` in the set. O(1).
     *
     * Note that there are no guarantees on the ordering of values inside the
     * array, and it may change when more values are added or removed.
     *
     * Requirements:
     *
     * - `index` must be strictly less than {length}.
     */
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        require(set._values.length > index, "OUT_OF_BOUNDS");
        return unchecked_at(set, index);
    }

    /**
     * @dev Same as {at}, except this doesn't revert if `index` it outside of the set (i.e. if it is equal or larger
     * than {length}). O(1).
     *
     * This function performs one less storage read than {at}, but should only be used when `index` is known to be
     * within bounds.
     */
    function unchecked_at(AddressSet storage set, uint256 index) internal view returns (address) {
        return set._values[index];
    }
}

// File: contracts/interfaces/poolPair/IWeightedPairFactory.sol



pragma solidity >=0.8.16;

interface IWeightedPairFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint32 tokenWeight0, uint256);

    function formula() external view returns (address);

    function protocolFee() external view returns (uint256);

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA
    ) external view returns (address pair);

    function isPair(address) external view returns (bool);

    function allPairsLength() external view returns (uint256);

    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair);

    function getParameters(address pair)
        external
        view
        returns (
            uint32 tokenWeight0,
            uint32 tokenWeight1,
            uint32 swapFee,
            uint32 amp
        );
}

// File: contracts/poolPair/WeightedPairFactory.sol



pragma solidity ^0.8.16;




// solhint-disable no-inline-assembly

contract RequiemPairFactory is IWeightedPairFactory {
    using EnumerableSetLite for EnumerableSetLite.AddressSet;

    // admin that can set the default protocol fee and default governance
    // the admin is a contract that assigns governance contracts to pairs
    // these governance contracts then can make crucial changes to the pair
    // e.g. change the formula, amplification and swap fee
    address public pairAdmin;

    // default formula for swap calculation
    address public formula;

    // default governance and protocol fee on creation of pairs
    address public pairGovernance;
    uint256 public protocolFee;

    mapping(bytes32 => address) private _pairSalts;
    uint256 private _pairCount;

    // check whether pair was created by this contract
    mapping(address => bool) private _pairs;

    // mapping that tracks existing pair configs for a token pair
    mapping(address => mapping(address => EnumerableSetLite.AddressSet)) private tokenPairs;

    constructor(
        address _admin,
        address _formula,
        address _pairGovernance
    ) {
        pairAdmin = _admin;
        formula = _formula;
        pairGovernance = _pairGovernance;
    }

    // ===== views =====
    function isPair(address b) external view returns (bool) {
        return _pairs[b];
    }

    function allPairsLength() external view returns (uint256) {
        return _pairCount;
    }

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA
    ) external view returns (address pair) {
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        pair = _pairSalts[salt];
    }

    /**
     * @notice Creates a new pair with specified parameters - only one pair for a fixed set of weights cabn exist
     * @param tokenA first token
     * @param tokenB second token
     * @param tokenWeightA first token weight
     * @param initialFee initial swapFee
     * @param initialAmp initial amplification parameter
     */
    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair) {
        require(tokenA != tokenB, "RLP: IA");
        require(tokenWeightA >= 2 && tokenWeightA <= 98 && (tokenWeightA % 2) == 0, "RLP: IW");

        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        require(token0 != address(0), "RLP: ZA");
        // single check is sufficient
        bytes memory bytecode = type(RequiemPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        require(_pairSalts[salt] == address(0), "RLP: PE");
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        // initialize pair configuration
        IWeightedPair(pair).initialize(token0, token1, tokenWeight0);
        IWeightedPair(pair).switchAdmin(pairAdmin);

        require(initialFee <= 500 && initialAmp >= 10000, "RLP: ISP");

        // assign governance contract to pair
        IWeightedPairAdmin(pairAdmin).inititalizePairAdministration(pair, formula, pairGovernance, protocolFee, initialFee, initialAmp);

        tokenPairs[token0][token1].add(pair);
        tokenPairs[token1][token0].add(pair);

        _pairSalts[salt] = address(pair);
        _pairCount += 1;
        _pairs[address(pair)] = true;
        emit PairCreated(token0, token1, pair, tokenWeight0, _pairCount);
    }

    function getParameters(address pair)
        public
        view
        returns (
            uint32 tokenWeight0,
            uint32 tokenWeight1,
            uint32 swapFee,
            uint32 amp
        )
    {
        (tokenWeight0, tokenWeight1, swapFee, amp) = IWeightedPair(pair).getParameters();
    }

    /**
     * @notice Function to get all deployed configs for a token pair
     * @param token0 first token
     * @param token1 second token
     * @return _tokenPairs array of deployed pairs
     */
    function getPairs(address token0, address token1) external view returns (address[] memory _tokenPairs) {
        uint256 length = tokenPairs[token0][token1].length();
        _tokenPairs = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _tokenPairs[i] = tokenPairs[token0][token1].at(i);
        }
    }

    function setGovernance(address _newGov) external {
        require(msg.sender == pairGovernance, "auth");
        pairGovernance = _newGov;
    }

    function setDefaultProtocolFee(uint256 _newProtocolFee) external {
        require(msg.sender == pairAdmin, "auth");
        protocolFee = _newProtocolFee;
    }
}