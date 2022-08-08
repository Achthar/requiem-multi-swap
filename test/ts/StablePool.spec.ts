import { expect } from "./chai-setup";
import { BigNumber, Contract } from "ethers";
import { expandTo18Decimals, encodePrice, MaxUint256 } from "./shared/common";
import { approveAll, balancerMathFixture, bnAbs, distributeTokens, ERC20Fixture, MockStableMathFixture, pairFixture, StablePoolFixture, stablePoolFixture, swapRouterFixture, SwapRouterFixture, thiefRouterFixture, tokenFixture, validatePoolBals } from "./shared/fixtures";
import {
    maxUint256,
    mineBlockTimeStamp,
    toWei
} from "./shared/utilities";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { MockFlashSwapRecipient, MockFlashSwapRecipient__factory, RepayFlashSwapRecipient, RepayFlashSwapRecipient__factory } from "../../types";
// import { StableSwapFactory, TestErc20, Swap, LpToken, StableSwapRouter } from "../../types";

const overrides = {};

describe("Stable Pools", () => {
    let signers: SignerWithAddress[];
    const zero = BigNumber.from(0)
    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let third: SignerWithAddress;
    let tokens: ERC20Fixture
    let fixture: StablePoolFixture
    let fee: BigNumber = parseUnits('1', 15) // fee
    let flashFee = parseUnits('1', 15) // flash fee
    let withdrawFee = parseUnits('1', 16) // withdraw fee
    let userBalance: BigNumber
    let routerFixture: SwapRouterFixture
    let swapValidator: MockStableMathFixture
    let interval = 60 * 60 * 24 * 4 * 7 // 4 weeks
    let dev = BigNumber.from(1000000)

    const initialAmounts = [parseUnits('143321', 6), parseUnits('173321', 18), parseUnits('123111', 18)]

    let amounts = [parseUnits('231', 6), parseUnits('21', 18), parseUnits('122', 18)]


    let flashSwapRecipient: MockFlashSwapRecipient
    let repayFlashSwap: RepayFlashSwapRecipient
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
        fixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        routerFixture = await swapRouterFixture(wallet)
        swapValidator = await balancerMathFixture(wallet)
        await approveAll(wallet, tokens, fixture.pool.address)
        await approveAll(other, tokens, fixture.pool.address)

        await approveAll(wallet, tokens, routerFixture.router.address)
        await approveAll(other, tokens, routerFixture.router.address)

        await fixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
    });

    it("Rejects first liquidity supply from non-creator", async () => {
        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        await approveAll(other, tokens, testFixture.pool.address)
        await expect(testFixture.pool.connect(other).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256)).
            to.be.revertedWith('can only be inititalized by creator');
    });

    it("Allows first liquidity supply from creator", async () => {
        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
    });

    it("Allows secondary liquidity supply after cration from others", async () => {
        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);

        const expectedBal = await testFixture.pool.calculateAddLiquidityExactIn(amounts)
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256)
        userBalance = await testFixture.pool.balanceOf(other.address)
        expect(userBalance).to.equal(expectedBal)
    });

    it("Allows liquidity removal with no fees  exact LP in", async () => {
        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, zero);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, fixture.pool)

        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const currentFee = await testFixture.pool.calculateCurrentWithdrawFee(other.address)
        expect(currentFee).to.equal(zero)
        const userLP = await testFixture.pool.balanceOf(other.address)

        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        userBalance = await testFixture.pool.balanceOf(other.address)
        expect(userBalance).to.equal(zero)

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        expect(bal0.lte(bal0After)).to.be.equal(true)
        expect(bal1.lte(bal1After)).to.be.equal(true)
        expect(bal2.lte(bal2After)).to.be.equal(true)

        await validatePoolBals(wallet, testFixture.pool)
    });

    it("Consistent liquidity removal with no fees exact Tokens out", async () => {

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, zero);

        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        // add some liquidity
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, testFixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        let userLP = await testFixture.pool.balanceOf(other.address)
        const toReceive = amounts.map(a => a.div(2))
        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        const expBurn = await testFixture.pool.calculateRemoveLiquidityExactOut(toReceive, other.address)
        await testFixture.pool.connect(other).removeLiquidityExactOut(toReceive, maxUint256, maxUint256)
        let userLPAfter = await testFixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(balDiff).to.equal(expBurn)
        // await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await testFixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        expect(bal0After.sub(bal0)).to.be.equal(toReceive[0])
        expect(bal1After.sub(bal1)).to.be.equal(toReceive[1])
        expect(bal2After.sub(bal2)).to.be.equal(toReceive[2])

        await validatePoolBals(wallet, testFixture.pool)
    });


    it("Consistent liquidity removal with no fees exact in one Token out", async () => {

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, zero);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        // add some liquidity
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, testFixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const bal1 = await tokens.token1.balanceOf(other.address)

        let userLP = await testFixture.pool.balanceOf(other.address)
        let lpToWithdraw = userLP.div(2)
        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // const tokenToWithdrawAmount = parseUnits('10', 18)
        const expAmount = await testFixture.pool.calculateRemoveLiquidityOneTokenExactIn(lpToWithdraw, 1, other.address)
        await testFixture.pool.connect(other).removeLiquidityOneTokenExactIn(lpToWithdraw, 1, 0, maxUint256)
        let userLPAfter = await testFixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(balDiff).to.equal(lpToWithdraw)
        // await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await testFixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal1After = await tokens.token1.balanceOf(other.address)
        const balDiffToken = bal1After.sub(bal1)

        expect(balDiffToken).to.be.equal(expAmount)

        await validatePoolBals(wallet, testFixture.pool)
    });

    it("Allows liquidity removal with fees after period expired exact LP in", async () => {
        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, fixture.pool)

        await network.provider.send("evm_increaseTime", [interval + 1]);
        await network.provider.send("evm_mine")

        const currentFee = await testFixture.pool.calculateCurrentWithdrawFee(other.address)
        expect(currentFee).to.equal(zero)
        const userLP = await testFixture.pool.balanceOf(other.address)

        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        userBalance = await testFixture.pool.balanceOf(other.address)
        expect(userBalance).to.equal(zero)

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        expect(bal0.lte(bal0After)).to.be.equal(true)
        expect(bal1.lte(bal1After)).to.be.equal(true)
        expect(bal2.lte(bal2After)).to.be.equal(true)

        await validatePoolBals(wallet, testFixture.pool)
    });

    it("Consistent liquidity removal with after period expired exact Tokens out", async () => {

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);

        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        // add some liquidity
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, testFixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval + 1]);
        await network.provider.send("evm_mine")

        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        let userLP = await testFixture.pool.balanceOf(other.address)
        const toReceive = amounts.map(a => a.div(2))
        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        const expBurn = await testFixture.pool.calculateRemoveLiquidityExactOut(toReceive, other.address)
        await testFixture.pool.connect(other).removeLiquidityExactOut(toReceive, maxUint256, maxUint256)
        let userLPAfter = await testFixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(balDiff).to.equal(expBurn)
        // await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await testFixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        expect(bal0After.sub(bal0)).to.be.equal(toReceive[0])
        expect(bal1After.sub(bal1)).to.be.equal(toReceive[1])
        expect(bal2After.sub(bal2)).to.be.equal(toReceive[2])

        await validatePoolBals(wallet, testFixture.pool)
    });


    it("Consistent liquidity removal after expiry exact in one Token out", async () => {

        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        // add some liquidity
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, testFixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval + 1]);
        await network.provider.send("evm_mine")

        const bal1 = await tokens.token1.balanceOf(other.address)

        let userLP = await testFixture.pool.balanceOf(other.address)
        let lpToWithdraw = userLP.div(2)
        await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // const tokenToWithdrawAmount = parseUnits('10', 18)
        const expAmount = await testFixture.pool.calculateRemoveLiquidityOneTokenExactIn(lpToWithdraw, 1, other.address)
        await testFixture.pool.connect(other).removeLiquidityOneTokenExactIn(lpToWithdraw, 1, 0, maxUint256)
        let userLPAfter = await testFixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(balDiff).to.equal(lpToWithdraw)
        // await testFixture.pool.connect(other).approve(testFixture.pool.address, maxUint256)
        // await testFixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await testFixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal1After = await tokens.token1.balanceOf(other.address)
        const balDiffToken = bal1After.sub(bal1)

        expect(balDiffToken).to.be.equal(expAmount)

        await validatePoolBals(wallet, testFixture.pool)
    });

    // time dependent test due to withdraw fee
    let precision = BigNumber.from(1e10)
    it("Consistent liquidity removal considering fees exact LP in", async () => {

        await approveAll(other, tokens, fixture.pool.address)
        await approveAll(wallet, tokens, fixture.pool.address)
        // add some liquidity
        await fixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, fixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")


        await fixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        let userLP = await fixture.pool.balanceOf(other.address)
        await fixture.pool.connect(other).approve(fixture.pool.address, maxUint256)
        const expectedReceive = await fixture.pool.calculateRemoveLiquidityExactIn(userLP.div(2), other.address)
        await fixture.pool.connect(other).removeLiquidityExactIn(userLP.div(2), [0, 0, 0], maxUint256)
        let userLPAfter = await fixture.pool.balanceOf(other.address)

        expect(userLP.sub(userLPAfter)).to.equal(userLP.div(2))

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        let diff0 = bal0After.sub(bal0)
        let diff1 = bal1After.sub(bal1)
        let diff2 = bal2After.sub(bal2)
        expect(bnAbs(diff0.sub(expectedReceive[0]).mul(precision).div(diff0))).to.be.equal(zero)
        expect(bnAbs(diff1.sub(expectedReceive[1]).mul(precision).div(diff1))).to.be.equal(zero)
        expect(bnAbs(diff2.sub(expectedReceive[2]).mul(precision).div(diff2))).to.be.equal(zero)

        await validatePoolBals(wallet, fixture.pool)
    });

    it("Consistent liquidity removal considering fees exact Tokens out", async () => {

        await approveAll(other, tokens, fixture.pool.address)
        await approveAll(wallet, tokens, fixture.pool.address)
        // add some liquidity
        await fixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, fixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await fixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        let userLP = await fixture.pool.balanceOf(other.address)
        const toReceive = amounts.map(a => a.div(2))
        await fixture.pool.connect(other).approve(fixture.pool.address, maxUint256)
        const expBurn = await fixture.pool.calculateRemoveLiquidityExactOut(toReceive, other.address)
        await fixture.pool.connect(other).removeLiquidityExactOut(toReceive, maxUint256, maxUint256)
        let userLPAfter = await fixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(bnAbs(balDiff.sub(expBurn).mul(precision).div(balDiff))).to.equal(zero)
        // await fixture.pool.connect(other).approve(fixture.pool.address, maxUint256)
        // await fixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await fixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal0After = await tokens.token0.balanceOf(other.address)
        const bal1After = await tokens.token1.balanceOf(other.address)
        const bal2After = await tokens.token2.balanceOf(other.address)

        expect(bal0After.sub(bal0).sub(toReceive[0])).to.be.lte(precision)
        expect(bal1After.sub(bal1).sub(toReceive[1])).to.be.lte(precision)
        expect(bal2After.sub(bal2).sub(toReceive[2])).to.be.lte(precision)

        await validatePoolBals(wallet, fixture.pool)
    });


    it("Consistent liquidity removal considering fees exact one Token out", async () => {

        await approveAll(other, tokens, fixture.pool.address)
        await approveAll(wallet, tokens, fixture.pool.address)
        // add some liquidity
        await fixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);

        await validatePoolBals(wallet, fixture.pool)

        // add some time to the clock
        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // user adds LP
        await fixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);


        await network.provider.send("evm_increaseTime", [interval / 4]);
        await network.provider.send("evm_mine")

        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        let userLP = await fixture.pool.balanceOf(other.address)
        let lpToWithdraw = userLP.div(2)
        await fixture.pool.connect(other).approve(fixture.pool.address, maxUint256)
        // const tokenToWithdrawAmount = parseUnits('10', 18)
        const expAmount = await fixture.pool.calculateRemoveLiquidityOneTokenExactIn(lpToWithdraw, 1, other.address)
        await fixture.pool.connect(other).removeLiquidityOneTokenExactIn(lpToWithdraw, 1, 0, maxUint256)
        let userLPAfter = await fixture.pool.balanceOf(other.address)
        const balDiff = userLP.sub(userLPAfter)
        expect(balDiff.sub(lpToWithdraw)).to.equal(zero)
        // await fixture.pool.connect(other).approve(fixture.pool.address, maxUint256)
        // await fixture.pool.connect(other).removeLiquidityExactIn(userLP, [0, 0, 0], maxUint256)
        // userBalance = await fixture.pool.balanceOf(other.address)
        // expect(userBalance).to.equal(zero)

        const bal1After = await tokens.token1.balanceOf(other.address)
        const balDiffToken = bal1After.sub(bal1)

        expect(bnAbs(balDiffToken.sub(expAmount).mul(precision).div(balDiffToken))).to.be.lte(zero)

        await validatePoolBals(wallet, fixture.pool)
    });


    // note that these are example cases in which the symmetry works that is not always the case due to the approximative way
    // the calculations are done - deviations sould be less than a basis point (expressed in token decimal)
    for (let i = 0; i < 5; i++) {

        it(`Allows consistent swap calculation ${i}`, async () => {
            baseAmount = parseUnits('10', 18).add(parseUnits(String(i), 18))

            obtain = await fixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, baseAmount)
            receive = await fixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, obtain)

            expect(baseAmount.sub(receive).mul(dev).div(baseAmount)).to.equal(zero)


            baseAmount = parseUnits('10', 6).add(parseUnits(String(i), 6))
            receive = await fixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, baseAmount)
            obtain = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, receive)

            expect(obtain).to.equal(baseAmount)

            baseAmount = parseUnits('10', 6).add(parseUnits(String(i), 6))
            receive = await fixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token2.address, baseAmount)
            obtain = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, receive)

            expect(obtain).to.equal(baseAmount)
        })
    }

    it("Swap calculation vs balancer implementation deviates less than 0.1 bp", async () => {
        const testFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], zero, zero, zero);
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn([parseUnits('1000', 6), parseUnits('1000', 18), parseUnits('1000', 18)], 1, other.address, maxUint256);
        let amIn = parseUnits('1', 16)
        let amp = await testFixture.pool.getA()
        let balances = await testFixture.pool.getTokenBalances()
        let multis = await testFixture.pool.getTokenMultipliers()

        let target = await swapValidator.math.outGivenIn(amp, balances.map((b, i) => b.mul(multis[i])), 2, 1, amIn)
        let vali = await testFixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, amIn)
        let dev = BigNumber.from(100000)
        expect(target.sub(vali).mul(dev).div(target)).to.equal(zero)
        await validatePoolBals(wallet, testFixture.pool)

        let amOut = parseUnits('1', 16)
        target = await swapValidator.math.inGivenOut(amp, balances.map((b, i) => b.mul(multis[i])), 2, 1, amOut)
        vali = await testFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, amOut)
        dev = BigNumber.from(100000)
        expect(target.sub(vali).mul(dev).div(target)).to.equal(zero)
        await validatePoolBals(wallet, testFixture.pool)

    })


    for (let i = 0; i < 5; i++) {
        it(`Allows consistent swap calculation with execution exact out ${i}`, async () => {

            baseAmount = parseUnits('1', 10).add(parseUnits(String(i), 10))
            obtain = await fixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, baseAmount)

            balancePre = await tokens.token2.balanceOf(other.address)
            txOut = await routerFixture.router.connect(other).onSwapTokensForExactTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, maxUint256, third.address, maxUint256)
            balancePost = await tokens.token2.balanceOf(other.address)

            received = await tokens.token1.balanceOf(third.address)
            expect(balancePre.sub(balancePost)).to.equal(obtain)
            expect(received).to.equal(baseAmount)
            receipt = await txOut.wait();
            if (i === 4)
                console.log('exactOut-' + String(i), receipt.gasUsed)

            await validatePoolBals(wallet, fixture.pool)

        })

        it(`Allows consistent swap calculation with execution exact in ${i}`, async () => {

            baseAmount = parseUnits('1', 10).add(parseUnits(String(i), 10))
            obtain = await fixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, baseAmount)

            balancePre = await tokens.token2.balanceOf(other.address)
            txIn = await routerFixture.router.connect(other).onSwapExactTokensForTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, zero, third.address, maxUint256)
            balancePost = await tokens.token2.balanceOf(other.address)

            received = await tokens.token1.balanceOf(third.address)
            expect(balancePre.sub(balancePost)).to.equal(baseAmount)
            expect(received).to.equal(obtain)
            receipt = await txIn.wait();
            if (i === 4)
                console.log('exactIn-' + String(i), receipt.gasUsed)

            await validatePoolBals(wallet, fixture.pool)

        })
    }

    it('Throws errors if insufficient amount sent to pool', async () => {
        const thiefRouter = await thiefRouterFixture(wallet)

        await approveAll(wallet, tokens, thiefRouter.address)

        let tokenArray = [tokens.token0.address, tokens.token1.address]

        let pools = [fixture.pool.address]
        let amountIn = parseUnits("1", 6)
        let target = await fixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, amountIn)

        await expect(thiefRouter.onSwapExactTokensForTokens(
            pools,
            tokenArray,
            amountIn,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("INSUFFICIENT_OUTPUT")

        let __amountOut = parseUnits("13214", 14)
        target = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, __amountOut)
        await expect(thiefRouter.onSwapTokensForExactTokens(
            pools,
            tokenArray,
            __amountOut,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("insufficient in")


        // switch - low decimals first
        tokenArray = [tokens.token0.address, tokens.token2.address]
        pools = [fixture.pool.address]
        amountIn = BigNumber.from('12345012')
        target = await fixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token2.address, amountIn)
        await expect(thiefRouter.onSwapExactTokensForTokens(
            pools,
            tokenArray,
            amountIn,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("INSUFFICIENT_OUTPUT")


        __amountOut = BigNumber.from(2133122)
        target = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, __amountOut)
        await expect(thiefRouter.onSwapTokensForExactTokens(
            pools,
            tokenArray,
            __amountOut,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("insufficient in")

    })

    it('FlashLoan: valid, insufficient fee and reentrant', async () => {

        await fixture.flashLoanRecipient.setRepayInExcess(true)
        // repay loan = true 
        await fixture.flashLoanRecipient.setRepayLoan(true)
        await fixture.pool.flashLoan(fixture.flashLoanRecipient.address,
            [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
            '0x')
        // repay loan = true 
        await fixture.flashLoanRecipient.setRepayLoan(false)
        await expect(
            fixture.pool.flashLoan(fixture.flashLoanRecipient.address,
                [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
                '0x')
        ).to.be.revertedWith("insufficient loan fee")

        // repay loan = true & reentrant
        await fixture.flashLoanRecipient.setReenter(true)
        await expect(
            fixture.pool.flashLoan(fixture.flashLoanRecipient.address,
                [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
                '0x')
        ).to.be.revertedWith("ReentrancyGuard: reentrant call")
    })

    it('FlashSwap: valid, insufficient fee and reentrant', async () => {

        let testAmount = '1000000'

        flashSwapRecipient = await new MockFlashSwapRecipient__factory(wallet).deploy()

        await tokens.token0.approve(flashSwapRecipient.address, maxUint256)
        // valid
        await flashSwapRecipient.setRepay(true)

        await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)

        await flashSwapRecipient.setRepay(false)

        await expect(
            fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("insufficient in")


        await flashSwapRecipient.setRepayLess(true)
        await expect(
            fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("insufficient in")


        await flashSwapRecipient.setRepayLess(false)
        await flashSwapRecipient.setReenterIn(true)

        await expect(
            fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("ReentrancyGuard: reentrant call")


        // second test exact out

        // reset parameters of mock contract
        await flashSwapRecipient.setRepay(false)
        await flashSwapRecipient.setRepay(false)
        await flashSwapRecipient.setRepayLess(false)
        await flashSwapRecipient.setRepayLess(false)
        await flashSwapRecipient.setReenterIn(false)

        testAmount = '1000000000000000000'

        await tokens.token0.approve(flashSwapRecipient.address, maxUint256)
        // valid
        await flashSwapRecipient.setRepay(true)

        await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)

        await flashSwapRecipient.setRepay(false)

        await expect(
            fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("insufficient in")


        await flashSwapRecipient.setRepayLess(true)
        await expect(
            fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("insufficient in")


        await flashSwapRecipient.setRepayLess(false)
        await flashSwapRecipient.setReenterOut(true)

        await expect(
            fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, flashSwapRecipient.address)
        ).to.be.revertedWith("ReentrancyGuard: reentrant call")
    })


    // executes flash swap and regular swap for gas comparison
    // succeeeds if no contract call fails
    it('FlashSwap: gas cost', async () => {

        let testAmount = '1000000'
        repayFlashSwap = await new RepayFlashSwapRecipient__factory(wallet).deploy()

        await tokens.token0.connect(wallet).approve(repayFlashSwap.address, maxUint256)


        txIn = await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address)

        receipt = await txIn.wait();

        console.log('exactInFlash', receipt.gasUsed)


        await tokens.token0.connect(wallet).transfer(fixture.pool.address, testAmount)
        txIn = await fixture.pool.onFlashSwapExactIn(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address)

        receipt = await txIn.wait();

        console.log('exactInReg', receipt.gasUsed)

        testAmount = '1000000000000000000'

        txIn = await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address)

        receipt = await txIn.wait();

        console.log('exactOutFlash', receipt.gasUsed)

        const amIn = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, testAmount)
        await tokens.token0.connect(wallet).transfer(fixture.pool.address, amIn)
        txIn = await fixture.pool.onFlashSwapExactOut(tokens.token0.address, tokens.token1.address, testAmount, repayFlashSwap.address)

        receipt = await txIn.wait();

        console.log('exactOutReg', receipt.gasUsed)

    })

    it("Allows admin fee withdrawl", async () => {
        // execute some swaps
        for (let i = 0; i < 6; i++) {
            baseAmount = parseUnits('1', 10).add(parseUnits(String(i), 10))
            obtain = await fixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, baseAmount)
            await routerFixture.router.connect(wallet).onSwapExactTokensForTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, zero, third.address, maxUint256)

            receive = await fixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, obtain)
            await routerFixture.router.connect(wallet).onSwapTokensForExactTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], receive, maxUint256, third.address, maxUint256)

            baseAmount = parseUnits('1', 6).add(parseUnits(String(i), 6))
            obtain = await fixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, baseAmount)
            await routerFixture.router.connect(wallet).onSwapExactTokensForTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, zero, third.address, maxUint256)

            receive = await fixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, obtain)
            await routerFixture.router.connect(wallet).onSwapTokensForExactTokens([fixture.pool.address], [tokens.token2.address, tokens.token1.address], receive, maxUint256, third.address, maxUint256)

        }
        const feesAccumulated = await fixture.pool.getCollectedFees()
        await validatePoolBals(wallet, fixture.pool)

        const bal0Pre = await tokens.token0.balanceOf(wallet.address)
        const bal1Pre = await tokens.token1.balanceOf(wallet.address)
        const bal2Pre = await tokens.token2.balanceOf(wallet.address)

        await fixture.pool.connect(wallet).withdrawAdminFee(wallet.address)

        const bal0Post = await tokens.token0.balanceOf(wallet.address)
        const bal1Post = await tokens.token1.balanceOf(wallet.address)
        const bal2Post = await tokens.token2.balanceOf(wallet.address)

        expect(bal0Post.sub(bal0Pre)).to.equal(feesAccumulated[0])
        expect(bal1Post.sub(bal1Pre)).to.equal(feesAccumulated[1])
        expect(bal2Post.sub(bal2Pre)).to.equal(feesAccumulated[2])
        await validatePoolBals(wallet, fixture.pool)
    })
});
