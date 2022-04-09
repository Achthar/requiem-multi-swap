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
	let tokenC: Contract
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
	let pairA_B_Contract: Contract
	let pairA_B_Contract2: Contract
	let pairB_C_Contract: Contract
	let pairB_C_Contract2: Contract

	// specs for pair
	let tokenWeightA = BigNumber.from(40)
	let tokenWeightB = BigNumber.from(60)
	let swapFee = BigNumber.from(10)
	let amplification = BigNumber.from(15000)
	let amountIn: BigNumber
	let amountOut: BigNumber
	let newSwapFee = BigNumber.from(20)
	let newAmplification = BigNumber.from(20000)

	let amountA = parseUnits('500', 18)
	let amountB = parseUnits('500', 18)
	let amountC = parseUnits('321', 8)
	const amountInMax = ethers.constants.MaxUint256
	let amountUSDC = parseUnits('1000', 6)
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
	let balancesVitual: any[]
	let balancesPoolActual: any[]
	let validateBals: any
	let testSwapExactOut: any
	let printBals: any

	let counter = 0
	beforeEach(async () => {
		deployWallet = await ethers.Wallet.fromMnemonic(((network.config.accounts) as any).mnemonic);
		signers = await ethers.getSigners();
		wallet = signers[0];
		other = signers[1];

		// tokens
		tokenA = await new MockERC20__factory(wallet).deploy("token A", "A", 18)
		tokenB = await new MockERC20__factory(wallet).deploy("token B", "B", 18)
		tokenC = await new MockERC20__factory(wallet).deploy("token C", "C", 8)
		tokenUSDC = await new MockERC20__factory(wallet).deploy("MockUSDC", "MUSDC", 6)
		tokenUSDT = await new MockERC20__factory(wallet).deploy("MockUSDT", "MUSDT", 6)
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
		await tokenC.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(router.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(router.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(router.address, ethers.constants.MaxUint256)

		await tokenA.approve(router2.address, ethers.constants.MaxUint256)
		await tokenB.approve(router2.address, ethers.constants.MaxUint256)
		await tokenC.approve(router2.address, ethers.constants.MaxUint256)
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

		await new router.createPair(
			tokenA.address,
			tokenB.address,
			amountA,
			amountB,
			50,
			swapFee,
			amplification,
			wallet.address
		)


		await new router.createPair(
			tokenC.address,
			tokenB.address,
			amountC,
			amountB,
			22,
			swapFee,
			amplification,
			wallet.address
		)


		const pairA_USDC = await factory.getPair(tokenA.address, tokenUSDC.address, tokenWeightA)
		pairA_USDC_Contract = await ethers.getContractAt('RequiemPair', pairA_USDC)


		const pairDAI_B = await factory.getPair(tokenB.address, tokenDAI.address, tokenWeightB)
		pairDAI_B_Contract = await ethers.getContractAt('RequiemPair', pairDAI_B)

		const pairA_B = await factory.getPair(tokenA.address, tokenB.address, 50)
		pairA_B_Contract = await ethers.getContractAt('RequiemPair', pairA_B)

		const pairB_C = await factory2.getPair(tokenC.address, tokenB.address, 22)
		pairB_C_Contract = await ethers.getContractAt('RequiemPair', pairB_C)



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

		await new router2.createPair(
			tokenA.address,
			tokenB.address,
			amountA,
			amountB,
			50,
			swapFee,
			amplification,
			wallet.address
		)

		await new router2.createPair(
			tokenC.address,
			tokenB.address,
			amountC,
			amountB,
			22,
			swapFee,
			amplification,
			wallet.address
		)

		const pairA_USDC2 = await factory2.getPair(tokenA.address, tokenUSDC.address, tokenWeightA)
		pairA_USDC_Contract2 = await ethers.getContractAt('RequiemPair', pairA_USDC2)


		const pairDAI_B2 = await factory2.getPair(tokenB.address, tokenDAI.address, tokenWeightB)
		pairDAI_B_Contract2 = await ethers.getContractAt('RequiemPair', pairDAI_B2)


		const pairA_B2 = await factory2.getPair(tokenA.address, tokenB.address, 50)
		pairA_B_Contract2 = await ethers.getContractAt('RequiemPair', pairA_B2)

		const pairB_C2 = await factory2.getPair(tokenC.address, tokenB.address, 22)
		pairB_C_Contract2 = await ethers.getContractAt('RequiemPair', pairB_C2)

		// swap lib
		swapLib = await new RequiemStableSwapLib__factory(wallet).deploy()
		swap = await deployContractWithLibraries(wallet, SwapArtifact, { RequiemStableSwapLib: swapLib.address })
		feeDistributor = await new FeeDistributor__factory(wallet).deploy()

		// swap libnew 
		swapLibNew = await new StableSwapLib__factory(wallet).deploy()
		swapNew = await deployContractWithLibraries(wallet, NewSwapArtifact, { StableSwapLib: swapLibNew.address })

		console.log("REGLAR DONE 0")

		console.log("Approve for old swap")

		await tokenUSDC.approve(swap.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(swap.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(swap.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swap.address, ethers.constants.MaxUint256)


		console.log("Approve for swap")
		await tokenUSDC.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swapNew.address, ethers.constants.MaxUint256)


		validateBals = async (descr: string) => {

			balancesVitual = await swapNew.getTokenBalances()
			const fees = await swapNew.getCollectedFees()
			balancesPoolActual = [
				await tokenUSDC.balanceOf(swapNew.address),
				await tokenUSDT.balanceOf(swapNew.address),
				await tokenDAI.balanceOf(swapNew.address),
				await tokenTUSD.balanceOf(swapNew.address)
			]
			console.log("-----------------------------------------------")
			console.log(descr)
			console.log("Diff", balancesPoolActual.map((x, index) => x.sub(balancesVitual[index])))
			console.log("Fees", fees)
			console.log("-----------------------------------------------")
		}

		printBals = async (descr: string) => {

			balancesVitual = await swapNew.getTokenBalances()
			balancesPoolActual = [
				await tokenUSDC.balanceOf(swapNew.address),
				await tokenUSDT.balanceOf(swapNew.address),
				await tokenDAI.balanceOf(swapNew.address),
				await tokenTUSD.balanceOf(swapNew.address)
			]
			console.log("-----------------------------------------------")
			console.log(descr)
			console.log("bals", balancesPoolActual)

			console.log("-----------------------------------------------")
		}


		testSwapExactOut = async (_tokens: string[], poolsBase: Contract[], poolsNew: Contract[], _amountOut: BigNumber) => {

			counter += 1
			const inContract = await ethers.getContractAt('MockERC20', _tokens[0])
			const outContract = await ethers.getContractAt('MockERC20', _tokens[_tokens.length - 1])
			console.log("---------------------------- TEST ORIG")
			tx = await router2.onSwapTokensForExactTokens(
				poolsBase.map(x => x.address),
				_tokens,
				_amountOut,
				amountInMax,
				other.address,
				deadline
			)
			// record gas
			receipt = await tx.wait();
			gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
			gasCosts = { ...gasCosts, ['exactOutOld-' + String(poolsNew.length) + '-' + String(counter)]: gasUsed }

			const _userBalanceBeforeIn = await inContract.balanceOf(wallet.address)
			const _userBalanceBeforeOut = await outContract.balanceOf(wallet.address)

			let inAm = _amountOut;
			let amns = [_amountOut]
			for (let k = poolsNew.length - 1; k >= 0; k--) {

				const _inAm = await poolsNew[k].calculateSwapGivenOut(_tokens[k], _tokens[k + 1], inAm)
				inAm = _inAm
				amns.push(inAm)
			}
			console.log("---------------------------- TEST NEW")
			tx = await router2.onSwapTokensForExactTokens(
				poolsNew.map(x => x.address),
				_tokens,
				_amountOut,
				amountInMax,
				wallet.address,
				deadline
			)
			// record gas
			receipt = await tx.wait();
			gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
			gasCosts = { ...gasCosts, ['exactOutNew-' + String(poolsNew.length) + '-' + String(counter)]: gasUsed }

			console.log("--------GC" + String(counter), gasCosts)
			const _userBalanceAfterIn = await inContract.balanceOf(wallet.address)
			const _userBalanceAfterOut = await outContract.balanceOf(wallet.address)
			console.log("--------GC bals", _userBalanceAfterOut, _userBalanceBeforeOut, amns)
			expect(_userBalanceAfterOut.sub(_userBalanceBeforeOut)).to.eq(_amountOut)
			expect(_userBalanceBeforeIn.sub(_userBalanceAfterIn)).to.eq(inAm)
			console.log("---------------------------- TEST DONE")
		}

	})

	it('initialize', async () => {

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



		describe('StableSwap-Transactions add', () => {
			it('add liquidity', async () => {

				// console.log("SWAP OBJS", swap, swapNew)
				const ss = await swap.swapStorage()
				console.log("SS", ss)
				await swap.addLiquidity(
					[parseUnits('123401', 6), parseUnits('102342', 6), parseUnits('104233', 18), parseUnits('102334', 18)],
					0,
					deadline
				)


				console.log("NEW INIT")


				await swapNew.addLiquidity(
					[parseUnits('123401', 6), parseUnits('102342', 6), parseUnits('104233', 18), parseUnits('102334', 18)],
					0,
					deadline
				)
				console.log("ADDED LP")

				describe('StableSwap-Transactions trade', () => {
					it('Swaps caculation', async () => {

						let tokenIn = tokenDAI.address
						let tokenOut = tokenUSDC.address
						amountIn = parseUnits('11', 18)
						const outOld = await swap.calculateSwapGivenIn(
							tokenIn,
							tokenOut,
							amountIn
						)

						const outNew = await swap.calculateSwapGivenIn(
							tokenIn,
							tokenOut,
							amountIn
						)

						console.log("OUTS old", outOld, outNew)
						expect(outNew).to.eq(outOld)
						amountOut = parseUnits('13', 6)
						const inOld = await swap.calculateSwapGivenOut(
							tokenIn,
							tokenOut,
							amountOut
						)

						const inNew = await swap.calculateSwapGivenOut(
							tokenIn,
							tokenOut,
							amountOut
						)

						console.log("IN old", inOld, inNew)
						expect(inNew).to.eq(inOld)

						console.log("GAS single", gasCosts)
					})

					describe('StableSwap-Transaction single', () => {
						it('Swaps single', async () => {
							pools = [swapNew.address]
							tokens = [tokenDAI.address, tokenUSDC.address]
							amountOut = parseUnits('12', 6)

							let balancesPre = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]

							const userBalsPre = [

								await tokenUSDC.balanceOf(wallet.address),
								await tokenUSDT.balanceOf(wallet.address),
								await tokenDAI.balanceOf(wallet.address),
								await tokenTUSD.balanceOf(wallet.address)
							]

							console.log("bals pre pool", balancesPre)
							console.log("bals pre user", userBalsPre)
							const expectedIn = await swapNew.calculateSwapGivenOut(tokenDAI.address, tokenUSDC.address, amountOut)
							const expectedIn2 = await swap.calculateSwapGivenOut(tokenDAI.address, tokenUSDC.address, amountOut)


							balancesVitual = await swapNew.getTokenBalances()
							balancesPoolActual = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]
							console.log("BALANCES VOMP single pre")
							console.log("ACT", balancesPoolActual)
							console.log("VRT", balancesVitual)


							tx = await router2.onSwapTokensForExactTokens(
								pools,
								tokens,
								amountOut,
								amountInMax,
								wallet.address,
								deadline
							)
							receipt = await tx.wait();
							gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
							gasCosts = { ...gasCosts, exactOutSingleNew: gasUsed }
							let postBalances = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]
							const userBalsPost = [
								await tokenUSDC.balanceOf(wallet.address),
								await tokenUSDT.balanceOf(wallet.address),
								await tokenDAI.balanceOf(wallet.address),
								await tokenTUSD.balanceOf(wallet.address)
							]


							expect(userBalsPost[0].sub(userBalsPre[0])).to.eq(amountOut)

							console.log("calculated", expectedIn, expectedIn2, "exp", userBalsPre[2].sub(userBalsPost[2]))
							expect(userBalsPre[2].sub(userBalsPost[2])).to.eq(expectedIn)


							balancesVitual = await swapNew.getTokenBalances()
							balancesPoolActual = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]
							console.log("BALANCES VOMP sngle post")
							console.log("ACT", balancesPoolActual)
							console.log("VRT", balancesVitual)

							// console.log("ACT:", usdcBal, usdtBal, daiBal, tusdBal)


							console.log("bals post pool", postBalances)

							console.log("bals post user", userBalsPost)

							// await tokenDAI.connect(other).approve(router2.address, ethers.constants.MaxUint256)
							tx = await router2.onSwapTokensForExactTokens(
								[swap.address],
								tokens,
								amountOut,
								amountInMax,
								other.address,
								deadline
							)
							receipt = await tx.wait();
							gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
							gasCosts = { ...gasCosts, exactOutSingleStandard: gasUsed }



							console.log("REGSWAP ", gasCosts)
						})
					})
					describe('StableSwap-Transactions Swaps multi', () => {
						it('Swaps', async () => {

							pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
							tokens = [tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
							console.log("Pools", pools)
							console.log("Tokens", tokens)
							amountIn = parseUnits("1", 15)
							const amountOutMin = ZERO


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
							console.log("Exact in multi")

							const in1 = await pairA_USDC_Contract2.calculateSwapGivenIn(tokenA.address, tokenUSDC.address, amountIn)

							const in2 = await swapNew.calculateSwapGivenIn(tokenUSDC.address, tokenDAI.address, in1)

							const in3 = await pairDAI_B_Contract2.calculateSwapGivenIn(tokenUSDC.address, tokenDAI.address, in2)
							console.log("Amnts", in1, in2, in3)
							let b = await tokenUSDC.balanceOf(swapNew.address)
							console.log("B USDC 1", b)
							console.log("1")
							await router2.onSwapExactTokensForTokens(
								[pairA_USDC_Contract2.address],
								[tokenA.address, tokenUSDC.address],
								amountIn,
								amountOutMin,
								wallet.address,
								deadline
							)
							b = await tokenUSDC.balanceOf(swapNew.address)
							let c = await swapNew.getTokenBalances()
							let f = await swapNew.getCollectedFees()
							console.log("B USDC rp 2", b, c, f)
							console.log("2")
							await router2.onSwapExactTokensForTokens(
								[swapNew.address],
								[tokenUSDC.address, tokenDAI.address],
								in1,
								amountOutMin,
								wallet.address,
								deadline
							)
							b = await tokenUSDC.balanceOf(swapNew.address)
							c = await swapNew.getTokenBalances()
							console.log("B USDC rp 3", b, c)
							console.log("3")
							await validateBals("before SS")
							await router2.onSwapExactTokensForTokens(
								[pairDAI_B_Contract2.address],
								[tokenDAI.address, tokenB.address],
								in2,
								amountOutMin,
								wallet.address,
								deadline
							)
							await validateBals("after SS")
							console.log("d0ne")
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

							let amountOut = BigNumber.from('1000')

							pools = [pairA_USDC_Contract2.address, swapNew.address, pairDAI_B_Contract2.address]



							console.log("Exact in multi 1")
							await validateBals("Exact in multi 1 before")
							tx = await router2.onSwapTokensForExactTokens(
								pools,
								tokens,
								amountOut,
								amountInMax,
								wallet.address,
								deadline
							)

							await validateBals("Exact in multi 1 after")
							// record gas
							receipt = await tx.wait();
							gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
							gasCosts = { ...gasCosts, exactOutNew: gasUsed }
							console.log("EXACT OUT STANDARD DONE")
							userBalanceBefore = await tokenB.balanceOf(wallet.address)

							balancesVitual = await swapNew.getTokenBalances()
							balancesPoolActual = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]
							console.log("BALANCES VOMP 1")
							console.log("ACT", balancesPoolActual)
							console.log("VRT", balancesVitual)

							pools = [pairA_USDC_Contract2.address, swap.address, pairDAI_B_Contract2.address]
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
							gasCosts = { ...gasCosts, exactOutStandard: gasUsed }
							userBalanceAfter = await tokenB.balanceOf(wallet.address)

							expect(userBalanceAfter.sub(userBalanceBefore)).to.eq(amountOut)
							console.log("GASOVERVIEW", gasCosts)


							tokens = [tokenUSDC.address, tokenDAI.address]

							pools = [swapNew.address]



							amountIn = parseUnits("1", 6)
							await expect(thiefRouter.onSwapExactTokensForTokens(
								pools,
								tokens,
								amountIn,
								amountOutMin,
								wallet.address,
								deadline
							)).to.be.revertedWith("insufficient in")



							balancesPoolActual = [
								await tokenUSDC.balanceOf(swapNew.address),
								await tokenUSDT.balanceOf(swapNew.address),
								await tokenDAI.balanceOf(swapNew.address),
								await tokenTUSD.balanceOf(swapNew.address)
							]
							balancesVitual = await swapNew.getTokenBalances()

							console.log("BALANCES VOMP")
							console.log("ACT", balancesPoolActual)
							console.log("VRT", balancesVitual)

							amountIn = parseUnits("1", 18)
							await tokenDAI.approve(thiefRouter.address, ethers.constants.MaxUint256)
							tokens = [tokenDAI.address, tokenUSDC.address]
							pools = [swapNew.address]
							await expect(thiefRouter.onSwapExactTokensForTokens(
								pools,
								tokens,
								amountIn,
								amountOutMin,
								wallet.address,
								deadline
							)).to.be.revertedWith("insufficient in")


							describe('Multi-Swap 4 Pool', () => {
								it('2S1 struct', async () => {
									tokens = [tokenB.address, tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
									pools = [pairA_B_Contract2.address, pairA_USDC_Contract2.address, swap.address, pairDAI_B_Contract2.address]
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
									gasCosts = { ...gasCosts, exactOut4Standard: gasUsed }

									userBalanceAfter = await tokenB.balanceOf(wallet.address)

									tokens = [tokenB.address, tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
									pools = [pairA_B_Contract2.address, pairA_USDC_Contract2.address, swapNew.address, pairDAI_B_Contract2.address]
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
									gasCosts = { ...gasCosts, exactOut4New: gasUsed }


									// expect(userBalanceAfter.sub(userBalanceBefore)).to.eq(amountOut)
									console.log("GASOVERVIEW", gasCosts)


								})
							})
							describe('Multi-Swap 4 Pool 1S2', () => {
								it('1S2 struct 2', async () => {
									tokens = [tokenB.address, tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
									pools = [pairA_B_Contract.address, pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
									console.log("----------------------- test 1 Orig")
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
									gasCosts = { ...gasCosts, exactOut4Standard: gasUsed }

									userBalanceAfter = await tokenB.balanceOf(wallet.address)

									tokens = [tokenB.address, tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address]
									pools = [pairA_B_Contract2.address, pairA_USDC_Contract2.address, swapNew.address, pairDAI_B_Contract2.address]
									console.log("----------------------- test 1 New")
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
									gasCosts = { ...gasCosts, exactOut4New: gasUsed }


									// expect(userBalanceAfter.sub(userBalanceBefore)).to.eq(amountOut)

									// 6 Swap
									let _tokens = [
										tokenB.address, tokenA.address, tokenUSDC.address, tokenDAI.address, tokenB.address, tokenC.address
									]
									let poolsBase = [
										pairA_B_Contract, pairA_USDC_Contract, swap, pairDAI_B_Contract, pairB_C_Contract2
									]
									let poolsNew = [
										pairA_B_Contract2, pairA_USDC_Contract2, swapNew, pairDAI_B_Contract2, pairB_C_Contract2
									]

									let _amountOut = parseUnits("1", 10)

									await testSwapExactOut(
										_tokens, // _tokens: string[],
										poolsBase, //  poolsBase: Contract[],
										poolsNew, //   poolsNew: Contract[], 
										_amountOut //   _amountOut: BigNumber
									)

									// stable at end
									_tokens = [
										tokenB.address, tokenDAI.address, tokenUSDC.address
									]
									poolsBase = [
										pairDAI_B_Contract2, swapNew
									]
									poolsNew = [
										pairDAI_B_Contract2, swapNew
									]

									_amountOut = parseUnits("1", 6)

									await testSwapExactOut(
										_tokens, // _tokens: string[],
										poolsBase, //  poolsBase: Contract[],
										poolsNew, //   poolsNew: Contract[], 
										_amountOut //   _amountOut: BigNumber
									)
									// stable at beginning
									_tokens = [
										tokenDAI.address, tokenUSDC.address, tokenA.address
									]
									poolsBase = [
										pairDAI_B_Contract2, swap, pairA_USDC_Contract2
									]
									poolsNew = [
										pairDAI_B_Contract2, swapNew, pairA_USDC_Contract2
									]

									_amountOut = parseUnits("1", 6)

									await testSwapExactOut(
										_tokens, // _tokens: string[],
										poolsBase, //  poolsBase: Contract[],
										poolsNew, //   poolsNew: Contract[], 
										_amountOut //   _amountOut: BigNumber
									)

									// beginning low decimal
									_tokens = [
										tokenUSDC.address, tokenDAI.address, tokenB.address
									]
									poolsBase = [
										swap, pairDAI_B_Contract2
									]
									poolsNew = [
										swapNew, pairDAI_B_Contract2
									]

									_amountOut = parseUnits("1", 18)

									await testSwapExactOut(
										_tokens, // _tokens: string[],
										poolsBase, //  poolsBase: Contract[],
										poolsNew, //   poolsNew: Contract[], 
										_amountOut //   _amountOut: BigNumber
									)
									console.log("GASOVERVIEW", gasCosts)
								})
							})


							describe('StableSwap-Calculation matches swap', () => {
								it('calculation', async () => {

									pools = [pairDAI_B_Contract.address, swapNew.address, pairA_USDC_Contract.address]
									tokens = [tokenB.address, tokenDAI.address, tokenUSDC.address, tokenA.address]
									console.log("Pools", pools)
									console.log("Tokens", tokens)
									amountOut = parseUnits("1", 15)
									const preBalA = await tokenA.balanceOf(wallet.address)
									const preBalB = await tokenB.balanceOf(wallet.address)




									const in02 = await pairA_USDC_Contract.calculateSwapGivenOut(tokenDAI.address, tokenA.address, amountOut)

									const in01 = await swapNew.calculateSwapGivenOut(tokenDAI.address, tokenUSDC.address, in02)


									const inB = await pairDAI_B_Contract.calculateSwapGivenOut(tokenB.address, tokenDAI.address, in01)

									await router2.onSwapTokensForExactTokens(
										pools,
										tokens,
										amountOut,
										amountInMax,
										wallet.address,
										deadline
									)
									const postBalA = await tokenA.balanceOf(wallet.address)
									const postBalB = await tokenB.balanceOf(wallet.address)
									console.log("VALIDITY")
									console.log("deltaA", postBalA.sub(preBalA))
									console.log("deltaB", preBalB.sub(postBalB))
									console.log("expected delta B", inB)
									expect(postBalA.sub(preBalA)).to.eq(amountOut)
									expect(preBalB.sub(postBalB)).to.eq(inB)

								})
							})
							describe('StableSwap-Post transactions', () => {
								it('Fee withdrawl', async () => {

									let balancesPre = [
										await tokenUSDC.balanceOf(wallet.address),
										await tokenUSDT.balanceOf(wallet.address),
										await tokenDAI.balanceOf(wallet.address),
										await tokenTUSD.balanceOf(wallet.address)
									]
									console.log("BALS", balancesPre)
									await swapNew.withdrawAdminFee()

									let postBalances = [
										await tokenUSDC.balanceOf(wallet.address),
										await tokenUSDT.balanceOf(wallet.address),
										await tokenDAI.balanceOf(wallet.address),
										await tokenTUSD.balanceOf(wallet.address)
									]

									console.log("Fee", postBalances.map((post: any, index: number) => post.sub(balancesPre[index])))
								})

								it('Liquidity withdrawl', async () => {
									const ss = await swapNew.swapStorage()
									const lpToken = await ethers.getContractAt('LPToken', ss.lpToken)
									const lpBal = await lpToken.balanceOf(wallet.address)

									await lpToken.approve(swapNew.address, ethers.constants.MaxUint256)
									const toRemove = await swapNew.calculateRemoveLiquidity(wallet.address, lpBal.div(2))
									console.log("to Remove ", toRemove)
									await printBals("pre withdrawl balances")
									await swapNew.removeLiquidity(lpBal.div(2), balancesPoolActual.map(x => ZERO), deadline)
									await printBals("post withdrawl balances")
								})
							})
						})
					})
				})
			})
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

})