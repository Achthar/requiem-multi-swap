import { HardhatRuntimeEnvironment } from "hardhat/types";
import { ethers } from 'hardhat';
import { DeployFunction } from "hardhat-deploy/types";
import { parseUnits } from 'ethers/lib/utils';
import { expandDecimals } from "../test/ts/shared/utilities";
import { BigNumber } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy, execute, get } = deployments;
	const { deployer, user /*, governance, uniRouter */ } = await getNamedAccounts();

	const deadline = Math.floor(Date.now() / 1000 + 7200);

	console.log("---- " + deployer + " ----")
	const wethAddress = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'//await getWeth(hre);

	const authorizer = await deploy("Authorizer", {
		contract: "Authorizer",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [
			deployer
		],
		log: true,
	});

	// const vaultAuthorization = await deploy("VaultAuthorization", {
	// 	contract: "VaultAuthorization",
	// 	skipIfAlreadyDeployed: true,
	// 	from: deployer,
	// 	args: [
	// 		authorizer.address,	// IAuthorizer authorizer,
	// 	],
	// 	log: true,
	// });


	const vault = await deploy("Vault", {
		contract: "Vault",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [
			authorizer.address,	// IAuthorizer authorizer,
			wethAddress,	// IWETH weth,
			0,	// uint256 pauseWindowDuration,
			0,	// uint256 bufferPeriodDuration
		],
		log: true,
	});


	const t1 = await get('T1');
	const t2 = await get('T2');
	const t3 = await get('T3');
	const t4 = await get('T4');

	// await execute('T1', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T2', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T3', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	// await execute('T4', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);


	const weighted2PoolFactory = await deploy("WeightedPool2TokensFactory", {
		contract: "WeightedPool2TokensFactory",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [
			vault.address
		],
		log: true,
	});

	const weights = execute("WeightedPool2TokensFactory", { from: user },
	"create",
			"T1-T2", // string memory name,
			"T12", // string memory symbol,
			[t1.address, t2.address], // IERC20[] memory tokens,
			[50, 50], // uint256[] memory weights,
			1, // uint256 swapFeePercentage,
			true, // bool oracleEnabled,
			deployer, // address owner
	);

};


export default func;
func.tags = ["w2factory"];
