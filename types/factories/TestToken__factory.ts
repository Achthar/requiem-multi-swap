/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestToken, TestTokenInterface } from "../TestToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
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
    name: "DEFAULT_ADMIN_ROLE",
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
    name: "MINTER_ROLE",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
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
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
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
  "0x60806040523480156200001157600080fd5b5060405162001b8438038062001b84833981016040819052620000349162000315565b8151829082906200004d906004906020850190620001a2565b50805162000063906005906020840190620001a2565b50506006805460ff191660121790555062000080600084620000b5565b620000ac7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a684620000b5565b505050620003dc565b620000c18282620000c5565b5050565b600082815260208181526040909120620000ea918390620009106200012c821b17901c565b15620000c15760405133906001600160a01b0383169084907f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d90600090a45050565b6001600160a01b03811660009081526001830160205260408120546200019857508154600180820184556000848152602080822090930180546001600160a01b0319166001600160a01b038616908117909155855490825282860190935260409020919091556200019c565b5060005b92915050565b828054620001b0906200039f565b90600052602060002090601f016020900481019282620001d457600085556200021f565b82601f10620001ef57805160ff19168380011785556200021f565b828001600101855582156200021f579182015b828111156200021f57825182559160200191906001019062000202565b506200022d92915062000231565b5090565b5b808211156200022d576000815560010162000232565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200027057600080fd5b81516001600160401b03808211156200028d576200028d62000248565b604051601f8301601f19908116603f01168101908282118183101715620002b857620002b862000248565b81604052838152602092508683858801011115620002d557600080fd5b600091505b83821015620002f95785820183015181830184015290820190620002da565b838211156200030b5760008385830101525b9695505050505050565b6000806000606084860312156200032b57600080fd5b83516001600160a01b03811681146200034357600080fd5b60208501519093506001600160401b03808211156200036157600080fd5b6200036f878388016200025e565b935060408601519150808211156200038657600080fd5b5062000395868287016200025e565b9150509250925092565b600181811c90821680620003b457607f821691505b60208210811415620003d657634e487b7160e01b600052602260045260246000fd5b50919050565b61179880620003ec6000396000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c806370a08231116100e3578063a457c2d71161008c578063d539139311610066578063d539139314610368578063d547741f1461038f578063dd62ed3e146103a257600080fd5b8063a457c2d71461032f578063a9059cbb14610342578063ca15c8731461035557600080fd5b806391d14854116100bd57806391d148541461030c57806395d89b411461031f578063a217fddf1461032757600080fd5b806370a082311461028b57806379cc6790146102c15780639010d07c146102d457600080fd5b80632f2ff15d11610145578063395093511161011f578063395093511461025257806340c10f191461026557806342966c681461027857600080fd5b80632f2ff15d1461021b578063313ce5671461023057806336568abe1461023f57600080fd5b806318160ddd1161017657806318160ddd146101d357806323b872dd146101e5578063248a9ca3146101f857600080fd5b806306fdde0314610192578063095ea7b3146101b0575b600080fd5b61019a6103e8565b6040516101a791906114a4565b60405180910390f35b6101c36101be366004611540565b61047a565b60405190151581526020016101a7565b6003545b6040519081526020016101a7565b6101c36101f336600461156a565b610491565b6101d76102063660046115a6565b60009081526020819052604090206002015490565b61022e6102293660046115bf565b61057c565b005b604051601281526020016101a7565b61022e61024d3660046115bf565b6105b2565b6101c3610260366004611540565b6105e0565b61022e610273366004611540565b610629565b61022e6102863660046115a6565b6106c3565b6101d76102993660046115eb565b73ffffffffffffffffffffffffffffffffffffffff1660009081526001602052604090205490565b61022e6102cf366004611540565b6106d0565b6102e76102e2366004611606565b610789565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101a7565b6101c361031a3660046115bf565b6107a8565b61019a6107e0565b6101d7600081565b6101c361033d366004611540565b6107ef565b6101c3610350366004611540565b6108c7565b6101d76103633660046115a6565b6108d4565b6101d77f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61022e61039d3660046115bf565b6108e8565b6101d76103b0366004611628565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260026020908152604080832093909416825291909152205490565b6060600480546103f790611652565b80601f016020809104026020016040519081016040528092919081815260200182805461042390611652565b80156104705780601f1061044557610100808354040283529160200191610470565b820191906000526020600020905b81548152906001019060200180831161045357829003601f168201915b5050505050905090565b60006104873384846109b4565b5060015b92915050565b600061049e848484610b67565b73ffffffffffffffffffffffffffffffffffffffff8416600090815260026020908152604080832033845290915290205482811015610564576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b61057185338584036109b4565b506001949350505050565b6000828152602081905260409020600201546105a49061059c90336107a8565b6101a6610e1b565b6105ae8282610e29565b5050565b6105d673ffffffffffffffffffffffffffffffffffffffff821633146101a8610e1b565b6105ae8282610e8f565b33600081815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916104879185906106249086906116d5565b6109b4565b6106537f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6336107a8565b6106b9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f4e4f545f4d494e54455200000000000000000000000000000000000000000000604482015260640161055b565b6105ae8282610ef5565b6106cd3382611015565b50565b60006106dc83336103b0565b90508181101561076d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e636500000000000000000000000000000000000000000000000000000000606482015260840161055b565b61077a83338484036109b4565b6107848383611015565b505050565b60008281526020819052604081206107a19083611202565b9392505050565b60008281526020818152604080832073ffffffffffffffffffffffffffffffffffffffff8516845260010190915281205415156107a1565b6060600580546103f790611652565b33600090815260026020908152604080832073ffffffffffffffffffffffffffffffffffffffff86168452909152812054828110156108b0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161055b565b6108bd33858584036109b4565b5060019392505050565b6000610487338484610b67565b60008181526020819052604081205461048b565b6000828152602081905260409020600201546105d69061090890336107a8565b6101a7610e1b565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001830160205260408120546109ac57508154600180820184556000848152602080822090930180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86169081179091558554908252828601909352604090209190915561048b565b50600061048b565b73ffffffffffffffffffffffffffffffffffffffff8316610a56576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff8216610af9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526002602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8316610c0a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff8216610cad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604090205481811015610d63576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260016020526040808220858503905591851681529081208054849290610da79084906116d5565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e0d91815260200190565b60405180910390a350505050565b816105ae576105ae8161121e565b6000828152602081905260409020610e419082610910565b156105ae57604051339073ffffffffffffffffffffffffffffffffffffffff83169084907f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d90600090a45050565b6000828152602081905260409020610ea7908261128b565b156105ae57604051339073ffffffffffffffffffffffffffffffffffffffff83169084907ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b90600090a45050565b73ffffffffffffffffffffffffffffffffffffffff8216610f72576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161055b565b8060036000828254610f8491906116d5565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604081208054839290610fbe9084906116d5565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff82166110b8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260409020548181101561116e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161055b565b73ffffffffffffffffffffffffffffffffffffffff831660009081526001602052604081208383039055600380548492906111aa9084906116ed565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b81546000906112149083106064610e1b565b6107a18383611464565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b73ffffffffffffffffffffffffffffffffffffffff81166000908152600183016020526040812054801561145a5760006112c66001836116ed565b85549091506000906112da906001906116ed565b90508082146113b95760008660000182815481106112fa576112fa611704565b600091825260209091200154875473ffffffffffffffffffffffffffffffffffffffff9091169150819088908590811061133657611336611704565b600091825260209091200180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff9290921691909117905561138f8360016116d5565b73ffffffffffffffffffffffffffffffffffffffff90911660009081526001880160205260409020555b85548690806113ca576113ca611733565b6000828152602080822083017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90810180547fffffffffffffffffffffffff000000000000000000000000000000000000000016905590920190925573ffffffffffffffffffffffffffffffffffffffff8716825260018881019091526040822091909155935061048b92505050565b600091505061048b565b600082600001828154811061147b5761147b611704565b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff169392505050565b600060208083528351808285015260005b818110156114d1578581018301518582016040015282016114b5565b818111156114e3576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461153b57600080fd5b919050565b6000806040838503121561155357600080fd5b61155c83611517565b946020939093013593505050565b60008060006060848603121561157f57600080fd5b61158884611517565b925061159660208501611517565b9150604084013590509250925092565b6000602082840312156115b857600080fd5b5035919050565b600080604083850312156115d257600080fd5b823591506115e260208401611517565b90509250929050565b6000602082840312156115fd57600080fd5b6107a182611517565b6000806040838503121561161957600080fd5b50508035926020909101359150565b6000806040838503121561163b57600080fd5b61164483611517565b91506115e260208401611517565b600181811c9082168061166657607f821691505b602082108114156116a0577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082198211156116e8576116e86116a6565b500190565b6000828210156116ff576116ff6116a6565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea2646970667358221220e3b5671a8e53afc67de89106def52266fb46e3aff042700725a5e3e580dd7ff264736f6c634300080a0033";

export class TestToken__factory extends ContractFactory {
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
    admin: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestToken> {
    return super.deploy(
      admin,
      name,
      symbol,
      overrides || {}
    ) as Promise<TestToken>;
  }
  getDeployTransaction(
    admin: string,
    name: string,
    symbol: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(admin, name, symbol, overrides || {});
  }
  attach(address: string): TestToken {
    return super.attach(address) as TestToken;
  }
  connect(signer: Signer): TestToken__factory {
    return super.connect(signer) as TestToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestTokenInterface {
    return new utils.Interface(_abi) as TestTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestToken {
    return new Contract(address, _abi, signerOrProvider) as TestToken;
  }
}
