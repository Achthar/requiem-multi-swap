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

	const formulaAddress = '0x27b18F4aad3223d5A92F1aF0C4798f996aC78968'


	const factory = await deploy("RequiemWeightedPairFactory", {
		contract: "RequiemWeightedPairFactory",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [deployer, formulaAddress],
		log: true,
	});

	const protocolFeeRemover = await deploy("ProtocolFeeRemover", {
		contract: "ProtocolFeeRemover",
		skipIfAlreadyDeployed: true,
		from: deployer,
		args: [],
		log: true,
	});

};
export default func;
func.tags = ['pairs-fuji'];
