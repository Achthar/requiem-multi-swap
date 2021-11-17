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

	const formula = await deploy("RequiemFormula", {
		contract: "RequiemFormula",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [],
		log: true,
	});

	const factory = await deploy("RequiemFactory", {
		contract: "RequiemFactory",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [deployer, formula.address],
		log: true,
	});

	const protocolFeeRemover = await deploy("ProtocolFeeRemover", {
		contract: "ProtocolFeeRemover",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [],
		log: true,
	});


	const router = await deploy("RequiemRouter", {
		contract: "RequiemRouter",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [factory.address, wethAddress],
		log: true,
	});

	const t1 = await get('T1');
	const t2 = await get('T2');
	const t3 = await get('T3');
	const t4 = await get('T4');

	await execute('T1', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T2', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T3', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);
	await execute('T4', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);


	await execute('T4', { from: user }, 'approve', router.address, ethers.constants.MaxInt256);

	const factoryContract = await ethers.getContract('RequiemFactory');
	console.log("--- create t1 t2 pair ----")
	// await factoryContract.createPair(t1.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	console.log("--- get t1 t2 pair ----")
	const pair = await factoryContract.getPair(t1.address, t2.address, ethers.BigNumber.from(50), ethers.BigNumber.from(10))
	console.log("pair:", pair)
	const routerContract = await ethers.getContract('RequiemRouter');

	const liq = await execute('RequiemRouter', { from: user }, 'addLiquidity', pair, t1.address, t2.address,
		parseUnits('10', 6),
		parseUnits('10', 6),
		parseUnits('10', 6),
		parseUnits('10', 6),
		user,
		deadline);

	console.log("LP:", liq)
	// const zapper = await deploy("RequiemZap", {
	// 	contract: "RequiemZap",
	// 	skipIfAlreadyDeployed: true,
	// 	from: deployer,
	// 	args: [uniRouter, router.address],
	// 	log: true,
	// });

	// if (factoty.newlyDeployed || protocolFeeRemover.newlyDeployed) {
	// 	await execute("RequiemFactory", { from: deployer, log: true }, "setFeeTo", protocolFeeRemover.address);
	// }

	// if (factoty.newlyDeployed) {
	// 	await execute("RequiemFactory", { from: deployer, log: true }, "setProtocolFee", BigNumber.from(20000));
	// }
	// await execute("RequiemFactory", { from: deployer, log: true }, "setFeeToSetter", governance);
	// await execute("ProtocolFeeRemover", { from: deployer, log: true }, "setReceiver", governance);
	// await execute("ProtocolFeeRemover", { from: deployer, log: true }, "setGovernance", governance);
	// await execute("RequiemZap", { from: deployer, log: true }, "setGovernance", governance);


};

export async function getWeth(hre: HardhatRuntimeEnvironment) {
	const { deployments, getNamedAccounts } = hre;
	const { deploy, get, read, execute, getOrNull, log } = deployments;
	let { deployer, weth } = await getNamedAccounts();
	if (!weth) {
		const wethContract = await deploy("WETH", {
			contract: "WETH9",
			from: deployer,
			skipIfAlreadyDeployed: true,
			args: [],
			log: true,
		});

		if ((await read("WETH", "balanceOf", deployer)).eq(BigNumber.from(0))) {
			await execute("WETH", { from: deployer, log: true, value: expandDecimals(800, 18) }, "deposit");
		}
		weth = wethContract.address;
	}
	return weth;
}

export default func;
func.tags = ["factory"];
