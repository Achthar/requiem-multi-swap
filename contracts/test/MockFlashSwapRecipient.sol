// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

import "../interfaces/ERC20/IERC20.sol";
import "../interfaces/poolBase/IFlashSwap.sol";

// solhint-disable no-empty-blocks


// flash swap implementation for testing
contract MockFlashSwapRecipient {
    bool public repay;
    bool public repayLess;
    bool public send;
    bool public reenterIn;
    bool public reenterOut;
    address public recipient;

    constructor() {}

    function setRepay(bool val) public {
        repay = val;
    }

    function setRepayLess(bool val) public {
        repayLess = val;
    }

    function setRecipient(address val) public {
        recipient = val;
    }

    function setReenterIn(bool val) public {
        reenterIn = val;
    }

    function setReenterOut(bool val) public {
        reenterOut = val;
    }

    function recieveSwapAmount(
        address sender,
        IERC20 tokenIn,
        IERC20 tokenOut,
        uint256 requiredInAmount,
        uint256 amountOut
    ) external {
        if (repay) tokenIn.transferFrom(sender, msg.sender, requiredInAmount);
        else if (repayLess) {
            tokenIn.transferFrom(sender, msg.sender, requiredInAmount - 1);
        }

        if (send) tokenOut.transferFrom(sender, recipient, amountOut);

        if (reenterIn) IFlashSwap(msg.sender).onFlashSwapExactIn(address(tokenIn), address(tokenOut), 1, sender);

        if (reenterOut) IFlashSwap(msg.sender).onFlashSwapExactOut(address(tokenIn), address(tokenOut), 1, sender);
    }
}
