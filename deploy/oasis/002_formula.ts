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

	console.log("--- deploy formulas ---")

	// const formula = await deploy("RequiemFormula", {
	// 	contract: "RequiemFormula",
	// 	skipIfAlreadyDeployed: true,
	// 	from: deployer,
	// 	args: [],
	// 	log: true,
	// });

	const formulaFactory = await ethers.getContractFactory('RequiemFormula');
	console.log("deploy Formula")
	const formula = await formulaFactory.deploy(
	);
	console.log("addr", formula.address)


};
export default func;
func.tags = ['formula-oasis-test'];
