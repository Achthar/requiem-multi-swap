import {
    WeightedFormula,
    WeightedFormula__factory,
    TestERC20__factory,

    // Swap,
    WeightedPairERC20,
    RequiemPairFactory,
    RequiemPairFactory__factory,
    RequiemPair,
    RequiemPair__factory,
    SwapRouter__factory,
    WETH9__factory,
    SwapRouter,
    WETH9,
    RouterEventEmitter,
    // TToken,
    // StakePoolCreator,
    // StakePoolEpochRewardCreator,
    // StakePoolController,
    // RequiemPairFactoryMock,
    // TTokenFactory,
    // StakePoolCreatorFactory,
    // StakePoolEpochRewardCreatorFactory,
    // StakePoolControllerFactory,
    // RequiemPairFactoryMockFactory,
    // LpTokenFactory,
    // SwapFactory,
    // SwapUtils,
    // MathUtilsFactory,
    // StableSwapRouterFactory, SwapCreator, StableSwapFactory, LpToken, StableSwapRouter, Swap, StableSwapFactoryFactory,
} from "../../../types";
import {
    getAddress,
    keccak256
} from "ethers/lib/utils";

import { toWei } from "./utilities";
import { Contract } from "ethers";
import { deployments } from 'hardhat';
import { deployContractWithLibraries } from "./common";
// @ts-ignore
import SwapUtilsArtifact from "../../../artifacts/contracts/stableSwap/SwapUtils.sol/SwapUtils.json";
// @ts-ignore
import SwapCreatorArtifact from "../../../artifacts/contracts/stableSwap/SwapCreator.sol/SwapCreator.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

interface FormulaFixture {
    formula: WeightedFormula
}

interface FactoryFixture {
    factory: RequiemPairFactory
    formula: WeightedFormula
}

const overrides = {}

export async function formulaFixture(signer: SignerWithAddress): Promise<FormulaFixture> {
    return await deployments.createFixture(async () => {
        const formula = await new WeightedFormula__factory(signer).deploy()
        return { formula }
    })()
}

export async function factoryFixture(signer: SignerWithAddress): Promise<FactoryFixture> {
    return await deployments.createFixture(async () => {

        const { formula } = await formulaFixture(signer)
        const factory = await new RequiemPairFactory__factory(signer).deploy(signer.address, formula.address, signer.address)
        return { factory, formula }
    })()
}

interface PairFixture extends FactoryFixture {
    token0: WeightedPairERC20
    tokenWeight0: number
    token1: WeightedPairERC20
    tokenWeight1: number
    pair: RequiemPair
    tokenA: WeightedPairERC20
    tokenB: WeightedPairERC20
}

export async function pairFixture(signer: SignerWithAddress): Promise<PairFixture> {
    return await deployments.createFixture(async () => {

        const { factory, formula } = await factoryFixture(signer)

        const tokenA = await new TestERC20__factory(signer).deploy(toWei(10000));
        const tokenB = await new TestERC20__factory(signer).deploy(toWei(10000))

        await factory.createPair(tokenA.address, tokenB.address, 50, 30, 10000, overrides)
        const pairAddress = await factory.getPair(tokenA.address, tokenB.address, 50)
        const pair = RequiemPair__factory.connect(pairAddress, signer)
        const token0Address = await pair.token0()
        const token0 = tokenA.address === token0Address ? tokenA : tokenB
        const token1 = tokenA.address === token0Address ? tokenB : tokenA
        const tokenWeight0 = 50;
        const tokenWeight1 = 50;
        return { factory, formula, token0, tokenWeight0, token1, tokenWeight1, pair, tokenA, tokenB }
    })();
}

