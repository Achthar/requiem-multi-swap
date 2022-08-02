// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string, no-empty-blocks

interface IPoolFeeManagement {
    event NewTransactionFees(uint256 swapFee, uint256 flashFee);

    event NewAdminFee(uint256 adminFee);

    event NewWithdrawFee(uint256 withdrawDuration, uint256 defaultWithdrawFee);

    event FeeControllerChanged(address newController);

    event FeeDistributorChanged(address newController);

    function setTransactionFees(uint256 newSwapFee, uint256 newFlashFee) external;

    function setAdminFee(uint256 newAdminFee) external;

    function setWithdrawFee(uint256 newWithdrawDuration, uint256 newDefaultWithdrawFee) external;

    function setFeeController(address _feeController) external;

    function setFeeDistributor(address _feeDistributor) external;

    function withdrawAdminFee() external;
}
