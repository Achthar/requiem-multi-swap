// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./interfaces/IRequiem2PoolFactory.sol";
import "./Requiem2Pool.sol";

contract Requiem2PoolFactory is IRequiem2PoolFactory {
    address public feeTo;
    address public formula;
    uint256 public protocolFee;
    address public feeToSetter;
    address public weightedMath;

    mapping(bytes32 => address) private _poolSalts;
    address[] public allPools;
    mapping(address => uint64) private _pools;

    constructor(
        address _feeToSetter,
        address _formula,
        address _weightedMath
    ) {
        feeToSetter = _feeToSetter;
        formula = _formula;
        weightedMath = _weightedMath;
    }

    function isPool(address b) external view returns (bool) {
        return _pools[b] > 0;
    }

    function allPoolsLength() external view returns (uint256) {
        return allPools.length;
    }

    function getPool(
        address token0,
        address token1,
        uint256 normalizedWeight0,
        uint32 swapFeePercentage
    ) external view returns (address pool) {
        address tokenA = token0;
        address tokenB = token1;
        uint256 tokenWeightA = normalizedWeight0;
        uint32 swapFee = swapFeePercentage;
        (address _token0, address _token1, uint256 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        bytes32 salt = keccak256(abi.encodePacked(_token0, _token1, tokenWeight0, swapFee));
        pool = _poolSalts[salt];
    }

    function createPool(
        address token0,
        address token1,
        uint32 normalizedWeight0,
        uint32 swapFeePercentage
    ) external returns (address pool) {
        address tokenA = token0;
        address tokenB = token1;
        uint32 tokenWeightA = normalizedWeight0;
        uint32 swapFee = swapFeePercentage;
        require(tokenA != tokenB, "RLP: IDENTICAL_ADDRESSES");
        require(tokenWeightA >= 2 && tokenWeightA <= 98 && (tokenWeightA % 2) == 0, "RLP: INVALID_TOKEN_WEIGHT");
        // swap fee from [0.01% - 20%]
        require(swapFee >= 1 && swapFee <= 2000, "RLP: INVALID_SWAP_FEE");
        (address token0, address token1, uint32 tokenWeight0) = tokenA < tokenB ? (tokenA, tokenB, tokenWeightA) : (tokenB, tokenA, 100 - tokenWeightA);
        require(token0 != address(0), "RLP: ZERO_ADDRESS");
        // single check is sufficient
        bytes memory bytecode = type(Requiem2Pool).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1, tokenWeight0, swapFee));
        require(_poolSalts[salt] == address(0), "RLP: POOL_EXISTS");
        assembly {
            pool := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        IRequiem2Pool(pool).initialize(token0, token1, uint256(tokenWeight0) * 1e16, swapFee);
        _poolSalts[salt] = address(pool);
        allPools.push(pool);
        uint64 weightAndFee = uint64(swapFee);
        weightAndFee |= uint64(tokenWeight0) << 32;
        _pools[address(pool)] = weightAndFee;
        emit PoolCreated(token0, token1, pool, tokenWeight0, swapFee, allPools.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "RLP: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "RLP: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setProtocolFee(uint256 _protocolFee) external {
        require(msg.sender == feeToSetter, "RLP: FORBIDDEN");
        require(_protocolFee == 0 || (_protocolFee >= 10000 && _protocolFee <= 100000), "RLP: Invalid Protocol fee");
        protocolFee = _protocolFee;
    }

    function getWeightsAndSwapFee(address pool)
        public
        view
        returns (
            uint256 tokenWeight0,
            uint256 tokenWeight1,
            uint32 swapFee
        )
    {
        uint64 weightAndFee = _pools[pool];
        if (weightAndFee > 0) {
            swapFee = uint32(weightAndFee);
            tokenWeight0 = uint256(weightAndFee >> 32);
            tokenWeight1 = 100 - tokenWeight0;
        } else {
            // Default is 0.3%
            return (50, 50, 30);
        }
    }
}
