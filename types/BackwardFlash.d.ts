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

interface BackwardFlashInterface extends ethers.utils.Interface {
  functions: {
    "passArray()": FunctionFragment;
    "passFuncionCall(uint256,address[])": FunctionFragment;
    "swapGivenOutFlash(uint256,bytes)": FunctionFragment;
    "uniswapV2Call(address,uint256,uint256,bytes)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "passArray", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "passFuncionCall",
    values: [BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "swapGivenOutFlash",
    values: [BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "uniswapV2Call",
    values: [string, BigNumberish, BigNumberish, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "passArray", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "passFuncionCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapGivenOutFlash",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "uniswapV2Call",
    data: BytesLike
  ): Result;

  events: {};
}

export class BackwardFlash extends BaseContract {
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

  interface: BackwardFlashInterface;

  functions: {
    passArray(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    passFuncionCall(
      amountOut: BigNumberish,
      preceedingPools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "swapGivenOutFlash(uint256,bytes)"(
      outAmount: BigNumberish,
      swaps: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "swapGivenOutFlash(address,address,uint256,address,bytes)"(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  passArray(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  passFuncionCall(
    amountOut: BigNumberish,
    preceedingPools: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "swapGivenOutFlash(uint256,bytes)"(
    outAmount: BigNumberish,
    swaps: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "swapGivenOutFlash(address,address,uint256,address,bytes)"(
    tokenIn: string,
    tokenOut: string,
    outAmount: BigNumberish,
    receiver: string,
    swapdata: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  uniswapV2Call(
    sender: string,
    amount0: BigNumberish,
    amount1: BigNumberish,
    data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    passArray(overrides?: CallOverrides): Promise<void>;

    passFuncionCall(
      amountOut: BigNumberish,
      preceedingPools: string[],
      overrides?: CallOverrides
    ): Promise<void>;

    "swapGivenOutFlash(uint256,bytes)"(
      outAmount: BigNumberish,
      swaps: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "swapGivenOutFlash(address,address,uint256,address,bytes)"(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    passArray(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    passFuncionCall(
      amountOut: BigNumberish,
      preceedingPools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "swapGivenOutFlash(uint256,bytes)"(
      outAmount: BigNumberish,
      swaps: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "swapGivenOutFlash(address,address,uint256,address,bytes)"(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    passArray(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    passFuncionCall(
      amountOut: BigNumberish,
      preceedingPools: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "swapGivenOutFlash(uint256,bytes)"(
      outAmount: BigNumberish,
      swaps: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "swapGivenOutFlash(address,address,uint256,address,bytes)"(
      tokenIn: string,
      tokenOut: string,
      outAmount: BigNumberish,
      receiver: string,
      swapdata: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    uniswapV2Call(
      sender: string,
      amount0: BigNumberish,
      amount1: BigNumberish,
      data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}