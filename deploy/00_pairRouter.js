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
    const formula = await Formula.deploy()

    console.log("Formula", formula.address)

    const Factory = await ethers.getContractFactory("RequiemPairFactory")

    const factory = await Factory.deploy(operator.address, formula.address, operator.address)

    console.log("Factory", factory.address)

    const Router = await ethers.getContractFactory("SwapRouter")

    const weth = '0xd00ae08403B9bbb9124bB305C09058E32C39A48c'


    const router = await Router.deploy(factory.address, weth)

    console.log("ROuter", router.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });