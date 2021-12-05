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

	console.log("--- deploy formulas ---")
	const formula = await deploy("RequiemFormulaTest", {
		contract: "RequiemFormulaTest",
		skipIfAlreadyDeployed: true,
		from: localhost,
		args: [],
		log: true,
	});

	const formulaContract = await ethers.getContractAt('RequiemFormulaTest', formula.address);

	const bN = BigNumber.from(120000)
	const bD = BigNumber.from(10000)
	// console.log("div", bN.div(bD).toString())
	const eN = BigNumber.from(48)
	const eD = BigNumber.from(52)
	const c = await formulaContract.power(bN, bD, eN, eD)
	console.log("pow", c[0].toString())

	const glog = await formulaContract.generalLog('21323433243224523433243242332432433435433')
	console.log("glog", glog.toString())

	const generalExp = await formulaContract.generalExp(BigNumber.from('2353'), BigNumber.from(6))
	// const d = await execute("RequiemFormulaTest" , { from: localhost },"power",bN, bD, eN, eD)
	console.log("gexp", generalExp.toString())

	// const olog = await formulaContract.optimalLog('17014118346046923173168730371588410572824324432')
	// console.log("olog", olog.toString())

	const oexp = await formulaContract.optimalExp(BigNumber.from('2353'))
	// const d = await execute("RequiemFormulaTest" , { from: localhost },"power",bN, bD, eN, eD)
	console.log("oexp", oexp.toString())

};
export default func;
func.tags = ['formula'];
