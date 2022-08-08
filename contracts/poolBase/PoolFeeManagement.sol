// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "../interfaces/poolBase/IPoolFeeManagement.sol";
import "./AdminPausable.sol";

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
