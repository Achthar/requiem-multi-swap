import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, hardhatArguments, waffle } from 'hardhat';
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
	// await execute('T1', { from: localhost, log: true }, 'mint', user, parseUnits('10000000', 6) );
	// await execute('T2', { from: localhost, log: true }, 'mint', user, parseUnits('10000000', 6) );
	// await execute('T3', { from: localhost, log: true }, 'mint', user, parseUnits('10000000', 18) );
	// await execute('T4', { from: localhost, log: true }, 'mint', user, parseUnits('10000000', 18) );

	// const wethAddress = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'//await getWeth(hre);

	// const weth = await ethers.getContractAt("IWETH", wethAddress);

	// const wethContract = await weth.attach(
	// 	wethAddress
	//   );
	// const vaultAuthorization = await deploy("VaultAuthorization", {
	// 	contract: "VaultAuthorization",
	// 	skipIfAlreadyDeployed: true,
	// 	from: localhost,
	// 	args: [
	// 		authorizer.address,	// IAuthorizer authorizer,
	// 	],
	// 	log: true,
	// });

	// await execute('T1', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T2', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T3', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T4', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);

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
		1e6, // flash Fee
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
	// const lpContract = await ethers.getContractAt('ERC20', await poolContract.getLpToken());


	await execute('USDC', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', pool.address, ethers.constants.MaxInt256);

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
	const tokenAmount = await poolContract.calculateTokenAmount(
		[parseUnits('10', 6), parseUnits('10', 6), parseUnits('10', 18), parseUnits('10', 18)],
		true
	);

	console.log('Estimated LP', tokenAmount.toString());

	await execute(
		'RequiemStableSwap',
		{ from: localhost, gasLimit: 2e6 },
		'addLiquidity',
		[parseUnits('123401', 6), parseUnits('102342', 6), parseUnits('104233', 18), parseUnits('102334', 18)],
		0,
		deadline
	);

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
	console.log("RESERVGES", printReserves(res))
	console.log("--- LP added ---")

	// struct SwapStep {
	//     address pool;
	//     address tokenIn;
	//     address tokenOut;
	//     uint256 swapAmount; // tokenInAmount / tokenOutAmount
	//     uint256 limitReturnAmount; // minAmountOut / maxAmountIn
	//     uint256 maxPrice;
	// }

	// struct MultiSwapStep {
	//     uint swapStructureId;
	//     address[] pools;
	//     address[] path;
	//     uint256 swapAmount; // tokenInAmount / tokenOutAmount
	//     uint256 limitReturnAmount; // minAmountOut / maxAmountIn
	// }

	console.log("--regular")

	// await execute('WeightedRouterV2', { from: localhost }, 'swapExactTokensForTokens',
	// 	t1.address, // address tokenIn,
	// 	t2.address, // address tokenOut,
	// 	10, // uint256 amountIn,
	// 	0, // uint256 amountOutMin,
	// 	[pair],// address[] memory path,
	// 	localhost,// address to,
	// 	deadline// uint256 deadline
	// );

	// await execute('WeightedRouterV2', { from: localhost }, 'swapExactTokensForTokens',
	// 	t1.address, // address tokenIn,
	// 	t2.address, // address tokenOut,
	// 	1000, // uint256 amountIn,
	// 	0, // uint256 amountOutMin,
	// 	[pair],// address[] memory path,
	// 	localhost,// address to,
	// 	deadline// uint256 deadline
	// );

	// console.log("swapped 0")

	// await execute('WeightedRouterV2', { from: localhost }, 'swapExactTokensForTokens',
	// 	t2.address, // address tokenIn,
	// 	usdt.address, // address tokenOut,
	// 	10, // uint256 amountIn,
	// 	0, // uint256 amountOutMin,
	// 	[pair2],// address[] memory path,
	// 	localhost,// address to,
	// 	deadline// uint256 deadline
	// );

	// console.log("swapped 01")
	// await execute('WeightedRouterV2', { from: localhost }, 'swapExactTokensForTokens',
	// 	t1.address, // address tokenIn,
	// 	usdt.address, // address tokenOut,
	// 	10, // uint256 amountIn,
	// 	0, // uint256 amountOutMin,
	// 	[pair, pair2],// address[] memory path,
	// 	localhost,// address to,
	// 	deadline// uint256 deadline
	// );
	// console.log("swapped 1")



	// await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokensTest',
	// 	[{
	// 		swapStructureId: 0,
	// 		pools: [pair, pair2], // address pool;
	// 		path: [t1.address, t2.address, usdt.address],
	// 	}],
	// 	BigNumber.from(100),
	// 	0,
	// 	localhost,// address to,
	// 	deadline,// uint256 deadline
	// );

	// console.log("swapped single old")
	// const swap = [
	// 	{
	// 		swapStructureId: 0,
	// 		pools: [pair, pair2], // address pool;
	// 		path: [t1.address, t2.address, usdt.address],
	// 	},
	// 	{
	// 		swapStructureId: 1,
	// 		pools: [pool.address], // address pool;
	// 		path: [usdt.address, usdc.address],

	// 	}
	// ]

	// // console.log("swap", swap)

	// await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokensTest',
	// 	swap,
	// 	BigNumber.from(100), // in
	// 	0, //out Min
	// 	localhost,// address to,
	// 	deadline,// uint256 deadline
	// );


	// console.log("swapped 2 old")
	// const pairContract = await ethers.getContractAt('RequiemPair', pair);
	// await pairContract.onSwapGivenIn(
	// 	t1.address,// address tokenIn,
	//     t2.address,// address tokenOut,
	//     BigNumber.from(10000),// uint256 amountIn,
	//     0,// uint256 amountOutMin,
	//     localhost// address to
	// )
	// console.log("swapped single1")
	// await pairContract.onSwapGivenOut(
	// 	t1.address,// address tokenIn,
	//     t2.address,// address tokenOut,
	//     BigNumber.from('100000000'),// uint256 amountInMax,
	//     1000,// uint256 amountOut,
	//     localhost// address to
	// )
	// const pools1 = [pair, pair2]
	// const tokens1 = [t1.address, t2.address, usdt.address]
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

	console.log("swap single")


	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokens',
		[pair],
		[t1.address, t2.address],
		BigNumber.from(1000000),
		0,
		localhost,// address to,
		deadline,// uint256 deadline
	);
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

	const pools2 = [pair, pair2, pool.address]
	const tokens2 = [t1.address, t2.address, usdt.address, usdc.address]

	console.log("swap", pools2, tokens2)

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokens',
		pools2,
		tokens2,
		BigNumber.from(10000), // in
		10, //out Min
		localhost,// address to,
		deadline,// uint256 deadline
	);

	// struct QSwapStep {
	//     address pool;
	//     address tokenIn;
	//     address tokenOut;
	// }
	console.log("swapped 2")

	console.log("swap EO", pools2, tokens2)

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools2,
		tokens2,
		BigNumber.from('324243232'), // out
		BigNumber.from('1000234324324240'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	// struct QSwapStep {
	//     address pool;
	//     address tokenIn;
	//     address tokenOut;
	// }
	console.log("swapped 2A")


	console.log("--- create WETH t2 pair ----")
	await factoryContract.createPair(weth.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10), ethers.BigNumber.from(21000))
	const pairWeth = await factoryContract.getPair(weth.address, t2.address, ethers.BigNumber.from(50)) // , ethers.BigNumber.from(10))
	console.log("deposit eth")
	await execute('TestWETH', { from: localhost, value: BigNumber.from('10000000000') }, 'deposit')
	console.log("addWETH Liquidity")

	const liqWeth = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity', pairWeth, weth.address, t2.address,
		BigNumber.from('100000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('100000000'),
		BigNumber.from('1000000000'),
		reserveRatioRange,
		localhost,
		deadline);
	console.log("LP received weth t2")

	const tokens3 = [weth.address, t2.address, usdt.address, usdc.address]
	const pools3 = [pairWeth, pair2, pool.address]


	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForTokens',
		pools3,
		tokens3,
		BigNumber.from(1000),
		BigNumber.from('0'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 3")

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools3,
		tokens3,
		// [0, 0, 1],
		BigNumber.from('3232332'), // out
		BigNumber.from('1000234324324240'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 3A")

	await execute('WeightedRouterV2', { from: localhost, value: BigNumber.from('1000235430') }, 'onSwapETHForExactTokens',
		pools3,
		tokens3,
		// [0, 0, 1],
		BigNumber.from('3232332'), // out
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 3B")


	await execute('WeightedRouterV2', { from: localhost, value: BigNumber.from(1000) }, 'onSwapExactETHForTokens',
		pools3,
		tokens3,
		BigNumber.from('0'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 4")

	const tokens4 = [usdc.address, usdt.address, t2.address, weth.address]
	const pools4 = [pool.address, pair2, pairWeth]


	await execute('WeightedRouterV2', { from: localhost }, 'onSwapExactTokensForETH',
		pools4,
		tokens4,
		BigNumber.from('323233'), // in
		BigNumber.from('10'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);


	console.log("swapped 4A")

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactETH',
		pools4,
		tokens4,
		BigNumber.from('324433'), // out
		BigNumber.from('3242343232432'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 5A")




	await factoryContract.createPair(tusd.address, t2.address, ethers.BigNumber.from(48), ethers.BigNumber.from(20), ethers.BigNumber.from(14000))
	const pairTusd = await factoryContract.getPair(tusd.address, t2.address, ethers.BigNumber.from(48)) // , ethers.BigNumber.from(20))

	console.log("pair:", pairTusd)


	const liq3 = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity', pairTusd, tusd.address, t2.address,
		parseUnits('10003245', 18),
		parseUnits('13002330', 6),
		parseUnits('10003245', 18),
		parseUnits('13002330', 6),
		reserveRatioRange,
		localhost,
		deadline);

	console.log("TUSD T added")

	const tokens5 = [usdc.address, tusd.address, t2.address]
	const pools5 = [pool.address, pairTusd]

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools5,
		tokens5,
		BigNumber.from('347798'), // out
		BigNumber.from('99999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 6")

	await factoryContract.createPair(usdc.address, t3.address, ethers.BigNumber.from(48), ethers.BigNumber.from(20), ethers.BigNumber.from(16000))
	const pair_usdc_t3 = await factoryContract.getPair(usdc.address, t3.address, ethers.BigNumber.from(48)) //, ethers.BigNumber.from(20))

	const liq4 = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity', pair_usdc_t3, usdc.address, t3.address,
		BigNumber.from('3472321'),
		BigNumber.from('1002323212321232321'),
		BigNumber.from('3472321'),
		BigNumber.from('1002321232321232321'),
		reserveRatioRange,
		localhost,
		deadline);

	console.log("usdc T3 added")

	const tokens6 = [tusd.address, usdc.address, t3.address]
	const pools6 = [pool.address, pair_usdc_t3]

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools6,
		tokens6,
		BigNumber.from('32321'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 7")

	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools6,
		tokens6,
		BigNumber.from('32321332121'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 8")

	await factoryContract.createPair(usdt.address, t3.address, ethers.BigNumber.from(48), ethers.BigNumber.from(20), ethers.BigNumber.from(10000))
	const pair_usdt_t3 = await factoryContract.getPair(usdt.address, t3.address, ethers.BigNumber.from(48)) //, ethers.BigNumber.from(20))

	const liq5 = await execute('RequiemPairManagerV2', { from: localhost }, 'addLiquidity', pair_usdt_t3, usdt.address, t3.address,
		BigNumber.from('3472323'),
		BigNumber.from('1002323212321232321'),
		BigNumber.from('3472323'),
		BigNumber.from('1002321232321232321'),
		reserveRatioRange,
		localhost,
		deadline);

	console.log("usdt T3 added")

	const pools8 = [pool.address, pair_usdt_t3]
	const tokens8 = [tusd.address, usdt.address, t3.address]
	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools8,
		tokens8,
		BigNumber.from('3232133212212'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 9")

	const tokens9 = [usdt.address, usdc.address, t3.address]
	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		pools6,
		tokens9,
		BigNumber.from('3232133212212'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 10")


	const tokens10 = [dai.address, tusd.address]
	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		[pool.address],
		tokens10,
		BigNumber.from('32321332143212212'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 11")


	const tokens11 = [dai.address, usdt.address, t2.address]
	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		[pool.address, pair2],
		tokens11,
		BigNumber.from('323242323'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 12")

	console.log("set fee to")
	await factoryContract.setFeeTo(localhost)


	const usdcContract = await ethers.getContractAt('MockERC20', usdc.address);
	const usdtContract = await ethers.getContractAt('MockERC20', usdc.address);
	const t2Contract = await ethers.getContractAt('MockERC20', t2.address);
	const t3Contract = await ethers.getContractAt('MockERC20', t3.address);


	const bUsdt = await usdtContract.balanceOf(localhost)
	const bT2 = await t2Contract.balanceOf(localhost)


	console.log("withdraw admin Fee usdt t2")
	// await factoryContract.withdrawFee(pair2, localhost)
	const bUsdt1 = await usdtContract.balanceOf(localhost)
	const bT21 = await t2Contract.balanceOf(localhost)

	console.log("withdrawn usdt", bUsdt1.sub(bUsdt).toString(), "withdrawn T2", bT21.sub(bT2).toString())

	console.log("swapped 12")

	const tokens12 = [dai.address, usdc.address, t3.address]
	await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
		[pool.address, pair_usdc_t3],
		tokens12,
		BigNumber.from('32324232234324433'), // out
		BigNumber.from('99999999999999999999999'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	const bUsdc = await usdcContract.balanceOf(localhost)
	const bT3 = await t3Contract.balanceOf(localhost)

	console.log("withdraw admin Fee usdc t3")
	// await factoryContract.withdrawFee(pair_usdc_t3, localhost)
	const bUsdc1 = await usdtContract.balanceOf(localhost)
	const bT31 = await t3Contract.balanceOf(localhost)

	console.log("withdrawn usdc", bUsdc1.sub(bUsdc).toString(), "withdrawn T3", bT31.sub(bT3).toString())

	// console.log("swapped 13")

	// const tokens13 = [tusd.address, usdc.address, t3.address]
	// await execute('WeightedRouterV2', { from: localhost }, 'onSwapTokensForExactTokens',
	// 	[pool.address, pair_usdc_t3],
	// 	tokens13,
	// 	BigNumber.from('323242323'), // out
	// 	BigNumber.from('99999999999999999999999'), //in max
	// 	localhost,// address to,
	// 	deadline,// uint256 deadline
	// );

};
export default func;
func.tags = ['swap-v2-local'];