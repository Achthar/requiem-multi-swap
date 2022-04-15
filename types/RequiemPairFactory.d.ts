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

interface RequiemPairFactoryInterface extends ethers.utils.Interface {
  functions: {
    "INIT_CODE_HASH()": FunctionFragment;
    "allPairsLength()": FunctionFragment;
    "createPair(address,address,uint32,uint32,uint32)": FunctionFragment;
    "feeTo()": FunctionFragment;
    "feeToSetter()": FunctionFragment;
    "formula()": FunctionFragment;
    "getPair(address,address,uint32)": FunctionFragment;
    "getPairs(address,address)": FunctionFragment;
    "getParameters(address)": FunctionFragment;
    "isPair(address)": FunctionFragment;
    "pairGovernance()": FunctionFragment;
    "protocolFee()": FunctionFragment;
    "setFeeParameters(address,address,uint256)": FunctionFragment;
    "setGovernance(address)": FunctionFragment;
    "setSwapParams(address,uint32,uint32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "INIT_CODE_HASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [string, string, BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeToSetter",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "formula", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPair",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPairs",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getParameters",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "isPair", values: [string]): string;
  encodeFunctionData(
    functionFragment: "pairGovernance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "protocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setFeeParameters",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setGovernance",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setSwapParams",
    values: [string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "INIT_CODE_HASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "formula", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPairs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isPair", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pairGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "protocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setFeeParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setSwapParams",
    data: BytesLike
  ): Result;

  events: {
    "PairCreated(address,address,address,uint32,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}

export type PairCreatedEvent = TypedEvent<
  [string, string, string, number, BigNumber] & {
    token0: string;
    token1: string;
    pair: string;
    tokenWeight0: number;
    arg4: BigNumber;
  }
>;

export class RequiemPairFactory extends BaseContract {
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

  interface: RequiemPairFactoryInterface;

  functions: {
    INIT_CODE_HASH(overrides?: CallOverrides): Promise<[string]>;

    allPairsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      initialFee: BigNumberish,
      initialAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    feeTo(overrides?: CallOverrides): Promise<[string]>;

    feeToSetter(overrides?: CallOverrides): Promise<[string]>;

    formula(overrides?: CallOverrides): Promise<[string]>;

    getPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { pair: string }>;

    getPairs(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<[string[]] & { _tokenPairs: string[] }>;

    getParameters(
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    isPair(b: string, overrides?: CallOverrides): Promise<[boolean]>;

    pairGovernance(overrides?: CallOverrides): Promise<[string]>;

    protocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    setFeeParameters(
      _feeToSetter: string,
      _feeTo: string,
      _protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setGovernance(
      _newGov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSwapParams(
      _pair: string,
      _newSwapFee: BigNumberish,
      _amp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

  allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

  createPair(
    tokenA: string,
    tokenB: string,
    tokenWeightA: BigNumberish,
    initialFee: BigNumberish,
    initialAmp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  feeTo(overrides?: CallOverrides): Promise<string>;

  feeToSetter(overrides?: CallOverrides): Promise<string>;

  formula(overrides?: CallOverrides): Promise<string>;

  getPair(
    tokenA: string,
    tokenB: string,
    tokenWeightA: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getPairs(
    token0: string,
    token1: string,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getParameters(
    pair: string,
    overrides?: CallOverrides
  ): Promise<
    [number, number, number, number] & {
      tokenWeight0: number;
      tokenWeight1: number;
      swapFee: number;
      amp: number;
    }
  >;

  isPair(b: string, overrides?: CallOverrides): Promise<boolean>;

  pairGovernance(overrides?: CallOverrides): Promise<string>;

  protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  setFeeParameters(
    _feeToSetter: string,
    _feeTo: string,
    _protocolFee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setGovernance(
    _newGov: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSwapParams(
    _pair: string,
    _newSwapFee: BigNumberish,
    _amp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    INIT_CODE_HASH(overrides?: CallOverrides): Promise<string>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      initialFee: BigNumberish,
      initialAmp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    feeTo(overrides?: CallOverrides): Promise<string>;

    feeToSetter(overrides?: CallOverrides): Promise<string>;

    formula(overrides?: CallOverrides): Promise<string>;

    getPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getPairs(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getParameters(
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    isPair(b: string, overrides?: CallOverrides): Promise<boolean>;

    pairGovernance(overrides?: CallOverrides): Promise<string>;

    protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    setFeeParameters(
      _feeToSetter: string,
      _feeTo: string,
      _protocolFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setGovernance(_newGov: string, overrides?: CallOverrides): Promise<void>;

    setSwapParams(
      _pair: string,
      _newSwapFee: BigNumberish,
      _amp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "PairCreated(address,address,address,uint32,uint256)"(
      token0?: string | null,
      token1?: string | null,
      pair?: null,
      tokenWeight0?: null,
      undefined?: null
    ): TypedEventFilter<
      [string, string, string, number, BigNumber],
      {
        token0: string;
        token1: string;
        pair: string;
        tokenWeight0: number;
        arg4: BigNumber;
      }
    >;

    PairCreated(
      token0?: string | null,
      token1?: string | null,
      pair?: null,
      tokenWeight0?: null,
      undefined?: null
    ): TypedEventFilter<
      [string, string, string, number, BigNumber],
      {
        token0: string;
        token1: string;
        pair: string;
        tokenWeight0: number;
        arg4: BigNumber;
      }
    >;
  };

  estimateGas: {
    INIT_CODE_HASH(overrides?: CallOverrides): Promise<BigNumber>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      initialFee: BigNumberish,
      initialAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    feeTo(overrides?: CallOverrides): Promise<BigNumber>;

    feeToSetter(overrides?: CallOverrides): Promise<BigNumber>;

    formula(overrides?: CallOverrides): Promise<BigNumber>;

    getPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairs(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getParameters(pair: string, overrides?: CallOverrides): Promise<BigNumber>;

    isPair(b: string, overrides?: CallOverrides): Promise<BigNumber>;

    pairGovernance(overrides?: CallOverrides): Promise<BigNumber>;

    protocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    setFeeParameters(
      _feeToSetter: string,
      _feeTo: string,
      _protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setGovernance(
      _newGov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSwapParams(
      _pair: string,
      _newSwapFee: BigNumberish,
      _amp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    INIT_CODE_HASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allPairsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    createPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      initialFee: BigNumberish,
      initialAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeToSetter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    formula(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPair(
      tokenA: string,
      tokenB: string,
      tokenWeightA: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPairs(
      token0: string,
      token1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getParameters(
      pair: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isPair(b: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pairGovernance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    protocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setFeeParameters(
      _feeToSetter: string,
      _feeTo: string,
      _protocolFee: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setGovernance(
      _newGov: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSwapParams(
      _pair: string,
      _newSwapFee: BigNumberish,
      _amp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
