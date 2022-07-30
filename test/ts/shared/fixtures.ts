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
    MockERC20__factory,
    StablePool,
    MockERC20,
    StablePool__factory,
    StablePoolLib__factory,
    StablePoolFactory__factory,
    StablePoolFactory,
    StablePoolCreator,
    StablePoolCreator__factory,
    MockStableMath,
    MockStableMath__factory,
    ThiefRouter,
    ThiefRouter__factory,
    MockFlashLoanRecipient,
    MockFlashLoanRecipient__factory,
    WeightedPoolFactory,
    WeightedPoolCreator,
    WeightedPool,
    WeightedPoolLib__factory,
    WeightedPoolCreator__factory,
    WeightedPoolFactory__factory,
    WeightedPool__factory,
    BalancedPoolFactory,
    BalancedPoolCreator,
    BalancedPool,
    BalancedPoolLib__factory,
    BalancedPoolCreator__factory,
    BalancedPoolFactory__factory,
    BalancedPool__factory
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
    // StablePoolRouterFactory, SwapCreator, StablePoolFactory, LpToken, StablePoolRouter, Swap, StablePoolFactoryFactory,
} from "../../../types";
import {
    getAddress,
    keccak256,
    parseUnits
} from "ethers/lib/utils";

import { maxUint256, toWei } from "./utilities";
import { BigNumber, Contract, Signer } from "ethers";
import { deployments } from 'hardhat';
import { deployContractWithLibraries } from "./common";
// @ts-ignore
import SwapUtilsArtifact from "../../../artifacts/contracts/StablePool/SwapUtils.sol/SwapUtils.json";
// @ts-ignore
import SwapCreatorArtifact from "../../../artifacts/contracts/StablePool/SwapCreator.sol/SwapCreator.json";
import StablePoolArtifact from "../../../artifacts/contracts/poolStable/StablePool.sol/StablePool.json";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { drop } from "lodash";
import { expect } from "chai";

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

