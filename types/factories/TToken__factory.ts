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
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
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
  "0x60806040523480156200001157600080fd5b5060405162000c4838038062000c488339810160408190526200003491620002c1565b8251620000499060009060208601906200014e565b5081516200005f9060019060208501906200014e565b50600280543361010081026001600160a81b0319909216919091176012179091556200008c908262000095565b50505062000398565b6001600160a01b038216600090815260046020526040902054620000ba90826200012a565b6001600160a01b038316600090815260046020526040902055600354620000e290826200012a565b6003556040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60008262000139838262000334565b91508110156200014857600080fd5b92915050565b8280546200015c906200035b565b90600052602060002090601f016020900481019282620001805760008555620001cb565b82601f106200019b57805160ff1916838001178555620001cb565b82800160010185558215620001cb579182015b82811115620001cb578251825591602001919060010190620001ae565b50620001d9929150620001dd565b5090565b5b80821115620001d95760008155600101620001de565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200021c57600080fd5b81516001600160401b0380821115620002395762000239620001f4565b604051601f8301601f19908116603f01168101908282118183101715620002645762000264620001f4565b816040528381526020925086838588010111156200028157600080fd5b600091505b83821015620002a5578582018301518183018401529082019062000286565b83821115620002b75760008385830101525b9695505050505050565b600080600060608486031215620002d757600080fd5b83516001600160401b0380821115620002ef57600080fd5b620002fd878388016200020a565b945060208601519150808211156200031457600080fd5b5062000323868287016200020a565b925050604084015190509250925092565b600082198211156200035657634e487b7160e01b600052601160045260246000fd5b500190565b600181811c908216806200037057607f821691505b602082108114156200039257634e487b7160e01b600052602260045260246000fd5b50919050565b6108a080620003a86000396000f3fe608060405234801561001057600080fd5b50600436106100995760003560e01c806306fdde031461009e578063095ea7b3146100bc57806318160ddd146100df57806323b872dd146100f1578063313ce5671461010457806340c10f191461011957806342966c681461012c57806370a082311461013f57806395d89b4114610168578063a9059cbb14610170578063dd62ed3e14610183575b600080fd5b6100a66101bc565b6040516100b39190610647565b60405180910390f35b6100cf6100ca3660046106b8565b61024e565b60405190151581526020016100b3565b6003545b6040519081526020016100b3565b6100cf6100ff3660046106e2565b6102a9565b60025460405160ff90911681526020016100b3565b6100cf6101273660046106b8565b6103f5565b6100cf61013a36600461071e565b61040a565b6100e361014d366004610737565b6001600160a01b031660009081526004602052604090205490565b6100a66104a1565b6100cf61017e3660046106b8565b6104b0565b6100e3610191366004610759565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205490565b6060600080546101cb9061078c565b80601f01602080910402602001604051908101604052809291908181526020018280546101f79061078c565b80156102445780601f1061021957610100808354040283529160200191610244565b820191906000526020600020905b81548152906001019060200180831161022757829003601f168201915b5050505050905090565b3360008181526005602090815260408083206001600160a01b0387168085529252808320859055519192909160008051602061084b833981519152906102979086815260200190565b60405180910390a35060015b92915050565b6000336001600160a01b03851614806102e557506001600160a01b03841660009081526005602090815260408083203384529091529020548211155b6103215760405162461bcd60e51b815260206004820152600860248201526710b9b832b73232b960c11b60448201526064015b60405180910390fd5b61032c8484846104b9565b336001600160a01b0385161480159061036a57506001600160a01b038416600090815260056020908152604080832033845290915290205460001914155b156103eb576001600160a01b038416600090815260056020908152604080832033845290915290205461039d9083610592565b6001600160a01b03858116600090815260056020908152604080832033808552908352928190208590555193845291861692909160008051602061084b833981519152910160405180910390a35b5060019392505050565b600061040183836105ad565b50600192915050565b306000908152600460205260408120548211156104395760405162461bcd60e51b8152600401610318906107c7565b306000908152600460205260409020546104539083610592565b306000908152600460205260409020556003546104709083610592565b600355604051828152600090309060008051602061082b8339815191529060200160405180910390a3506001919050565b6060600180546101cb9061078c565b60006104013384845b6001600160a01b0383166000908152600460205260409020548111156104f15760405162461bcd60e51b8152600401610318906107c7565b6001600160a01b0383166000908152600460205260409020546105149082610592565b6001600160a01b038085166000908152600460205260408082209390935590841681522054610543908261062c565b6001600160a01b03808416600081815260046020526040908190209390935591519085169060008051602061082b833981519152906105859085815260200190565b60405180910390a3505050565b60008261059f83826107fb565b91508111156102a357600080fd5b6001600160a01b0382166000908152600460205260409020546105d0908261062c565b6001600160a01b0383166000908152600460205260409020556003546105f6908261062c565b6003556040518181526001600160a01b0383169060009060008051602061082b8339815191529060200160405180910390a35050565b6000826106398382610812565b91508110156102a357600080fd5b600060208083528351808285015260005b8181101561067457858101830151858201604001528201610658565b81811115610686576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146106b357600080fd5b919050565b600080604083850312156106cb57600080fd5b6106d48361069c565b946020939093013593505050565b6000806000606084860312156106f757600080fd5b6107008461069c565b925061070e6020850161069c565b9150604084013590509250925092565b60006020828403121561073057600080fd5b5035919050565b60006020828403121561074957600080fd5b6107528261069c565b9392505050565b6000806040838503121561076c57600080fd5b6107758361069c565b91506107836020840161069c565b90509250929050565b600181811c908216806107a057607f821691505b602082108114156107c157634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600490820152630858985b60e21b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b60008282101561080d5761080d6107e5565b500390565b60008219821115610825576108256107e5565b50019056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a2646970667358221220208272458856b26ee3a95ad833a15c3bb7d5f6d9f2110abe33bb822dc38089c464736f6c634300080a0033";

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
    name: string,
    symbol: string,
    amt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TToken> {
    return super.deploy(name, symbol, amt, overrides || {}) as Promise<TToken>;
  }
  getDeployTransaction(
    name: string,
    symbol: string,
    amt: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name, symbol, amt, overrides || {});
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