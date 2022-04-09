// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13;

import "./../interfaces/IWeightedPairFactory.sol";
import "./../interfaces/IWeightedPair.sol";
import "./../interfaces/IWeightedFormula.sol";
import "./../interfaces/IWeightedPairManager.sol";
import "./../interfaces/IRequiemSwap.sol";
import "./../libraries/TransferHelper.sol";
import "./../interfaces/ERC20/IERC20.sol";
import "./../interfaces/ISwapRouter.sol";
import "./../interfaces/IWETH.sol";

// solhint-disable not-rely-on-time, var-name-mixedcase, max-line-length, reason-string

// test router that tries to send less funds than it reports to pools (exactly 1)
// in the pair and stable pool code that should trigger a revert
contract ThiefRouter {
    address public immutable factory;
    address public immutable formula;
    address public immutable WETH;
    address private constant ETH_ADDRESS = address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    uint256 internal constant Q112 = 2**112;
    uint256 internal constant MIN_VRESERVE_RATIO = 0;
    uint256 internal constant MAX_VRESERVE_RATIO = 2**256 - 1;
    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "Router: EXPIRED");
        _;
    }

    constructor(address _factory, address _WETH) {
        factory = _factory;
        formula = IWeightedPairFactory(_factory).formula();
        WETH = _WETH;
    }

    receive() external payable {
        assert(msg.sender == WETH);
        // only accept ETH via fallback from the WETH contract
    }

    // the onSwap functions are designed to include the stable swap
    // it currenty only allows exactIn structures
    function onSwapExactTokensForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) public virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn - 10);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactETHForTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external payable virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = msg.value;
        transferETHTo(msg.value, pools[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
    }

    function onSwapExactTokensForETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountIn,
        uint256 amountOutMin,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256 amountLast) {
        amountLast = amountIn;
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amountIn);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? address(this) : pools[i + 1];
            amountLast = IRequiemSwap(pools[i]).onSwapGivenIn(tokens[i], tokens[i + 1], amountLast, 0, _to);
        }
        require(amountOutMin <= amountLast, "INSUFFICIENT_OUTPUT");
        transferAll(ETH_ADDRESS, to, amountLast);
    }

    // direct swap function for given exact output
    function onSwapTokensForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256[] memory amounts) {
        // set amount array
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;

        // calculate all amounts to be sent and recieved
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        // check input condition
        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");

        // tranfer amounts
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);

        // use general swap functions that do not execute the full calculation to save gas
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
        }
    }

    function onSwapETHForExactTokens(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        address to,
        uint256 deadline
    ) external payable virtual ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= msg.value, "EXCESSIVE_INPUT");

        transferETHTo(amounts[0], pools[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? to : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
        }
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }

    function onSwapTokensForExactETH(
        address[] memory pools,
        address[] memory tokens,
        uint256 amountOut,
        uint256 amountInMax,
        address to,
        uint256 deadline
    ) external virtual ensure(deadline) returns (uint256[] memory amounts) {
        amounts = new uint256[](tokens.length);
        amounts[pools.length] = amountOut;
        for (uint256 i = amounts.length - 1; i > 0; i--) {
            amounts[i - 1] = IRequiemSwap(pools[i - 1]).calculateSwapGivenOut(tokens[i - 1], tokens[i], amounts[i]);
        }

        require(amounts[0] <= amountInMax, "EXCESSIVE_INPUT");
        TransferHelper.safeTransferFrom(tokens[0], msg.sender, pools[0], amounts[0]);
        for (uint256 i = 0; i < pools.length; i++) {
            address _to = i == pools.length - 1 ? address(this) : pools[i + 1];
            IRequiemSwap(pools[i]).onSwap(tokens[i], tokens[i + 1], amounts[i], amounts[i + 1], _to);
        }

        transferAll(ETH_ADDRESS, to, amountOut);
    }

    function transferFromAll(address token, uint256 amount) internal returns (bool) {
        if (isETH(token)) {
            IWETH(WETH).deposit{value: msg.value}();
        } else {
            TransferHelper.safeTransferFrom(token, msg.sender, address(this), amount);
        }
        return true;
    }

    function getBalance(address token) internal view returns (uint256) {
        if (isETH(token)) {
            return IWETH(WETH).balanceOf(address(this));
        } else {
            return IERC20(token).balanceOf(address(this));
        }
    }

    function transferETHTo(uint256 amount, address to) internal {
        IWETH(WETH).deposit{value: amount}();
        assert(IWETH(WETH).transfer(to, amount));
    }

    function transferAll(
        address token,
        address to,
        uint256 amount
    ) internal returns (bool) {
        if (amount == 0) {
            return true;
        }

        if (isETH(token)) {
            IWETH(WETH).withdraw(amount);
            TransferHelper.safeTransferETH(to, amount);
        } else {
            TransferHelper.safeTransfer(token, to, amount);
        }
        return true;
    }

    function isETH(address token) internal pure returns (bool) {
        return (token == ETH_ADDRESS);
    }
}