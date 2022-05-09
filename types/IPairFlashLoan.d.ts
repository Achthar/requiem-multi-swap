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

interface IPairFlashLoanInterface extends ethers.utils.Interface {
  functions: {
    "flashLoan(address,uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "flashLoan",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "flashLoan", data: BytesLike): Result;

  events: {
    "FlashLoan(address,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "FlashLoan"): EventFragment;
}

export type FlashLoanEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber] & {
    recipient: string;
    amount0: BigNumber;
    amount1: BigNumber;
    fee0: BigNumber;
    fee1: BigNumber;
  }
>;

export class IPairFlashLoan extends BaseContract {
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

  interface: IPairFlashLoanInterface;

  functions: {
    flashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  flashLoan(
    recipient: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    userData: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    flashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
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
  };

  estimateGas: {
    flashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    flashLoan(
      recipient: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      userData: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}