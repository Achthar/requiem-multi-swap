// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "./FixedPoint.sol";
import "./Math.sol";

// These functions start with an underscore, as if they were part of a contract and not a library.

// solhint-disable private-vars-leading-underscore

library BalancedMath {
    using FixedPoint for uint256;

    // Pool limits that arise from limitations in the fixed point power function (and the imposed 1:100 maximum weight
    // ratio).

    // Swap limits: amounts swapped may not be larger than this percentage of total balance.
    uint256 internal constant _MAX_IN_RATIO = 0.3e18;
    uint256 internal constant _MAX_OUT_RATIO = 0.3e18;

    // Invariant growth limit: non-proportional joins cannot cause the invariant to increase by more than this ratio.
    uint256 internal constant _MAX_INVARIANT_RATIO = 3e18;
    // Invariant shrink limit: non-proportional exits cannot cause the invariant to decrease by less than this ratio.
    uint256 internal constant _MIN_INVARIANT_RATIO = 0.7e18;

    // About swap fees on joins and exits:
    // Any join or exit that is not perfectly balanced (e.g. all single token joins or exits) is mathematically
    // equivalent to a perfectly balanced join or  exit followed by a series of swaps. Since these swaps would charge
    // swap fees, it follows that (some) joins and exits should as well.
    // On these operations, we split the token amounts in 'taxable' and 'non-taxable' portions, where the 'taxable' part
    // is the one to which swap fees are applied.

    function _calcLpOutGivenExactTokensIn(
        uint256[] memory balances,
        uint256[] memory amountsIn,
        uint256 singleWeight,
        uint256 lpTotalSupply,
        uint256 swapFeePercentage
    ) internal pure returns (uint256, uint256[] memory) {
        // BPT out, so we round down overall.

        uint256[] memory balanceRatiosWithFee = new uint256[](amountsIn.length);

        uint256 invariantRatioWithFees = 0;
        for (uint256 i = 0; i < balances.length; i++) {
            balanceRatiosWithFee[i] = (balances[i] + amountsIn[i]).divDown(balances[i]);
            invariantRatioWithFees = (invariantRatioWithFees + balanceRatiosWithFee[i].mulDown(singleWeight));
        }

        (uint256 invariantRatio, uint256[] memory swapFees) = _computeJoinExactTokensInInvariantRatio(
            balances,
            amountsIn,
            balanceRatiosWithFee,
            singleWeight,
            invariantRatioWithFees,
            swapFeePercentage
        );

        uint256 lpOut = (invariantRatio > FixedPoint.ONE) ? lpTotalSupply.mulDown(invariantRatio - FixedPoint.ONE) : 0;
        return (lpOut, swapFees);
    }

    /**
     * @dev Intermediate function to avoid stack-too-deep "
     */
    function _computeJoinExactTokensInInvariantRatio(
        uint256[] memory balances,
        uint256[] memory amountsIn,
        uint256[] memory balanceRatiosWithFee,
        uint256 singleWeight,
        uint256 invariantRatioWithFees,
        uint256 swapFeePercentage
    ) private pure returns (uint256 invariantRatio, uint256[] memory swapFees) {
        // Swap fees are charged on all tokens that are being added in a larger proportion than the overall invariant
        // increase.
        swapFees = new uint256[](amountsIn.length);
        invariantRatio = FixedPoint.ONE;

        for (uint256 i = 0; i < balances.length; i++) {
            uint256 amountInWithoutFee;

            if (balanceRatiosWithFee[i] > invariantRatioWithFees) {
                uint256 nonTaxableAmount = balances[i].mulDown(invariantRatioWithFees - FixedPoint.ONE);
                uint256 taxableAmount = amountsIn[i] - nonTaxableAmount;
                uint256 swapFee = taxableAmount.mulUp(swapFeePercentage);

                amountInWithoutFee = nonTaxableAmount + (taxableAmount - swapFee);
                swapFees[i] = swapFee;
            } else {
                amountInWithoutFee = amountsIn[i];
            }

            uint256 balanceRatio = (balances[i] + amountInWithoutFee).divDown(balances[i]);

            invariantRatio = invariantRatio.mulDown(balanceRatio.pow(singleWeight));
        }
    }

    function _calcTokenInGivenExactLpOut(
        uint256 balance,
        uint256 normalizedWeight,
        uint256 lpAmountOut,
        uint256 lpTotalSupply,
        uint256 swapFeePercentage
    ) internal pure returns (uint256 amountIn, uint256 swapFee) {
        /******************************************************************************************
        // tokenInForExactLpOut                                                                 //
        // a = amountIn                                                                          //
        // b = balance                      /  /    totalBPT + LpOut      \    (1 / w)       \  //
        // LpOut = lpAmountOut   a = b * |  | --------------------------  | ^          - 1  |  //
        // lp = totalBPT                   \  \       totalBPT            /                  /  //
        // w = weight                                                                            //
        ******************************************************************************************/

        // Token in, so we round up overall.

        // Calculate the factor by which the invariant will increase after minting BPTAmountOut
        uint256 invariantRatio = (lpTotalSupply + lpAmountOut).divUp(lpTotalSupply);
        require(invariantRatio <= _MAX_INVARIANT_RATIO, "MAX_OUT_LP");

        // Calculate by how much the token balance has to increase to match the invariantRatio
        uint256 balanceRatio = invariantRatio.pow(FixedPoint.ONE.divUp(normalizedWeight));

        uint256 amountInWithoutFee = balance.mulUp(balanceRatio - FixedPoint.ONE);

        // We can now compute how much extra balance is being deposited and used in virtual swaps, and charge swap fees
        // accordingly.
        uint256 taxablePercentage = normalizedWeight.complement();
        uint256 taxableAmount = amountInWithoutFee.mulUp(taxablePercentage);
        uint256 nonTaxableAmount = amountInWithoutFee - taxableAmount;

        uint256 taxableAmountPlusFees = taxableAmount.divUp(FixedPoint.ONE - swapFeePercentage);

        swapFee = taxableAmountPlusFees - taxableAmount;
        amountIn = nonTaxableAmount + taxableAmountPlusFees;
    }

    function _calcAllTokensInGivenExactLpOut(
        uint256[] memory balances,
        uint256 lpAmountOut,
        uint256 totalBPT
    ) internal pure returns (uint256[] memory) {
        /************************************************************************************
        // tokensInForExactLpOut                                                           //
        // (per token)                                                                     //
        // aI = amountIn                    /   LpOut    \                                 //
        // b = balance            aI = b * | ----------- |                                 //
        // LpOut = lpAmountOut              \  totalBPT  /                                 //
        // lp = totalBPT                                                                   //
        ************************************************************************************/

        // Tokens in, so we round up overall.
        uint256 lpRatio = lpAmountOut.divUp(totalBPT);

        uint256[] memory amountsIn = new uint256[](balances.length);
        for (uint256 i = 0; i < balances.length; i++) {
            amountsIn[i] = balances[i].mulUp(lpRatio);
        }

        return amountsIn;
    }

    function _calcLpInGivenExactTokensOut(
        uint256[] memory balances,
        uint256[] memory amountsOut,
        uint256 singleWeight,
        uint256 lpTotalSupply,
        uint256 swapFeePercentage
    ) internal pure returns (uint256, uint256[] memory) {
        // BPT in, so we round up overall.

        uint256[] memory balanceRatiosWithoutFee = new uint256[](amountsOut.length);
        uint256 invariantRatioWithoutFees = 0;
        for (uint256 i = 0; i < balances.length; i++) {
            balanceRatiosWithoutFee[i] = (balances[i] - amountsOut[i]).divUp(balances[i]);
            invariantRatioWithoutFees += balanceRatiosWithoutFee[i].mulUp(singleWeight);
        }

        (uint256 invariantRatio, uint256[] memory swapFees) = _computeExitExactTokensOutInvariantRatio(
            balances,
            singleWeight,
            amountsOut,
            balanceRatiosWithoutFee,
            invariantRatioWithoutFees,
            swapFeePercentage
        );

        uint256 lpIn = lpTotalSupply.mulUp(invariantRatio.complement());
        return (lpIn, swapFees);
    }

    /**
     * @dev Intermediate function to avoid stack-too-deep "
     */
    function _computeExitExactTokensOutInvariantRatio(
        uint256[] memory balances,
        uint256 singleWeight,
        uint256[] memory amountsOut,
        uint256[] memory balanceRatiosWithoutFee,
        uint256 invariantRatioWithoutFees,
        uint256 swapFeePercentage
    ) private pure returns (uint256 invariantRatio, uint256[] memory swapFees) {
        swapFees = new uint256[](amountsOut.length);
        invariantRatio = FixedPoint.ONE;

        for (uint256 i = 0; i < balances.length; i++) {
            // Swap fees are typically charged on 'token in', but there is no 'token in' here, so we apply it to
            // 'token out'. This results in slightly larger price impact.

            uint256 amountOutWithFee;
            if (invariantRatioWithoutFees > balanceRatiosWithoutFee[i]) {
                uint256 nonTaxableAmount = balances[i].mulDown(invariantRatioWithoutFees.complement());
                uint256 taxableAmount = amountsOut[i] - nonTaxableAmount;
                uint256 taxableAmountPlusFees = taxableAmount.divUp(FixedPoint.ONE - swapFeePercentage);

                swapFees[i] = taxableAmountPlusFees - taxableAmount;
                amountOutWithFee = nonTaxableAmount + taxableAmountPlusFees;
            } else {
                amountOutWithFee = amountsOut[i];
            }

            uint256 balanceRatio = (balances[i] - amountOutWithFee).divDown(balances[i]);

            invariantRatio = invariantRatio.mulDown(balanceRatio.pow(singleWeight));
        }
    }

    function _calcTokenOutGivenExactLpIn(
        uint256 balance,
        uint256 normalizedWeight,
        uint256 lpAmountIn,
        uint256 lpTotalSupply,
        uint256 swapFeePercentage
    ) internal pure returns (uint256 amountOut, uint256 swapFee) {
        /*****************************************************************************************
        // exactBPTInForTokenOut                                                                //
        // a = amountOut                                                                        //
        // b = balance                     /      /    totalBPT - lpIn       \    (1 / w)  \    //
        // lpIn = lpAmountIn    a = b * |  1 - | --------------------------  | ^           |    //
        // lp = totalBPT                  \      \       totalBPT            /             /    //
        // w = weight                                                                           //
        *****************************************************************************************/

        // Token out, so we round down overall. The multiplication rounds down, but the power rounds up (so the base
        // rounds up). Because (totalBPT - lpIn) / totalBPT <= 1, the exponent rounds down.

        // Calculate the factor by which the invariant will decrease after burning BPTAmountIn
        uint256 invariantRatio = (lpTotalSupply - lpAmountIn).divUp(lpTotalSupply);
        require(invariantRatio >= _MIN_INVARIANT_RATIO, "MIN_LP_IN");

        // Calculate by how much the token balance has to decrease to match invariantRatio
        uint256 balanceRatio = invariantRatio.pow(FixedPoint.ONE.divDown(normalizedWeight));

        // Because of rounding up, balanceRatio can be greater than one. Using complement prevents reverts.
        uint256 amountOutWithoutFee = balance.mulDown(balanceRatio.complement());

        // We can now compute how much excess balance is being withdrawn as a result of the virtual swaps, which result
        // in swap fees.
        uint256 taxablePercentage = normalizedWeight.complement();

        // Swap fees are typically charged on 'token in', but there is no 'token in' here, so we apply it
        // to 'token out'. This results in slightly larger price impact. Fees are rounded up.
        uint256 taxableAmount = amountOutWithoutFee.mulUp(taxablePercentage);
        uint256 nonTaxableAmount = amountOutWithoutFee - taxableAmount;

        swapFee = taxableAmount.mulUp(swapFeePercentage);
        amountOut = nonTaxableAmount + (taxableAmount - swapFee);
    }

    function _calcTokensOutGivenExactLpIn(
        uint256[] memory balances,
        uint256 lpAmountIn,
        uint256 totalBPT
    ) internal pure returns (uint256[] memory) {
        /**********************************************************************************************
        // exactBPTInForTokensOut                                                                    //
        // (per token)                                                                               //
        // aO = amountOut                   /        lpIn         \                                  //
        // b = balance           a0 = b * | ---------------------  |                                 //
        // lpIn = lpAmountIn               \       totalBPT       /                                  //
        // lp = totalBPT                                                                             //
        **********************************************************************************************/

        // Since we're computing an amount out, we round down overall. This means rounding down on both the
        // multiplication and division.

        uint256 lpRatio = lpAmountIn.divDown(totalBPT);

        uint256[] memory amountsOut = new uint256[](balances.length);
        for (uint256 i = 0; i < balances.length; i++) {
            amountsOut[i] = balances[i].mulDown(lpRatio);
        }

        return amountsOut;
    }
}
