// SPDX-License-Identifier: GPL-3.0-or-later
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.8.13;

// These functions start with an underscore, as if they were part of a contract and not a library. At some point this
// should be fixed.
// solhint-disable private-vars-leading-underscore

interface IRequiemWeightedMath {
    function _MIN_WEIGHT() external pure returns (uint256);

    // Having a minimum normalized weight imposes a limit on the maximum number of tokens;
    // i.e., the largest possible pool is one where all tokens have exactly the minimum weight.
    function _MAX_WEIGHTED_TOKENS() external pure returns (uint256);

    // Pool limits that arise from limitations in the fixed point power function (and the imposed 1:100 maximum weight
    // ratio).

    // Swap limits: amounts swapped may not be larger than this percentage of total balance.
    function _MAX_IN_RATIO() external pure returns (uint256);

    function _MAX_OUT_RATIO() external pure returns (uint256);

    // Invariant growth limit: non-proportional joins cannot cause the invariant to increase by more than this ratio.
    function _MAX_INVARIANT_RATIO() external pure returns (uint256);

    // Invariant shrink limit: non-proportional exits cannot cause the invariant to decrease by less than this ratio.
    function _MIN_INVARIANT_RATIO() external pure returns (uint256);

    // Invariant is used to collect protocol swap fees by comparing its value between two times.
    // So we can round always to the same direction. It is also used to initiate the BPT amount
    // and, because there is a minimum BPT, we round down the invariant.
    function _calculateInvariant(uint256[] memory normalizedWeights, uint256[] memory balances) external pure returns (uint256 invariant);

    // Computes how many tokens can be taken out of a pool if `amountIn` are sent, given the
    // current balances and weights.
    function _calcOutGivenIn(
        uint256 balanceIn,
        uint256 weightIn,
        uint256 balanceOut,
        uint256 weightOut,
        uint256 amountIn
    ) external pure returns (uint256);

    // Computes how many tokens must be sent to a pool in order to take `amountOut`, given the
    // current balances and weights.
    function _calcInGivenOut(
        uint256 balanceIn,
        uint256 weightIn,
        uint256 balanceOut,
        uint256 weightOut,
        uint256 amountOut
    ) external pure returns (uint256);

    function _calcBptOutGivenExactTokensIn(
        uint256[] memory balances,
        uint256[] memory normalizedWeights,
        uint256[] memory amountsIn,
        uint256 bptTotalSupply,
        uint256 swapFeePercentage
    ) external pure returns (uint256, uint256[] memory);

    /**
     * @dev Intermediate function to avoid stack-too-deep "
     */
    // function _computeJoinExactTokensInInvariantRatio(
    //     uint256[] memory balances,
    //     uint256[] memory normalizedWeights,
    //     uint256[] memory amountsIn,
    //     uint256[] memory balanceRatiosWithFee,
    //     uint256 invariantRatioWithFees,
    //     uint256 swapFeePercentage
    // ) external pure returns (uint256 invariantRatio, uint256[] memory swapFees);

    function _calcTokenInGivenExactBptOut(
        uint256 balance,
        uint256 normalizedWeight,
        uint256 bptAmountOut,
        uint256 bptTotalSupply,
        uint256 swapFeePercentage
    ) external pure returns (uint256 amountIn, uint256 swapFee);

    function _calcAllTokensInGivenExactBptOut(
        uint256[] memory balances,
        uint256 bptAmountOut,
        uint256 totalBPT
    ) external pure returns (uint256[] memory);

    function _calcBptInGivenExactTokensOut(
        uint256[] memory balances,
        uint256[] memory normalizedWeights,
        uint256[] memory amountsOut,
        uint256 bptTotalSupply,
        uint256 swapFeePercentage
    ) external pure returns (uint256, uint256[] memory);

    /**
     * @dev Intermediate function to avoid stack-too-deep "
     */
    // function _computeExitExactTokensOutInvariantRatio(
    //     uint256[] memory balances,
    //     uint256[] memory normalizedWeights,
    //     uint256[] memory amountsOut,
    //     uint256[] memory balanceRatiosWithoutFee,
    //     uint256 invariantRatioWithoutFees,
    //     uint256 swapFeePercentage
    // ) external pure returns (uint256 invariantRatio, uint256[] memory swapFees);

    function _calcTokenOutGivenExactBptIn(
        uint256 balance,
        uint256 normalizedWeight,
        uint256 bptAmountIn,
        uint256 bptTotalSupply,
        uint256 swapFeePercentage
    ) external pure returns (uint256 amountOut, uint256 swapFee);

    function _calcTokensOutGivenExactBptIn(
        uint256[] memory balances,
        uint256 bptAmountIn,
        uint256 totalBPT
    ) external pure returns (uint256[] memory);

    function _calcDueTokenProtocolSwapFeeAmount(
        uint256 balance,
        uint256 normalizedWeight,
        uint256 previousInvariant,
        uint256 currentInvariant,
        uint256 protocolSwapFeePercentage
    ) external pure returns (uint256);
}
