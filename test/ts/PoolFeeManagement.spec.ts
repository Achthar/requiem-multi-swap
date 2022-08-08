import { expect } from "./chai-setup";
import { BigNumber, Contract } from "ethers";
import { expandTo18Decimals, encodePrice, MaxUint256 } from "./shared/common";
import { approveAll, balancedPoolFixture, BalancedPoolFixture, balancerMathFixture, behavesLikeAdministrablePool, bnAbs, distributeTokens, ERC20Fixture, MockStableMathFixture, pairFixture, StablePoolFixture, stablePoolFixture, swapRouterFixture, SwapRouterFixture, thiefRouterFixture, tokenFixture, validatePoolBals, weightedPoolFixture, WeightedPoolFixture } from "./shared/fixtures";
import {
    maxUint256,
    mineBlockTimeStamp,
    toWei
} from "./shared/utilities";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, network } from "hardhat";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { MockFlashSwapRecipient, MockFlashSwapRecipient__factory, RepayFlashSwapRecipient, RepayFlashSwapRecipient__factory } from "../../types";
// import { StableSwapFactory, TestErc20, Swap, LpToken, StableSwapRouter } from "../../types";

const overrides = {};

describe("Pool Fee Management", () => {
    let signers: SignerWithAddress[];
    const zero = BigNumber.from(0)
    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let third: SignerWithAddress;
    let tokens: ERC20Fixture
    let stableFixture: StablePoolFixture
    let weightedFixture: WeightedPoolFixture
    let balancedFixture: BalancedPoolFixture
    let fee: BigNumber = parseUnits('1', 15) // fee
    let flashFee = parseUnits('1', 15) // flash fee
    let withdrawFee = parseUnits('1', 16) // withdraw fee


    const initialAmounts = [parseUnits('143321', 6), parseUnits('173321', 18), parseUnits('123111', 18)]

    let amounts = [parseUnits('231', 6), parseUnits('21', 18), parseUnits('122', 18)]
    let weights = [parseUnits('25', 16), parseUnits('25', 16), parseUnits('50', 16)]

    beforeEach(async () => {
        signers = await ethers.getSigners();
        wallet = signers[0];
        other = signers[1];
        third = signers[2];
        tokens = await tokenFixture(wallet)
        await distributeTokens(tokens, wallet.address, '10000000000000000000')
        await distributeTokens(tokens, other.address, '10000000000000000000')
        stableFixture = await stablePoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);
        weightedFixture = await weightedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], weights, fee, flashFee, withdrawFee);
        balancedFixture = await balancedPoolFixture(wallet, [tokens.token0, tokens.token1, tokens.token2], fee, flashFee, withdrawFee);

        await approveAll(wallet, tokens, stableFixture.pool.address)
        await approveAll(wallet, tokens, weightedFixture.pool.address)
        await approveAll(wallet, tokens, balancedFixture.pool.address)

        await approveAll(other, tokens, stableFixture.pool.address)
        await approveAll(other, tokens, weightedFixture.pool.address)
        await approveAll(other, tokens, balancedFixture.pool.address)

        await stableFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
        await weightedFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
        await balancedFixture.pool.connect(wallet).addLiquidityExactIn(initialAmounts, 1, wallet.address, maxUint256);
    });

    it("behaves like stable fee management", async () => {
        await behavesLikeAdministrablePool(stableFixture.pool, wallet, other)
    });


    it("behaves like weighted fee management", async () => {
        await behavesLikeAdministrablePool(weightedFixture.pool, wallet, other)
    });


    it("behaves like balanced fee management", async () => {
        await behavesLikeAdministrablePool(balancedFixture.pool, wallet, other)
    });



});
