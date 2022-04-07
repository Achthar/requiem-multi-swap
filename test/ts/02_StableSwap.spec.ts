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
import { ethers, network } from "hardhat";
import { getApprovalDigest, deployContractWithLibraries } from './shared/common'
// import {deployContractWithLibraries} from "./common";
import { maxUint256, toWei } from './shared/utilities'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import SwapArtifact from "../../artifacts/contracts/RequiemStableSwap.sol/RequiemStableSwap.json";
import NewSwapArtifact from "../../artifacts/contracts/StableSwap.sol/StableSwap.json";
import {
	RequiemPairFactory__factory,
	WeightedFormula__factory,
	MockERC20__factory,
	SwapRouter__factory,
	ThiefRouter__factory,
	RequiemPair,
	RequiemStableSwapLib__factory,
	RequiemStableSwap__factory,
	StableSwapLib__factory,
	StableSwap__factory,
	FeeDistributor__factory,
	WETH9__factory
} from "../../types";


const TOTAL_SUPPLY = toWei(10000)
const TEST_AMOUNT = toWei(10)

describe('StableSwap-Test', () => {
	let signers: SignerWithAddress[];

	let wallet: SignerWithAddress;
	let other: SignerWithAddress;
	let deployWallet: any;


	let tokenA: Contract
	let tokenB: Contract
	let tokenUSDC: Contract
	let tokenUSDT: Contract
	let tokenDAI: Contract
	let tokenTUSD: Contract

	let swapLib: Contract
	let swap: Contract

	let swapLibNew: Contract
	let swapNew: Contract

	let weth: Contract
	let formula: Contract
	let factory: Contract
	let factory2: Contract
	let feeDistributor: Contract
	let router: Contract
	let router2: Contract
	let thiefRouter: Contract

	let pairA_USDC_Contract: Contract
	let pairDAI_B_Contract: Contract
	let pairA_USDC_Contract2: Contract
	let pairDAI_B_Contract2: Contract
	// specs for pair
	let tokenWeightA = BigNumber.from(40)
	let tokenWeightB = BigNumber.from(60)
	let swapFee = BigNumber.from(10)
	let amplification = BigNumber.from(15000)

	let newSwapFee = BigNumber.from(20)
	let newAmplification = BigNumber.from(20000)

	let amountA = parseUnits('500', 18)
	let amountB = parseUnits('500', 18)

	let amountUSDC = parseUnits('1000', 18)
	let amountDAI = parseUnits('1000', 18)
	let pools: string[]
	let tokens: string[]
	let ZERO = BigNumber.from(0)
	let pairContract: Contract
	let deadline = '9999999999999999'
	let userBalance: any;
	let userBalanceBefore: any;
	let userBalanceAfter: any;
	let receipt: any
	let gasUsed: any
	let tx: any;
	let gasCosts = {}
	beforeEach(async () => {
		deployWallet = await ethers.Wallet.fromMnemonic(((network.config.accounts) as any).mnemonic);
		signers = await ethers.getSigners();
		wallet = signers[0];
		other = signers[1];

		// tokens
		tokenA = await new MockERC20__factory(wallet).deploy("token A", "A", 18)
		tokenB = await new MockERC20__factory(wallet).deploy("token B", "B", 18)
		tokenUSDC = await new MockERC20__factory(wallet).deploy("MockUSDC", "MUSDC", 18)
		tokenUSDT = await new MockERC20__factory(wallet).deploy("MockUSDT", "MUSDT", 18)
		tokenDAI = await new MockERC20__factory(wallet).deploy("MockDAI", "MDAI", 18)
		tokenTUSD = await new MockERC20__factory(wallet).deploy("MockTUSD", "MTUSD", 18)

		weth = await new WETH9__factory(wallet).deploy()
		formula = await new WeightedFormula__factory(wallet).deploy()
		factory = await new RequiemPairFactory__factory(wallet).deploy(wallet.address, formula.address, wallet.address)
		factory2 = await new RequiemPairFactory__factory(wallet).deploy(wallet.address, formula.address, wallet.address)
		router = await new SwapRouter__factory(wallet).deploy(factory.address, weth.address)

		router2 = await new SwapRouter__factory(wallet).deploy(factory2.address, weth.address)

		thiefRouter = await new ThiefRouter__factory(wallet).deploy(factory2.address, weth.address)

		await tokenA.approve(router.address, ethers.constants.MaxUint256)
		await tokenB.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(router.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(router.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(router.address, ethers.constants.MaxUint256)

		await tokenA.approve(router2.address, ethers.constants.MaxUint256)
		await tokenB.approve(router2.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router2.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(router2.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(router2.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(router2.address, ethers.constants.MaxUint256)

		await tokenUSDC.approve(thiefRouter.address, ethers.constants.MaxUint256)

		await new router.createPair(
			tokenA.address,
			tokenUSDC.address,
			amountA,
			amountUSDC,
			tokenWeightA,
			swapFee,
			amplification,
			wallet.address
		)

		await new router.createPair(
			tokenB.address,
			tokenDAI.address,
			amountB,
			amountDAI,
			tokenWeightB,
			swapFee,
			amplification,
			wallet.address
		)

		const pairA_USDC = await factory.getPair(tokenA.address, tokenUSDC.address, tokenWeightA)
		pairA_USDC_Contract = await ethers.getContractAt('RequiemPair', pairA_USDC)


		const pairDAI_B = await factory.getPair(tokenB.address, tokenDAI.address, tokenWeightB)
		pairDAI_B_Contract = await ethers.getContractAt('RequiemPair', pairDAI_B)


		await new router2.createPair(
			tokenA.address,
			tokenUSDC.address,
			amountA,
			amountUSDC,
			tokenWeightA,
			swapFee,
			amplification,
			wallet.address
		)

		await new router2.createPair(
			tokenB.address,
			tokenDAI.address,
			amountB,
			amountDAI,
			tokenWeightB,
			swapFee,
			amplification,
			wallet.address
		)

		const pairA_USDC2 = await factory.getPair(tokenA.address, tokenUSDC.address, tokenWeightA)
		pairA_USDC_Contract2 = await ethers.getContractAt('RequiemPair', pairA_USDC2)


		const pairDAI_B2 = await factory.getPair(tokenB.address, tokenDAI.address, tokenWeightB)
		pairDAI_B_Contract2 = await ethers.getContractAt('RequiemPair', pairDAI_B2)

	})
	it('initialize', async () => {

		// swap lib
		swapLib = await new RequiemStableSwapLib__factory(wallet).deploy()
		swap = await deployContractWithLibraries(wallet, SwapArtifact, { RequiemStableSwapLib: swapLib.address })
		feeDistributor = await new FeeDistributor__factory(wallet).deploy()

		await swap.initialize(
			[tokenUSDC.address, tokenUSDT.address, tokenDAI.address, tokenTUSD.address],
			[6, 6, 18, 18], //token decimals
			'Requiem Stableswap LP', // pool token name
			'zDollar', //_pool_token
			600, // _A
			1e6, //_fee = 0.01%
			1e6, // flash Fee
			5e9, //_admin_fee, 50%,
			5e7, //withdraw fee = 0.5%
			feeDistributor.address
		)

		await tokenUSDC.approve(swap.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(swap.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(swap.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swap.address, ethers.constants.MaxUint256)


		await swap.addLiquidity(
			[parseUnits('123401', 6), parseUnits('102342', 6), parseUnits('104233', 18), parseUnits('102334', 18)],
			0,
			deadline
		)


		// swap libnew 
		swapLibNew = await new StableSwapLib__factory(wallet).deploy()
		swapNew = await deployContractWithLibraries(wallet, NewSwapArtifact, { StableSwapLib: swapLibNew.address })

		console.log("REGLAR DONE 0")

		await swapNew.initialize(
			[tokenUSDC.address, tokenUSDT.address, tokenDAI.address, tokenTUSD.address],
			[6, 6, 18, 18], //token decimals
			'Requiem Stableswap LP', // pool token name
			'zDollar', //_pool_token
			600, // _A
			1e6, //_fee = 0.01%
			5e9, //_admin_fee, 50%,
			5e7, //withdraw fee = 0.5%
			feeDistributor.address
		)

		await tokenUSDC.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swapNew.address, ethers.constants.MaxUint256)


		console.log("NEW INIT")


		await swapNew.addLiquidity(
			[parseUnits('123401', 6), parseUnits('102342', 6), parseUnits('104233', 18), parseUnits('102334', 18)],
			0,
			deadline
		)

		console.log("ADDED LP")



		tokens = [tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
		console.log("Pools", pools)
		console.log("Tokens", tokens)
		const amountIn = parseUnits("1", 6)
		const amountOutMin = ZERO

		pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
		tx = await router.onSwapExactTokensForTokens(
			pools,
			tokens,
			amountIn,
			amountOutMin,
			wallet.address,
			deadline
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
		gasCosts = { ...gasCosts, exactInStandard: gasUsed }

		pools = [pairA_USDC_Contract2.address, swapNew.address, pairDAI_B_Contract2.address]
		tx = await router2.onSwapExactTokensForTokens(
			pools,
			tokens,
			amountIn,
			amountOutMin,
			wallet.address,
			deadline
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
		gasCosts = { ...gasCosts, exactInNew: gasUsed }


		let balances = await swapNew.getTokenBalances()
		console.log("BALANCES before", balances)

		pools = [swapNew.address]
		tokens = [tokenUSDC.address, tokenDAI.address]
		await router2.onSwapExactTokensForTokens(
			pools,
			tokens,
			amountIn,
			amountOutMin,
			wallet.address,
			deadline
		)
		balances = await swapNew.getTokenBalances()
		console.log("BALANCES after", balances)


		const usdcBal = await tokenUSDC.balanceOf(swapNew.address)
		const usdtBal = await tokenUSDT.balanceOf(swapNew.address)
		const daiBal = await tokenDAI.balanceOf(swapNew.address)
		const tusdBal = await tokenTUSD.balanceOf(swapNew.address)

		console.log("ACT:", usdcBal, usdtBal, daiBal, tusdBal)


		const amountOut = BigNumber.from(10000000000)
		const amountInMax = ethers.constants.MaxUint256
		pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
		tokens = [tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
		tx = await router.onSwapTokensForExactTokens(
			pools,
			tokens,
			amountOut,
			amountInMax,
			wallet.address,
			deadline
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
		gasCosts = { ...gasCosts, exactOutStandard: gasUsed }
		console.log("EXACT OUT STANDARD DONE")
		userBalanceBefore = await tokenB.balanceOf(wallet.address)

		pools = [pairA_USDC_Contract2.address, swapNew.address, pairDAI_B_Contract2.address]
		tx = await router2.onSwapTokensForExactTokens(
			pools,
			tokens,
			amountOut,
			amountInMax,
			wallet.address,
			deadline
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
		gasCosts = { ...gasCosts, exactOutNew: gasUsed }
		userBalanceAfter = await tokenB.balanceOf(wallet.address)

		expect(userBalanceAfter.sub(userBalanceBefore)).to.eq(amountOut)
		console.log("GASOVERVIEW", gasCosts)

		pools = [swap.address]
		tokens = [tokenDAI.address, tokenUSDC.address]
		await router2.onSwapTokensForExactTokens(
			pools,
			tokens,
			amountOut,
			amountInMax,
			wallet.address,
			deadline
		)

		pools = [swapNew.address]
		tokens = [tokenUSDC.address, tokenDAI.address]
		await expect(thiefRouter.onSwapExactTokensForTokens(
			pools,
			tokens,
			amountIn,
			amountOutMin,
			wallet.address,
			deadline
		)).to.be.revertedWith("b")
		// const pair = await factory.getPair(tokenUSDC.address, tokenTUSD.address, tokenWeightA)
		// pairContract = await ethers.getContractAt('RequiemPair', pair)


		// expect(await formula.getAmountOut(1000, 10023423400, 2313453450000, 98, 2, 0)).to.eq(11309403)
		// // expect(getAmountOut(1000, 10023423400, 2313453450000, 98, 2, 0)).to.eq(11309403);


		// expect(await formula.getAmountOut(100023423, 10023423400, 2313453450000, 98, 2, 0)).to.eq(891266825871)
		// // expect(getAmountOut(100023423, 10023423400, 2313453450000, 98, 2, 0)).to.eq(891266825871);

		// expect(await formula.getAmountOut(10023423400, 10023423400, 2313453450000, 98, 2, 0)).to.eq(2313453449999)
		// // expect(await getAmountOut(10023423400, 10023423400, 2313453450000, 98, 2, 0)).to.eq(2313453449999)
		// expect(await formula.getAmountOut(10023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(32495410881)
		// // expect(await getAmountOut(10023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(32495410881)


		// expect(await formula.getAmountOut(20023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(51256025942)
		// // expect(await getAmountOut(20023423400, 10023423400, 2313453450000, 2, 98, 0)).to.eq(51256025942)



		// expect(await formula.getAmountOut("4232002342342343", "100234234002342342343", "300234232002342342343", 2, 98, 0)).to.eq("258692951827702")
		// // expect(await getAmountOut("4232002342342343", "100234234002342342343", "300234232002342342343", 2, 98, 0)).to.eq("258692951827702")

		// expect(await formula.getAmountOut("0", "100234234002342342343", "300234232002342342343", 2, 98, 0)).to.eq("0")

		// const name = await pairContract.name()
		// const symbol = await pairContract.symbol()
		// console.log("Name, Symbol", name, symbol)
		// const amountIn = parseUnits("1", 18)

		// const price = await pairContract.calculateSwapGivenIn(tokenA.address, tokenB.address, amountIn)
		// console.log("Price", price)

		// await router.onSwapExactTokensForTokens(
		// 	[pair],
		// 	[tokenA.address, tokenB.address],
		// 	amountIn,
		// 	ZERO,
		// 	wallet.address,
		// 	deadline
		// )
		// const reserves = await pairContract.getReserves()
		// console.log("Reserves:", reserves)


		// const params = await pairContract.getParameters()
		// console.log("Parameters:", params)

		// await factory.setSwapParams(pair, newSwapFee, newAmplification)

		// await router.onSwapExactTokensForTokens(
		// 	[pair],
		// 	[tokenA.address, tokenB.address],
		// 	amountIn,
		// 	ZERO,
		// 	wallet.address,
		// 	deadline
		// )
		// const newReserves = await pairContract.getReserves()
		// console.log("New Reserves:", newReserves)


		// const newRarams = await pairContract.getParameters()
		// console.log("New Parameters:", newRarams)

		// const name = await token.name()
		// expect(name).to.eq('FireBird Liquidity Provider')
		// expect(await token.symbol()).to.eq('FLP')
		// expect(await token.decimals()).to.eq(18)
		// expect(await token.totalSupply()).to.eq(TOTAL_SUPPLY)
		// expect(await token.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY)
		// expect(await token.DOMAIN_SEPARATOR()).to.eq(
		// 	keccak256(
		// 		defaultAbiCoder.encode(
		// 			['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
		// 			[
		// 				keccak256(
		// 					toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
		// 				),
		// 				keccak256(toUtf8Bytes(name)),
		// 				keccak256(toUtf8Bytes('1')),
		// 				1,
		// 				token.address
		// 			]
		// 		)
		// 	)
		// )
		// expect(await token.PERMIT_TYPEHASH()).to.eq(
		// 	keccak256(toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'))
		// )
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

