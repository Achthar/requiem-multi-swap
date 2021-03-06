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
  "0x60c0604052600d60809081526c2bb930b83832b21022ba3432b960991b60a05260009061002c9082610114565b506040805180820190915260048152630ae8aa8960e31b60208201526001906100559082610114565b506002805460ff1916601217905534801561006f57600080fd5b506101d3565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061009f57607f821691505b6020821081036100bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561010f57600081815260208120601f850160051c810160208610156100ec5750805b601f850160051c820191505b8181101561010b578281556001016100f8565b5050505b505050565b81516001600160401b0381111561012d5761012d610075565b6101418161013b845461008b565b846100c5565b602080601f831160018114610176576000841561015e5750858301515b600019600386901b1c1916600185901b17855561010b565b600085815260208120601f198616915b828110156101a557888601518255948401946001909101908401610186565b50858210156101c35787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610983806101e26000396000f3fe6080604052600436106100bc5760003560e01c8063313ce56711610074578063a9059cbb1161004e578063a9059cbb146101e9578063d0e30db014610209578063dd62ed3e1461021157600080fd5b8063313ce5671461017b57806370a08231146101a757806395d89b41146101d457600080fd5b806318160ddd116100a557806318160ddd1461011c57806323b872dd146101395780632e1a7d4d1461015957600080fd5b806306fdde03146100c1578063095ea7b3146100ec575b600080fd5b3480156100cd57600080fd5b506100d6610249565b6040516100e39190610733565b60405180910390f35b3480156100f857600080fd5b5061010c6101073660046107cf565b6102d7565b60405190151581526020016100e3565b34801561012857600080fd5b50475b6040519081526020016100e3565b34801561014557600080fd5b5061010c6101543660046107f9565b610350565b34801561016557600080fd5b50610179610174366004610835565b6105da565b005b34801561018757600080fd5b506002546101959060ff1681565b60405160ff90911681526020016100e3565b3480156101b357600080fd5b5061012b6101c236600461084e565b60036020526000908152604090205481565b3480156101e057600080fd5b506100d66106b7565b3480156101f557600080fd5b5061010c6102043660046107cf565b6106c4565b6101796106d8565b34801561021d57600080fd5b5061012b61022c366004610869565b600460209081526000928352604080842090915290825290205481565b600080546102569061089c565b80601f01602080910402602001604051908101604052809291908181526020018280546102829061089c565b80156102cf5780601f106102a4576101008083540402835291602001916102cf565b820191906000526020600020905b8154815290600101906020018083116102b257829003601f168201915b505050505081565b33600081815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259061033f9086815260200190565b60405180910390a350600192915050565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120548211156103be576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600060248201526044015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff84163314801590610434575073ffffffffffffffffffffffffffffffffffffffff841660009081526004602090815260408083203384529091529020547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff14155b156104f35773ffffffffffffffffffffffffffffffffffffffff841660009081526004602090815260408083203384529091529020548211156104ad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600060248201526044016103b5565b73ffffffffffffffffffffffffffffffffffffffff84166000908152600460209081526040808320338452909152812080548492906104ed90849061091e565b90915550505b73ffffffffffffffffffffffffffffffffffffffff84166000908152600360205260408120805484929061052890849061091e565b909155505073ffffffffffffffffffffffffffffffffffffffff831660009081526003602052604081208054849290610562908490610935565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516105c891815260200190565b60405180910390a35060019392505050565b3360009081526003602052604090205481111561062d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600060248201526044016103b5565b336000908152600360205260408120805483929061064c90849061091e565b9091555050604051339082156108fc029083906000818181858888f1935050505015801561067e573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b600180546102569061089c565b60006106d1338484610350565b9392505050565b33600090815260036020526040812080543492906106f7908490610935565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b600060208083528351808285015260005b8181101561076057858101830151858201604001528201610744565b81811115610772576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146107ca57600080fd5b919050565b600080604083850312156107e257600080fd5b6107eb836107a6565b946020939093013593505050565b60008060006060848603121561080e57600080fd5b610817846107a6565b9250610825602085016107a6565b9150604084013590509250925092565b60006020828403121561084757600080fd5b5035919050565b60006020828403121561086057600080fd5b6106d1826107a6565b6000806040838503121561087c57600080fd5b610885836107a6565b9150610893602084016107a6565b90509250929050565b600181811c908216806108b057607f821691505b6020821081036108e9577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015610930576109306108ef565b500390565b60008219821115610948576109486108ef565b50019056fea26469706673582212203bdd908f0df3287d2f3921b31be28a8ceb71d2827b29de8040d4000881174fdb64736f6c634300080f0033";

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
