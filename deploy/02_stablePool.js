const { ethers } = require('hardhat')
const registerAbi = require('../deployments/data/register.json')
const { addresses } = require('../deployments/addresses')

// deployment script for bond depository
async function main() {
    const [operator] = await ethers.getSigners();
    const chainId = await operator.getChainId()

    const registerAddress = addresses.register[chainId].proxy
    const registerContract = await ethers.getContractAt(registerAbi, registerAddress)

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy library
    const StablePoolLibFactory = await ethers.getContractFactory('StablePoolLib')
    const libraryContract = await StablePoolLibFactory.deploy()
    console.log("library address", libraryContract.address)
    // deploy creator
    const PoolCreatorFactory = await ethers.getContractFactory('StablePoolCreator', { libraries: { StablePoolLib: libraryContract.address } })
    const poolCreatorContract = await PoolCreatorFactory.deploy()
    console.log("creator address", poolCreatorContract.address)

    // deploy factory
    const FactoryFactory = await ethers.getContractFactory('StablePoolFactory')
    const factoryContract = await FactoryFactory.deploy()
    console.log("factory address", factoryContract.address)

    console.log("Register::authorize factory")
    await registerContract.authorize(factoryContract.address)

    console.log("Factory::initialize factory")
    await factoryContract.initialize(
        poolCreatorContract.address,
        operator.address,
        registerAddress
    )

    console.log("addresses", {
        library: libraryContract.address,
        poolCreator: poolCreatorContract.address,
        factory: factoryContract.address
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });