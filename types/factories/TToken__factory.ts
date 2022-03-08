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
  "0x60806040523480156200001157600080fd5b5060405162000cbb38038062000cbb8339810160408190526200003491620002c1565b8251620000499060009060208601906200014e565b5081516200005f9060019060208501906200014e565b50600280543361010081026001600160a81b0319909216919091176012179091556200008c908262000095565b50505062000398565b6001600160a01b038216600090815260046020526040902054620000ba90826200012a565b6001600160a01b038316600090815260046020526040902055600354620000e290826200012a565b6003556040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60008262000139838262000334565b91508110156200014857600080fd5b92915050565b8280546200015c906200035b565b90600052602060002090601f016020900481019282620001805760008555620001cb565b82601f106200019b57805160ff1916838001178555620001cb565b82800160010185558215620001cb579182015b82811115620001cb578251825591602001919060010190620001ae565b50620001d9929150620001dd565b5090565b5b80821115620001d95760008155600101620001de565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200021c57600080fd5b81516001600160401b0380821115620002395762000239620001f4565b604051601f8301601f19908116603f01168101908282118183101715620002645762000264620001f4565b816040528381526020925086838588010111156200028157600080fd5b600091505b83821015620002a5578582018301518183018401529082019062000286565b83821115620002b75760008385830101525b9695505050505050565b600080600060608486031215620002d757600080fd5b83516001600160401b0380821115620002ef57600080fd5b620002fd878388016200020a565b945060208601519150808211156200031457600080fd5b5062000323868287016200020a565b925050604084015190509250925092565b600082198211156200035657634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200037057607f821691505b602082108114156200039257634e487b7160e01b600052602260045260246000fd5b50919050565b61091380620003a86000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c806340c10f191161008157806395d89b411161005b57806395d89b4114610198578063a9059cbb146101a0578063dd62ed3e146101b357600080fd5b806340c10f191461014957806342966c681461015c57806370a082311461016f57600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d66101ec565b6040516100e39190610718565b60405180910390f35b6100ff6100fa366004610789565b61027e565b60405190151581526020016100e3565b6003545b6040519081526020016100e3565b6100ff61012f3660046107b3565b6102eb565b60025460405160ff90911681526020016100e3565b6100ff610157366004610789565b61045e565b6100ff61016a3660046107ef565b610473565b61011361017d366004610808565b6001600160a01b031660009081526004602052604090205490565b6100d6610535565b6100ff6101ae366004610789565b610544565b6101136101c136600461082a565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205490565b6060600080546101fb9061085d565b80601f01602080910402602001604051908101604052809291908181526020018280546102279061085d565b80156102745780601f1061024957610100808354040283529160200191610274565b820191906000526020600020905b81548152906001019060200180831161025757829003601f168201915b5050505050905090565b3360008181526005602090815260408083206001600160a01b038716808552925280832085905551919290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925906102d99086815260200190565b60405180910390a35060015b92915050565b6000336001600160a01b038516148061032757506001600160a01b03841660009081526005602090815260408083203384529091529020548211155b6103785760405162461bcd60e51b815260206004820152600860248201527f217370656e64657200000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b61038384848461054d565b336001600160a01b038516148015906103c157506001600160a01b038416600090815260056020908152604080832033845290915290205460001914155b15610454576001600160a01b03841660009081526005602090815260408083203384529091529020546103f49083610651565b6001600160a01b0385811660009081526005602090815260408083203380855290835292819020859055519384529186169290917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a35b5060019392505050565b600061046a838361066c565b50600192915050565b306000908152600460205260408120548211156104bb5760405162461bcd60e51b815260040161036f906020808252600490820152630858985b60e21b604082015260600190565b306000908152600460205260409020546104d59083610651565b306000908152600460205260409020556003546104f29083610651565b60035560405182815260009030907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3506001919050565b6060600180546101fb9061085d565b600061046a3384845b6001600160a01b03831660009081526004602052604090205481111561059e5760405162461bcd60e51b815260040161036f906020808252600490820152630858985b60e21b604082015260600190565b6001600160a01b0383166000908152600460205260409020546105c19082610651565b6001600160a01b0380851660009081526004602052604080822093909355908416815220546105f090826106fd565b6001600160a01b0380841660008181526004602052604090819020939093559151908516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906106449085815260200190565b60405180910390a3505050565b60008261065e83826108ae565b91508111156102e557600080fd5b6001600160a01b03821660009081526004602052604090205461068f90826106fd565b6001600160a01b0383166000908152600460205260409020556003546106b590826106fd565b6003556040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60008261070a83826108c5565b91508110156102e557600080fd5b600060208083528351808285015260005b8181101561074557858101830151858201604001528201610729565b81811115610757576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b038116811461078457600080fd5b919050565b6000806040838503121561079c57600080fd5b6107a58361076d565b946020939093013593505050565b6000806000606084860312156107c857600080fd5b6107d18461076d565b92506107df6020850161076d565b9150604084013590509250925092565b60006020828403121561080157600080fd5b5035919050565b60006020828403121561081a57600080fd5b6108238261076d565b9392505050565b6000806040838503121561083d57600080fd5b6108468361076d565b91506108546020840161076d565b90509250929050565b600181811c9082168061087157607f821691505b6020821081141561089257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156108c0576108c0610898565b500390565b600082198211156108d8576108d8610898565b50019056fea2646970667358221220249d1bbf77ec97f64b9c1f20957c981f8438ff844219245c90f16de7c2beffe064736f6c634300080c0033";

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
