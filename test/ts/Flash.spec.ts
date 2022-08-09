import { expect } from "./chai-setup";
import { BigNumber, Contract } from "ethers";
import { expandTo18Decimals, encodePrice, MaxUint256 } from "./shared/common";
import { approveAll, balancerMathFixture, distributeTokens, ERC20Fixture, pairFixture, WeightedPoolFixture, weightedPoolFixture, swapRouterFixture, SwapRouterFixture, thiefRouterFixture, tokenFixture, validatePoolBals, bnAbs, StablePoolFixture, BalancedPoolFixture, stablePoolFixture, balancedPoolFixture } from "./shared/fixtures";
import {
    maxUint256,
    mineBlockTimeStamp,
    toWei
} from "./shared/utilities";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { parseUnits } from "ethers/lib/utils";
import { MockExactOutRouter, MockExactOutRouter__factory, MockFlashSwapRecipient, MockFlashSwapRecipient__factory, RepayFlashSwapRecipient, RepayFlashSwapRecipient__factory } from "../../types";
// import { StableSwapFactory, TestErc20, Swap, LpToken, StableSwapRouter } from "../../types";

const overrides = {};

describe("Flash Swap Multi Hop eact out", () => {
    let signers: SignerWithAddress[];
    const zero = BigNumber.from(0)
    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let third: SignerWithAddress;
    let tokens: ERC20Fixture
    let fixture: WeightedPoolFixture
    let weightedFixture: WeightedPoolFixture
    let fee: BigNumber = parseUnits('1', 15) // fee
    let flashFee = parseUnits('1', 15) // flash fee
    let withdrawFee = parseUnits('1', 16) // withdraw fee
    let userBalance: BigNumber
    let routerFixture: SwapRouterFixture
    let stableFixture: StablePoolFixture
    let balancedFixture: BalancedPoolFixture
    let interval = 60 * 60 * 24 * 4 * 7 // 4 weeks
    const initialAmounts = [parseUnits('143321', 6), parseUnits('173321', 18), parseUnits('123111', 18)]

    let amounts = [parseUnits('231', 6), parseUnits('21', 18), parseUnits('122', 18)]
    let weights = [parseUnits('33', 16), parseUnits('33', 16), parseUnits('34', 16)]

    let baseUnits = ['213', '321', '38']

    let flashSwapRecipient: MockFlashSwapRecipient
    let repayFlashSwap: RepayFlashSwapRecipient
    let flashSwapRouter: MockExactOutRouter

    let dev = BigNumber.from(1e9)
    let obtain: BigNumber
    let receive: BigNumber
    let baseAmount: BigNumber
    let balancePre: BigNumber
    let balancePost: BigNumber
    let received: BigNumber
    let txOut: any
    let txIn: any
    let receipt: any
    let gasUsed: any

    beforeEach(async () => {
        signers = await ethers.getSigners();
        wallet = signers[0];
        other = signers[1];
        third = signers[2];
        tokens = await tokenFixture(wallet)
        await distributeTokens(tokens, wallet.address, '10000000000000000000')
        await distributeTokens(tokens, other.address, '10000000000000000000')

        fixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, fee, flashFee, withdrawFee);
        stableFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token3, tokens.token4], fee, flashFee, withdrawFee);
        balancedFixture = await balancedPoolFixture(wallet, [tokens.token4, tokens.token5, tokens.token2], fee, flashFee, withdrawFee);
        weightedFixture = await weightedPoolFixture(wallet, [tokens.token5, tokens.token2, tokens.token3], weights, fee, flashFee, withdrawFee);

        routerFixture = await swapRouterFixture(wallet)

        // swapValidator = await balancerMathFixture(wallet)
        await approveAll(wallet, tokens, fixture.pool.address)
        await approveAll(other, tokens, fixture.pool.address)

        await approveAll(wallet, tokens, routerFixture.router.address)
        await approveAll(other, tokens, routerFixture.router.address)

        await approveAll(wallet, tokens, stableFixture.pool.address)
        await approveAll(other, tokens, stableFixture.pool.address)
        flashSwapRouter = await new MockExactOutRouter__factory(wallet).deploy()

        await approveAll(wallet, tokens, balancedFixture.pool.address)
        await approveAll(other, tokens, balancedFixture.pool.address)

        await approveAll(wallet, tokens, flashSwapRouter.address)
        await approveAll(other, tokens, flashSwapRouter.address)

        await approveAll(wallet, tokens, weightedFixture.pool.address)
        await approveAll(other, tokens, weightedFixture.pool.address)

        await fixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
        await stableFixture.pool.connect(wallet).addLiquidityExactIn([0, 3, 4].map((x, i) => parseUnits(baseUnits[i], tokens.decimals[x])), 1, wallet.address, maxUint256);
        await balancedFixture.pool.connect(wallet).addLiquidityExactIn([4, 5, 2].map((x, i) => parseUnits(baseUnits[i], tokens.decimals[x])), 1, wallet.address, maxUint256);
        await weightedFixture.pool.connect(wallet).addLiquidityExactIn([5, 2, 3].map((x, i) => parseUnits(baseUnits[i], tokens.decimals[x])), 1, wallet.address, maxUint256);
    });

    it('Flash swaps 2x', async () => {
        const out = parseUnits('1', 12)

        // calculate manual route
        let in1 = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, out)
        let in0 = await stableFixture.pool.calculateSwapGivenOut(tokens.token4.address, tokens.token0.address, in1)

        // pre balances
        balancePre = await tokens.token2.balanceOf(wallet.address)
        let balancePreT4 = await tokens.token4.balanceOf(wallet.address)

        console.log(flashSwapRouter.address)

        // input params
        let pools = [stableFixture.pool.address, fixture.pool.address]
        let tokenInput = [tokens.token4.address, tokens.token0.address, tokens.token2.address]
        txOut = await flashSwapRouter.onSwapTokensForExactTokens(pools, tokenInput, out, wallet.address)

        receipt = await txOut.wait()

        // post balances
        balancePost = await tokens.token2.balanceOf(wallet.address)
        let balancePostT4 = await tokens.token4.balanceOf(wallet.address)

        // check that user received funds
        expect(balancePost.sub(balancePre)).to.equal(out)

        // check that user sent funds
        expect(balancePreT4.sub(balancePostT4)).to.equal(in0)
        console.log(balancePreT4.sub(balancePostT4), in0)


        console.log("FlashGas", receipt.gasUsed)


        txOut = await routerFixture.router.onSwapTokensForExactTokens(pools, tokenInput, out, maxUint256, wallet.address, maxUint256)

        receipt = await txOut.wait()

        console.log("RegGas", receipt.gasUsed)


    })


    it('Flash swaps 3x', async () => {
        const out = parseUnits('1', 10)

        let in2 = await balancedFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token5.address, out)
        let in1 = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, in2)
        let in0 = await stableFixture.pool.calculateSwapGivenOut(tokens.token4.address, tokens.token0.address, in1)
        balancePre = await tokens.token5.balanceOf(wallet.address)
        let balancePreT4 = await tokens.token4.balanceOf(wallet.address)
        console.log(flashSwapRouter.address)
        let pools = [stableFixture.pool.address, fixture.pool.address, balancedFixture.pool.address]
        let tokenInput = [tokens.token4.address, tokens.token0.address, tokens.token2.address, tokens.token5.address]
        txOut = await flashSwapRouter.onSwapTokensForExactTokens(pools, tokenInput, out, wallet.address)

        receipt = await txOut.wait()
        balancePost = await tokens.token5.balanceOf(wallet.address)
        let balancePostT4 = await tokens.token4.balanceOf(wallet.address)


        console.log("FlashGas", receipt.gasUsed)

        expect(balancePost.sub(balancePre)).to.equal(out)
        expect(balancePreT4.sub(balancePostT4)).to.equal(in0)
        console.log(balancePreT4.sub(balancePostT4), in0)

        txOut = await routerFixture.router.onSwapTokensForExactTokens(pools, tokenInput, out, maxUint256, wallet.address, maxUint256)

        receipt = await txOut.wait()

        console.log("RegGas", receipt.gasUsed)


    })

    it('Flash swaps 4x', async () => {
        // route 4 -> 3 
        const out = parseUnits('1', 6)
        let in3 = await weightedFixture.pool.calculateSwapGivenOut(tokens.token5.address, tokens.token3.address, out)
        let in2 = await balancedFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token5.address, in3)
        let in1 = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, in2)
        let in0 = await stableFixture.pool.calculateSwapGivenOut(tokens.token4.address, tokens.token0.address, in1)

        balancePre = await tokens.token3.balanceOf(wallet.address)
        let balancePreT4 = await tokens.token4.balanceOf(wallet.address)
        console.log(flashSwapRouter.address)
        let pools = [stableFixture.pool.address, fixture.pool.address, balancedFixture.pool.address, weightedFixture.pool.address]
        let tokenInput = [tokens.token4.address, tokens.token0.address, tokens.token2.address, tokens.token5.address, tokens.token3.address]
        txOut = await flashSwapRouter.onSwapTokensForExactTokens(pools, tokenInput, out, wallet.address)

        receipt = await txOut.wait()
        balancePost = await tokens.token3.balanceOf(wallet.address)
        let balancePostT4 = await tokens.token4.balanceOf(wallet.address)


        console.log("FlashGas", receipt.gasUsed)

        expect(balancePost.sub(balancePre)).to.equal(out)
        expect(balancePreT4.sub(balancePostT4)).to.equal(in0)
        console.log(balancePreT4.sub(balancePostT4), in0)

        txOut = await routerFixture.router.onSwapTokensForExactTokens(pools, tokenInput, out, maxUint256, wallet.address, maxUint256)

        receipt = await txOut.wait()

        console.log("RegGas", receipt.gasUsed)


    })

    // Flash Swap Multi Hop eact out
    // 0x04C89607413713Ec9775E14b954286519d836FEf
    // BigNumber { value: "1967" } BigNumber { value: "1967" }
    // FlashGas BigNumber { value: "287434" }
    // RegGas BigNumber { value: "312450" }
    //     ✓ Flash swaps 2x
    // 0xD49a0e9A4CD5979aE36840f542D2d7f02C4817Be
    // FlashGas BigNumber { value: "381563" }
    // BigNumber { value: "984" } BigNumber { value: "984" }
    // RegGas BigNumber { value: "385830" }
    //     ✓ Flash swaps 3x
    // 0x9Fcca440F19c62CDF7f973eB6DDF218B15d4C71D
    // FlashGas BigNumber { value: "529559" }
    // BigNumber { value: "8090111" } BigNumber { value: "8090111" }
    // RegGas BigNumber { value: "514878" }
    //     ✓ Flash swaps 4x
    
    


    // it('FlashSwap: valid, insufficient fee and reentrant', async () => {

    //     let testAmount = '1000000'

    //     flashSwapRecipient = await new MockFlashSwapRecipient__factory(wallet).deploy()

    //     await tokens.token0.approve(flashSwapRecipient.address, maxUint256)
    //     // valid
    //     await flashSwapRecipient.setRepay(true)

    //     await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')

    //     await flashSwapRecipient.setRepay(false)

    //     await expect(
    //         fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("insufficient in")

    //     await flashSwapRecipient.setRepayLess(true)
    //     await expect(
    //         fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("insufficient in")

    //     await flashSwapRecipient.setRepayLess(false)
    //     await flashSwapRecipient.setReenterIn(true)

    //     await expect(
    //         fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("ReentrancyGuard: reentrant call")


    //     // second test exact out

    //     // reset parameters of mock contract
    //     await flashSwapRecipient.setRepay(false)
    //     await flashSwapRecipient.setRepay(false)
    //     await flashSwapRecipient.setRepayLess(false)
    //     await flashSwapRecipient.setRepayLess(false)
    //     await flashSwapRecipient.setReenterIn(false)

    //     testAmount = '1000000000'

    //     await tokens.token0.approve(flashSwapRecipient.address, maxUint256)
    //     // valid
    //     await flashSwapRecipient.setRepay(true)

    //     await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')

    //     await flashSwapRecipient.setRepay(false)

    //     await expect(
    //         fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("insufficient in")


    //     await flashSwapRecipient.setRepayLess(true)
    //     await expect(
    //         fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("insufficient in")


    //     await flashSwapRecipient.setRepayLess(false)
    //     await flashSwapRecipient.setReenterOut(true)

    //     await expect(
    //         fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address, flashSwapRecipient.address, '0x')
    //     ).to.be.revertedWith("ReentrancyGuard: reentrant call")
    // })

    // // executes flash swap and regular swap for gas comparison
    // // succeeeds if no contract call fails
    // it('FlashSwap: gas cost', async () => {

    //     let testAmount = '1000000'
    //     repayFlashSwap = await new RepayFlashSwapRecipient__factory(wallet).deploy()

    //     await tokens.token0.connect(wallet).approve(repayFlashSwap.address, maxUint256)


    //     txIn = await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address, repayFlashSwap.address, '0x')

    //     receipt = await txIn.wait();

    //     console.log('exactInFlash', receipt.gasUsed)


    //     await tokens.token0.connect(wallet).transfer(fixture.pool.address, testAmount)
    //     txIn = await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address, repayFlashSwap.address, '0x')

    //     receipt = await txIn.wait();

    //     console.log('exactInReg', receipt.gasUsed)

    //     testAmount = '1000000000000000000'

    //     txIn = await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address, repayFlashSwap.address, '0x')

    //     receipt = await txIn.wait();

    //     console.log('exactOutFlash', receipt.gasUsed)

    //     const amIn = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, testAmount)
    //     await tokens.token0.connect(wallet).transfer(fixture.pool.address, amIn)
    //     txIn = await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address, repayFlashSwap.address, '0x')

    //     receipt = await txIn.wait();

    //     console.log('exactOutReg', receipt.gasUsed)

    // })




});