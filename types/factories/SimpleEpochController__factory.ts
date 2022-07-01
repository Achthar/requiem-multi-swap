/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SimpleEpochController,
  SimpleEpochControllerInterface,
} from "../SimpleEpochController";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "_epoch",
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
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "allocateReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "allocator",
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
    name: "epochLength",
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
    name: "lastEpochTime",
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
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "nextEpochAllocatedReward",
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
    name: "nextEpochLength",
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
    inputs: [],
    name: "owner",
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
    inputs: [
      {
        internalType: "address",
        name: "_allocator",
        type: "address",
      },
    ],
    name: "setAllocator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805561012c60015534801561001a57600080fd5b5060048054336001600160a01b031991821681179092556003805490911690911790556108ea8061004c6000396000f3fe608060405234801561001057600080fd5b50600436106100d45760003560e01c80638da5cb5b11610081578063bf83f2a21161005b578063bf83f2a2146101aa578063c5967c26146101bd578063d673f4c3146101c557600080fd5b80638da5cb5b1461013d578063900cf0cf14610182578063aa5dcecc1461018a57600080fd5b80637effa5b6116100b25780637effa5b61461010e5780638554b0561461012157806389c614b81461013457600080fd5b806307284ce9146100d957806313af4035146100f057806357d775f814610105575b600080fd5b6001545b6040519081526020015b60405180910390f35b6101036100fe3660046107c5565b6101ce565b005b6100dd60015481565b6100dd61011c3660046107c5565b61029b565b61010361012f3660046107c5565b6103a5565b6100dd60025481565b60045461015d9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100e7565b6000546100dd565b60035461015d9073ffffffffffffffffffffffffffffffffffffffff1681565b6101036101b83660046107c5565b61054b565b6100dd610613565b6100dd60005481565b60045473ffffffffffffffffffffffffffffffffffffffff163314610254576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f53696d706c6545706f6368436f6e74726f6c6c65723a20464f5242494444454e60448201526064015b60405180910390fd5b600480547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000808273ffffffffffffffffffffffffffffffffffffffff1663f7c618c16040518163ffffffff1660e01b8152600401602060405180830381865afa1580156102e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030d91906107e2565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290915073ffffffffffffffffffffffffffffffffffffffff8216906370a0823190602401602060405180830381865afa15801561037a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061039e91906107ff565b9392505050565b60035473ffffffffffffffffffffffffffffffffffffffff163314610426576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f53696d706c6545706f6368436f6e74726f6c6c65723a20464f5242494444454e604482015260640161024b565b60006104318261029b565b905060008273ffffffffffffffffffffffffffffffffffffffff1663f7c618c16040518163ffffffff1660e01b8152600401602060405180830381865afa158015610480573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104a491906107e2565b90506104b1818484610630565b6000546104bf906001610818565b600055426002556040517fe2dcb6160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff84169063e2dcb61690602401600060405180830381600087803b15801561052e57600080fd5b505af1158015610542573d6000803e3d6000fd5b50505050505050565b60045473ffffffffffffffffffffffffffffffffffffffff1633146105cc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f53696d706c6545706f6368436f6e74726f6c6c65723a20464f5242494444454e604482015260640161024b565b600380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b600061061e60015490565b60025461062b9190610818565b905090565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f095ea7b30000000000000000000000000000000000000000000000000000000017905291516000928392908716916106c79190610857565b6000604051808303816000865af19150503d8060008114610704576040519150601f19603f3d011682016040523d82523d6000602084013e610709565b606091505b50915091508180156107335750805115806107335750808060200190518101906107339190610892565b610799576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f5472616e7366657248656c7065723a20415050524f56455f4641494c45440000604482015260640161024b565b5050505050565b73ffffffffffffffffffffffffffffffffffffffff811681146107c257600080fd5b50565b6000602082840312156107d757600080fd5b813561039e816107a0565b6000602082840312156107f457600080fd5b815161039e816107a0565b60006020828403121561081157600080fd5b5051919050565b60008219821115610852577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500190565b6000825160005b81811015610878576020818601810151858301520161085e565b81811115610887576000828501525b509190910192915050565b6000602082840312156108a457600080fd5b8151801515811461039e57600080fdfea2646970667358221220585b2c12fd89b8bd47eae0ddd1e2fdc71e28cdeb790fd84a092345c3b3d5265464736f6c634300080f0033";

export class SimpleEpochController__factory extends ContractFactory {
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
  ): Promise<SimpleEpochController> {
    return super.deploy(overrides || {}) as Promise<SimpleEpochController>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SimpleEpochController {
    return super.attach(address) as SimpleEpochController;
  }
  connect(signer: Signer): SimpleEpochController__factory {
    return super.connect(signer) as SimpleEpochController__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleEpochControllerInterface {
    return new utils.Interface(_abi) as SimpleEpochControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleEpochController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SimpleEpochController;
  }
}
