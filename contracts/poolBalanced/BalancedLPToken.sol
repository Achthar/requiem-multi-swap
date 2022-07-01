// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;
import "../libraries/ERC20Burnable.sol";
import "../interfaces/poolBalanced/IBalancedSwap.sol";

contract BalancedLPToken is ERC20Burnable {
    IBalancedSwap public swap;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        swap = IBalancedSwap(msg.sender);
    }

    function mint(address _to, uint256 _amount) external {
        require(msg.sender == address(swap), "unauthorized");
        require(_amount > 0, "zeroMintAmount");
        _mint(_to, _amount);
    }
}
