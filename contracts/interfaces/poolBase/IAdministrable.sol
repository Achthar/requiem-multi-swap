// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

// solhint-disable reason-string

interface IAdministrable {
    function adminInit(address _initialAdmin) external;

    function transferAdministration(address newAdmin) external;
}
