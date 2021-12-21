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

	const weth = '0xfb40cd35C0cF322fA3cfB8D67b533Bd9ad7df056'
	const factoryAddress = '0x274B1F7F8e66B044B2DC773E017750957f70490c'

	const pairManager = await deploy("RequiemQPairManager", {
		contract: "RequiemQPairManager",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [factoryAddress, weth],
		log: true,
	});

	const router = await deploy("RequiemQRouter", {
		contract: "RequiemQRouter",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [factoryAddress, weth],
		log: true,
	});


};
export default func;
func.tags = ['router-oasis-test'];
