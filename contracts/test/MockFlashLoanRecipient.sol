// SPDX-License-Identifier: GPL-3.0-or-later
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

pragma solidity ^0.8.15;

import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "../interfaces/flashLoan/IPoolFlashLoan.sol";
import "../mocks/MockERC20.sol";

contract MockFlashLoanRecipient is IFlashLoanRecipient {
    using SafeERC20 for IERC20;

    address public immutable pool;
    // IERC20[] public  tokens;
    bool public repayLoan;
    bool public repayInExcess;
    bool public reenter;

    constructor(address _pool) {
        pool = _pool;

        repayLoan = true;
        repayInExcess = false;
        reenter = false;
        // tokens = new IERC20[](_tokens.length);
    //     for(uint256 i = 0; i < _tokens.length; i++){
    //         tokens[i] = IERC20(_tokens[i]);
    //     }
    }

    function setRepayLoan(bool _repayLoan) public {
        repayLoan = _repayLoan;
    }

    function setRepayInExcess(bool _repayInExcess) public {
        repayInExcess = _repayInExcess;
    }

    function setReenter(bool _reenter) public {
        reenter = _reenter;
    }

    // Repays loan unless setRepayLoan was called with 'false'
    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external override {
        for (uint256 i = 0; i < amounts.length; ++i) {
            IERC20 token = tokens[i];
            uint256 amount = amounts[i];
            uint256 feeAmount = feeAmounts[i];

            require(token.balanceOf(address(this)) == amount, "INVALID_FLASHLOAN_BALANCE");

            if (reenter) {
                IPoolFlashLoan(msg.sender).flashLoan(IFlashLoanRecipient(address(this)), amounts, userData);
            }

            MockERC20(address(token)).mint(address(this), repayInExcess ? feeAmount + 1 : feeAmount);

            uint256 totalDebt = amount + feeAmount;

            if (!repayLoan) {
                totalDebt = totalDebt - 1;
            } else if (repayInExcess) {
                totalDebt = totalDebt + 1;
            }

            token.safeTransfer(pool, totalDebt);
        }
    }
}
