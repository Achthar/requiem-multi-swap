import { expect } from "../chai-setup";
import { BigNumber, Contract } from 'ethers'
import { ecsign } from 'ethereumjs-util'

import {
	keccak256,
	defaultAbiCoder,
	toUtf8Bytes,
	hexlify,
	parseUnits,
	formatEther
} from 'ethers/lib/utils'
import { ethers, network } from "hardhat";



import { getApprovalDigest } from '../shared/common'
import { maxUint256, toWei } from '../shared/utilities'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
	RequiemPairFactory__factory,
	WeightedFormula__factory,
	MockERC20__factory,
	SwapRouter__factory,
	RequiemPair,
	MockCallee__factory,
	ThiefRouter__factory,
	WETH9__factory,
	MathMock__factory,
	MathMock
} from "../../../types";


const TOTAL_SUPPLY = BigNumber.from('1000000000000000000')
const TEST_AMOUNT = BigNumber.from(1e9)

describe('Math-Comp', () => {
	let signers: SignerWithAddress[];
	let wallet: SignerWithAddress;
	let other: SignerWithAddress;
	let deployWallet: any;
	let math: MathMock


	beforeEach(async () => {
		deployWallet = await ethers.Wallet.fromMnemonic(((network.config.accounts) as any).mnemonic);
		signers = await ethers.getSigners();
		wallet = signers[0];
		other = signers[1];
		math = await new MathMock__factory(wallet).deploy()
	})


	it('math data', async () => {
		let gasCosts = {}
		let base = parseUnits('15', 18)
		let exp = parseUnits('5', 17)

		let p = await math.powPRB(base, exp)
		let w = await math.powWeighted(base, exp)

		console.log(formatEther(p), formatEther(w))

		let tx = await math.writePowPRB(base, exp
		)
		// record gas
		let receipt = await tx.wait();
		let gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['PRB']: gasUsed }

		tx = await math.writePowWeighted(base, exp
		)
		// record gas
		receipt = await tx.wait();

		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['Weighted']: gasUsed }
		console.log(gasCosts)

		base = parseUnits('1532', 18)
		exp = parseUnits('2', 18)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))

		base = parseUnits('15', 9)
		exp = parseUnits('2', 18)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))

		tx = await math.writePowPRB(base, exp
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['PRB']: gasUsed }

		tx = await math.writePowWeighted(base, exp
		)
		// record gas
		receipt = await tx.wait();

		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['Weighted']: gasUsed }
		console.log(gasCosts)

		base = parseUnits('15', 18)
		exp = parseUnits('2', 16)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))

		tx = await math.writePowPRB(base, exp
		)
		// record gas
		receipt = await tx.wait();
		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['PRB']: gasUsed }


		base = parseUnits('1523', 15)
		exp = parseUnits('123', 16)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))


		tx = await math.writePowWeighted(base, exp
		)
		// record gas
		receipt = await tx.wait();

		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['Weighted']: gasUsed }
		console.log(gasCosts)


		base = parseUnits('1523', 15)
		exp = parseUnits('323234', 13)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))


		tx = await math.writePowWeighted(base, exp
		)
		// record gas
		receipt = await tx.wait();

		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['Weighted']: gasUsed }
		console.log(gasCosts)


		base = parseUnits('3523', 15)
		exp = parseUnits('123234', 13)

		p = await math.powPRB(base, exp)
		w = await math.powWeighted(base, exp)
		console.log(formatEther(p), formatEther(w))


		tx = await math.writePowWeighted(base, exp
		)
		// record gas
		receipt = await tx.wait();

		gasUsed = BigInt(receipt.cumulativeGasUsed.toString()) * BigInt(receipt.effectiveGasPrice.toString());
		gasCosts = { ...gasCosts, ['Weighted']: gasUsed }
		console.log(gasCosts)


	})

})
