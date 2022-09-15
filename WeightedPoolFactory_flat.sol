
// File: contracts/libraries/Context.sol



pragma solidity ^0.8.17;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}
// File: contracts/libraries/Pausable.sol



pragma solidity ^0.8.17;


/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}
// File: contracts/libraries/Ownable.sol



pragma solidity ^0.8.17;


// solhint-disable reason-string

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: contracts/libraries/OwnerPausable.sol



pragma solidity 0.8.17;



// solhint-disable no-empty-blocks

abstract contract OwnerPausable is Ownable, Pausable {
    constructor() Ownable() Pausable() {}

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
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

// File: contracts/interfaces/poolBase/IAdministrable.sol



pragma solidity ^0.8.17;

// solhint-disable reason-string

interface IAdministrable {
    function adminInit(address _initialAdmin) external;

    function transferAdministration(address newAdmin) external;
}

// File: contracts/interfaces/poolBase/IPoolFactoryManagement.sol


pragma solidity >=0.8.12;

interface IPoolFactoryManagement {
    event SwapCreated(address[] pooledTokens, address indexed swap, uint256 length);
    event SetFeeTo(address indexed feeTo);
    event SetFeeToken(address indexed token);
    event SetFeeAmount(uint256 indexed amount);

    function allPools(uint256) external view returns (address pool);

    function isPool(address) external view returns (bool);

    function allPoolsLength() external view returns (uint256);
}

// File: contracts/poolBase/PoolFactoryManagement.sol



pragma solidity ^0.8.17;





// solhint-disable max-line-length, no-empty-blocks

abstract contract PoolFactoryManagement is IPoolFactoryManagement, OwnerPausable {
    // default pool admin address
    address public admin;

    // admin fee set at creation - can be set by the admin
    uint256 public adminFee;

    // a list of all pools created by this factory
    address[] public override allPools;

    // default governance address assigned to created pools
    address public poolAdmin;

    // votes register infusing ERC20Votes logic to registered tokens
    address public votesRegister;

    // true if pool is deployed through this factory
    mapping(address => bool) public isPool;

    // true if address can crate pool
    mapping(address => bool) public isCreator;

    // if true, anyone can create pool
    bool public anyoneCanCreate;

    // modifier for creations of pools
    modifier onlyCreator() {
        require(anyoneCanCreate || isCreator[msg.sender], "Only creators can interact");
        _;
    }

    constructor() OwnerPausable() {
        // deployer is also a creator
        isCreator[msg.sender] = true;
        anyoneCanCreate = false;
    }

    function _poolFactoryInit(address _admin, address _votesRegister) internal {
        poolAdmin = _admin;
        // votes register cannot be changed
        votesRegister = _votesRegister;
    }

    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    function setPoolAdmin(address _newPoolAdmin) external onlyOwner {
        poolAdmin = _newPoolAdmin;
    }

    function pushCreator(address _creator) external onlyOwner {
        isCreator[_creator] = true;
    }

    function pullCreator(address _creator) external onlyOwner {
        isCreator[_creator] = false;
    }

    function setAnyoneCanCreate() external onlyOwner {
        anyoneCanCreate = true;
    }

    function unsetAnyoneCanCreate() external onlyOwner {
        anyoneCanCreate = false;
    }

    function _postCreation(address _newPool) internal {
        // set values in configuration
        allPools.push(_newPool);
        isPool[_newPool] = true;

        // moves admin rights to the admin address set in this contract
        IAdministrable(_newPool).adminInit(poolAdmin);

        // registers token in voting register
        IVotesRegister(votesRegister).registerToken(_newPool);
    }

    function getPools() external view returns (address[] memory _pools) {
        uint256 length = allPools.length;
        _pools = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _pools[i] = allPools[i];
        }
    }

    function setStandardAdminFee(uint256 _newAdminFee) external onlyOwner {
        require(_newAdminFee <= 0.5e18, "Admin fee to high");
        adminFee = _newAdminFee;
    }
}

// File: contracts/interfaces/ERC20/IERC20.sol



