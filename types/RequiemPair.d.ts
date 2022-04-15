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

interface RequiemPairInterface extends ethers.utils.Interface {
  functions: {
    "DOMAIN_SEPARATOR()": FunctionFragment;
    "MINIMUM_LIQUIDITY()": FunctionFragment;
    "PERMIT_TYPEHASH()": FunctionFragment;
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burn(address)": FunctionFragment;
    "calculateSwapGivenIn(address,address,uint256)": FunctionFragment;
    "calculateSwapGivenOut(address,address,uint256)": FunctionFragment;
    "decimals()": FunctionFragment;
    "factory()": FunctionFragment;
    "formula()": FunctionFragment;
    "getCollectedFees()": FunctionFragment;
    "getParameters()": FunctionFragment;
    "getReserves()": FunctionFragment;
    "initialize(address,address,uint32)": FunctionFragment;
    "mint(address)": FunctionFragment;
    "name()": FunctionFragment;
    "nonces(address)": FunctionFragment;
    "onSwapGivenIn(address,address,uint256,address)": FunctionFragment;
    "onSwapGivenOut(address,address,uint256,address)": FunctionFragment;
    "pairFlashLoan(address,uint256,uint256,bytes)": FunctionFragment;
    "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)": FunctionFragment;
    "setSwapParams(uint32,uint32)": FunctionFragment;
    "symbol()": FunctionFragment;
    "sync()": FunctionFragment;
    "token0()": FunctionFragment;
    "token1()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "DOMAIN_SEPARATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MINIMUM_LIQUIDITY",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PERMIT_TYPEHASH",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "allowance",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "burn", values: [string]): string;
  encodeFunctionData(
    functionFragment: "calculateSwapGivenIn",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateSwapGivenOut",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(functionFragment: "formula", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCollectedFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getParameters",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getReserves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [string]): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonces", values: [string]): string;
  encodeFunctionData(
    functionFragment: "onSwapGivenIn",
    values: [string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapGivenOut",
    values: [string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "pairFlashLoan",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "permit",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setSwapParams",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(functionFragment: "sync", values?: undefined): string;
  encodeFunctionData(functionFragment: "token0", values?: undefined): string;
  encodeFunctionData(functionFragment: "token1", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DOMAIN_SEPARATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MINIMUM_LIQUIDITY",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PERMIT_TYPEHASH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateSwapGivenIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "calculateSwapGivenOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "formula", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCollectedFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonces", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onSwapGivenIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapGivenOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "pairFlashLoan",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "permit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setSwapParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sync", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token0", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token1", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "Burn(address,uint256,uint256,address)": EventFragment;
    "FlashLoan(address,uint256,uint256,uint256,uint256)": EventFragment;
    "Mint(address,uint256,uint256)": EventFragment;
    "PaidProtocolFee(uint112,uint112)": EventFragment;
    "Swap(address,uint256,uint256,uint256,uint256,address)": EventFragment;
    "Sync(uint112,uint112,uint112,uint112)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Burn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FlashLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Mint"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PaidProtocolFee"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Sync"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    spender: string;
    value: BigNumber;
  }
>;

export type BurnEvent = TypedEvent<
  [string, BigNumber, BigNumber, string] & {
    sender: string;
    amount0: BigNumber;
    amount1: BigNumber;
    to: string;
  }
>;

export type FlashLoanEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber] & {
    recipient: string;
    amount0: BigNumber;
    amount1: BigNumber;
    fee0: BigNumber;
    fee1: BigNumber;
  }
>;

export type MintEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    sender: string;
    amount0: BigNumber;
    amount1: BigNumber;
  }
>;

export type PaidProtocolFeeEvent = TypedEvent<
  [BigNumber, BigNumber] & {
    collectedFee0: BigNumber;
    collectedFee1: BigNumber;
  }
>;

export type SwapEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, string] & {
    sender: string;
    amount0In: BigNumber;
    amount1In: BigNumber;
    amount0Out: BigNumber;
    amount1Out: BigNumber;
    to: string;
  }
>;

export type SyncEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber] & {
    reserve0: BigNumber;
    reserve1: BigNumber;
    vReserve0: BigNumber;
    vReserve1: BigNumber;
  }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; value: BigNumber }
>;

export class RequiemPair extends BaseContract {
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

  interface: RequiemPairInterface;

  functions: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<[string]>;

