/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { LPToken, LPTokenInterface } from "../LPToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
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
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swap",
    outputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "",
        type: "address",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200126e3803806200126e833981016040819052620000349162000256565b8181620000413362000093565b815162000056906004906020850190620000e3565b5080516200006c906005906020840190620000e3565b50506006805433610100026001600160a81b031990911617601217905550620002fd915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000f190620002c0565b90600052602060002090601f01602090048101928262000115576000855562000160565b82601f106200013057805160ff191683800117855562000160565b8280016001018555821562000160579182015b828111156200016057825182559160200191906001019062000143565b506200016e92915062000172565b5090565b5b808211156200016e576000815560010162000173565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001b157600080fd5b81516001600160401b0380821115620001ce57620001ce62000189565b604051601f8301601f19908116603f01168101908282118183101715620001f957620001f962000189565b816040528381526020925086838588010111156200021657600080fd5b600091505b838210156200023a57858201830151818301840152908201906200021b565b838211156200024c5760008385830101525b9695505050505050565b600080604083850312156200026a57600080fd5b82516001600160401b03808211156200028257600080fd5b62000290868387016200019f565b93506020850151915080821115620002a757600080fd5b50620002b6858286016200019f565b9150509250929050565b600181811c90821680620002d557607f821691505b60208210811415620002f757634e487b7160e01b600052602260045260246000fd5b50919050565b610f61806200030d6000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c8063715018a6116100a257806395d89b411161007157806395d89b4114610250578063a457c2d714610258578063a9059cbb1461026b578063dd62ed3e1461027e578063f2fde38b146102b757600080fd5b8063715018a6146101f457806379cc6790146101fc5780638119c0651461020f5780638da5cb5b1461023f57600080fd5b8063313ce567116100e9578063313ce56714610181578063395093511461019057806340c10f19146101a357806342966c68146101b857806370a08231146101cb57600080fd5b806306fdde031461011b578063095ea7b31461013957806318160ddd1461015c57806323b872dd1461016e575b600080fd5b6101236102ca565b6040516101309190610d31565b60405180910390f35b61014c610147366004610da2565b61035c565b6040519015158152602001610130565b6003545b604051908152602001610130565b61014c61017c366004610dcc565b610372565b60405160128152602001610130565b61014c61019e366004610da2565b610421565b6101b66101b1366004610da2565b61045d565b005b6101b66101c6366004610e08565b6104d6565b6101606101d9366004610e21565b6001600160a01b031660009081526001602052604090205490565b6101b66104e3565b6101b661020a366004610da2565b610519565b6006546102279061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610130565b6000546001600160a01b0316610227565b610123610566565b61014c610266366004610da2565b610575565b61014c610279366004610da2565b61060e565b61016061028c366004610e43565b6001600160a01b03918216600090815260026020908152604080832093909416825291909152205490565b6101b66102c5366004610e21565b61061b565b6060600480546102d990610e76565b80601f016020809104026020016040519081016040528092919081815260200182805461030590610e76565b80156103525780601f1061032757610100808354040283529160200191610352565b820191906000526020600020905b81548152906001019060200180831161033557829003601f168201915b5050505050905090565b60006103693384846106b3565b50600192915050565b600061037f8484846107d7565b6001600160a01b0384166000908152600260209081526040808320338452909152902054828110156104095760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61041685338584036106b3565b506001949350505050565b3360008181526002602090815260408083206001600160a01b03871684529091528120549091610369918590610458908690610ec7565b6106b3565b6000546001600160a01b031633146104875760405162461bcd60e51b815260040161040090610edf565b600081116104c85760405162461bcd60e51b815260206004820152600e60248201526d1e995c9bd35a5b9d105b5bdd5b9d60921b6044820152606401610400565b6104d282826109b1565b5050565b6104e03382610a9c565b50565b6000546001600160a01b0316331461050d5760405162461bcd60e51b815260040161040090610edf565b6105176000610bf6565b565b6001600160a01b038216600090815260026020908152604080832033845290915281205461054a90836101a1610c46565b90506105578333836106b3565b6105618383610a9c565b505050565b6060600580546102d990610e76565b3360009081526002602090815260408083206001600160a01b0386168452909152812054828110156105f75760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610400565b61060433858584036106b3565b5060019392505050565b60006103693384846107d7565b6000546001600160a01b031633146106455760405162461bcd60e51b815260040161040090610edf565b6001600160a01b0381166106aa5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610400565b6104e081610bf6565b6001600160a01b0383166107155760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610400565b6001600160a01b0382166107765760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610400565b6001600160a01b0383811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b03831661083b5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610400565b6001600160a01b03821661089d5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610400565b6108a8838383610c6a565b6001600160a01b038316600090815260016020526040902054818110156109205760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610400565b6001600160a01b03808516600090815260016020526040808220858503905591851681529081208054849290610957908490610ec7565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516109a391815260200190565b60405180910390a350505050565b6001600160a01b038216610a075760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610400565b610a1360008383610c6a565b8060036000828254610a259190610ec7565b90915550506001600160a01b03821660009081526001602052604081208054839290610a52908490610ec7565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b038216610afc5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610400565b610b0882600083610c6a565b6001600160a01b03821660009081526001602052604090205481811015610b7c5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610400565b6001600160a01b0383166000908152600160205260408120838303905560038054849290610bab908490610f14565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000610c558484111583610cdb565b6000610c618486610f14565b95945050505050565b600654604051633003049760e21b81526001600160a01b038481166004830152602482018490526101009092049091169063c00c125c90604401600060405180830381600087803b158015610cbe57600080fd5b505af1158015610cd2573d6000803e3d6000fd5b50505050505050565b816104d25762461bcd60e51b600090815260206004526007602452600a808304818104828106603090810160101b848706949093060160081b929092010166524551230000300160c81b6044526104d291606490fd5b600060208083528351808285015260005b81811015610d5e57858101830151858201604001528201610d42565b81811115610d70576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610d9d57600080fd5b919050565b60008060408385031215610db557600080fd5b610dbe83610d86565b946020939093013593505050565b600080600060608486031215610de157600080fd5b610dea84610d86565b9250610df860208501610d86565b9150604084013590509250925092565b600060208284031215610e1a57600080fd5b5035919050565b600060208284031215610e3357600080fd5b610e3c82610d86565b9392505050565b60008060408385031215610e5657600080fd5b610e5f83610d86565b9150610e6d60208401610d86565b90509250929050565b600181811c90821680610e8a57607f821691505b60208210811415610eab57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610eda57610eda610eb1565b500190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082821015610f2657610f26610eb1565b50039056fea264697066735822122093f513a53b444aaa8e3be4605c2f9d7cb6ac111e55659f288d66680edcb9eef164736f6c634300080a0033";

export class LPToken__factory extends ContractFactory {
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
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LPToken> {
    return super.deploy(_name, _symbol, overrides || {}) as Promise<LPToken>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  attach(address: string): LPToken {
    return super.attach(address) as LPToken;
  }
  connect(signer: Signer): LPToken__factory {
    return super.connect(signer) as LPToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LPTokenInterface {
    return new utils.Interface(_abi) as LPTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LPToken {
    return new Contract(address, _abi, signerOrProvider) as LPToken;
  }
}
