const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')
const WeihghtedPool = require('../artifacts/contracts/poolWeighted/WeightedPoolFactory.sol/WeightedPoolFactory.json')
// const ERC20 = require('../artifacts/contracts/libraries/ERC20.sol/ERC20.json')


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
    const zero30 = one18.mul(30).div(100)
    const zero25 = one18.mul(25).div(100)
    const zero45 = one18.mul(45).div(100)

    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy the pool
    const factoryContract = new ethers.Contract(addresses.weighted[chainId].factory, new ethers.utils.Interface(WeihghtedPool.abi), operator)

    console.log("Pool Factory", factoryContract.address)

    const tokens = [addresses.assets.WETH, addresses.assets.WBTC, addresses.assets.USDC].map(tt => tt[chainId])
    console.log("Tokens:", chainId, tokens)
    // const amounts = [one18.mul(200), one8.mul(10), one6.mul(200000)]
    const decimals = [18, 8, 6]
    const weights = [zero45, zero25, zero30]
    const fee = one14.mul(15)
    const flashFee = one14.mul(5)
    const withdrawFee = one14.mul(5)


    await factoryContract.createPool(
        tokens, // address[] memory _pooledTokens,
        decimals, // uint8[] memory decimals,
        weights, // uint256[] memory normalizedWeights,
        "REQ 3 Crypto Thunder Core",  // string memory lpTokenName,
        "REQ3CTT", // string memory lpTokenSymbol,
        fee, // uint256 _fee,
        flashFee,// uint256 _flashFee,
        withdrawFee // uint256 _withdrawFee
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });