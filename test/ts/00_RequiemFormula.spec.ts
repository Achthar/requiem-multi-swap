import { expect } from "./chai-setup";
import { BigNumber, Contract } from 'ethers'
import { ecsign } from 'ethereumjs-util'

import {
	keccak256,
	defaultAbiCoder,
	toUtf8Bytes,
	hexlify,
	parseUnits
} from 'ethers/lib/utils'
import { ethers, network, deployments } from "hardhat";



import { getApprovalDigest } from './shared/common'
import { maxUint256, toWei } from './shared/utilities'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
	RequiemPairFactory__factory,
	WeightedFormula__factory,
	MockERC20__factory,
	SwapRouter__factory,
	SwapRouter,
	RequiemPair,
	WETH9__factory,
	RequiemPairERC20,
	RequiemWeightedPairFactory,
	WETH9,
} from "../../types";


const TOTAL_SUPPLY = toWei(10000)
const TEST_AMOUNT = toWei(10)

export interface V2Fixture {
	formula: Contract
	token0: RequiemPairERC20
	token1: RequiemPairERC20
	tokenA: RequiemPairERC20
	tokenB: RequiemPairERC20
	tokenWeight0: number,
	WETH: WETH9
	WETHPartner: Contract
	factoryV2: RequiemWeightedPairFactory
	router: SwapRouter
	pair: RequiemPairERC20
	WETHPair: RequiemPairERC20
	initCodeHash: string
}


