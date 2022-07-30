import { expect } from "./chai-setup";
import { BigNumber, Contract } from 'ethers'

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

import NewSwapArtifact from "../../artifacts/contracts/poolBalanced/BalancedPool.sol/BalancedPool.json";
import {
	RequiemPairFactory__factory,
	WeightedFormula__factory,
	MockERC20__factory,
	SwapRouter__factory,
	ThiefRouter__factory,
	RequiemPair,
	BalancedPoolLib__factory,
	BalancedPool__factory,
	WeightedMathTest__factory,
	MockFlashLoanRecipient__factory,
	WETH9__factory,
	SwapRouter
} from "../../types";


const TOTAL_SUPPLY = toWei(10000)
const TEST_AMOUNT = toWei(10)

describe('WeightedPool-Test', () => {
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
	let tokenWETH: Contract
	let tokenWBTC: Contract

	let swapLibNew: Contract
	let swapNew: Contract

	let weth: Contract
	let formula: Contract
	let factory: Contract
	let factory2: Contract
	let router: Contract
	let router2: SwapRouter
	let thiefRouter: Contract
	let weightedMath: Contract

	let fLoanRecipient: Contract

	let pairA_USDC_Contract: Contract
	let pairDAI_B_Contract: Contract
	let pairA_USDC_Contract2: Contract
	let pairDAI_B_Contract2: Contract
	let pairA_B_Contract: Contract
	let pairA_B_Contract2: Contract
	let pairB_C_Contract: Contract
	let pairB_C_Contract2: Contract
	let pairC_WBTC_Contract2: Contract
	let pairB_WETH_Contract2: Contract
	let pairWBTC_C_Contract2: Contract
	let pairC_WETH_Contract2: Contract

	// specs for pair
	let tokenWeightA = BigNumber.from(40)
	let tokenWeightB = BigNumber.from(60)
	let swapFee = BigNumber.from(123)
	let amplification = BigNumber.from(15000)
	let amountIn: BigNumber
	let amountOut: BigNumber
	let newSwapFee = BigNumber.from(20)
	let newAmplification = BigNumber.from(20000)
	let weights: BigNumber[]
	let amountA = parseUnits('5010', 18)
	let amountB = parseUnits('5020', 18)
	let amountC = parseUnits('3231', 8)
	const amountInMax = ethers.constants.MaxUint256
	let amountUSDC = parseUnits('10010', 6)
	let amountDAI = parseUnits('10000', 18)
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
	let inPre: any;
	let outPre: any
	let poolTokens: any[]
	let inPost: any
	let outPost: any
	let gasCosts = {}
	let balancesVitual: any[]
	let balancesPoolActual: any[]
	let validateBals: any
	let testSwapExactOut: any
	let testSwapExactIn: any
	let printBals: any
	let validateSwapBals: any
	let swapManual: any
	let counter = 0
	beforeEach(async () => {
		deployWallet = await ethers.Wallet.fromMnemonic(((network.config.accounts) as any).mnemonic);
		signers = await ethers.getSigners();
		wallet = signers[0];
		other = signers[1];

		// tokens
		tokenA = await new MockERC20__factory(wallet).deploy("token A", "A", 18)
		tokenB = await new MockERC20__factory(wallet).deploy("token B", "B", 18)
		tokenWETH = await new MockERC20__factory(wallet).deploy("WETH", "WETH", 18)
		tokenWBTC = await new MockERC20__factory(wallet).deploy("WBTC", "WBTC", 18)
		tokenC = await new MockERC20__factory(wallet).deploy("token C", "C", 9)


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

		await tokenA.approve(router2.address, ethers.constants.MaxUint256)
		await tokenB.approve(router2.address, ethers.constants.MaxUint256)
		await tokenC.approve(router2.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router2.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(router2.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(router2.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(router2.address, ethers.constants.MaxUint256)

		await tokenUSDC.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenWETH.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenWBTC.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router2.address, ethers.constants.MaxUint256)
		await tokenWETH.approve(router2.address, ethers.constants.MaxUint256)
		await tokenWBTC.approve(router2.address, ethers.constants.MaxUint256)

		await router2.createPair(
			tokenA.address,
			tokenUSDC.address,
			amountA,
			amountUSDC,
			tokenWeightA,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenB.address,
			tokenDAI.address,
			amountB,
			amountDAI,
			tokenWeightB,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenA.address,
			tokenB.address,
			amountA,
			amountB,
			50,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenC.address,
			tokenB.address,
			amountC,
			amountB,
			22,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenC.address,
			tokenWBTC.address,
			amountC,
			parseUnits('1000', 8),
			52,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenB.address,
			tokenWETH.address,
			amountB,
			parseUnits('1000', 18),
			98,
			swapFee,
			amplification,
			wallet.address
		)

		await router2.createPair(
			tokenC.address,
			tokenWETH.address,
			parseUnits('1000', 9),
			parseUnits('1000', 18),
			42,
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

		const pairWBTC_C2 = await factory2.getPair(tokenC.address, tokenWBTC.address, 52)
		pairWBTC_C_Contract2 = await ethers.getContractAt('RequiemPair', pairWBTC_C2)




		const pairC_WBTC = await factory2.getPair(tokenC.address, tokenWBTC.address, 52)
		pairC_WBTC_Contract2 = await ethers.getContractAt('RequiemPair', pairC_WBTC)

		const pairB_WETH = await factory2.getPair(tokenB.address, tokenWETH.address, 98)
		pairB_WETH_Contract2 = await ethers.getContractAt('RequiemPair', pairB_WETH)


		const pairC_WETH = await factory2.getPair(tokenC.address, tokenWETH.address, 42)
		pairC_WETH_Contract2 = await ethers.getContractAt('RequiemPair', pairC_WETH)
		// console.log("REGLAR DONE 0")

		// swap libnew 
		swapLibNew = await new BalancedPoolLib__factory(wallet).deploy()
		swapNew = await deployContractWithLibraries(wallet, NewSwapArtifact, { BalancedPoolLib: swapLibNew.address })
		weightedMath = await new WeightedMathTest__factory(wallet).deploy()
		console.log("REGLAR DONE 0")

		console.log("Approve for swap")
		await tokenUSDC.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenWBTC.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenWETH.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenA.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(swapNew.address, ethers.constants.MaxUint256)
		await tokenWBTC.approve(router2.address, ethers.constants.MaxUint256)
		await tokenWETH.approve(router2.address, ethers.constants.MaxUint256)


		validateBals = async (descr: string) => {
			// [tokenA.address, tokenWBTC.address, tokenWETH.address, tokenUSDC.address],
			balancesVitual = await swapNew.getTokenBalances()
			const fees = await swapNew.getCollectedFees()
			balancesPoolActual = [
				await tokenA.balanceOf(swapNew.address),
				await tokenWBTC.balanceOf(swapNew.address),
				await tokenWETH.balanceOf(swapNew.address),
				await tokenUSDC.balanceOf(swapNew.address)
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
				await tokenA.balanceOf(swapNew.address),
				await tokenWBTC.balanceOf(swapNew.address),
				await tokenWETH.balanceOf(swapNew.address),
				await tokenUSDC.balanceOf(swapNew.address)
			]
			console.log("-----------------------------------------------")
			console.log(descr)
			console.log("bals", balancesPoolActual)

			console.log("-----------------------------------------------")
		}

		function multiply(a: number[]) {

			let total = 1; // this is our result function

			for (let i = 0; i < a.length; i++) {

				total *= a[i]; // total variable value is always change until for loop ffinished and add value itself every multiply.

			}

			return total;

		}

		validateSwapBals = async () => {
			let multi = [BigNumber.from(1), BigNumber.from('10000000000'), BigNumber.from(1), BigNumber.from('1000000000000')] // init amounts
			let exps = [0.25, 0.25, 0.25, 0.25]
			balancesVitual = await swapNew.getTokenBalances()
			const sstorage = await swapNew.swapStorage()
			balancesPoolActual = [
				await tokenA.balanceOf(swapNew.address),
				await tokenWBTC.balanceOf(swapNew.address),
				await tokenWETH.balanceOf(swapNew.address),
				await tokenUSDC.balanceOf(swapNew.address)
			]
			console.log("----------- BALANCE DIFF--------------------------")
			console.log("Diff", balancesPoolActual.map((x, index) => x.sub(balancesVitual[index])))
			const numBals = balancesPoolActual.map((x, index) => Number(ethers.utils.formatEther(x.mul(multi[index]))))
			console.log("bals", numBals)
			// console.log("invariant", sstorage.lastInvariant.toString())
			console.log("manual", multiply(numBals.map((x, i) => Math.pow(x, exps[i]))))
			console.log("-----------------------------------------------")
			const inv = await weightedMath._calculateInvariant(
				weights,
				balancesPoolActual.map((x, i) => x.mul(multi[i]))
				// uint256[] memory normalizedWeights, 
				// uint256[] memory balances
			)
			console.log("INV WM", inv)
			balancesPoolActual.map((b, index) => expect(b).to.equal(balancesVitual[index]))
		}

		swapManual = async (inIndex: number, outIndex: number, amountOut: BigNumber) => {
			let multi = [BigNumber.from(1), BigNumber.from('10000000000'), BigNumber.from(1), BigNumber.from('1000000000000')] // init amounts
			let exps = [0.25, 0.25, 0.25, 0.25]
			balancesVitual = await swapNew.getTokenBalances()
			const sstorage = await swapNew.swapStorage()
			balancesPoolActual = [
				await tokenA.balanceOf(swapNew.address),
				await tokenWBTC.balanceOf(swapNew.address),
				await tokenWETH.balanceOf(swapNew.address),
				await tokenUSDC.balanceOf(swapNew.address)
			]
			console.log("----------- SWAP MANUAL--------------------------")
			console.log("BDiff", balancesPoolActual.map((x, index) => x.sub(balancesVitual[index])))
			const numBals = balancesPoolActual.map((x, index) => Number(ethers.utils.formatEther(x.mul(multi[index]))))
			console.log("bals", numBals)
			// console.log("invariant", sstorage.lastInvariant.toString())
			console.log("manual", multiply(numBals.map((x, i) => Math.pow(x, exps[i]))))
			console.log("-----------------------------------------------")
			const inv = await weightedMath._calculateInvariant(
				weights,
				balancesPoolActual.map((x, i) => x.mul(multi[i]))
				// uint256[] memory normalizedWeights, 
				// uint256[] memory balances
			)


			console.log("INV WM PRE", inv)


			balancesPoolActual.map((b, index) => expect(b).to.equal(balancesVitual[index]))
			const expIn = await swapNew.calculateSwapGivenOut(poolTokens[inIndex], poolTokens[outIndex], amountOut)
			let xy: BigNumber[] = []
			for (let k = 0; k < balancesVitual.length; k++) {
				if (k !== inIndex && k !== outIndex) {
					xy.push(balancesVitual[k])
				} else {
					if (k === inIndex)
						xy.push(balancesVitual[inIndex].add(expIn))
					if (k === outIndex)
						xy.push(balancesVitual[outIndex].sub(amountOut))
				}
			}
			// balancesVitual[inIndex] = balancesVitual[inIndex].add(expIn)

			// balancesVitual[outIndex] = balancesVitual[outIndex].sub(amountOut)
			const invAfter = await weightedMath._calculateInvariant(
				weights,
				xy.map((x, i) => x.mul(multi[i]))
				// uint256[] memory normalizedWeights, 
				// uint256[] memory balances
			)
			console.log("BALDIFF", balancesVitual.map((x, ind) => x.sub(xy[ind])))
			console.log("INV WM POST", invAfter, "DIFF", inv.sub(invAfter))
			console.log("------------------------------------------------")
		}



		testSwapExactOut = async (_tokens: string[], poolsNew: Contract[], _amountOut: BigNumber, comment: string) => {

			counter += 1
			const inContract = await ethers.getContractAt('MockERC20', _tokens[0])
			await inContract.approve(router2.address, maxUint256)
			const outContract = await ethers.getContractAt('MockERC20', _tokens[_tokens.length - 1])

			const _userBalanceBeforeIn = await inContract.balanceOf(wallet.address)
			const _userBalanceBeforeOut = await outContract.balanceOf(wallet.address)

			let inAm = _amountOut;
			let amns = [_amountOut]
			for (let k = poolsNew.length - 1; k >= 0; k--) {

				const _inAm = await poolsNew[k].calculateSwapGivenOut(_tokens[k], _tokens[k + 1], inAm)
				inAm = _inAm
				amns.push(inAm)
			}
			console.log("---------------------------- TEST NEW EO")
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
			gasCosts = { ...gasCosts, ['exactOutNew-' + String(poolsNew.length) + '-' + String(counter) + '-' + comment]: gasUsed }

			console.log("--------GC" + String(counter), gasCosts)
			const _userBalanceAfterIn = await inContract.balanceOf(wallet.address)
			const _userBalanceAfterOut = await outContract.balanceOf(wallet.address)
			console.log("--------GC bals EO", _userBalanceAfterOut, _userBalanceBeforeOut, amns)

			console.log("expect(", _userBalanceAfterOut.sub(_userBalanceBeforeOut), ").to.eq(", _amountOut)
			console.log("expect(", _userBalanceBeforeIn.sub(_userBalanceAfterIn), ").to.eq(", inAm)

			expect(_userBalanceAfterOut.sub(_userBalanceBeforeOut)).to.eq(_amountOut)
			expect(_userBalanceBeforeIn.sub(_userBalanceAfterIn)).to.eq(inAm)
			console.log("---------------------------- TEST DONE EO")
		}

		testSwapExactIn = async (_tokens: string[], poolsNew: Contract[], _amountIn: BigNumber, comment: string) => {

			counter += 1
			const inContract = await ethers.getContractAt('MockERC20', _tokens[0])
			const outContract = await ethers.getContractAt('MockERC20', _tokens[_tokens.length - 1])

			const _userBalanceBeforeIn = await inContract.balanceOf(wallet.address)
			const _userBalanceBeforeOut = await outContract.balanceOf(wallet.address)

			let outAm = _amountIn;
			let amns = [_amountIn]
			for (let k = 0; k < poolsNew.length; k++) {

				const _out = await poolsNew[k].calculateSwapGivenIn(_tokens[k], _tokens[k + 1], outAm)
				outAm = _out
				amns.push(outAm)
			}
			console.log("---------------------------- TEST NEW EI", amns, comment)
			tx = await router2.onSwapExactTokensForTokens(
				poolsNew.map(x => x.address),
				_tokens,
				_amountIn,
				1,
				wallet.address,
				deadline
			)
			// record gas
			receipt = await tx.wait();
			gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
			gasCosts = { ...gasCosts, ['exactInNew-' + String(poolsNew.length) + '-' + String(counter) + '-' + comment]: gasUsed }

			console.log("--------GC" + String(counter), gasCosts)
			const _userBalanceAfterIn = await inContract.balanceOf(wallet.address)
			const _userBalanceAfterOut = await outContract.balanceOf(wallet.address)
			console.log("--------GC bals EI", _userBalanceAfterOut, _userBalanceBeforeOut, amns)
			expect(_userBalanceAfterOut.sub(_userBalanceBeforeOut)).to.eq(outAm)
			expect(_userBalanceBeforeIn.sub(_userBalanceAfterIn)).to.eq(_amountIn)
			console.log("---------------------------- TEST DONE EI")
		}

	})

	it('initialize', async () => {
		weights = [parseUnits('25', 16), parseUnits('25', 16), parseUnits('25', 16), parseUnits('25', 16)]
		poolTokens = [tokenA.address, tokenWBTC.address, tokenWETH.address, tokenUSDC.address]
		await swapNew.initialize(
			poolTokens,
			[18, 8, 18, 6], //token decimals
			'Requiem WeightedPool LP', // pool token name
			'REQ 4-LP', //_pool_token
			123e13, //_fee = 1.23%
			123e12, //_fee = 0.023111%
			parseUnits('5', 17), //_admin_fee, 50%,
			0,
			wallet.address,
			wallet.address
		)


		describe('WeightedPool-Transactions add', () => {
			it('add liquidity', async () => {

				// console.log("SWAP OBJS", swap, swapNew)
				const ss = await swapNew.swapStorage()


				// await swapNew.addLiquidity(
				// 	[parseUnits('2131', 18), parseUnits('1', 8), parseUnits('123', 18), parseUnits('102334', 6)],
				// 	0,
				// 	deadline
				// )
				console.log("ADDED LP")

				describe('WeightedPool-Transactions trade', () => {
					it('Swaps caculation', async () => {

						let tokenIn = tokenUSDC.address
						let tokenOut = tokenWETH.address
						amountIn = parseUnits('11', 6)

						const outNew = await swapNew.calculateSwapGivenIn(
							tokenIn,
							tokenOut,
							amountIn
						)

						console.log("IN", amountIn, "FOR", outNew)
						// amountOut = parseUnits('11', 18)

						const inNew = await swapNew.calculateSwapGivenOut(
							tokenIn,
							tokenOut,
							outNew
						)

						console.log("IN", inNew, "for", outNew)
						// expect(inNew).to.eq(inOld)

						console.log("GAS single", gasCosts)
					})

					describe('WeightedPool-Transaction single', () => {
						// 	it('Swaps single', async () => {
						// 		pools = [swapNew.address]
						// 		tokens = [tokenWETH.address, tokenUSDC.address]
						// 		amountOut = parseUnits('12', 6)

						// 		inPre = await tokenWETH.balanceOf(wallet.address)
						// 		outPre = await tokenUSDC.balanceOf(wallet.address)

						// 		const expectedIn = await swapNew.calculateSwapGivenOut(tokenWETH.address, tokenUSDC.address, amountOut)

						// 		balancesVitual = await swapNew.getTokenBalances()
						// 		balancesPoolActual = [
						// 			await tokenUSDC.balanceOf(swapNew.address),
						// 			await tokenUSDT.balanceOf(swapNew.address),
						// 			await tokenDAI.balanceOf(swapNew.address),
						// 			await tokenTUSD.balanceOf(swapNew.address)
						// 		]
						// 		console.log("BALANCES VOMP single pre")
						// 		console.log("ACT", balancesPoolActual)
						// 		console.log("VRT", balancesVitual)

						// 		// await validateSwapBals()
						// 		tx = await router2.onSwapTokensForExactTokens(
						// 			pools,
						// 			tokens,
						// 			amountOut,
						// 			amountInMax,
						// 			wallet.address,
						// 			deadline
						// 		)
						// 		receipt = await tx.wait();
						// 		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
						// 		gasCosts = { ...gasCosts, exactOutSingleNew: gasUsed }
						// 		inPost = await tokenWETH.balanceOf(wallet.address)
						// 		outPost = await tokenUSDC.balanceOf(wallet.address)




						// 		console.log("1) exp IN", expectedIn, "calculated", inPre.sub(inPost))
						// 		expect(expectedIn).to.eq(inPre.sub(inPost))

						// 		console.log("1) exp OUT", amountOut, "calculated", outPost.sub(outPre))
						// 		expect(amountOut).to.eq(outPost.sub(outPre))
						// 		balancesVitual = await swapNew.getTokenBalances()
						// 		balancesPoolActual = [
						// 			await tokenA.balanceOf(swapNew.address),
						// 			await tokenWBTC.balanceOf(swapNew.address),
						// 			await tokenWETH.balanceOf(swapNew.address),
						// 			await tokenUSDC.balanceOf(swapNew.address)
						// 		]

						// 		console.log("BALANCES VOMP sngle post")
						// 		console.log("ACT", balancesPoolActual)
						// 		console.log("VRT", balancesVitual)
						// 		balancesPoolActual.map((x, index) => expect(x).to.eq(balancesVitual[index]))
						// 		// console.log("ACT:", usdcBal, usdtBal, daiBal, tusdBal)

						// 		// await validateSwapBals()


						// 		pools = [swapNew.address]
						// 		tokens = [tokenWETH.address, tokenUSDC.address]
						// 		amountIn = BigNumber.from('123456789012376857845')
						// 		let expectedOut = await swapNew.calculateSwapGivenIn(tokenWETH.address, tokenUSDC.address, amountIn)
						// 		let checkBal = await tokenWETH.balanceOf(swapNew.address)
						// 		console.log("2) exp out", expectedOut, "bal pool", checkBal)

						// 		inPre = await tokenWETH.balanceOf(wallet.address)
						// 		outPre = await tokenUSDC.balanceOf(wallet.address)

						// 		balancesVitual = await swapNew.getTokenBalances()
						// 		let test = await tokenUSDC.balanceOf(swapNew.address)
						// 		let tes1 = await tokenWETH.balanceOf(swapNew.address)

						// 		console.log("=-----------VBAL USDC", balancesVitual[3], test)
						// 		console.log("=-----------VBAL USDC", balancesVitual[2], tes1)

						// 		tx = await router2.onSwapExactTokensForTokens(
						// 			pools,
						// 			tokens,
						// 			amountIn,
						// 			1,
						// 			wallet.address,
						// 			deadline
						// 		)
						// 		receipt = await tx.wait();
						// 		gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
						// 		gasCosts = { ...gasCosts, exactOutSingleStandard: gasUsed }

						// 		inPost = await tokenWETH.balanceOf(wallet.address)
						// 		outPost = await tokenUSDC.balanceOf(wallet.address)


						// 		console.log("2) exp IN", amountIn, "calculated", inPre.sub(inPost))
						// 		expect(amountIn).to.eq(inPre.sub(inPost))

						// 		console.log("2) exp OUT", expectedOut, "calculated", outPost.sub(outPre))
						// 		expect(expectedOut).to.eq(outPost.sub(outPre))


						// 		balancesVitual = await swapNew.getTokenBalances()
						// 		balancesPoolActual = [
						// 			await tokenA.balanceOf(swapNew.address),
						// 			await tokenWBTC.balanceOf(swapNew.address),
						// 			await tokenWETH.balanceOf(swapNew.address),
						// 			await tokenUSDC.balanceOf(swapNew.address)
						// 		]

						// 		console.log("BALANCES VOMP sngle post")
						// 		console.log("ACT", balancesPoolActual)
						// 		console.log("VRT", balancesVitual)
						// 		await validateSwapBals()
						// 		console.log("REGSWAP ", gasCosts)
						// 	})
						})
						describe('Weighted Pool-Transactions Swaps multi', () => {
							it('Swaps', async () => {

								let amountOutMin = 0
								// pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
								// 6 Swap
								let _tokens = [
									tokenA.address, tokenB.address, tokenWETH.address, tokenWBTC.address, tokenC.address, tokenB.address
								]
								let poolsNew = [
									pairA_B_Contract2, pairB_WETH_Contract2, swapNew, pairC_WBTC_Contract2, pairB_C_Contract2
								]

								let _amountOut = parseUnits("1", 10)

								await testSwapExactOut(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountOut, //   _amountOut: BigNumber
									'WETH-WBTC-6T-mid'
								)


								amountOutMin = 0
								// pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
								// 6 Swap
								_tokens = _tokens.reverse()
								poolsNew = poolsNew.reverse()

								_amountOut = parseUnits("1", 10)

								await testSwapExactOut(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountOut, //   _amountOut: BigNumber
									'WBTC-WETH-6T-mid'
								)


								amountOutMin = 0
								// pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
								// 6 Swap
								_tokens = [
									tokenB.address, tokenWETH.address, tokenWBTC.address, tokenC.address
								]
								poolsNew = [
									pairB_WETH_Contract2, swapNew, pairC_WBTC_Contract2
								]

								_amountOut = parseUnits("1", 10)

								await testSwapExactOut(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountOut, //   _amountOut: BigNumber
									'WETH-WBTC-4T-mid'
								)


								// amountOutMin = 0
								// // pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
								// // 6 Swap
								// _tokens = [
								// 	tokenA.address, tokenUSDC.address, tokenWBTC.address, tokenC.address
								// ]
								// poolsNew = [
								// 	pairA_USDC_Contract2, swapNew, pairC_WBTC_Contract2
								// ]

								// _amountOut = parseUnits("1", 16)

								// await testSwapExactOut(
								// 	_tokens, // _tokens: string[],
								// 	poolsNew, //   poolsNew: Contract[], 
								// 	_amountOut, //   _amountOut: BigNumber
								// 	'USDC-WBTC-5T-mid'
								// )



								amountOutMin = 0
								_tokens = [
									tokenWETH.address, tokenWBTC.address, tokenC.address, tokenB.address
								]
								poolsNew = [
									swapNew, pairC_WBTC_Contract2, pairB_C_Contract2
								]



								_amountOut = parseUnits("1", 10)

								await testSwapExactOut(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountOut, //   _amountOut: BigNumber
									'WETH-WBTC-4T-start'
								)

								amountOutMin = 0
								_tokens = _tokens.reverse()
								poolsNew = poolsNew.reverse()



								_amountOut = parseUnits("1", 18)

								await testSwapExactOut(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountOut, //   _amountOut: BigNumber
									'WBTC-WETH-4T-end'
								)

								_tokens = [
									tokenUSDC.address, tokenWBTC.address
								]
								poolsNew = [
									swapNew
								]

								let _amountIn = BigNumber.from('16212273')

								await testSwapExactIn(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountIn, //   _amountIn: BigNumber
									'USDC-WBTC-2T-single'
								)

								// pool at end
								_tokens = [
									tokenA.address, tokenUSDC.address, tokenWBTC.address
								]
								poolsNew = [
									pairA_USDC_Contract2, swapNew
								]

								_amountIn = parseUnits("122", 17)

								await testSwapExactIn(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountIn, //   _amountIn: BigNumber
									'USDC-WBTC-3T-end'
								)

								// pool at beginning
								_tokens = [
									tokenWETH.address, tokenWBTC.address, tokenC.address
								]
								poolsNew = [
									swapNew, pairC_WBTC_Contract2
								]

								_amountIn = parseUnits("12", 18)

								await testSwapExactIn(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountIn, //   _amountIn: BigNumber
									'WETH-WBTC-3T-start'
								)

								// pools = [pairA_USDC_Contract.address, swap.address, pairDAI_B_Contract.address]
								// 6 Swap
								_tokens = [
									tokenA.address, tokenB.address, tokenWETH.address, tokenWBTC.address, tokenC.address, tokenB.address
								]
								poolsNew = [
									pairA_B_Contract2, pairB_WETH_Contract2, swapNew, pairC_WBTC_Contract2, pairB_C_Contract2
								]

								amountIn = parseUnits("122", 16)

								await testSwapExactIn(
									_tokens, // _tokens: string[],
									poolsNew, //   poolsNew: Contract[], 
									_amountIn, //   _amountOut: BigNumber
									'WETH-WBTC-6T-mid'
								)



								describe('Weighted Pool-Resists sent too little', () => {
									it('Throws errors', async () => {

										console.log("Validate bals first")
										await validateSwapBals()

										let __amountOut: BigNumber
										tokens = [tokenWETH.address, tokenA.address]

										pools = [swapNew.address]

										console.log("THIEF1")

										__amountOut = parseUnits("1", 18)

										await expect(thiefRouter.onSwapTokensForExactTokens(
											pools,
											tokens,
											__amountOut,
											maxUint256,
											wallet.address,
											100
										)).to.be.revertedWith("insufficient in")


										__amountOut = parseUnits("1", 6)

										await swapManual(1, 3, __amountOut)

										tokens = [tokenWBTC.address, tokenUSDC.address]
										console.log("THIEF2")
										await expect(thiefRouter.onSwapTokensForExactTokens(
											pools,
											tokens,
											__amountOut,
											maxUint256,
											wallet.address,
											2
										)).to.be.revertedWith("insufficient in")

										tokens = [tokenWBTC.address, tokenUSDC.address]
										console.log("THIEF4")
										__amountOut = BigNumber.from(123456789)
										await expect(thiefRouter.onSwapTokensForExactTokens(
											pools,
											tokens,
											__amountOut,
											maxUint256,
											wallet.address,
											2
										)).to.be.revertedWith("insufficient in")

										tokens = [tokenUSDC.address, tokenA.address]
										__amountOut = BigNumber.from('1234567893211123132')
										await expect(thiefRouter.onSwapTokensForExactTokens(
											pools,
											tokens,
											__amountOut,
											maxUint256,
											wallet.address,
											1
										)).to.be.revertedWith("insufficient in")
										console.log("THIEF POOL DONE")



									})
								})





								await validateSwapBals()

								describe('Multi-Swap 4 Pool - after new Liquidity add', () => {
									it('2S1 struct', async () => {
										await validateBals()
										let bals = await swapNew.getTokenBalances()
										let liquidityAmounts = bals.map((b: BigNumber) => b.div(20))
										const expectedLp = await swapNew.calculateTokenAmount(
											liquidityAmounts,
											1 // true
										)
										console.log("Expected lp", expectedLp, "for", liquidityAmounts)
										tx = await swapNew.addLiquidityExactIn(
											liquidityAmounts,
											1,
											wallet.address,
											deadline
										)

										// record gas
										receipt = await tx.wait();
										gasUsed = BigInt(receipt.cumulativeGasUsed) * BigInt(receipt.effectiveGasPrice);
										gasCosts = { ...gasCosts, lpAddCost: gasUsed }



										amountOut = BigNumber.from(122314211)
										tokens = [tokenB.address, tokenA.address, tokenUSDC.address]
										pools = [pairA_B_Contract2.address, swapNew.address]
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

										tokens = [tokenB.address, tokenA.address, tokenUSDC.address, tokenWBTC.address]
										pools = [pairA_B_Contract2.address, pairA_USDC_Contract2.address, swapNew.address]
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


										tokens = [tokenB.address, tokenA.address, tokenUSDC.address]
										pools = [pairA_B_Contract2.address, swapNew.address]
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
											tokenB.address, tokenA.address, tokenUSDC.address, tokenWETH.address
										]

										let poolsNew = [
											pairA_B_Contract2, pairA_USDC_Contract2, swapNew
										]

										let _amountOut = parseUnits("1", 10)

										await testSwapExactOut(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountOut, //   _amountOut: BigNumber
											'USDC-WETH-4T-end'
										)

										console.log("GASOVERVIEW x", gasCosts)

										// 6 Swap
										_tokens = [
											tokenC.address, tokenWBTC.address, tokenUSDC.address, tokenA.address, tokenB.address
										]
										poolsNew = [
											pairWBTC_C_Contract2, swapNew, pairA_USDC_Contract2, pairA_B_Contract2
										]

										_amountOut = BigNumber.from('1234567890123456789')
										await testSwapExactOut(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountOut, //   _amountOut: BigNumber
											'WBTC-USDC-5T-mid'
										)

										// stable at end
										_tokens = [
											tokenC.address, tokenWBTC.address, tokenUSDC.address
										]
										poolsNew = [
											pairWBTC_C_Contract2, swapNew
										]

										_amountOut = parseUnits("1", 6)

										await testSwapExactOut(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountOut, //   _amountOut: BigNumber
											'WBTC-USDC-3T-end'
										)
										// stable at beginning
										_tokens = [
											tokenA.address, tokenUSDC.address, tokenWBTC.address
										]
										poolsNew = [
											pairA_USDC_Contract2, swapNew,
										]

										console.log("GASOVERVIEW y", gasCosts)

										_amountOut = parseUnits("1", 8)

										await testSwapExactOut(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountOut, //   _amountOut: BigNumber
											'USDC-WBTC-3T-end'
										)

										/// ============ amount in exact

										// 6 Swap
										_tokens = [
											tokenB.address, tokenA.address, tokenWETH.address, tokenC.address
										]
										poolsNew = [
											pairA_B_Contract2, swapNew, pairC_WETH_Contract2,
										]

										let _amountIn = parseUnits("1", 19)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'A-WETH-6T-mid'
										)

										// stable at end
										_tokens = [
											tokenB.address, tokenWETH.address, tokenUSDC.address
										]
										poolsNew = [
											pairB_WETH_Contract2, swapNew
										]

										_amountIn = parseUnits("122", 16)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'WETH-USDC-3T-end'
										)


										// beginning low decimal single
										_tokens = [
											tokenWBTC.address, tokenWETH.address,
										]
										poolsNew = [
											swapNew
										]

										_amountIn = parseUnits("1", 8)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'WBTC-WETH-single'
										)

										// stable high dec at beginning
										_tokens = [
											tokenA.address, tokenUSDC.address
										]
										poolsNew = [
											swapNew
										]

										_amountIn = parseUnits("1", 18)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'A-USDC-single'
										)

										// stable high dec at beginning
										_tokens = [
											tokenUSDC.address, tokenA.address
										]
										poolsNew = [
											swapNew
										]

										_amountIn = parseUnits("1", 6)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'USDC-A-single'
										)


										// stable at beginning
										_tokens = [
											tokenB.address, tokenWETH.address, tokenUSDC.address, tokenA.address
										]
										poolsNew = [
											pairB_WETH_Contract2, swapNew, pairA_USDC_Contract2
										]

										_amountIn = parseUnits("1", 18)
										// console.log("================ WEIGHTED TEST0")
										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'DAI-USDC-4T-mid'
										)




										// beginning low decimal
										_tokens = [
											tokenUSDC.address, tokenWETH.address
										]
										poolsNew = [
											swapNew
										]

										_amountIn = parseUnits("1", 6)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'USDC-WETH-2T-start'
										)


										// beginning low decimal
										_tokens = [
											tokenUSDC.address, tokenWBTC.address, tokenC.address
										]
										poolsNew = [
											swapNew, pairC_WBTC_Contract2
										]

										_amountIn = parseUnits("1", 6)

										await testSwapExactIn(
											_tokens, // _tokens: string[],
											poolsNew, //   poolsNew: Contract[], 
											_amountIn, //   _amountIn: BigNumber
											'USDC-WBTC-3T-start'
										)
										const fees = await swapNew.getCollectedFees()
										console.log("FEES COLLECTED", fees)

										console.log("GASOVERVIEW", gasCosts)

										await validateSwapBals()
									})
								})


								describe('Weighted Pool-Calculation matches swap', () => {
									it('calculation', async () => {

										pools = [pairB_WETH_Contract2.address, swapNew.address, pairC_WBTC_Contract2.address]
										tokens = [tokenB.address, tokenWETH.address, tokenWBTC.address, tokenC.address]
										console.log("Pools", pools)
										console.log("Tokens", tokens)
										amountOut = parseUnits("1", 9)
										const preBalA = await tokenC.balanceOf(wallet.address)
										const preBalB = await tokenB.balanceOf(wallet.address)




										const in02 = await pairC_WBTC_Contract2.calculateSwapGivenOut(tokenWBTC.address, tokenC.address, amountOut)

										const in01 = await swapNew.calculateSwapGivenOut(tokenWETH.address, tokenWBTC.address, in02)


										const inB = await pairB_WETH_Contract2.calculateSwapGivenOut(tokenB.address, tokenWETH.address, in01)

										await router2.onSwapTokensForExactTokens(
											pools,
											tokens,
											amountOut,
											amountInMax,
											wallet.address,
											deadline
										)
										const postBalA = await tokenC.balanceOf(wallet.address)
										const postBalB = await tokenB.balanceOf(wallet.address)
										console.log("VALIDITY")
										console.log("deltaA", postBalA.sub(preBalA))
										console.log("deltaB", preBalB.sub(postBalB))
										console.log("expected delta B", inB)
										expect(postBalA.sub(preBalA)).to.eq(amountOut)
										expect(preBalB.sub(postBalB)).to.eq(inB)

									})
								})
								describe('Weighted Pool-Post transactions', () => {
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
										const lpToken = await ethers.getContractAt('ERC20', swapNew.address)
										const lpBal = await lpToken.balanceOf(wallet.address)

										await lpToken.approve(swapNew.address, ethers.constants.MaxUint256)
										let toRemove = await swapNew.calculateRemoveLiquidityExactIn(lpBal.div(5))
										console.log("to Remove ", toRemove)
										await printBals("pre withdrawl balances")
										await swapNew.removeLiquidityExactIn(lpBal.div(5), balancesPoolActual.map(x => ZERO), deadline)
										await printBals("post withdrawl balances")

										let poolBals = await lpToken.balanceOf(swapNew.address)
										await lpToken.approve(swapNew.address, ethers.constants.MaxUint256)
										toRemove = await swapNew.calculateRemoveLiquidityOneToken(lpBal.div(10), 3)
										console.log("to Remove ", toRemove)
										await printBals("pre withdrawl balances")
										await swapNew.removeLiquidityOneToken(lpBal.div(10), 3, 0, deadline)
										await printBals("post withdrawl balances")

									})


									it('FlashLoan', async () => {
										fLoanRecipient = await new MockFlashLoanRecipient__factory(wallet).deploy(swapNew.address)
										await fLoanRecipient.setRepayInExcess(1)
										// repay loan = true 
										await fLoanRecipient.setRepayLoan(1)

										let balanesSwap = await swapNew.getTokenBalances();
										let storage = await swapNew.swapStorage();
										console.log("BALANCES", balanesSwap, storage.lastInvariant)

										console.log("FLOAN trigger repay true")
										await swapNew.flashLoan(fLoanRecipient.address,
											[BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
											0)
										balanesSwap = await swapNew.getTokenBalances();
										storage = await swapNew.swapStorage();
										console.log("BALANCES after", balanesSwap, storage.lastInvariant)

										// repay loan = true 
										await fLoanRecipient.setRepayLoan(0)
										console.log("FLOAN trigger repay false")
										await expect(
											swapNew.flashLoan(fLoanRecipient.address,
												[BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
												0)
										).to.be.revertedWith("insufficient loan fee")

										// repay loan = true & reentrant
										await fLoanRecipient.setReenter(1)
										console.log("FLOAN trigger reenter true")
										await expect(
											swapNew.flashLoan(fLoanRecipient.address,
												[BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131), BigNumber.from(12332131)],
												0)
										).to.be.revertedWith("ReentrancyGuard: reentrant call")
									})
								})
							})
						})
					})
				})
			})
		})

	})