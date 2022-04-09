/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IWeightedSwapInterface extends ethers.utils.Interface {
  functions: {
    "addLiquidity(uint256[],uint256,uint256)": FunctionFragment;
    "calculateRemoveLiquidityExactIn(uint256)": FunctionFragment;
    "calculateRemoveLiquidityOneToken(uint256,uint256)": FunctionFragment;
    "calculateTokenAmount(uint256[],bool)": FunctionFragment;
    "flashLoan(address,uint256[],bytes)": FunctionFragment;
    "getTokenBalances()": FunctionFragment;
    "removeLiquidityExactIn(uint256,uint256[],uint256)": FunctionFragment;
    "removeLiquidityExactOut(uint256[],uint256,uint256)": FunctionFragment;
    "removeLiquidityOneToken(uint256,uint8,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addLiquidity",
    values: [BigNumberish[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveLiquidityExactIn",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateRemoveLiquidityOneToken",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateTokenAmount",
    values: [BigNumberish[], boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "flashLoan",
    values: [string, BigNumberish[], BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenBalances",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityExactIn",
    values: [BigNumberish, BigNumberish[], BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityExactOut",
    values: [BigNumberish[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "removeLiquidityOneToken",
    values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateRemoveLiquidityExactIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateRemoveLiquidityOneToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateTokenAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "flashLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenBalances",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityExactIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityExactOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeLiquidityOneToken",
    data: BytesLike
  ): Result;

  events: {
    "AddLiquidity(address,uint256[],uint256,uint256)": EventFragment;
    "FeeControllerChanged(address)": EventFragment;
    "FeeDistributorChanged(address)": EventFragment;
    "FlashLoan(address,uint256[],uint256[])": EventFragment;
    "NewFee(uint256,uint256,uint256,uint256)": EventFragment;
    "RemoveLiquidity(address,uint256[],uint256)": EventFragment;
    "RemoveLiquidityImbalance(address,uint256[],uint256,uint256)": EventFragment;
    "RemoveLiquidityOne(address,uint256,uint256,uint256)": EventFragment;
    "TokenExchange(address,address,uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeControllerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FeeDistributorChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FlashLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityImbalance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityOne"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenExchange"): EventFragment;
}

export type AddLiquidityEvent = TypedEvent<
  [string, BigNumber[], BigNumber, BigNumber] & {
    provider: string;
    tokenAmounts: BigNumber[];
    invariant: BigNumber;
    tokenSupply: BigNumber;
  }
>;

export type FeeControllerChangedEvent = TypedEvent<
  [string] & { newController: string }
>;

export type FeeDistributorChangedEvent = TypedEvent<
  [string] & { newController: string }
>;

export type FlashLoanEvent = TypedEvent<
  [string, BigNumber[], BigNumber[]] & {
    recipient: string;
    amounts: BigNumber[];
    feeAmounts: BigNumber[];
  }
>;

export type NewFeeEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber] & {
    fee: BigNumber;
    flashFee: BigNumber;
    adminFee: BigNumber;
    withdrawFee: BigNumber;
  }
>;

export type RemoveLiquidityEvent = TypedEvent<
  [string, BigNumber[], BigNumber] & {
    provider: string;
    tokenAmounts: BigNumber[];
    tokenSupply: BigNumber;
  }
>;

export type RemoveLiquidityImbalanceEvent = TypedEvent<
  [string, BigNumber[], BigNumber, BigNumber] & {
    provider: string;
    tokenAmounts: BigNumber[];
    invariant: BigNumber;
    tokenSupply: BigNumber;
  }
>;

export type RemoveLiquidityOneEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber] & {
    provider: string;
    tokenIndex: BigNumber;
    tokenAmount: BigNumber;
    coinAmount: BigNumber;
  }
>;

export type TokenExchangeEvent = TypedEvent<
  [string, string, BigNumber, string, BigNumber] & {
    buyer: string;
    soldId: string;
    tokensSold: BigNumber;
    boughtId: string;
    tokensBought: BigNumber;
  }
>;

export class IWeightedSwap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IWeightedSwapInterface;

  functions: {
    addLiquidity(
      amounts: BigNumberish[],
      minToMint: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calculateRemoveLiquidityExactIn(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    calculateRemoveLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    calculateTokenAmount(
      amounts: BigNumberish[],
      deposit: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    flashLoan(
      recipient: string,
      amounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getTokenBalances(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    removeLiquidityExactIn(
      lpAmount: BigNumberish,
      minAmounts: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityExactOut(
      amounts: BigNumberish[],
      maxLpBurn: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    removeLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      minAmount: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addLiquidity(
    amounts: BigNumberish[],
    minToMint: BigNumberish,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calculateRemoveLiquidityExactIn(
    amount: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  calculateRemoveLiquidityOneToken(
    tokenAmount: BigNumberish,
    tokenIndex: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber]>;

  calculateTokenAmount(
    amounts: BigNumberish[],
    deposit: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  flashLoan(
    recipient: string,
    amounts: BigNumberish[],
    userData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getTokenBalances(overrides?: CallOverrides): Promise<BigNumber[]>;

  removeLiquidityExactIn(
    lpAmount: BigNumberish,
    minAmounts: BigNumberish[],
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityExactOut(
    amounts: BigNumberish[],
    maxLpBurn: BigNumberish,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  removeLiquidityOneToken(
    tokenAmount: BigNumberish,
    tokenIndex: BigNumberish,
    minAmount: BigNumberish,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addLiquidity(
      amounts: BigNumberish[],
      minToMint: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateRemoveLiquidityExactIn(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    calculateRemoveLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber]>;

    calculateTokenAmount(
      amounts: BigNumberish[],
      deposit: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    flashLoan(
      recipient: string,
      amounts: BigNumberish[],
      userData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    getTokenBalances(overrides?: CallOverrides): Promise<BigNumber[]>;

    removeLiquidityExactIn(
      lpAmount: BigNumberish,
      minAmounts: BigNumberish[],
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    removeLiquidityExactOut(
      amounts: BigNumberish[],
      maxLpBurn: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      minAmount: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "AddLiquidity(address,uint256[],uint256,uint256)"(
      provider?: string | null,
      tokenAmounts?: null,
      invariant?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        tokenAmounts: BigNumber[];
        invariant: BigNumber;
        tokenSupply: BigNumber;
      }
    >;

    AddLiquidity(
      provider?: string | null,
      tokenAmounts?: null,
      invariant?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        tokenAmounts: BigNumber[];
        invariant: BigNumber;
        tokenSupply: BigNumber;
      }
    >;

    "FeeControllerChanged(address)"(
      newController?: null
    ): TypedEventFilter<[string], { newController: string }>;

    FeeControllerChanged(
      newController?: null
    ): TypedEventFilter<[string], { newController: string }>;

    "FeeDistributorChanged(address)"(
      newController?: null
    ): TypedEventFilter<[string], { newController: string }>;

    FeeDistributorChanged(
      newController?: null
    ): TypedEventFilter<[string], { newController: string }>;

    "FlashLoan(address,uint256[],uint256[])"(
      recipient?: null,
      amounts?: null,
      feeAmounts?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[]],
      { recipient: string; amounts: BigNumber[]; feeAmounts: BigNumber[] }
    >;

    FlashLoan(
      recipient?: null,
      amounts?: null,
      feeAmounts?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[]],
      { recipient: string; amounts: BigNumber[]; feeAmounts: BigNumber[] }
    >;

    "NewFee(uint256,uint256,uint256,uint256)"(
      fee?: null,
      flashFee?: null,
      adminFee?: null,
      withdrawFee?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        fee: BigNumber;
        flashFee: BigNumber;
        adminFee: BigNumber;
        withdrawFee: BigNumber;
      }
    >;

    NewFee(
      fee?: null,
      flashFee?: null,
      adminFee?: null,
      withdrawFee?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        fee: BigNumber;
        flashFee: BigNumber;
        adminFee: BigNumber;
        withdrawFee: BigNumber;
      }
    >;

    "RemoveLiquidity(address,uint256[],uint256)"(
      provider?: string | null,
      tokenAmounts?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber],
      { provider: string; tokenAmounts: BigNumber[]; tokenSupply: BigNumber }
    >;

    RemoveLiquidity(
      provider?: string | null,
      tokenAmounts?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber],
      { provider: string; tokenAmounts: BigNumber[]; tokenSupply: BigNumber }
    >;

    "RemoveLiquidityImbalance(address,uint256[],uint256,uint256)"(
      provider?: string | null,
      tokenAmounts?: null,
      invariant?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        tokenAmounts: BigNumber[];
        invariant: BigNumber;
        tokenSupply: BigNumber;
      }
    >;

    RemoveLiquidityImbalance(
      provider?: string | null,
      tokenAmounts?: null,
      invariant?: null,
      tokenSupply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        tokenAmounts: BigNumber[];
        invariant: BigNumber;
        tokenSupply: BigNumber;
      }
    >;

    "RemoveLiquidityOne(address,uint256,uint256,uint256)"(
      provider?: string | null,
      tokenIndex?: null,
      tokenAmount?: null,
      coinAmount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        provider: string;
        tokenIndex: BigNumber;
        tokenAmount: BigNumber;
        coinAmount: BigNumber;
      }
    >;

    RemoveLiquidityOne(
      provider?: string | null,
      tokenIndex?: null,
      tokenAmount?: null,
      coinAmount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        provider: string;
        tokenIndex: BigNumber;
        tokenAmount: BigNumber;
        coinAmount: BigNumber;
      }
    >;

    "TokenExchange(address,address,uint256,address,uint256)"(
      buyer?: string | null,
      soldId?: null,
      tokensSold?: null,
      boughtId?: null,
      tokensBought?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, BigNumber],
      {
        buyer: string;
        soldId: string;
        tokensSold: BigNumber;
        boughtId: string;
        tokensBought: BigNumber;
      }
    >;

    TokenExchange(
      buyer?: string | null,
      soldId?: null,
      tokensSold?: null,
      boughtId?: null,
      tokensBought?: null
    ): TypedEventFilter<
      [string, string, BigNumber, string, BigNumber],
      {
        buyer: string;
        soldId: string;
        tokensSold: BigNumber;
        boughtId: string;
        tokensBought: BigNumber;
      }
    >;
  };

  estimateGas: {
    addLiquidity(
      amounts: BigNumberish[],
      minToMint: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calculateRemoveLiquidityExactIn(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateRemoveLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateTokenAmount(
      amounts: BigNumberish[],
      deposit: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    flashLoan(
      recipient: string,
      amounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getTokenBalances(overrides?: CallOverrides): Promise<BigNumber>;

    removeLiquidityExactIn(
      lpAmount: BigNumberish,
      minAmounts: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityExactOut(
      amounts: BigNumberish[],
      maxLpBurn: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    removeLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      minAmount: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addLiquidity(
      amounts: BigNumberish[],
      minToMint: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calculateRemoveLiquidityExactIn(
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateRemoveLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateTokenAmount(
      amounts: BigNumberish[],
      deposit: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    flashLoan(
      recipient: string,
      amounts: BigNumberish[],
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getTokenBalances(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    removeLiquidityExactIn(
      lpAmount: BigNumberish,
      minAmounts: BigNumberish[],
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityExactOut(
      amounts: BigNumberish[],
      maxLpBurn: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    removeLiquidityOneToken(
      tokenAmount: BigNumberish,
      tokenIndex: BigNumberish,
      minAmount: BigNumberish,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
