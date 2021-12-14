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
import type { TestERC20, TestERC20Interface } from "../TestERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
    ],
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
  "0x608060405234801561001057600080fd5b50604051610a4d380380610a4d83398101604081905261002f916101ab565b604080518082018252601f81527f5265717569656d2050616972204c69717569646974792050726f7669646572006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f4d949f5c4c4f80d7bdbde28a36135fecf440532cf0f2bb46c4801ec3299b1062818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c0909101909252815191012060035561011d3382610123565b506101ea565b8060008082825461013491906101c4565b90915550506001600160a01b038216600090815260016020526040812080548392906101619084906101c4565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6000602082840312156101bd57600080fd5b5051919050565b600082198211156101e557634e487b7160e01b600052601160045260246000fd5b500190565b610854806101f96000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80633644e5151161008c57806395d89b411161006657806395d89b41146101fd578063a9059cbb14610220578063d505accf14610233578063dd62ed3e1461024857600080fd5b80633644e515146101b457806370a08231146101bd5780637ecebe00146101dd57600080fd5b806306fdde03146100d4578063095ea7b31461012657806318160ddd1461014957806323b872dd1461016057806330adf81f14610173578063313ce5671461019a575b600080fd5b6101106040518060400160405280601f81526020017f5265717569656d2050616972204c69717569646974792050726f76696465720081525081565b60405161011d919061061f565b60405180910390f35b610139610134366004610690565b610273565b604051901515815260200161011d565b61015260005481565b60405190815260200161011d565b61013961016e3660046106ba565b610289565b6101527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101a2601281565b60405160ff909116815260200161011d565b61015260035481565b6101526101cb3660046106f6565b60016020526000908152604090205481565b6101526101eb3660046106f6565b60046020526000908152604090205481565b61011060405180604001604052806004815260200163052504c560e41b81525081565b61013961022e366004610690565b610303565b610246610241366004610718565b610310565b005b61015261025636600461078b565b600260209081526000928352604080842090915290825290205481565b600061028033848461051c565b50600192915050565b6001600160a01b0383166000908152600260209081526040808320338452909152812054600019146102ee576001600160a01b0384166000908152600260209081526040808320338452909152812080548492906102e89084906107d4565b90915550505b6102f984848461057e565b5060019392505050565b600061028033848461057e565b428410156103545760405162461bcd60e51b815260206004820152600c60248201526b1493140e881156141254915160a21b60448201526064015b60405180910390fd5b6003546001600160a01b038816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b9190876103a7836107eb565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e0016040516020818303038152906040528051906020012060405160200161042092919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa15801561048b573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906104c15750886001600160a01b0316816001600160a01b0316145b6105065760405162461bcd60e51b8152602060048201526016602482015275524c503a20494e56414c49445f5349474e415455524560501b604482015260640161034b565b61051189898961051c565b505050505050505050565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6001600160a01b038316600090815260016020526040812080548392906105a69084906107d4565b90915550506001600160a01b038216600090815260016020526040812080548392906105d3908490610806565b92505081905550816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161057191815260200190565b600060208083528351808285015260005b8181101561064c57858101830151858201604001528201610630565b8181111561065e576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461068b57600080fd5b919050565b600080604083850312156106a357600080fd5b6106ac83610674565b946020939093013593505050565b6000806000606084860312156106cf57600080fd5b6106d884610674565b92506106e660208501610674565b9150604084013590509250925092565b60006020828403121561070857600080fd5b61071182610674565b9392505050565b600080600080600080600060e0888a03121561073357600080fd5b61073c88610674565b965061074a60208901610674565b95506040880135945060608801359350608088013560ff8116811461076e57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561079e57600080fd5b6107a783610674565b91506107b560208401610674565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156107e6576107e66107be565b500390565b60006000198214156107ff576107ff6107be565b5060010190565b60008219821115610819576108196107be565b50019056fea26469706673582212206260ec427d3dab673f11bf773404a22367c645ec32a45a3387efc165147c15ab64736f6c634300080a0033";

export class TestERC20__factory extends ContractFactory {
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
    _totalSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestERC20> {
    return super.deploy(_totalSupply, overrides || {}) as Promise<TestERC20>;
  }
  getDeployTransaction(
    _totalSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_totalSupply, overrides || {});
  }
  attach(address: string): TestERC20 {
    return super.attach(address) as TestERC20;
  }
  connect(signer: Signer): TestERC20__factory {
    return super.connect(signer) as TestERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestERC20Interface {
    return new utils.Interface(_abi) as TestERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestERC20 {
    return new Contract(address, _abi, signerOrProvider) as TestERC20;
  }
}
