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

		await router.createPair(
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

		const pairTest = await factory.getPair(tokenA.address, tokenB.address, 26)
		pairTest_Contract = await ethers.getContractAt('RequiemPair', pairTest)




		await factory.setFeeParameters(wallet.address, wallet.address, 50000)


		await router.onSwapTokensForExactTokens(
			[pairTest_Contract.address], // address[] memory pools,
			[tokenA.address, tokenB.address],// address[] memory tokens,
			2144321432, // uint256 amountOut,
			ethers.constants.MaxUint256, // uint256 amountInMax,
			wallet.address,// address to,
			deadline// uint256 deadline
		)


		await router.onSwapTokensForExactTokens(
			[pairTest_Contract.address], // address[] memory pools,
			[tokenB.address, tokenA.address],// address[] memory tokens,
			2144321432, // uint256 amountOut,
			ethers.constants.MaxUint256, // uint256 amountInMax,
			wallet.address,// address to,
			deadline// uint256 deadline
		)


		await new router.addLiquidity(
			pairTest_Contract.address,
			tokenA.address,
			tokenB.address,
			parseUnits("1", 18),
			parseUnits("1", 18),
			0,
			0,
			[0, ethers.constants.MaxUint256],
			wallet.address,
			deadline
		)


	})


	it('pair data', async () => {
		console.log(pairTest_Contract.address)
		expect(1).to.equal(1)

	})

})
