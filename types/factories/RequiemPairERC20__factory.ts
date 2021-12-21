/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RequiemPairERC20,
  RequiemPairERC20Interface,
} from "../RequiemPairERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604080518082018252601f81527f5265717569656d2050616972204c69717569646974792050726f7669646572006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f4d949f5c4c4f80d7bdbde28a36135fecf440532cf0f2bb46c4801ec3299b1062818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355610821806101046000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806306fdde03146100b4578063095ea7b31461010657806318160ddd1461012957806323b872dd1461014057806330adf81f14610153578063313ce567146101685780633644e5151461018257806370a082311461018b5780637ecebe00146101ab57806395d89b41146101cb578063a9059cbb146101ee578063d505accf14610201578063dd62ed3e14610216575b600080fd5b6100f06040518060400160405280601f81526020017f5265717569656d2050616972204c69717569646974792050726f76696465720081525081565b6040516100fd91906105cc565b60405180910390f35b61011961011436600461063d565b610241565b60405190151581526020016100fd565b61013260005481565b6040519081526020016100fd565b61011961014e366004610667565b610257565b6101326000805160206107cc83398151915281565b610170601281565b60405160ff90911681526020016100fd565b61013260035481565b6101326101993660046106a3565b60016020526000908152604090205481565b6101326101b93660046106a3565b60046020526000908152604090205481565b6100f060405180604001604052806004815260200163052504c560e41b81525081565b6101196101fc36600461063d565b6102d1565b61021461020f3660046106c5565b6102de565b005b610132610224366004610738565b600260209081526000928352604080842090915290825290205481565b600061024e3384846104c9565b50600192915050565b6001600160a01b0383166000908152600260209081526040808320338452909152812054600019146102bc576001600160a01b0384166000908152600260209081526040808320338452909152812080548492906102b6908490610781565b90915550505b6102c784848461052b565b5060019392505050565b600061024e33848461052b565b428410156103225760405162461bcd60e51b815260206004820152600c60248201526b1493140e881156141254915160a21b60448201526064015b60405180910390fd5b6003546001600160a01b038816600090815260046020526040812080549192916000805160206107cc833981519152918b918b918b91908761036383610798565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016103dc92919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa158015610447573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381161580159061047d5750886001600160a01b0316816001600160a01b0316145b6104b35760405162461bcd60e51b8152602060048201526007602482015266524c503a20495360c81b6044820152606401610319565b6104be8989896104c9565b505050505050505050565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b03831660009081526001602052604081208054839290610553908490610781565b90915550506001600160a01b038216600090815260016020526040812080548392906105809084906107b3565b92505081905550816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161051e91815260200190565b600060208083528351808285015260005b818110156105f9578581018301518582016040015282016105dd565b8181111561060b576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461063857600080fd5b919050565b6000806040838503121561065057600080fd5b61065983610621565b946020939093013593505050565b60008060006060848603121561067c57600080fd5b61068584610621565b925061069360208501610621565b9150604084013590509250925092565b6000602082840312156106b557600080fd5b6106be82610621565b9392505050565b600080600080600080600060e0888a0312156106e057600080fd5b6106e988610621565b96506106f760208901610621565b95506040880135945060608801359350608088013560ff8116811461071b57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561074b57600080fd5b61075483610621565b915061076260208401610621565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156107935761079361076b565b500390565b60006000198214156107ac576107ac61076b565b5060010190565b600082198211156107c6576107c661076b565b50019056fe6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9a264697066735822122066dae2e8d617b784ceff6c21abead8a262f9cf9567439f2c32bea0a1a7451b0064736f6c634300080a0033";

export class RequiemPairERC20__factory extends ContractFactory {
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
  ): Promise<RequiemPairERC20> {
    return super.deploy(overrides || {}) as Promise<RequiemPairERC20>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RequiemPairERC20 {
    return super.attach(address) as RequiemPairERC20;
  }
  connect(signer: Signer): RequiemPairERC20__factory {
    return super.connect(signer) as RequiemPairERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemPairERC20Interface {
    return new utils.Interface(_abi) as RequiemPairERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemPairERC20 {
    return new Contract(address, _abi, signerOrProvider) as RequiemPairERC20;
  }
}
