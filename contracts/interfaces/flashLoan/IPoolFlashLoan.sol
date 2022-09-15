// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./IFlashLoanRecipient.sol";

interface IPoolFlashLoan {
    event FlashLoan(address recipient, uint256[] amounts, uint256[] feeAmounts);

    function flashLoan(
        IFlashLoanRecipient recipient,
        uint256[] memory amounts,
        bytes memory userData
    ) external;
}
