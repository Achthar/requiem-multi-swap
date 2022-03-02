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

	const usdc = await ethers.getContractAt('MockERC20', '0x5DA9e3e709701Db2E52e20B5293eF267E854496f');
	const usdt = await ethers.getContractAt('MockERC20', '0x0bB778E9Ad82Dc009121c70c342cA74e05A1Bc55');
	const dai = await ethers.getContractAt('MockERC20', '0xe7eFBF11bA5720d6794b04330E5AF84F34204886');
	const tusd = await ethers.getContractAt('MockERC20', '0xf1C213aCa09F51486dbFc2A3aEFC89F171E4576F');

	console.log("--- swap router stable ----")

	// const swapRouter = await deploy('RequiemStableSwapRouter', {
	// 	from: deployer,
	// 	log: true,
	// });

	const feeDistributor = await deploy('FeeDistributor', {
		from: deployer,
		log: true,
		args: []
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
	console.log("--- init ----")
	await execute(
		'RequiemStableSwap',
		{ from: deployer, log: true },
		'initialize',
		[usdc.address, usdt.address, dai.address, tusd.address], //_coins,
		[6, 6, 18, 18], //token decimals
		'Requiem Stableswap LP', // pool token name
		'req4USD', //_pool_token
		600, // _A
		1e6, //_fee = 0.01%
		1e6, // flash fee
		5e9, //_admin_fee, 50%,
		5e7, //withdraw fee = 0.5%
		feeDistributor.address
	);

	await execute(
		'FeeDistributor',
		{ from: deployer, log: true },
		'setSwapConfig',
		usdt.address,
		0,
		pool.address,
		constants.AddressZero
	);

	// const lpAddresss = await execute('RequiemStableSwap', { from: deployer, log: true }, 'getLpToken');
	// console.log("lpAddr", lpAddresss)

	const deadline = Math.floor(Date.now() / 1000 + 7200);

	console.log("--- get swap contract")
	const poolContract = await ethers.getContractAt('RequiemStableSwap', pool.address);
	await poolContract.connect(deployer)
	// const lpContract = await ethers.getContractAt('ERC20', await poolContract.getLpToken());
	const lpAddresss = await poolContract.getLpToken();
	console.log("lpAddr", lpAddresss)

	console.log("approve spending", pool.address, )
	await usdt.connect(deployer)
	await usdc.connect(deployer)
	await dai.connect(deployer)
	await tusd.connect(deployer)
	// await execute('USDC', { from: deployer }, 'approve', poolAddress, '57896044618658097711785492504343953926634992332820282019728792003956564819967');
	// console.log("usdc spending")
	await usdc.approve(pool.address,  ethers.constants.MaxInt256)
	await usdt.approve(pool.address,  ethers.constants.MaxInt256)
	await dai.approve(pool.address,  ethers.constants.MaxInt256)
	await tusd.approve(pool.address,  ethers.constants.MaxInt256)

	// await execute('USDC', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// console.log("usdc spending")
	// await execute('USDT', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// await execute('DAI', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);
	// await execute('TUSD', { from: deployer }, 'approve', pool.address, ethers.constants.MaxInt256);


	console.log('add_liquidity');
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
func.tags = ['stable-oasis-test'];
