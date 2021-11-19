/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ITemporarilyPausableFlashLoan,
  ITemporarilyPausableFlashLoanInterface,
} from "../ITemporarilyPausableFlashLoan";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
    ],
    name: "PausedStateChangedFlashLoan",
    type: "event",
  },
  {
    inputs: [],
    name: "getPausedStateFlashLoan",
    outputs: [
      {
        internalType: "bool",
        name: "paused",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "pauseWindowEndTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bufferPeriodEndTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class ITemporarilyPausableFlashLoan__factory {
  static readonly abi = _abi;
  static createInterface(): ITemporarilyPausableFlashLoanInterface {
    return new utils.Interface(_abi) as ITemporarilyPausableFlashLoanInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITemporarilyPausableFlashLoan {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ITemporarilyPausableFlashLoan;
  }
}