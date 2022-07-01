/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RequiemPairErrors,
  RequiemPairErrorsInterface,
} from "../RequiemPairErrors";

const _abi = [
  {
    inputs: [],
    name: "authorization",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "insufficientInput",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "insufficientLiquidity",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "insufficientOutput",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "invariant",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "params",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "zeroAddress",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x61011161003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361060885760003560e01c8063b4543c4211605f578063b4543c421460bf578063b533bfe11460c6578063cff0ab961460cd578063fc0c546a1460d457600080fd5b80630930907b14608d5780633817c86c1460aa57806391a577161460b1578063b03a9a051460b8575b600080fd5b6094600281565b60405160ff909116815260200160405180910390f35b6094600581565b6094600381565b6094600881565b6094600181565b6094600481565b6094600681565b609460078156fea26469706673582212208b6f18e5e4d2ce539bf9dbaf1956041803dbe8ea282de280af5538b592bfc6ea64736f6c634300080f0033";

export class RequiemPairErrors__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RequiemPairErrors> {
    return super.deploy(overrides || {}) as Promise<RequiemPairErrors>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RequiemPairErrors {
    return super.attach(address) as RequiemPairErrors;
  }
  connect(signer: Signer): RequiemPairErrors__factory {
    return super.connect(signer) as RequiemPairErrors__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemPairErrorsInterface {
    return new utils.Interface(_abi) as RequiemPairErrorsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemPairErrors {
    return new Contract(address, _abi, signerOrProvider) as RequiemPairErrors;
  }
}
