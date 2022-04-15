/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WeightedLPToken,
  WeightedLPTokenInterface,
} from "../WeightedLPToken";

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
        internalType: "contract IWeightedSwap",
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
  "0x60806040523480156200001157600080fd5b50604051620016c0380380620016c0833981016040819052620000349162000256565b8181620000413362000093565b815162000056906004906020850190620000e3565b5080516200006c906005906020840190620000e3565b50506006805433610100026001600160a81b031990911617601217905550620002fc915050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000f190620002c0565b90600052602060002090601f01602090048101928262000115576000855562000160565b82601f106200013057805160ff191683800117855562000160565b8280016001018555821562000160579182015b828111156200016057825182559160200191906001019062000143565b506200016e92915062000172565b5090565b5b808211156200016e576000815560010162000173565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001b157600080fd5b81516001600160401b0380821115620001ce57620001ce62000189565b604051601f8301601f19908116603f01168101908282118183101715620001f957620001f962000189565b816040528381526020925086838588010111156200021657600080fd5b600091505b838210156200023a57858201830151818301840152908201906200021b565b838211156200024c5760008385830101525b9695505050505050565b600080604083850312156200026a57600080fd5b82516001600160401b03808211156200028257600080fd5b62000290868387016200019f565b93506020850151915080821115620002a757600080fd5b50620002b6858286016200019f565b9150509250929050565b600181811c90821680620002d557607f821691505b602082108103620002f657634e487b7160e01b600052602260045260246000fd5b50919050565b6113b4806200030c6000396000f3fe608060405234801561001057600080fd5b50600436106101365760003560e01c8063715018a6116100b257806395d89b4111610081578063a9059cbb11610066578063a9059cbb146102bf578063dd62ed3e146102d2578063f2fde38b1461031857600080fd5b806395d89b41146102a4578063a457c2d7146102ac57600080fd5b8063715018a61461022157806379cc6790146102295780638119c0651461023c5780638da5cb5b1461028657600080fd5b8063313ce5671161010957806340c10f19116100ee57806340c10f19146101c357806342966c68146101d857806370a08231146101eb57600080fd5b8063313ce567146101a157806339509351146101b057600080fd5b806306fdde031461013b578063095ea7b31461015957806318160ddd1461017c57806323b872dd1461018e575b600080fd5b61014361032b565b604051610150919061115d565b60405180910390f35b61016c6101673660046111f9565b6103bd565b6040519015158152602001610150565b6003545b604051908152602001610150565b61016c61019c366004611223565b6103d3565b60405160128152602001610150565b61016c6101be3660046111f9565b6104be565b6101d66101d13660046111f9565b610507565b005b6101d66101e636600461125f565b610600565b6101806101f9366004611278565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205490565b6101d661060d565b6101d66102373660046111f9565b61069a565b60065461026190610100900473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610150565b60005473ffffffffffffffffffffffffffffffffffffffff16610261565b610143610753565b61016c6102ba3660046111f9565b610762565b61016c6102cd3660046111f9565b61083a565b6101806102e036600461129a565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260026020908152604080832093909416825291909152205490565b6101d6610326366004611278565b610847565b60606004805461033a906112cd565b80601f0160208091040260200160405190810160405280929190818152602001828054610366906112cd565b80156103b35780601f10610388576101008083540402835291602001916103b3565b820191906000526020600020905b81548152906001019060200180831161039657829003601f168201915b5050505050905090565b60006103ca338484610974565b50600192915050565b60006103e0848484610b27565b73ffffffffffffffffffffffffffffffffffffffff84166000908152600260209081526040808320338452909152902054828110156104a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6104b38533858403610974565b506001949350505050565b33600081815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916103ca91859061050290869061134f565b610974565b60005473ffffffffffffffffffffffffffffffffffffffff163314610588576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161049d565b600081116105f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f7a65726f4d696e74416d6f756e74000000000000000000000000000000000000604482015260640161049d565b6105fc8282610ddb565b5050565b61060a3382610efb565b50565b60005473ffffffffffffffffffffffffffffffffffffffff16331461068e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161049d565b61069860006110e8565b565b60006106a683336102e0565b905081811015610737576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e636500000000000000000000000000000000000000000000000000000000606482015260840161049d565b6107448333848403610974565b61074e8383610efb565b505050565b60606005805461033a906112cd565b33600090815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8616845290915281205482811015610823576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161049d565b6108303385858403610974565b5060019392505050565b60006103ca338484610b27565b60005473ffffffffffffffffffffffffffffffffffffffff1633146108c8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161049d565b73ffffffffffffffffffffffffffffffffffffffff811661096b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161049d565b61060a816110e8565b73ffffffffffffffffffffffffffffffffffffffff8316610a16576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff8216610ab9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610bca576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff8216610c6d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604090205481811015610d23576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260016020526040808220858503905591851681529081208054849290610d6790849061134f565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610dcd91815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff8216610e58576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161049d565b8060036000828254610e6a919061134f565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604081208054839290610ea490849061134f565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216610f9e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604090205481811015611054576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161049d565b73ffffffffffffffffffffffffffffffffffffffff83166000908152600160205260408120838303905560038054849290611090908490611367565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600060208083528351808285015260005b8181101561118a5785810183015185820160400152820161116e565b8181111561119c576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff811681146111f457600080fd5b919050565b6000806040838503121561120c57600080fd5b611215836111d0565b946020939093013593505050565b60008060006060848603121561123857600080fd5b611241846111d0565b925061124f602085016111d0565b9150604084013590509250925092565b60006020828403121561127157600080fd5b5035919050565b60006020828403121561128a57600080fd5b611293826111d0565b9392505050565b600080604083850312156112ad57600080fd5b6112b6836111d0565b91506112c4602084016111d0565b90509250929050565b600181811c908216806112e157607f821691505b60208210810361131a577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561136257611362611320565b500190565b60008282101561137957611379611320565b50039056fea2646970667358221220ad131c9eafa7ce08657c4736fd40bb91008e9883cfc1aad8ae087a8ef62622b664736f6c634300080d0033";

export class WeightedLPToken__factory extends ContractFactory {
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
  ): Promise<WeightedLPToken> {
    return super.deploy(
      _name,
      _symbol,
      overrides || {}
    ) as Promise<WeightedLPToken>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, overrides || {});
  }
  attach(address: string): WeightedLPToken {
    return super.attach(address) as WeightedLPToken;
  }
  connect(signer: Signer): WeightedLPToken__factory {
    return super.connect(signer) as WeightedLPToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WeightedLPTokenInterface {
    return new utils.Interface(_abi) as WeightedLPTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WeightedLPToken {
    return new Contract(address, _abi, signerOrProvider) as WeightedLPToken;
  }
}
