// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/IWeightedPairFactory.sol";
import "./libraries/EnumerableSet.sol";
import "./WeightedPair.sol";

// solhint-disable no-inline-assembly

contract RequiemPairFactory is IWeightedPairFactory {
    using EnumerableSet for EnumerableSet.AddressSet;

    address public feeTo;
    address public formula;
    uint256 public protocolFee;
    address public feeToSetter;
    address public pairGovernance;

    mapping(bytes32 => address) private _pairSalts;
    uint256 private _pairCount;
    mapping(address => bool) private _pairs;

    mapping(address => mapping(address => EnumerableSet.AddressSet)) private tokenPairs;

    constructor(
        address _feeToSetter,
        address _formula,
        address _pairGovernance
    ) {
        feeToSetter = _feeToSetter;
        formula = _formula;
        pairGovernance = _pairGovernance;
    }

    // ===== views =====
    function isPair(address b) external view returns (bool) {
        return _pairs[b];
    }

    function allPairsLength() external view returns (uint256) {
        return _pairCount;
    }

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA
    ) external view returns (address pair) {
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        pair = _pairSalts[salt];
    }

    /**
     * @notice Creates a new pair with specified parameters - only one pair for a fixed set of weights cabn exist
     * @param tokenA first token
     * @param tokenB second token
     * @param tokenWeightA first token weight
     * @param initialFee initial swapFee
     * @param initialAmp initial amplification parameter
     */
    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 initialFee,
        uint32 initialAmp
    ) external returns (address pair) {
        require(tokenA != tokenB, "RLP: IA");
        require(tokenWeightA >= 2 && tokenWeightA <= 98 && (tokenWeightA % 2) == 0, "RLP: IW");

        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        require(token0 != address(0), "RLP: ZA");
        // single check is sufficient
        bytes memory bytecode = type(RequiemPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        require(_pairSalts[salt] == address(0), "RLP: PE");
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IWeightedPair(pair).initialize(token0, token1, tokenWeight0);
        IWeightedPair(pair).setSwapParams(initialFee, initialAmp);

        tokenPairs[token0][token1].add(pair);
        tokenPairs[token1][token0].add(pair);

        _pairSalts[salt] = address(pair);
        _pairCount += 1;
        _pairs[address(pair)] = true;
        emit PairCreated(token0, token1, pair, tokenWeight0, _pairCount);
    }

    /**
     * @notice Sets the protocol fee
     * @param _protocolFee new protocol fee
     */
    function setFeeParameters(
        address _feeToSetter,
        address _feeTo,
        uint256 _protocolFee
    ) external {
        require(msg.sender == feeToSetter, "RLP: F");
        require(_protocolFee == 0 || (_protocolFee >= 10**3 && _protocolFee <= 10**5), "RLP: IPF");
        protocolFee = _protocolFee;
        feeToSetter = _feeToSetter;
        feeTo = _feeTo;
    }

    function getParameters(address pair)
        public
        view
        returns (
            uint32 tokenWeight0,
            uint32 tokenWeight1,
            uint32 swapFee,
            uint32 amp
        )
    {
        if (_pairs[pair]) {
            (tokenWeight0, tokenWeight1, swapFee, amp) = IWeightedPair(pair).getParameters();
        }
    }

    /**
     * @notice Function to get  all deployed configs for a token pair
     * @param token0 first token
     * @param token1 second token
     * @return _tokenPairs array of deployed pairs
     */
    function getPairs(address token0, address token1) external view returns (address[] memory _tokenPairs) {
        uint256 length = tokenPairs[token0][token1].length();
        _tokenPairs = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _tokenPairs[i] = tokenPairs[token0][token1].at(i);
        }
    }

    /**
     * @notice sets the crucial swap parameters for the pair
     * @param _pair pair to change
     * @param _newSwapFee new seleted swap fee
     * @param _amp new amplification parameter
     */
    function setSwapParams(
        address _pair,
        uint32 _newSwapFee,
        uint32 _amp
    ) external {
        require(msg.sender == pairGovernance, "unauthorized");
        // 0.01% - 5% fee range for swapFee and amplification parameter has to be >1
        require(_newSwapFee >= 0 && _newSwapFee <= 500 && _amp >= 10000, "RLP: ISF");
        IWeightedPair(_pair).setSwapParams(_newSwapFee, _amp);
        IWeightedPair(_pair).sync();
    }

    function setGovernance(address _newGov) external {
        require(msg.sender == pairGovernance, "unauthorized");
        pairGovernance = _newGov;
    }
}
