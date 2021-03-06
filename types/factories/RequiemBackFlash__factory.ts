/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  RequiemBackFlash,
  RequiemBackFlashInterface,
} from "../RequiemBackFlash";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "backTrades",
        type: "address[]",
      },
    ],
    name: "backwardTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class RequiemBackFlash__factory {
  static readonly abi = _abi;
  static createInterface(): RequiemBackFlashInterface {
    return new utils.Interface(_abi) as RequiemBackFlashInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemBackFlash {
    return new Contract(address, _abi, signerOrProvider) as RequiemBackFlash;
  }
}
