/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC20Test, ERC20TestInterface } from "../ERC20Test";

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
        name: "amount",
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
        name: "account",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
  "0x60806040523480156200001157600080fd5b5060405162000b2b38038062000b2b833981016040819052620000349162000134565b60036200004283826200022d565b5060046200005182826200022d565b50506005805460ff1916601217905550620002f9565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008f57600080fd5b81516001600160401b0380821115620000ac57620000ac62000067565b604051601f8301601f19908116603f01168101908282118183101715620000d757620000d762000067565b81604052838152602092508683858801011115620000f457600080fd5b600091505b83821015620001185785820183015181830184015290820190620000f9565b838211156200012a5760008385830101525b9695505050505050565b600080604083850312156200014857600080fd5b82516001600160401b03808211156200016057600080fd5b6200016e868387016200007d565b935060208501519150808211156200018557600080fd5b5062000194858286016200007d565b9150509250929050565b600181811c90821680620001b357607f821691505b602082108103620001d457634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200022857600081815260208120601f850160051c81016020861015620002035750805b601f850160051c820191505b8181101562000224578281556001016200020f565b5050505b505050565b81516001600160401b0381111562000249576200024962000067565b62000261816200025a84546200019e565b84620001da565b602080601f831160018114620002995760008415620002805750858301515b600019600386901b1c1916600185901b17855562000224565b600085815260208120601f198616915b82811015620002ca57888601518255948401946001909101908401620002a9565b5085821015620002e95787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61082280620003096000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c80633950935111610081578063a457c2d71161005b578063a457c2d71461019a578063a9059cbb146101ad578063dd62ed3e146101c057600080fd5b8063395093511461014957806370a082311461015c57806395d89b411461019257600080fd5b806318160ddd116100b257806318160ddd1461010f57806323b872dd14610121578063313ce5671461013457600080fd5b806306fdde03146100ce578063095ea7b3146100ec575b600080fd5b6100d6610206565b6040516100e391906105e4565b60405180910390f35b6100ff6100fa366004610680565b610298565b60405190151581526020016100e3565b6002545b6040519081526020016100e3565b6100ff61012f3660046106aa565b6102ae565b60055460405160ff90911681526020016100e3565b6100ff610157366004610680565b61030f565b61011361016a3660046106e6565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6100d6610353565b6100ff6101a8366004610680565b610362565b6100ff6101bb366004610680565b6103a8565b6101136101ce366004610708565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6060600380546102159061073b565b80601f01602080910402602001604051908101604052809291908181526020018280546102419061073b565b801561028e5780601f106102635761010080835404028352916020019161028e565b820191906000526020600020905b81548152906001019060200180831161027157829003601f168201915b5050505050905090565b60006102a53384846103b5565b50600192915050565b60006102bb848484610424565b73ffffffffffffffffffffffffffffffffffffffff8416600090815260016020908152604080832033808552925290912054610305918691610300908661019e61053a565b6103b5565b5060019392505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916102a59185906103009086906107bd565b6060600480546102159061073b565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916102a5918590610300908661019f61053a565b60006102a5338484610424565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b61044873ffffffffffffffffffffffffffffffffffffffff8416151561019861055e565b61046c73ffffffffffffffffffffffffffffffffffffffff8316151561019961055e565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205461049f90826101a061053a565b73ffffffffffffffffffffffffffffffffffffffff80851660009081526020819052604080822093909355908416815220546104dc9082906107d4565b73ffffffffffffffffffffffffffffffffffffffff8381166000818152602081815260409182902094909455518481529092918616917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9101610417565b6000610549848411158361055e565b600061055584866107bd565b95945050505050565b8161056c5761056c81610570565b5050565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b84010166524551230000000160c81b925050507f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fd5b600060208083528351808285015260005b81811015610611578581018301518582016040015282016105f5565b81811115610623576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461067b57600080fd5b919050565b6000806040838503121561069357600080fd5b61069c83610657565b946020939093013593505050565b6000806000606084860312156106bf57600080fd5b6106c884610657565b92506106d660208501610657565b9150604084013590509250925092565b6000602082840312156106f857600080fd5b61070182610657565b9392505050565b6000806040838503121561071b57600080fd5b61072483610657565b915061073260208401610657565b90509250929050565b600181811c9082168061074f57607f821691505b602082108103610788577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000828210156107cf576107cf61078e565b500390565b600082198211156107e7576107e761078e565b50019056fea2646970667358221220c4516ecd1ea13c7860b508f8836a1e3fb1a1b696969ac603464f26f2a0730df864736f6c634300080f0033";

export class ERC20Test__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC20Test> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC20Test>;
  }
  getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  attach(address: string): ERC20Test {
    return super.attach(address) as ERC20Test;
  }
  connect(signer: Signer): ERC20Test__factory {
    return super.connect(signer) as ERC20Test__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20TestInterface {
    return new utils.Interface(_abi) as ERC20TestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC20Test {
    return new Contract(address, _abi, signerOrProvider) as ERC20Test;
  }
}
