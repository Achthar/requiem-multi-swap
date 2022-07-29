import { expect } from "./chai-setup";
import { BigNumber, Contract } from "ethers";
import { expandTo18Decimals, encodePrice, MaxUint256 } from "./shared/common";
import { approveAll, balancerMathFixture, distributeTokens, ERC20Fixture, pairFixture, WeightedPoolFixture, weightedPoolFixture, swapRouterFixture, SwapRouterFixture, thiefRouterFixture, tokenFixture } from "./shared/fixtures";
import {
    maxUint256,
    mineBlockTimeStamp,
    toWei
} from "./shared/utilities";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { parseUnits } from "ethers/lib/utils";
// import { StableSwapFactory, TestErc20, Swap, LpToken, StableSwapRouter } from "../../types";

const overrides = {};

describe("Weighted Pools", () => {
    let signers: SignerWithAddress[];
    const zero = BigNumber.from(0)
    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let third: SignerWithAddress;
    let tokens: ERC20Fixture
    let weightedFixture: WeightedPoolFixture
    let fee: BigNumber = parseUnits('1', 15) // fee
    let flashFee = parseUnits('1', 15) // flash fee
    let withdrawFee = parseUnits('1', 16) // withdraw fee
    let userBalance: BigNumber
    let routerFixture: SwapRouterFixture
    let interval = 60 * 60 * 24 * 4 * 7 // 4 weeks
    const initialAmounts = [parseUnits('143321', 6), parseUnits('173321', 18), parseUnits('123111', 18)]

    let amounts = [parseUnits('231', 6), parseUnits('21', 18), parseUnits('122', 18)]
    let weights = [parseUnits('25', 16), parseUnits('25', 16), parseUnits('50', 16)]
    beforeEach(async () => {
        signers = await ethers.getSigners();
        wallet = signers[0];
        other = signers[1];
        third = signers[2];
        tokens = await tokenFixture(wallet)
        await distributeTokens(tokens, wallet.address, '10000000000000000000')
        await distributeTokens(tokens, other.address, '10000000000000000000')
        weightedFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, fee, flashFee, withdrawFee);
        routerFixture = await swapRouterFixture(wallet)
        // swapValidator = await balancerMathFixture(wallet)
        await approveAll(wallet, tokens, weightedFixture.pool.address)
        await approveAll(other, tokens, weightedFixture.pool.address)

        await approveAll(wallet, tokens, routerFixture.router.address)
        await approveAll(other, tokens, routerFixture.router.address)

        await weightedFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
    });

    it("Rejects first liquidity supply from non-creator", async () => {
        const testFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, fee, flashFee, withdrawFee);
        await approveAll(other, tokens, testFixture.pool.address)
        await expect(testFixture.pool.connect(other).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256)).
            to.be.revertedWith('can only be inititalized by creator');
    });

    it("Allows first liquidity supply from creator", async () => {
        const testFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, fee, flashFee, withdrawFee);
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
    });

    it("Allows secondary liquidity supply after cration from others", async () => {
        const testFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, zero, zero, zero);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);

        const expectedBal = await testFixture.pool.calculateTokenAmount(amounts, true)
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256)
        userBalance = await testFixture.pool.balanceOf(other.address)
        expect(userBalance).to.equal(expectedBal)
    });

    it("Allows liquidity removal wity no fees after period", async () => {
        const bal0 = await tokens.token0.balanceOf(other.address)
        const bal1 = await tokens.token1.balanceOf(other.address)
        const bal2 = await tokens.token2.balanceOf(other.address)

        const testFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, zero, zero, zero);
        await approveAll(other, tokens, testFixture.pool.address)
        await approveAll(wallet, tokens, testFixture.pool.address)
        await testFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, other.address, maxUint256);
        await testFixture.pool.connect(other).addLiquidityExactIn(amounts, 1, other.address, maxUint256);

        await network.provider.send("evm_increaseTime", [interval]);
        await network.provider.send("evm_mine")

        // const currentFee = await testFixture.pool.calculateCurrentWithdrawFee(other.address)
        // expect(currentFee).to.equal(zero)
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
    });




    // note that these are example cases in which the symmetry works that is not always the case due to the approximative way
    // the calculations are done - deviations sould be less than a basis point (expressed in token decimal)

    let dev = BigNumber.from(1e15)
    let obtain: BigNumber
    let receive: BigNumber
    let baseAmount: BigNumber
    for (let i = 0; i < 5; i++) {

        it(`Allows consistent swap calculation ${i}`, async () => {
            baseAmount = parseUnits('10', 18).add(parseUnits(String(i), 18))

            obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, baseAmount)
            receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, obtain)

            expect(baseAmount.sub(receive).mul(dev).div(baseAmount)).to.equal(zero)


            baseAmount = parseUnits('10', 6).add(parseUnits(String(i), 6))
            receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, baseAmount)
            obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, receive)

            expect(obtain).to.equal(baseAmount)

            baseAmount = parseUnits('10', 6).add(parseUnits(String(i), 6))
            receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token2.address, baseAmount)
            obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, receive)

            expect(obtain).to.equal(baseAmount)
        })
    }


    // dev = BigNumber.from(1e3)
    // for (let i = 0; i < 5; i++) {

    //     it(`Allows consistent swap calculation small amounts ${i}`, async () => {
    //         baseAmount = parseUnits('10', 9).add(parseUnits(String(i), 9))

    //         obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, baseAmount)
    //         receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, obtain)

    //         expect(baseAmount.sub(receive).mul(dev).div(baseAmount)).to.equal(zero)


    //         baseAmount = parseUnits('10', 3).add(parseUnits(String(i), 3))
    //         receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, baseAmount)
    //         obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, receive)

    //         expect(obtain).to.equal(baseAmount)

    //         baseAmount = parseUnits('10', 3).add(parseUnits(String(i), 3))
    //         receive = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token2.address, baseAmount)
    //         obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, receive)

    //         expect(obtain).to.equal(baseAmount)
    //     })
    // }

    // it("Swap calculation vs balancer implementation deviates less than 0.1 bp", async () => {
    //     const testFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], zero, zero, zero);
    //     await approveAll(wallet, tokens, testFixture.pool.address)
    //     await testFixture.pool.connect(wallet).addLiquidityExactIn([parseUnits('1000', 6), parseUnits('1000', 18), parseUnits('1000', 18)], 1, other.address, maxUint256);
    //     let amIn = parseUnits('1', 16)
    //     let amp = await testFixture.pool.getA()
    //     let balances = await testFixture.pool.getTokenBalances()
    //     let multis = await testFixture.pool.getTokenMultipliers()

    //     let target = await swapValidator.math.outGivenIn(amp, balances.map((b, i) => b.mul(multis[i])), 2, 1, amIn)
    //     let vali = await testFixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, amIn)
    //     let dev = BigNumber.from(100000)
    //     expect(target.sub(vali).mul(dev).div(target)).to.equal(zero)

    //     let amOut = parseUnits('1', 16)
    //     target = await swapValidator.math.inGivenOut(amp, balances.map((b, i) => b.mul(multis[i])), 2, 1, amOut)
    //     vali = await testFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, amOut)
    //     dev = BigNumber.from(100000)
    //     expect(target.sub(vali).mul(dev).div(target)).to.equal(zero)
    // })


    let balancePre: BigNumber
    let balancePost: BigNumber
    let received: BigNumber
    for (let i = 0; i < 5; i++) {
        it(`Allows consistent swap calculation with execution exact out ${i}`, async () => {

            baseAmount = parseUnits('1', 10).add(parseUnits(String(i), 10))
            obtain = await weightedFixture.pool.calculateSwapGivenOut(tokens.token2.address, tokens.token1.address, baseAmount)

            balancePre = await tokens.token2.balanceOf(other.address)
            await routerFixture.router.connect(other).onSwapTokensForExactTokens([weightedFixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, maxUint256, third.address, maxUint256)
            balancePost = await tokens.token2.balanceOf(other.address)

            received = await tokens.token1.balanceOf(third.address)
            expect(balancePre.sub(balancePost)).to.equal(obtain)
            expect(received).to.equal(baseAmount)
        })

        it(`Allows consistent swap calculation with execution exact in ${i}`, async () => {

            baseAmount = parseUnits('1', 10).add(parseUnits(String(i), 10))
            obtain = await weightedFixture.pool.calculateSwapGivenIn(tokens.token2.address, tokens.token1.address, baseAmount)

            balancePre = await tokens.token2.balanceOf(other.address)
            await routerFixture.router.connect(other).onSwapExactTokensForTokens([weightedFixture.pool.address], [tokens.token2.address, tokens.token1.address], baseAmount, zero, third.address, maxUint256)
            balancePost = await tokens.token2.balanceOf(other.address)

            received = await tokens.token1.balanceOf(third.address)
            expect(balancePre.sub(balancePost)).to.equal(baseAmount)
            expect(received).to.equal(obtain)

        })

    }

    it('Throws errors if insufficient amount sent to pool', async () => {
        const thiefRouter = await thiefRouterFixture(wallet)

        await approveAll(wallet, tokens, thiefRouter.address)

        let tokenArray = [tokens.token0.address, tokens.token1.address]

        let pools = [weightedFixture.pool.address]
        let amountIn = parseUnits("1", 6)
        let target = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token1.address, amountIn)

        await expect(thiefRouter.onSwapExactTokensForTokens(
            pools,
            tokenArray,
            amountIn,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("INSUFFICIENT_OUTPUT")


        let __amountOut = parseUnits("13214", 14)
        target = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token1.address, __amountOut)
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
        pools = [weightedFixture.pool.address]
        amountIn = BigNumber.from('12345012')
        target = await weightedFixture.pool.calculateSwapGivenIn(tokens.token0.address, tokens.token2.address, amountIn)
        await expect(thiefRouter.onSwapExactTokensForTokens(
            pools,
            tokenArray,
            amountIn,
            target,
            wallet.address,
            1
        )).to.be.revertedWith("INSUFFICIENT_OUTPUT")


        __amountOut = BigNumber.from(2133122)
        target = await weightedFixture.pool.calculateSwapGivenOut(tokens.token0.address, tokens.token2.address, __amountOut)
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

        await weightedFixture.flashLoanRecipient.setRepayInExcess(true)
        // repay loan = true 
        await weightedFixture.flashLoanRecipient.setRepayLoan(true)
        await weightedFixture.pool.flashLoan(weightedFixture.flashLoanRecipient.address,
            [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
            '0x')
        // repay loan = true 
        await weightedFixture.flashLoanRecipient.setRepayLoan(false)
        await expect(
            weightedFixture.pool.flashLoan(weightedFixture.flashLoanRecipient.address,
                [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
                '0x')
        ).to.be.revertedWith("insufficient loan fee")

        // repay loan = true & reentrant
        await weightedFixture.flashLoanRecipient.setReenter(true)
        await expect(
            weightedFixture.pool.flashLoan(weightedFixture.flashLoanRecipient.address,
                [BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
                '0x')
        ).to.be.revertedWith("ReentrancyGuard: reentrant call")
    })
});