    MINIMUM_LIQUIDITY(overrides?: CallOverrides): Promise<[BigNumber]>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    calculateSwapGivenIn(
      tokenIn: string,
      arg1: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    formula(overrides?: CallOverrides): Promise<[string]>;

    getCollectedFees(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        _collectedFee0: BigNumber;
        _collectedFee1: BigNumber;
      }
    >;

    getParameters(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        _tokenWeight0: number;
        _tokenWeight1: number;
        _swapFee: number;
        _amp: number;
      }
    >;

    getReserves(
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, BigNumber] & {
          reserve0: BigNumber;
          reserve1: BigNumber;
          vReserve0: BigNumber;
          vReserve1: BigNumber;
        }
      ] & {
        reserveData: [BigNumber, BigNumber, BigNumber, BigNumber] & {
          reserve0: BigNumber;
          reserve1: BigNumber;
          vReserve0: BigNumber;
          vReserve1: BigNumber;
        };
      }
    >;

    initialize(
      _token0: string,
      _token1: string,
      _tokenWeight0: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    onSwapGivenIn(
      tokenIn: string,
      arg1: string,
      arg2: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pairFlashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setSwapParams(
      _newSwapFee: BigNumberish,
      _newAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    token0(overrides?: CallOverrides): Promise<[string]>;

    token1(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

  MINIMUM_LIQUIDITY(overrides?: CallOverrides): Promise<BigNumber>;

  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

  allowance(
    arg0: string,
    arg1: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  calculateSwapGivenIn(
    tokenIn: string,
    arg1: string,
    amountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateSwapGivenOut(
    tokenIn: string,
    arg1: string,
    amountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  decimals(overrides?: CallOverrides): Promise<number>;

  factory(overrides?: CallOverrides): Promise<string>;

  formula(overrides?: CallOverrides): Promise<string>;

  getCollectedFees(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      _collectedFee0: BigNumber;
      _collectedFee1: BigNumber;
    }
  >;

  getParameters(
    overrides?: CallOverrides
  ): Promise<
    [number, number, number, number] & {
      _tokenWeight0: number;
      _tokenWeight1: number;
      _swapFee: number;
      _amp: number;
    }
  >;

  getReserves(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      reserve0: BigNumber;
      reserve1: BigNumber;
      vReserve0: BigNumber;
      vReserve1: BigNumber;
    }
  >;

  initialize(
    _token0: string,
    _token1: string,
    _tokenWeight0: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mint(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  onSwapGivenIn(
    tokenIn: string,
    arg1: string,
    arg2: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapGivenOut(
    tokenIn: string,
    arg1: string,
    amountOut: BigNumberish,
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pairFlashLoan(
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setSwapParams(
    _newSwapFee: BigNumberish,
    _newAmp: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  sync(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  token0(overrides?: CallOverrides): Promise<string>;

  token1(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: string,
    to: string,
    value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<string>;

    MINIMUM_LIQUIDITY(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    calculateSwapGivenIn(
      tokenIn: string,
      arg1: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<number>;

    factory(overrides?: CallOverrides): Promise<string>;

    formula(overrides?: CallOverrides): Promise<string>;

    getCollectedFees(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        _collectedFee0: BigNumber;
        _collectedFee1: BigNumber;
      }
    >;

    getParameters(
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        _tokenWeight0: number;
        _tokenWeight1: number;
        _swapFee: number;
        _amp: number;
      }
    >;

    getReserves(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        reserve0: BigNumber;
        reserve1: BigNumber;
        vReserve0: BigNumber;
        vReserve1: BigNumber;
      }
    >;

    initialize(
      _token0: string,
      _token1: string,
      _tokenWeight0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mint(to: string, overrides?: CallOverrides): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<string>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    onSwapGivenIn(
      tokenIn: string,
      arg1: string,
      arg2: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    pairFlashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setSwapParams(
      _newSwapFee: BigNumberish,
      _newAmp: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    sync(overrides?: CallOverrides): Promise<void>;

    token0(overrides?: CallOverrides): Promise<string>;

    token1(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    Approval(
      owner?: string | null,
      spender?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; spender: string; value: BigNumber }
    >;

    "Burn(address,uint256,uint256,address)"(
      sender?: string | null,
      amount0?: null,
      amount1?: null,
      to?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, string],
      { sender: string; amount0: BigNumber; amount1: BigNumber; to: string }
    >;

    Burn(
      sender?: string | null,
      amount0?: null,
      amount1?: null,
      to?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, string],
      { sender: string; amount0: BigNumber; amount1: BigNumber; to: string }
    >;

    "FlashLoan(address,uint256,uint256,uint256,uint256)"(
      recipient?: string | null,
      amount0?: null,
      amount1?: null,
      fee0?: null,
      fee1?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        recipient: string;
        amount0: BigNumber;
        amount1: BigNumber;
        fee0: BigNumber;
        fee1: BigNumber;
      }
    >;

    FlashLoan(
      recipient?: string | null,
      amount0?: null,
      amount1?: null,
      fee0?: null,
      fee1?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        recipient: string;
        amount0: BigNumber;
        amount1: BigNumber;
        fee0: BigNumber;
        fee1: BigNumber;
      }
    >;

    "Mint(address,uint256,uint256)"(
      sender?: string | null,
      amount0?: null,
      amount1?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { sender: string; amount0: BigNumber; amount1: BigNumber }
    >;

    Mint(
      sender?: string | null,
      amount0?: null,
      amount1?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { sender: string; amount0: BigNumber; amount1: BigNumber }
    >;

    "PaidProtocolFee(uint112,uint112)"(
      collectedFee0?: null,
      collectedFee1?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collectedFee0: BigNumber; collectedFee1: BigNumber }
    >;

    PaidProtocolFee(
      collectedFee0?: null,
      collectedFee1?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber],
      { collectedFee0: BigNumber; collectedFee1: BigNumber }
    >;

    "Swap(address,uint256,uint256,uint256,uint256,address)"(
      sender?: string | null,
      amount0In?: null,
      amount1In?: null,
      amount0Out?: null,
      amount1Out?: null,
      to?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, string],
      {
        sender: string;
        amount0In: BigNumber;
        amount1In: BigNumber;
        amount0Out: BigNumber;
        amount1Out: BigNumber;
        to: string;
      }
    >;

    Swap(
      sender?: string | null,
      amount0In?: null,
      amount1In?: null,
      amount0Out?: null,
      amount1Out?: null,
      to?: string | null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber, string],
      {
        sender: string;
        amount0In: BigNumber;
        amount1In: BigNumber;
        amount0Out: BigNumber;
        amount1Out: BigNumber;
        to: string;
      }
    >;

    "Sync(uint112,uint112,uint112,uint112)"(
      reserve0?: null,
      reserve1?: null,
      vReserve0?: null,
      vReserve1?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        reserve0: BigNumber;
        reserve1: BigNumber;
        vReserve0: BigNumber;
        vReserve1: BigNumber;
      }
    >;

    Sync(
      reserve0?: null,
      reserve1?: null,
      vReserve0?: null,
      vReserve1?: null
    ): TypedEventFilter<
      [BigNumber, BigNumber, BigNumber, BigNumber],
      {
        reserve0: BigNumber;
        reserve1: BigNumber;
        vReserve0: BigNumber;
        vReserve1: BigNumber;
      }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; value: BigNumber }
    >;
  };

  estimateGas: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<BigNumber>;

    MINIMUM_LIQUIDITY(overrides?: CallOverrides): Promise<BigNumber>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    calculateSwapGivenIn(
      tokenIn: string,
      arg1: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    formula(overrides?: CallOverrides): Promise<BigNumber>;

    getCollectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    getParameters(overrides?: CallOverrides): Promise<BigNumber>;

    getReserves(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _token0: string,
      _token1: string,
      _tokenWeight0: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    onSwapGivenIn(
      tokenIn: string,
      arg1: string,
      arg2: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pairFlashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setSwapParams(
      _newSwapFee: BigNumberish,
      _newAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    token0(overrides?: CallOverrides): Promise<BigNumber>;

    token1(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DOMAIN_SEPARATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MINIMUM_LIQUIDITY(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    allowance(
      arg0: string,
      arg1: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    calculateSwapGivenIn(
      tokenIn: string,
      arg1: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    formula(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCollectedFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getParameters(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _token0: string,
      _token1: string,
      _tokenWeight0: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nonces(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    onSwapGivenIn(
      tokenIn: string,
      arg1: string,
      arg2: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapGivenOut(
      tokenIn: string,
      arg1: string,
      amountOut: BigNumberish,
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pairFlashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    permit(
      owner: string,
      spender: string,
      value: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setSwapParams(
      _newSwapFee: BigNumberish,
      _newAmp: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    token0(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token1(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
