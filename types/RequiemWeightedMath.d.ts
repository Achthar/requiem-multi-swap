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

interface RequiemWeightedMathInterface extends ethers.utils.Interface {
  functions: {
    "_MAX_INVARIANT_RATIO()": FunctionFragment;
    "_MAX_IN_RATIO()": FunctionFragment;
    "_MAX_OUT_RATIO()": FunctionFragment;
    "_MAX_WEIGHTED_TOKENS()": FunctionFragment;
    "_MIN_INVARIANT_RATIO()": FunctionFragment;
    "_MIN_WEIGHT()": FunctionFragment;
    "_calcAllTokensInGivenExactBptOut(uint256[],uint256,uint256)": FunctionFragment;
    "_calcLpInGivenExactTokensOut(uint256[],uint256[],uint256[],uint256,uint256)": FunctionFragment;
    "_calcLpOutGivenExactTokensIn(uint256[],uint256[],uint256[],uint256,uint256)": FunctionFragment;
    "_calcDueTokenProtocolSwapFeeAmount(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "_calcInGivenOut(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "_calcOutGivenIn(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "_calcTokenInGivenExactBptOut(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "_calcTokenOutGivenExactBptIn(uint256,uint256,uint256,uint256,uint256)": FunctionFragment;
    "_calcTokensOutGivenExactBptIn(uint256[],uint256,uint256)": FunctionFragment;
    "_calculateInvariant(uint256[],uint256[])": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "_MAX_INVARIANT_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_MAX_IN_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_MAX_OUT_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_MAX_WEIGHTED_TOKENS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_MIN_INVARIANT_RATIO",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_MIN_WEIGHT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "_calcAllTokensInGivenExactBptOut",
    values: [BigNumberish[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcLpInGivenExactTokensOut",
    values: [
      BigNumberish[],
      BigNumberish[],
      BigNumberish[],
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcLpOutGivenExactTokensIn",
    values: [
      BigNumberish[],
      BigNumberish[],
      BigNumberish[],
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcDueTokenProtocolSwapFeeAmount",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcInGivenOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcOutGivenIn",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcTokenInGivenExactBptOut",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcTokenOutGivenExactBptIn",
    values: [
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "_calcTokensOutGivenExactBptIn",
    values: [BigNumberish[], BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "_calculateInvariant",
    values: [BigNumberish[], BigNumberish[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "_MAX_INVARIANT_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_MAX_IN_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_MAX_OUT_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_MAX_WEIGHTED_TOKENS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_MIN_INVARIANT_RATIO",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_MIN_WEIGHT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcAllTokensInGivenExactBptOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcLpInGivenExactTokensOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcLpOutGivenExactTokensIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcDueTokenProtocolSwapFeeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcInGivenOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcOutGivenIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcTokenInGivenExactBptOut",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcTokenOutGivenExactBptIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calcTokensOutGivenExactBptIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "_calculateInvariant",
    data: BytesLike
  ): Result;

  events: {};
}

export class RequiemWeightedMath extends BaseContract {
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

  interface: RequiemWeightedMathInterface;

  functions: {
    _MAX_INVARIANT_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    _MAX_IN_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    _MAX_OUT_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    _MAX_WEIGHTED_TOKENS(overrides?: CallOverrides): Promise<[BigNumber]>;

    _MIN_INVARIANT_RATIO(overrides?: CallOverrides): Promise<[BigNumber]>;

    _MIN_WEIGHT(overrides?: CallOverrides): Promise<[BigNumber]>;

    _calcAllTokensInGivenExactBptOut(
      balances: BigNumberish[],
      bptAmountOut: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _calcLpInGivenExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[]]>;

    _calcLpOutGivenExactTokensIn(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[]]>;

    _calcDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _calcInGivenOut(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _calcOutGivenIn(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    _calcTokenInGivenExactBptOut(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; swapFee: BigNumber }
    >;

    _calcTokenOutGivenExactBptIn(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; swapFee: BigNumber }
    >;

    _calcTokensOutGivenExactBptIn(
      balances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    _calculateInvariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { invariant: BigNumber }>;
  };

  _MAX_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  _MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  _MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  _MAX_WEIGHTED_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

  _MIN_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

  _MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

  _calcAllTokensInGivenExactBptOut(
    balances: BigNumberish[],
    bptAmountOut: BigNumberish,
    totalBPT: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _calcLpInGivenExactTokensOut(
    balances: BigNumberish[],
    normalizedWeights: BigNumberish[],
    amountsOut: BigNumberish[],
    bptTotalSupply: BigNumberish,
    swapFeePercentage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber[]]>;

  _calcLpOutGivenExactTokensIn(
    balances: BigNumberish[],
    normalizedWeights: BigNumberish[],
    amountsIn: BigNumberish[],
    bptTotalSupply: BigNumberish,
    swapFeePercentage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, BigNumber[]]>;

  _calcDueTokenProtocolSwapFeeAmount(
    balance: BigNumberish,
    normalizedWeight: BigNumberish,
    previousInvariant: BigNumberish,
    currentInvariant: BigNumberish,
    protocolSwapFeePercentage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _calcInGivenOut(
    balanceIn: BigNumberish,
    weightIn: BigNumberish,
    balanceOut: BigNumberish,
    weightOut: BigNumberish,
    amountOut: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _calcOutGivenIn(
    balanceIn: BigNumberish,
    weightIn: BigNumberish,
    balanceOut: BigNumberish,
    weightOut: BigNumberish,
    amountIn: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  _calcTokenInGivenExactBptOut(
    balance: BigNumberish,
    normalizedWeight: BigNumberish,
    bptAmountOut: BigNumberish,
    bptTotalSupply: BigNumberish,
    swapFeePercentage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountIn: BigNumber; swapFee: BigNumber }
  >;

  _calcTokenOutGivenExactBptIn(
    balance: BigNumberish,
    normalizedWeight: BigNumberish,
    bptAmountIn: BigNumberish,
    bptTotalSupply: BigNumberish,
    swapFeePercentage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & { amountOut: BigNumber; swapFee: BigNumber }
  >;

  _calcTokensOutGivenExactBptIn(
    balances: BigNumberish[],
    bptAmountIn: BigNumberish,
    totalBPT: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  _calculateInvariant(
    normalizedWeights: BigNumberish[],
    balances: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    _MAX_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_WEIGHTED_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    _MIN_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    _calcAllTokensInGivenExactBptOut(
      balances: BigNumberish[],
      bptAmountOut: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _calcLpInGivenExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[]]>;

    _calcLpOutGivenExactTokensIn(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, BigNumber[]]>;

    _calcDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcInGivenOut(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcOutGivenIn(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcTokenInGivenExactBptOut(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountIn: BigNumber; swapFee: BigNumber }
    >;

    _calcTokenOutGivenExactBptIn(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & { amountOut: BigNumber; swapFee: BigNumber }
    >;

    _calcTokensOutGivenExactBptIn(
      balances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    _calculateInvariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    _MAX_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_IN_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_OUT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MAX_WEIGHTED_TOKENS(overrides?: CallOverrides): Promise<BigNumber>;

    _MIN_INVARIANT_RATIO(overrides?: CallOverrides): Promise<BigNumber>;

    _MIN_WEIGHT(overrides?: CallOverrides): Promise<BigNumber>;

    _calcAllTokensInGivenExactBptOut(
      balances: BigNumberish[],
      bptAmountOut: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcLpInGivenExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcLpOutGivenExactTokensIn(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcInGivenOut(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcOutGivenIn(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcTokenInGivenExactBptOut(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcTokenOutGivenExactBptIn(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calcTokensOutGivenExactBptIn(
      balances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    _calculateInvariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    _MAX_INVARIANT_RATIO(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _MAX_IN_RATIO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _MAX_OUT_RATIO(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _MAX_WEIGHTED_TOKENS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _MIN_INVARIANT_RATIO(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _MIN_WEIGHT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    _calcAllTokensInGivenExactBptOut(
      balances: BigNumberish[],
      bptAmountOut: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcLpInGivenExactTokensOut(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsOut: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcLpOutGivenExactTokensIn(
      balances: BigNumberish[],
      normalizedWeights: BigNumberish[],
      amountsIn: BigNumberish[],
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcDueTokenProtocolSwapFeeAmount(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      previousInvariant: BigNumberish,
      currentInvariant: BigNumberish,
      protocolSwapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcInGivenOut(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcOutGivenIn(
      balanceIn: BigNumberish,
      weightIn: BigNumberish,
      balanceOut: BigNumberish,
      weightOut: BigNumberish,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcTokenInGivenExactBptOut(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountOut: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcTokenOutGivenExactBptIn(
      balance: BigNumberish,
      normalizedWeight: BigNumberish,
      bptAmountIn: BigNumberish,
      bptTotalSupply: BigNumberish,
      swapFeePercentage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calcTokensOutGivenExactBptIn(
      balances: BigNumberish[],
      bptAmountIn: BigNumberish,
      totalBPT: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    _calculateInvariant(
      normalizedWeights: BigNumberish[],
      balances: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
