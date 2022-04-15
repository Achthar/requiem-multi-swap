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

interface IBackwardFlashInterface extends ethers.utils.Interface {
  functions: {
    "swapGivenOutFlash(address,address,uint256,address,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "swapGivenOutFlash",
    values: [string, string, BigNumberish, string, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "swapGivenOutFlash",
    data: BytesLike
  ): Result;

  events: {};
}

export class IBackwardFlash extends BaseContract {
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

  interface: IBackwardFlashInterface;

  functions: {
    swapGivenOutFlash(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  swapGivenOutFlash(
    tokenIn: string,
    tokenOut: string,
    outAmount: BigNumberish,
    receiver: string,
    swapdata: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    swapGivenOutFlash(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    swapGivenOutFlash(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    swapGivenOutFlash(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
