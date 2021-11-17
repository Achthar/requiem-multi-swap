// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./IRequiemERC20.sol";

interface IRequiemSwapInterface {
    event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to);


    function tokens() external view returns (address[] memory);

    function swapStruct(
        uint256 amount0Out,
        uint256 amount1Out,
        uint index0,
        uint index1,
        address to,
        bytes calldata data
    ) external;

    function getReserves()
        external
        view
        returns (
            uint256[] memory reserves,
            uint32 blockTimestampLast
        );

    function getCollectedFees() external view returns (uint256[] memory _collectedFees);

    function getTokenWeights() external view returns (uint32 tokenWeight0, uint32 tokenWeight1);

    function getSwapFee() external view returns (uint32);

    function price0CumulativeLast() external view returns (uint256);

    function price1CumulativeLast() external view returns (uint256);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to) external returns (uint256 amount0, uint256 amount1);

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(
        address,
        address,
        uint32,
        uint32
    ) external;
}