pragma solidity ^0.8.17;

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
// File: contracts/libraries/SafeERC20.sol



// Based on the ReentrancyGuard library from OpenZeppelin Contracts, altered to reduce gas costs.
// The `safeTransfer` and `safeTransferFrom` functions assume that `token` is a contract (an account with code), and
// work differently from the OpenZeppelin version if it is not.

pragma solidity ^0.8.17;


// solhint-disable no-inline-assembly, avoid-low-level-calls

/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure (when the token
 * contract returns false). Tokens that return no value (and instead revert or
 * throw on failure) are also supported, non-reverting calls are assumed to be
 * successful.
 * To use this library you can add a `using SafeERC20 for IERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {
    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(address(token), abi.encodeWithSelector(token.transfer.selector, to, value));
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(address(token), abi.encodeWithSelector(token.transferFrom.selector, from, to, value));
    }

    function safeIncreaseAllowance(
        IERC20 token,
        address spender,
        uint256 value
    ) internal {
        uint256 newAllowance = token.allowance(address(this), spender) + value;
        _callOptionalReturn(address(token), abi.encodeWithSelector(token.approve.selector, spender, newAllowance));
    }

    /**
     * @dev Imitates a Solidity high-level call (i.e. a regular function call to a contract), relaxing the requirement
     * on the return value: the return value is optional (but if data is returned, it must not be false).
     *
     * WARNING: `token` is assumed to be a contract: calls to EOAs will *not* revert.
     */
    function _callOptionalReturn(address token, bytes memory data) private {
        // We need to perform a low level call here, to bypass Solidity's return data size checking mechanism, since
        // we're implementing it ourselves.
        (bool success, bytes memory returndata) = token.call(data);

        // If the low-level call didn't succeed we return whatever was returned from it.
        assembly {
            if eq(success, 0) {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }

        // Finally we check the returndata size is either zero or true - note that this check will always pass for EOAs
        require(returndata.length == 0 || abi.decode(returndata, (bool)), "SAFE_ERC20_CALL_FAILED");
    }
}

// File: contracts/interfaces/poolWeighted/IWeightedPoolCreator.sol


pragma solidity ^0.8.17;

interface IWeightedPoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _votingRegister,
        address _creator
    ) external returns (address);
}

// File: contracts/interfaces/poolWeighted/IWeightedPoolFactory.sol


pragma solidity >=0.8.12;

interface IWeightedPoolFactory {
    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory name,
        string memory symbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external returns (address pool);
}

// File: contracts/poolWeighted/WeightedPoolFactory.sol



pragma solidity ^0.8.17;





// solhint-disable max-line-length,

contract WeightedPoolFactory is IWeightedPoolFactory, PoolFactoryManagement {
    using SafeERC20 for IERC20;
    uint256 public poolCount;

    IWeightedPoolCreator public swapCreator;
    bool private _initialized = false;

    function initialize(
        IWeightedPoolCreator _swapCreator,
        address _admin,
        address _votesRegister
    ) public {
        require(_initialized == false, "WeightedPoolFactory: initialized");
        _poolFactoryInit(_admin, _votesRegister);
        swapCreator = _swapCreator;
        _initialized = true;
    }

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external override onlyCreator whenNotPaused returns (address swap) {
        swap = createPoolInternal(_pooledTokens, decimals, normalizedWeights, lpTokenName, lpTokenSymbol, _fee, _flashFee, _withdrawFee);
    }

    function createPoolInternal(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        uint256[] memory normalizedWeights,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) public returns (address swap) {
        swap = IWeightedPoolCreator(swapCreator).create(_pooledTokens, decimals, normalizedWeights, lpTokenName, lpTokenSymbol, _fee, _flashFee, adminFee, _withdrawFee, votesRegister, msg.sender);

        _postCreation(swap);
        emit SwapCreated(_pooledTokens, swap, allPools.length);
    }

    function setSwapCreator(IWeightedPoolCreator _swapCreator) external onlyOwner {
        swapCreator = _swapCreator;
    }
}
