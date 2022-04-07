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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RequiemPairErrorsInterface extends ethers.utils.Interface {
  functions: {
    "authorization()": FunctionFragment;
    "insufficientInput()": FunctionFragment;
    "insufficientLiquidity()": FunctionFragment;
    "insufficientOutput()": FunctionFragment;
    "invariant()": FunctionFragment;
    "params()": FunctionFragment;
    "token()": FunctionFragment;
    "zeroAddress()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "authorization",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "insufficientInput",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "insufficientLiquidity",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "insufficientOutput",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "invariant", values?: undefined): string;
  encodeFunctionData(functionFragment: "params", values?: undefined): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "zeroAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "authorization",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insufficientInput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insufficientLiquidity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "insufficientOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "invariant", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "params", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "zeroAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export class RequiemPairErrors extends BaseContract {
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

  interface: RequiemPairErrorsInterface;

  functions: {
    authorization(overrides?: CallOverrides): Promise<[number]>;

    insufficientInput(overrides?: CallOverrides): Promise<[number]>;

    insufficientLiquidity(overrides?: CallOverrides): Promise<[number]>;

    insufficientOutput(overrides?: CallOverrides): Promise<[number]>;

    invariant(overrides?: CallOverrides): Promise<[number]>;

    params(overrides?: CallOverrides): Promise<[number]>;

    token(overrides?: CallOverrides): Promise<[number]>;

    zeroAddress(overrides?: CallOverrides): Promise<[number]>;
  };

  authorization(overrides?: CallOverrides): Promise<number>;

  insufficientInput(overrides?: CallOverrides): Promise<number>;

  insufficientLiquidity(overrides?: CallOverrides): Promise<number>;

  insufficientOutput(overrides?: CallOverrides): Promise<number>;

  invariant(overrides?: CallOverrides): Promise<number>;

  params(overrides?: CallOverrides): Promise<number>;

  token(overrides?: CallOverrides): Promise<number>;

  zeroAddress(overrides?: CallOverrides): Promise<number>;

  callStatic: {
    authorization(overrides?: CallOverrides): Promise<number>;

    insufficientInput(overrides?: CallOverrides): Promise<number>;

    insufficientLiquidity(overrides?: CallOverrides): Promise<number>;

    insufficientOutput(overrides?: CallOverrides): Promise<number>;

    invariant(overrides?: CallOverrides): Promise<number>;

    params(overrides?: CallOverrides): Promise<number>;

    token(overrides?: CallOverrides): Promise<number>;

    zeroAddress(overrides?: CallOverrides): Promise<number>;
  };

  filters: {};

  estimateGas: {
    authorization(overrides?: CallOverrides): Promise<BigNumber>;

    insufficientInput(overrides?: CallOverrides): Promise<BigNumber>;

    insufficientLiquidity(overrides?: CallOverrides): Promise<BigNumber>;

    insufficientOutput(overrides?: CallOverrides): Promise<BigNumber>;

    invariant(overrides?: CallOverrides): Promise<BigNumber>;

    params(overrides?: CallOverrides): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    zeroAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    authorization(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    insufficientInput(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    insufficientLiquidity(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    insufficientOutput(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    invariant(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    params(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    zeroAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}