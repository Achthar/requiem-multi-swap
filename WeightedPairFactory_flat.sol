
// File: contracts/libraries/EnumerableSetLite.sol



// Based on the EnumerableSet library from OpenZeppelin Contracts, altered to remove the base private functions that
// work on bytes32, replacing them with a native implementation for address and bytes32 values, to reduce bytecode
// size and runtime costs.
// The `unchecked_at` function was also added, which allows for more gas efficient data reads in some scenarios.

pragma solidity ^0.8.17;

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

// File: contracts/interfaces/governance/IVotesRegister.sol



pragma solidity ^0.8.17;

interface IVotesRegister {
    function onMint(address account, uint256 amount) external;

    function onBurn(address account, uint256 amount) external;

    function onAfterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) external;

    function registerToken(address token) external;
}

// File: contracts/interfaces/poolPair/IWeightedPairAdmin.sol



pragma solidity >=0.8.17;

interface IWeightedPairAdmin {
    function feeTo() external view returns (address);

    function protocolFee(address _pair) external view returns (uint256);

    function pushGovernance(address _governance, address _pair) external;

    function inititalizePairAdministration(
        address _pair,
        address _formula,
        uint32 _swapFee,
        uint32 _amp
    ) external;
}

// File: contracts/interfaces/poolPair/IWeightedPairERC20.sol



pragma solidity ^0.8.17;

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

// File: contracts/interfaces/poolPair/IWeightedPair.sol



pragma solidity ^0.8.17;


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
    event Swap(uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out);

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
        address,
        uint32
    ) external;
}

// File: contracts/interfaces/poolPair/IWeightedPairCreator.sol



pragma solidity >=0.8.17;

interface IWeightedPairCreator {
    function createPair() external returns (address pair);
}

// File: contracts/interfaces/poolPair/IWeightedPairFactory.sol



pragma solidity >=0.8.17;

interface IWeightedPairFactory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint32 tokenWeight0);

    function formula() external view returns (address);

    function isPair(address) external view returns (bool);

    function allPairsLength() external view returns (uint256);

    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair);
}

// File: contracts/poolPair/WeightedPairFactory.sol



pragma solidity ^0.8.15;







// solhint-disable no-inline-assembly

contract RequiemPairFactory is IWeightedPairFactory {
    using EnumerableSetLite for EnumerableSetLite.AddressSet;

    // admin that can set the default protocol fee and default governance
    // the admin is a contract that assigns governance contracts to pairs
    // these governance contracts then can make crucial changes to the pair
    // e.g. change the formula, amplification and swap fee
    address public pairAdmin;
    address public votingRegister;
    IWeightedPairCreator public pairCreator;

    // default formula for swap calculation
    address public formula;
    uint256 private _pairCount;

    // check whether pair was created by this contract
    mapping(address => bool) public isPair;

    // mapping that tracks existing pair configs for a token pair
    mapping(address => mapping(address => EnumerableSetLite.AddressSet)) private tokenPairs;
    mapping(bytes32 => address) private _pairSalts;

    constructor(
        IWeightedPairCreator _creator,
        address _register,
        address _admin,
        address _formula
    ) {
        pairAdmin = _admin;
        formula = _formula;
        pairCreator = _creator;
        votingRegister = _register;
    }

    // ===== views =====

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA
    ) external view returns (address pair) {
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        pair = _pairSalts[keccak256(abi.encodePacked(token0, token1, tokenWeight0))];
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

    function allPairsLength() external view returns (uint256) {
        return _pairCount;
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
        require(token0 != address(0) && token1 != address(0), "RLP: ZA");
        pair = pairCreator.createPair();

        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        require(!isPair[pair], "RLP: PE");
        // initialize pair configuration
        IWeightedPair(pair).initialize(votingRegister, token0, token1, tokenWeight0);
        IWeightedPair(pair).switchAdmin(pairAdmin);

        // handle administrative initiallization
        IWeightedPairAdmin(pairAdmin).inititalizePairAdministration(pair, formula, initialFee, initialAmp);
        tokenPairs[token0][token1].add(pair);
        tokenPairs[token1][token0].add(pair);
        _pairSalts[salt] = pair;
        _pairCount += 1;
        isPair[pair] = true;
        IVotesRegister(votingRegister).registerToken(pair);
        emit PairCreated(token0, token1, pair, tokenWeight0);
    }

    function changeCreator(IWeightedPairCreator _newCreator) external {
        require(msg.sender == pairAdmin, "caller has to be the admin");
        pairCreator = _newCreator;
    }
}
