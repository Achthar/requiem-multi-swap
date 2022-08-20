const { ethers } = require('hardhat')
const { addresses } = require('../deployments/addresses')
const StablePool = require('../artifacts/contracts/poolStable/StablePoolFactory.sol/StablePoolFactory.json');
const { BigNumber } = require('ethers');
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


    console.log("Deploying contracts with the account:", operator.address);

    console.log("Account balance:", ethers.utils.formatEther(await operator.getBalance()).toString());

    // deploy the pool
    const factoryContract = new ethers.Contract(addresses.stable[chainId].factory, new ethers.utils.Interface(StablePool.abi), operator)

    console.log("Pool Factory", factoryContract.address)

    const tokens = [addresses.assets.BUSD, addresses.assets.USDC, addresses.assets.USDT].map(tt => tt[chainId])
    // const amounts = [one18.mul(200), one8.mul(10), one6.mul(200000)]
    const decimals = [18, 6, 6]
    const fee = one14.mul(15).div(10)
    const flashFee = one14.mul(5)
    const withdrawFee = one14.mul(5)

    const a = BigNumber.from(6000)
    await factoryContract.createPool(
        tokens, // address[] memory _pooledTokens,
        decimals, // uint8[] memory decimals,
        "REQ Tri Stable Oasis",  // string memory lpTokenName,
        "REQ3USD", // string memory lpTokenSymbol,
        a, // uint256 _A
        fee, // uint256 _fee,
        flashFee,// uint256 _flashFee,
        withdrawFee // uint256 _withdrawFee
        // string memory lpTokenName,
        // string memory lpTokenSymbol,
        // uint256 _a,
        // uint256 _fee,
        // uint256 _flashFee,
        // uint256 _withdrawFee
    )

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });