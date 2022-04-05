// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.8.13;

/*
    Bancor Formula interface
*/
interface IWeightedFormulaV2 {
    struct PricingData {
        uint256 reserveIn;
        uint256 reserveOut;
        uint256 vReserveIn;
        uint256 vReserveOut;
        uint32 tokenWeightIn;
        uint32 tokenWeightOut;
        uint32 swapFee;
    }

    // function getReserveAndWeights(address pair, address tokenA) external view returns (PricingData calldata);

    // function getFactoryReserveAndWeights(
    //     address factory,
    //     address pair,
    //     address tokenA
    // ) external view returns (PricingData calldata);

    function getAmountIn(uint256 amountOut, PricingData calldata pricingData) external view returns (uint256 amountIn);

    // function getPairAmountIn(
    //     address pair,
    //     address tokenIn,
    //     uint256 amountOut
    // ) external view returns (uint256 amountIn);

    function getAmountOut(uint256 amountIn, PricingData calldata pricingData) external view returns (uint256 amountOut);

    // function getPairAmountOut(
    //     address pair,
    //     address tokenIn,
    //     uint256 amountIn
    // ) external view returns (uint256 amountOut);

    // function getAmountsIn(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     address[] calldata path
    // ) external view returns (uint256[] memory amounts);

    // function getFactoryAmountsIn(
    //     address factory,
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountOut,
    //     address[] calldata path
    // ) external view returns (uint256[] memory amounts);

    // function getAmountsOut(
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountIn,
    //     address[] calldata path
    // ) external view returns (uint256[] memory amounts);

    // function getFactoryAmountsOut(
    //     address factory,
    //     address tokenIn,
    //     address tokenOut,
    //     uint256 amountIn,
    //     address[] calldata path
    // ) external view returns (uint256[] memory amounts);

    function ensureConstantValue(
        uint256 reserve0,
        uint256 reserve1,
        uint256 balance0Adjusted,
        uint256 balance1Adjusted,
        uint32 tokenWeight0
    ) external view returns (bool);

    function getReserves(
        address pair,
        address tokenA,
        address tokenB
    )
        external
        view
        returns (
            uint256 reserveA,
            uint256 reserveB,
            uint256 vReserveA,
            uint256 vReserveB
        );

    function getOtherToken(address pair, address tokenA) external view returns (address tokenB);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function sortTokens(address tokenA, address tokenB) external pure returns (address token0, address token1);

    function mintLiquidityFee(
        uint256 totalLiquidity,
        uint256 reserve0,
        uint256 reserve1,
        uint32 tokenWeight0,
        uint112 collectedFee0,
        uint112 collectedFee1
    ) external view returns (uint256 amount);
}
