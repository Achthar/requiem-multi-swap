// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./IRequiemERC20.sol";
import "./IMinimalSwapInfo.sol";

interface IRequiem2Pool is IRequiemERC20, IMinimalSwapInfo {
    event PaidProtocolFee(uint256 collectedFee0, uint256 collectedFee1);
    event Mint(address indexed sender, uint256 amount0, uint256 amount1);
    event Burn(address indexed sender, uint256 amount0, uint256 amount1, address indexed to);
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);
    event Sync(uint256 reserve0, uint256 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint256);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (
            uint256 reserve0,
            uint256 reserve1,
            uint32 blockTimestampLast
        );

    function getCollectedFees() external view returns (uint256 _collectedFee0, uint256 _collectedFee1);

    function getTokenWeights() external view returns (uint256 tokenWeight0, uint256 tokenWeight1);

    function getSwapFee() external view returns (uint32);

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function skim(address to) external;

    function sync() external;

    struct NewPoolParams {
        string name;
        string symbol;
        address token0;
        address token1;
        uint256 normalizedWeight0;
        uint256 normalizedWeight1;
        uint32 swapFeePercentage;
    }

    function initialize(
        address token0,
        address token1,
        uint256 normalizedWeight0,
        uint32 swapFeePercentage
    ) external;
}
