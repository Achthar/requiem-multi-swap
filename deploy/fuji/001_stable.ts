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
	console.log('deployer balante', balance0ETH);

	console.log("--- get stables --- ")

	// new Token(ChainId.AVAX_TESTNET, '0xca9ec7085ed564154a9233e1e7d8fef460438eea', 6, 'USDC', 'USD Coin'),
    // new Token(ChainId.AVAX_TESTNET, '0xffb3ed4960cac85372e6838fbc9ce47bcf2d073e', 6, 'USDT', 'Tether USD'),
    // new Token(ChainId.AVAX_TESTNET, '0xaea51e4fee50a980928b4353e852797b54deacd8', 18, 'DAI', 'Dai Stablecoin'),
    // new Token(ChainId.AVAX_TESTNET, '0xccf7ed44c5a0f3cb5c9a9b9f765f8d836fb93ba1', 18, 'TUSD', 'True USD'),

	const usdc = await ethers.getContractAt('MockERC20', '0xca9ec7085ed564154a9233e1e7d8fef460438eea');
	const usdt = await ethers.getContractAt('MockERC20', '0xffb3ed4960cac85372e6838fbc9ce47bcf2d073e');
	const dai =  await ethers.getContractAt('MockERC20', '0xaea51e4fee50a980928b4353e852797b54deacd8');
	const tusd =  await ethers.getContractAt('MockERC20', '0xccf7ed44c5a0f3cb5c9a9b9f765f8d836fb93ba1');

	console.log("--- swap router stable ----")

	// const swapRouter = await deploy('RequiemStableSwapRouter', {
	// 	from: deployer,
	// 	log: true,
	// });

	const feeDistributor = await deploy('FeeDistributor', {
		from: deployer,
		log: true,
		args:[]
	});


	const stableSwapLib = await deploy('RequiemStableSwapLib', {
		contract: 'RequiemStableSwapLib',
		from: deployer,
		log: true,
		args: [],
	});


	console.log("Lib stable deployed at ", stableSwapLib.address)
	console.log("--- router stable ----")
	const pool = await deploy('RequiemStableSwap', {
		contract: 'RequiemStableSwap',
		from: deployer,
		log: true,
		args: [],
		libraries: {
			RequiemStableSwapLib: stableSwapLib.address,
		},
	});

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



	const deadline = Math.floor(Date.now() / 1000 + 7200);

	const poolContract = await ethers.getContractAt('RequiemStableSwap', pool.address);
	// const lpContract = await ethers.getContractAt('ERC20', await poolContract.getLpToken());

	console.log("approve spending", pool.address, ethers.constants.MaxInt256)

	// await usdc.approve(pool.address, ethers.constants.MaxUint256)
	// console.log("usdc spending")
	// await usdt.approve(pool.address, ethers.constants.MaxUint256)
	// console.log("usdt spending")
	// await dai.approve(pool.address, ethers.constants.MaxUint256)
	// console.log("dai spending")
	// await tusd.approve(pool.address, ethers.constants.MaxUint256)
	// console.log("tusd spending")

	// await execute('USDC', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// await execute('USDT', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// await execute('DAI', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// await execute('TUSD', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);


	// console.log('add_liquidity');
	// const tokenAmount = await poolContract.calculateTokenAmount(
	// 	[parseUnits('1011', 6), parseUnits('1022', 6), parseUnits('1033', 18), parseUnits('1024', 18)],
	// 	true
	// );

	// console.log('Estimated LP', tokenAmount.toString());

	await execute(
		'RequiemStableSwap',
		{ from: deployer, gasLimit: 2e6 },
		'addLiquidity',
		[parseUnits('1001', 6), parseUnits('1022', 6), parseUnits('1033', 18), parseUnits('1141', 18)],
		0,
		deadline
	);

};
export default func;
func.tags = ['stable-fuji'];
