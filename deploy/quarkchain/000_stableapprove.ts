import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, waffle } from 'hardhat';
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from 'ethers/lib/utils';
import { expandDecimals } from "../../test/ts/shared/utilities";
import { BigNumber } from "ethers";
import { toNormalizedWeights } from "../resources/normalizedWeights"
import { MONTH } from '../resources/time';
import { fp } from "../resources/numbers"
import { constants } from 'ethers';
import { Console } from 'console';
// import { deploy, deployedAt } from "./contract";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, execute, get } = deployments;
	const { deployer, user } = await getNamedAccounts();

	// console.log('network', network);
	console.log('deployer', deployer);
	console.log('2ndParty', user);
	const provider = waffle.provider;
	const balance0ETH = await provider.getBalance(deployer);
	console.log('deployer balante', balance0ETH.toString(), network.name);

	console.log("--- get stables --- ")

	// new Token(ChainId.AVAX_TESTNET, '0xca9ec7085ed564154a9233e1e7d8fef460438eea', 6, 'USDC', 'USD Coin'),
	// new Token(ChainId.AVAX_TESTNET, '0xffb3ed4960cac85372e6838fbc9ce47bcf2d073e', 6, 'USDT', 'Tether USD'),
	// new Token(ChainId.AVAX_TESTNET, '0xaea51e4fee50a980928b4353e852797b54deacd8', 18, 'DAI', 'Dai Stablecoin'),
	// new Token(ChainId.AVAX_TESTNET, '0xccf7ed44c5a0f3cb5c9a9b9f765f8d836fb93ba1', 18, 'TUSD', 'True USD'),

	const usdc = await ethers.getContractAt('MockERC20', '0x9aEeeD65aE87e3b28793aefAeED59c3f10ef956b');
	const usdt = await ethers.getContractAt('MockERC20', '0xfA0D8065755Fb3b6520149e86Ac5A3Dc3ee5Dc92');
	const dai = await ethers.getContractAt('MockERC20', '0xf10Bd0dA1f0e69c3334D7F8116C9082746EBC1B4');
	const tusd = await ethers.getContractAt('MockERC20', '0x4e8848da06E40E866b82f6b52417494936c9509b');

	console.log("--- router stable ----")
	const poolAddress = '0x2a90276992ddC21C3585FE50f5B43D0Cf62aDe03'

	// await execute(
	// 	'RequiemStableSwap',
	// 	{ from: deployer, log: true },
	// 	'initialize',
	// 	[usdc.address, usdt.address, dai.address, tusd.address], //_coins,
	// 	[6, 6, 18, 18], //token decimals
	// 	'Requiem Stableswap LP', // pool token name
	// 	'req4USD', //_pool_token
	// 	600, // _A
	// 	1e6, //_fee = 0.01%
	// 	1e6, // flash fee
	// 	5e9, //_admin_fee, 50%,
	// 	5e7, //withdraw fee = 0.5%
	// 	feeDistributor.address
	// );

	// await execute('req4USD', {from: deployer, log: true}, 'setMinter', pool.address);

	// await execute(
	// 	'FeeDistributor',
	// 	{ from: deployer, log: true },
	// 	'setSwapConfig',
	// 	usdt.address,
	// 	0,
	// 	pool.address,
	// 	constants.AddressZero
	// );

	// const lpAddresss = await execute('RequiemStableSwap', { from: deployer, log: true }, 'getLpToken');
	// console.log("lpAddr", lpAddresss)

	const deadline = Math.floor(Date.now() / 1000 + 7200);

	console.log("--- get swap contract")
	// const poolContract = await ethers.getContractAt('RequiemStableSwap', pool.address);
	// const lpContract = await ethers.getContractAt('ERC20', await poolContract.getLpToken());
	// const lpAddresss = await poolContract.getLpToken();
	// console.log("lpAddr", lpAddresss)

	// 	const x = this.state.signer.provider.getCode('0x9aEeeD65aE87e3b28793aefAeED59c3f10ef956b')
	// console.log("x provide get code", x)
	console.log("approve spending", poolAddress, ethers.constants.MaxInt256)

	await usdt.connect(deployer)
	await usdc.connect(deployer)
	await dai.connect(deployer)
	await tusd.connect(deployer)

	await usdc.approve(poolAddress, ethers.constants.MaxInt256)
	await usdt.approve(poolAddress, ethers.constants.MaxInt256)
	await dai.approve(poolAddress, ethers.constants.MaxInt256)
	await tusd.approve(poolAddress, ethers.constants.MaxInt256)

	console.log("all approved")

};
export default func;
func.tags = ['approve-oasis-test'];
