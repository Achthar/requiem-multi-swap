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

interface IRequiemSwapInterfaceInterface extends ethers.utils.Interface {
  functions: {
    "burn(address)": FunctionFragment;
    "getCollectedFees()": FunctionFragment;
    "getReserves()": FunctionFragment;
    "getSwapFee()": FunctionFragment;
    "getTokenWeights()": FunctionFragment;
    "initialize(address,address,uint32,uint32)": FunctionFragment;
    "mint(address)": FunctionFragment;
    "price0CumulativeLast()": FunctionFragment;
    "price1CumulativeLast()": FunctionFragment;
    "skim(address)": FunctionFragment;
    "swap(uint256,uint256,address,bytes)": FunctionFragment;
    "swapStruct(uint256,uint256,uint256,uint256,address,bytes)": FunctionFragment;
    "sync()": FunctionFragment;
    "tokens()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "burn", values: [string]): string;
  encodeFunctionData(
    functionFragment: "getCollectedFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getReserves",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getSwapFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenWeights",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [string]): string;
  encodeFunctionData(
    functionFragment: "price0CumulativeLast",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "price1CumulativeLast",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "skim", values: [string]): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [BigNumberish, BigNumberish, string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "swapStruct",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      string,
      BytesLike
    ]
  ): string;
  encodeFunctionData(functionFragment: "sync", values?: undefined): string;
  encodeFunctionData(functionFragment: "tokens", values?: undefined): string;

  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCollectedFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getSwapFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTokenWeights",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "price0CumulativeLast",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "price1CumulativeLast",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "skim", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swapStruct", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sync", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokens", data: BytesLike): Result;

  events: {
    "Swap(address,uint256,uint256,uint256,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
}

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

export class IRequiemSwapInterface extends BaseContract {
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

  interface: IRequiemSwapInterfaceInterface;

  functions: {
    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getCollectedFees(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { _collectedFees: BigNumber[] }>;

    getReserves(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], number] & {
        reserves: BigNumber[];
        blockTimestampLast: number;
      }
    >;

    getSwapFee(overrides?: CallOverrides): Promise<[number]>;

    getTokenWeights(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { tokenWeight0: number; tokenWeight1: number }
    >;

    initialize(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    price0CumulativeLast(overrides?: CallOverrides): Promise<[BigNumber]>;

    price1CumulativeLast(overrides?: CallOverrides): Promise<[BigNumber]>;

    skim(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swap(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapStruct(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      index0: BigNumberish,
      index1: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    tokens(overrides?: CallOverrides): Promise<[string[]]>;
  };

  burn(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getCollectedFees(overrides?: CallOverrides): Promise<BigNumber[]>;

  getReserves(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber[], number] & {
      reserves: BigNumber[];
      blockTimestampLast: number;
    }
  >;

  getSwapFee(overrides?: CallOverrides): Promise<number>;

  getTokenWeights(
    overrides?: CallOverrides
  ): Promise<[number, number] & { tokenWeight0: number; tokenWeight1: number }>;

  initialize(
    arg0: string,
    arg1: string,
    arg2: BigNumberish,
    arg3: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mint(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  price0CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

  price1CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

  skim(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swap(
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    to: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapStruct(
    amount0Out: BigNumberish,
    amount1Out: BigNumberish,
    index0: BigNumberish,
    index1: BigNumberish,
    to: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sync(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  tokens(overrides?: CallOverrides): Promise<string[]>;

  callStatic: {
    burn(
      to: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amount0: BigNumber; amount1: BigNumber }
    >;

    getCollectedFees(overrides?: CallOverrides): Promise<BigNumber[]>;

    getReserves(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber[], number] & {
        reserves: BigNumber[];
        blockTimestampLast: number;
      }
    >;

    getSwapFee(overrides?: CallOverrides): Promise<number>;

    getTokenWeights(
      overrides?: CallOverrides
    ): Promise<
      [number, number] & { tokenWeight0: number; tokenWeight1: number }
    >;

    initialize(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mint(to: string, overrides?: CallOverrides): Promise<BigNumber>;

    price0CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

    price1CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

    skim(to: string, overrides?: CallOverrides): Promise<void>;

    swap(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    swapStruct(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      index0: BigNumberish,
      index1: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    sync(overrides?: CallOverrides): Promise<void>;

    tokens(overrides?: CallOverrides): Promise<string[]>;
  };

  filters: {
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
  };

  estimateGas: {
    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getCollectedFees(overrides?: CallOverrides): Promise<BigNumber>;

    getReserves(overrides?: CallOverrides): Promise<BigNumber>;

    getSwapFee(overrides?: CallOverrides): Promise<BigNumber>;

    getTokenWeights(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    price0CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

    price1CumulativeLast(overrides?: CallOverrides): Promise<BigNumber>;

    skim(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swap(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapStruct(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      index0: BigNumberish,
      index1: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    tokens(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    burn(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getCollectedFees(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getReserves(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getSwapFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTokenWeights(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      arg0: string,
      arg1: string,
      arg2: BigNumberish,
      arg3: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    price0CumulativeLast(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    price1CumulativeLast(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    skim(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swap(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapStruct(
      amount0Out: BigNumberish,
      amount1Out: BigNumberish,
      index0: BigNumberish,
      index1: BigNumberish,
      to: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sync(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    tokens(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
