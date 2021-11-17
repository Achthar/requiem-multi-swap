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

interface BasePoolSplitCodeFactoryInterface extends ethers.utils.Interface {
  functions: {
    "getCreationCode()": FunctionFragment;
    "getCreationCodeContracts()": FunctionFragment;
    "getVault()": FunctionFragment;
    "isPoolFromFactory(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getCreationCode",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCreationCodeContracts",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getVault", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "isPoolFromFactory",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "getCreationCode",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCreationCodeContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isPoolFromFactory",
    data: BytesLike
  ): Result;

  events: {
    "PoolCreated(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PoolCreated"): EventFragment;
}

export type PoolCreatedEvent = TypedEvent<[string] & { pool: string }>;

export class BasePoolSplitCodeFactory extends BaseContract {
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

  interface: BasePoolSplitCodeFactoryInterface;

  functions: {
    getCreationCode(overrides?: CallOverrides): Promise<[string]>;

    getCreationCodeContracts(
      overrides?: CallOverrides
    ): Promise<[string, string] & { contractA: string; contractB: string }>;

    getVault(overrides?: CallOverrides): Promise<[string]>;

    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  getCreationCode(overrides?: CallOverrides): Promise<string>;

  getCreationCodeContracts(
    overrides?: CallOverrides
  ): Promise<[string, string] & { contractA: string; contractB: string }>;

  getVault(overrides?: CallOverrides): Promise<string>;

  isPoolFromFactory(pool: string, overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    getCreationCode(overrides?: CallOverrides): Promise<string>;

    getCreationCodeContracts(
      overrides?: CallOverrides
    ): Promise<[string, string] & { contractA: string; contractB: string }>;

    getVault(overrides?: CallOverrides): Promise<string>;

    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "PoolCreated(address)"(
      pool?: string | null
    ): TypedEventFilter<[string], { pool: string }>;

    PoolCreated(
      pool?: string | null
    ): TypedEventFilter<[string], { pool: string }>;
  };

  estimateGas: {
    getCreationCode(overrides?: CallOverrides): Promise<BigNumber>;

    getCreationCodeContracts(overrides?: CallOverrides): Promise<BigNumber>;

    getVault(overrides?: CallOverrides): Promise<BigNumber>;

    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getCreationCode(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getCreationCodeContracts(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getVault(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isPoolFromFactory(
      pool: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
