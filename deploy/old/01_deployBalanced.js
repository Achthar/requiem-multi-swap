const { ethers } = require('hardhat')

// deployment script for bond depository
async function main() {
    const [operator] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy library
    const BalancedPoolLibFactory = await ethers.getContractFactory('BalancedPoolLib')
    const libraryContract = await BalancedPoolLibFactory.deploy()
    console.log("library address", libraryContract.address)
    // deploy creator
    const PoolCreatorFactory = await ethers.getContractFactory('BalancedPoolCreator', { libraries: { BalancedPoolLib: libraryContract.address } })
    const poolCreatorContract = await PoolCreatorFactory.deploy()
    console.log("creator address", poolCreatorContract.address)

    // deploy factory
    const FactoryFactory = await ethers.getContractFactory('BalancedPoolFactory')
    const factoryContract = await FactoryFactory.deploy()
    console.log("factory address", factoryContract.address)

    // init factory
    // await factoryContract.initialize(
    //     operator.address,// feeToSetter
    //     poolCreatorContract.address
    // )
    console.log("addresses", {
        library: libraryContract.address,
        poolCrator: poolCreatorContract.address,
        factory: factoryContract.address
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });