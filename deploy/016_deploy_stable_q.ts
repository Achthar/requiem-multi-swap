import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, waffle } from 'hardhat';
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from 'ethers/lib/utils';
import { expandDecimals } from "../test/ts/shared/utilities";
import { BigNumber } from "ethers";
import { toNormalizedWeights } from "./resources/normalizedWeights"
import { MONTH } from './resources/time';
import { fp } from "./resources/numbers"
import { constants } from 'ethers';
import { Console } from 'console';
// import { deploy, deployedAt } from "./contract";


const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, execute, get } = deployments;
	const { localhost, user } = await getNamedAccounts();

	// console.log('network', network);
	console.log('localhost', localhost);
	console.log('2ndParty', user);
	const provider = waffle.provider;
	const balance0ETH = await provider.getBalance(localhost);
	console.log('localhost balante', balance0ETH);

	console.log("--- deploy stables --- ")

	const usdc = await deploy('USDC', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['USD Coin', 'USDC', 6],
	});

	const usdt = await deploy('USDT', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['Tether USD', 'USDT', 6],
	});

	const dai = await deploy('DAI', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['DAI Stablecoin', 'DAI', 18],
	});


	const tusd = await deploy('TUSD', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['True USD', 'TUSD', 18],
	});

	await execute('USDC', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000', 6));
	await execute('USDT', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000', 6));
	await execute('DAI', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000', 18));
	await execute('TUSD', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000', 18));

	console.log("--- swap router stable ----")

	const swapRouter = await deploy('RequiemStableSwapRouter', {
		from: localhost,
		log: true,
	});

	const feeDistributor = await deploy('FeeDistributor', {
		from: localhost,
		log: true,
	});

	await execute('FeeDistributor', { from: localhost, log: true }, 'initialize', usdc.address, swapRouter.address);
	await execute('FeeDistributor', { from: localhost, log: true }, 'toggleOperator', localhost);



	const stableSwapLib = await deploy('RequiemStableSwapLib', {
		contract: 'RequiemStableSwapLib',
		from: localhost,
		log: true,
		args: [],
	});


	console.log("Lib stable deployed at ", stableSwapLib.address)
	console.log("--- router stable ----")
	const pool = await deploy('RequiemStableSwap', {
		contract: 'RequiemStableSwap',
		from: localhost,
		log: true,
		args: [],
		libraries: {
			RequiemStableSwapLib: stableSwapLib.address,
		},
	});

	await execute(
		'RequiemStableSwap',
		{ from: localhost, log: true },
		'initialize',
		[usdc.address, usdt.address, dai.address, tusd.address], //_coins,
		[6, 6, 18, 18], //token decimals
		'Requiem Stableswap LP', // pool token name
		'zDollar', //_pool_token
		600, // _A
		1e6, //_fee = 0.01%
		5e9, //_admin_fee, 50%,
		5e7, //withdraw fee = 0.5%
		feeDistributor.address
	);

	// await execute('zDollar', {from: localhost, log: true}, 'setMinter', pool.address);

	// await execute(
	// 	'FeeDistributor',
	// 	{ from: localhost, log: true },
	// 	'setSwapConfig',
	// 	usdt.address,
	// 	0,
	// 	pool.address,
	// 	constants.AddressZero
	// );



	const deadline = Math.floor(Date.now() / 1000 + 7200);

	const poolContract = await ethers.getContractAt('RequiemStableSwap', pool.address);
	const lpContract = await ethers.getContractAt('ERC20', await poolContract.getLpToken());


	await execute('USDC', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);


	console.log('add_liquidity');
	const tokenAmount = await poolContract.calculateTokenAmount(
		[parseUnits('101', 6), parseUnits('102', 6), parseUnits('103', 18), parseUnits('104', 18)],
		true
	);

	console.log('Estimated LP', tokenAmount.toString());

	await execute(
		'RequiemStableSwap',
		{ from: localhost, gasLimit: 2e6 },
		'addLiquidity',
		[parseUnits('1001', 6), parseUnits('1022', 6), parseUnits('1033', 18), parseUnits('1141', 18)],
		0,
		deadline
	);
	// address tokenIn,
	// address tokenOut,
	// uint256 amountOut

	const inAmount = BigNumber.from('12343223')
	console.log("calculateIn")
	const calcSwap1 = await poolContract.calculateSwapGivenIn(usdt.address, usdc.address,
		inAmount)
	// address tokenIn,
	// address tokenOut,
	// uint256 amountOut
	console.log("calculate from Out", calcSwap1.toString())
	const calcSwaps = await poolContract.calculateSwapGivenOut(
		usdt.address, usdc.address,
		calcSwap1
	)

	console.log("1 --- in", inAmount.toString(), "inValidated", calcSwaps.toString())



	const inAmount1 = BigNumber.from(543346543)
	console.log("calculateIn")
	const calcSwap2 = await poolContract.calculateSwapGivenIn(usdc.address, dai.address,
		inAmount1)

	const calcSwap3 = await poolContract.calculateSwapGivenOut(
		usdc.address, dai.address,
		calcSwap2
	)

	console.log("2 --- in", inAmount1.toString(), "inValidated", calcSwap3.toString())

	const outAmount2 = BigNumber.from('54365229785433243')



	console.log("calculate from Out", outAmount2.toString())
	const calcSwap5 = await poolContract.calculateSwapGivenOut(
		dai.address,
		tusd.address,
		outAmount2
	)


	console.log("calculateIn")
	const calcSwap4 = await poolContract.calculateSwapGivenIn(
		dai.address,
		tusd.address,
		calcSwap5)
		
	console.log("3 --- in", outAmount2.toString(), "inValidated", calcSwap4.toString())


	const inAmount3 = BigNumber.from('54365229785433243')
	console.log("calculateout")
	const calcSwap6 = await poolContract.calculateSwapGivenIn(
		dai.address,
		tusd.address,
		inAmount3)

	console.log("calculate from Out", outAmount2.toString())
	const calcSwap7 = await poolContract.calculateSwapGivenOut(
		dai.address,
		tusd.address,
		calcSwap6
	)


	console.log("4 --- in", inAmount3.toString(), "inValidated", calcSwap7.toString())



};
export default func;
func.tags = ['sswap-localhost-q'];
