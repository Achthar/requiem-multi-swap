// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./interfaces/IRequiemWeightedPairFactory.sol";
import "./libraries/EnumerableSet.sol";
import "./RequiemWeightedPair.sol";

// solhint-disable no-inline-assembly

contract RequiemWeightedPairFactory is IRequiemWeightedPairFactory {
    using EnumerableSet for EnumerableSet.AddressSet;

    address public feeTo;
    address public formula;
    uint256 public protocolFee;
    address public feeToSetter;
    bytes32 public constant INIT_CODE_HASH = keccak256(abi.encodePacked(type(RequiemWeightedPair).creationCode));

    mapping(bytes32 => address) private _pairSalts;
    address[] public allPairs;
    mapping(address => uint64) private _pairs;

    mapping(IERC20 => mapping(IERC20 => EnumerableSet.AddressSet)) internal tokenPairs;

    constructor(address _feeToSetter, address _formula) {
        feeToSetter = _feeToSetter;
        formula = _formula;
    }

    function isPair(address b) external view returns (bool) {
        return _pairs[b] > 0;
    }

    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    function getPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 swapFee
    ) external view returns (address pair) {
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0, swapFee));
        pair = _pairSalts[salt];
    }

    function createPair(
        address tokenA,
        address tokenB,
        uint32 tokenWeightA,
        uint32 swapFee
    ) external returns (address pair) {
        require(tokenA != tokenB, "RLP: IA");
        require(tokenWeightA >= 2 && tokenWeightA <= 98 && (tokenWeightA % 2) == 0, "RLP: IW");
        // swap fee from [0.01% - 20%]
        require(swapFee >= 1 && swapFee <= 2000, "RLP: ISF");
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        require(token0 != address(0), "RLP: ZA");
        // single check is sufficient
        bytes memory bytecode = type(RequiemWeightedPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0, swapFee));
        require(_pairSalts[salt] == address(0), "RLP: PE");
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IRequiemWeightedPair(pair).initialize(token0, token1, tokenWeight0, swapFee);

        tokenPairs[IERC20(token0)][IERC20(token1)].add(pair);
        tokenPairs[IERC20(token1)][IERC20(token0)].add(pair);

        _pairSalts[salt] = address(pair);
        allPairs.push(pair);
        uint64 weightAndFee = uint64(swapFee);
        weightAndFee |= uint64(tokenWeight0) << 32;
        _pairs[address(pair)] = weightAndFee;
        emit PairCreated(token0, token1, pair, tokenWeight0, swapFee, allPairs.length);
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
        uint64 weightAndFee = _pairs[pair];
        if (weightAndFee > 0) {
            swapFee = uint32(weightAndFee);
            tokenWeight0 = uint32(weightAndFee >> 32);
            tokenWeight1 = 100 - tokenWeight0;
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
}
