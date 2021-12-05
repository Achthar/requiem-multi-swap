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
  StakePoolRewardMultiplierMock,
  StakePoolRewardMultiplierMockInterface,
} from "../StakePoolRewardMultiplierMock";

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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_to",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardPerBlock",
        type: "uint256",
      },
    ],
    name: "getRewardMultiplier",
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
  "0x608060405234801561001057600080fd5b506040516102f33803806102f383398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b6102948061005f6000396000f3fe608060405234801561001057600080fd5b506004361061002a5760003560e01c80629fc0471461002f575b600080fd5b61004261003d366004610165565b610054565b60405190815260200160405180910390f35b600061008b670de0b6b3a764000061008560005461007f8661007f8a8a61009590919063ffffffff16565b906100aa565b906100b6565b9695505050505050565b60006100a3838360016100c2565b9392505050565b60006100a382846101cf565b60006100a3828461020c565b60006100d184841115836100e6565b60006100dd8486610247565b95945050505050565b816100f4576100f4816100f8565b5050565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b600080600080600060a0868803121561017d57600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610207576102076101a0565b500290565b600082610242577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015610259576102596101a0565b50039056fea26469706673582212208d982755a131b64b61ecd20f54f4202676da63ef9c068ad16aab4a9065f8532f64736f6c634300080a0033";

export class StakePoolRewardMultiplierMock__factory extends ContractFactory {
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
  ): Promise<StakePoolRewardMultiplierMock> {
    return super.deploy(
      _rate,
      overrides || {}
    ) as Promise<StakePoolRewardMultiplierMock>;
  }
  getDeployTransaction(
    _rate: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_rate, overrides || {});
  }
  attach(address: string): StakePoolRewardMultiplierMock {
    return super.attach(address) as StakePoolRewardMultiplierMock;
  }
  connect(signer: Signer): StakePoolRewardMultiplierMock__factory {
    return super.connect(signer) as StakePoolRewardMultiplierMock__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakePoolRewardMultiplierMockInterface {
    return new utils.Interface(_abi) as StakePoolRewardMultiplierMockInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakePoolRewardMultiplierMock {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StakePoolRewardMultiplierMock;
  }
}
