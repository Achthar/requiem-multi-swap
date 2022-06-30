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


const printReserves = (res: any) => {
	return {
		reserve0: res.reserve0.toString(),
		reserve1: res.reserve1.toString(),
		vReserve0: res.vReserve0.toString(),
		vReserve1: res.vReserve1.toString()

	}
}

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, execute, get } = deployments;
	const { localhost, user } = await getNamedAccounts();

	const reserveRatioRange = [BigNumber.from(0), ethers.constants.MaxInt256]

	// console.log('network', network);
	console.log('localhost', localhost);
	console.log('2ndParty', user);
	const provider = waffle.provider;
	const balance0ETH = await provider.getBalance(localhost);
	console.log('localhost balante', balance0ETH);

	const t1 = await deploy('T1', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['T1 Coin', 'T1', 6],
	});

	const t2 = await deploy('T2', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['T2 Coin', 'T2', 8],
	});

	const t3 = await deploy('T3', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['T3 Coin', 'T3', 18],
	});


	const t4 = await deploy('T4', {
		contract: 'MockERC20',
		from: localhost,
		log: true,
		args: ['T4 Coin', 'T4', 18],
	});

	const weth = await deploy('TestWETH', {
		contract: 'TestWETH',
		from: localhost,
		log: true,
		args: [localhost],
	});

	await execute('T1', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000000000002143000', 6));
	await execute('T2', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000000000000000414100', 6));
	await execute('T3', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000002112000', 18));
	await execute('T4', { from: localhost, log: true }, 'mint', localhost, parseUnits('100000000000000000011400', 18));

	console.log("--- deploy formulas ---")
	const formula = await deploy("WeightedFormulaV2", {
		contract: "WeightedFormulaV2",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [],
		log: true,
	});

	const factory = await deploy("RequiemWeightedPairFactoryV2", {
		contract: "RequiemWeightedPairFactoryV2",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [localhost, formula.address, localhost],
		log: true,
	});

	const protocolFeeRemover = await deploy("ProtocolFeeRemover", {
		contract: "ProtocolFeeRemover",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [],
		log: true,
	});


	const router = await deploy("WeightedRouterV2", {
		contract: "WeightedRouterV2",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [factory.address, weth.address],
		log: true,
	});

	const pairManager = await deploy("RequiemPairManagerV2", {
		contract: "RequiemPairManagerV2",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [factory.address, weth.address],
		log: true,
	});


	await execute('T1', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T2', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T3', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T4', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);

	await execute('T1', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('T2', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('T3', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('T4', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);

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



	await execute('USDC', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);

	await execute('USDC', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);

	await execute('TestWETH', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);

	await execute('TestWETH', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);

	console.log('add_liquidity');

	const factoryContract = await ethers.getContractAt('RequiemWeightedPairFactoryV2', factory.address);
	console.log("--- create t1 t2 pair ----")
	await factoryContract.createPair(t1.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(0), ethers.BigNumber.from(10000))
	const pair = await factoryContract.getPair(t1.address, t2.address, ethers.BigNumber.from(50)) //, ethers.BigNumber.from(10))
	console.log("--- create t2 usdt pair ----")
	await factoryContract.createPair(usdt.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(0), ethers.BigNumber.from(10000))
	const pair2 = await factoryContract.getPair(usdt.address, t2.address, ethers.BigNumber.from(50)) //, ethers.BigNumber.from(50))

	console.log("pair:", pair, pair2)
	// const routerContract = await ethers.getContract('RequiemRouter');


	const liq = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity',
		pair,
		t1.address,
		t2.address,
		parseUnits('10003245', 18),
		parseUnits('13002330', 18),
		parseUnits('10003245', 18),
		parseUnits('13002330', 18),
		reserveRatioRange,
		localhost,
		deadline
	);

	const liq2 = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity',
		pair2,
		t2.address,
		usdt.address,
		BigNumber.from('1200000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('1200000000'),
		BigNumber.from('1000000000'),
		reserveRatioRange,
		localhost,
		deadline);

	// console.log("LP:", liq)

	const pairt1t2Contract = await ethers.getContractAt('RequiemWeightedPairV2', pair);
	const pairt2usdtContract = await ethers.getContractAt('RequiemWeightedPairV2', pair2);
	const res = await pairt1t2Contract.getReserves()


	console.log("RESERVES", printReserves(res))
	const k = res.vReserve0.mul(res.vReserve1)
	console.log("K", k.toString())


	console.log("swapped single2")

	// console.log("swapped 2 old")
	const pools1 = [pair, pair2]
	const tokens1 = [t1.address, t2.address, usdt.address]
	console.log("CALC")
	const amountIn = BigNumber.from(10000000)
	const res1 = await pairt1t2Contract.calculateSwapGivenIn(

		t1.address, // address tokenIn,
		t1.address, // address,
		amountIn// uint256 amountIn
	)

	const res2 = await pairt2usdtContract.calculateSwapGivenIn(

		t2.address, // address tokenIn,
		t1.address, // address,
		res1.toString()// uint256 amountIn
	)

	console.log("OUT", amountIn.toString(), "->", res1.toString(), "->", res2.toString())

	await execute('T1', { from: localhost }, 'approve', pairt1t2Contract.address, ethers.constants.MaxInt256);
	// await execute('T1', { from: localhost }, 'transfer', pairt1t2Contract.address, res1.toString());
	// const x = await pairt1t2Contract.onSwapGivenInSim(
	// 	t2.address, // address tokenIn,
	// 	t1.address, // address,
	// 	res1.toString(),// uint256 amountIn
	// 	0,
	// 	localhost
	// )

	// console.log("swap single", x)


	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokens',
		[pair],
		[t1.address, t2.address],
		BigNumber.from(1000000),
		0,
		localhost,// address to,
		deadline,// uint256 deadline
	);

	const res4 = await pairt1t2Contract.getReserves()
	const token0 = await pairt1t2Contract.token0()
	console.log("RESERVES", printReserves(res4), "token0", token0, t1.address)
	const k2 = res4.vReserve0.mul(res4.vReserve1)
	console.log("K", k2.toString(), k2.gte(k))

	console.log("swap double")

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokens',
		pools1,
		tokens1,
		BigNumber.from(1000000),
		0,
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 1")

};
export default func;
func.tags = ['swap-w2'];
