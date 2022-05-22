// SPDX-License-Identifier: MIT

pragma solidity 0.8.14;

import "./IPairFlashLoanRecipient.sol";

interface IPairFlashLoan {
    /**
     * @dev Emitted for each individual flash loan performed by `flashLoan`.
     */
    event FlashLoan(IPairFlashLoanRecipient indexed recipient, uint256 amount0, uint256 amount1, uint256 fee0, uint256 fee1);

    function flashLoan(
        IPairFlashLoanRecipient recipient,
        uint256 amount0,
        uint256 amount1,
        bytes memory userData
    ) external;
}
