// SPDX-License-Identifier: MIT

pragma solidity >=0.8.16;

import "../interfaces/poolBase/IPoolFeeManagement.sol";

// solhint-disable reason-string, max-line-length

contract PoolAdmin {
    // tracks the governance addres per pool - can be a contract or an individual
    mapping(address => address) private _poolGovernances;

    // provides pool-individual protocol fees
    mapping(address => uint256) private _protocolFees;

    // contoller of this contract
    address public controller;

    // pool factory - gets access to initializer
    address public factory;

    // modifiers
    modifier onlyController() {
        require(msg.sender == controller, "Unauthorized: Caller has be the controller");
        _;
    }

    modifier onlyGovernance(address _pool) {
        require(msg.sender == _poolGovernances[_pool], "Unauthorized: Caller has be the pool governance");
        _;
    }

    constructor() {
        controller = msg.sender;
    }

    /// General control

    function changeController(address _newController) external onlyController {
        controller = _newController;
    }

    function setFactory(address _newFactory) external onlyController {
        factory = _newFactory;
    }

    function setProtocolFee(address _pool, uint256 _newFee) external onlyController {
        _protocolFees[_pool] = _newFee;
    }

    /// views for fees and governance

    function protocolFee(address _pool) public view returns (uint256) {
        return _protocolFees[_pool];
    }

    function poolGovernance(address _pool) public view returns (address) {
        return _poolGovernances[_pool];
    }

    /// Functions to set pool parameters

    function switchPoolAdmin(address _pool, address _newAdmin) external onlyController {
        IPoolFeeManagement(_pool).transferAdministration(_newAdmin);
    }

    function setPoolFlashLoanFee(address _pool, uint256 _newFlashFee) external onlyGovernance(_pool) {
        IPoolFeeManagement(_pool).setFlashFee(_newFlashFee);
    }

    function setPoolSwapFee(address _pool, uint256 _newSwapFee) external onlyGovernance(_pool) {
        IPoolFeeManagement(_pool).setSwapFee(_newSwapFee);
    }

    function setPoolWithdrawFee(
        address _pool,
        uint256 _withdrawDuration,
        uint256 _withdrawFee
    ) external onlyGovernance(_pool) {
        IPoolFeeManagement(_pool).setWithdrawFee(_withdrawDuration, _withdrawFee);
    }

    /// Manage governance contracts or addresses

    function pushGovernance(address _pool, address _governance) external {
        require(msg.sender == controller || msg.sender == factory || msg.sender == _poolGovernances[_pool], "Unauthorized: Caller has be the controller, pool governance or factory");
        _poolGovernances[_pool] = _governance;
    }

    function pullGovernance(address _pool) external onlyController {
        _poolGovernances[_pool] = address(0);
    }
}
