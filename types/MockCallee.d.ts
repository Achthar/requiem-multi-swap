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

interface MockCalleeInterface extends ethers.utils.Interface {
  functions: {
    "callSwap(uint256,uint256)": FunctionFragment;
    "pool()": FunctionFragment;
    "reenter()": FunctionFragment;
    "repayInExcess()": FunctionFragment;
    "repayLoan()": FunctionFragment;
    "requiemCall(address,uint256,uint256,bytes)": FunctionFragment;
    "setReenter(bool)": FunctionFragment;
    "setRepayInExcess(bool)": FunctionFragment;
    "setRepayLoan(bool)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "callSwap",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pool", values?: undefined): string;
  encodeFunctionData(functionFragment: "reenter", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "repayInExcess",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "repayLoan", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "requiemCall",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "setReenter", values: [boolean]): string;
  encodeFunctionData(
    functionFragment: "setRepayInExcess",
    values: [boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setRepayLoan",
    values: [boolean]
  ): string;

  decodeFunctionResult(functionFragment: "callSwap", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "reenter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "repayInExcess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "repayLoan", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "requiemCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setReenter", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRepayInExcess",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRepayLoan",
    data: BytesLike
  ): Result;

  events: {};
}

export class MockCallee extends BaseContract {
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

  interface: MockCalleeInterface;

  functions: {
    callSwap(
      amount0: BigNumberish,
      amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pool(overrides?: CallOverrides): Promise<[string]>;

    reenter(overrides?: CallOverrides): Promise<[boolean]>;

    repayInExcess(overrides?: CallOverrides): Promise<[boolean]>;

    repayLoan(overrides?: CallOverrides): Promise<[boolean]>;

    requiemCall(
      arg0: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setReenter(
      _reenter: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  callSwap(
    amount0: BigNumberish,
    amount1: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pool(overrides?: CallOverrides): Promise<string>;

  reenter(overrides?: CallOverrides): Promise<boolean>;

  repayInExcess(overrides?: CallOverrides): Promise<boolean>;

  repayLoan(overrides?: CallOverrides): Promise<boolean>;

  requiemCall(
    arg0: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setReenter(
    _reenter: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRepayInExcess(
    _repayInExcess: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setRepayLoan(
    _repayLoan: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    callSwap(
      amount0: BigNumberish,
      amount1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pool(overrides?: CallOverrides): Promise<string>;

    reenter(overrides?: CallOverrides): Promise<boolean>;

    repayInExcess(overrides?: CallOverrides): Promise<boolean>;

    repayLoan(overrides?: CallOverrides): Promise<boolean>;

    requiemCall(
      arg0: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setReenter(_reenter: boolean, overrides?: CallOverrides): Promise<void>;

    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    setRepayLoan(_repayLoan: boolean, overrides?: CallOverrides): Promise<void>;
  };

  filters: {};

  estimateGas: {
    callSwap(
      amount0: BigNumberish,
      amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pool(overrides?: CallOverrides): Promise<BigNumber>;

    reenter(overrides?: CallOverrides): Promise<BigNumber>;

    repayInExcess(overrides?: CallOverrides): Promise<BigNumber>;

    repayLoan(overrides?: CallOverrides): Promise<BigNumber>;

    requiemCall(
      arg0: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setReenter(
      _reenter: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    callSwap(
      amount0: BigNumberish,
      amount1: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pool(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reenter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    repayInExcess(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    repayLoan(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    requiemCall(
      arg0: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setReenter(
      _reenter: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRepayInExcess(
      _repayInExcess: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setRepayLoan(
      _repayLoan: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}