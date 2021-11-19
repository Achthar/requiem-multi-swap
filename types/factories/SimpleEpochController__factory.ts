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
  "0x60806040526000805561012c60015534801561001a57600080fd5b5060048054336001600160a01b031991821681179092556003805490911690911790556106aa8061004c6000396000f3fe608060405234801561001057600080fd5b50600436106100a45760003560e01c806307284ce9146100a957806313af4035146100c057806357d775f8146100d55780637effa5b6146100de5780638554b056146100f157806389c614b8146101045780638da5cb5b1461010d578063900cf0cf1461012d578063aa5dcecc14610135578063bf83f2a214610148578063c5967c261461015b578063d673f4c314610163575b600080fd5b6001545b6040519081526020015b60405180910390f35b6100d36100ce366004610555565b61016c565b005b6100ad60015481565b6100ad6100ec366004610555565b6101c1565b6100d36100ff366004610555565b61029d565b6100ad60025481565b600454610120906001600160a01b031681565b6040516100b79190610572565b6000546100ad565b600354610120906001600160a01b031681565b6100d3610156366004610555565b6103b9565b6100ad610405565b6100ad60005481565b6004546001600160a01b0316331461019f5760405162461bcd60e51b815260040161019690610586565b60405180910390fd5b600480546001600160a01b0319166001600160a01b0392909216919091179055565b600080826001600160a01b031663f7c618c16040518163ffffffff1660e01b8152600401602060405180830381865afa158015610202573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061022691906105bb565b6040516370a0823160e01b81529091506001600160a01b038216906370a0823190610255903090600401610572565b602060405180830381865afa158015610272573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061029691906105d8565b9392505050565b6003546001600160a01b031633146102c75760405162461bcd60e51b815260040161019690610586565b60006102d2826101c1565b90506000826001600160a01b031663f7c618c16040518163ffffffff1660e01b8152600401602060405180830381865afa158015610314573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033891906105bb565b9050610345818484610422565b6000546103539060016105f1565b6000554260025560405163716e5b0b60e11b8152600481018390526001600160a01b0384169063e2dcb61690602401600060405180830381600087803b15801561039c57600080fd5b505af11580156103b0573d6000803e3d6000fd5b50505050505050565b6004546001600160a01b031633146103e35760405162461bcd60e51b815260040161019690610586565b600380546001600160a01b0319166001600160a01b0392909216919091179055565b600061041060015490565b60025461041d91906105f1565b905090565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b179052915160009283929087169161047e9190610617565b6000604051808303816000865af19150503d80600081146104bb576040519150601f19603f3d011682016040523d82523d6000602084013e6104c0565b606091505b50915091508180156104ea5750805115806104ea5750808060200190518101906104ea9190610652565b6105365760405162461bcd60e51b815260206004820152601e60248201527f5472616e7366657248656c7065723a20415050524f56455f4641494c454400006044820152606401610196565b5050505050565b6001600160a01b038116811461055257600080fd5b50565b60006020828403121561056757600080fd5b81356102968161053d565b6001600160a01b0391909116815260200190565b6020808252818101527f53696d706c6545706f6368436f6e74726f6c6c65723a20464f5242494444454e604082015260600190565b6000602082840312156105cd57600080fd5b81516102968161053d565b6000602082840312156105ea57600080fd5b5051919050565b6000821982111561061257634e487b7160e01b600052601160045260246000fd5b500190565b6000825160005b81811015610638576020818601810151858301520161061e565b81811115610647576000828501525b509190910192915050565b60006020828403121561066457600080fd5b8151801515811461029657600080fdfea2646970667358221220af4d4ea34ee4ff48bb8af6fec6afafac8c3f684f1a8d32d51c4d71d1de7109e664736f6c634300080a0033";

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