/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnerPausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnerPausable__factory>;
    getContractFactory(
      name: "FeeDistributor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FeeDistributor__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Permit__factory>;
    getContractFactory(
      name: "IBackwardFlash",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBackwardFlash__factory>;
    getContractFactory(
      name: "IEpochController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEpochController__factory>;
    getContractFactory(
      name: "IFlashLoanRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFlashLoanRecipient__factory>;
    getContractFactory(
      name: "IIsPair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IIsPair__factory>;
    getContractFactory(
      name: "IOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOracle__factory>;
    getContractFactory(
      name: "IPairGovernance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPairGovernance__factory>;
    getContractFactory(
      name: "IRequiemCallee",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemCallee__factory>;
    getContractFactory(
      name: "IRequiemFormula",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemFormula__factory>;
    getContractFactory(
      name: "IRequiemPairERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemPairERC20__factory>;
    getContractFactory(
      name: "IRequiemPoolERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemPoolERC20__factory>;
    getContractFactory(
      name: "IRequiemFormula",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemFormula__factory>;
    getContractFactory(
      name: "IRequiemQPairManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemQPairManager__factory>;
    getContractFactory(
      name: "IRequiemQRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemQRouter__factory>;
    getContractFactory(
      name: "IRequiemRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemRouter__factory>;
    getContractFactory(
      name: "IRequiemRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemRouter__factory>;
    getContractFactory(
      name: "IRequiemStableSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemStableSwap__factory>;
    getContractFactory(
      name: "IRequiemSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemSwap__factory>;
    getContractFactory(
      name: "IRequiemWeightedPair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemWeightedPair__factory>;
    getContractFactory(
      name: "IRequiemWeightedPairFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemWeightedPairFactory__factory>;
    getContractFactory(
      name: "IWeightedPairManagerV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedPairManagerV2__factory>;
    getContractFactory(
      name: "IRewarder",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRewarder__factory>;
    getContractFactory(
      name: "IRewardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRewardToken__factory>;
    getContractFactory(
      name: "ISignaturesValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISignaturesValidator__factory>;
    getContractFactory(
      name: "IStableSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStableSwap__factory>;
    getContractFactory(
      name: "IStableSwapFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStableSwapFactory__factory>;
    getContractFactory(
      name: "ISwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwap__factory>;
    getContractFactory(
      name: "ISwapCreator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapCreator__factory>;
    getContractFactory(
      name: "ISwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISwapRouter__factory>;
    getContractFactory(
      name: "IUniswapV2Callee",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Callee__factory>;
    getContractFactory(
      name: "IUniswapV2Router",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2Router__factory>;
    getContractFactory(
      name: "IWeightedFormula",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedFormula__factory>;
    getContractFactory(
      name: "IWeightedPair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedPair__factory>;
    getContractFactory(
      name: "IWeightedPairERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedPairERC20__factory>;
    getContractFactory(
      name: "IWeightedPairFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedPairFactory__factory>;
    getContractFactory(
      name: "IWeightedPairManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedPairManager__factory>;
    getContractFactory(
      name: "IWeightedSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWeightedSwap__factory>;
    getContractFactory(
      name: "IWETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IWETH__factory>;
    getContractFactory(
      name: "IPoolPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPoolPriceOracle__factory>;
    getContractFactory(
      name: "IPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPriceOracle__factory>;
    getContractFactory(
      name: "IFormulaProvider",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IFormulaProvider__factory>;
    getContractFactory(
      name: "IRequiemWeightedMath",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRequiemWeightedMath__factory>;
    getContractFactory(
      name: "IStakePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePool__factory>;
    getContractFactory(
      name: "IStakePoolController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolController__factory>;
    getContractFactory(
      name: "IStakePoolCreator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolCreator__factory>;
    getContractFactory(
      name: "IStakePoolEpochReward",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolEpochReward__factory>;
    getContractFactory(
      name: "IStakePoolRewardFund",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolRewardFund__factory>;
    getContractFactory(
      name: "IStakePoolRewardMultiplier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolRewardMultiplier__factory>;
    getContractFactory(
      name: "IStakePoolRewardRebaser",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IStakePoolRewardRebaser__factory>;
    getContractFactory(
      name: "AccessControl",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControl__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20Permit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Permit__factory>;
    getContractFactory(
      name: "Authentication",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Authentication__factory>;
    getContractFactory(
      name: "BaseSplitCodeFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BaseSplitCodeFactory__factory>;
    getContractFactory(
      name: "IAuthentication",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAuthentication__factory>;
    getContractFactory(
      name: "RequiemPairErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPairErrors__factory>;
    getContractFactory(
      name: "SignaturesValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignaturesValidator__factory>;
    getContractFactory(
      name: "PoolPriceOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PoolPriceOracle__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "MockERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockERC20__factory>;
    getContractFactory(
      name: "MockFlashLoanRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockFlashLoanRecipient__factory>;
    getContractFactory(
      name: "WETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETH9__factory>;
    getContractFactory(
      name: "WQKC",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WQKC__factory>;
    getContractFactory(
      name: "WROSE",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WROSE__factory>;
    getContractFactory(
      name: "ProtocolFeeRemover",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProtocolFeeRemover__factory>;
    getContractFactory(
      name: "RequiemFormula",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemFormula__factory>;
    getContractFactory(
      name: "RequiemFormulaTest",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemFormulaTest__factory>;
    getContractFactory(
      name: "RequiemPairERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPairERC20__factory>;
    getContractFactory(
      name: "RequiemPoolERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPoolERC20__factory>;
    getContractFactory(
      name: "RequiemQPairManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemQPairManager__factory>;
    getContractFactory(
      name: "RequiemQRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemQRouter__factory>;
    getContractFactory(
      name: "RequiemRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemRouter__factory>;
    getContractFactory(
      name: "RequiemStableSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemStableSwap__factory>;
    getContractFactory(
      name: "RequiemStableSwapLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemStableSwapLib__factory>;
    getContractFactory(
      name: "RequiemWeightedPair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemWeightedPair__factory>;
    getContractFactory(
      name: "RequiemWeightedPairFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemWeightedPairFactory__factory>;
    getContractFactory(
      name: "RequiemZap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemZap__factory>;
    getContractFactory(
      name: "RequiemBackFlash",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemBackFlash__factory>;
    getContractFactory(
      name: "StableSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StableSwap__factory>;
    getContractFactory(
      name: "StableSwapLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StableSwapLib__factory>;
    getContractFactory(
      name: "StakePool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePool__factory>;
    getContractFactory(
      name: "StakePoolController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolController__factory>;
    getContractFactory(
      name: "StakePoolCreator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolCreator__factory>;
    getContractFactory(
      name: "StakePoolEpochReward",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolEpochReward__factory>;
    getContractFactory(
      name: "StakePoolEpochRewardCreator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolEpochRewardCreator__factory>;
    getContractFactory(
      name: "StakePoolRewardFund",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolRewardFund__factory>;
    getContractFactory(
      name: "SwapRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SwapRouter__factory>;
    getContractFactory(
      name: "DeflatingERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DeflatingERC20__factory>;
    getContractFactory(
      name: "EpochControllerMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EpochControllerMock__factory>;
    getContractFactory(
      name: "ERC20Test",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Test__factory>;
    getContractFactory(
      name: "IOriginUniswapV2Factory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOriginUniswapV2Factory__factory>;
    getContractFactory(
      name: "IOriginUniswapV2Pair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOriginUniswapV2Pair__factory>;
    getContractFactory(
      name: "IUniswapV2ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV2ERC20__factory>;
    getContractFactory(
      name: "RequiemMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemMock__factory>;
    getContractFactory(
      name: "RouterEventEmitter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RouterEventEmitter__factory>;
    getContractFactory(
      name: "SimpleEpochController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SimpleEpochController__factory>;
    getContractFactory(
      name: "StakePoolRewardMultiplierMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolRewardMultiplierMock__factory>;
    getContractFactory(
      name: "StakePoolRewardRebaserMock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakePoolRewardRebaserMock__factory>;
    getContractFactory(
      name: "TestERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC20__factory>;
    getContractFactory(
      name: "TestToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestToken__factory>;
    getContractFactory(
      name: "TestWETH",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestWETH__factory>;
    getContractFactory(
      name: "ThiefRouter",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ThiefRouter__factory>;
    getContractFactory(
      name: "TToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TToken__factory>;
    getContractFactory(
      name: "RequiemPairERC20Wrapper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPairERC20Wrapper__factory>;
    getContractFactory(
      name: "WeightedMathTest",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedMathTest__factory>;
    getContractFactory(
      name: "WETH9",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WETH9__factory>;
    getContractFactory(
      name: "TimeLock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TimeLock__factory>;
    getContractFactory(
      name: "LPToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LPToken__factory>;
    getContractFactory(
      name: "WeightedLPToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedLPToken__factory>;
    getContractFactory(
      name: "WeightedFormula",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedFormula__factory>;
    getContractFactory(
      name: "RequiemPair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPair__factory>;
    getContractFactory(
      name: "WeightedPairERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedPairERC20__factory>;
    getContractFactory(
      name: "RequiemPairFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.RequiemPairFactory__factory>;
    getContractFactory(
      name: "WeightedPairGovernance",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedPairGovernance__factory>;
    getContractFactory(
      name: "WeightedPool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedPool__factory>;
    getContractFactory(
      name: "WeightedPoolLib",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.WeightedPoolLib__factory>;
    getContractFactory(
      name: "Zap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Zap__factory>;

    getContractAt(
      name: "OwnerPausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnerPausable>;
    getContractAt(
      name: "FeeDistributor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FeeDistributor>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Permit>;
    getContractAt(
      name: "IBackwardFlash",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBackwardFlash>;
    getContractAt(
      name: "IEpochController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEpochController>;
    getContractAt(
      name: "IFlashLoanRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFlashLoanRecipient>;
    getContractAt(
      name: "IIsPair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IIsPair>;
    getContractAt(
      name: "IOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOracle>;
    getContractAt(
      name: "IPairGovernance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPairGovernance>;
    getContractAt(
      name: "IRequiemCallee",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemCallee>;
    getContractAt(
      name: "IRequiemFormula",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemFormula>;
    getContractAt(
      name: "IRequiemPairERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemPairERC20>;
    getContractAt(
      name: "IRequiemPoolERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemPoolERC20>;
    getContractAt(
      name: "IRequiemFormula",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemFormula>;
    getContractAt(
      name: "IRequiemQPairManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemQPairManager>;
    getContractAt(
      name: "IRequiemQRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemQRouter>;
    getContractAt(
      name: "IRequiemRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemRouter>;
    getContractAt(
      name: "IRequiemRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemRouter>;
    getContractAt(
      name: "IRequiemStableSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemStableSwap>;
    getContractAt(
      name: "IRequiemSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemSwap>;
    getContractAt(
      name: "IRequiemWeightedPair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemWeightedPair>;
    getContractAt(
      name: "IRequiemWeightedPairFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemWeightedPairFactory>;
    getContractAt(
      name: "IWeightedPairManagerV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedPairManagerV2>;
    getContractAt(
      name: "IRewarder",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRewarder>;
    getContractAt(
      name: "IRewardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRewardToken>;
    getContractAt(
      name: "ISignaturesValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISignaturesValidator>;
    getContractAt(
      name: "IStableSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStableSwap>;
    getContractAt(
      name: "IStableSwapFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStableSwapFactory>;
    getContractAt(
      name: "ISwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwap>;
    getContractAt(
      name: "ISwapCreator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapCreator>;
    getContractAt(
      name: "ISwapRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ISwapRouter>;
    getContractAt(
      name: "IUniswapV2Callee",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Callee>;
    getContractAt(
      name: "IUniswapV2Router",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2Router>;
    getContractAt(
      name: "IWeightedFormula",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedFormula>;
    getContractAt(
      name: "IWeightedPair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedPair>;
    getContractAt(
      name: "IWeightedPairERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedPairERC20>;
    getContractAt(
      name: "IWeightedPairFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedPairFactory>;
    getContractAt(
      name: "IWeightedPairManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedPairManager>;
    getContractAt(
      name: "IWeightedSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWeightedSwap>;
    getContractAt(
      name: "IWETH",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IWETH>;
    getContractAt(
      name: "IPoolPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPoolPriceOracle>;
    getContractAt(
      name: "IPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPriceOracle>;
    getContractAt(
      name: "IFormulaProvider",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IFormulaProvider>;
    getContractAt(
      name: "IRequiemWeightedMath",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRequiemWeightedMath>;
    getContractAt(
      name: "IStakePool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePool>;
    getContractAt(
      name: "IStakePoolController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolController>;
    getContractAt(
      name: "IStakePoolCreator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolCreator>;
    getContractAt(
      name: "IStakePoolEpochReward",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolEpochReward>;
    getContractAt(
      name: "IStakePoolRewardFund",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolRewardFund>;
    getContractAt(
      name: "IStakePoolRewardMultiplier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolRewardMultiplier>;
    getContractAt(
      name: "IStakePoolRewardRebaser",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IStakePoolRewardRebaser>;
    getContractAt(
      name: "AccessControl",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControl>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "ERC20Permit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Permit>;
    getContractAt(
      name: "Authentication",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Authentication>;
    getContractAt(
      name: "BaseSplitCodeFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BaseSplitCodeFactory>;
    getContractAt(
      name: "IAuthentication",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAuthentication>;
    getContractAt(
      name: "RequiemPairErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPairErrors>;
    getContractAt(
      name: "SignaturesValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignaturesValidator>;
    getContractAt(
      name: "PoolPriceOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PoolPriceOracle>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "MockERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockERC20>;
    getContractAt(
      name: "MockFlashLoanRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockFlashLoanRecipient>;
    getContractAt(
      name: "WETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETH9>;
    getContractAt(
      name: "WQKC",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WQKC>;
    getContractAt(
      name: "WROSE",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WROSE>;
    getContractAt(
      name: "ProtocolFeeRemover",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProtocolFeeRemover>;
    getContractAt(
      name: "RequiemFormula",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemFormula>;
    getContractAt(
      name: "RequiemFormulaTest",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemFormulaTest>;
    getContractAt(
      name: "RequiemPairERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPairERC20>;
    getContractAt(
      name: "RequiemPoolERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPoolERC20>;
    getContractAt(
      name: "RequiemQPairManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemQPairManager>;
    getContractAt(
      name: "RequiemQRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemQRouter>;
    getContractAt(
      name: "RequiemRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemRouter>;
    getContractAt(
      name: "RequiemStableSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemStableSwap>;
    getContractAt(
      name: "RequiemStableSwapLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemStableSwapLib>;
    getContractAt(
      name: "RequiemWeightedPair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemWeightedPair>;
    getContractAt(
      name: "RequiemWeightedPairFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemWeightedPairFactory>;
    getContractAt(
      name: "RequiemZap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemZap>;
    getContractAt(
      name: "RequiemBackFlash",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemBackFlash>;
    getContractAt(
      name: "StableSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StableSwap>;
    getContractAt(
      name: "StableSwapLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StableSwapLib>;
    getContractAt(
      name: "StakePool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePool>;
    getContractAt(
      name: "StakePoolController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolController>;
    getContractAt(
      name: "StakePoolCreator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolCreator>;
    getContractAt(
      name: "StakePoolEpochReward",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolEpochReward>;
    getContractAt(
      name: "StakePoolEpochRewardCreator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolEpochRewardCreator>;
    getContractAt(
      name: "StakePoolRewardFund",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolRewardFund>;
    getContractAt(
      name: "SwapRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SwapRouter>;
    getContractAt(
      name: "DeflatingERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DeflatingERC20>;
    getContractAt(
      name: "EpochControllerMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EpochControllerMock>;
    getContractAt(
      name: "ERC20Test",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Test>;
    getContractAt(
      name: "IOriginUniswapV2Factory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOriginUniswapV2Factory>;
    getContractAt(
      name: "IOriginUniswapV2Pair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOriginUniswapV2Pair>;
    getContractAt(
      name: "IUniswapV2ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV2ERC20>;
    getContractAt(
      name: "RequiemMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemMock>;
    getContractAt(
      name: "RouterEventEmitter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RouterEventEmitter>;
    getContractAt(
      name: "SimpleEpochController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SimpleEpochController>;
    getContractAt(
      name: "StakePoolRewardMultiplierMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolRewardMultiplierMock>;
    getContractAt(
      name: "StakePoolRewardRebaserMock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StakePoolRewardRebaserMock>;
    getContractAt(
      name: "TestERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC20>;
    getContractAt(
      name: "TestToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestToken>;
    getContractAt(
      name: "TestWETH",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestWETH>;
    getContractAt(
      name: "ThiefRouter",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ThiefRouter>;
    getContractAt(
      name: "TToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TToken>;
    getContractAt(
      name: "RequiemPairERC20Wrapper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPairERC20Wrapper>;
    getContractAt(
      name: "WeightedMathTest",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedMathTest>;
    getContractAt(
      name: "WETH9",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WETH9>;
    getContractAt(
      name: "TimeLock",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TimeLock>;
    getContractAt(
      name: "LPToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.LPToken>;
    getContractAt(
      name: "WeightedLPToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedLPToken>;
    getContractAt(
      name: "WeightedFormula",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedFormula>;
    getContractAt(
      name: "RequiemPair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPair>;
    getContractAt(
      name: "WeightedPairERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedPairERC20>;
    getContractAt(
      name: "RequiemPairFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.RequiemPairFactory>;
    getContractAt(
      name: "WeightedPairGovernance",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedPairGovernance>;
    getContractAt(
      name: "WeightedPool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedPool>;
    getContractAt(
      name: "WeightedPoolLib",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.WeightedPoolLib>;
    getContractAt(
      name: "Zap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Zap>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
