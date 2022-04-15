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



import { getApprovalDigest } from './shared/common'
import { maxUint256, toWei } from './shared/utilities'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
	RequiemPairFactory__factory,
	WeightedFormula__factory,
	MockERC20__factory,
	SwapRouter__factory,
	RequiemPair,
	MockCallee__factory,
	ThiefRouter__factory,
	WETH9__factory
} from "../../types";


const TOTAL_SUPPLY = BigNumber.from('1000000000000000000')
const TEST_AMOUNT = BigNumber.from(1e9)

describe('RequiemPair-Test', () => {
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
	let weth: Contract
	let formula: Contract
	let factory: Contract
	let pairManager: Contract
	let router: Contract


	let feeDistributor: Contract
	let thiefRouter: Contract


	let pairA_USDC_Contract: Contract
	let pairDAI_B_Contract: Contract
	let pairA_B_Contract: Contract
	let pairB_C_Contract: Contract
	let pairTest_Contract: Contract

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

	let tokenWeightB = BigNumber.from(60)

	let amplification2 = BigNumber.from(20000)
	let amountIn: BigNumber
	let amountOut: BigNumber

	let amountC = parseUnits('3231', 8)
	const amountInMax = ethers.constants.MaxUint256
	let amountUSDC = parseUnits('10010', 6)
	let amountDAI = parseUnits('10000', 18)

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

		router = await new SwapRouter__factory(wallet).deploy(factory.address, weth.address)

		thiefRouter = await new ThiefRouter__factory(wallet).deploy(factory.address, weth.address)

		await tokenA.approve(router.address, ethers.constants.MaxUint256)
		await tokenB.approve(router.address, ethers.constants.MaxUint256)

		await new router.createPair(
			tokenA.address,
			tokenB.address,
			amountA,
			amountB,
			tokenWeightA,
			swapFee,
			amplification,
			wallet.address
		)


		await tokenA.approve(router.address, ethers.constants.MaxUint256)
		await tokenB.approve(router.address, ethers.constants.MaxUint256)
		await tokenC.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(router.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(router.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(router.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(router.address, ethers.constants.MaxUint256)

		await tokenA.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenB.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenC.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenUSDC.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenUSDT.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenDAI.approve(thiefRouter.address, ethers.constants.MaxUint256)
		await tokenTUSD.approve(thiefRouter.address, ethers.constants.MaxUint256)

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
			amplification2,
			wallet.address
		)

		await new router.createPair(
			tokenA.address,
			tokenB.address,
			amountA,
			amountB,
			80,
			swapFee,
			amplification2,
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

		await new router.createPair(
			tokenA.address,
			tokenB.address,
			parseUnits("1", 18),
			parseUnits("1", 18),
			26,
			swapFee,
			amplification,
			wallet.address
		)

		 const  pairTest = await factory.getPair(tokenA.address, tokenB.address, 26)
		 pairTest_Contract = await ethers.getContractAt('RequiemPair', pairTest)


		const pairA_USDC = await factory.getPair(tokenA.address, tokenUSDC.address, tokenWeightA)
		pairA_USDC_Contract = await ethers.getContractAt('RequiemPair', pairA_USDC)


		const pairDAI_B = await factory.getPair(tokenB.address, tokenDAI.address, tokenWeightB)
		pairDAI_B_Contract = await ethers.getContractAt('RequiemPair', pairDAI_B)


		const pairA_B = await factory.getPair(tokenA.address, tokenB.address, 80)
		pairA_B_Contract = await ethers.getContractAt('RequiemPair', pairA_B)

		const pairB_C = await factory.getPair(tokenC.address, tokenB.address, 22)
		pairB_C_Contract = await ethers.getContractAt('RequiemPair', pairB_C)

	})


	it('pair data', async () => {
		const pair = await factory.getPair(tokenA.address, tokenB.address, tokenWeightA)
		pairContract = await ethers.getContractAt('RequiemPair', pair)

		let name = await pairContract.name()
		const symbol = await pairContract.symbol()
		console.log("Name, Symbol", name, symbol)
		const amountIn = parseUnits("1", 18)

		const price = await pairContract.calculateSwapGivenIn(tokenA.address, tokenB.address, amountIn)
		console.log("Price", price)

		const balBPre = await tokenB.balanceOf(wallet.address)
		await router.onSwapExactTokensForTokens(
			[pair],
			[tokenA.address, tokenB.address],
			amountIn,
			ZERO,
			wallet.address,
			deadline
		)

		const balBPost = await tokenB.balanceOf(wallet.address)

		console.log("Change:", balBPost.sub(balBPre), price)

		// traded thas to macht actul flows
		expect(balBPost.sub(balBPre)).to.equal(price)

		const reserves = await pairContract.getReserves()
		console.log("Reserves:", reserves)


		const params = await pairContract.getParameters()
		console.log("Parameters:", params)


		const amountOut = BigNumber.from(123321321);
		const balAPre = await tokenA.balanceOf(wallet.address)

		const priceIn = await pairContract.calculateSwapGivenOut(tokenA.address, tokenB.address, amountOut)
		console.log("Price exact Out", priceIn)

		await router.onSwapTokensForExactTokens(
			[pair],
			[tokenA.address, tokenB.address],
			amountOut,
			ethers.constants.MaxUint256,
			wallet.address,
			deadline
		)

		const balAPost = await tokenA.balanceOf(wallet.address)

		console.log("Change Exact Out:", balAPre.sub(balAPost), priceIn)

		// traded thas to macht actul flows
		expect(balAPre.sub(balAPost)).to.equal(priceIn)


		await factory.setSwapParams(pair, newSwapFee, newAmplification)

		await router.onSwapExactTokensForTokens(
			[pair],
			[tokenA.address, tokenB.address],
			amountIn,
			ZERO,
			wallet.address,
			deadline
		)
		const newReserves = await pairContract.getReserves()
		console.log("New Reserves:", newReserves)


		const newRarams = await pairContract.getParameters()
		console.log("New Parameters:", newRarams)



		describe('Weighted PAIR-Resists sent too little', () => {
			it('PAIR Throws errors low dec to high', async () => {

				let tokens = [tokenUSDC.address, tokenA.address]
				console.log("THIEFPAIR")
				let __amountOut = BigNumber.from('1234567893211123132')
				await
					expect(
						thiefRouter.onSwapTokensForExactTokens(
							[pairA_USDC_Contract.address],
							tokens,
							__amountOut,
							maxUint256,
							wallet.address,
							1
						)
					).to.be.revertedWith("insufficient in")
				console.log("THIEF DONE")
			})

			it('PAIR Throws errors high dec to low', async () => {

				await tokenA.approve(thiefRouter.address, ethers.constants.MaxUint256)
				let tokens = [tokenA.address, tokenUSDC.address]
				console.log("THIEFPAIR")
				let __amountOut = BigNumber.from('1234567832')
				await expect(thiefRouter.onSwapTokensForExactTokens(
					[pairA_USDC_Contract.address],
					tokens,
					__amountOut,
					maxUint256,
					wallet.address,
					1
				)).to.be.revertedWith("insufficient in")
				console.log("THIEF DONE")
			})
		})

		describe('LP transactions', () => {
			it('add liquidity', async () => {
				const reserves = await formula.getFactoryParameters(
					factory.address, // address factory,
					pairA_B_Contract.address, // address pair,
					tokenA.address// address tokenA
				)
				const amount = await formula.quote(
					BigNumber.from(1324321432), // uint256 amountA,
					reserves.reserveA, // uint256 reserveA,
					reserves.reserveB// uint256 reserveB
				)
				await router.addLiquidity(
					pairA_B_Contract.address, // address pair,
					tokenA.address, // address tokenA,
					tokenB.address, // address tokenB,
					BigNumber.from(1324321432), // uint256 amountADesired,
					amount, // uint256 amountBDesired,
					BigNumber.from(1324321432), // uint256 amountAMin,
					amount, // uint256 amountBMin,
					[0, maxUint256], // uint256[2] memory vReserveRatioBounds
					wallet.address, // address to,
					deadline// uint256 deadline
				)
				const lps = await pairA_B_Contract.balanceOf(wallet.address)
				it('remove liquidity', async () => {
					await router.removeLiquidity(
						pairA_B_Contract.address, // address pair,
						tokenA.address, // address tokenA,
						tokenB.address, // address tokenB,
						lps.div(2), // uint256 liquidity,
						0, // uint256 amountAMin,
						0, // uint256 amountBMin,
						wallet.address, // address to,
						deadline// uint256 deadline
					)
				})
			})

		})

		describe('flash swap', () => {
			it('executes', async () => {
				const callee = await new MockCallee__factory(wallet).deploy(pairA_B_Contract.address)

				// no revert as loan is payed back
				await callee.setRepayInExcess(true);
				await callee.callSwap(1000, 1000)

			})

			it('rejects non repayment', async () => {
				const callee = await new MockCallee__factory(wallet).deploy(pairA_B_Contract.address)

				await callee.setRepayLoan(false);

				await expect(callee.callSwap(1000, 1000)).to.be.revertedWith("REQLP: K")

			})

			it('rejects reentrant', async () => {
				const callee = await new MockCallee__factory(wallet).deploy(pairA_B_Contract.address)


				await callee.setReenter(true);

				await expect(callee.callSwap(1000, 1000)).to.be.revertedWith("REQLP: L")

			})


			it('rejects repay insufficient', async () => {
				const callee = await new MockCallee__factory(wallet).deploy(pairA_B_Contract.address)

				await callee.setRepayInExcess(false);
				await callee.setReenter(false);
				await expect(callee.callSwap(1000, 1000)).to.be.revertedWith("REQLP: K")
			})



		})


		describe('Pair creation data', () => {
			it('raw data', async () => {
				console.log("APPROVALS")
				await tokenA.approve(router.address, ethers.constants.MaxUint256)
				await tokenB.approve(router.address, ethers.constants.MaxUint256)
				await tokenC.approve(router.address, ethers.constants.MaxUint256)
		
				


				name = await pairTest_Contract.name()
				expect(name).to.eq('Requiem wPair LP')
				expect(await pairTest_Contract.symbol()).to.eq('RLWP')
				expect(await pairTest_Contract.decimals()).to.eq(18)
				expect(await pairTest_Contract.totalSupply()).to.eq(TOTAL_SUPPLY)
				expect(await pairTest_Contract.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY)
				expect(await pairTest_Contract.DOMAIN_SEPARATOR()).to.eq(
					keccak256(
						defaultAbiCoder.encode(
							['bytes32', 'bytes32', 'bytes32', 'uint256', 'address'],
							[
								keccak256(
									toUtf8Bytes('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)')
								),
								keccak256(toUtf8Bytes(name)),
								keccak256(toUtf8Bytes('1')),
								1,
								pairTest_Contract.address
							]
						)
					)
				)
				expect(await pairTest_Contract.PERMIT_TYPEHASH()).to.eq(
					keccak256(toUtf8Bytes('Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)'))
				)
			})
		})
	})

	it('approve', async () => {
		await expect(pairTest_Contract.approve(other.address, TEST_AMOUNT))
			.to.emit(pairTest_Contract, 'Approval')
			.withArgs(wallet.address, other.address, TEST_AMOUNT)
		expect(await pairTest_Contract.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
	})

	it('transfer', async () => {
		await expect(pairTest_Contract.transfer(other.address, TEST_AMOUNT))
			.to.emit(pairTest_Contract, 'Transfer')
			.withArgs(wallet.address, other.address, TEST_AMOUNT)
		expect(await pairTest_Contract.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
		expect(await pairTest_Contract.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	})

	it('transfer:fail', async () => {
		await expect(pairTest_Contract.transfer(other.address, TOTAL_SUPPLY.add(1))).to.be.reverted // ds-math-sub-underflow
		await expect(pairTest_Contract.connect(other).transfer(wallet.address, 1)).to.be.reverted // ds-math-sub-underflow
	})

	it('transferFrom', async () => {
		await pairTest_Contract.approve(other.address, TEST_AMOUNT)
		await expect(pairTest_Contract.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
			.to.emit(pairTest_Contract, 'Transfer')
			.withArgs(wallet.address, other.address, TEST_AMOUNT)
		expect(await pairTest_Contract.allowance(wallet.address, other.address)).to.eq(0)
		expect(await pairTest_Contract.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
		expect(await pairTest_Contract.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	})

	it('transferFrom:max', async () => {
		await pairTest_Contract.approve(other.address, maxUint256)
		await expect(pairTest_Contract.connect(other).transferFrom(wallet.address, other.address, TEST_AMOUNT))
			.to.emit(pairTest_Contract, 'Transfer')
			.withArgs(wallet.address, other.address, TEST_AMOUNT)
		expect(await pairTest_Contract.allowance(wallet.address, other.address)).to.eq(maxUint256)
		expect(await pairTest_Contract.balanceOf(wallet.address)).to.eq(TOTAL_SUPPLY.sub(TEST_AMOUNT))
		expect(await pairTest_Contract.balanceOf(other.address)).to.eq(TEST_AMOUNT)
	})

	it('permit', async () => {

		// const pairTest_Contract = await factory.getPair(tokenC.address, tokenB.address, 26)
		// const pairTest_Contract = await ethers.getContractAt('RequiemPair', pairTest_Contract)
		console.log("NONCES")
		const nonce = await pairTest_Contract.nonces(wallet.address)
		const deadline = maxUint256
		console.log("DIGEST")
		const digest = await getApprovalDigest(
			pairTest_Contract,
			{ owner: wallet.address, spender: other.address, value: TEST_AMOUNT },
			nonce,
			deadline
		)
		console.log("D", digest)
		const { v, r, s } = ecsign(Buffer.from(digest.slice(2), 'hex'), Buffer.from(deployWallet.privateKey.slice(2), 'hex'))

		await expect(pairTest_Contract.permit(wallet.address, other.address, TEST_AMOUNT, deadline, v, hexlify(r), hexlify(s)))
			.to.emit(pairTest_Contract, 'Approval')
			.withArgs(wallet.address, other.address, TEST_AMOUNT)
		expect(await pairTest_Contract.allowance(wallet.address, other.address)).to.eq(TEST_AMOUNT)
		expect(await pairTest_Contract.nonces(wallet.address)).to.eq(BigNumber.from(1))
	})
})
