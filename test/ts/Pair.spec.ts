import { expect } from "./chai-setup";
import { BigNumber } from 'ethers'
import { expandTo18Decimals, encodePrice } from './shared/common'
import { pairFixture } from './shared/fixtures'
import { ADDRESS_ZERO, getLatestBlock, maxUint256, mineBlockTimeStamp, toWei } from "./shared/utilities";

import { ethers } from "hardhat";
import {
    // OriginUniswapV2FactoryFactory,
    // OriginUniswapV2PairFactory,
    TestERC20,
    RequiemPairFactory,
    RequiemPair,
    WeightedFormula,
    WeightedPairAdmin,
    RepayFlashSwapRecipient,
    RepayFlashSwapRecipient__factory,
    SwapRouter,
    SwapRouter__factory
} from "../../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const MINIMUM_LIQUIDITY = BigNumber.from(10).pow(3)
const overrides = {}

describe('Requiem Pair Base Equal Weight', () => {
    let signers: SignerWithAddress[];

    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let third: SignerWithAddress;

    let factory: RequiemPairFactory
    let token0: TestERC20
    let token1: TestERC20
    let pair: RequiemPair
    let formula: WeightedFormula
    let router: SwapRouter
    let admin: WeightedPairAdmin
    let repayFlashSwap: RepayFlashSwapRecipient
    beforeEach(async () => {
        signers = await ethers.getSigners();
        wallet = signers[0];
        other = signers[1];
        third = signers[2];
        const fixture = await pairFixture(wallet)
        factory = fixture.factory
        token0 = fixture.token0
        token1 = fixture.token1
        formula = fixture.formula
        pair = fixture.pair
        admin = fixture.admin
        repayFlashSwap = await new RepayFlashSwapRecipient__factory(wallet).deploy()
        token0.connect(wallet).approve(repayFlashSwap.address, maxUint256)
        token1.connect(wallet).approve(repayFlashSwap.address, maxUint256)

        router = await new SwapRouter__factory(wallet).deploy(factory.address, factory.address)

        token0.connect(wallet).approve(router.address, maxUint256)
        token1.connect(wallet).approve(router.address, maxUint256)
    })

    it('mint', async () => {
        const token0Amount = expandTo18Decimals(1)
        const token1Amount = expandTo18Decimals(4)
        await token0.transfer(pair.address, token0Amount)
        await token1.transfer(pair.address, token1Amount)

        const expectedLiquidity = expandTo18Decimals(2)
        await expect(pair.mint(wallet.address, overrides))
            // .to.emit(pair, 'Transfer')
            // .withArgs(ADDRESS_ZERO, ADDRESS_ZERO, MINIMUM_LIQUIDITY)
            // .to.emit(pair, 'Transfer')
            // .withArgs(ADDRESS_ZERO, wallet.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
            // .to.emit(pair, 'Sync')
            // .withArgs(token0Amount, token1Amount)
            .to.emit(pair, 'Mint')
            .withArgs(wallet.address, token0Amount, token1Amount)

        expect(await pair.totalSupply()).to.eq(expectedLiquidity)
        expect(await pair.balanceOf(wallet.address)).to.eq(expectedLiquidity.sub(MINIMUM_LIQUIDITY))
        expect(await token0.balanceOf(pair.address)).to.eq(token0Amount)
        expect(await token1.balanceOf(pair.address)).to.eq(token1Amount)
        const reserves = await pair.getReserves()
        expect(reserves.reserve0).to.eq(token0Amount)
        expect(reserves.reserve1).to.eq(token1Amount)
    })

    async function addLiquidity(token0Amount: BigNumber, token1Amount: BigNumber) {
        await token0.transfer(pair.address, token0Amount)
        await token1.transfer(pair.address, token1Amount)
        await pair.mint(wallet.address, overrides)
    }

    const swapTestCases: BigNumber[][] = [
        [1, 5, 10, '1662497915624478906'],
        [1, 10, 5, '453305446940074565'],

        [2, 5, 10, '2851015155847869602'],
        [2, 10, 5, '831248957812239453'],

        [1, 10, 10, '906610893880149131'],
        [1, 100, 100, '987158034397061298'],
        [1, 1000, 1000, '996006981039903216']
    ].map(a => a.map(n => (typeof n === 'string' ? BigNumber.from(n) : expandTo18Decimals(n))))
    swapTestCases.forEach((swapTestCase, i) => {
        it(`getInputPrice:token0:${i}`, async () => {
            const [swapAmount, token0Amount, token1Amount, expectedOutputAmount] = swapTestCase
            await addLiquidity(token0Amount, token1Amount)
            await token0.transfer(pair.address, swapAmount)
            await expect(pair.swap(0, expectedOutputAmount.add(1), wallet.address, '0x', overrides)).to.be.revertedWith(
                'REQLP: K'
            )
            await pair.swap(0, expectedOutputAmount, wallet.address, '0x', overrides)
        })
        it(`getInputPrice:token1:${i}`, async () => {
            const [swapAmount, token1Amount, token0Amount, expectedOutputAmount] = swapTestCase
            await addLiquidity(token0Amount, token1Amount)
            await token1.transfer(pair.address, swapAmount)
            await expect(pair.swap(expectedOutputAmount.add(1), 0, wallet.address, '0x', overrides)).to.be.revertedWith(
                'REQLP: K'
            )
            await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)
        })
    })

    const optimisticTestCases: BigNumber[][] = [
        ['997000000000000000', 5, 10, 1], // given amountIn, amountOut = floor(amountIn * .997)
        ['997000000000000000', 10, 5, 1],
        ['997000000000000000', 5, 5, 1],
        [1, 5, 5, '1003009027081243732'] // given amountOut, amountIn = floor(amountOut / .997)
    ].map(a => a.map(n => (typeof n === 'string' ? BigNumber.from(n) : expandTo18Decimals(n))))
    optimisticTestCases.forEach((optimisticTestCase, i) => {
        it(`optimistic:token0:${i}`, async () => {
            const [outputAmount, token0Amount, token1Amount, inputAmount] = optimisticTestCase
            await addLiquidity(token0Amount, token1Amount)
            await token0.transfer(pair.address, inputAmount)
            await expect(pair.swap(outputAmount.add(1), 0, wallet.address, '0x', overrides)).to.be.revertedWith(
                'REQLP: K'
            )
            await pair.swap(outputAmount, 0, wallet.address, '0x', overrides)
        })
        it(`optimistic:token1:${i}`, async () => {
            const [outputAmount, token0Amount, token1Amount, inputAmount] = optimisticTestCase
            await addLiquidity(token0Amount, token1Amount)
            await token1.transfer(pair.address, inputAmount)
            await expect(pair.swap(0, outputAmount.add(1), wallet.address, '0x', overrides)).to.be.revertedWith(
                'REQLP: K'
            )
            await pair.swap(0, outputAmount, wallet.address, '0x', overrides)
        })
    })

    it('swap:token0', async () => {
        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)

        const swapAmount = expandTo18Decimals(1)
        const expectedOutputAmount = BigNumber.from('1662497915624478906')
        await token0.transfer(pair.address, swapAmount)
        await expect(pair.swap(0, expectedOutputAmount, wallet.address, '0x', overrides))
            .to.emit(token1, 'Transfer')
            .withArgs(pair.address, wallet.address, expectedOutputAmount)
            // .to.emit(pair, 'Sync')
            // .withArgs(token0Amount.add(swapAmount), token1Amount.sub(expectedOutputAmount))
            .to.emit(pair, 'Swap')
            .withArgs(swapAmount, 0, 0, expectedOutputAmount)

        const reserves = await pair.getReserves()
        expect(reserves[0]).to.eq(token0Amount.add(swapAmount))
        expect(reserves[1]).to.eq(token1Amount.sub(expectedOutputAmount))
        expect(await token0.balanceOf(pair.address)).to.eq(token0Amount.add(swapAmount))
        expect(await token1.balanceOf(pair.address)).to.eq(token1Amount.sub(expectedOutputAmount))
        const totalSupplyToken0 = await token0.totalSupply()
        const totalSupplyToken1 = await token1.totalSupply()
        expect(await token0.balanceOf(wallet.address)).to.eq(totalSupplyToken0.sub(token0Amount).sub(swapAmount))
        expect(await token1.balanceOf(wallet.address)).to.eq(totalSupplyToken1.sub(token1Amount).add(expectedOutputAmount))
    })

    async function checkBalanceReserves() {
        const reserves = await pair.getReserves();
        const balance0 = await token0.balanceOf(pair.address)
        const balance1 = await token1.balanceOf(pair.address)
        expect(balance0).eq(reserves.reserve0)
        expect(balance1).eq(reserves.reserve1)
    }

    it('swap:sync,skim:withProtocolFee', async () => {
        await admin.setProtocolFee(pair.address, 50000)
        // await factory.setProtocolFee(50000)

        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)
        const weights = await pair.getParameters();
        const fee = weights._swapFee;
        const swapAmountIn = expandTo18Decimals(1)

        for (let i = 0; i < 3; i++) {
            let reserves = await pair.getReserves();
            const expectedOutputAmount1 = await formula.getAmountOut(swapAmountIn, reserves.reserve0, reserves.reserve1, weights._tokenWeight0, weights._tokenWeight1, fee);
            await token0.transfer(pair.address, swapAmountIn)
            await pair.swap(0, expectedOutputAmount1, wallet.address, '0x', overrides)

            reserves = await pair.getReserves();
            const expectedOutputAmount0 = await formula.getAmountOut(expectedOutputAmount1, reserves.reserve1, reserves.reserve0, weights._tokenWeight1, weights._tokenWeight0, fee);
            await token1.transfer(pair.address, expectedOutputAmount1)
            await pair.swap(expectedOutputAmount0, 0, wallet.address, '0x', overrides)


        }
        await checkBalanceReserves();
        await pair.sync()

        await checkBalanceReserves();
        // await pair.skim(wallet.address)
        // await checkBalanceReserves();

        let beforeReserves = await pair.getReserves();
        await token0.transfer(pair.address, swapAmountIn)
        await token1.transfer(pair.address, swapAmountIn)
        await pair.sync()
        let afterReserves = await pair.getReserves();
        expect(afterReserves.reserve0).eq(beforeReserves.reserve0.add(swapAmountIn))
        expect(afterReserves.reserve1).eq(beforeReserves.reserve1.add(swapAmountIn))

        await checkBalanceReserves();
        await token0.transfer(pair.address, swapAmountIn)
        await token1.transfer(pair.address, swapAmountIn)
        beforeReserves = await pair.getReserves();
        // await expect(() => pair.skim(wallet.address))
        // 	.to.changeTokenBalance(token0, wallet, swapAmountIn)
        // 	.to.changeTokenBalance(token1, wallet, swapAmountIn)
        afterReserves = await pair.getReserves();
        expect(afterReserves.reserve0).eq(beforeReserves.reserve0)
        expect(afterReserves.reserve1).eq(beforeReserves.reserve1)

        await pair.sync()
        await checkBalanceReserves();
    })
    it('swap:sync,skim', async () => {
        await admin.setProtocolFee(pair.address, 0)
        // await factory.setProtocolFee(0)

        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)
        const weights = await pair.getParameters();
        const fee = weights._swapFee
        const swapAmountIn = expandTo18Decimals(1)

        for (let i = 0; i < 3; i++) {
            let reserves = await pair.getReserves();
            const expectedOutputAmount1 = await formula.getAmountOut(swapAmountIn, reserves.reserve0, reserves.reserve1, weights._tokenWeight0, weights._tokenWeight1, fee);
            await token0.transfer(pair.address, swapAmountIn)
            await pair.swap(0, expectedOutputAmount1, wallet.address, '0x', overrides)

            reserves = await pair.getReserves();
            const expectedOutputAmount0 = await formula.getAmountOut(expectedOutputAmount1, reserves.reserve1, reserves.reserve0, weights._tokenWeight1, weights._tokenWeight0, fee);
            await token1.transfer(pair.address, expectedOutputAmount1)
            await pair.swap(expectedOutputAmount0, 0, wallet.address, '0x', overrides)

        }
        await checkBalanceReserves();
        // await pair.skim(wallet.address)
        // await checkBalanceReserves();

        let beforeReserves = await pair.getReserves();
        await token0.transfer(pair.address, swapAmountIn)
        await token1.transfer(pair.address, swapAmountIn)
        await pair.sync()
        let afterReserves = await pair.getReserves();
        expect(afterReserves.reserve0).eq(beforeReserves.reserve0.add(swapAmountIn))
        expect(afterReserves.reserve1).eq(beforeReserves.reserve1.add(swapAmountIn))
        await checkBalanceReserves();
        await token0.transfer(pair.address, swapAmountIn)
        await token1.transfer(pair.address, swapAmountIn)
        beforeReserves = await pair.getReserves();
        // await expect(() => pair.skim(wallet.address))
        //     .to.changeTokenBalance(token0, wallet, swapAmountIn)
        //     .to.changeTokenBalance(token1, wallet, swapAmountIn)
        afterReserves = await pair.getReserves();
        expect(afterReserves.reserve0).eq(beforeReserves.reserve0)
        expect(afterReserves.reserve1).eq(beforeReserves.reserve1)

        await pair.sync()
        await checkBalanceReserves();
    })
    it('swap:token0:withProtocolFee', async () => {
        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)

        const swapAmount = expandTo18Decimals(1)
        await admin.setProtocolFee(pair.address, 50000)
        // await factory.setProtocolFee(50000)
        const fee = await pair.getParameters()
        let swapFee = swapAmount.mul(fee._swapFee);
        // const protocolFeeAmount = swapFee.div(await factory.protocolFee())
        const expectedOutputAmount = BigNumber.from('1662497915624478906')
        await token0.transfer(pair.address, swapAmount)
        await expect(pair.swap(0, expectedOutputAmount, wallet.address, '0x', overrides))
            .to.emit(token1, 'Transfer')
            .withArgs(pair.address, wallet.address, expectedOutputAmount)
            // .to.emit(pair, 'Sync')
            // .withArgs(token0Amount.add(swapAmount), token1Amount.sub(expectedOutputAmount))
            .to.emit(pair, 'Swap')
            .withArgs(swapAmount, 0, 0, expectedOutputAmount)

        const reserves = await pair.getReserves()
        const balance0 = await token0.balanceOf(pair.address);
        const balance1 = await token1.balanceOf(pair.address);
        const collectedFees = await pair.getCollectedFees()
        expect(swapFee).to.eq(collectedFees._collectedFee0)
        expect(reserves[0]).to.eq(token0Amount.add(swapAmount))
        expect(reserves[1]).to.eq(token1Amount.sub(expectedOutputAmount))
        expect(balance0).to.eq(token0Amount.add(swapAmount))
        expect(balance1).to.eq(token1Amount.sub(expectedOutputAmount))
        const totalSupplyToken0 = await token0.totalSupply()
        const totalSupplyToken1 = await token1.totalSupply()
        expect(await token0.balanceOf(wallet.address)).to.eq(totalSupplyToken0.sub(token0Amount).sub(swapAmount))
        expect(await token1.balanceOf(wallet.address)).to.eq(totalSupplyToken1.sub(token1Amount).add(expectedOutputAmount))
    })

    it('swap:token1', async () => {
        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)

        const swapAmount = expandTo18Decimals(1)
        const expectedOutputAmount = BigNumber.from('453305446940074565')
        await token1.transfer(pair.address, swapAmount)
        await expect(pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides))
            .to.emit(token0, 'Transfer')
            .withArgs(pair.address, wallet.address, expectedOutputAmount)
            // .to.emit(pair, 'Sync')
            // .withArgs(token0Amount.sub(expectedOutputAmount), token1Amount.add(swapAmount))
            .to.emit(pair, 'Swap')
            .withArgs(0, swapAmount, expectedOutputAmount, 0)

        const reserves = await pair.getReserves()
        expect(reserves[0]).to.eq(token0Amount.sub(expectedOutputAmount))
        expect(reserves[1]).to.eq(token1Amount.add(swapAmount))
        expect(await token0.balanceOf(pair.address)).to.eq(token0Amount.sub(expectedOutputAmount))
        expect(await token1.balanceOf(pair.address)).to.eq(token1Amount.add(swapAmount))
        const totalSupplyToken0 = await token0.totalSupply()
        const totalSupplyToken1 = await token1.totalSupply()
        expect(await token0.balanceOf(wallet.address)).to.eq(totalSupplyToken0.sub(token0Amount).add(expectedOutputAmount))
        expect(await token1.balanceOf(wallet.address)).to.eq(totalSupplyToken1.sub(token1Amount).sub(swapAmount))
    })
    it('swap:token1:withProtocolFee', async () => {
        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)
        const swapAmount = expandTo18Decimals(1)
        await admin.setProtocolFee(pair.address, 50000)
        // await factory.setProtocolFee(50000)
        const fees = await pair.getParameters()
        let swapFee = swapAmount.mul(fees._swapFee);
        const expectedOutputAmount = BigNumber.from('453305446940074565')
        await token1.transfer(pair.address, swapAmount)
        await expect(pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides))
            .to.emit(token0, 'Transfer')
            .withArgs(pair.address, wallet.address, expectedOutputAmount)
            // .to.emit(pair, 'Sync')
            // .withArgs(token0Amount.sub(expectedOutputAmount), token1Amount.add(swapAmount))
            .to.emit(pair, 'Swap')
            .withArgs(0, swapAmount, expectedOutputAmount, 0)
        const reserves = await pair.getReserves()
        const balance0 = await token0.balanceOf(pair.address);
        const balance1 = await token1.balanceOf(pair.address);
        const collectedFees = await pair.getCollectedFees()
        expect(swapFee).to.eq(collectedFees._collectedFee1)
        expect(reserves[0]).to.eq(token0Amount.sub(expectedOutputAmount))
        expect(reserves[1]).to.eq(token1Amount.add(swapAmount))
        expect(balance1).to.eq(token1Amount.add(swapAmount))
        expect(balance0).to.eq(token0Amount.sub(expectedOutputAmount))
        const totalSupplyToken0 = await token0.totalSupply()
        const totalSupplyToken1 = await token1.totalSupply()
        expect(await token0.balanceOf(wallet.address)).to.eq(totalSupplyToken0.sub(token0Amount).add(expectedOutputAmount))
        expect(await token1.balanceOf(wallet.address)).to.eq(totalSupplyToken1.sub(token1Amount).sub(swapAmount))
    })

    it('swap:gas', async () => {
        await admin.setProtocolFee(pair.address, 50000)
        // await factory.setProtocolFee(50000)
        const token0Amount = expandTo18Decimals(5)
        const token1Amount = expandTo18Decimals(10)
        await addLiquidity(token0Amount, token1Amount)

        // ensure that setting price{0,1}CumulativeLast for the first time doesn't affect our gas math
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        await pair.sync(overrides)

        const swapAmount = expandTo18Decimals(1)
        const expectedOutputAmount = BigNumber.from('453305446940074565')
        await token1.transfer(pair.address, swapAmount)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        let balPre = await token0.balanceOf(wallet.address)
        let tx = await pair.onSwapGivenIn(token1.address, token0.address, wallet.address, overrides)
        // 		let tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        let receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80368) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EI0", Number(receipt.gasUsed.toString()))
        let bal = await token0.balanceOf(wallet.address)
        expect(bal.sub(balPre)).to.equal(expectedOutputAmount)

        balPre = await token0.balanceOf(wallet.address)
        await token0.transfer(pair.address, expectedOutputAmount)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        tx = await pair.onSwapGivenIn(token0.address, token1.address, wallet.address, overrides)
        // 		tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80368) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EI1", Number(receipt.gasUsed.toString()))
        bal = await token0.balanceOf(wallet.address)
        expect(balPre.sub(bal)).to.equal(expectedOutputAmount)


        // exact out
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        let inp = await pair.calculateSwapGivenOut(token0.address, token1.address, expectedOutputAmount)
        balPre = await token0.balanceOf(wallet.address)
        await token0.transfer(pair.address, inp)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)

        tx = await pair.onSwapGivenOut(token0.address, token1.address, expectedOutputAmount, wallet.address)
        // 		tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80892) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EO0", Number(receipt.gasUsed.toString()))
        bal = await token0.balanceOf(wallet.address)
        expect(balPre.sub(bal)).to.equal(inp)

        // other token



        inp = await pair.calculateSwapGivenOut(token1.address, token0.address, expectedOutputAmount)
        balPre = await token1.balanceOf(wallet.address)
        // await token1.transfer(pair.address, inp)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        // tx = await pair.onSwapGivenOut(token1.address, token0.address, expectedOutputAmount, wallet.address)
        tx = await router.onSwapTokensForExactTokens([pair.address], [token1.address, token0.address], expectedOutputAmount, maxUint256, wallet.address, maxUint256)
        // 		tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(107177) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EO1Router", Number(receipt.gasUsed.toString()))
        bal = await token1.balanceOf(wallet.address)
        expect(balPre.sub(bal)).to.equal(inp)


        // exact out Flash
        inp = await pair.calculateSwapGivenOut(token0.address, token1.address, expectedOutputAmount)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        balPre = await token0.balanceOf(wallet.address)
        tx = await pair.onFlashSwapGivenOut(repayFlashSwap.address, token0.address, token1.address, expectedOutputAmount, wallet.address, '0x')
        // 		tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(99324) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EOF0", Number(receipt.gasUsed.toString()))
        bal = await token0.balanceOf(wallet.address)
        expect(balPre.sub(bal)).to.equal(inp)

        // other token

        inp = await pair.calculateSwapGivenOut(token1.address, token0.address, expectedOutputAmount)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        balPre = await token1.balanceOf(wallet.address)
        tx = await pair.onFlashSwapGivenOut(repayFlashSwap.address, token1.address, token0.address, expectedOutputAmount, wallet.address, '0x')
        // 		tx = await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(99459) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EOF1", Number(receipt.gasUsed.toString()))
        bal = await token1.balanceOf(wallet.address)
        expect(balPre.sub(bal)).to.equal(inp)

        // exact in Flash
        const inputTest = BigNumber.from('32109321090321')

        let outp = await pair.calculateSwapGivenIn(token0.address, token1.address, inputTest)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        balPre = await token1.balanceOf(wallet.address)
        tx = await router.onSwapExactTokensForTokens([pair.address], [token0.address, token1.address], inputTest, 0, wallet.address, maxUint256)
        // 		tx = await pair.swap(inputTest, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(101429) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EI0Router", Number(receipt.gasUsed.toString()))
        bal = await token1.balanceOf(wallet.address)
        expect(bal.sub(balPre)).to.equal(outp)




        outp = await pair.calculateSwapGivenIn(token0.address, token1.address, inputTest)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        balPre = await token1.balanceOf(wallet.address)
        tx = await pair.onFlashSwapGivenIn(repayFlashSwap.address, token0.address, token1.address, inputTest, wallet.address, '0x')
        // 		tx = await pair.swap(inputTest, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(99324) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EIF0", Number(receipt.gasUsed.toString()))
        bal = await token1.balanceOf(wallet.address)
        expect(bal.sub(balPre)).to.equal(outp)

        // other token

        outp = await pair.calculateSwapGivenIn(token1.address, token0.address, inputTest)
        await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
        balPre = await token0.balanceOf(wallet.address)
        tx = await pair.onFlashSwapGivenIn(repayFlashSwap.address, token1.address, token0.address, inputTest, wallet.address, '0x')
        // 		tx = await pair.swap(inputTest, 0, wallet.address, '0x', overrides)

        receipt = await tx.wait()
        // expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(80746)
        expect(Number(receipt.gasUsed.toString())).to.be.lessThanOrEqual(99459) // the special function takes slihgtly more gas than the usual weighted pair
        console.log("EIF1", Number(receipt.gasUsed.toString()))
        bal = await token0.balanceOf(wallet.address)
        expect(bal.sub(balPre)).to.equal(outp)
    })

    // it('swap:gas old pair', async () => {
    //     const token0Amount = expandTo18Decimals(5)
    //     const token1Amount = expandTo18Decimals(10)

    //     // make a token1<>token2 original uni-pair
    //     const originFactory = await new OriginUniswapV2FactoryFactory(wallet).deploy(wallet.address);

    //     await originFactory.createPair(token0.address, token1.address);
    //     const pair2Address = await originFactory.getPair(token0.address, token1.address);
    //     const pair2 = OriginUniswapV2PairFactory.connect(pair2Address, wallet);

    //     await token0.transfer(pair2.address, token0Amount)
    //     await token1.transfer(pair2.address, token1Amount)
    //     await pair2.mint(wallet.address, overrides)

    //     // ensure that setting price{0,1}CumulativeLast for the first time doesn't affect our gas math
    //     await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
    //     await pair2.sync(overrides)

    //     const swapAmount = expandTo18Decimals(1)
    //     const expectedOutputAmount = BigNumber.from('453305446940074565')
    //     await token1.transfer(pair2.address, swapAmount)
    //     await mineBlockTimeStamp(ethers, (await getLatestBlock(ethers)).timestamp + 1)
    //     const tx = await pair2.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)
    //     const receipt = await tx.wait()
    //     expect(receipt.gasUsed).to.eq(73162)
    // })

    it('burn', async () => {
        const token0Amount = expandTo18Decimals(3)
        const token1Amount = expandTo18Decimals(3)
        await addLiquidity(token0Amount, token1Amount)

        const expectedLiquidity = expandTo18Decimals(3)
        await pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
        await expect(pair.burn(wallet.address, overrides))
            .to.emit(pair, 'Transfer')
            .withArgs(pair.address, ADDRESS_ZERO, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
            .to.emit(token0, 'Transfer')
            .withArgs(pair.address, wallet.address, token0Amount.sub(1000))
            .to.emit(token1, 'Transfer')
            .withArgs(pair.address, wallet.address, token1Amount.sub(1000))
            // .to.emit(pair, 'Sync')
            // .withArgs(1000, 1000)
            .to.emit(pair, 'Burn')
            .withArgs(wallet.address, token0Amount.sub(1000), token1Amount.sub(1000), wallet.address)

        expect(await pair.balanceOf(wallet.address)).to.eq(0)
        expect(await pair.totalSupply()).to.eq(MINIMUM_LIQUIDITY)
        expect(await token0.balanceOf(pair.address)).to.eq(1000)
        expect(await token1.balanceOf(pair.address)).to.eq(1000)
        const totalSupplyToken0 = await token0.totalSupply()
        const totalSupplyToken1 = await token1.totalSupply()
        expect(await token0.balanceOf(wallet.address)).to.eq(totalSupplyToken0.sub(1000))
        expect(await token1.balanceOf(wallet.address)).to.eq(totalSupplyToken1.sub(1000))
    })

    // it('price{0,1}CumulativeLast', async () => {
    // 	const token0Amount = expandTo18Decimals(3)
    // 	const token1Amount = expandTo18Decimals(3)
    // 	await addLiquidity(token0Amount, token1Amount)

    // 	const blockTimestamp = (await pair.getReserves())[2]
    // 	await mineBlockTimeStamp(ethers, blockTimestamp + 1)
    // 	await pair.sync(overrides)

    // 	const initialPrice = encodePrice(token0Amount, token1Amount)
    // 	expect(await pair.price0CumulativeLast()).to.eq(initialPrice[0].mul(2))
    // 	expect(await pair.price1CumulativeLast()).to.eq(initialPrice[1].mul(2))
    // 	expect((await pair.getReserves())[2]).to.eq(blockTimestamp + 2)

    // 	const swapAmount = expandTo18Decimals(3)
    // 	await token0.transfer(pair.address, swapAmount)
    // 	await mineBlockTimeStamp(ethers, blockTimestamp + 9)
    // 	// swap to a new price eagerly instead of syncing
    // 	await pair.swap(0, expandTo18Decimals(1), wallet.address, '0x', overrides) // make the price nice

    // 	expect(await pair.price0CumulativeLast()).to.eq(initialPrice[0].mul(10))
    // 	expect(await pair.price1CumulativeLast()).to.eq(initialPrice[1].mul(10))
    // 	expect((await pair.getReserves())[2]).to.eq(blockTimestamp + 10)

    // 	await mineBlockTimeStamp(ethers, blockTimestamp + 19)
    // 	await pair.sync(overrides)

    // 	const newPrice = encodePrice(expandTo18Decimals(6), expandTo18Decimals(2))
    // 	expect(await pair.price0CumulativeLast()).to.eq(initialPrice[0].mul(10).add(newPrice[0].mul(10)))
    // 	expect(await pair.price1CumulativeLast()).to.eq(initialPrice[1].mul(10).add(newPrice[1].mul(10)))
    // 	expect((await pair.getReserves())[2]).to.eq(blockTimestamp + 20)
    // })

    it('feeTo:off', async () => {
        const token0Amount = expandTo18Decimals(1000)
        const token1Amount = expandTo18Decimals(1000)
        await addLiquidity(token0Amount, token1Amount)

        const swapAmount = expandTo18Decimals(1)
        const expectedOutputAmount = BigNumber.from('996006981039903216')
        await token1.transfer(pair.address, swapAmount)
        await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        const expectedLiquidity = expandTo18Decimals(1000)
        await pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
        await pair.burn(wallet.address, overrides)
        expect(await pair.totalSupply()).to.eq(MINIMUM_LIQUIDITY)
    })
    it('feeTo:on', async () => {
        await admin.setProtocolFee(pair.address, 60000)
        await admin.setFeeTo(other.address)
        // await factory.setProtocolFee(60000)

        const token0Amount = expandTo18Decimals(1000)
        const token1Amount = expandTo18Decimals(1000)
        await addLiquidity(token0Amount, token1Amount)
        await pair.sync();
        const swapAmount = expandTo18Decimals(1)
        const expectedOutputAmount = BigNumber.from('996006981039903216')
        await token1.transfer(pair.address, swapAmount)
        await pair.swap(expectedOutputAmount, 0, wallet.address, '0x', overrides)

        const expectedLiquidity = expandTo18Decimals(1000)
        expect(await pair.totalSupply()).to.eq(expectedLiquidity)
        await pair.transfer(pair.address, expectedLiquidity.sub(MINIMUM_LIQUIDITY))
        await pair.burn(wallet.address, overrides)
        expect(await pair.balanceOf(other.address)).to.eq('249750218562663')
        expect(await pair.totalSupply()).to.eq(MINIMUM_LIQUIDITY.add('249750218562663'))

        // using 1000 here instead of the symbolic MINIMUM_LIQUIDITY because the amounts only happen to be equal...
        // ...because the initial liquidity amounts were equal
        expect(await token0.balanceOf(pair.address)).to.eq(BigNumber.from(1000).add('249501403288428'))
        expect(await token1.balanceOf(pair.address)).to.eq(BigNumber.from(1000).add('249999906343696'))
    })
})
