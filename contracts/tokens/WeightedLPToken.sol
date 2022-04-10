// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "../libraries/ERC20Burnable.sol";
import "../libraries/Ownable.sol";
import "../interfaces/IWeightedSwap.sol";

contract WeightedLPToken is Ownable, ERC20Burnable {
    IWeightedSwap public swap;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        swap = IWeightedSwap(msg.sender);
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(_amount > 0, "zeroMintAmount");
        _mint(_to, _amount);
    }
}
