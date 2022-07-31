const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')
const WeightedPair = require('../artifacts/contracts/poolPair/WeightedPair.sol/RequiemPair.json')
const ERC20 = require('../artifacts/contracts/libraries/ERC20.sol/ERC20.json')


function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

// deployment script for bond depository
async function main() {
    const [operator] = await ethers.getSigners();
    const chainId = await operator.getChainId()

    const one18 = ethers.BigNumber.from(10).pow(18)
    const one14 = ethers.BigNumber.from(10).pow(14)
    const one8 = ethers.BigNumber.from(10).pow(8)
    const one6 = ethers.BigNumber.from(10).pow(6)


    const oneThird = one18.div(3)

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy the pool
    const poolContract = new ethers.Contract('0x4A76987978682222800D342116A2D07AD4e97A4c', new ethers.utils.Interface(WeightedPair.abi), operator)

    console.log("Pool", poolContract.address)
    const fees = await poolContract.getCollectedFees(

    )
    const bal = await poolContract.balanceOf('0x')


    console.log("FEES", fees)

    console.log("BAL", bal)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });