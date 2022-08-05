// SPDX-License-Identifier: MIT

pragma solidity >=0.8.15;

import "../interfaces/poolPair/IWeightedPair.sol";

// solhint-disable reason-string, max-line-length

contract WeightedPairAdmin {
    // tracks the governance addres per pair - can be a contract or an individual
    mapping(address => address) public pairGovernances;

    // provides pair-individual protocol fees
    mapping(address => uint256) private _protocolFees;

    // recipient address of protocol fees
    address public feeTo;

    // contoller of this contract
    address public controller;

    // pair factory - gets access to initializer
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

    // Set values read by pairs
    function setFeeTo(address _newFeeTo) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        feeTo = _newFeeTo;
    }

    function setProtocolFee(address _pair, uint256 _newFee) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        _protocolFees[_pair] = _newFee;
    }

    function protocolFee(address _pair) public view returns (uint256) {
        return _protocolFees[_pair];
    }

    // initializer for factory
    function inititalizePairAdministration(
        address _pair,
        address _formula,
        address _governance,
        uint256 _protocolFee,
        uint32 _swapFee,
        uint32 _amp
    ) external {
        require(msg.sender == factory, "Caller can only be the factory");
        _protocolFees[_pair] = _protocolFee;
        IWeightedPair(_pair).setSwapFee(_swapFee);
        IWeightedPair(_pair).setAmplification(_amp);
        IWeightedPair(_pair).setFormula(_formula);
        pairGovernances[_pair] = _governance;
    }

    /// Functions to set pair parameters

    function switchPairAdmin(address _newAdmin, address _pair) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        IWeightedPair(_pair).switchAdmin(_newAdmin);
    }

    function setPairAmplification(uint32 _newAmp, address _pair) external {
        require(msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be pair governance");
        IWeightedPair(_pair).setAmplification(_newAmp);
    }

    function setPairSwapFee(uint32 _newSwapFee, address _pair) external {
        require(msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be pair governance");
        IWeightedPair(_pair).setSwapFee(_newSwapFee);
    }

    function pushGovernance(address _governance, address _pair) external {
        require(msg.sender == controller || msg.sender == factory || msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be controller, pair governance or factory");
        pairGovernances[_pair] = _governance;
    }

    function pullGovernance(address _pair) external {
        require(msg.sender == controller, "Unauthorized: Caller has be controller");
        pairGovernances[_pair] = address(0);
    }
}
