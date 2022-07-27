// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "../interfaces/poolStable/IStablePoolFactory.sol";
import "../interfaces/poolStable/IStablePoolCreator.sol";
import "../libraries/SafeERC20.sol";

// solhint-disable max-line-length

contract StablePoolFactory is IStablePoolFactory {
    using SafeERC20 for IERC20;

    address public override feeTo;
    address public override feeToSetter;
    uint256 public feeAmount;

    address[] public override allPools;
    mapping(address => bool) private _pools;
    IStablePoolCreator public swapCreator;
    bool private _initialized = false;

    function initialize(address _feeToSetter, IStablePoolCreator _swapCreator) public {
        require(_initialized == false, "StableSwapFactory: initialized");
        feeToSetter = _feeToSetter;
        swapCreator = _swapCreator;
        _initialized = true;
    }

    function isPool(address b) external view override returns (bool) {
        return _pools[b];
    }

    function allPoolsLength() external view override returns (uint256) {
        return allPools.length;
    }

    function createPool(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) external override returns (address) {
        address swap = createPoolInternal(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, _withdrawFee);

        return swap;
    }

    function createPoolInternal(
        address[] memory _pooledTokens,
        uint8[] memory decimals,
        string memory lpTokenName,
        string memory lpTokenSymbol,
        uint256 _a,
        uint256 _fee,
        uint256 _flashFee,
        uint256 _withdrawFee
    ) public returns (address) {
        address swap = IStablePoolCreator(swapCreator).create(_pooledTokens, decimals, lpTokenName, lpTokenSymbol, _a, _fee, _flashFee, feeAmount, _withdrawFee, feeToSetter, msg.sender);

        allPools.push(swap);
        _pools[swap] = true;
        emit SwapCreated(_pooledTokens, swap, allPools.length);
        return swap;
    }

    function setSwapCreator(IStablePoolCreator _swapCreator) external {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        swapCreator = _swapCreator;
    }

    function setFeeTo(address _feeTo) external override {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        feeTo = _feeTo;
        emit SetFeeTo(_feeTo);
    }

    function setFeeToSetter(address _feeToSetter) external override {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }

    function setFeeAmount(uint256 _feeAmount) external override {
        require(msg.sender == feeToSetter, "REQ: FORBIDDEN");
        feeAmount = _feeAmount;
        emit SetFeeAmount(_feeAmount);
    }
}