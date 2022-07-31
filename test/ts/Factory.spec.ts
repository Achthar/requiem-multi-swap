import { expect } from "./chai-setup";
import { BigNumber, Contract } from 'ethers'
import { ethers } from "hardhat";


import { getCreate2Address } from './shared/common'
import { factoryFixture } from './shared/fixtures'
import { ADDRESS_ZERO, toWei } from "./shared/utilities";
import { TestERC20, TestERC20__factory, RequiemPair__factory, RequiemPairFactory } from "../../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

let TEST_ADDRESSES: [string, string];

describe('Pair Factory', () => {
    let signers: SignerWithAddress[];
    let wallet: SignerWithAddress;
    let other: SignerWithAddress;
    let uniswapPairBytecode: string;
    let factory: RequiemPairFactory
    let token0: TestERC20;
    let token1: TestERC20;

    beforeEach(async () => {
        signers = await ethers.getSigners();
        wallet = signers[0];
        other = signers[1];
        const fixture = await factoryFixture(wallet)
        factory = fixture.factory;
        uniswapPairBytecode = new RequiemPair__factory(wallet).bytecode;

        token0 = await new TestERC20__factory(wallet).deploy(toWei(10000));
        token1 = await new TestERC20__factory(wallet).deploy(toWei(10000));
        let token0Lt = BigNumber.from(token0.address).lt(BigNumber.from(token1.address));

        TEST_ADDRESSES = [token0Lt ? token0.address : token1.address, token0Lt ? token1.address : token0.address];
    })

    it('feeTo, feeToSetter, allPairsLength', async () => {
        expect(await factory.feeTo()).to.eq(ADDRESS_ZERO)
        expect(await factory.feeToSetter()).to.eq(wallet.address)
        expect(await factory.allPairsLength()).to.eq(0)
    })

    async function createPair(tokens: [string, string], tokenWeightA: number,
        swapFee: number) {
        const allPairsLength = Number(await factory.allPairsLength());
        const create2Address = getCreate2Address(factory.address, tokens, tokenWeightA, uniswapPairBytecode)
        expect(await factory.isPair(create2Address)).to.eq(false)
        await expect(factory.createPair(...tokens, tokenWeightA, swapFee, 10000))
            .to.emit(factory, 'PairCreated')
            .withArgs(TEST_ADDRESSES[0], TEST_ADDRESSES[1], create2Address, tokenWeightA, BigNumber.from(allPairsLength + 1))

        await expect(factory.createPair(tokens[0], tokens[1], tokenWeightA, swapFee, 10000)).to.be.reverted // REQLP: PE
        expect(await factory.getPair(...tokens, tokenWeightA)).to.eq(create2Address)
        expect(await factory.getPair(tokens[1], tokens[0], 100 - tokenWeightA)).to.eq(create2Address)

        expect(await factory.getPair(...tokens, tokenWeightA)).to.eq(create2Address)
        expect(await factory.getPair(tokens[1], tokens[0], 100 - tokenWeightA)).to.eq(create2Address)
        const pairs = await factory.getPairs(tokens[1], tokens[0])
        expect(pairs[pairs.length - 1]).to.eq(create2Address)
        expect(await factory.isPair(create2Address)).to.eq(true)
        expect(await factory.allPairsLength()).to.eq(allPairsLength + 1)

        const pair = RequiemPair__factory.connect(create2Address, wallet)
        expect(await pair.factory()).to.eq(factory.address)
        expect(await pair.token0()).to.eq(TEST_ADDRESSES[0])
        expect(await pair.token1()).to.eq(TEST_ADDRESSES[1])
        const tokenWeights = await pair.getParameters();
        expect(tokenWeights._tokenWeight0).to.eq(tokenWeightA)
        expect(tokenWeights._tokenWeight1).to.eq(100 - tokenWeightA)
        expect(tokenWeights._swapFee).to.eq(swapFee)
    }

    it('createPair', async () => {
        await createPair(TEST_ADDRESSES, 50, 30)
        await expect(factory.createPair(...TEST_ADDRESSES, 50, 30, 10000)).to.be.revertedWith('RLP: PE')
        await createPair(TEST_ADDRESSES, 30, 40)
        await createPair(TEST_ADDRESSES, 80, 500)
        // await createPair(TEST_ADDRESSES, 10, 5)
    })

    it('createInvalidPair', async () => {
        await expect(createPair([
            '0x1000000000000000000000000000000000000000',
            '0x0000000000000000000000000000000000000000'
        ], 50, 30)).to.be.revertedWith('RLP: ZA')
        await expect(createPair(TEST_ADDRESSES, 0, 30)).to.be.revertedWith('RLP: IW')
        await expect(createPair(TEST_ADDRESSES, 100, 30)).to.be.revertedWith('RLP: IW')
        await expect(createPair(TEST_ADDRESSES, 99, 30)).to.be.revertedWith('RLP: IW')
        await expect(createPair(TEST_ADDRESSES, 51, 30)).to.be.revertedWith('RLP: IW')

        await expect(createPair(TEST_ADDRESSES, 40, 20000)).to.be.revertedWith('RLP: ISP')
        await expect(createPair(TEST_ADDRESSES, 40, 200004)).to.be.revertedWith('RLP: ISP')

    })

    it('createPair:reverse', async () => {
        await createPair(TEST_ADDRESSES.slice().reverse() as [string, string], 50, 30)
    })

    it('createPair:gas', async () => {
        const tx = await factory.createPair(...TEST_ADDRESSES, 50, 30, 10000)
        const receipt = await tx.wait()
        // expect(receipt.gasUsed).to.eq(3974350)
        expect(receipt.gasUsed).to.eq(4188471) // with mp creation is more expensive
    })

    it('setFeeTo', async () => {
        const protocolFee = await factory.protocolFee()
        const feeToSetter = await factory.feeToSetter()
        await expect(factory.connect(other).setFeeParameters(feeToSetter, other.address, protocolFee)).to.be.revertedWith('RLP: F')
        await factory.setFeeParameters(feeToSetter, wallet.address, protocolFee)
        expect(await factory.feeTo()).to.eq(wallet.address)
    })
    it('setProtocolFee', async () => {
        const feeTo = await factory.feeTo()
        const feeToSetter = await factory.feeToSetter()
        await expect(factory.connect(other).setFeeParameters(feeToSetter, feeTo, 1)).to.be.revertedWith('RLP: F')
        await expect(factory.connect(other).setFeeParameters(feeToSetter, feeTo, 1999)).to.be.revertedWith('RLP: F')
        await expect(factory.connect(other).setFeeParameters(feeToSetter, feeTo, 100001)).to.be.revertedWith('RLP: F')
        await factory.setFeeParameters(feeToSetter, feeTo, 10000)
        expect(await factory.protocolFee()).to.eq(10000)
        await factory.setFeeParameters(feeToSetter, feeTo, 20000)
        expect(await factory.protocolFee()).to.eq(20000)
        await factory.setFeeParameters(feeToSetter, feeTo, 100000)
        expect(await factory.protocolFee()).to.eq(100000)
        await factory.setFeeParameters(feeToSetter, feeTo, 0)
        expect(await factory.protocolFee()).to.eq(0)
        await factory.setFeeParameters(feeToSetter, feeTo, 50000)
        expect(await factory.protocolFee()).to.eq(50000)
    })

    it('setFeeToSetter', async () => {

        const feeTo = await factory.feeTo()
        const protocolFee = await factory.protocolFee()
        await expect(factory.connect(other).setFeeParameters(other.address, feeTo, protocolFee)).to.be.revertedWith('RLP: F')
        await factory.setFeeParameters(other.address, feeTo, protocolFee)
        expect(await factory.feeToSetter()).to.eq(other.address)
        await expect(factory.setFeeParameters(wallet.address, feeTo, protocolFee)).to.be.revertedWith('RLP: F')
    })
})
