// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./interfaces/poolPair/IWeightedPair.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/ERC20/IERC20.sol";

// solhint-disable reason-string

contract ProtocolFeeRemover {
    address public receiver;
    address public governance;

    event RemoveLiquidity(address indexed pair, uint256 token0, uint256 token1);
    event ChangeGovernance(address changeValue);
    event ChangeReceiver(address changeValue);

    constructor() {
        governance = msg.sender;
    }

    function setReceiver(address _receiver) external {
        require(msg.sender == governance, "ProtocolFeeRemover: FORBIDDEN");
        receiver = _receiver;
        emit ChangeReceiver(_receiver);
    }

    function setGovernance(address _governance) external {
        require(msg.sender == governance, "ProtocolFeeRemover: FORBIDDEN");
        governance = _governance;
        emit ChangeGovernance(_governance);
    }

    function transfer(address _token, uint256 _value) external {
        require(msg.sender == governance, "ProtocolFeeRemover: FORBIDDEN");
        require(receiver != address(0), "ProtocolFeeRemover: Invalid Receiver address");
        TransferHelper.safeTransfer(_token, receiver, _value);
    }

    function transferAllTokens(address[] calldata _tokens) external {
        require(msg.sender == governance, "ProtocolFeeRemover: FORBIDDEN");
        require(receiver != address(0), "ProtocolFeeRemover: Invalid Receiver address");

        for (uint256 i = 0; i < _tokens.length; i++) {
            uint256 _balance = IERC20(_tokens[i]).balanceOf(address(this));
            TransferHelper.safeTransfer(_tokens[i], receiver, _balance);
        }
    }

    function remove(address[] calldata pairs) external {
        address _receiver = receiver;
        // save gas
        require(_receiver != address(0), "ProtocolFeeRemover: Invalid Receiver address");
        for (uint256 i = 0; i < pairs.length; i++) {
            IWeightedPair pair = IWeightedPair(pairs[i]);
            uint256 liquidity = pair.balanceOf(address(this));
            if (liquidity > 0) {
                pair.transfer(address(pair), liquidity);
                (uint256 amount0, uint256 amount1) = pair.burn(_receiver);
                emit RemoveLiquidity(address(pair), amount0, amount1);
            }
        }
    }
}
