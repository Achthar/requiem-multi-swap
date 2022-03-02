
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

	console.log("--- deploy standards --- ")

	const wbtc = await deploy('WBTC', {
		contract: 'MockERC20',
		from: deployer,
		log: true,
		args: ['Wrapped Bitcoin', 'WBTC', 8],
	});

	const weth = await deploy('WETH', {
		contract: 'MockERC20',
		from: deployer,
		log: true,
		args: ['Wrapped Ethereum', 'WETH', 18],
	});



	// await execute('WBTC', { from: deployer, log: true }, 'mint', deployer, parseUnits('1000', 8));
	// await execute('WETH', { from: deployer, log: true }, 'mint', deployer, parseUnits('1000', 18));




};
export default func;
func.tags = ['tokens-standard-oasis-test'];
