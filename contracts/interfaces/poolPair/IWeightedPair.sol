// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "./IWeightedPairERC20.sol";

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
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);

    // function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

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

    function setSwapParams(
        address,
        uint32,
        uint32
    ) external;

    function sync() external;

    function initialize(
        address,
        address,
        uint32
    ) external;
}
