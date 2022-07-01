import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, waffle } from 'hardhat';
import { DeployFunction } from "hardhat-deploy/types";

// import { deploy, deployedAt } from "./contract";


function delay(delayInms: number) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(2);
		}, delayInms);
	});
}



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

	console.log("--- deploy formulas ---")


	const formula = await deploy("RequiemFormula", {
		contract: "RequiemFormula",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [],
		log: true,
	});

	await delay(5000)
	console.log("Formula", formula.address)
	const factory = await deploy("RequiemPairFactory", {
		contract: "RequiemPairFactory",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [deployer, formula.address],
		log: true,
	});

	await delay(5000)


	const weth = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'

	console.log("Factory", factory.address)
	const router = await deploy("SwapRouter", {
		contract: "SwapRouter",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [factory.address, weth],
		log: true,
	});

	console.log("Router", router.address)

};
export default func;
func.tags = ['router-fuji'];
