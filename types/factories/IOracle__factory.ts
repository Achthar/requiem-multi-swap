/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IOracle, IOracleInterface } from "../IOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "consult",
    outputs: [
      {
        internalType: "uint144",
        name: "_amountOut",
        type: "uint144",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sideToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "consultDollarPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "_dollarPrice",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
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
  {
    inputs: [],
    name: "nextEpochPoint",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "twap",
    outputs: [
      {
        internalType: "uint144",
        name: "_amountOut",
        type: "uint144",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sideToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
    ],
    name: "twapDollarPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateCumulative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IOracle__factory {
  static readonly abi = _abi;
  static createInterface(): IOracleInterface {
    return new utils.Interface(_abi) as IOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOracle {
    return new Contract(address, _abi, signerOrProvider) as IOracle;
  }
}
