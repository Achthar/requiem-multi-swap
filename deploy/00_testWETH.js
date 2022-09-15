const { ethers } = require('hardhat')

// deployment script for weth depository
async function main() {
    console.log("Deploy WETH Type")
    const WethContract = await ethers.getContractFactory('WTT')
    const weth = await WethContract.deploy()

    console.log("addresses", {
        weth: weth.address
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });