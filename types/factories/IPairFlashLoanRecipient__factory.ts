/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IPairFlashLoanRecipient,
  IPairFlashLoanRecipientInterface,
} from "../IPairFlashLoanRecipient";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token0",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "token1",
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
        name: "userData",
        type: "bytes",
      },
    ],
    name: "receiveFlashLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IPairFlashLoanRecipient__factory {
  static readonly abi = _abi;
  static createInterface(): IPairFlashLoanRecipientInterface {
    return new utils.Interface(_abi) as IPairFlashLoanRecipientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IPairFlashLoanRecipient {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IPairFlashLoanRecipient;
  }
}