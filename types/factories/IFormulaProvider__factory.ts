/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IFormulaProvider,
  IFormulaProviderInterface,
} from "../IFormulaProvider";

const _abi = [
  {
    inputs: [],
    name: "formula",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "weightedMath",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IFormulaProvider__factory {
  static readonly abi = _abi;
  static createInterface(): IFormulaProviderInterface {
    return new utils.Interface(_abi) as IFormulaProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFormulaProvider {
    return new Contract(address, _abi, signerOrProvider) as IFormulaProvider;
  }
}
