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

interface WeightedFormulaV2Interface extends ethers.utils.Interface {
  functions: {
    "ensureConstantValue(uint256,uint256,uint256,uint256,uint32)": FunctionFragment;
    "getAmountIn(uint256,uint256,uint256,uint32,uint32,uint32)": FunctionFragment;
    "getAmountOut(uint256,uint256,uint256,uint32,uint32,uint32)": FunctionFragment;
    "getAmountsIn(address,address,uint256,address[])": FunctionFragment;
    "getAmountsOut(address,address,uint256,address[])": FunctionFragment;
    "getFactoryAmountsIn(address,address,address,uint256,address[])": FunctionFragment;
    "getFactoryAmountsOut(address,address,address,uint256,address[])": FunctionFragment;
    "getFactoryParameters(address,address,address)": FunctionFragment;
    "getFactoryStaticData(address,address)": FunctionFragment;
    "getOtherToken(address,address)": FunctionFragment;
    "getPairAmountIn(address,address,uint256)": FunctionFragment;
    "getPairAmountOut(address,address,uint256)": FunctionFragment;
    "getPairParameters(address,address)": FunctionFragment;
    "getPairStaticData(address)": FunctionFragment;
    "getReserves(address,address,address)": FunctionFragment;
    "mintLiquidityFee(uint256,uint256,uint256,uint32,uint32,uint112,uint112)": FunctionFragment;
    "quote(uint256,uint256,uint256)": FunctionFragment;
    "sortTokens(address,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ensureConstantValue",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountIn",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountsIn",
    values: [string, string, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getAmountsOut",
    values: [string, string, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactoryAmountsIn",
    values: [string, string, string, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactoryAmountsOut",
    values: [string, string, string, BigNumberish, string[]]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactoryParameters",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getFactoryStaticData",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getOtherToken",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPairAmountIn",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPairAmountOut",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPairParameters",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getPairStaticData",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getReserves",
    values: [string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "mintLiquidityFee",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quote",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sortTokens",
    values: [string, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "ensureConstantValue",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountsIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAmountsOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFactoryAmountsIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFactoryAmountsOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFactoryParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFactoryStaticData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOtherToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPairAmountIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPairAmountOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPairParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPairStaticData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getReserves",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintLiquidityFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "quote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sortTokens", data: BytesLike): Result;

  events: {};
}

export class WeightedFormulaV2 extends BaseContract {
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

  interface: WeightedFormulaV2Interface;

  functions: {
    ensureConstantValue(
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      balance0Adjusted: BigNumberish,
      balance1Adjusted: BigNumberish,
      tokenWeight0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountIn: BigNumber }>;

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    getAmountsIn(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { amounts: BigNumber[] }>;

    getAmountsOut(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { amounts: BigNumber[] }>;

    getFactoryAmountsIn(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { amounts: BigNumber[] }>;

    getFactoryAmountsOut(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { amounts: BigNumber[] }>;

    getFactoryParameters(
      factory: string,
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, number, number, number] & {
        tokenB: string;
        reserveA: BigNumber;
        reserveB: BigNumber;
        tokenWeightA: number;
        tokenWeightB: number;
        swapFee: number;
      }
    >;

    getFactoryStaticData(
      factory: string,
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    getOtherToken(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<[string] & { tokenB: string }>;

    getPairAmountIn(
      pair: string,
      tokenIn: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountIn: BigNumber }>;

    getPairAmountOut(
      pair: string,
      tokenIn: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountOut: BigNumber }>;

    getPairParameters(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, number, number, number] & {
        tokenB: string;
        reserveA: BigNumber;
        reserveB: BigNumber;
        tokenWeightA: number;
        tokenWeightB: number;
        swapFee: number;
      }
    >;

    getPairStaticData(
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    getReserves(
      pair: string,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        reserveA: BigNumber;
        reserveB: BigNumber;
        vReserveA: BigNumber;
        vReserveB: BigNumber;
      }
    >;

    mintLiquidityFee(
      totalLiquidity: BigNumberish,
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      tokenWeight0: BigNumberish,
      tokenWeight1: BigNumberish,
      collectedFee0: BigNumberish,
      collectedFee1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amount: BigNumber }>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { amountB: BigNumber }>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;
  };

  ensureConstantValue(
    reserve0: BigNumberish,
    reserve1: BigNumberish,
    balance0Adjusted: BigNumberish,
    balance1Adjusted: BigNumberish,
    tokenWeight0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  getAmountIn(
    amountOut: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    tokenWeightIn: BigNumberish,
    tokenWeightOut: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAmountOut(
    amountIn: BigNumberish,
    reserveIn: BigNumberish,
    reserveOut: BigNumberish,
    tokenWeightIn: BigNumberish,
    tokenWeightOut: BigNumberish,
    swapFee: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAmountsIn(
    tokenIn: string,
    tokenOut: string,
    amountOut: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getAmountsOut(
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getFactoryAmountsIn(
    factory: string,
    tokenIn: string,
    tokenOut: string,
    amountOut: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getFactoryAmountsOut(
    factory: string,
    tokenIn: string,
    tokenOut: string,
    amountIn: BigNumberish,
    path: string[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  getFactoryParameters(
    factory: string,
    pair: string,
    tokenA: string,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, number, number, number] & {
      tokenB: string;
      reserveA: BigNumber;
      reserveB: BigNumber;
      tokenWeightA: number;
      tokenWeightB: number;
      swapFee: number;
    }
  >;

  getFactoryStaticData(
    factory: string,
    pair: string,
    overrides?: CallOverrides
  ): Promise<
    [number, number, number, number] & {
      tokenWeight0: number;
      tokenWeight1: number;
      swapFee: number;
      amp: number;
    }
  >;

  getOtherToken(
    pair: string,
    tokenA: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getPairAmountIn(
    pair: string,
    tokenIn: string,
    amountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPairAmountOut(
    pair: string,
    tokenIn: string,
    amountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getPairParameters(
    pair: string,
    tokenA: string,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber, BigNumber, number, number, number] & {
      tokenB: string;
      reserveA: BigNumber;
      reserveB: BigNumber;
      tokenWeightA: number;
      tokenWeightB: number;
      swapFee: number;
    }
  >;

  getPairStaticData(
    pair: string,
    overrides?: CallOverrides
  ): Promise<
    [number, number, number, number] & {
      tokenWeight0: number;
      tokenWeight1: number;
      swapFee: number;
      amp: number;
    }
  >;

  getReserves(
    pair: string,
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      reserveA: BigNumber;
      reserveB: BigNumber;
      vReserveA: BigNumber;
      vReserveB: BigNumber;
    }
  >;

  mintLiquidityFee(
    totalLiquidity: BigNumberish,
    reserve0: BigNumberish,
    reserve1: BigNumberish,
    tokenWeight0: BigNumberish,
    tokenWeight1: BigNumberish,
    collectedFee0: BigNumberish,
    collectedFee1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  quote(
    amountA: BigNumberish,
    reserveA: BigNumberish,
    reserveB: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sortTokens(
    tokenA: string,
    tokenB: string,
    overrides?: CallOverrides
  ): Promise<[string, string] & { token0: string; token1: string }>;

  callStatic: {
    ensureConstantValue(
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      balance0Adjusted: BigNumberish,
      balance1Adjusted: BigNumberish,
      tokenWeight0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountsIn(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getAmountsOut(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getFactoryAmountsIn(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getFactoryAmountsOut(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    getFactoryParameters(
      factory: string,
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, number, number, number] & {
        tokenB: string;
        reserveA: BigNumber;
        reserveB: BigNumber;
        tokenWeightA: number;
        tokenWeightB: number;
        swapFee: number;
      }
    >;

    getFactoryStaticData(
      factory: string,
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    getOtherToken(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getPairAmountIn(
      pair: string,
      tokenIn: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairAmountOut(
      pair: string,
      tokenIn: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairParameters(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber, BigNumber, number, number, number] & {
        tokenB: string;
        reserveA: BigNumber;
        reserveB: BigNumber;
        tokenWeightA: number;
        tokenWeightB: number;
        swapFee: number;
      }
    >;

    getPairStaticData(
      pair: string,
      overrides?: CallOverrides
    ): Promise<
      [number, number, number, number] & {
        tokenWeight0: number;
        tokenWeight1: number;
        swapFee: number;
        amp: number;
      }
    >;

    getReserves(
      pair: string,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        reserveA: BigNumber;
        reserveB: BigNumber;
        vReserveA: BigNumber;
        vReserveB: BigNumber;
      }
    >;

    mintLiquidityFee(
      totalLiquidity: BigNumberish,
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      tokenWeight0: BigNumberish,
      tokenWeight1: BigNumberish,
      collectedFee0: BigNumberish,
      collectedFee1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { token0: string; token1: string }>;
  };

  filters: {};

  estimateGas: {
    ensureConstantValue(
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      balance0Adjusted: BigNumberish,
      balance1Adjusted: BigNumberish,
      tokenWeight0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountsIn(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAmountsOut(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactoryAmountsIn(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactoryAmountsOut(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactoryParameters(
      factory: string,
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getFactoryStaticData(
      factory: string,
      pair: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOtherToken(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairAmountIn(
      pair: string,
      tokenIn: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairAmountOut(
      pair: string,
      tokenIn: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairParameters(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPairStaticData(
      pair: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getReserves(
      pair: string,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintLiquidityFee(
      totalLiquidity: BigNumberish,
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      tokenWeight0: BigNumberish,
      tokenWeight1: BigNumberish,
      collectedFee0: BigNumberish,
      collectedFee1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ensureConstantValue(
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      balance0Adjusted: BigNumberish,
      balance1Adjusted: BigNumberish,
      tokenWeight0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountIn(
      amountOut: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountOut(
      amountIn: BigNumberish,
      reserveIn: BigNumberish,
      reserveOut: BigNumberish,
      tokenWeightIn: BigNumberish,
      tokenWeightOut: BigNumberish,
      swapFee: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountsIn(
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAmountsOut(
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFactoryAmountsIn(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountOut: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFactoryAmountsOut(
      factory: string,
      tokenIn: string,
      tokenOut: string,
      amountIn: BigNumberish,
      path: string[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFactoryParameters(
      factory: string,
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getFactoryStaticData(
      factory: string,
      pair: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOtherToken(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPairAmountIn(
      pair: string,
      tokenIn: string,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPairAmountOut(
      pair: string,
      tokenIn: string,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPairParameters(
      pair: string,
      tokenA: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPairStaticData(
      pair: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getReserves(
      pair: string,
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintLiquidityFee(
      totalLiquidity: BigNumberish,
      reserve0: BigNumberish,
      reserve1: BigNumberish,
      tokenWeight0: BigNumberish,
      tokenWeight1: BigNumberish,
      collectedFee0: BigNumberish,
      collectedFee1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    quote(
      amountA: BigNumberish,
      reserveA: BigNumberish,
      reserveB: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sortTokens(
      tokenA: string,
      tokenB: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
