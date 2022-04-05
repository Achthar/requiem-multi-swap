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
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface RequiemQRouterV2Interface extends ethers.utils.Interface {
  functions: {
    "WETH()": FunctionFragment;
    "factory()": FunctionFragment;
    "formula()": FunctionFragment;
    "multihopBatchSwapExactIn(tuple[][],address,address,uint256,uint256,uint256)": FunctionFragment;
    "multihopBatchSwapExactOut(tuple[][],address,address,uint256,uint256)": FunctionFragment;
    "onSwapETHForExactTokens(address[],address[],uint256,address,uint256)": FunctionFragment;
    "onSwapExactETHForTokens(address[],address[],uint256,address,uint256)": FunctionFragment;
    "onSwapExactTokensForETH(address[],address[],uint256,uint256,address,uint256)": FunctionFragment;
    "onSwapExactTokensForTokens(address[],address[],uint256,uint256,address,uint256)": FunctionFragment;
    "onSwapTokensForExactETH(address[],address[],uint256,uint256,address,uint256)": FunctionFragment;
    "onSwapTokensForExactTokens(address[],address[],uint256,uint256,address,uint256)": FunctionFragment;
    "swapETHForExactTokens(address,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactETHForTokens(address,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactETHForTokensSupportingFeeOnTransferTokens(address,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactTokensForETH(address,uint256,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactTokensForETHSupportingFeeOnTransferTokens(address,uint256,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactTokensForTokens(address,address,uint256,uint256,address[],address,uint256)": FunctionFragment;
    "swapExactTokensForTokensSupportingFeeOnTransferTokens(address,address,uint256,uint256,address[],address,uint256)": FunctionFragment;
    "swapTokensForExactETH(address,uint256,uint256,address[],address,uint256)": FunctionFragment;
    "swapTokensForExactTokens(address,address,uint256,uint256,address[],address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(functionFragment: "formula", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "multihopBatchSwapExactIn",
    values: [
      {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "multihopBatchSwapExactOut",
    values: [
      {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      string,
      string,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapETHForExactTokens",
    values: [string[], string[], BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapExactETHForTokens",
    values: [string[], string[], BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapExactTokensForETH",
    values: [
      string[],
      string[],
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapExactTokensForTokens",
    values: [
      string[],
      string[],
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapTokensForExactETH",
    values: [
      string[],
      string[],
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onSwapTokensForExactTokens",
    values: [
      string[],
      string[],
      BigNumberish,
      BigNumberish,
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapETHForExactTokens",
    values: [string, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactETHForTokens",
    values: [string, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    values: [string, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactTokensForETH",
    values: [string, BigNumberish, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    values: [string, BigNumberish, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactTokensForTokens",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string[],
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string[],
      string,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swapTokensForExactETH",
    values: [string, BigNumberish, BigNumberish, string[], string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapTokensForExactTokens",
    values: [
      string,
      string,
      BigNumberish,
      BigNumberish,
      string[],
      string,
      BigNumberish
    ]
  ): string;

  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "formula", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "multihopBatchSwapExactIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multihopBatchSwapExactOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapETHForExactTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapExactETHForTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapExactTokensForETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapExactTokensForTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapTokensForExactETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onSwapTokensForExactTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapETHForExactTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactETHForTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactETHForTokensSupportingFeeOnTransferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactTokensForETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactTokensForETHSupportingFeeOnTransferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactTokensForTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapTokensForExactETH",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapTokensForExactTokens",
    data: BytesLike
  ): Result;

  events: {
    "Exchange(address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Exchange"): EventFragment;
}

export type ExchangeEvent = TypedEvent<
  [string, BigNumber, string] & {
    pair: string;
    amountOut: BigNumber;
    output: string;
  }
>;

export class RequiemQRouterV2 extends BaseContract {
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

  interface: RequiemQRouterV2Interface;

  functions: {
    WETH(overrides?: CallOverrides): Promise<[string]>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    formula(overrides?: CallOverrides): Promise<[string]>;

    multihopBatchSwapExactIn(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      totalAmountIn: BigNumberish,
      minTotalAmountOut: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    multihopBatchSwapExactOut(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      maxTotalAmountIn: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapETHForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapExactETHForTokens(
      pools: string[],
      tokens: string[],
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapExactTokensForETH(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapExactTokensForTokens(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapTokensForExactETH(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    onSwapTokensForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapETHForExactTokens(
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactETHForTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactETHForTokensSupportingFeeOnTransferTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactTokensForETH(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactTokensForETHSupportingFeeOnTransferTokens(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapExactTokensForTokensSupportingFeeOnTransferTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapTokensForExactETH(
      tokenIn: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    swapTokensForExactTokens(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  WETH(overrides?: CallOverrides): Promise<string>;

  factory(overrides?: CallOverrides): Promise<string>;

  formula(overrides?: CallOverrides): Promise<string>;

  multihopBatchSwapExactIn(
    swapSequences: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[][],
    tokenIn: string,
    tokenOut: string,
    totalAmountIn: BigNumberish,
    minTotalAmountOut: BigNumberish,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  multihopBatchSwapExactOut(
    swapSequences: {
      pool: string;
      tokenIn: string;
      tokenOut: string;
      swapAmount: BigNumberish;
      limitReturnAmount: BigNumberish;
      maxPrice: BigNumberish;
    }[][],
    tokenIn: string,
    tokenOut: string,
    maxTotalAmountIn: BigNumberish,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapETHForExactTokens(
    pools: string[],
    tokens: string[],
    amountOut: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapExactETHForTokens(
    pools: string[],
    tokens: string[],
    amountOutMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapExactTokensForETH(
    pools: string[],
    tokens: string[],
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapExactTokensForTokens(
    pools: string[],
    tokens: string[],
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapTokensForExactETH(
    pools: string[],
    tokens: string[],
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  onSwapTokensForExactTokens(
    pools: string[],
    tokens: string[],
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapETHForExactTokens(
    tokenOut: string,
    amountOut: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactETHForTokens(
    tokenOut: string,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactETHForTokensSupportingFeeOnTransferTokens(
    tokenOut: string,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactTokensForETH(
    tokenIn: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactTokensForETHSupportingFeeOnTransferTokens(
    tokenIn: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactTokensForTokens(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapExactTokensForTokensSupportingFeeOnTransferTokens(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    amountOutMin: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapTokensForExactETH(
    tokenIn: string,
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  swapTokensForExactTokens(
    tokenIn: string,
    tokenOut: string,
    amountOut: BigNumberish,
    amountInMax: BigNumberish,
    path: string[],
    to: string,
    deadline: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>;

    factory(overrides?: CallOverrides): Promise<string>;

    formula(overrides?: CallOverrides): Promise<string>;

    multihopBatchSwapExactIn(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      totalAmountIn: BigNumberish,
      minTotalAmountOut: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    multihopBatchSwapExactOut(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      maxTotalAmountIn: BigNumberish,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onSwapETHForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    onSwapExactETHForTokens(
      pools: string[],
      tokens: string[],
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onSwapExactTokensForETH(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onSwapExactTokensForTokens(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    onSwapTokensForExactETH(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    onSwapTokensForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapETHForExactTokens(
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapExactETHForTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapExactETHForTokensSupportingFeeOnTransferTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swapExactTokensForETH(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapExactTokensForETHSupportingFeeOnTransferTokens(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapExactTokensForTokensSupportingFeeOnTransferTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    swapTokensForExactETH(
      tokenIn: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    swapTokensForExactTokens(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;
  };

  filters: {
    "Exchange(address,uint256,address)"(
      pair?: null,
      amountOut?: null,
      output?: null
    ): TypedEventFilter<
      [string, BigNumber, string],
      { pair: string; amountOut: BigNumber; output: string }
    >;

    Exchange(
      pair?: null,
      amountOut?: null,
      output?: null
    ): TypedEventFilter<
      [string, BigNumber, string],
      { pair: string; amountOut: BigNumber; output: string }
    >;
  };

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    formula(overrides?: CallOverrides): Promise<BigNumber>;

    multihopBatchSwapExactIn(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      totalAmountIn: BigNumberish,
      minTotalAmountOut: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    multihopBatchSwapExactOut(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      maxTotalAmountIn: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapETHForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapExactETHForTokens(
      pools: string[],
      tokens: string[],
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapExactTokensForETH(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapExactTokensForTokens(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapTokensForExactETH(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    onSwapTokensForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapETHForExactTokens(
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactETHForTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactETHForTokensSupportingFeeOnTransferTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactTokensForETH(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactTokensForETHSupportingFeeOnTransferTokens(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapExactTokensForTokensSupportingFeeOnTransferTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapTokensForExactETH(
      tokenIn: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    swapTokensForExactTokens(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    formula(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multihopBatchSwapExactIn(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      totalAmountIn: BigNumberish,
      minTotalAmountOut: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    multihopBatchSwapExactOut(
      swapSequences: {
        pool: string;
        tokenIn: string;
        tokenOut: string;
        swapAmount: BigNumberish;
        limitReturnAmount: BigNumberish;
        maxPrice: BigNumberish;
      }[][],
      tokenIn: string,
      tokenOut: string,
      maxTotalAmountIn: BigNumberish,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapETHForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapExactETHForTokens(
      pools: string[],
      tokens: string[],
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapExactTokensForETH(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapExactTokensForTokens(
      pools: string[],
      tokens: string[],
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapTokensForExactETH(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    onSwapTokensForExactTokens(
      pools: string[],
      tokens: string[],
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapETHForExactTokens(
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactETHForTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactETHForTokensSupportingFeeOnTransferTokens(
      tokenOut: string,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactTokensForETH(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactTokensForETHSupportingFeeOnTransferTokens(
      tokenIn: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactTokensForTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapExactTokensForTokensSupportingFeeOnTransferTokens(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      amountOutMin: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapTokensForExactETH(
      tokenIn: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    swapTokensForExactTokens(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      amountInMax: BigNumberish,
      path: string[],
      to: string,
      deadline: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
