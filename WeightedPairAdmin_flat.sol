
// File: contracts/interfaces/poolPair/IWeightedPairERC20.sol



pragma solidity ^0.8.17;

// solhint-disable func-name-mixedcase

interface IWeightedPairERC20 {
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Transfer(address indexed from, address indexed to, uint256 value);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address owner) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 value) external returns (bool);

    function transfer(address to, uint256 value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint256);

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;
}

// File: contracts/interfaces/poolPair/IWeightedPair.sol



pragma solidity ^0.8.17;


// solhint-disable func-name-mixedcase

interface IWeightedPair is IWeightedPairERC20 {
    struct ReserveData {
        uint256 reserve0;
        uint256 reserve1;
        uint256 vReserve0;
        uint256 vReserve1;
    }

    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out);

    function admin() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves() external view returns (ReserveData calldata reserveData);

    function getCollectedFees() external view returns (uint112 _collectedFee0, uint112 _collectedFee1);

    function getParameters()
        external
        view
        returns (
            uint32 _tokenWeight0,
            uint32 _tokenWeight1,
            uint32 _swapFee,
            uint32 _amp
        );

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function setSwapFee(uint32 _newSwapFee) external;

    function setAmplification(uint32 _newAmp) external;

    function switchAdmin(address _newAdmin) external;

    function setFormula(address _newFormula) external;

    function sync() external;

    function initialize(
        address,
        address,
        address,
        uint32
    ) external;
}

// File: contracts/poolPair/WeightedPairAdmin.sol



pragma solidity >=0.8.17;


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
