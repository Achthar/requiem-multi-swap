/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RequiemMock, RequiemMockInterface } from "../RequiemMock";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "isPair",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
    ],
    name: "setIsPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610195806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632410d8871461003b578063e5e31b13146100a1575b600080fd5b61009f610049366004610101565b73ffffffffffffffffffffffffffffffffffffffff91909116600090815260208190526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b005b6100c46100af36600461013d565b60006020819052908152604090205460ff1681565b604051901515815260200160405180910390f35b803573ffffffffffffffffffffffffffffffffffffffff811681146100fc57600080fd5b919050565b6000806040838503121561011457600080fd5b61011d836100d8565b91506020830135801515811461013257600080fd5b809150509250929050565b60006020828403121561014f57600080fd5b610158826100d8565b939250505056fea26469706673582212206934c4aa8d74e9cb5e58dbae9d2e35f6da85ce95adeceac455dd79131006530e64736f6c634300080a0033";

export class RequiemMock__factory extends ContractFactory {
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
  ): Promise<RequiemMock> {
    return super.deploy(overrides || {}) as Promise<RequiemMock>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RequiemMock {
    return super.attach(address) as RequiemMock;
  }
  connect(signer: Signer): RequiemMock__factory {
    return super.connect(signer) as RequiemMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemMockInterface {
    return new utils.Interface(_abi) as RequiemMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemMock {
    return new Contract(address, _abi, signerOrProvider) as RequiemMock;
  }
}
