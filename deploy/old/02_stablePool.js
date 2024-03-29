const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')

// deployment script for bond depository
async function main() {
    const [operator] = await ethers.getSigners();
    const chainId = await operator.getChainId()

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    const Library = await ethers.getContractFactory('StableSwapLib')

    const wPoolLib = await Library.deploy()

    // We get the contract to deploy
    const Pool = await ethers.getContractFactory('StableSwap', { libraries: { StableSwapLib: wPoolLib.address } })

    // deploy the pool
    const pool = await Pool.deploy()

    console.log("Pool", pool.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });