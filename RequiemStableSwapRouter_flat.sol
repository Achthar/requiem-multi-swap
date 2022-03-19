
// File: contracts/libraries/helpers/RequiemErrors.sol


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

pragma solidity ^0.8.13;

// solhint-disable
library RequiemErrors {
    /**
     * @dev Reverts if `condition` is false, with a revert reason containing `errorCode`. Only codes up to 999 are
     * supported.
     */
    function _require(bool condition, uint256 errorCode) internal pure {
        if (!condition) RequiemErrors._revert(errorCode);
    }

    /**
     * @dev Reverts with a revert reason containing `errorCode`. Only codes up to 999 are supported.
     */
    function _revert(uint256 errorCode) internal pure {
        // We're going to dynamically create a revert string based on the error code, with the following format:
        // 'REQ#{errorCode}'
        // where the code is left-padded with zeroes to three digits (so they range from 000 to 999).
        //
        // We don't have revert strings embedded in the contract to save bytecode size: it takes much less space to store a
        // number (8 to 16 bits) than the individual string characters.
        //
        // The dynamic string creation algorithm that follows could be implemented in Solidity, but assembly allows for a
        // much denser implementation, again saving bytecode size. Given this function unconditionally reverts, this is a
        // safe place to rely on it without worrying about how its usage might affect e.g. memory contents.
        assembly {
            // First, we need to compute the ASCII representation of the error code. We assume that it is in the 0-999
            // range, so we only need to convert three digits. To convert the digits to ASCII, we add 0x30, the value for
            // the '0' character.

            let units := add(mod(errorCode, 10), 0x30)

            errorCode := div(errorCode, 10)
            let tenths := add(mod(errorCode, 10), 0x30)

            errorCode := div(errorCode, 10)
            let hundreds := add(mod(errorCode, 10), 0x30)

            // With the individual characters, we can now construct the full string. The "REQ#" part is a known constant
            // (0x52455123): we simply shift this by 24 (to provide space for the 3 bytes of the error code), and add the
            // characters to it, each shifted by a multiple of 8.
            // The revert reason is then shifted left by 200 bits (256 minus the length of the string, 7 characters * 8 bits
            // per character = 56) to locate it in the most significant part of the 256 slot (the beginning of a byte
            // array).

            let revertReason := shl(200, add(0x52455123000000, add(add(units, shl(8, tenths)), shl(16, hundreds))))

            // We can now encode the reason in memory, which can be safely overwritten as we're about to revert. The encoded
            // message will have the following layout:
            // [ revert reason identifier ] [ string location offset ] [ string length ] [ string contents ]

            // The Solidity revert reason identifier is 0x08c739a0, the function selector of the Error(string) function. We
            // also write zeroes to the next 28 bytes of memory, but those are about to be overwritten.
            mstore(0x0, 0x08c379a000000000000000000000000000000000000000000000000000000000)
            // Next is the offset to the location of the string, which will be placed immediately after (20 bytes away).
            mstore(0x04, 0x0000000000000000000000000000000000000000000000000000000000000020)
            // The string length is fixed: 7 characters.
            mstore(0x24, 7)
            // Finally, the string itself is stored.
            mstore(0x44, revertReason)

            // Even if the string is only 7 bytes long, we need to return a full 32 byte slot containing it. The length of
            // the encoded message is therefore 4 + 32 + 32 + 32 = 100.
            revert(0, 100)
        }
    }
}

library Errors {
    // Math
    uint256 internal constant ADD_OVERFLOW = 0;
    uint256 internal constant SUB_OVERFLOW = 1;
    uint256 internal constant SUB_UNDERFLOW = 2;
    uint256 internal constant MUL_OVERFLOW = 3;
    uint256 internal constant ZERO_DIVISION = 4;
    uint256 internal constant DIV_INTERNAL = 5;
    uint256 internal constant X_OUT_OF_BOUNDS = 6;
    uint256 internal constant Y_OUT_OF_BOUNDS = 7;
    uint256 internal constant PRODUCT_OUT_OF_BOUNDS = 8;
    uint256 internal constant INVALID_EXPONENT = 9;

    // Input
    uint256 internal constant OUT_OF_BOUNDS = 100;
    uint256 internal constant UNSORTED_ARRAY = 101;
    uint256 internal constant UNSORTED_TOKENS = 102;
    uint256 internal constant INPUT_LENGTH_MISMATCH = 103;
    uint256 internal constant ZERO_TOKEN = 104;

    // Shared pools
    uint256 internal constant MIN_TOKENS = 200;
    uint256 internal constant MAX_TOKENS = 201;
    uint256 internal constant MAX_SWAP_FEE_PERCENTAGE = 202;
    uint256 internal constant MIN_SWAP_FEE_PERCENTAGE = 203;
    uint256 internal constant MINIMUM_BPT = 204;
    uint256 internal constant CALLER_NOT_VAULT = 205;
    uint256 internal constant UNINITIALIZED = 206;
    uint256 internal constant BPT_IN_MAX_AMOUNT = 207;
    uint256 internal constant BPT_OUT_MIN_AMOUNT = 208;
    uint256 internal constant EXPIRED_PERMIT = 209;
    uint256 internal constant NOT_TWO_TOKENS = 210;

    // Pools
    uint256 internal constant MIN_AMP = 300;
    uint256 internal constant MAX_AMP = 301;
    uint256 internal constant MIN_WEIGHT = 302;
    uint256 internal constant MAX_STABLE_TOKENS = 303;
    uint256 internal constant MAX_IN_RATIO = 304;
    uint256 internal constant MAX_OUT_RATIO = 305;
    uint256 internal constant MIN_BPT_IN_FOR_TOKEN_OUT = 306;
    uint256 internal constant MAX_OUT_BPT_FOR_TOKEN_IN = 307;
    uint256 internal constant NORMALIZED_WEIGHT_INVARIANT = 308;
    uint256 internal constant INVALID_TOKEN = 309;
    uint256 internal constant UNHANDLED_JOIN_KIND = 310;
    uint256 internal constant ZERO_INVARIANT = 311;
    uint256 internal constant ORACLE_INVALID_SECONDS_QUERY = 312;
    uint256 internal constant ORACLE_NOT_INITIALIZED = 313;
    uint256 internal constant ORACLE_QUERY_TOO_OLD = 314;
    uint256 internal constant ORACLE_INVALID_INDEX = 315;
    uint256 internal constant ORACLE_BAD_SECS = 316;
    uint256 internal constant AMP_END_TIME_TOO_CLOSE = 317;
    uint256 internal constant AMP_ONGOING_UPDATE = 318;
    uint256 internal constant AMP_RATE_TOO_HIGH = 319;
    uint256 internal constant AMP_NO_ONGOING_UPDATE = 320;
    uint256 internal constant STABLE_INVARIANT_DIDNT_CONVERGE = 321;
    uint256 internal constant STABLE_GET_BALANCE_DIDNT_CONVERGE = 322;
    uint256 internal constant RELAYER_NOT_CONTRACT = 323;
    uint256 internal constant BASE_POOL_RELAYER_NOT_CALLED = 324;
    uint256 internal constant REBALANCING_RELAYER_REENTERED = 325;
    uint256 internal constant GRADUAL_UPDATE_TIME_TRAVEL = 326;
    uint256 internal constant SWAPS_DISABLED = 327;
    uint256 internal constant CALLER_IS_NOT_LBP_OWNER = 328;
    uint256 internal constant PRICE_RATE_OVERFLOW = 329;
    uint256 internal constant INVALID_JOIN_EXIT_KIND_WHILE_SWAPS_DISABLED = 330;
    uint256 internal constant WEIGHT_CHANGE_TOO_FAST = 331;
    uint256 internal constant LOWER_GREATER_THAN_UPPER_TARGET = 332;
    uint256 internal constant UPPER_TARGET_TOO_HIGH = 333;
    uint256 internal constant UNHANDLED_BY_LINEAR_POOL = 334;
    uint256 internal constant OUT_OF_TARGET_RANGE = 335;
    uint256 internal constant UNHANDLED_EXIT_KIND = 336;
    uint256 internal constant UNAUTHORIZED_EXIT = 337;
    uint256 internal constant MAX_MANAGEMENT_SWAP_FEE_PERCENTAGE = 338;
    uint256 internal constant UNHANDLED_BY_MANAGED_POOL = 339;
    uint256 internal constant UNHANDLED_BY_PHANTOM_POOL = 340;
    uint256 internal constant TOKEN_DOES_NOT_HAVE_RATE_PROVIDER = 341;
    uint256 internal constant INVALID_INITIALIZATION = 342;

    // Lib
    uint256 internal constant REENTRANCY = 400;
    uint256 internal constant SENDER_NOT_ALLOWED = 401;
    uint256 internal constant PAUSED = 402;
    uint256 internal constant PAUSE_WINDOW_EXPIRED = 403;
    uint256 internal constant MAX_PAUSE_WINDOW_DURATION = 404;
    uint256 internal constant MAX_BUFFER_PERIOD_DURATION = 405;
    uint256 internal constant INSUFFICIENT_BALANCE = 406;
    uint256 internal constant INSUFFICIENT_ALLOWANCE = 407;
    uint256 internal constant ERC20_TRANSFER_FROM_ZERO_ADDRESS = 408;
    uint256 internal constant ERC20_TRANSFER_TO_ZERO_ADDRESS = 409;
    uint256 internal constant ERC20_MINT_TO_ZERO_ADDRESS = 410;
    uint256 internal constant ERC20_BURN_FROM_ZERO_ADDRESS = 411;
    uint256 internal constant ERC20_APPROVE_FROM_ZERO_ADDRESS = 412;
    uint256 internal constant ERC20_APPROVE_TO_ZERO_ADDRESS = 413;
    uint256 internal constant ERC20_TRANSFER_EXCEEDS_ALLOWANCE = 414;
    uint256 internal constant ERC20_DECREASED_ALLOWANCE_BELOW_ZERO = 415;
    uint256 internal constant ERC20_TRANSFER_EXCEEDS_BALANCE = 416;
    uint256 internal constant ERC20_BURN_EXCEEDS_ALLOWANCE = 417;
    uint256 internal constant SAFE_ERC20_CALL_FAILED = 418;
    uint256 internal constant ADDRESS_INSUFFICIENT_BALANCE = 419;
    uint256 internal constant ADDRESS_CANNOT_SEND_VALUE = 420;
    uint256 internal constant SAFE_CAST_VALUE_CANT_FIT_INT256 = 421;
    uint256 internal constant GRANT_SENDER_NOT_ADMIN = 422;
    uint256 internal constant REVOKE_SENDER_NOT_ADMIN = 423;
    uint256 internal constant RENOUNCE_SENDER_NOT_ALLOWED = 424;
    uint256 internal constant BUFFER_PERIOD_EXPIRED = 425;
    uint256 internal constant CALLER_IS_NOT_OWNER = 426;
    uint256 internal constant NEW_OWNER_IS_ZERO = 427;
    uint256 internal constant CODE_DEPLOYMENT_FAILED = 428;
    uint256 internal constant CALL_TO_NON_CONTRACT = 429;
    uint256 internal constant LOW_LEVEL_CALL_FAILED = 430;
    uint256 internal constant NOT_PAUSED = 431;

    // Vault
    uint256 internal constant INVALID_POOL_ID = 500;
    uint256 internal constant CALLER_NOT_POOL = 501;
    uint256 internal constant SENDER_NOT_ASSET_MANAGER = 502;
    uint256 internal constant USER_DOESNT_ALLOW_RELAYER = 503;
    uint256 internal constant INVALID_SIGNATURE = 504;
    uint256 internal constant EXIT_BELOW_MIN = 505;
    uint256 internal constant JOIN_ABOVE_MAX = 506;
    uint256 internal constant SWAP_LIMIT = 507;
    uint256 internal constant SWAP_DEADLINE = 508;
    uint256 internal constant CANNOT_SWAP_SAME_TOKEN = 509;
    uint256 internal constant UNKNOWN_AMOUNT_IN_FIRST_SWAP = 510;
    uint256 internal constant MALCONSTRUCTED_MULTIHOP_SWAP = 511;
    uint256 internal constant INTERNAL_BALANCE_OVERFLOW = 512;
    uint256 internal constant INSUFFICIENT_INTERNAL_BALANCE = 513;
    uint256 internal constant INVALID_ETH_INTERNAL_BALANCE = 514;
    uint256 internal constant INVALID_POST_LOAN_BALANCE = 515;
    uint256 internal constant INSUFFICIENT_ETH = 516;
    uint256 internal constant UNALLOCATED_ETH = 517;
    uint256 internal constant ETH_TRANSFER = 518;
    uint256 internal constant CANNOT_USE_ETH_SENTINEL = 519;
    uint256 internal constant TOKENS_MISMATCH = 520;
    uint256 internal constant TOKEN_NOT_REGISTERED = 521;
    uint256 internal constant TOKEN_ALREADY_REGISTERED = 522;
    uint256 internal constant TOKENS_ALREADY_SET = 523;
    uint256 internal constant TOKENS_LENGTH_MUST_BE_2 = 524;
    uint256 internal constant NONZERO_TOKEN_BALANCE = 525;
    uint256 internal constant BALANCE_TOTAL_OVERFLOW = 526;
    uint256 internal constant POOL_NO_TOKENS = 527;
    uint256 internal constant INSUFFICIENT_FLASH_LOAN_BALANCE = 528;

    // Fees
    uint256 internal constant SWAP_FEE_PERCENTAGE_TOO_HIGH = 600;
    uint256 internal constant FLASH_LOAN_FEE_PERCENTAGE_TOO_HIGH = 601;
    uint256 internal constant INSUFFICIENT_FLASH_LOAN_FEE_AMOUNT = 602;
}

// File: contracts/interfaces/ERC20/IERC20.sol



pragma solidity ^0.8.13;

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

pragma solidity ^0.8.13;



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
        RequiemErrors._require(returndata.length == 0 || abi.decode(returndata, (bool)), Errors.SAFE_ERC20_CALL_FAILED);
    }
}

// File: contracts/interfaces/IFlashLoanRecipient.sol


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

pragma solidity ^0.8.13;

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

// File: contracts/interfaces/IRequiemStableSwap.sol



pragma solidity 0.8.13;



// solhint-disable var-name-mixedcase

interface IRequiemStableSwap {
    /// EVENTS
    event AddLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 tokenSupply);

    event TokenExchange(address indexed buyer, uint256 soldId, uint256 tokensSold, uint256 boughtId, uint256 tokensBought);

    event RemoveLiquidity(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 tokenSupply);

    event RemoveLiquidityOne(address indexed provider, uint256 tokenIndex, uint256 tokenAmount, uint256 coinAmount);

    event RemoveLiquidityImbalance(address indexed provider, uint256[] tokenAmounts, uint256[] fees, uint256 invariant, uint256 tokenSupply);

    event RampA(uint256 oldA, uint256 newA, uint256 initialTime, uint256 futureTime);

    event StopRampA(uint256 A, uint256 timestamp);

    event NewFee(uint256 fee, uint256 flashFee, uint256 adminFee, uint256 withdrawFee);

    event CollectProtocolFee(address token, uint256 amount);

    event FeeControllerChanged(address newController);

    event FeeDistributorChanged(address newController);

    // pool data view functions
    function getLpToken() external view returns (IERC20 lpToken);

    function getA() external view returns (uint256);

    function getAPrecise() external view returns (uint256);

    function getToken(uint8 index) external view returns (IERC20);

    function getTokens() external view returns (IERC20[] memory);

    function getTokenIndex(address tokenAddress) external view returns (uint8);

    function getTokenBalance(uint8 index) external view returns (uint256);

    function getTokenBalances() external view returns (uint256[] memory);

    function getNumberOfTokens() external view returns (uint256);

    function getVirtualPrice() external view returns (uint256);

    function calculateTokenAmount(uint256[] calldata amounts, bool deposit) external view returns (uint256);

    function calculateSwap(
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx
    ) external view returns (uint256);

    function calculateRemoveLiquidity(address account, uint256 amount) external view returns (uint256[] memory);

    function calculateRemoveLiquidityOneToken(
        address account,
        uint256 tokenAmount,
        uint8 tokenIndex
    ) external view returns (uint256 availableTokenAmount);

    function getAdminBalances() external view returns (uint256[] memory adminBalances);

    function getAdminBalance(uint8 index) external view returns (uint256);

    function calculateCurrentWithdrawFee(address account) external view returns (uint256);

    // state modifying functions
    function swap(
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx,
        uint256 minDy,
        address to,
        uint256 deadline
    ) external returns (uint256);

    function flashLoan(
        IFlashLoanRecipient recipient,
        IERC20[] memory tokens,
        uint256[] memory amounts,
        bytes memory userData
    ) external;

    function addLiquidity(
        uint256[] calldata amounts,
        uint256 minToMint,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidity(
        uint256 amount,
        uint256[] calldata minAmounts,
        uint256 deadline
    ) external returns (uint256[] memory);

    function removeLiquidityOneToken(
        uint256 tokenAmount,
        uint8 tokenIndex,
        uint256 minAmount,
        uint256 deadline
    ) external returns (uint256);

    function removeLiquidityImbalance(
        uint256[] calldata amounts,
        uint256 maxBurnAmount,
        uint256 deadline
    ) external returns (uint256);

    function updateUserWithdrawFee(address recipient, uint256 transferAmount) external;
}

// File: contracts/RequiemStableSwapRouter.sol



pragma solidity 0.8.13;




// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

contract RequiemStableSwapRouter {
    using SafeERC20 for IERC20;

    function calculateConvert(
        IRequiemStableSwap fromPool,
        IRequiemStableSwap toPool,
        uint256 amount
    ) external view returns (uint256) {
        uint256 fromPoolLength = fromPool.getNumberOfTokens();
        uint256[] memory amounts = fromPool.calculateRemoveLiquidity(address(this), amount);
        uint256[] memory meta_amounts = new uint256[](fromPoolLength);
        for (uint8 i = 0; i < fromPoolLength; i++) {
            IERC20 fromCoin = fromPool.getToken(i);
            uint256 toCoinIndex = toPool.getTokenIndex(address(fromCoin));
            meta_amounts[toCoinIndex] = amounts[i];
        }
        return toPool.calculateTokenAmount(meta_amounts, true);
    }

    function convert(
        IRequiemStableSwap fromPool,
        IRequiemStableSwap toPool,
        uint256 amount,
        uint256 minToMint,
        uint256 deadline
    ) external returns (uint256) {
        uint256 fromPoolLength = fromPool.getNumberOfTokens();
        uint256 toPoolLength = toPool.getNumberOfTokens();
        require(address(fromPool) != address(toPool), "fromPool = toPool");
        require(fromPoolLength == toPoolLength, "poolTokensLengthMissmatch");
        IERC20 fromToken = fromPool.getLpToken();
        IERC20 toToken = toPool.getLpToken();
        uint256[] memory min_amounts = new uint256[](fromPoolLength);
        // validate token
        for (uint8 i = 0; i < fromPoolLength; i++) {
            IERC20 coin = fromPool.getToken(i);
            toPool.getTokenIndex(address(coin));
        }
        fromToken.transferFrom(msg.sender, address(this), amount);
        fromToken.safeIncreaseAllowance(address(fromPool), amount);
        fromPool.removeLiquidity(amount, min_amounts, deadline);

        uint256[] memory meta_amounts = new uint256[](toPoolLength);

        for (uint8 i = 0; i < toPoolLength; i++) {
            IERC20 coin = toPool.getToken(i);
            uint256 addBalance = coin.balanceOf(address(this));
            coin.safeIncreaseAllowance(address(toPool), addBalance);
            meta_amounts[i] = addBalance;
        }
        toPool.addLiquidity(meta_amounts, minToMint, deadline);

        uint256 lpAmount = toToken.balanceOf(address(this));
        toToken.transfer(msg.sender, lpAmount);
        return lpAmount;
    }

    function addLiquidity(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint256[] memory meta_amounts,
        uint256[] memory base_amounts,
        uint256 minToMint,
        uint256 deadline
    ) external returns (uint256) {
        IERC20 token = IERC20(pool.getLpToken());
        require(base_amounts.length == basePool.getNumberOfTokens(), "invalidBaseAmountsLength");
        require(meta_amounts.length == pool.getNumberOfTokens(), "invalidMetaAmountsLength");
        bool deposit_base = false;
        for (uint8 i = 0; i < base_amounts.length; i++) {
            uint256 amount = base_amounts[i];
            if (amount > 0) {
                deposit_base = true;
                IERC20 coin = basePool.getToken(i);
                coin.safeTransferFrom(msg.sender, address(this), amount);
                uint256 transferred = coin.balanceOf(address(this));
                coin.safeIncreaseAllowance(address(basePool), transferred);
                base_amounts[i] = transferred;
            }
        }
        if (deposit_base) {
            basePool.addLiquidity(base_amounts, 0, deadline);
        }

        for (uint8 i = 0; i < meta_amounts.length; i++) {
            IERC20 coin = pool.getToken(i);
            if (meta_amounts[i] > 0) {
                coin.safeTransferFrom(msg.sender, address(this), meta_amounts[i]);
            }
            uint256 transferred = coin.balanceOf(address(this));
            coin.safeIncreaseAllowance(address(pool), transferred);
            meta_amounts[i] = transferred;
        }
        pool.addLiquidity(meta_amounts, minToMint, deadline);
        uint256 lpAmount = token.balanceOf(address(this));
        token.transfer(msg.sender, lpAmount);
        return lpAmount;
    }

    function removeLiquidity(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint256 _amount,
        uint256[] calldata min_amounts_meta,
        uint256[] calldata min_amounts_base,
        uint256 deadline
    ) external returns (uint256[] memory amounts, uint256[] memory base_amounts) {
        IERC20 token = pool.getLpToken();
        IERC20 baseToken = basePool.getLpToken();
        token.transferFrom(msg.sender, address(this), _amount);
        token.safeIncreaseAllowance(address(pool), _amount);
        pool.removeLiquidity(_amount, min_amounts_meta, deadline);
        uint256 _base_amount = baseToken.balanceOf(address(this));
        baseToken.safeIncreaseAllowance(address(basePool), _base_amount);

        basePool.removeLiquidity(_base_amount, min_amounts_base, deadline);
        // Transfer all coins out
        amounts = new uint256[](pool.getNumberOfTokens());
        for (uint8 i = 0; i < pool.getNumberOfTokens(); i++) {
            IERC20 coin = pool.getToken(i);
            amounts[i] = coin.balanceOf(address(this));
            if (amounts[i] > 0) {
                coin.safeTransfer(msg.sender, amounts[i]);
            }
        }

        base_amounts = new uint256[](basePool.getNumberOfTokens());
        for (uint8 i = 0; i < basePool.getNumberOfTokens(); i++) {
            IERC20 coin = basePool.getToken(i);
            base_amounts[i] = coin.balanceOf(address(this));
            if (base_amounts[i] > 0) {
                coin.safeTransfer(msg.sender, base_amounts[i]);
            }
        }
    }

    function calculateTokenAmount(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint256[] memory meta_amounts,
        uint256[] memory base_amounts,
        bool is_deposit
    ) external view returns (uint256) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        uint256 _base_tokens = basePool.calculateTokenAmount(base_amounts, is_deposit);
        meta_amounts[baseTokenIndex] = meta_amounts[baseTokenIndex] + _base_tokens;
        return pool.calculateTokenAmount(meta_amounts, is_deposit);
    }

    function calculateRemoveLiquidity(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint256 amount
    ) external view returns (uint256[] memory meta_amounts, uint256[] memory base_amounts) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        meta_amounts = pool.calculateRemoveLiquidity(address(this), amount);
        uint256 lpAmount = meta_amounts[baseTokenIndex];
        meta_amounts[baseTokenIndex] = 0;
        base_amounts = basePool.calculateRemoveLiquidity(address(this), lpAmount);
    }

    function swapFromBase(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx,
        uint256 minDy,
        uint256 deadline
    ) external returns (uint256) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        uint256[] memory base_amounts = new uint256[](basePool.getNumberOfTokens());
        base_amounts[tokenIndexFrom] = dx;
        IERC20 coin = basePool.getToken(tokenIndexFrom);
        coin.safeTransferFrom(msg.sender, address(this), dx);
        coin.safeIncreaseAllowance(address(basePool), dx);
        uint256 baseLpAmount = basePool.addLiquidity(base_amounts, 0, deadline);
        if (baseTokenIndex != tokenIndexTo) {
            baseToken.safeIncreaseAllowance(address(pool), baseLpAmount);
            pool.swap(baseTokenIndex, tokenIndexTo, baseLpAmount, minDy, address(this),deadline);
        }
        IERC20 coinTo = pool.getToken(tokenIndexTo);
        uint256 amountOut = coinTo.balanceOf(address(this));
        coinTo.safeTransfer(msg.sender, amountOut);
        return amountOut;
    }

    function calculateSwapFromBase(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx
    ) external view returns (uint256) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        uint256[] memory base_amounts = new uint256[](basePool.getNumberOfTokens());
        base_amounts[tokenIndexFrom] = dx;
        uint256 baseLpAmount = basePool.calculateTokenAmount(base_amounts, true);
        if (baseTokenIndex == tokenIndexTo) {
            return baseLpAmount;
        }
        return pool.calculateSwap(baseTokenIndex, tokenIndexTo, baseLpAmount);
    }

    function swapToBase(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx,
        uint256 minDy,
        uint256 deadline
    ) external returns (uint256) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        IERC20 coin = pool.getToken(tokenIndexFrom);
        coin.safeTransferFrom(msg.sender, address(this), dx);
        uint256 tokenLPAmount = dx;
        if (baseTokenIndex != tokenIndexFrom) {
            coin.safeIncreaseAllowance(address(pool), dx);
            tokenLPAmount = pool.swap(tokenIndexFrom, baseTokenIndex, dx, 0,address(this), deadline);
        }
        baseToken.safeIncreaseAllowance(address(basePool), tokenLPAmount);
        basePool.removeLiquidityOneToken(tokenLPAmount, tokenIndexTo, minDy, deadline);
        IERC20 coinTo = basePool.getToken(tokenIndexTo);
        uint256 amountOut = coinTo.balanceOf(address(this));
        coinTo.safeTransfer(msg.sender, amountOut);
        return amountOut;
    }

    function calculateSwapToBase(
        IRequiemStableSwap pool,
        IRequiemStableSwap basePool,
        uint8 tokenIndexFrom,
        uint8 tokenIndexTo,
        uint256 dx
    ) external view returns (uint256) {
        IERC20 baseToken = basePool.getLpToken();
        uint8 baseTokenIndex = pool.getTokenIndex(address(baseToken));
        uint256 tokenLPAmount = dx;
        if (baseTokenIndex != tokenIndexFrom) {
            tokenLPAmount = pool.calculateSwap(tokenIndexFrom, baseTokenIndex, dx);
        }
        return basePool.calculateRemoveLiquidityOneToken(address(this), tokenLPAmount, tokenIndexTo);
    }
}
