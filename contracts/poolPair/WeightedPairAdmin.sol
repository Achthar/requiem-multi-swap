// SPDX-License-Identifier: MIT

pragma solidity >=0.8.17;

import "../interfaces/poolPair/IWeightedPair.sol";

// solhint-disable reason-string, max-line-length

contract WeightedPairAdmin {
    address public defaultGovernance;
    uint256 public defaultProtocolFee;
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

    modifier onlyController() {
        require(msg.sender == controller, "Unauthorized: Caller is not the controller");
        _;
    }

    /// General control
    function changeController(address _newController) external onlyController {
        controller = _newController;
    }

    function setFactory(address _newFactory) external onlyController {
        factory = _newFactory;
    }

    // Set values read by pairs
    function setFeeTo(address _newFeeTo) external onlyController {
        feeTo = _newFeeTo;
    }

    function setProtocolFee(address _pair, uint256 _newFee) external onlyController {
        _protocolFees[_pair] = _newFee;
    }

    function protocolFee(address _pair) public view returns (uint256) {
        return _protocolFees[_pair];
    }

    // initializer for factory
    function inititalizePairAdministration(
        address _pair,
        address _formula,
        uint32 _swapFee,
        uint32 _amp
    ) external {
        require(msg.sender == factory, "Caller is not the factory");
        require(_amp >= 10000 && _swapFee <= 500, "RLP: ISP");
        _protocolFees[_pair] = defaultProtocolFee;
        IWeightedPair(_pair).setSwapFee(_swapFee);
        IWeightedPair(_pair).setAmplification(_amp);
        IWeightedPair(_pair).setFormula(_formula);
        pairGovernances[_pair] = defaultGovernance;
    }

    /// Functions to set pair parameters

    function switchPairAdmin(address _pair, address _newAdmin) external onlyController {
        IWeightedPair(_pair).switchAdmin(_newAdmin);
    }

    function setPairAmplification(address _pair, uint32 _newAmp) external {
        require(msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be pair governance");
        IWeightedPair(_pair).setAmplification(_newAmp);
    }

    function setPairSwapFee(address _pair, uint32 _newSwapFee) external {
        require(msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be pair governance");
        IWeightedPair(_pair).setSwapFee(_newSwapFee);
    }

    function setDefaultProtocolFee(uint256 _newProtocolFee) external onlyController {
        require(_newProtocolFee <= 50000);
        defaultProtocolFee = _newProtocolFee;
    }

    function pushGovernance(address _pair, address _governance) external {
        require(msg.sender == controller || msg.sender == factory || msg.sender == pairGovernances[_pair], "Unauthorized: Caller has be controller, pair governance or factory");
        pairGovernances[_pair] = _governance;
    }

    function pullGovernance(address _pair) external onlyController {
        pairGovernances[_pair] = address(0);
    }
}
