import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers } from 'hardhat';
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from 'ethers/lib/utils';
import { expandDecimals } from "../test/ts/shared/utilities";
import { BigNumber } from "ethers";
import { toNormalizedWeights } from "./resources/normalizedWeights"
import { MONTH } from './resources/time';
import { fp } from "./resources/numbers"
// import { deploy, deployedAt } from "./contract";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts, network } = hre;
	const { deploy, execute, get } = deployments;
	const { localhost, user } = await getNamedAccounts();

	console.log('network', network);
	console.log('localhost', localhost);
	console.log('2ndParty', user);

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
		skipIfAlreadyDeployed: false,
		from: localhost,
		args: [

		],
		log: true,
	});

	const weightedMath = await deploy("RequiemWeightedMath", {
		contract: "RequiemWeightedMath",
		skipIfAlreadyDeployed: false,
		from: localhost,
		args: [

		],
		log: true,
	});

	console.log("--- deploy factory ---")
	const weighted2PoolFactory = await deploy("Requiem2PoolFactory", {
		contract: "Requiem2PoolFactory",
		skipIfAlreadyDeployed: false,
		from: localhost,
		args: [
			localhost,
			formula.address,
			weightedMath.address
		],
		log: true,
	});

	console.log("--- create pool ---")

	const NAME = 'Requiem Pool Token';
	const SYMBOL = 'RPT';
	const POOL_SWAP_FEE_PERCENTAGE = fp(0.01);
	const WEIGHTS = toNormalizedWeights([fp(30), fp(70)]);

	const BASE_PAUSE_WINDOW_DURATION = MONTH * 3;
	const BASE_BUFFER_PERIOD_DURATION = MONTH;


	// 	console.log(["TT", // string memory name,
	// 		"TTT", // string memory symbol,
	// 		[t1.address, t2.address], // IERC20[] memory tokens,
	// 		[BigNumber.from(500), BigNumber.from(500)], // uint256[] memory weights,
	// 		BigNumber.from('1000000000000'), // uint256 swapFeePercentage,
	// 		'false', // bool oracleEnabled,
	// 		localhost]) // address owner)

	// 	const weights = await execute("Requiem2PoolTokensFactory", { from: localhost, log: true },
	// 		"create",
	// 		"TT", // string memory name,
	// 		"TTT", // string memory symbol,
	// 		[t1.address, t2.address], // IERC20[] memory tokens,
	// 		[BigNumber.from(50), BigNumber.from(50)], // uint256[] memory weights,
	// 		BigNumber.from('1000000000000'), // uint256 swapFeePercentage,
	// 		false, // bool oracleEnabled,
	// 		localhost // address owner
	// 	);
	// 	console.log("---- res: " + weights)



	// const receipt = await (
	// 	execute("Requiem2PoolFactory", { from: localhost, log: true },
	// 		"createPool",
	// 		{
	// 			name: NAME,
	// 			symbol: SYMBOL,
	// 			token0: t1.address,
	// 			token1: t2.address,
	// 			normalizedWeight0: WEIGHTS[0],
	// 			normalizedWeight1: WEIGHTS[1],
	// 			swapFeePercentage: POOL_SWAP_FEE_PERCENTAGE,
	// 		}
	// 	)
	// );


	const receipt = await (
		execute("Requiem2PoolFactory", { from: localhost, log: true },
			"createPool",

			// NAME,
			// SYMBOL,
			t1.address,
			t2.address,
			52,
			// WEIGHTS[1],
			10
		)
	);

};
export default func;
func.tags = ['factory-localhost'];