describe('RequiemFormula-Test', () => {


	let signers: SignerWithAddress[];

	let wallet: SignerWithAddress;
	let other: SignerWithAddress;
	let deployWallet: any;

	let tokenA: Contract
	let tokenB: Contract
	let weth: Contract
	let formula: Contract
	let factory: Contract
	let pairManager: Contract
	let router: Contract

	// specs for pair
	let tokenWeightA = BigNumber.from(20)
	let swapFee = BigNumber.from(10)
	let amplification = BigNumber.from(15000)

	let newSwapFee = BigNumber.from(20)
	let newAmplification = BigNumber.from(20000)

	let amountA = parseUnits('50', 18)
	let amountB = parseUnits('100', 18)
	let ZERO = BigNumber.from(0)
	let pairContract: Contract
	let deadline = '9999999999999999'


	beforeEach(async () => {
		deployWallet = await ethers.Wallet.fromMnemonic(((network.config.accounts) as any).mnemonic);
		signers = await ethers.getSigners();
		wallet = signers[0];
		other = signers[1];
		tokenA = await new MockERC20__factory(wallet).deploy("token A", "A", 18)
		tokenB = await new MockERC20__factory(wallet).deploy("token B", "B", 18)
		weth = await new WETH9__factory(wallet).deploy()
		formula = await new WeightedFormula__factory(wallet).deploy()
		factory = await new RequiemPairFactory__factory(wallet).deploy(wallet.address, formula.address, wallet.address)
		router = await new SwapRouter__factory(wallet).deploy(factory.address, weth.address)

		await tokenA.approve(router.address, ethers.constants.MaxUint256)
		await tokenB.approve(router.address, ethers.constants.MaxUint256)

		
	})
	
	it('getAmountOut', async () => {
		expect(await formula.getAmountOut(1000, 10000,10000, 98, 2, 0)).to.eq(9906)
		// expect(getAmountOut(1000, 10000, 10000, 98, 2, 0)).to.eq(9906);

		expect(await formula.getAmountOut(1000, 10023423400,2313453450000, 98, 2, 0)).to.eq(11309403)
		// expect(getAmountOut(1000, 10023423400, 2313453450000, 98, 2, 0)).to.eq(11309403);


		expect(await formula.getAmountOut(100023423, 10023423400, 2313453450000, 98, 2, 0)).to.eq(891266825871)
		// expect(getAmountOut(100023423, 10023423400, 2313453450000, 98, 2, 0)).to.eq(891266825871);

		expect(await formula.getAmountOut(10023423400, 10023423400, 2313453450000, 98, 2, 0)).to.eq(2313453449999)
		// expect(await getAmountOut(10023423400, 10023423400, 2313453450000, 98, 2, 0)).to.eq(2313453449999)
		expect(await formula.getAmountOut(10023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(32495410881)
		// expect(await getAmountOut(10023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(32495410881)


		expect(await formula.getAmountOut(20023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(51256025942)
		// expect(await getAmountOut(20023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(51256025942)



		expect(await formula.getAmountOut("4232002342342343", "100234234002342342343", "300234232002342342343", 2, 98, 0)).to.eq("258692951827702")
		// expect(await getAmountOut("4232002342342343", "100234234002342342343", "300234232002342342343", 2, 98, 0)).to.eq("258692951827702")

	})

	it('getAmountOut:withFee', async () => {
		expect(await formula.getAmountOut(1000, 10000, 10000, 20, 80, 30)).to.eq(234)
		// expect(getAmountOut(1000, 10000, 10000, 20, 80, 3)).to.eq(234);

		expect(await formula.getAmountOut(1000, 10000, 10000, 2, 98, 30)).to.eq(19)
		// expect(getAmountOut(1000, 10000, 10000, 2, 98, 3)).to.eq(19);

		expect(await formula.getAmountOut(1000, 10000, 10000, 98, 2, 30)).to.eq(9905)
		// expect(getAmountOut(1000, 10000, 10000, 98, 2, 3)).to.eq(9905);

	})

	it('getAmountIn', async () => {
		expect(await formula.getAmountIn(1000, 10000, 10000, 22, 78, 30)).to.eq(4543)
		// expect(getAmountIn(1000, 10000, 10000, 22, 78, 30)).to.eq(4543);
		// expect(getAmountOut(4529, 10000, 10000, 22, 78, 30)).to.eq(998);

		expect(await formula.getAmountIn(1000, 10000, 10000, 2, 98, 30)).to.eq(1741518)
		// expect(getAmountIn(1000, 10000, 10000, 2, 98, 30)).to.eq(1741518);

		expect(await formula.getAmountIn(23423400, 10023423400, 2313453450000, 2, 98, 30)).to.eq(4989030)
		// expect(getAmountIn(23423400, 10023423400, 2313453450000, 2, 98, 3)).to.eq(4989030);

		expect(await formula.getAmountIn(1000, 10000, 10000, 98, 2, 30)).to.eq(22)
		// expect(getAmountIn(1000, 10000, 10000, 98, 2, 3)).to.eq(22);
	})

	it('mintLiquidityFee', async () => {
		//(((100 + 1000)/1000)^(90/100) - 1) * 1000000
		expect(await formula.mintLiquidityFee(1000000, 1000, 1000, 90, 10, 100, 0)).to.eq(89565)
		//(((100 + 1000)/1000)^(10/100) - 1) * 1000000
		expect(await formula.mintLiquidityFee(1000000, 1000, 1000, 90, 10, 0, 100)).to.eq(9576)
		expect(await formula.mintLiquidityFee(1000000, 1000, 1000, 90, 10, 100, 100)).to.eq(99141)
		//(((100 + 2000)/2000)^(90/100) - 1) * 1000000
		expect(await formula.mintLiquidityFee(1000000, 2000, 1000, 90, 10, 100, 0)).to.eq(44889)
		expect(await formula.mintLiquidityFee(1000000, 2000, 1000, 90, 10, 0, 100)).to.eq(9576)
		expect(await formula.mintLiquidityFee(1000000, 2000, 1000, 90, 10, 100, 100)).to.eq(54465)
	})

	// it('approve', async () => {
	// 	await expect(token.approve(other.address, TEST_AMOUNT))
	// 		.to.emit(token, 'Approval')
	// 		.withArgs(wallet.address, other.address, TEST_AMOUNT)
	// 	expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
	// })

	// it('transfer', async () => {
	// 	await expect(token.transfer(other.address, TEST_AMOUNT))
	// 		.to.emit(token, 'Transfer')
	// 		.withArgs(wallet.address, other.address, TEST_AMOUNT)
	// 	expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
	// 	expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	// })

	// it('transfer:fail', async () => {
	// 	await expect(token.transfer(other.address, TOTAL_SUPPLY.add(1))).to.be.reverted // ds-math-sub-underflow
	// 	await expect(token.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow
	// })

	// it('transferFrom', async () => {
	// 	await token.approve(other.address, TEST_AMOUNT)
	// 	await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
	// 		.to.emit(token, 'Transfer')
	// 		.withArgs(wallet.address, other.address, TEST_AMOUNT)
	// 	expect(await token.allowance(wallet.address, other.address)).to.eq(0)
	// 	expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
	// 	expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	// })

	// it('transferFrom:max', async () => {
	// 	await token.approve(other.address, maxUint256)
	// 	await expect(token.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
	// 		.to.emit(token, 'Transfer')
	// 		.withArgs(wallet.address, other.address, TEST_AMOUNT)
	// 	expect(await token.allowance(wallet.address, other.address)).to.eq(maxUint256)
	// 	expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
	// 	expect(await token.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	// })

	// it('permit', async () => {
	// 	const nonce = await token.nonces(wallet.address)
	// 	const deadline = maxUint256
	// 	const digest = await getApprovalDigest(
	// 		token,
	// 		{ owner: wallet.address, spender: other.address, value: TEST_AMOUNT },
	// 		nonce,
	// 		deadline
	// 	)
	// 	const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(deployWallet.privateKey.slice(2), 'hex'))

	// 	await expect(token.permit(wallet.address, other.address, TEST_AMOUNT, deadline, v, hexlify(r), hexlify(s)))
	// 		.to.emit(token, 'Approval')
	// 		.withArgs(wallet.address, other.address, TEST_AMOUNT)
	// 	expect(await token.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
	// 	expect(await token.nonces(wallet.address)).to.eq(BigNumber.from(1))
	// })
})
