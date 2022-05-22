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

pragma solidity ^0.8.14;

import "../interfaces/ERC20/IERC20.sol";
import "../libraries/SafeERC20.sol";
import "../interfaces/flashLoan/IFlashLoanRecipient.sol";
import "../interfaces/IRequiemCallee.sol";
import "../interfaces/IWeightedPair.sol";
import "../interfaces/IUniswapV2TypeSwap.sol";
import "../mocks/MockERC20.sol";

contract MockCallee is IRequiemCallee {
    using SafeERC20 for IERC20;

    address public immutable pool;
    bool public repayLoan;
    bool public repayInExcess;
    bool public reenter;

    constructor(address _pool) {
        pool = _pool;
        repayLoan = true;
        repayInExcess = false;
        reenter = false;
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

    function callSwap(uint256 amount0, uint256 amount1) public {
        bytes memory call = abi.encode("message");
        IUniswapV2TypeSwap(pool).swap(amount0, amount1, address(this), call);
    }

    // Repays loan unless setRepayLoan was called with 'false'
    function requiemCall(
        address,
        uint256 amount0,
        uint256 amount1,
        bytes calldata data
    ) public override {
        string memory message = abi.decode(data, (string));
        if (reenter) {
            IUniswapV2TypeSwap(pool).swap(amount0, amount1, msg.sender, new bytes(0));
            require(false, message);
        }

        (, , uint256 swapFee, ) = IWeightedPair(msg.sender).getParameters();

        uint256 fee0 = (amount0 * swapFee) / 10000;

        uint256 fee1 = (amount1 * swapFee) / 10000;

        MockERC20(IWeightedPair(msg.sender).token0()).mint(address(this), repayInExcess ? fee0 + 1 : fee0);

        MockERC20(IWeightedPair(msg.sender).token1()).mint(address(this), repayInExcess ? fee1 + 1 : fee1);

        uint256 totalDebt0 = amount0 + fee0;
        uint256 totalDebt1 = amount1 + fee1;

        if (!repayLoan) {
            totalDebt0 = totalDebt0 - 1;
            totalDebt1 = totalDebt1 - 1;
        } else if (repayInExcess) {
            totalDebt0 = totalDebt0 + 1;
            totalDebt1 = totalDebt1 + 1;
        }

        MockERC20(IWeightedPair(msg.sender).token0()).transfer(pool, totalDebt0);

        MockERC20(IWeightedPair(msg.sender).token1()).transfer(pool, totalDebt1);
    }
}