export async function pairDifferentWeightFixture(signer: SignerWithAddress, tokenWeightA = 80): Promise<PairFixture> {
    return await deployments.createFixture(async () => {

        const { factory, formula } = await factoryFixture(signer)

        const tokenA = await new TestERC20__factory(signer).deploy(toWei(10000));
        const tokenB = await new TestERC20__factory(signer).deploy(toWei(10000))

        await factory.createPair(tokenA.address, tokenB.address, tokenWeightA, 40, 10000, overrides)
        const pairAddress = await factory.getPair(tokenA.address, tokenB.address, tokenWeightA)
        const pair = RequiemPair__factory.connect(pairAddress, signer)
        const token0Address = await pair.token0()
        const token1Address = await pair.token1()
        const { _tokenWeight0: tokenWeight0, _tokenWeight1: tokenWeight1 } = await pair.getParameters();
        return {
            factory, formula,
            token0: TestERC20__factory.connect(token0Address, signer),
            tokenWeight0,
            token1: TestERC20__factory.connect(token1Address, signer),
            tokenWeight1,
            pair,
            tokenA,
            tokenB
        }
    })();
}


export interface V2Fixture {
    formula: Contract
    token0: WeightedPairERC20
    token1: WeightedPairERC20
    tokenA: WeightedPairERC20
    tokenB: WeightedPairERC20
    tokenWeight0: number,
    WETH: WETH9
    WETHPartner: Contract
    // factoryV1: Contract
    factoryV2: RequiemPairFactory
    // routerEventEmitter: RouterEventEmitter
    router: SwapRouter
    pair: RequiemPair
    WETHPair: RequiemPair
    initCodeHash: string
}

export async function v2Fixture(signer: SignerWithAddress, samePairWeight: boolean): Promise<V2Fixture> {
    return await deployments.createFixture(async () => {
        const {
            factory,
            formula,
            token0,
            token1,
            pair,
            tokenA,
            tokenB,
            tokenWeight0,
        } = samePairWeight ? await pairFixture(signer) : await pairDifferentWeightFixture(signer);
        const WETHPartner = await new TestERC20__factory(signer).deploy(toWei(10000));
        const WETH = await new WETH9__factory(signer).deploy();


        // deploy V2
        const factoryV2 = factory
        const uniswapPairBytecode = new RequiemPair__factory(signer).bytecode;
        const initCodeHash = keccak256(uniswapPairBytecode);
        // deploy routers

        const router = await new SwapRouter__factory(signer).deploy(factoryV2.address, WETH.address, overrides)

        if (samePairWeight) {
            await factoryV2.createPair(WETH.address, WETHPartner.address, 50, 30, 10000)
        } else {
            await factoryV2.createPair(WETH.address, WETHPartner.address, 80, 40, 10000)
        }
        const WETHPairAddress = samePairWeight
            ? await factoryV2.getPair(WETH.address, WETHPartner.address, 50)
            : await factoryV2.getPair(WETH.address, WETHPartner.address, 80);
        const WETHPair = RequiemPair__factory.connect(WETHPairAddress, signer)
        // const routerEventEmitter = await new RouterEventEmitterFactory(signer).deploy()
        return {
            formula,
            token0,
            token1,
            tokenA,
            tokenB,
            tokenWeight0,
            WETH,
            WETHPartner,
            // factoryV1,
            factoryV2,
            router,
            // routerEventEmitter,
            // migrator,
            // WETHExchangeV1,
            pair,
            WETHPair,
            initCodeHash
        }
    })()

}

// interface StakePoolFixture {
// 	stakeToken: TToken,
// 	stakePoolCreator: StakePoolCreator,
// 	stakePoolEpochRewardCreator: StakePoolEpochRewardCreator,
// 	stakePoolController: StakePoolController,
// 	fireBirdFactoryMock: FireBirdFactoryMock,
// }

