// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "./interfaces/IRequiemWeightedPairFactoryV2.sol";
import "./libraries/EnumerableSet.sol";
import "./libraries/Ownable.sol";
import "./WeightedPairV2.sol";

// solhint-disable no-inline-assembly

contract RequiemWeightedPairFactoryV2 is IRequiemWeightedPairFactoryV2, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;

    address public feeTo;
    address public formula;
    uint256 public protocolFee;
    address public feeToSetter;
    address public swapFeeGovernance;
    bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(RequiemWeightedPairV2).creationCode));

    mapping(bytes32 => address) private _pairSalts;
    address[] public allPairs;
    mapping(address => bool) private _pairs;

    mapping(IERC20 => mapping(IERC20 => EnumerableSet.AddressSet)) internal tokenPairs;

    address public pairGovernance;

    constructor(
        address _feeToSetter,
        address _formula,
        address _pairGovernance
    ) {
        feeToSetter = _feeToSetter;
        formula = _formula;
        pairGovernance = _pairGovernance;
    }

    function isPair(address b) external view returns (bool) {
        return _pairs[b];
    }

    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
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
        bytes memory bytecode = type(RequiemWeightedPairV2).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0));
        require(_pairSalts[salt] == address(0), "RLP: PE");
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IRequiemWeightedPairV2(pair).initialize(token0, token1, tokenWeight0);

        // swap fee from [0.01% - 20%]
        IRequiemWeightedPairV2(pair).setSwapParams(initialFee, initialAmp);

        tokenPairs[IERC20(token0)][IERC20(token1)].add(pair);
        tokenPairs[IERC20(token1)][IERC20(token0)].add(pair);

        _pairSalts[salt] = address(pair);
        allPairs.push(pair);
        _pairs[address(pair)] = true;
        emit PairCreated(token0, token1, pair, tokenWeight0, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "RLP: F");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "RLP: F");
        feeToSetter = _feeToSetter;
    }

    function setProtocolFee(uint256 _protocolFee) external {
        require(msg.sender == feeToSetter, "RLP: F");
        require(_protocolFee == 0 || (_protocolFee >= 10000 && _protocolFee <= 100000), "RLP: IPF");
        protocolFee = _protocolFee;
    }

    function getWeightsAndSwapFee(address pair)
        public
        view
        returns (
            uint32 tokenWeight0,
            uint32 tokenWeight1,
            uint32 swapFee
        )
    {
        if (_pairs[pair]) {
            (tokenWeight0, tokenWeight1) = IRequiemWeightedPairV2(pair).getTokenWeights();
            swapFee = IRequiemWeightedPairV2(pair).getSwapFee();
        } else {
            // Default is 0.3%
            return (50, 50, 30);
        }
    }

    function getPairs(IERC20 token0, IERC20 token1) external view returns (address[] memory _tokenPairs) {
        uint256 length = tokenPairs[token0][token1].length();
        _tokenPairs = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            _tokenPairs[i] = tokenPairs[token0][token1].at(i);
        }
    }

    function withdrawFee(address _pair, address _to) public {
        require(msg.sender == feeTo, "unauthorized");
        RequiemWeightedPairV2(_pair).withdrawAdminFee(_to);
    }

    function setSwapParams(
        address _pair,
        uint32 _newSwapFee,
        uint32 _amp
    ) external {
        require(msg.sender == pairGovernance || msg.sender == owner(), "unauthorized");
        RequiemWeightedPairV2(_pair).setSwapParams(_newSwapFee, _amp);
    }
}
