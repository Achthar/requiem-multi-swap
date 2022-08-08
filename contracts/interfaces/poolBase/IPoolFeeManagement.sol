// SPDX-License-Identifier: MIT

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
