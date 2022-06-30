const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')
const WeihghtedPool = require('../artifacts/contracts/WeightedPool.sol/WeightedPool.json')
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
    const poolContract = new ethers.Contract(addresses.pools.weighted.classic[chainId], new ethers.utils.Interface(WeihghtedPool.abi), operator)

    console.log("Pool", poolContract.address)

    const tokens = [addresses.tokens.WETH, addresses.tokens.WBTC, addresses.tokens.USDT].map(tt => tt[chainId])
    const amounts = [one18.mul(200), one8.mul(10), one6.mul(200000)]
    const decimals = [18, 8, 6]
    const weights = [oneThird, oneThird, oneThird.add(1)]
    const fee = one14.mul(15)
    const flashFee = one14.mul(5)
    const adminFee = one14.mul(2000)

    for (let i = 0; i < tokens.length; i++) {
        const tokenContract = new ethers.Contract(tokens[i], new ethers.utils.Interface(ERC20.abi), operator)
        const allowance = await tokenContract.allowance(operator.address, poolContract.address)
        if (allowance.lt(amounts[i])) {
            await tokenContract.approve(poolContract.address, ethers.constants.MaxUint256)
            await delay(5000)
        }
    }


    await poolContract.initialize(
        tokens, // address[] memory _coins,
        decimals, // uint8[] memory _decimals,
        weights,// uint256[] memory _normalizedWeights,
        amounts,// uint256[] memory _amounts,
        "REQ-3-Crypto", // string memory lpTokenName,
        "REQ3C", // string memory lpTokenSymbol,
        fee, // uint256 _fee,
        flashFee, // uint256 _flashFee,
        adminFee, // uint256 _adminFee,
        operator.address // address _feeDistributor
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });