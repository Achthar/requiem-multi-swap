/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IRequiemCallee,
  IRequiemCalleeInterface,
} from "../IRequiemCallee";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "requiemCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IRequiemCallee__factory {
  static readonly abi = _abi;
  static createInterface(): IRequiemCalleeInterface {
    return new utils.Interface(_abi) as IRequiemCalleeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRequiemCallee {
    return new Contract(address, _abi, signerOrProvider) as IRequiemCallee;
  }
}