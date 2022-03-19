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
  "0x608060405234801561001057600080fd5b50604080518082018252601f81527f5265717569656d2050616972204c69717569646974792050726f7669646572006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f4d949f5c4c4f80d7bdbde28a36135fecf440532cf0f2bb46c4801ec3299b1062818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c09091019092528151910120600355610a3b806101046000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80633644e5151161008c57806395d89b411161006657806395d89b411461020d578063a9059cbb14610249578063d505accf1461025c578063dd62ed3e1461027157600080fd5b80633644e515146101c457806370a08231146101cd5780637ecebe00146101ed57600080fd5b806323b872dd116100bd57806323b872dd1461017057806330adf81f14610183578063313ce567146101aa57600080fd5b806306fdde03146100e4578063095ea7b31461013657806318160ddd14610159575b600080fd5b6101206040518060400160405280601f81526020017f5265717569656d2050616972204c69717569646974792050726f76696465720081525081565b60405161012d91906107a5565b60405180910390f35b610149610144366004610841565b61029c565b604051901515815260200161012d565b61016260005481565b60405190815260200161012d565b61014961017e36600461086b565b6102b2565b6101627f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101b2601281565b60405160ff909116815260200161012d565b61016260035481565b6101626101db3660046108a7565b60016020526000908152604090205481565b6101626101fb3660046108a7565b60046020526000908152604090205481565b6101206040518060400160405280600481526020017f52504c500000000000000000000000000000000000000000000000000000000081525081565b610149610257366004610841565b610364565b61026f61026a3660046108c9565b610371565b005b61016261027f36600461093c565b600260209081526000928352604080842090915290825290205481565b60006102a9338484610661565b50600192915050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1461034f5773ffffffffffffffffffffffffffffffffffffffff841660009081526002602090815260408083203384529091528120805484929061034990849061099e565b90915550505b61035a8484846106d0565b5060019392505050565b60006102a93384846106d0565b428410156103e0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f524c503a2045585049524544000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60035473ffffffffffffffffffffffffffffffffffffffff8816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b919087610440836109b5565b9091555060408051602081019690965273ffffffffffffffffffffffffffffffffffffffff94851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016104e19291907f190100000000000000000000000000000000000000000000000000000000000081526002810192909252602282015260420190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa15801561056a573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff8116158015906105e557508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b61064b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f524c503a2049530000000000000000000000000000000000000000000000000060448201526064016103d7565b610656898989610661565b505050505050505050565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260408120805483929061070590849061099e565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260408120805483929061073f9084906109ed565b925050819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516106c391815260200190565b600060208083528351808285015260005b818110156107d2578581018301518582016040015282016107b6565b818111156107e4576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461083c57600080fd5b919050565b6000806040838503121561085457600080fd5b61085d83610818565b946020939093013593505050565b60008060006060848603121561088057600080fd5b61088984610818565b925061089760208501610818565b9150604084013590509250925092565b6000602082840312156108b957600080fd5b6108c282610818565b9392505050565b600080600080600080600060e0888a0312156108e457600080fd5b6108ed88610818565b96506108fb60208901610818565b95506040880135945060608801359350608088013560ff8116811461091f57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561094f57600080fd5b61095883610818565b915061096660208401610818565b90509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156109b0576109b061096f565b500390565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036109e6576109e661096f565b5060010190565b60008219821115610a0057610a0061096f565b50019056fea2646970667358221220c9840913cca5d8f908f73abc966de49a263a222b1abe19a20f4734636590712264736f6c634300080d0033";

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