// export async function stakePoolFixture(signer: SignerWithAddress): Promise<StakePoolFixture> {
// 	return await deployments.createFixture(async () => {
// 		const stakeToken = await new TTokenFactory(signer).deploy("Test", "TEST", toWei(100000));
// 		const stakePoolCreator = await new StakePoolCreatorFactory(signer).deploy();
// 		const stakePoolEpochRewardCreator = await new StakePoolEpochRewardCreatorFactory(signer).deploy();
// 		const stakePoolController = await new StakePoolControllerFactory(signer).deploy();
// 		const fireBirdFactoryMock = await new FireBirdFactoryMockFactory(signer).deploy();
// 		await stakePoolController.initialize(fireBirdFactoryMock.address);
// 		return {
// 			stakeToken,
// 			stakePoolCreator,
// 			stakePoolEpochRewardCreator,
// 			stakePoolController,
// 			fireBirdFactoryMock,
// 		}
// 	})()
// }

// interface StableFixture {
// 	firstToken: Contract,
// 	secondToken: Contract,
// 	thirdToken: Contract,
// 	stableFactory: StableSwapFactory,
// 	swapToken: LpToken,
// 	linkSwapToken: LpToken,
// 	stableSwapRouter: StableSwapRouter,
// 	swap: Swap,
// 	linkSwap: Swap,
// }

// export async function stableFixture (signer: SignerWithAddress): Promise<StableFixture> {
// 	return await deployments.createFixture(async () => {
// 		// Deploy dummy tokens
// 		const firstToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const secondToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const thirdToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const stableSwapRouter = await new StableSwapRouterFactory(signer).deploy();

// 		// Deploy MathUtils
// 		const mathUtils = await new MathUtilsFactory(signer).deploy();

// 		// Deploy SwapUtils with MathUtils library
// 		const swapUtils = (await deployContractWithLibraries(signer, SwapUtilsArtifact, {
// 			MathUtils: mathUtils.address,
// 		})) as SwapUtils;
// 		await swapUtils.deployed();

// 		// Deploy Creator with SwapUtils library
// 		const stableCreator = (await deployContractWithLibraries(
// 			signer,
// 			SwapCreatorArtifact,
// 			{ SwapUtils: swapUtils.address },
// 			[],
// 		)) as SwapCreator;

// 		// Deploy Factory
// 		const stableFactory = await new StableSwapFactoryFactory(signer).deploy();
// 		await stableFactory.initialize(signer.address, stableCreator.address);

// 		const tx = await stableFactory.createPool(
// 			[firstToken.address, secondToken.address],
// 			[18, 18],
// 			"Saddle Stable1/Stable2",
// 			"saddleStable",
// 			200,
// 			1e8, // 1%
// 			5e9, // 50%
// 			5e7, // 0.5%
// 			24 * 3600,
// 		);
// 		const receipt = await tx.wait();
// 		const swapAddress = getAddress(receipt.logs[3].topics[1].slice(26)) ?? null;
// 		const swap = SwapFactory.connect(swapAddress, signer);

// 		const swapStorage = await swap.swapStorage();
// 		const swapToken = LpTokenFactory.connect(swapStorage.lpToken, signer);


// 		const linkTx = await stableFactory.createPool(
// 			[swapToken.address, thirdToken.address],
// 			[18, 18],
// 			"Link Saddle swapToken/thirdToken",
// 			"linkSaddleStable",
// 			200,
// 			1e8, // 1%
// 			5e9, // 50%
// 			5e7, // 0.5%
// 			24 * 3600,
// 		);
// 		const linkReceipt = await linkTx.wait();
// 		const linkSwapAddress = getAddress(linkReceipt.logs[3].topics[1].slice(26)) ?? null;
// 		const linkSwap = SwapFactory.connect(linkSwapAddress, signer);

// 		const linkSwapStorage = await linkSwap.swapStorage();
// 		const linkSwapToken = LpTokenFactory.connect(linkSwapStorage.lpToken, signer);

// 		return {
// 			firstToken,
// 			secondToken,
// 			thirdToken,
// 			stableFactory,
// 			swapToken,
// 			stableSwapRouter,
// 			swap,
// 			linkSwap,
// 			linkSwapToken,

// 		}
// 	})()
// }