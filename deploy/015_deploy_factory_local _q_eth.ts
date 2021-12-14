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
		args: ['T2 Coin', 'T2', 6],
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

	await execute('T1', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000', 6));
	await execute('T2', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000', 6));
	await execute('T3', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000', 18));
	await execute('T4', { from: localhost, log: true }, 'mint', localhost, parseUnits('10000000', 18));
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
	const formula = await deploy("RequiemFormula", {
		contract: "RequiemFormula",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [],
		log: true,
	});

	const factory = await deploy("RequiemFactory", {
		contract: "RequiemFactory",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [localhost, formula.address],
		log: true,
	});

	const protocolFeeRemover = await deploy("ProtocolFeeRemover", {
		contract: "ProtocolFeeRemover",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [],
		log: true,
	});


	const router = await deploy("RequiemQRouter", {
		contract: "RequiemQRouter",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [factory.address, weth.address],
		log: true,
	});


	const pairManager = await deploy("RequiemQPairManager", {
		contract: "RequiemQPairManager",
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
		1e6, // flash fee
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

	await execute('USDC', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);

	await execute('TestWETH', { from: localhost }, 'approve', router.address, ethers.constants.MaxInt256);

	await execute('USDC', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('USDT', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('DAI', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);
	await execute('TUSD', { from: localhost }, 'approve', pairManager.address, ethers.constants.MaxInt256);

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
		[parseUnits('100023', 6), parseUnits('100332', 6), parseUnits('100012', 18), parseUnits('100000', 18)],
		0,
		deadline
	);

	const factoryContract = await ethers.getContractAt('RequiemFactory', factory.address);
	console.log("--- create t1 t2 pair ----")
	await factoryContract.createPair(t1.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	const pair = await factoryContract.getPair(t1.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	console.log("--- create t2 usdt pair ----")
	await factoryContract.createPair(usdt.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(50))
	const pair2 = await factoryContract.getPair(usdt.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(50))

	console.log("pair:", pair, pair2)
	// const routerContract = await ethers.getContract('RequiemRouter');


	const liq = await execute('RequiemQPairManager', { from: localhost }, 'addLiquidity', pair, t1.address, t2.address,
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		localhost,
		deadline);

	const liq2 = await execute('RequiemQPairManager', { from: localhost }, 'addLiquidity', pair2, t2.address, usdt.address,
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('1000000000'),
		localhost,
		deadline);

	// console.log("LP:", liq)

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

	console.log("--- create WETH t2 pair ----")
	await factoryContract.createPair(weth.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	const pairWeth = await factoryContract.getPair(weth.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	// console.log("--- create t2 usdt pair ----")
	// await factoryContract.createPair(usdt.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(50))
	// const pair2 = await factoryContract.getPair(usdt.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(50))

	// console.log("pair:", pair, pair2)
	// // const routerContract = await ethers.getContract('RequiemRouter');

	console.log("deposit eth")
	await execute('TestWETH', { from: localhost, value: BigNumber.from('10000000000') }, 'deposit')
	console.log("addWETH Liquidity")

	const liqWeth = await execute('RequiemQPairManager', { from: localhost }, 'addLiquidity', pairWeth, weth.address, t2.address,
		BigNumber.from('100000000'),
		BigNumber.from('1000000000'),
		BigNumber.from('100000000'),
		BigNumber.from('1000000000'),
		localhost,
		deadline);
	console.log("LP received weth t2")

	const pools2 = [pairWeth, pair2, pool.address]
	const path2 = [weth.address, t2.address, usdt.address, usdc.address]


	await execute('RequiemQRouter', { from: localhost }, 'onSwapExactTokensForTokens',
		pools2,
		path2,
		BigNumber.from(100000),
		BigNumber.from('0'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 3")
	await execute('RequiemQRouter', { from: localhost, value: BigNumber.from(10000) }, 'onSwapExactETHForTokens',
		pools2,
		path2,
		BigNumber.from('10'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 4")


	const pools21 = [pool.address, pair2, pairWeth]
	const path21 = [usdc.address, usdt.address, t2.address, weth.address]


	await execute('RequiemQRouter', { from: localhost }, 'onSwapExactTokensForTokens',
		pools21,
		path21,
		BigNumber.from(1000),
		BigNumber.from('0'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);
	console.log("swapped 4RT")
	await execute('RequiemQRouter', { from: localhost }, 'onSwapExactTokensForETH',
		pools21,
		path21,
		BigNumber.from(1000),
		BigNumber.from('0'), //out min
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 4R")

	console.log("--- create WETH usdc pair ----")
	await factoryContract.createPair(weth.address, usdc.address, ethers.BigNumber.from(20), ethers.BigNumber.from(10))
	const pairWethUsdc = await factoryContract.getPair(weth.address, usdc.address, ethers.BigNumber.from(20), ethers.BigNumber.from(10))
	console.log("--- add WETH usdc liq ----")
	const liqWeth3 = await execute('RequiemQPairManager', { from: localhost }, 'addLiquidity', pairWethUsdc, weth.address, usdc.address,
	BigNumber.from('100000000'),
	BigNumber.from('1000000000'),
	BigNumber.from('100000000'),
	BigNumber.from('1000000000'),
		localhost,
		deadline);
	console.log("LP received weth usdc")

	const path13 = [usdc.address, weth.address]
	const pools13 = [pairWethUsdc]

	// await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactETH',
	// 	pools13,
	// 	path13,
	// 	BigNumber.from('23'), //out
	// 	BigNumber.from('1000000000000000'), //in max
	// 	localhost,// address to,
	// 	deadline,// uint256 deadline
	// );

	console.log("swapped 5S")

	await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactTokens',
	pools13,
	path13,
	BigNumber.from('324433'), // out
	BigNumber.from('3242343232432'), //in max
	localhost,// address to,
	deadline,// uint256 deadline
);

console.log("swapped 5S1")

	const pools230 = [pool.address]
	const path230 = [usdt.address, usdc.address]

	const usdcContract = await ethers.getContractAt('MockERC20', usdc.address);
	const bal = await usdcContract.balanceOf(localhost)
	await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactTokens',
		pools230,
		path230,
		BigNumber.from('1000000000'), //out
		BigNumber.from('1000000000000000'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);
	const bal2 = await usdcContract.balanceOf(localhost)

	console.log(bal.toString(), "to", bal2.toString())
	console.log("swapped 5S20")


	const pools23 = [pool.address, pairWethUsdc]
	const path23 = [usdt.address, usdc.address, weth.address]

	const routerContract = await ethers.getContractAt('RequiemQRouter', router.address);
	const amnts = await routerContract.onSwapTokensForExactTokens(
		pools23,
		path23,
		BigNumber.from('32'), //out
		BigNumber.from('1000000000000000'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	)
	console.log("amnts", amnts)
	await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactTokens',
		pools23,
		path23,
		BigNumber.from('32'), //out
		BigNumber.from('1000000000000000'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 5S2")

	const pools3 = [pair2, pool.address, pairWethUsdc]
	const path3 = [t2.address, usdt.address, usdc.address, weth.address]

	await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactTokens',
		pools3,
		path3,
		BigNumber.from('34232'), //out
		BigNumber.from('1000000000000000'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 5")

	await execute('RequiemQRouter', { from: localhost }, 'onSwapTokensForExactETH',
	pools3,
	path3,
		BigNumber.from('100000'), //out
		BigNumber.from('10000000000'), //in max
		localhost,// address to,
		deadline,// uint256 deadline
	);

	console.log("swapped 5")

};
export default func;
func.tags = ['swap-localhost-q-eth'];
