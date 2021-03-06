/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakePoolRewardRebaserMock,
  StakePoolRewardRebaserMockInterface,
} from "../StakePoolRewardRebaserMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "baseAmount",
        type: "uint256",
      },
    ],
    name: "getRebaseAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161021638038061021683398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b6101b78061005f6000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80632e81056614610030575b600080fd5b61004361003e36600461009d565b610055565b60405190815260200160405180910390f35b600061007e670de0b6b3a76400006100786000548561008590919063ffffffff16565b90610091565b9392505050565b600061007e82846100e2565b600061007e8284610146565b600080604083850312156100b057600080fd5b823573ffffffffffffffffffffffffffffffffffffffff811681146100d457600080fd5b946020939093013593505050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610141577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500290565b60008261017c577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea2646970667358221220500c77a78d62659c4ebdee5e5099a0f24ab5edab8b559f920142e5304cfa3fca64736f6c634300080f0033";

export class StakePoolRewardRebaserMock__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakePoolRewardRebaserMock> {
    return super.deploy(
      _rate,
      overrides || {}
    ) as Promise<StakePoolRewardRebaserMock>;
  }
  getDeployTransaction(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_rate, overrides || {});
  }
  attach(address: string): StakePoolRewardRebaserMock {
    return super.attach(address) as StakePoolRewardRebaserMock;
  }
  connect(signer: Signer): StakePoolRewardRebaserMock__factory {
    return super.connect(signer) as StakePoolRewardRebaserMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakePoolRewardRebaserMockInterface {
    return new utils.Interface(_abi) as StakePoolRewardRebaserMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakePoolRewardRebaserMock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StakePoolRewardRebaserMock;
  }
}
