const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')

// deployment script for bond depository
async function main() {
    const [operator] = await ethers.getSigners();
    const chainId = await operator.getChainId()

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // We get the contract to deploy
    const Formula = await ethers.getContractFactory('WeightedFormula')

    // deploy the Formula
    const formulaContract = await Formula.deploy()

    const PairAdminFactory = await ethers.getContractFactory('WeightedPairAdmin')
    const pairAdminContract = await PairAdminFactory.deploy()

    const Factory = await ethers.getContractFactory("RequiemPairFactory")
    console.log("Factory with args", pairAdminContract.address, formulaContract.address, operator.address)
    const factoryContract = await Factory.deploy(pairAdminContract.address, formulaContract.address, operator.address)

    console.log("PairAdmin::setFactory", factoryContract.address)
    await pairAdminContract.setFactory(factoryContract.address)

    const weth = {
        43113: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
        42261: '0x792296e2a15e6ceb5f5039decae7a1f25b00b0b0'
    }
    const Router = await ethers.getContractFactory("SwapRouter")
    console.log("Router with args", factoryContract.address, weth[chainId])
    const routerContract = await Router.deploy(factoryContract.address, weth[chainId])

    console.log("addresses", {
        admin: pairAdminContract.address,
        formula: formulaContract.address,
        factory: factoryContract.address,
        router: routerContract.address
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });