const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')
const WeihghtedPool = require('../artifacts/contracts/poolWeighted/WeightedPool.sol/WeightedPool.json')
const ERC20 = require('../artifacts/contracts/libraries/ERC20.sol/ERC20.json');
const { formatEther } = require('ethers/lib/utils');
const { BigNumber } = require('ethers');


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



    console.log("Read from contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy the pool
    const poolContract = new ethers.Contract(addresses.stable[chainId].pools[0], new ethers.utils.Interface(WeihghtedPool.abi), operator)

    console.log("Pool", poolContract.address)

    const amounts = [one18.mul(200), one8.mul(10), one6.mul(200000)]

    const tokens = await poolContract.getPooledTokens()
    const multis = await poolContract.getTokenMultipliers()
    const bals = await poolContract.getTokenBalances()
    const symbs = []
    for (let i = 0; i < tokens.length; i++) {
        const tokenContract = new ethers.Contract(tokens[i], new ethers.utils.Interface(ERC20.abi), operator)
        let symb = await tokenContract.symbol()
        symbs.push(symb)
    }
    const priceMatrix = [["-", ...symbs]]
    for (let i = 0; i < tokens.length; i++) {
        priceMatrix.push([])

        for (let j = 0; j < tokens.length; j++) {
            let val
            if (j !== i) {
                val = await poolContract.calculateSwapGivenIn(tokens[i], tokens[j], bals[i].div(10000))
                val = formatEther(val.mul(10000).mul(multis[j]))
            } else {
                val = '-'
            }
            if ((j === 0)) priceMatrix[i + 1].push(symbs[i])
            priceMatrix[i + 1].push(val)

        }
    }
    console.log(priceMatrix)
    const inAm = BigNumber.from('22310')
    const inIndex = 2
    const outIndex = 1
    const single = await poolContract.calculateSwapGivenIn(tokens[inIndex], tokens[outIndex], inAm)
    console.log("Calculated", formatEther(single.mul(multis[outIndex])), "for", formatEther(inAm.mul(multis[inIndex])))

    // const tokenContract = new ethers.Contract(tokens[inIndex], new ethers.utils.Interface(ERC20.abi), operator)

    // await tokenContract.connect(operator).transfer(poolContract.address, inAm)
    // const outTokenContract = new ethers.Contract(tokens[outIndex], new ethers.utils.Interface(ERC20.abi), operator)

    // const balPre = await outTokenContract.balanceOf(operator.address)
    // await poolContract.onSwapGivenIn(tokens[inIndex], tokens[outIndex], operator.address)

    // const balPost = await outTokenContract.balanceOf(operator.address)

    // console.log("pre", formatEther(balPre.mul(multis[outIndex])), "post", formatEther(balPost.mul(multis[outIndex])))
    console.log("tokens", tokens)
    console.log("bals", bals)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });