const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')

// it does not matter for this script which abi we use as all pools have the same add liquidity function
const WeihghtedPool = require('../artifacts/contracts/poolWeighted/WeightedPool.sol/WeightedPool.json')
const ERC20 = require('../artifacts/contracts/libraries/ERC20.sol/ERC20.json');
const { formatEther } = require('ethers/lib/utils');


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
    const one8 = ethers.BigNumber.from(10).pow(8)
    const one6 = ethers.BigNumber.from(10).pow(6)



    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy the pool
    const poolContract = new ethers.Contract(addresses.stable[chainId].pools[0], new ethers.utils.Interface(WeihghtedPool.abi), operator)

    console.log("Pool", poolContract.address)


    const multis = await poolContract.getTokenMultipliers()
    const rawAmounts = [10000, 10000, 10000]
    const amounts = multis.map((m, i) => one18.mul(rawAmounts[i]).div(m))

    const tokens = await poolContract.getPooledTokens()
    console.log("Add", multis.map((m, i) => formatEther(m.mul(amounts[i]))))
    console.log("Tokens", tokens)
    for (let i = 0; i < tokens.length; i++) {
        const tokenContract = new ethers.Contract(tokens[i], new ethers.utils.Interface(ERC20.abi), operator)
        const allowance = await tokenContract.allowance(operator.address, poolContract.address)
        if (allowance.lt(amounts[i])) {
            await tokenContract.approve(poolContract.address, ethers.constants.MaxUint256)
            await delay(5000)
        }
    }

    console.log("Adding liquidity")
    await poolContract.addLiquidityExactIn(
        amounts,   // uint256[] memory amounts,
        1,  // uint256 minMintAmount,
        operator.address,  // address to,
        ethers.constants.MaxUint256 // uint256 deadline
    )

    console.log("execution done")

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });