
// File: contracts/libraries/Context.sol



pragma solidity ^0.8.16;

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



pragma solidity ^0.8.16;


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
// File: contracts/libraries/Administrable.sol



pragma solidity ^0.8.16;

// solhint-disable reason-string

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (a admin) that can be granted exclusive access to
 * specific functions - slightly amended from Zeppelin's Ownable
 *
 * By default, the admin account or contract will be the one that deploys the contract. This
 * can later be changed with {transferAdministration}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyAdmin`, which can be applied to your functions to restrict their use to
 * admin.
 */
abstract contract Administrable {
    address private _admin;
    bool private _initialized;

    event AdministrationTransferred(address indexed previousOwner, address indexed newAdmin);

    constructor() {
        _initialized = false;
    }

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    function adminInit(address _initialAdmin) public {
        require(!_initialized, "already init");
        _admin = _initialAdmin;
        emit AdministrationTransferred(address(0), _initialAdmin);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function admin() public view virtual returns (address) {
        return _admin;
    }

    /**
     * @dev Throws if called by any account other than the admin.
     */
    modifier onlyAdmin() {
        require(admin() == msg.sender, "Administrable: caller is not admin");
        _;
    }

    /**
     * @dev Transfers admin of the contract to a new account (`newAdmin`).
     * Can only be called by the current admin.
     */
    function transferAdministration(address newAdmin) public virtual onlyAdmin {
        require(newAdmin != address(0), "Administrable: new owner is the zero address");
        _transferAdministration(newAdmin);
    }

    /**
     * @dev Transfers Administration of the contract to a new account (`newAdmin`).
     * Internal function without access restriction.
     */
    function _transferAdministration(address newAdmin) internal virtual {
        address oldAdmin = _admin;
        _admin = newAdmin;
        emit AdministrationTransferred(oldAdmin, newAdmin);
    }
}

// File: contracts/poolBase/AdminPausable.sol



pragma solidity 0.8.16;



// solhint-disable no-empty-blocks

abstract contract AdminPausable is Administrable, Pausable {
    constructor() Administrable() Pausable() {}

    function pause() external onlyAdmin {
        _pause();
    }

    function unpause() external onlyAdmin {
        _unpause();
    }
}

// File: contracts/interfaces/poolBase/IPoolFeeManagement.sol



pragma solidity ^0.8.16;

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

interface IPoolFeeManagement {
    event NewSwapFee(uint256 swapFee);
    event NewFlashFee(uint256 flashFee);
    event NewAdminFee(uint256 adminFee);
    event NewWithdrawFee(uint256 withdrawDuration, uint256 defaultWithdrawFee);

    function setSwapFee(uint256 newSwapFee) external;

    function setFlashFee(uint256 newFlashFee) external;

    function setAdminFee(uint256 newAdminFee) external;

    function setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) external;

    function withdrawAdminFee(address _receiver) external;

    function transferAdministration(address newAdmin) external;
}

// File: contracts/poolBase/PoolFeeManagement.sol



pragma solidity ^0.8.16;



// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

abstract contract PoolFeeManagement is IPoolFeeManagement, AdminPausable {
    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 0.5e18; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 0.01e18; // 1%
    uint256 internal constant MAX_FLASH_FEE = 0.001e18; // 0.1%
    uint256 internal constant MAX_WITHDRAW_FEE = 0.005e18; // 0.5%

    constructor() AdminPausable() {}

    /**
     * @notice Sets the all applicable transaction fees
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     */
    function setSwapFee(uint256 newSwapFee) external virtual onlyAdmin {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "SwapFeeError");
        _setSwapFee(newSwapFee);
    }

    /**
     * @notice Sets the all applicable transaction fees
     * swap fee cannot be higher than 1% of each swap
     * @param newFlashFee new flash loan fee
     */
    function setFlashFee(uint256 newFlashFee) external virtual onlyAdmin {
        require(newFlashFee <= MAX_FLASH_FEE, "FlashFeeError");
        _setFlashFee(newFlashFee);
    }

    /**
     * @notice Sets the duration for which the withdraw fee is applicable
     * and the fee itself
     * @param newWithdrawDuration new flash loan fee
     * @param newDefaultWithdrawFee new default witdraw fee
     */
    function setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) external onlyAdmin {
        require(newWithdrawDuration <= (4 weeks), "WithdrawDurationError");
        require(newDefaultWithdrawFee <= MAX_WITHDRAW_FEE, "WithdrawFeeError");
        _setWithdrawFee(newWithdrawDuration, newDefaultWithdrawFee);
        emit NewWithdrawFee(newWithdrawDuration, newDefaultWithdrawFee);
    }

    function transferAdministration(address newAdmin) public override(Administrable, IPoolFeeManagement) onlyAdmin {
        super.transferAdministration(newAdmin);
    }

    /**
     * @notice Sets the admin fee - accessible only to the fee controller
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function setAdminFee(uint256 newAdminFee) external virtual onlyAdmin {
        require(newAdminFee <= MAX_ADMIN_FEE, "AdminFeeError");
        _setAdminFee(newAdminFee);
        emit NewAdminFee(newAdminFee);
    }

    // the internal functions have to be defined by the pools themselves

    function _setSwapFee(uint256 newSwapFee) internal virtual {}

    function _setFlashFee(uint256 newFlashFee) internal virtual {}

    function _setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) internal virtual {}

    function _setAdminFee(uint256 newAdminFee) internal virtual {}

    function withdrawAdminFee(address _receiver) external virtual override onlyAdmin {}
}

// File: contracts/interfaces/poolBase/IMultiPoolERC20.sol



pragma solidity ^0.8.16;

// solhint-disable func-name-mixedcase

interface IMultiPoolERC20 {
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

// File: contracts/poolBase/PoolERC20.sol



pragma solidity ^0.8.16;


// solhint-disable not-rely-on-time, no-inline-assembly, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

abstract contract PoolERC20 is IMultiPoolERC20 {
    uint8 public constant decimals = 18;
    uint256 public totalSupply;

    string public name;
    string public symbol;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    bytes32 public override DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant override PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    mapping(address => uint256) public nonces;

    constructor() {}

    function _poolTokenInit(string memory _name, string memory _symbol) internal {
        name = _name;
        symbol = _symbol;

        uint256 chainId;
        assembly {
            chainId := chainid()
        }

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"), keccak256(bytes(_name)), keccak256(bytes("1")), chainId, address(this))
        );
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        totalSupply += amount;
        balanceOf[account] += amount;
        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        balanceOf[account] -= amount;

        totalSupply -= amount;

        emit Transfer(account, address(0), amount);

        _afterTokenTransfer(account, address(0), amount);
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

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
        require(from != address(0), "ERC20: transfer from the zero address");
        _beforeTokenTransfer(from, to, value);
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
        require(deadline >= block.timestamp, "REQ: EXPIRED");
        bytes32 digest = keccak256(abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))));
        address recoveredAddress = ecrecover(digest, v, r, s);
        require(recoveredAddress != address(0) && recoveredAddress == owner, "REQ: IS");
        _approve(owner, spender, value);
    }
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

// File: contracts/interfaces/poolBase/IMultiPool.sol



pragma solidity 0.8.16;

// solhint-disable var-name-mixedcase

interface IMultiPool {
    /// EVENTS
    event AddLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 tokenSupply);

    event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256 tokenSupply);

    event RemoveLiquidityOne(address indexed provider, uint256 tokenIndex, uint256 tokenAmount, uint256 coinAmount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] tokenAmounts, uint256 tokenSupply);

    // pool data view functions

    function calculateAddLiquidityExactIn(uint256[] calldata amounts) external view returns (uint256);

    function calculateRemoveLiquidityExactOut(uint256[] calldata amounts, address account) external view returns (uint256);

    function calculateRemoveLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint256 tokenIndex,
        address account
    ) external view returns (uint256);

    function calculateRemoveLiquidityExactIn(uint256 amount, address account) external view returns (uint256[] memory);

    // Liquidity functions
    function addLiquidityExactIn(
        uint256[] calldata amounts,
        uint256 minToMint,
        address to,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external returns (uint256[] memory);

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxLpBurn,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 tokenIndex,
        uint256 minAmount,
        uint256 deadline
    ) external returns (uint256);

    function getTokenBalances() external view returns (uint256[] memory);

    function calculateCurrentWithdrawFee(address account) external view returns (uint256);
}

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
// File: contracts/interfaces/poolStable/IStablePoolCreator.sol


pragma solidity ^0.8.16;


interface IStablePoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _creator
    ) external returns (address);
}

// File: contracts/interfaces/poolBase/IFlashSwapRecipient.sol



pragma solidity >=0.8.16;


interface IFlashSwapRecipient {
    function recieveSwapAmount(
        address sender,
        IERC20 tokenIn,
        IERC20 tokenOut,
        uint256 requiredInAmount,
        uint256 amountOut,
        bytes calldata data
    ) external;
}

// File: contracts/libraries/SafeERC20.sol



// Based on the ReentrancyGuard library from OpenZeppelin Contracts, altered to reduce gas costs.
// The `safeTransfer` and `safeTransferFrom` functions assume that `token` is a contract (an account with code), and
// work differently from the OpenZeppelin version if it is not.

pragma solidity ^0.8.16;


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

// File: contracts/interfaces/flashLoan/IFlashLoanRecipient.sol


// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.8.16;

// Inspired by Aave Protocol's IFlashLoanReceiver.


interface IFlashLoanRecipient {
    /**
     * @dev When `flashLoan` is called on the Vault, it invokes the `receiveFlashLoan` hook on the recipient.
     *
     * At the time of the call, the Vault will have transferred `amounts` for `tokens` to the recipient. Before this
     * call returns, the recipient must have transferred `amounts` plus `feeAmounts` for each token back to the
     * Vault, or else the entire flash loan will revert.
     *
     * `userData` is the same value passed in the `IVault.flashLoan` call.
     */
    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external;
}

// File: contracts/poolStable/StablePoolLib.sol


pragma solidity ^0.8.16;





// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

/**
 * StableSwap main algorithm
 */
library StablePoolLib {
    using SafeERC20 for IERC20;

    event TokenExchange(address indexed origin, uint256 soldId, uint256 tokensSold, uint256 boughtId, uint256 tokensBought, address indexed target);

    event AddLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 token_supply);

    event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 token_supply);

    event RemoveLiquidityOne(address indexed provider, uint256 index, uint256 token_amount, uint256 coin_amount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 token_supply);

    event CollectProtocolFee(address token, uint256 amount);

    event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);

    event StopRampA(uint256 A, uint256 timestamp);

    /**
     * @dev Emitted for each individual flash loan performed by `flashLoan`.
     */
    event FlashLoan(IFlashLoanRecipient indexed recipient, uint256[] amounts, uint256[] feeAmounts);

    uint256 public constant FEE_DENOMINATOR = 1e18;

    /// @dev protect from division loss when run approximation loop. We cannot divide at the end because of overflow,
    /// so we add some (small) PRECISION when divide in each iteration
    uint256 public constant A_PRECISION = 1e3;
    uint256 internal constant MIN_RAMP_TIME = 1 days;
    uint256 internal constant MAX_A = 1e7;
    uint256 internal constant MAX_A_CHANGE = 100;
    /// @dev max iteration of converge calccuate
    uint256 internal constant MAX_ITERATION = 256;
    uint256 public constant POOL_TOKEN_COMMON_DECIMALS = 18;

    struct SwapStorage {
        /// @dev tokens in pool
        IERC20[] pooledTokens;
        /// @dev token i multiplier to reach POOL_TOKEN_COMMON_DECIMALS
        uint256[] tokenMultipliers;
        uint256 nTokens;
        /// @dev effective balance which might different from token balance of the contract 'cause it hold admin fee as well
        uint256[] balances;
        /// @dev swap fee ratio. Charge on any action which move balance state far from the ideal state
        uint256 fee;
        /// @dev flash loan fee. Charged on full loan amount, should be acccordingly low
        uint256 flashFee;
        /// @dev admin fee in ratio of swap fee.
        uint256 adminFee;
        uint256 adminSwapFee;
        /// @dev observation of A, multiplied with A_PRECISION
        uint256 initialA;
        uint256 futureA;
        uint256 initialATime;
        uint256 futureATime;
        /// @dev withdrawal fee control
        uint256 defaultWithdrawFee;
        uint256 withdrawDuration;
        mapping(address => uint256) depositTimestamp;
        mapping(address => uint256) withdrawFeeMultiplier;
        /// @dev array that collects admin fees
        uint256[] collectedFees;
    }

    /**
     * @notice Deposit coins into the pool
     * @param amounts List of amounts of coins to deposit
     * @param minMintAmount Minimum amount of LP tokens to mint from the deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidityExactIn(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 minMintAmount,
        uint256 tokenSupply
    ) external returns (uint256 mintAmount) {
        uint256 nCoins = self.nTokens;
        require(amounts.length == nCoins, "arrayError");
        uint256[] memory fees = new uint256[](nCoins);
        uint256 _fee = _feePerToken(self);

        uint256 amp = _getAPrecise(self);

        uint256 D0 = _getD(_xp(self.balances, self.tokenMultipliers), amp);

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            // get real transfer in amount
            newBalances[i] += _doTransferIn(self.pooledTokens[i], amounts[i]);
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        assert(D1 > D0); // double check

        uint256 diff; // = 0;
        for (uint256 i = 0; i < nCoins; i++) {
            diff = _distance((D1 * self.balances[i]) / D0, newBalances[i]);
            fees[i] = (_fee * diff) / FEE_DENOMINATOR;
            self.balances[i] = newBalances[i];
            // deduct swap fee
            newBalances[i] -= fees[i];
            // collect admin fee
            self.collectedFees[i] += (fees[i] * self.adminFee) / FEE_DENOMINATOR;
        }
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        mintAmount = (tokenSupply * (D1 - D0)) / D0;

        require(mintAmount >= minMintAmount, "slippageError");

        emit AddLiquidity(msg.sender, amounts, fees, D1, mintAmount);
    }

    /**
     * @notice Deposit coins into the pool for the first time
     * @param amounts List of amounts of coins to deposit
     * @return mintAmount Amount of LP tokens received by depositing
     */
    function addLiquidityInit(SwapStorage storage self, uint256[] memory amounts) external returns (uint256 mintAmount) {
        uint256 nCoins = self.nTokens;
        require(amounts.length == nCoins, "arrayError");

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            require(amounts[i] > 0, "tokenError");

            // get real transfer in amount
            newBalances[i] += _doTransferIn(self.pooledTokens[i], amounts[i]);
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), _getAPrecise(self));
        assert(D1 > 0); // double check

        self.balances = newBalances;
        mintAmount = D1;

        emit AddLiquidity(msg.sender, amounts, new uint256[](nCoins), D1, mintAmount);
    }

    /**
     *  the same function as swap, but it expects that amounts already have been
     *  sent to the contract
     *   - designed to be used in the Requiem Swap framework
     *   - deducts the fee from the output, in this case simple as the output is the calculated value
     *   - viable function for batch swapping
     * @param i token index in
     * @param j token index out
     */
    function onSwapGivenIn(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        address to
    ) external returns (uint256 dy) {
        uint256 balanceIn = self.pooledTokens[i].balanceOf(address(this));
        uint256 inAmount = balanceIn - self.balances[i];

        dy = _calcOutGivenIn(self, i, j, inAmount);

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= dy;
        self.collectedFees[j] += (dy * self.adminSwapFee) / FEE_DENOMINATOR;

        self.pooledTokens[j].safeTransfer(to, dy);

        emit TokenExchange(msg.sender, i, inAmount, j, dy, to);
    }

    /**
     *  the same function as swap, but it expects that amounts already have been
     *  sent to the contract
     *   - designed to be used in the Requiem Swap framework
     *   - deducts the fee from the output, in this case simple as the output is the calculated value
     *   - viable function for batch swapping
     * @param i token index in
     * @param j token index out
     */
    function flashSwapExactIn(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 inAmount,
        address to,
        IFlashSwapRecipient flashContract,
        bytes calldata data
    ) external returns (uint256 outAmount) {
        // calculate out amount from assumed in amount
        outAmount = _calcOutGivenIn(self, i, j, inAmount);
        // we fetch the tokens and provide it as input for the flash call
        IERC20 tokenIn = self.pooledTokens[i];
        IERC20 tokenOut = self.pooledTokens[j];
        // address receiverAddress = address(to);

        // optimistic transfer
        tokenOut.safeTransfer(to, outAmount);

        // flash call of recipient
        flashContract.recieveSwapAmount(msg.sender, tokenIn, tokenOut, inAmount, outAmount, data);

        // get actual new in balance
        uint256 balanceIn = tokenIn.balanceOf(address(this));

        // check the whether sufficient amounts have been sent in
        require(inAmount <= balanceIn - self.balances[i], "insufficient in");

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= outAmount;

        // collect admin fee
        self.collectedFees[j] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        emit TokenExchange(msg.sender, i, inAmount, j, outAmount, to);
    }

    /**
     * @notice Full swap given out - assumes that correct amount in to be sent in already.
     * @param i token index in
     * @param j token index out
     */
    function onSwapGivenOut(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 outAmount,
        address to
    ) external {
        // add fee to in Amount
        uint256 inAmount = _calcInGivenOut(self, i, j, outAmount);

        // get received amount
        uint256 balanceIn = self.pooledTokens[i].balanceOf(address(this));

        // check the whether sufficient amounts have been sent in
        require(inAmount <= balanceIn - self.balances[i], "insufficient in");

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= outAmount;

        // collect admin fee
        self.collectedFees[j] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        // finally transfer the tokens
        self.pooledTokens[j].safeTransfer(to, outAmount);

        emit TokenExchange(msg.sender, i, inAmount, j, outAmount, to);
    }

    /**
     * @notice FlashSwap - sends target outAmount to token with outIndex. Validates that required inAmount has
     * been sent durng or before the receiveSwapAmount function
     * @param i token index in
     * @param j token index out
     * @param outAmount amount of token with outIndex to be sent
     * @param to flash swap recipient
     */
    function flashSwapExactOut(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 outAmount,
        address to,
        IFlashSwapRecipient flashContract,
        bytes calldata data
    ) external returns (uint256 inAmount) {
        // add fee to in Amount - this amount has to be sent to the pool
        inAmount = _calcInGivenOut(self, i, j, outAmount);
        // we fetch the tokens and provide it as input for the flash call
        IERC20 tokenIn = self.pooledTokens[i];
        IERC20 tokenOut = self.pooledTokens[j];
        // address receiverAddress = address(to);

        // optimistic transfer
        tokenOut.safeTransfer(to, outAmount);

        // flash call of recipient
        flashContract.recieveSwapAmount(msg.sender, tokenIn, tokenOut, inAmount, outAmount, data);

        // get actual new in balance
        uint256 balanceIn = tokenIn.balanceOf(address(this));

        // check the whether sufficient amounts have been sent in
        require(inAmount <= balanceIn - self.balances[i], "insufficient in");

        // update balances
        self.balances[i] = balanceIn;
        self.balances[j] -= outAmount;

        // collect admin fee
        self.collectedFees[j] += (outAmount * self.adminSwapFee) / FEE_DENOMINATOR;

        emit TokenExchange(msg.sender, i, inAmount, j, outAmount, to);
    }

    /**  @notice Flash Loan using the stable swap balances*/
    function flashLoan(
        SwapStorage storage self,
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external {
        uint256 _count = amounts.length;
        // array cannot be too long
        require(_count <= self.nTokens, "invalid length");
        uint256[] memory feeAmounts = new uint256[](_count);
        uint256[] memory preLoanBalances = new uint256[](_count);

        for (uint256 i = 0; i < _count; ++i) {
            uint256 amount = amounts[i];
            if (amount != 0) {
                // ignore zero amounts
                IERC20 token = self.pooledTokens[i];

                preLoanBalances[i] = token.balanceOf(address(this));
                feeAmounts[i] = (amount * self.flashFee) / FEE_DENOMINATOR;

                require(preLoanBalances[i] >= amount, "pre balances");
                token.safeTransfer(address(recipient), amount);
            }
        }

        recipient.receiveFlashLoan(self.pooledTokens, amounts, feeAmounts, userData);

        for (uint256 i = 0; i < _count; ++i) {
            if (amounts[i] != 0) {
                // ignore zero amounts
                uint256 preLoanBalance = preLoanBalances[i];
                uint256 feeAmount = feeAmounts[i];
                // Checking for loan repayment first (without accounting for fees) makes for simpler debugging, and results
                // in more accurate revert reasons if the flash loan protocol fee percentage is zero.
                uint256 postLoanBalance = self.pooledTokens[i].balanceOf(address(this));
                require(postLoanBalance >= preLoanBalance, "post balances");
                self.balances[i] = postLoanBalance;
                self.collectedFees[i] += (feeAmount * self.adminFee) / FEE_DENOMINATOR;
                // No need for checked arithmetic since we know the loan was fully repaid.
                uint256 receivedFeeAmount = postLoanBalance - preLoanBalance;
                require(receivedFeeAmount >= feeAmount, "insufficient loan fee");
            }
        }

        emit FlashLoan(recipient, amounts, feeAmounts);
    }

    function removeLiquidityExactIn(
        SwapStorage storage self,
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 totalSupply
    ) external returns (uint256[] memory amounts) {
        require(lpAmount <= totalSupply);
        uint256 nCoins = self.nTokens;

        uint256[] memory fees = new uint256[](nCoins);
        amounts = _calculateRemoveLiquidity(self, msg.sender, lpAmount, totalSupply);

        for (uint256 i = 0; i < nCoins; i++) {
            require(amounts[i] >= minAmounts[i], "slippageError");
            self.balances[i] -= amounts[i];
            self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
        }

        emit RemoveLiquidity(msg.sender, amounts, fees, totalSupply - lpAmount);
    }

    function removeLiquidityOneToken(
        SwapStorage storage self,
        uint256 lpAmount,
        uint256 index,
        uint256 minAmount,
        uint256 totalSupply
    ) external returns (uint256 dy) {
        uint256 numTokens = self.nTokens;
        require(index < numTokens, "tokenError");

        uint256 dyFee;

        (dy, dyFee) = _calculateRemoveLiquidityOneToken(self, msg.sender, lpAmount, index, totalSupply);

        require(dy >= minAmount, "slippageError");

        self.balances[index] -= dy;
        self.collectedFees[index] += (dyFee * self.adminFee) / FEE_DENOMINATOR;
        self.pooledTokens[index].safeTransfer(msg.sender, dy);

        emit RemoveLiquidityOne(msg.sender, index, lpAmount, dy);
    }

    function removeLiquidityImbalance(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 totalSupply
    ) external returns (uint256 burnAmount) {
        require(amounts.length == self.nTokens, "arrayError");
        uint256 _fee = _feePerToken(self);
        uint256 amp = _getAPrecise(self);

        uint256[] memory newBalances = self.balances;
        uint256 D0 = _getD(_xp(self), amp);

        for (uint256 i = 0; i < self.nTokens; i++) {
            newBalances[i] -= amounts[i];
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        uint256[] memory fees = new uint256[](self.nTokens);

        for (uint256 i = 0; i < self.nTokens; i++) {
            uint256 idealBalance = (D1 * self.balances[i]) / D0;
            fees[i] = (_fee * _distance(newBalances[i], idealBalance)) / FEE_DENOMINATOR;
            self.balances[i] = newBalances[i];
            self.collectedFees[i] += (fees[i] * self.adminFee) / FEE_DENOMINATOR;
            newBalances[i] -= fees[i]; // reduce fee from balance for burn amount calculation
            if (amounts[i] != 0) {
                self.pooledTokens[i].safeTransfer(msg.sender, amounts[i]);
            }
        }

        // recalculate invariant with fee charged balances
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        burnAmount = ((D0 - D1) * totalSupply) / D0;
        assert(burnAmount > 0);
        // In case of rounding errors - make it unfavorable for the "attacker"
        burnAmount = ((burnAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, msg.sender));
        require(burnAmount <= maxBurnAmount, "slippageError");

        emit RemoveLiquidityImbalance(msg.sender, amounts, fees, D1, totalSupply - burnAmount);
    }

    function withdrawCollectedFees(SwapStorage storage self, address receiver) external {
        for (uint256 i = 0; i < self.pooledTokens.length; i++) {
            IERC20 token = self.pooledTokens[i];
            uint256 fee = self.collectedFees[i];
            if (fee != 0) {
                token.safeTransfer(receiver, fee);
                self.collectedFees[i] = 0;
                self.balances[i] = token.balanceOf(address(this));
                emit CollectProtocolFee(address(token), fee);
            }
        }
    }

    /// VIEW FUNCTIONS
    function getAPrecise(SwapStorage storage self) internal view returns (uint256) {
        return _getAPrecise(self);
    }

    function getAdminBalance(SwapStorage storage self, uint256 index) external view returns (uint256) {
        require(index < self.pooledTokens.length, "arrayError");
        return self.pooledTokens[index].balanceOf(address(this)) - (self.balances[index]);
    }

    /**
     * Estimate amount of LP token minted at deposit
     * with taking fees into account
     */
    function calculateAddLiquidityExactIn(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply
    ) external view returns (uint256 mintAmount) {
        uint256 nCoins = self.pooledTokens.length;
        require(amounts.length == nCoins, "arrayError");
        uint256 _fee = _feePerToken(self);

        uint256 amp = _getAPrecise(self);

        uint256 D0 = _getD(_xp(self.balances, self.tokenMultipliers), amp);

        uint256[] memory newBalances = self.balances;

        for (uint256 i = 0; i < nCoins; i++) {
            newBalances[i] += amounts[i];
        }
        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);

        for (uint256 i = 0; i < nCoins; i++) {
            uint256 diff = _distance((D1 * self.balances[i]) / D0, newBalances[i]);
            newBalances[i] -= (_fee * diff) / FEE_DENOMINATOR;
        }
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        mintAmount = (totalSupply * (D1 - D0)) / D0;
    }

    /**
     * Estimate amount of LP token burnt on withdrawal
     * with taking fees into account
     */
    function calculateRemoveLiquidityExactOut(
        SwapStorage storage self,
        uint256[] memory amounts,
        uint256 totalSupply,
        address account
    ) external view returns (uint256 burnAmount) {
        uint256 length = self.balances.length;
        require(amounts.length == length, "arrayError");
        uint256 _fee = _feePerToken(self);
        uint256 amp = _getAPrecise(self);

        uint256[] memory newBalances = self.balances;
        uint256 D0 = _getD(_xp(self), amp);

        for (uint256 i = 0; i < length; i++) {
            newBalances[i] -= amounts[i];
        }

        uint256 D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);

        for (uint256 i = 0; i < length; i++) {
            uint256 idealBalance = (D1 * self.balances[i]) / D0;
            newBalances[i] -= (_fee * _distance(newBalances[i], idealBalance)) / FEE_DENOMINATOR;
        }

        // recalculate invariant with fee charged balances
        D1 = _getD(_xp(newBalances, self.tokenMultipliers), amp);
        burnAmount = ((D0 - D1) * totalSupply) / D0;
        burnAmount = ((burnAmount + 1) * FEE_DENOMINATOR) / (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account));
    }

    function getA(SwapStorage storage self) external view returns (uint256) {
        return _getAPrecise(self) / A_PRECISION;
    }

    /**  @notice pre-implements calculation for Requiem interface for exat in swap */
    function calculateSwapGivenIn(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inAmount
    ) external view returns (uint256) {
        return _calcOutGivenIn(self, inIndex, outIndex, inAmount);
    }

    /**
     * @notice pre-implements calculation for Requiem interface for exat out swap
     * that due to the fact that the structure is not symmetric (unlike 50/50 pairs)
     * we require a separate function to calculate the input for a given output
     */
    function calculateSwapGivenOut(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 outAmount
    ) external view returns (uint256) {
        return _calcInGivenOut(self, inIndex, outIndex, outAmount);
    }

    function calculateRemoveLiquidityExactIn(
        SwapStorage storage self,
        address account,
        uint256 amount,
        uint256 totalSupply
    ) external view returns (uint256[] memory) {
        return _calculateRemoveLiquidity(self, account, amount, totalSupply);
    }

    function calculateRemoveLiquidityOneToken(
        SwapStorage storage self,
        address account,
        uint256 lpAmount,
        uint256 tokenIndex,
        uint256 totalSupply
    ) external view returns (uint256 amount) {
        (amount, ) = _calculateRemoveLiquidityOneToken(self, account, lpAmount, tokenIndex, totalSupply);
    }

    /**
     * @notice Update the withdraw fee for `user`. If the user is currently
     * not providing liquidity in the pool, sets to default value. If not, recalculate
     * the starting withdraw fee based on the last deposit's time & amount relative
     * to the new deposit.
     *
     * @param self Swap struct to read from and write to
     * @param user address of the user depositing tokens
     * @param toMint amount of pool tokens to be minted
     */
    function updateUserWithdrawFee(
        SwapStorage storage self,
        address user,
        uint256 userBalance,
        uint256 toMint
    ) external {
        _updateUserWithdrawFee(self, user, userBalance, toMint);
    }

    /**
     * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
     * Checks if the change is too rapid, and commits the new A value only when it falls under
     * the limit range.
     * @param futureA the new A to ramp towards
     * @param futureATime timestamp when the new A should be reached
     */
    function rampA(
        SwapStorage storage self,
        uint256 futureA,
        uint256 futureATime
    ) external {
        require(block.timestamp >= self.initialATime + (1 days), "Ramp period"); // please wait 1 days before start a new ramping
        require(futureATime >= block.timestamp + (MIN_RAMP_TIME), "Ramp too early");
        require(0 < futureA && futureA < MAX_A, "AError");

        uint256 initialAPrecise = _getAPrecise(self);
        uint256 futureAPrecise = futureA * StablePoolLib.A_PRECISION;

        if (futureAPrecise < initialAPrecise) {
            require(futureAPrecise * (StablePoolLib.MAX_A_CHANGE) >= initialAPrecise, "TooHigh");
        } else {
            require(futureAPrecise <= initialAPrecise * (StablePoolLib.MAX_A_CHANGE), "TooLow");
        }

        self.initialA = initialAPrecise;
        self.futureA = futureAPrecise;
        self.initialATime = block.timestamp;
        self.futureATime = futureATime;

        emit RampA(initialAPrecise, futureAPrecise, block.timestamp, futureATime);
    }

    function stopRampA(SwapStorage storage self) external {
        require(self.futureATime > block.timestamp, "alreadyStopped");
        uint256 currentA = _getAPrecise(self);

        self.initialA = currentA;
        self.futureA = currentA;
        self.initialATime = block.timestamp;
        self.futureATime = block.timestamp;

        emit StopRampA(currentA, block.timestamp);
    }

    /// PRIVATE FUNCTIONS

    function _calcOutGivenIn(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 inAmount
    ) private view returns (uint256 dy) {
        uint256[] memory normalizedBalances = _xp(self);
        return
            (((normalizedBalances[j] - _getY(self, i, j, normalizedBalances[i] + (inAmount * self.tokenMultipliers[i]), normalizedBalances)) * (FEE_DENOMINATOR - self.fee)) / FEE_DENOMINATOR) /
            self.tokenMultipliers[j];
    }

    function _calcInGivenOut(
        SwapStorage storage self,
        uint256 i,
        uint256 j,
        uint256 outAmount
    ) private view returns (uint256 inAmount) {
        uint256[] memory normalizedBalances = _xp(self);
        // first, we calculate the new normalized out balance, plug it into getY to get the new normalized inBalance
        // then we subtract the previous inBalance
        // and third, we adjust the result for the multiplier and fee
        return
            ((_getY(self, j, i, normalizedBalances[j] - (outAmount * self.tokenMultipliers[j]), normalizedBalances) - normalizedBalances[i]) * FEE_DENOMINATOR) /
            (FEE_DENOMINATOR - self.fee) /
            self.tokenMultipliers[i] +
            1;
    }

    /**
     * Ramping A up or down, return A with precision of A_PRECISION
     */
    function _getAPrecise(SwapStorage storage self) private view returns (uint256) {
        if (block.timestamp >= self.futureATime) {
            return self.futureA;
        }

        if (self.futureA > self.initialA) {
            return self.initialA + ((self.futureA - self.initialA) * (block.timestamp - self.initialATime)) / (self.futureATime - self.initialATime);
        }

        return self.initialA - ((self.initialA - self.futureA) * (block.timestamp - self.initialATime)) / (self.futureATime - self.initialATime);
    }

    /**
     * normalized balances of each tokens.
     */
    function _xp(uint256[] memory balances, uint256[] memory rates) private pure returns (uint256[] memory) {
        for (uint256 i = 0; i < balances.length; i++) {
            rates[i] = (rates[i] * balances[i]);
        }

        return rates;
    }

    function _xp(SwapStorage storage self) private view returns (uint256[] memory) {
        return _xp(self.balances, self.tokenMultipliers);
    }

    /**
     * Calculate D for *NORMALIZED* balances of each tokens
     * @param xp normalized balances of token
     */
    function _getD(uint256[] memory xp, uint256 amp) private pure returns (uint256) {
        uint256 nCoins = xp.length;
        uint256 sum = _sumOf(xp);
        if (sum == 0) {
            return 0;
        }

        uint256 Dprev; // = 0
        uint256 D = sum;
        uint256 Ann = amp * nCoins;

        for (uint256 i = 0; i < MAX_ITERATION; i++) {
            uint256 D_P = D;
            for (uint256 j = 0; j < xp.length; j++) {
                D_P = (D_P * D) / (xp[j] * nCoins);
            }
            Dprev = D;
            D = (((Ann * sum) / A_PRECISION + D_P * nCoins) * D) / (((Ann - A_PRECISION) * D) / A_PRECISION + (nCoins + 1) * D_P);
            if (_distance(D, Dprev) <= 1) {
                return D;
            }
        }

        // Convergence should occur in 4 loops or less. If this is reached, there may be something wrong
        // with the pool. If this were to occur repeatedly, LPs should withdraw via `removeLiquidity()`
        // function which does not rely on D.
        revert("calcError");
    }

    /**
     * calculate new balance of when swap
     * Done by solving quadratic equation iteratively.
     *  x_1**2 + x_1 * (sum' - (A*n**n - 1) * D / (A * n**n)) = D ** (n + 1) / (n ** (2 * n) * prod' * A)
     *  x_1**2 + b*x_1 = c
     *  x_1 = (x_1**2 + c) / (2*x_1 + b)
     * @param inIndex index of token to swap in
     * @param outIndex index of token to swap out
     * @param inBalance new balance (normalized) of input token if the swap is successful
     * @return NORMALIZED balance of output token if the swap is successful
     */
    function _getY(
        SwapStorage storage self,
        uint256 inIndex,
        uint256 outIndex,
        uint256 inBalance,
        uint256[] memory normalizedBalances
    ) private view returns (uint256) {
        require(inIndex != outIndex, "tokenError");
        uint256 nCoins = self.nTokens;
        require(inIndex < nCoins && outIndex < nCoins, "arrayError");

        uint256 amp = _getAPrecise(self);
        uint256 Ann = amp * nCoins;
        uint256 D = _getD(normalizedBalances, amp); // calculate invariant

        uint256 sum; // = 0 sum of new balances except output token
        uint256 c = D;
        for (uint256 i = 0; i < nCoins; i++) {
            if (i == outIndex) {
                continue;
            }

            uint256 x = i == inIndex ? inBalance : normalizedBalances[i];
            sum += x;
            c = (c * D) / (x * nCoins);
        }

        c = (c * D * A_PRECISION) / (Ann * nCoins);
        uint256 b = sum + (D * A_PRECISION) / Ann;

        uint256 lastY; // = 0;
        uint256 y = D;

        for (uint256 index = 0; index < MAX_ITERATION; index++) {
            lastY = y;
            y = (y * y + c) / (2 * y + b - D);
            if (_distance(lastY, y) <= 1) {
                return y;
            }
        }

        revert("calcError");
    }

    function _calculateRemoveLiquidity(
        SwapStorage storage self,
        address account,
        uint256 amount,
        uint256 totalSupply
    ) private view returns (uint256[] memory) {
        require(amount <= totalSupply, "supplyError");
        uint256 length = self.nTokens;
        uint256 feeAdjustedAmount = (amount * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;

        uint256[] memory amounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            amounts[i] = (self.balances[i] * feeAdjustedAmount) / totalSupply;
        }
        return amounts;
    }

    function _calculateRemoveLiquidityOneToken(
        SwapStorage storage self,
        address account,
        uint256 tokenAmount,
        uint256 index,
        uint256 totalSupply
    ) private view returns (uint256 dy, uint256 fee) {
        require(index < self.nTokens, "arrayError");
        uint256 amp = _getAPrecise(self);
        uint256[] memory xp = _xp(self);
        uint256 D0 = _getD(xp, amp);
        uint256 D1 = D0 - (tokenAmount * D0) / totalSupply;
        uint256 newY = _getYD(self, amp, index, xp, D1);
        uint256[] memory reducedXP = xp;
        uint256 _fee = _feePerToken(self);

        for (uint256 i = 0; i < self.nTokens; i++) {
            uint256 expectedDx;
            if (i == index) {
                expectedDx = (xp[i] * D1) / D0 - newY;
            } else {
                expectedDx = xp[i] - (xp[i] * D1) / D0;
            }
            reducedXP[i] -= (_fee * expectedDx) / FEE_DENOMINATOR;
        }

        dy = reducedXP[index] - _getYD(self, amp, index, reducedXP, D1);
        dy = (dy - 1) / self.tokenMultipliers[index];
        fee = ((xp[index] - newY) / self.tokenMultipliers[index]) - dy;
        dy = (dy * (FEE_DENOMINATOR - _calculateCurrentWithdrawFee(self, account))) / FEE_DENOMINATOR;
    }

    function _feePerToken(SwapStorage storage self) internal view returns (uint256) {
        uint256 nCoins = self.nTokens;
        return (self.fee * nCoins) / (4 * (nCoins - 1));
    }

    function _getYD(
        SwapStorage storage self,
        uint256 A,
        uint256 index,
        uint256[] memory xp,
        uint256 D
    ) private view returns (uint256) {
        uint256 nCoins = self.nTokens;
        assert(index < nCoins);
        uint256 Ann = A * nCoins;
        uint256 c = D;
        uint256 s; // = 0;
        uint256 _x; // = 0;
        uint256 yPrev; // = 0;

        for (uint256 i = 0; i < nCoins; i++) {
            if (i == index) {
                continue;
            }
            _x = xp[i];
            s += _x;
            c = (c * D) / (_x * nCoins);
        }

        c = (c * D * A_PRECISION) / (Ann * nCoins);
        uint256 b = s + (D * A_PRECISION) / Ann;
        uint256 y = D;

        for (uint256 i = 0; i < MAX_ITERATION; i++) {
            yPrev = y;
            y = (y * y + c) / (2 * y + b - D);
            if (_distance(yPrev, y) <= 1) {
                return y;
            }
        }
        revert("calcError");
    }

    function _updateUserWithdrawFee(
        SwapStorage storage self,
        address user,
        uint256 userBalance,
        uint256 toMint
    ) internal {
        // If token is transferred to address 0 (or burned), don't update the fee.
        if (user == address(0)) {
            return;
        }
        if (self.defaultWithdrawFee == 0) {
            // If current fee is set to 0%, set multiplier to FEE_DENOMINATOR
            self.withdrawFeeMultiplier[user] = FEE_DENOMINATOR;
        } else {
            // Otherwise, calculate appropriate discount based on last deposit amount
            uint256 currentFee = _calculateCurrentWithdrawFee(self, user);
            uint256 currentBalance = userBalance;

            // ((currentBalance * currentFee) + (toMint * defaultWithdrawFee)) * FEE_DENOMINATOR /
            // ((toMint + currentBalance) * defaultWithdrawFee)
            if ((toMint + currentBalance) * self.defaultWithdrawFee != 0) {
                self.withdrawFeeMultiplier[user] = (((currentBalance * currentFee) + (toMint * self.defaultWithdrawFee)) * (FEE_DENOMINATOR)) / ((toMint + currentBalance) * self.defaultWithdrawFee);
            }
        }
        self.depositTimestamp[user] = block.timestamp;
    }

    /**
     * @notice Calculate the fee that is applied when the given user withdraws.
     * Withdraw fee decays linearly over the witdhrawDuraion parameter.
     * @param user address you want to calculate withdraw fee of
     * @return current withdraw fee of the user
     */
    function _calculateCurrentWithdrawFee(SwapStorage storage self, address user) internal view returns (uint256) {
        uint256 endTime = self.depositTimestamp[user] + self.withdrawDuration;
        if (endTime > block.timestamp) {
            uint256 timeLeftover = endTime - block.timestamp;
            return (self.defaultWithdrawFee * self.withdrawFeeMultiplier[user] * timeLeftover) / self.withdrawDuration / FEE_DENOMINATOR;
        }
        return 0;
    }

    function _doTransferIn(IERC20 token, uint256 amount) private returns (uint256) {
        uint256 priorBalance = token.balanceOf(address(this));
        token.safeTransferFrom(msg.sender, address(this), amount);
        return token.balanceOf(address(this)) - priorBalance;
    }

    function _sumOf(uint256[] memory x) private pure returns (uint256 sum) {
        for (uint256 i = 0; i < x.length; i++) {
            sum += x[i];
        }
    }

    function _distance(uint256 x, uint256 y) private pure returns (uint256) {
        return x > y ? x - y : y - x;
    }
}

// File: contracts/interfaces/flashLoan/IPoolFlashLoan.sol



pragma solidity 0.8.16;


interface IPoolFlashLoan {
    event FlashLoan(address recipient, uint256[] amounts, uint256[] feeAmounts);

    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external;
}

// File: contracts/libraries/Initializable.sol



pragma solidity ^0.8.0;

/**
 * @dev This is a base contract to aid in writing upgradeable contracts, or any kind of contract that will be deployed
 * behind a proxy. Since a proxied contract can't have a constructor, it's common to move constructor logic to an
 * external initializer function, usually called `initialize`. It then becomes necessary to protect this initializer
 * function so it can only be called once. The {initializer} modifier provided by this contract will have this effect.
 *
 * TIP: To avoid leaving the proxy in an uninitialized state, the initializer function should be called as early as
 * possible by providing the encoded function call as the `_data` argument to {ERC1967Proxy-constructor}.
 *
 * CAUTION: When used with inheritance, manual care must be taken to not invoke a parent initializer twice, or to ensure
 * that all initializers are idempotent. This is not verified automatically as constructors are by Solidity.
 *
 * [CAUTION]
 * ====
 * Avoid leaving a contract uninitialized.
 *
 * An uninitialized contract can be taken over by an attacker. This applies to both a proxy and its implementation
 * contract, which may impact the proxy. To initialize the implementation contract, you can either invoke the
 * initializer manually, or you can include a constructor to automatically mark it as initialized when it is deployed:
 *
 * [.hljs-theme-light.nopadding]
 * ```
 * /// @custom:oz-upgrades-unsafe-allow constructor
 * constructor() initializer {}
 * ```
 * ====
 */
abstract contract Initializable {
    /**
     * @dev Indicates that the contract has been initialized.
     */
    bool private _initialized;

    /**
     * @dev Indicates that the contract is in the process of being initialized.
     */
    bool private _initializing;

    /**
     * @dev Modifier to protect an initializer function from being invoked twice.
     */
    modifier initializer() {
        require(_initializing || !_initialized, "Initializable: contract is already initialized");

        bool isTopLevelCall = !_initializing;
        if (isTopLevelCall) {
            _initializing = true;
            _initialized = true;
        }

        _;

        if (isTopLevelCall) {
            _initializing = false;
        }
    }
}
// File: contracts/libraries/ReentrancyGuard.sol



pragma solidity ^0.8.16;

/**
 * @dev Contract module that helps prevent reentrant calls to a function.
 *
 * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier
 * available, which can be applied to functions to make sure there are no nested
 * (reentrant) calls to them.
 *
 * Note that because there is a single `nonReentrant` guard, functions marked as
 * `nonReentrant` may not call one another. This can be worked around by making
 * those functions `private`, and then adding `external` `nonReentrant` entry
 * points to them.
 *
 * TIP: If you would like to learn more about reentrancy and alternative ways
 * to protect against it, check out our blog post
 * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].
 */
abstract contract ReentrancyGuard {
    // Booleans are more expensive than uint256 or any type that takes up a full
    // word because each write operation emits an extra SLOAD to first read the
    // slot's contents, replace the bits taken up by the boolean, and then write
    // back. This is the compiler's defense against contract upgrades and
    // pointer aliasing, and it cannot be disabled.

    // The values being non-zero value makes deployment a bit more expensive,
    // but in exchange the refund on every call to nonReentrant will be lower in
    // amount. Since refunds are capped to a percentage of the total
    // transaction's gas, it is best to keep them low in cases like this one, to
    // increase the likelihood of the full refund coming into effect.
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    /**
     * @dev Prevents a contract from calling itself, directly or indirectly.
     * Calling a `nonReentrant` function from another `nonReentrant`
     * function is not supported. It is possible to prevent this from happening
     * by making the `nonReentrant` function external, and making it call a
     * `private` function that does the actual work.
     */
    modifier nonReentrant() {
        // On the first call to nonReentrant, _notEntered will be true
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");

        // Any calls to nonReentrant after this point will fail
        _status = _ENTERED;

        _;

        // By storing the original value once again, a refund is triggered (see
        // https://eips.ethereum.org/EIPS/eip-2200)
        _status = _NOT_ENTERED;
    }
}

// File: contracts/poolStable/StablePool.sol



pragma solidity ^0.8.16;











// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

contract StablePool is ISwap, IPoolFlashLoan, ReentrancyGuard, Initializable, IMultiPool, PoolERC20, PoolFeeManagement {
    using StablePoolLib for StablePoolLib.SwapStorage;
    using SafeERC20 for IERC20;

    /// STATE VARS
    StablePoolLib.SwapStorage public swapStorage;
    address public creator;
    mapping(address => uint8) public tokenIndexes;

    modifier deadlineCheck(uint256 _deadline) {
        require(block.timestamp <= _deadline, "Timeout");
        _;
    }

    constructor() ReentrancyGuard() PoolFeeManagement() {}

    function initialize(
        address[] memory _coins,
        uint8[] memory _decimals,
        string memory _name,
        string memory _symbol,
        uint256 _A,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _creator
    ) external initializer {
        // initialize pool token data
        _poolTokenInit(_name, _symbol);
        uint256 length = _coins.length;
        require(length == _decimals.length, "ArrayError");
        swapStorage.tokenMultipliers = new uint256[](length);
        swapStorage.pooledTokens = new IERC20[](length);
        for (uint8 i = 0; i < length; i++) {
            require(_decimals[i] <= StablePoolLib.POOL_TOKEN_COMMON_DECIMALS, "DecimalError");
            swapStorage.tokenMultipliers[i] = 10**(StablePoolLib.POOL_TOKEN_COMMON_DECIMALS - _decimals[i]);
            swapStorage.pooledTokens[i] = IERC20(_coins[i]);
            tokenIndexes[address(_coins[i])] = i;
        }

        require(_A < StablePoolLib.MAX_A, "MaxA");
        require(_fee <= MAX_TRANSACTION_FEE, "MaxSwapFee");
        require(_adminFee <= MAX_ADMIN_FEE, "MaxAdminFee");
        require(_withdrawFee <= MAX_TRANSACTION_FEE, "MaxWithdrawFee");

        swapStorage.balances = new uint256[](length);
        swapStorage.initialA = _A * StablePoolLib.A_PRECISION;
        swapStorage.futureA = _A * StablePoolLib.A_PRECISION;
        swapStorage.nTokens = length;

        // initialize fee data
        swapStorage.fee = _fee;
        swapStorage.flashFee = _flashFee;
        swapStorage.adminFee = _adminFee;
        swapStorage.adminSwapFee = (_adminFee * _fee) / StablePoolLib.FEE_DENOMINATOR;
        swapStorage.defaultWithdrawFee = _withdrawFee;
        swapStorage.withdrawDuration = (4 weeks);
        swapStorage.collectedFees = new uint256[](length);

        // assign creator and fee controller
        creator = _creator;
    }

    /// PUBLIC FUNCTIONS
    function addLiquidityExactIn(
        uint256[] memory amounts,
        uint256 minMintAmount,
        address to,
        uint256 deadline
    ) external override whenNotPaused nonReentrant deadlineCheck(deadline) returns (uint256 mintAmount) {
        if (totalSupply == 0) {
            require(msg.sender == creator, "can only be inititalized by creator");
            mintAmount = swapStorage.addLiquidityInit(amounts);
        } else {
            mintAmount = swapStorage.addLiquidityExactIn(amounts, minMintAmount, totalSupply);
        }
        _mint(to, mintAmount);
    }

    /**
     * @notice calculates and executes the exact-in swap for an amount of token in tht has already been sent to this address.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param to receiver for tokenOut amount
     * @return amountOut calculated out amount
     */
    function onSwapGivenIn(
        address tokenIn,
        address tokenOut,
        address to
    ) external override whenNotPaused nonReentrant returns (uint256 amountOut) {
        amountOut = swapStorage.onSwapGivenIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], to);
    }

    /**
     * @notice calculates and executes the exact-out swap for an amount of token in tht has already been sent to this address.
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountOut target amount which will be obtained if swap succeeds
     * @param to receiver for tokenOut amount
     */
    function onSwapGivenOut(
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to
    ) external override whenNotPaused nonReentrant {
        swapStorage.onSwapGivenOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to);
    }

    /**
     * @notice Very similar to exact out swap, except that transfer to the to address is done before the flash call on the recipient.
     * If data.length == 0, onSwapGivenOut should be used instead.
     * @param flashContract contract on which the receiver function is called
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountIn target amount send to recipient will be calculated from this value
     * @param to receiver for tokenOut amount - not necesariliy the flashContract address
     * @return inAmount
     */
    function onFlashSwapGivenIn(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        address to,
        bytes calldata data
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactIn(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountIn, to, flashContract, data);
    }

    /**
     * @notice Very similar to exact out swap, except that transfer to the to address is done before the flash call on the recipient.
     * If data.length == 0, onSwapGivenOut should be used instead.
     * @param flashContract contract on which the receiver function is called
     * @param tokenIn token for which the amount has already sent to this address
     * @param tokenOut token for which the calculated output amount will be sent
     * @param amountOut target amount which will be obtained if swap succeeds
     * @param to receiver for tokenOut amount - not necesariliy the flashContract address
     * @return inAmount
     */
    function onFlashSwapGivenOut(
        IFlashSwapRecipient flashContract,
        address tokenIn,
        address tokenOut,
        uint256 amountOut,
        address to,
        bytes calldata data
    ) external whenNotPaused nonReentrant returns (uint256) {
        return swapStorage.flashSwapExactOut(tokenIndexes[tokenIn], tokenIndexes[tokenOut], amountOut, to, flashContract, data);
    }

    /**  @notice Flash loan using stable swap balances  */
    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external override nonReentrant whenNotPaused {
        swapStorage.flashLoan(recipient, amounts, userData);
    }

    function removeLiquidityExactIn(
        uint256 lpAmount,
        uint256[] memory minAmounts,
        uint256 deadline
    ) external override nonReentrant deadlineCheck(deadline) returns (uint256[] memory amounts) {
        amounts = swapStorage.removeLiquidityExactIn(lpAmount, minAmounts, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    function removeLiquidityOneTokenExactIn(
        uint256 lpAmount,
        uint8 index,
        uint256 minAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 amount) {
        amount = swapStorage.removeLiquidityOneToken(lpAmount, index, minAmount, totalSupply);
        _burn(msg.sender, lpAmount);
    }

    function removeLiquidityExactOut(
        uint256[] memory amounts,
        uint256 maxBurnAmount,
        uint256 deadline
    ) external override nonReentrant whenNotPaused deadlineCheck(deadline) returns (uint256 burnAmount) {
        burnAmount = swapStorage.removeLiquidityImbalance(amounts, maxBurnAmount, totalSupply);
        _burn(msg.sender, burnAmount);
    }

    /// VIEW FUNCTIONS

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

    function calculateAddLiquidityExactIn(uint256[] calldata amounts) external view override returns (uint256) {
        return swapStorage.calculateAddLiquidityExactIn(amounts, totalSupply);
    }

    function calculateRemoveLiquidityExactOut(uint256[] calldata amounts, address account) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityExactOut(amounts, totalSupply, account);
    }

    function calculateRemoveLiquidityExactIn(uint256 amount, address account) external view override returns (uint256[] memory) {
        return swapStorage.calculateRemoveLiquidityExactIn(account, amount, totalSupply);
    }

    function calculateRemoveLiquidityOneTokenExactIn(
        uint256 amount,
        uint256 index,
        address account
    ) external view override returns (uint256) {
        return swapStorage.calculateRemoveLiquidityOneToken(account, amount, index, totalSupply);
    }

    function calculateCurrentWithdrawFee(address account) external view override returns (uint256) {
        return swapStorage._calculateCurrentWithdrawFee(account);
    }

    /**
     * @notice Start ramping up or down A parameter towards given futureA_ and futureTime_
     * Checks if the change is too rapid, and commits the new A value only when it falls under
     * the limit range.
     * @param futureA the new A to ramp towards
     * @param futureATime timestamp when the new A should be reached
     */
    function rampA(uint256 futureA, uint256 futureATime) external onlyAdmin {
        swapStorage.rampA(futureA, futureATime);
    }

    function stopRampA() external onlyAdmin {
        swapStorage.stopRampA();
    }

    /// FEE INTERNALS

    /**
     * @notice Sets the swap fee
     * @param newSwapFee new swap fee to be applied on future transactions
     */
    function _setSwapFee(uint256 newSwapFee) internal override {
        swapStorage.fee = newSwapFee;
        swapStorage.adminSwapFee = (swapStorage.adminFee * newSwapFee) / StablePoolLib.FEE_DENOMINATOR;
    }

    /**
     * @notice Sets the fee for flash loans
     * @param newFlashFee new flash loan fee
     */
    function _setFlashFee(uint256 newFlashFee) internal override {
        swapStorage.flashFee = newFlashFee;
    }

    /**
     * @notice Sets the admin fee - accessible only to the fee controller
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function _setAdminFee(uint256 newAdminFee) internal override {
        swapStorage.adminFee = newAdminFee;
        swapStorage.adminSwapFee = (newAdminFee * swapStorage.fee) / StablePoolLib.FEE_DENOMINATOR;
    }

    /**
     * @notice Sets the duration for which the withdraw fee is applicable
     * and the fee itself
     * @param newWithdrawDuration new flash loan fee
     * @param newDefaultWithdrawFee new default witdraw fee
     */
    function _setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) internal override {
        swapStorage.defaultWithdrawFee = newDefaultWithdrawFee;
        swapStorage.withdrawDuration = newWithdrawDuration;
    }

    function withdrawAdminFee(address _receiver) external override onlyAdmin {
        require(_receiver != address(0), "Cannot withdraw to zero address");
        swapStorage.withdrawCollectedFees(_receiver);
    }

    /// ERC20 ADDITION FOR FEE CONSIDERATION

    /**
     * @notice Updates the user withdraw fee
     * Transferring your pool token will reset the withdraw durtion. If the recipient is already
     * holding some pool tokens, the withdraw fee will be discounted
     * @dev Overrides ERC20._beforeTokenTransfer() which get called on
     * minting and burning. This ensures that swap.updateUserWithdrawFees are called everytime.
     */
    function _beforeTokenTransfer(
        address,
        address to,
        uint256 amount
    ) internal override(PoolERC20) {
        swapStorage._updateUserWithdrawFee(to, this.balanceOf(to), amount);
    }

    /// VIEWS FOR VARIABLES IN SWAPSTORAGE

    /**
     * @notice Return timestamp of last deposit of given address
     * @return timestamp of the last deposit made by the given address
     */
    function getDepositTimestamp(address user) external view returns (uint256) {
        return swapStorage.depositTimestamp[user];
    }

    function getTokenBalances() external view override returns (uint256[] memory) {
        return swapStorage.balances;
    }

    function getTokenMultipliers() external view returns (uint256[] memory) {
        return swapStorage.tokenMultipliers;
    }

    function getCollectedFees() external view returns (uint256[] memory) {
        return swapStorage.collectedFees;
    }

    function getPooledTokens() external view returns (IERC20[] memory) {
        return swapStorage.pooledTokens;
    }

    function getA() external view returns (uint256) {
        return swapStorage.getA();
    }
}

// File: contracts/poolStable/StablePoolCreator.sol



pragma solidity ^0.8.16;



contract StablePoolCreator is IStablePoolCreator {
    function create(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _adminFee,
        uint256 _withdrawFee,
        address _creator
    ) external override returns (address) {
        StablePool swap = new StablePool();
        swap.initialize(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, _adminFee, _withdrawFee, _creator);
        return address(swap);
    }
}
