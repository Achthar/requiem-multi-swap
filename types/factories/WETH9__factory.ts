/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WETH9, WETH9Interface } from "../WETH9";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "guy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "guy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "src",
        type: "address",
      },
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wad",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c0604052600d60808190526c2bb930b83832b21022ba3432b960991b60a090815261002e916000919061007a565b50604080518082019091526004808252630ae8aa8960e31b602090920191825261005a9160019161007a565b506002805460ff1916601217905534801561007457600080fd5b5061014e565b82805461008690610113565b90600052602060002090601f0160209004810192826100a857600085556100ee565b82601f106100c157805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ee5782518255916020019190600101906100d3565b506100fa9291506100fe565b5090565b5b808211156100fa57600081556001016100ff565b600181811c9082168061012757607f821691505b6020821081141561014857634e487b7160e01b600052602260045260246000fd5b50919050565b6108198061015d6000396000f3fe60806040526004361061009c5760003560e01c8063313ce56711610064578063313ce5671461015b57806370a082311461018757806395d89b41146101b4578063a9059cbb146101c9578063d0e30db0146101e9578063dd62ed3e146101f157600080fd5b806306fdde03146100a1578063095ea7b3146100cc57806318160ddd146100fc57806323b872dd146101195780632e1a7d4d14610139575b600080fd5b3480156100ad57600080fd5b506100b6610229565b6040516100c39190610625565b60405180910390f35b3480156100d857600080fd5b506100ec6100e7366004610696565b6102b7565b60405190151581526020016100c3565b34801561010857600080fd5b50475b6040519081526020016100c3565b34801561012557600080fd5b506100ec6101343660046106c0565b610323565b34801561014557600080fd5b506101596101543660046106fc565b6104e6565b005b34801561016757600080fd5b506002546101759060ff1681565b60405160ff90911681526020016100c3565b34801561019357600080fd5b5061010b6101a2366004610715565b60036020526000908152604090205481565b3480156101c057600080fd5b506100b66105a9565b3480156101d557600080fd5b506100ec6101e4366004610696565b6105b6565b6101596105ca565b3480156101fd57600080fd5b5061010b61020c366004610730565b600460209081526000928352604080842090915290825290205481565b6000805461023690610763565b80601f016020809104026020016040519081016040528092919081815260200182805461026290610763565b80156102af5780601f10610284576101008083540402835291602001916102af565b820191906000526020600020905b81548152906001019060200180831161029257829003601f168201915b505050505081565b3360008181526004602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103129086815260200190565b60405180910390a350600192915050565b6001600160a01b03831660009081526003602052604081205482111561036a5760405162461bcd60e51b815260206004820152600060248201526044015b60405180910390fd5b6001600160a01b03841633148015906103a857506001600160a01b038416600090815260046020908152604080832033845290915290205460001914155b15610433576001600160a01b03841660009081526004602090815260408083203384529091529020548211156103fa5760405162461bcd60e51b81526020600482015260006024820152604401610361565b6001600160a01b03841660009081526004602090815260408083203384529091528120805484929061042d9084906107b4565b90915550505b6001600160a01b0384166000908152600360205260408120805484929061045b9084906107b4565b90915550506001600160a01b038316600090815260036020526040812080548492906104889084906107cb565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516104d491815260200190565b60405180910390a35060019392505050565b3360009081526003602052604090205481111561051f5760405162461bcd60e51b81526020600482015260006024820152604401610361565b336000908152600360205260408120805483929061053e9084906107b4565b9091555050604051339082156108fc029083906000818181858888f19350505050158015610570573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b6001805461023690610763565b60006105c3338484610323565b9392505050565b33600090815260036020526040812080543492906105e99084906107cb565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b600060208083528351808285015260005b8181101561065257858101830151858201604001528201610636565b81811115610664576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461069157600080fd5b919050565b600080604083850312156106a957600080fd5b6106b28361067a565b946020939093013593505050565b6000806000606084860312156106d557600080fd5b6106de8461067a565b92506106ec6020850161067a565b9150604084013590509250925092565b60006020828403121561070e57600080fd5b5035919050565b60006020828403121561072757600080fd5b6105c38261067a565b6000806040838503121561074357600080fd5b61074c8361067a565b915061075a6020840161067a565b90509250929050565b600181811c9082168061077757607f821691505b6020821081141561079857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156107c6576107c661079e565b500390565b600082198211156107de576107de61079e565b50019056fea2646970667358221220a5f63802bbe6558051a48c2daa8e37105ec3b2b1000589b7f7e33178df3032bb64736f6c634300080b0033";

export class WETH9__factory extends ContractFactory {
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
  ): Promise<WETH9> {
    return super.deploy(overrides || {}) as Promise<WETH9>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WETH9 {
    return super.attach(address) as WETH9;
  }
  connect(signer: Signer): WETH9__factory {
    return super.connect(signer) as WETH9__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WETH9Interface {
    return new utils.Interface(_abi) as WETH9Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WETH9 {
    return new Contract(address, _abi, signerOrProvider) as WETH9;
  }
}
