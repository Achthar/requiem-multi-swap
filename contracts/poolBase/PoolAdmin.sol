// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

import "../interfaces/poolBase/IPoolFeeManagement.sol";

// solhint-disable reason-string, max-line-length

contract PoolAdmin {
    // tracks the governance addres per pool - can be a contract or an individual
    mapping(address => address) public poolGovernances;

    // provides pool-individual protocol fees
    mapping(address => uint256) private _protocolFees;

    // recipient address of protocol fees
    address public feeTo;

    // contoller of this contract
    address public controller;

    // pool factory - gets access to initializer
    address public factory;

    constructor() {
        controller = msg.sender;
    }

    /// General control
    function changeController(address _newController) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        controller = _newController;
    }

    function setFactory(address _newFactory) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        factory = _newFactory;
    }

    // Set values read by pools
    function setFeeTo(address _newFeeTo) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        feeTo = _newFeeTo;
    }

    function setProtocolFee(address _pool, uint256 _newFee) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        _protocolFees[_pool] = _newFee;
    }

    function protocolFee(address _pool) public view returns (uint256) {
        return _protocolFees[_pool];
    }

    /// Functions to set pool parameters

    function switchPoolAdmin(address _pool, address _newAdmin) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        IPoolFeeManagement(_pool).transferAdministration(_newAdmin);
    }

    function setPoolFlashLoanFee(address _pool, uint256 _newFlashFee) external {
        require(msg.sender == poolGovernances[_pool], "Unauthorized: Caller has be pool governance");
        IPoolFeeManagement(_pool).setFlashFee(_newFlashFee);
    }

    function setPoolSwapFee(address _pool, uint256 _newSwapFee) external {
        require(msg.sender == poolGovernances[_pool], "Unauthorized: Caller has be pool governance");
        IPoolFeeManagement(_pool).setSwapFee(_newSwapFee);
    }

    /// Manage governance contracts or addresses

    function pushGovernance(address _pool, address _governance) external {
        require(msg.sender == controller || msg.sender == factory || msg.sender == poolGovernances[_pool], "Unauthorized: Caller has be controller, pool governance or factory");
        poolGovernances[_pool] = _governance;
    }

    function pullGovernance(address _pool) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        poolGovernances[_pool] = address(0);
    }
}
