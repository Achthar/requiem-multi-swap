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

interface RequiemStableSwapLibInterface extends ethers.utils.Interface {
  functions: {
    "A_PRECISION()": FunctionFragment;
    "FEE_DENOMINATOR()": FunctionFragment;
    "POOL_TOKEN_COMMON_DECIMALS()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "A_PRECISION",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "FEE_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "POOL_TOKEN_COMMON_DECIMALS",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "A_PRECISION",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "FEE_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "POOL_TOKEN_COMMON_DECIMALS",
    data: BytesLike
  ): Result;

  events: {
    "AddLiquidity(address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "FlashLoan(address,address,uint256,uint256)": EventFragment;
    "RemoveLiquidity(address,uint256[],uint256[],uint256)": EventFragment;
    "RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)": EventFragment;
    "RemoveLiquidityOne(address,uint256,uint256,uint256)": EventFragment;
    "TokenExchange(address,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FlashLoan"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityImbalance"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RemoveLiquidityOne"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenExchange"): EventFragment;
}

export type AddLiquidityEvent = TypedEvent<
  [string, BigNumber[], BigNumber[], BigNumber, BigNumber] & {
    provider: string;
    token_amounts: BigNumber[];
    fees: BigNumber[];
    invariant: BigNumber;
    token_supply: BigNumber;
  }
>;

export type FlashLoanEvent = TypedEvent<
  [string, string, BigNumber, BigNumber] & {
    recipient: string;
    token: string;
    amount: BigNumber;
    feeAmount: BigNumber;
  }
>;

export type RemoveLiquidityEvent = TypedEvent<
  [string, BigNumber[], BigNumber[], BigNumber] & {
    provider: string;
    token_amounts: BigNumber[];
    fees: BigNumber[];
    token_supply: BigNumber;
  }
>;

export type RemoveLiquidityImbalanceEvent = TypedEvent<
  [string, BigNumber[], BigNumber[], BigNumber, BigNumber] & {
    provider: string;
    token_amounts: BigNumber[];
    fees: BigNumber[];
    invariant: BigNumber;
    token_supply: BigNumber;
  }
>;

export type RemoveLiquidityOneEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber] & {
    provider: string;
    index: BigNumber;
    token_amount: BigNumber;
    coin_amount: BigNumber;
  }
>;

export type TokenExchangeEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber] & {
    buyer: string;
    sold_id: BigNumber;
    tokens_sold: BigNumber;
    bought_id: BigNumber;
    tokens_bought: BigNumber;
  }
>;

export class RequiemStableSwapLib extends BaseContract {
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

  interface: RequiemStableSwapLibInterface;

  functions: {
    A_PRECISION(overrides?: CallOverrides): Promise<[BigNumber]>;

    FEE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    POOL_TOKEN_COMMON_DECIMALS(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  A_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

  FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  POOL_TOKEN_COMMON_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    A_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    POOL_TOKEN_COMMON_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "AddLiquidity(address,uint256[],uint256[],uint256,uint256)"(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      invariant?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        invariant: BigNumber;
        token_supply: BigNumber;
      }
    >;

    AddLiquidity(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      invariant?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        invariant: BigNumber;
        token_supply: BigNumber;
      }
    >;

    "FlashLoan(address,address,uint256,uint256)"(
      recipient?: string | null,
      token?: string | null,
      amount?: null,
      feeAmount?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber],
      {
        recipient: string;
        token: string;
        amount: BigNumber;
        feeAmount: BigNumber;
      }
    >;

    FlashLoan(
      recipient?: string | null,
      token?: string | null,
      amount?: null,
      feeAmount?: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber],
      {
        recipient: string;
        token: string;
        amount: BigNumber;
        feeAmount: BigNumber;
      }
    >;

    "RemoveLiquidity(address,uint256[],uint256[],uint256)"(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        token_supply: BigNumber;
      }
    >;

    RemoveLiquidity(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        token_supply: BigNumber;
      }
    >;

    "RemoveLiquidityImbalance(address,uint256[],uint256[],uint256,uint256)"(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      invariant?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        invariant: BigNumber;
        token_supply: BigNumber;
      }
    >;

    RemoveLiquidityImbalance(
      provider?: string | null,
      token_amounts?: null,
      fees?: null,
      invariant?: null,
      token_supply?: null
    ): TypedEventFilter<
      [string, BigNumber[], BigNumber[], BigNumber, BigNumber],
      {
        provider: string;
        token_amounts: BigNumber[];
        fees: BigNumber[];
        invariant: BigNumber;
        token_supply: BigNumber;
      }
    >;

    "RemoveLiquidityOne(address,uint256,uint256,uint256)"(
      provider?: string | null,
      index?: null,
      token_amount?: null,
      coin_amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        provider: string;
        index: BigNumber;
        token_amount: BigNumber;
        coin_amount: BigNumber;
      }
    >;

    RemoveLiquidityOne(
      provider?: string | null,
      index?: null,
      token_amount?: null,
      coin_amount?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        provider: string;
        index: BigNumber;
        token_amount: BigNumber;
        coin_amount: BigNumber;
      }
    >;

    "TokenExchange(address,uint256,uint256,uint256,uint256)"(
      buyer?: string | null,
      sold_id?: null,
      tokens_sold?: null,
      bought_id?: null,
      tokens_bought?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        buyer: string;
        sold_id: BigNumber;
        tokens_sold: BigNumber;
        bought_id: BigNumber;
        tokens_bought: BigNumber;
      }
    >;

    TokenExchange(
      buyer?: string | null,
      sold_id?: null,
      tokens_sold?: null,
      bought_id?: null,
      tokens_bought?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber, BigNumber],
      {
        buyer: string;
        sold_id: BigNumber;
        tokens_sold: BigNumber;
        bought_id: BigNumber;
        tokens_bought: BigNumber;
      }
    >;
  };

  estimateGas: {
    A_PRECISION(overrides?: CallOverrides): Promise<BigNumber>;

    FEE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    POOL_TOKEN_COMMON_DECIMALS(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    A_PRECISION(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    FEE_DENOMINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    POOL_TOKEN_COMMON_DECIMALS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
