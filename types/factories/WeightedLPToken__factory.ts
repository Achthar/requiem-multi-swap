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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200142c3803806200142c833981016040819052620000349162000147565b8181600362000044838262000240565b50600462000053828262000240565b50506005805433610100026001600160a81b0319909116176012179055506200030c915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000a257600080fd5b81516001600160401b0380821115620000bf57620000bf6200007a565b604051601f8301601f19908116603f01168101908282118183101715620000ea57620000ea6200007a565b816040528381526020925086838588010111156200010757600080fd5b600091505b838210156200012b57858201830151818301840152908201906200010c565b838211156200013d5760008385830101525b9695505050505050565b600080604083850312156200015b57600080fd5b82516001600160401b03808211156200017357600080fd5b620001818683870162000090565b935060208501519150808211156200019857600080fd5b50620001a78582860162000090565b9150509250929050565b600181811c90821680620001c657607f821691505b602082108103620001e757634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200023b57600081815260208120601f850160051c81016020861015620002165750805b601f850160051c820191505b81811015620002375782815560010162000222565b5050505b505050565b81516001600160401b038111156200025c576200025c6200007a565b62000274816200026d8454620001b1565b84620001ed565b602080601f831160018114620002ac5760008415620002935750858301515b600019600386901b1c1916600185901b17855562000237565b600085815260208120601f198616915b82811015620002dd57888601518255948401946001909101908401620002bc565b5085821015620002fc5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611110806200031c6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806342966c681161009757806395d89b411161006657806395d89b411461023d578063a457c2d714610245578063a9059cbb14610258578063dd62ed3e1461026b57600080fd5b806342966c681461019757806370a08231146101aa57806379cc6790146101e05780638119c065146101f357600080fd5b806323b872dd116100d357806323b872dd1461014d578063313ce56714610160578063395093511461016f57806340c10f191461018257600080fd5b806306fdde03146100fa578063095ea7b31461011857806318160ddd1461013b575b600080fd5b6101026102b1565b60405161010f9190610eb9565b60405180910390f35b61012b610126366004610f55565b610343565b604051901515815260200161010f565b6002545b60405190815260200161010f565b61012b61015b366004610f7f565b610359565b6040516012815260200161010f565b61012b61017d366004610f55565b610444565b610195610190366004610f55565b61048d565b005b6101956101a5366004610fbb565b61058b565b61013f6101b8366004610fd4565b73ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b6101956101ee366004610f55565b610598565b60055461021890610100900473ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161010f565b610102610651565b61012b610253366004610f55565b610660565b61012b610266366004610f55565b610738565b61013f610279366004610ff6565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260016020908152604080832093909416825291909152205490565b6060600380546102c090611029565b80601f01602080910402602001604051908101604052809291908181526020018280546102ec90611029565b80156103395780601f1061030e57610100808354040283529160200191610339565b820191906000526020600020905b81548152906001019060200180831161031c57829003601f168201915b5050505050905090565b6000610350338484610745565b50600192915050565b60006103668484846108f8565b73ffffffffffffffffffffffffffffffffffffffff841660009081526001602090815260408083203384529091529020548281101561042c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206160448201527f6c6c6f77616e636500000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b6104398533858403610745565b506001949350505050565b33600081815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490916103509185906104889086906110ab565b610745565b600554610100900473ffffffffffffffffffffffffffffffffffffffff163314610513576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f756e617574686f72697a656400000000000000000000000000000000000000006044820152606401610423565b6000811161057d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f7a65726f4d696e74416d6f756e740000000000000000000000000000000000006044820152606401610423565b6105878282610bac565b5050565b6105953382610ccc565b50565b60006105a48333610279565b905081811015610635576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760448201527f616e6365000000000000000000000000000000000000000000000000000000006064820152608401610423565b6106428333848403610745565b61064c8383610ccc565b505050565b6060600480546102c090611029565b33600090815260016020908152604080832073ffffffffffffffffffffffffffffffffffffffff8616845290915281205482811015610721576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152608401610423565b61072e3385858403610745565b5060019392505050565b60006103503384846108f8565b73ffffffffffffffffffffffffffffffffffffffff83166107e7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff821661088a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff831661099b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff8216610a3e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff831660009081526020819052604090205481811015610af4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff808516600090815260208190526040808220858503905591851681529081208054849290610b389084906110ab565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610b9e91815260200190565b60405180910390a350505050565b73ffffffffffffffffffffffffffffffffffffffff8216610c29576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610423565b8060026000828254610c3b91906110ab565b909155505073ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604081208054839290610c759084906110ab565b909155505060405181815273ffffffffffffffffffffffffffffffffffffffff8316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b73ffffffffffffffffffffffffffffffffffffffff8216610d6f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff821660009081526020819052604090205481811015610e25576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f63650000000000000000000000000000000000000000000000000000000000006064820152608401610423565b73ffffffffffffffffffffffffffffffffffffffff83166000908152602081905260408120838303905560028054849290610e619084906110c3565b909155505060405182815260009073ffffffffffffffffffffffffffffffffffffffff8516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b600060208083528351808285015260005b81811015610ee657858101830151858201604001528201610eca565b81811115610ef8576000604083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016929092016040019392505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610f5057600080fd5b919050565b60008060408385031215610f6857600080fd5b610f7183610f2c565b946020939093013593505050565b600080600060608486031215610f9457600080fd5b610f9d84610f2c565b9250610fab60208501610f2c565b9150604084013590509250925092565b600060208284031215610fcd57600080fd5b5035919050565b600060208284031215610fe657600080fd5b610fef82610f2c565b9392505050565b6000806040838503121561100957600080fd5b61101283610f2c565b915061102060208401610f2c565b90509250929050565b600181811c9082168061103d57607f821691505b602082108103611076577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082198211156110be576110be61107c565b500190565b6000828210156110d5576110d561107c565b50039056fea2646970667358221220f1e392f1c753f278c39a5cf577e4ac7f164aca025ad0d454c1cc5fcdfa4378e764736f6c634300080f0033";

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
