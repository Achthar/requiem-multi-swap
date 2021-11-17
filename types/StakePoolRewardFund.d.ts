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

interface StakePoolRewardFundInterface extends ethers.utils.Interface {
  functions: {
    "allowRecoverRewardToken(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "recoverAllRewardToken(address,address)": FunctionFragment;
    "recoverRewardToken(address,address,uint256)": FunctionFragment;
    "safeTransfer(address,address,uint256)": FunctionFragment;
    "stakePool()": FunctionFragment;
    "timelock()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "allowRecoverRewardToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverAllRewardToken",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverRewardToken",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransfer",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "stakePool", values?: undefined): string;
  encodeFunctionData(functionFragment: "timelock", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "allowRecoverRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recoverAllRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverRewardToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransfer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stakePool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "timelock", data: BytesLike): Result;

  events: {};
}

export class StakePoolRewardFund extends BaseContract {
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

  interface: StakePoolRewardFundInterface;

  functions: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    initialize(
      _stakePool: string,
      _timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recoverAllRewardToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recoverRewardToken(
      _token: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    safeTransfer(
      _token: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stakePool(overrides?: CallOverrides): Promise<[string]>;

    timelock(overrides?: CallOverrides): Promise<[string]>;
  };

  allowRecoverRewardToken(
    _token: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  initialize(
    _stakePool: string,
    _timelock: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recoverAllRewardToken(
    _token: string,
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recoverRewardToken(
    _token: string,
    _to: string,
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  safeTransfer(
    _token: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stakePool(overrides?: CallOverrides): Promise<string>;

  timelock(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    initialize(
      _stakePool: string,
      _timelock: string,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverAllRewardToken(
      _token: string,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    recoverRewardToken(
      _token: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    safeTransfer(
      _token: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakePool(overrides?: CallOverrides): Promise<string>;

    timelock(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _stakePool: string,
      _timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recoverAllRewardToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recoverRewardToken(
      _token: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    safeTransfer(
      _token: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stakePool(overrides?: CallOverrides): Promise<BigNumber>;

    timelock(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    allowRecoverRewardToken(
      _token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _stakePool: string,
      _timelock: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recoverAllRewardToken(
      _token: string,
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recoverRewardToken(
      _token: string,
      _to: string,
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    safeTransfer(
      _token: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stakePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    timelock(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
