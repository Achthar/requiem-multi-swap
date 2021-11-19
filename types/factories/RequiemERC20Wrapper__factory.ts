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
  RequiemERC20Wrapper,
  RequiemERC20WrapperInterface,
} from "../RequiemERC20Wrapper";

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
  "0x608060405234801561001057600080fd5b50604051610bb4380380610bb483398101604081905261002f91610267565b604080518082018252601a81527f5265717569656d204c69717569646974792050726f76696465720000000000006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f2e1adfbb118fada029d9623aa0ed8dd2318a25545f57095be55dcbd209508e12818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c0909101909252815191012060035561011d3382610123565b506102a6565b61013c816000546101ca60201b6104ee1790919060201c565b60009081556001600160a01b03831681526001602090815260409091205461016d9183906104ee6101ca821b17901c565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906101be9085815260200190565b60405180910390a35050565b6000806101d78385610280565b90506101f18482101560006101f860201b6105121760201c565b9392505050565b81610210576102108161021460201b6105241760201c565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b60006020828403121561027957600080fd5b5051919050565b600082198211156102a157634e487b7160e01b600052601160045260246000fd5b500190565b6108ff806102b56000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806306fdde03146100b4578063095ea7b31461010357806318160ddd1461012657806323b872dd1461013d57806330adf81f14610150578063313ce567146101655780633644e5151461017f57806370a08231146101885780637ecebe00146101a857806395d89b41146101c8578063a9059cbb146101ea578063d505accf146101fd578063dd62ed3e14610212575b600080fd5b6100ed6040518060400160405280601a8152602001792932b8bab4b2b6902634b8bab4b234ba3c90283937bb34b232b960311b81525081565b6040516100fa91906106b1565b60405180910390f35b610116610111366004610722565b61023d565b60405190151581526020016100fa565b61012f60005481565b6040519081526020016100fa565b61011661014b36600461074c565b610253565b61012f6000805160206108aa83398151915281565b61016d601281565b60405160ff90911681526020016100fa565b61012f60035481565b61012f610196366004610788565b60016020526000908152604090205481565b61012f6101b6366004610788565b60046020526000908152604090205481565b6100ed604051806040016040528060038152602001620524c560ec1b81525081565b6101166101f8366004610722565b6102e7565b61021061020b3660046107a3565b6102f4565b005b61012f610220366004610816565b600260209081526000928352604080842090915290825290205481565b600061024a338484610577565b50600192915050565b6001600160a01b0383166000908152600260209081526040808320338452909152812054600019146102d2576001600160a01b03841660009081526002602090815260408083203384529091529020546102ad90836105d9565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b6102dd8484846105e7565b5060019392505050565b600061024a3384846105e7565b428410156103385760405162461bcd60e51b815260206004820152600c60248201526b1493140e881156141254915160a21b60448201526064015b60405180910390fd5b6003546001600160a01b038816600090815260046020526040812080549192916000805160206108aa833981519152918b918b918b9190876103798361085f565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016103f292919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa15801561045d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906104935750886001600160a01b0316816001600160a01b0316145b6104d85760405162461bcd60e51b8152602060048201526016602482015275524c503a20494e56414c49445f5349474e415455524560501b604482015260640161032f565b6104e3898989610577565b505050505050505050565b6000806104fb838561087a565b905061050b848210156000610512565b9392505050565b816105205761052081610524565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b600061050b8383600161068d565b6001600160a01b03831660009081526001602052604090205461060a90826105d9565b6001600160a01b03808516600090815260016020526040808220939093559084168152205461063990826104ee565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906105cc9085815260200190565b600061069c8484111583610512565b60006106a88486610892565b95945050505050565b600060208083528351808285015260005b818110156106de578581018301518582016040015282016106c2565b818111156106f0576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461071d57600080fd5b919050565b6000806040838503121561073557600080fd5b61073e83610706565b946020939093013593505050565b60008060006060848603121561076157600080fd5b61076a84610706565b925061077860208501610706565b9150604084013590509250925092565b60006020828403121561079a57600080fd5b61050b82610706565b600080600080600080600060e0888a0312156107be57600080fd5b6107c788610706565b96506107d560208901610706565b95506040880135945060608801359350608088013560ff811681146107f957600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561082957600080fd5b61083283610706565b915061084060208401610706565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b600060001982141561087357610873610849565b5060010190565b6000821982111561088d5761088d610849565b500190565b6000828210156108a4576108a4610849565b50039056fe6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9a2646970667358221220aa8d33010ea4b84ef641f25ba5a14a509184730fe3361fae52826e4d7d66201d64736f6c634300080a0033";

export class RequiemERC20Wrapper__factory extends ContractFactory {
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
  ): Promise<RequiemERC20Wrapper> {
    return super.deploy(
      _totalSupply,
      overrides || {}
    ) as Promise<RequiemERC20Wrapper>;
  }
  getDeployTransaction(
    _totalSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_totalSupply, overrides || {});
  }
  attach(address: string): RequiemERC20Wrapper {
    return super.attach(address) as RequiemERC20Wrapper;
  }
  connect(signer: Signer): RequiemERC20Wrapper__factory {
    return super.connect(signer) as RequiemERC20Wrapper__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemERC20WrapperInterface {
    return new utils.Interface(_abi) as RequiemERC20WrapperInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemERC20Wrapper {
    return new Contract(address, _abi, signerOrProvider) as RequiemERC20Wrapper;
  }
}