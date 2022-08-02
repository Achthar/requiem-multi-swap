// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolBase/IPoolFeeManagement.sol";
import "./GovernancePausable.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

abstract contract PoolFeeManagement is IPoolFeeManagement, GovernancePausable {
    /// constants
    uint256 internal constant MAX_ADMIN_FEE = 0.5e18; // 50%
    uint256 internal constant MAX_TRANSACTION_FEE = 0.01e18; // 1%
    uint256 internal constant MAX_FLASH_FEE = 0.001e18; // 0.1%
    uint256 internal constant MAX_WITHDRAW_FEE = 0.005e18; // 0.5%

    /// STATE VARS
    address public feeDistributor;
    address public feeController;

    modifier onlyFeeController() {
        require(msg.sender == feeController, "!feeController");
        _;
    }

    constructor() GovernancePausable() {}

    /**
     * @notice Sets the all applicable transaction fees
     * swap fee cannot be higher than 1% of each swap
     * @param newSwapFee new swap fee to be applied on future transactions
     * @param newFlashFee new flash loan fee
     */
    function setTransactionFees(uint256 newSwapFee, uint256 newFlashFee) external virtual onlyGovernance {
        require(newSwapFee <= MAX_TRANSACTION_FEE, "SwapFeeError");
        require(newFlashFee <= MAX_FLASH_FEE, "FlashFeeError");
        _setTransactionFees(newSwapFee, newFlashFee);
    }

    function _setTransactionFees(uint256 newSwapFee, uint256 newFlashFee) internal virtual {}

    /**
     * @notice Sets the duration for which the withdraw fee is applicable
     * and the fee itself
     * @param newWithdrawDuration new flash loan fee
     * @param newDefaultWithdrawFee new default witdraw fee
     */
    function setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) external onlyGovernance {
        require(newWithdrawDuration <= (4 weeks), "WithdrawDurationError");
        require(newDefaultWithdrawFee <= MAX_WITHDRAW_FEE, "WithdrawFeeError");
        _setWithdrawFee(newWithdrawDuration, newDefaultWithdrawFee);
        emit NewWithdrawFee(newWithdrawDuration, newDefaultWithdrawFee);
    }

    function _setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) internal virtual {}

    /**
     * @notice Sets the admin fee - accessible only to the fee controller
     * @dev adminFee cannot be higher than 50% of the swap fee
     * @param newAdminFee new admin fee to be applied on future transactions
     */
    function setAdminFee(uint256 newAdminFee) external virtual onlyFeeController {
        require(newAdminFee <= MAX_ADMIN_FEE, "AdminFeeError");
        _setAdminFee(newAdminFee);
        emit NewAdminFee(newAdminFee);
    }

    function _setAdminFee(uint256 newAdminFee) internal virtual {}

    function setFeeController(address _feeController) external onlyFeeController {
        require(_feeController != address(0), "AddressError");
        feeController = _feeController;
        emit FeeControllerChanged(_feeController);
    }

    function setFeeDistributor(address _feeDistributor) external onlyFeeController {
        require(_feeDistributor != address(0), "AddressError");
        feeDistributor = _feeDistributor;
        emit FeeDistributorChanged(_feeDistributor);
    }

    function withdrawAdminFee() external virtual onlyFeeController {}
}
