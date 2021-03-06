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
  "0x608060405234801561001057600080fd5b50604051610bdb380380610bdb83398101604081905261002f91610267565b604080518082018252601a81527f5265717569656d204c69717569646974792050726f76696465720000000000006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527f2e1adfbb118fada029d9623aa0ed8dd2318a25545f57095be55dcbd209508e12818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc660608201524660808201523060a0808301919091528351808303909101815260c0909101909252815191012060035561011d3382610123565b506102a6565b61013c816000546101ca60201b6105351790919060201c565b60009081556001600160a01b03831681526001602090815260409091205461016d9183906105356101ca821b17901c565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906101be9085815260200190565b60405180910390a35050565b6000806101d78385610280565b90506101f18482101560006101f860201b6105591760201c565b9392505050565b81610210576102108161021460201b61056b1760201c565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b60006020828403121561027957600080fd5b5051919050565b600082198211156102a157634e487b7160e01b600052601160045260246000fd5b500190565b610926806102b56000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80633644e5151161008c57806395d89b411161006657806395d89b41146101fd578063a9059cbb1461021f578063d505accf14610232578063dd62ed3e1461024757600080fd5b80633644e515146101b457806370a08231146101bd5780637ecebe00146101dd57600080fd5b806306fdde03146100d4578063095ea7b31461012657806318160ddd1461014957806323b872dd1461016057806330adf81f14610173578063313ce5671461019a575b600080fd5b6101106040518060400160405280601a81526020017f5265717569656d204c69717569646974792050726f766964657200000000000081525081565b60405161011d91906106f8565b60405180910390f35b610139610134366004610769565b610272565b604051901515815260200161011d565b61015260005481565b60405190815260200161011d565b61013961016e366004610793565b610288565b6101527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101a2601281565b60405160ff909116815260200161011d565b61015260035481565b6101526101cb3660046107cf565b60016020526000908152604090205481565b6101526101eb3660046107cf565b60046020526000908152604090205481565b610110604051806040016040528060038152602001620524c560ec1b81525081565b61013961022d366004610769565b61031c565b6102456102403660046107ea565b610329565b005b61015261025536600461085d565b600260209081526000928352604080842090915290825290205481565b600061027f3384846105be565b50600192915050565b6001600160a01b038316600090815260026020908152604080832033845290915281205460001914610307576001600160a01b03841660009081526002602090815260408083203384529091529020546102e29083610620565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b61031284848461062e565b5060019392505050565b600061027f33848461062e565b4284101561036d5760405162461bcd60e51b815260206004820152600c60248201526b1493140e881156141254915160a21b60448201526064015b60405180910390fd5b6003546001600160a01b038816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b9190876103c0836108a6565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e0016040516020818303038152906040528051906020012060405160200161043992919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa1580156104a4573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906104da5750886001600160a01b0316816001600160a01b0316145b61051f5760405162461bcd60e51b8152602060048201526016602482015275524c503a20494e56414c49445f5349474e415455524560501b6044820152606401610364565b61052a8989896105be565b505050505050505050565b60008061054283856108c1565b9050610552848210156000610559565b9392505050565b81610567576105678161056b565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610552838360016106d4565b6001600160a01b0383166000908152600160205260409020546106519082610620565b6001600160a01b0380851660009081526001602052604080822093909355908416815220546106809082610535565b6001600160a01b0380841660008181526001602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906106139085815260200190565b60006106e38484111583610559565b60006106ef84866108d9565b95945050505050565b600060208083528351808285015260005b8181101561072557858101830151858201604001528201610709565b81811115610737576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461076457600080fd5b919050565b6000806040838503121561077c57600080fd5b6107858361074d565b946020939093013593505050565b6000806000606084860312156107a857600080fd5b6107b18461074d565b92506107bf6020850161074d565b9150604084013590509250925092565b6000602082840312156107e157600080fd5b6105528261074d565b600080600080600080600060e0888a03121561080557600080fd5b61080e8861074d565b965061081c6020890161074d565b95506040880135945060608801359350608088013560ff8116811461084057600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561087057600080fd5b6108798361074d565b91506108876020840161074d565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b60006000198214156108ba576108ba610890565b5060010190565b600082198211156108d4576108d4610890565b500190565b6000828210156108eb576108eb610890565b50039056fea26469706673582212202ade64392e0dd19ec3708e8d4f940b543f9ce66f685f467b90c6b69a5bdcce9d64736f6c634300080a0033";

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
