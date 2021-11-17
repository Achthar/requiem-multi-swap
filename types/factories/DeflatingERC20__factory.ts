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
  DeflatingERC20,
  DeflatingERC20Interface,
} from "../DeflatingERC20";

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
    inputs: [
      {
        internalType: "address",
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amt",
        type: "uint256",
      },
    ],
    name: "mint",
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
  "0x608060405234801561001057600080fd5b50604051610d62380380610d6283398101604081905261002f91610256565b604080518082018252601481527f4465666c6174696e67205465737420546f6b656e0000000000000000000000006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527ff89e31130e6fd3d87d62a1ac2770fba58bed5a06c47ce70fa97f8218b1b2743a818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015246608082018190523060a0808401919091528451808403909101815260c0909201909352805191012060035561011f3383610126565b5050610295565b61013f816000546101cd60201b61055c1790919060201c565b60009081556001600160a01b03831681526001602090815260409091205461017091839061055c6101cd821b17901c565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906101c19085815260200190565b60405180910390a35050565b6000806101da838561026f565b90506101ea8482101560006101f1565b9392505050565b816101ff576101ff81610203565b5050565b62461bcd60e51b6000908152602060045260076024526642414c23000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b60006020828403121561026857600080fd5b5051919050565b6000821982111561029057634e487b7160e01b600052601160045260246000fd5b500190565b610abe806102a46000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806340c10f191161008c57806395d89b411161006657806395d89b4114610222578063a9059cbb14610244578063d505accf14610257578063dd62ed3e1461026c57600080fd5b806340c10f19146101cf57806370a08231146101e25780637ecebe001461020257600080fd5b806323b872dd116100c857806323b872dd1461017257806330adf81f14610185578063313ce567146101ac5780633644e515146101c657600080fd5b806306fdde03146100ef578063095ea7b31461013857806318160ddd1461015b575b600080fd5b610122604051806040016040528060148152602001732232b33630ba34b733902a32b9ba102a37b5b2b760611b81525081565b60405161012f919061086e565b60405180910390f35b61014b6101463660046108df565b610297565b604051901515815260200161012f565b61016460005481565b60405190815260200161012f565b61014b610180366004610909565b6102ad565b6101647f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101b4601281565b60405160ff909116815260200161012f565b61016460035481565b61014b6101dd3660046108df565b610341565b6101646101f0366004610945565b60016020526000908152604090205481565b610164610210366004610945565b60046020526000908152604090205481565b6101226040518060400160405280600381526020016211151560ea1b81525081565b61014b6102523660046108df565b61034d565b61026a610265366004610960565b61035a565b005b61016461027a3660046109d3565b600260209081526000928352604080842090915290825290205481565b60006102a4338484610580565b50600192915050565b6001600160a01b03831660009081526002602090815260408083203384529091528120546000191461032c576001600160a01b038416600090815260026020908152604080832033845290915290205461030790836105e1565b6001600160a01b03851660009081526002602090815260408083203384529091529020555b6103378484846105ef565b5060019392505050565b60006102a483836106cc565b60006102a43384846105ef565b428410156103995760405162461bcd60e51b81526020600482015260076024820152661156141254915160ca1b60448201526064015b60405180910390fd5b6003546001600160a01b038816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b9190876103ec83610a1c565b909155506040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810187905260e0016040516020818303038152906040528051906020012060405160200161046592919061190160f01b81526002810192909252602282015260420190565b60408051601f198184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa1580156104d0573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116158015906105065750886001600160a01b0316816001600160a01b0316145b6105465760405162461bcd60e51b8152602060048201526011602482015270494e56414c49445f5349474e415455524560781b6044820152606401610390565b610551898989610580565b505050505050505050565b6000806105698385610a37565b905061057984821015600061075b565b9392505050565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006105798383600161076d565b60006105fc606483610a4f565b90506106088482610791565b600061061483836105e1565b6001600160a01b03861660009081526001602052604090205490915061063a90826105e1565b6001600160a01b038087166000908152600160205260408082209390935590861681522054610669908261055c565b6001600160a01b0380861660008181526001602052604090819020939093559151908716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906106bd9085815260200190565b60405180910390a35050505050565b6000546106d9908261055c565b60009081556001600160a01b0383168152600160205260409020546106fe908261055c565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061074f9085815260200190565b60405180910390a35050565b81610769576107698161081b565b5050565b600061077c848411158361075b565b60006107888486610a71565b95945050505050565b6001600160a01b0382166000908152600160205260409020546107b490826105e1565b6001600160a01b038316600090815260016020526040812091909155546107db90826105e1565b60009081556040518281526001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200161074f565b62461bcd60e51b6000908152602060045260076024526642414c23000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b600060208083528351808285015260005b8181101561089b5785810183015185820160400152820161087f565b818111156108ad576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146108da57600080fd5b919050565b600080604083850312156108f257600080fd5b6108fb836108c3565b946020939093013593505050565b60008060006060848603121561091e57600080fd5b610927846108c3565b9250610935602085016108c3565b9150604084013590509250925092565b60006020828403121561095757600080fd5b610579826108c3565b600080600080600080600060e0888a03121561097b57600080fd5b610984886108c3565b9650610992602089016108c3565b95506040880135945060608801359350608088013560ff811681146109b657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156109e657600080fd5b6109ef836108c3565b91506109fd602084016108c3565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b6000600019821415610a3057610a30610a06565b5060010190565b60008219821115610a4a57610a4a610a06565b500190565b600082610a6c57634e487b7160e01b600052601260045260246000fd5b500490565b600082821015610a8357610a83610a06565b50039056fea2646970667358221220c2e93697f1a97df35a8d8d399758586690263c698cce8c7cfcf4dd8ed4e72a0564736f6c634300080a0033";

export class DeflatingERC20__factory extends ContractFactory {
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
  ): Promise<DeflatingERC20> {
    return super.deploy(
      _totalSupply,
      overrides || {}
    ) as Promise<DeflatingERC20>;
  }
  getDeployTransaction(
    _totalSupply: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_totalSupply, overrides || {});
  }
  attach(address: string): DeflatingERC20 {
    return super.attach(address) as DeflatingERC20;
  }
  connect(signer: Signer): DeflatingERC20__factory {
    return super.connect(signer) as DeflatingERC20__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeflatingERC20Interface {
    return new utils.Interface(_abi) as DeflatingERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeflatingERC20 {
    return new Contract(address, _abi, signerOrProvider) as DeflatingERC20;
  }
}
