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
import type { TToken, TTokenInterface } from "../TToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "amt",
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
        name: "amt",
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
        name: "amt",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
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
        name: "dst",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amt",
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
        name: "whom",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amt",
        type: "uint256",
      },
    ],
    name: "burn",
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
        name: "amt",
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
        name: "amt",
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
  "0x60806040523480156200001157600080fd5b5060405162000e8438038062000e848339810160408190526200003491620002c1565b8251620000499060009060208601906200014e565b5081516200005f9060019060208501906200014e565b50600280543361010081026001600160a81b0319909216919091176012179091556200008c908262000095565b50505062000397565b6001600160a01b038216600090815260046020526040902054620000ba90826200012a565b6001600160a01b038316600090815260046020526040902055600354620000e290826200012a565b6003556040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60008262000139838262000334565b91508110156200014857600080fd5b92915050565b8280546200015c906200035b565b90600052602060002090601f016020900481019282620001805760008555620001cb565b82601f106200019b57805160ff1916838001178555620001cb565b82800160010185558215620001cb579182015b82811115620001cb578251825591602001919060010190620001ae565b50620001d9929150620001dd565b5090565b5b80821115620001d95760008155600101620001de565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200021c57600080fd5b81516001600160401b0380821115620002395762000239620001f4565b604051601f8301601f19908116603f01168101908282118183101715620002645762000264620001f4565b816040528381526020925086838588010111156200028157600080fd5b600091505b83821015620002a5578582018301518183018401529082019062000286565b83821115620002b75760008385830101525b9695505050505050565b600080600060608486031215620002d757600080fd5b83516001600160401b0380821115620002ef57600080fd5b620002fd878388016200020a565b945060208601519150808211156200031457600080fd5b5062000323868287016200020a565b925050604084015190509250925092565b600082198211156200035657634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200037057607f821691505b6020821081036200039157634e487b7160e01b600052602260045260246000fd5b50919050565b610add80620003a76000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c806340c10f191161008157806395d89b411161005b57806395d89b41146101a5578063a9059cbb146101ad578063dd62ed3e146101c057600080fd5b806340c10f191461014957806342966c681461015c57806370a082311461016f57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d6610206565b6040516100e39190610886565b60405180910390f35b6100ff6100fa366004610922565b610298565b60405190151581526020016100e3565b6003545b6040519081526020016100e3565b6100ff61012f36600461094c565b610312565b60025460405160ff90911681526020016100e3565b6100ff610157366004610922565b61050b565b6100ff61016a366004610988565b610520565b61011361017d3660046109a1565b73ffffffffffffffffffffffffffffffffffffffff1660009081526004602052604090205490565b6100d6610615565b6100ff6101bb366004610922565b610624565b6101136101ce3660046109c3565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260056020908152604080832093909416825291909152205490565b606060008054610215906109f6565b80601f0160208091040260200160405190810160405280929190818152602001828054610241906109f6565b801561028e5780601f106102635761010080835404028352916020019161028e565b820191906000526020600020905b81548152906001019060200180831161027157829003601f168201915b5050505050905090565b33600081815260056020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906103009086815260200190565b60405180910390a35060015b92915050565b60003373ffffffffffffffffffffffffffffffffffffffff85161480610368575073ffffffffffffffffffffffffffffffffffffffff841660009081526005602090815260408083203384529091529020548211155b6103d3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600860248201527f217370656e64657200000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6103de84848461062d565b3373ffffffffffffffffffffffffffffffffffffffff851614801590610454575073ffffffffffffffffffffffffffffffffffffffff841660009081526005602090815260408083203384529091529020547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff14155b156105015773ffffffffffffffffffffffffffffffffffffffff841660009081526005602090815260408083203384529091529020546104949083610798565b73ffffffffffffffffffffffffffffffffffffffff85811660009081526005602090815260408083203380855290835292819020859055519384529186169290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a35b5060019392505050565b600061051783836107b3565b50600192915050565b3060009081526004602052604081205482111561059b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ca9060208082526004908201527f2162616c00000000000000000000000000000000000000000000000000000000604082015260600190565b306000908152600460205260409020546105b59083610798565b306000908152600460205260409020556003546105d29083610798565b60035560405182815260009030907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3506001919050565b606060018054610215906109f6565b60006105173384845b73ffffffffffffffffffffffffffffffffffffffff83166000908152600460205260409020548111156106be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103ca9060208082526004908201527f2162616c00000000000000000000000000000000000000000000000000000000604082015260600190565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600460205260409020546106ee9082610798565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260046020526040808220939093559084168152205461072a908261086b565b73ffffffffffffffffffffffffffffffffffffffff80841660008181526004602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9061078b9085815260200190565b60405180910390a3505050565b6000826107a58382610a78565b915081111561030c57600080fd5b73ffffffffffffffffffffffffffffffffffffffff82166000908152600460205260409020546107e3908261086b565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260046020526040902055600354610816908261086b565b60035560405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6000826108788382610a8f565b915081101561030c57600080fd5b600060208083528351808285015260005b818110156108b357858101830151858201604001528201610897565b818111156108c5576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461091d57600080fd5b919050565b6000806040838503121561093557600080fd5b61093e836108f9565b946020939093013593505050565b60008060006060848603121561096157600080fd5b61096a846108f9565b9250610978602085016108f9565b9150604084013590509250925092565b60006020828403121561099a57600080fd5b5035919050565b6000602082840312156109b357600080fd5b6109bc826108f9565b9392505050565b600080604083850312156109d657600080fd5b6109df836108f9565b91506109ed602084016108f9565b90509250929050565b600181811c90821680610a0a57607f821691505b602082108103610a43577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015610a8a57610a8a610a49565b500390565b60008219821115610aa257610aa2610a49565b50019056fea264697066735822122008cb2dcd85815682328e0892edaefd574be57dba9f53863bef7b2f940a0eba1464736f6c634300080d0033";

export class TToken__factory extends ContractFactory {
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
    name_: string,
    symbol_: string,
    amt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TToken> {
    return super.deploy(
      name_,
      symbol_,
      amt,
      overrides || {}
    ) as Promise<TToken>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    amt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, amt, overrides || {});
  }
  attach(address: string): TToken {
    return super.attach(address) as TToken;
  }
  connect(signer: Signer): TToken__factory {
    return super.connect(signer) as TToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TTokenInterface {
    return new utils.Interface(_abi) as TTokenInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TToken {
    return new Contract(address, _abi, signerOrProvider) as TToken;
  }
}