export async function pairDifferentWeightAndAmpFixture(signer: SignerWithAddress, tokenWeightA = 80): Promise<PairFixture> {
    return await deployments.createFixture(async () => {

        const { factory, formula } = await factoryFixture(signer)

        const tokenA = await new TestERC20__factory(signer).deploy(toWei(10000));
        const tokenB = await new TestERC20__factory(signer).deploy(toWei(10000))

        await factory.createPair(tokenA.address, tokenB.address, tokenWeightA, 40, 12500, overrides)
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

export interface ERC20Fixture {
    token0: MockERC20
    token1: MockERC20
    token2: MockERC20
    token3: MockERC20
    token4: MockERC20
    token5: MockERC20
}


export async function tokenFixture(signer: SignerWithAddress): Promise<ERC20Fixture> {

    const t0 = await new MockERC20__factory(signer).deploy("Token0", "T0", 6)
    const t1 = await new MockERC20__factory(signer).deploy("Token1", "T1", 18)
    const t2 = await new MockERC20__factory(signer).deploy("Token2", "T2", 18)
    const t3 = await new MockERC20__factory(signer).deploy("Token3", "T3", 8)
    const t4 = await new MockERC20__factory(signer).deploy("Token4", "T4", 9)
    const t5 = await new MockERC20__factory(signer).deploy("Token5", "T5", 18)

    return {
        token0: t0,
        token1: t1,
        token2: t2,
        token3: t3,
        token4: t4,
        token5: t5
    }
}

export async function approveAll(signer: SignerWithAddress, tokenFixture: ERC20Fixture, address: string) {
    await tokenFixture.token0.connect(signer).approve(address, maxUint256)
    await tokenFixture.token1.connect(signer).approve(address, maxUint256)
    await tokenFixture.token2.connect(signer).approve(address, maxUint256)
    await tokenFixture.token3.connect(signer).approve(address, maxUint256)
    await tokenFixture.token4.connect(signer).approve(address, maxUint256)
    await tokenFixture.token5.connect(signer).approve(address, maxUint256)
}

export async function distributeTokens(tokenFixture: ERC20Fixture, address: string, amount: string) {
    let dec = await tokenFixture.token0.decimals()
    await tokenFixture.token0.mint(address, parseUnits(amount, dec))

    dec = await tokenFixture.token1.decimals()
    await tokenFixture.token1.mint(address, parseUnits(amount, dec))

    dec = await tokenFixture.token2.decimals()
    await tokenFixture.token2.mint(address, parseUnits(amount, dec))

    dec = await tokenFixture.token3.decimals()
    await tokenFixture.token3.mint(address, parseUnits(amount, dec))

    dec = await tokenFixture.token4.decimals()
    await tokenFixture.token4.mint(address, parseUnits(amount, dec))

    dec = await tokenFixture.token5.decimals()
    await tokenFixture.token5.mint(address, parseUnits(amount, dec))

}



export interface SwapRouterFixture {
    weth: WETH9
    formula: WeightedFormula
    factory: RequiemPairFactory
    router: SwapRouter
}


export async function swapRouterFixture(signer: SignerWithAddress): Promise<SwapRouterFixture> {
    const formula = await new WeightedFormula__factory(signer).deploy()
    const weth = await new WETH9__factory(signer).deploy()
    const factory = await new RequiemPairFactory__factory(signer).deploy(signer.address, formula.address, signer.address)
    const router = await new SwapRouter__factory(signer).deploy(factory.address, weth.address)
    return {
        router,
        weth,
        factory,
        formula
    }
}



export async function thiefRouterFixture(signer: SignerWithAddress): Promise<ThiefRouter> {
    const formula = await new WeightedFormula__factory(signer).deploy()
    const weth = await new WETH9__factory(signer).deploy()
    const factory = await new RequiemPairFactory__factory(signer).deploy(signer.address, formula.address, signer.address)
    const router = await new ThiefRouter__factory(signer).deploy(factory.address, weth.address)
    return router
}

export interface StablePoolFixture {
    factory: StablePoolFactory
    creator: StablePoolCreator
    flashLoanRecipient: MockFlashLoanRecipient
    pool: StablePool
}

async function approveArray(tokens: MockERC20[], address: string) {
    for (let i = 0; i < tokens.length; i++) {
        await tokens[i].approve(address, maxUint256)
    }
}




export async function stablePoolFixture(signer: SignerWithAddress, tokens: MockERC20[], fee: BigNumber, flashFee: BigNumber, withdrawFee: BigNumber): Promise<StablePoolFixture> {
    const lib = await new StablePoolLib__factory(signer).deploy()
    const creator = await new StablePoolCreator__factory({ ["contracts/poolStable/StablePoolLib.sol:StablePoolLib"]: lib.address }, signer).deploy()
    const factory = await new StablePoolFactory__factory(signer).deploy()

    await factory.initialize(signer.address, creator.address)
    await factory.setFeeAmount(
        parseUnits('5', 17), // admin fee 50%
    )

    const decs: number[] = []

    for (let i = 0; i < tokens.length; i++) {
        const dec = await tokens[i].decimals()
        decs.push(dec)
    }


    await factory.createPool(
        tokens.map(t => t.address),
        decs,
        "StablePool",
        "SP",
        600, // amp
        fee, // fee
        flashFee, // flash fee
        withdrawFee, // withdraw fee
    )

    // const receipt = await tx.wait();
    // const swapAddress = getAddress(receipt.logs[3].topics[1].slice(26)) ?? null;

    const poolAddress = await factory.allPools(0)

    const pool = StablePool__factory.connect(poolAddress, signer)

    // await approveArray(tokens, pool.address)
    const flashLoanRecipient = await new MockFlashLoanRecipient__factory(signer).deploy(pool.address)
    // await pool.addLiquidity(amounts, 0, signer.address, maxUint256)

    return {
        pool,
        factory,
        creator,
        flashLoanRecipient
    }
}


export interface MockStableMathFixture {
    math: MockStableMath
}

export async function balancerMathFixture(signer: SignerWithAddress): Promise<MockStableMathFixture> {
    const lib = await new MockStableMath__factory(signer).deploy()
    return {
        math: lib
    }
}


export interface WeightedPoolFixture {
    factory: WeightedPoolFactory
    creator: WeightedPoolCreator
    flashLoanRecipient: MockFlashLoanRecipient
    pool: WeightedPool
}

export async function weightedPoolFixture(signer: SignerWithAddress, tokens: MockERC20[], weights: BigNumber[], fee: BigNumber, flashFee: BigNumber, withdrawFee: BigNumber): Promise<WeightedPoolFixture> {
    const lib = await new WeightedPoolLib__factory(signer).deploy()
    const creator = await new WeightedPoolCreator__factory({ ["contracts/poolWeighted/WeightedPoolLib.sol:WeightedPoolLib"]: lib.address }, signer).deploy()
    const factory = await new WeightedPoolFactory__factory(signer).deploy()

    await factory.initialize(signer.address, creator.address)
    await factory.setFeeAmount(
        parseUnits('5', 17), // admin fee 50%
    )

    const decs: number[] = []

    for (let i = 0; i < tokens.length; i++) {
        const dec = await tokens[i].decimals()
        decs.push(dec)
    }


    await factory.createPool(
        tokens.map(t => t.address),
        decs,
        weights,
        "WeightedPool",
        "WP",
        fee, // fee
        flashFee, // flash fee
        withdrawFee
    )

    // const receipt = await tx.wait();
    // const swapAddress = getAddress(receipt.logs[3].topics[1].slice(26)) ?? null;

    const poolAddress = await factory.allPools(0)

    const pool = WeightedPool__factory.connect(poolAddress, signer)

    // await approveArray(tokens, pool.address)
    const flashLoanRecipient = await new MockFlashLoanRecipient__factory(signer).deploy(pool.address)
    // await pool.addLiquidity(amounts, 0, signer.address, maxUint256)

    return {
        pool,
        factory,
        creator,
        flashLoanRecipient
    }
}


export interface BalancedPoolFixture {
    factory: BalancedPoolFactory
    creator: BalancedPoolCreator
    flashLoanRecipient: MockFlashLoanRecipient
    pool: BalancedPool
}

export async function balancedPoolFixture(signer: SignerWithAddress, tokens: MockERC20[], fee: BigNumber, flashFee: BigNumber, withdrawFee: BigNumber): Promise<BalancedPoolFixture> {
    const lib = await new BalancedPoolLib__factory(signer).deploy()
    const creator = await new BalancedPoolCreator__factory({ ["contracts/poolBalanced/BalancedPoolLib.sol:BalancedPoolLib"]: lib.address }, signer).deploy()
    const factory = await new BalancedPoolFactory__factory(signer).deploy()

    await factory.initialize(signer.address, creator.address)
    await factory.setFeeAmount(
        parseUnits('5', 17), // admin fee 50%
    )

    const decs: number[] = []

    for (let i = 0; i < tokens.length; i++) {
        const dec = await tokens[i].decimals()
        decs.push(dec)
    }


    await factory.createPool(
        tokens.map(t => t.address),
        decs,
        "BalancedPool",
        "WP",
        fee, // fee
        flashFee, // flash fee
        withdrawFee
    )

    // const receipt = await tx.wait();
    // const swapAddress = getAddress(receipt.logs[3].topics[1].slice(26)) ?? null;

    const poolAddress = await factory.allPools(0)

    const pool = BalancedPool__factory.connect(poolAddress, signer)

    // await approveArray(tokens, pool.address)
    const flashLoanRecipient = await new MockFlashLoanRecipient__factory(signer).deploy(pool.address)
    // await pool.addLiquidity(amounts, 0, signer.address, maxUint256)

    return {
        pool,
        factory,
        creator,
        flashLoanRecipient
    }
}

export async function getTokenBalances(tokens: MockERC20[], address: string): Promise<BigNumber[]> {
    let bals: BigNumber[] = []
    for (let i = 0; i < tokens.length; i++) {
        const bal = await tokens[i].balanceOf(address)
        bals.push(bal)
    }
    return bals
}

export async function validatePoolBals(signer: SignerWithAddress, pool: StablePool | WeightedPool | BalancedPool) {
    const tokens = await pool.getPooledTokens()
    const poolBals = await pool.getTokenBalances()
    for (let i = 0; i < tokens.length; i++) {
        const tok = MockERC20__factory.connect(tokens[i], signer)
        const bal = await tok.balanceOf(pool.address)
        expect(bal).to.equal(poolBals[i])
    }

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
// 	stableFactory: StablePoolFactory,
// 	swapToken: LpToken,
// 	linkSwapToken: LpToken,
// 	StablePoolRouter: StablePoolRouter,
// 	swap: Swap,
// 	linkSwap: Swap,
// }

// export async function stableFixture (signer: SignerWithAddress): Promise<StableFixture> {
// 	return await deployments.createFixture(async () => {
// 		// Deploy dummy tokens
// 		const firstToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const secondToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const thirdToken = await new TestERC20__factory(signer).deploy(toWei(10000));
// 		const StablePoolRouter = await new StablePoolRouterFactory(signer).deploy();

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
// 		const stableFactory = await new StablePoolFactoryFactory(signer).deploy();
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
// 			StablePoolRouter,
// 			swap,
// 			linkSwap,
// 			linkSwapToken,

// 		}
// 	})()
// }