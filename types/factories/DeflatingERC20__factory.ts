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
  "0x60806040523480156200001157600080fd5b5060405162000ff138038062000ff1833981016040819052620000349162000282565b604080518082018252601481527f4465666c6174696e67205465737420546f6b656e0000000000000000000000006020918201528151808301835260018152603160f81b9082015281517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f818301527ff89e31130e6fd3d87d62a1ac2770fba58bed5a06c47ce70fa97f8218b1b2743a818401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6606082015246608082018190523060a0808401919091528451808403909101815260c090920190935280519101206003556200012633836200012e565b5050620002c3565b6200014a81600054620001dc60201b620006b21790919060201c565b60009081556001600160a01b0383168152600160209081526040909120546200017e918390620006b2620001dc821b17901c565b6001600160a01b0383166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90620001d09085815260200190565b60405180910390a35050565b600080620001eb83856200029c565b9050620002088482101560006200020f60201b620006d61760201c565b9392505050565b816200022b576200022b816200022f60201b620006e81760201c565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b6000602082840312156200029557600080fd5b5051919050565b60008219821115620002be57634e487b7160e01b600052601160045260246000fd5b500190565b610d1e80620002d36000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806340c10f191161008c57806395d89b411161006657806395d89b411461022b578063a9059cbb14610267578063d505accf1461027a578063dd62ed3e1461028f57600080fd5b806340c10f19146101d857806370a08231146101eb5780637ecebe001461020b57600080fd5b806323b872dd116100c857806323b872dd1461017b57806330adf81f1461018e578063313ce567146101b55780633644e515146101cf57600080fd5b806306fdde03146100ef578063095ea7b31461014157806318160ddd14610164575b600080fd5b61012b6040518060400160405280601481526020017f4465666c6174696e67205465737420546f6b656e00000000000000000000000081525081565b6040516101389190610a53565b60405180910390f35b61015461014f366004610aef565b6102ba565b6040519015158152602001610138565b61016d60005481565b604051908152602001610138565b610154610189366004610b19565b6102d0565b61016d7f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c981565b6101bd601281565b60405160ff9091168152602001610138565b61016d60035481565b6101546101e6366004610aef565b6103a9565b61016d6101f9366004610b55565b60016020526000908152604090205481565b61016d610219366004610b55565b60046020526000908152604090205481565b61012b6040518060400160405280600381526020017f445454000000000000000000000000000000000000000000000000000000000081525081565b610154610275366004610aef565b6103b5565b61028d610288366004610b70565b6103c2565b005b61016d61029d366004610be3565b600260209081526000928352604080842090915290825290205481565b60006102c7338484610755565b50600192915050565b73ffffffffffffffffffffffffffffffffffffffff831660009081526002602090815260408083203384529091528120547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff146103945773ffffffffffffffffffffffffffffffffffffffff8416600090815260026020908152604080832033845290915290205461036290836107c3565b73ffffffffffffffffffffffffffffffffffffffff851660009081526002602090815260408083203384529091529020555b61039f8484846107d1565b5060019392505050565b60006102c783836108d5565b60006102c73384846107d1565b42841015610431576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600760248201527f455850495245440000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60035473ffffffffffffffffffffffffffffffffffffffff8816600090815260046020526040812080549192917f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9918b918b918b91908761049183610c45565b9091555060408051602081019690965273ffffffffffffffffffffffffffffffffffffffff94851690860152929091166060840152608083015260a082015260c0810187905260e001604051602081830303815290604052805190602001206040516020016105329291907f190100000000000000000000000000000000000000000000000000000000000081526002810192909252602282015260420190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181528282528051602091820120600080855291840180845281905260ff88169284019290925260608301869052608083018590529092509060019060a0016020604051602081039080840390855afa1580156105bb573d6000803e3d6000fd5b50506040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0015191505073ffffffffffffffffffffffffffffffffffffffff81161580159061063657508873ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b61069c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f494e56414c49445f5349474e41545552450000000000000000000000000000006044820152606401610428565b6106a7898989610755565b505050505050505050565b6000806106bf8385610c7e565b90506106cf8482101560006106d6565b9392505050565b816106e4576106e4816106e8565b5050565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60006106cf8383600161097e565b60006107de606483610c96565b90506107ea84826109a2565b60006107f683836107c3565b73ffffffffffffffffffffffffffffffffffffffff861660009081526001602052604090205490915061082990826107c3565b73ffffffffffffffffffffffffffffffffffffffff808716600090815260016020526040808220939093559086168152205461086590826106b2565b73ffffffffffffffffffffffffffffffffffffffff80861660008181526001602052604090819020939093559151908716907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906108c69085815260200190565b60405180910390a35050505050565b6000546108e290826106b2565b600090815573ffffffffffffffffffffffffffffffffffffffff831681526001602052604090205461091490826106b2565b73ffffffffffffffffffffffffffffffffffffffff83166000818152600160205260408082209390935591519091907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906109729085815260200190565b60405180910390a35050565b600061098d84841115836106d6565b60006109998486610cd1565b95945050505050565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260409020546109d290826107c3565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081209190915554610a0690826107c3565b600090815560405182815273ffffffffffffffffffffffffffffffffffffffff8416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610972565b600060208083528351808285015260005b81811015610a8057858101830151858201604001528201610a64565b81811115610a92576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610aea57600080fd5b919050565b60008060408385031215610b0257600080fd5b610b0b83610ac6565b946020939093013593505050565b600080600060608486031215610b2e57600080fd5b610b3784610ac6565b9250610b4560208501610ac6565b9150604084013590509250925092565b600060208284031215610b6757600080fd5b6106cf82610ac6565b600080600080600080600060e0888a031215610b8b57600080fd5b610b9488610ac6565b9650610ba260208901610ac6565b95506040880135945060608801359350608088013560ff81168114610bc657600080fd5b9699959850939692959460a0840135945060c09093013592915050565b60008060408385031215610bf657600080fd5b610bff83610ac6565b9150610c0d60208401610ac6565b90509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610c7757610c77610c16565b5060010190565b60008219821115610c9157610c91610c16565b500190565b600082610ccc577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600082821015610ce357610ce3610c16565b50039056fea2646970667358221220472878f9fe43539e45519dbabd7476feacd500af04e1585ac787e3d425ad0a2264736f6c634300080a0033";

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
