/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { WROSE, WROSEInterface } from "../WROSE";

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
    stateMutability: "payable",
    type: "fallback",
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
  "0x60c0604052600c60808190526b5772617070656420524f534560a01b60a090815261002d916000919061007a565b506040805180820190915260058082526457524f534560d81b602090920191825261005a9160019161007a565b506002805460ff1916600a17905534801561007457600080fd5b5061014d565b82805461008690610113565b90600052602060002090601f0160209004810192826100a857600085556100ee565b82601f106100c157805160ff19168380011785556100ee565b828001600101855582156100ee579182015b828111156100ee5782518255916020019190600101906100d3565b506100fa9291506100fe565b5090565b5b808211156100fa57600081556001016100ff565b600181811c9082168061012757607f821691505b60208210810361014757634e487b7160e01b600052602260045260246000fd5b50919050565b6108d48061015c6000396000f3fe6080604052600436106100bc5760003560e01c8063313ce56711610074578063a9059cbb1161004e578063a9059cbb146101ec578063d0e30db0146100bc578063dd62ed3e1461020c576100bc565b8063313ce5671461017e57806370a08231146101aa57806395d89b41146101d7576100bc565b806318160ddd116100a557806318160ddd1461012157806323b872dd1461013e5780632e1a7d4d1461015e576100bc565b806306fdde03146100c6578063095ea7b3146100f1575b6100c4610244565b005b3480156100d257600080fd5b506100db61029f565b6040516100e89190610684565b60405180910390f35b3480156100fd57600080fd5b5061011161010c366004610720565b61032d565b60405190151581526020016100e8565b34801561012d57600080fd5b50475b6040519081526020016100e8565b34801561014a57600080fd5b5061011161015936600461074a565b6103a6565b34801561016a57600080fd5b506100c4610179366004610786565b6105bd565b34801561018a57600080fd5b506002546101989060ff1681565b60405160ff90911681526020016100e8565b3480156101b657600080fd5b506101306101c536600461079f565b60036020526000908152604090205481565b3480156101e357600080fd5b506100db610663565b3480156101f857600080fd5b50610111610207366004610720565b610670565b34801561021857600080fd5b506101306102273660046107ba565b600460209081526000928352604080842090915290825290205481565b336000908152600360205260408120805434929061026390849061081c565b909155505060405134815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2565b600080546102ac90610834565b80601f01602080910402602001604051908101604052809291908181526020018280546102d890610834565b80156103255780601f106102fa57610100808354040283529160200191610325565b820191906000526020600020905b81548152906001019060200180831161030857829003601f168201915b505050505081565b33600081815260046020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103959086815260200190565b60405180910390a350600192915050565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120548211156103d857600080fd5b73ffffffffffffffffffffffffffffffffffffffff8416331480159061044e575073ffffffffffffffffffffffffffffffffffffffff841660009081526004602090815260408083203384529091529020547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff14155b156104d65773ffffffffffffffffffffffffffffffffffffffff8416600090815260046020908152604080832033845290915290205482111561049057600080fd5b73ffffffffffffffffffffffffffffffffffffffff84166000908152600460209081526040808320338452909152812080548492906104d0908490610887565b90915550505b73ffffffffffffffffffffffffffffffffffffffff84166000908152600360205260408120805484929061050b908490610887565b909155505073ffffffffffffffffffffffffffffffffffffffff83166000908152600360205260408120805484929061054590849061081c565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516105ab91815260200190565b60405180910390a35060019392505050565b336000908152600360205260409020548111156105d957600080fd5b33600090815260036020526040812080548392906105f8908490610887565b9091555050604051339082156108fc029083906000818181858888f1935050505015801561062a573d6000803e3d6000fd5b5060405181815233907f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b659060200160405180910390a250565b600180546102ac90610834565b600061067d3384846103a6565b9392505050565b600060208083528351808285015260005b818110156106b157858101830151858201604001528201610695565b818111156106c3576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461071b57600080fd5b919050565b6000806040838503121561073357600080fd5b61073c836106f7565b946020939093013593505050565b60008060006060848603121561075f57600080fd5b610768846106f7565b9250610776602085016106f7565b9150604084013590509250925092565b60006020828403121561079857600080fd5b5035919050565b6000602082840312156107b157600080fd5b61067d826106f7565b600080604083850312156107cd57600080fd5b6107d6836106f7565b91506107e4602084016106f7565b90509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561082f5761082f6107ed565b500190565b600181811c9082168061084857607f821691505b602082108103610881577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b600082821015610899576108996107ed565b50039056fea2646970667358221220cb3caf6aa68c0de49dba1b782c0d9b8136680cbcaa453cfb85d75a6bffc3523d64736f6c634300080d0033";

export class WROSE__factory extends ContractFactory {
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
  ): Promise<WROSE> {
    return super.deploy(overrides || {}) as Promise<WROSE>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WROSE {
    return super.attach(address) as WROSE;
  }
  connect(signer: Signer): WROSE__factory {
    return super.connect(signer) as WROSE__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WROSEInterface {
    return new utils.Interface(_abi) as WROSEInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WROSE {
    return new Contract(address, _abi, signerOrProvider) as WROSE;
  }
}
