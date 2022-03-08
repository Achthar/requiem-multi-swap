/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakePoolRewardFund,
  StakePoolRewardFundInterface,
} from "../StakePoolRewardFund";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "allowRecoverRewardToken",
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
        name: "_stakePool",
        type: "address",
      },
      {
        internalType: "address",
        name: "_timelock",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "recoverAllRewardToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
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
    name: "recoverRewardToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "safeTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakePool",
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
    name: "timelock",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610722806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063afb9d3ca1161005b578063afb9d3ca146100d2578063d1660f99146100e5578063d33219b4146100f8578063f8ea47561461012357600080fd5b80630c612694146100825780633468a5b814610097578063485cc955146100bf575b600080fd5b6100956100903660046105e5565b610136565b005b6100aa6100a5366004610621565b610220565b60405190151581526020015b60405180910390f35b6100956100cd366004610643565b6102ae565b6100956100e0366004610643565b610399565b6100956100f33660046105e5565b610426565b60015461010b906001600160a01b031681565b6040516001600160a01b0390911681526020016100b6565b60005461010b906001600160a01b031681565b6001546001600160a01b031633146101955760405162461bcd60e51b815260206004820152601e60248201527f5374616b65506f6f6c52657761726446756e643a202174696d656c6f636b000060448201526064015b60405180910390fd5b61019e83610220565b6102105760405162461bcd60e51b815260206004820152603360248201527f5374616b65506f6f6c52657761726446756e643a206e6f7420616c6c6f77207260448201527f65636f7665722072657761726420746f6b656e00000000000000000000000000606482015260840161018c565b61021b838383610480565b505050565b600080546040517f3468a5b80000000000000000000000000000000000000000000000000000000081526001600160a01b03848116600483015290911690633468a5b890602401602060405180830381865afa158015610284573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102a89190610676565b92915050565b600154600160a01b900460ff161561032e5760405162461bcd60e51b815260206004820152602860248201527f5374616b65506f6f6c52657761726446756e643a20616c726561647920696e6960448201527f7469616c697a6564000000000000000000000000000000000000000000000000606482015260840161018c565b600080546001600160a01b039384167fffffffffffffffffffffffff0000000000000000000000000000000000000000909116179055600180547fffffffffffffffffffffff000000000000000000000000000000000000000000169190921617600160a01b179055565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015261042290839083906001600160a01b038316906370a0823190602401602060405180830381865afa1580156103fe573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100909190610698565b5050565b6000546001600160a01b031633146102105760405162461bcd60e51b815260206004820152601f60248201527f5374616b65506f6f6c52657761726446756e643a20217374616b65506f6f6c00604482015260640161018c565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb00000000000000000000000000000000000000000000000000000000179052915160009283929087169161050a91906106b1565b6000604051808303816000865af19150503d8060008114610547576040519150601f19603f3d011682016040523d82523d6000602084013e61054c565b606091505b50915091508180156105765750805115806105765750808060200190518101906105769190610676565b6105c25760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015260640161018c565b5050505050565b80356001600160a01b03811681146105e057600080fd5b919050565b6000806000606084860312156105fa57600080fd5b610603846105c9565b9250610611602085016105c9565b9150604084013590509250925092565b60006020828403121561063357600080fd5b61063c826105c9565b9392505050565b6000806040838503121561065657600080fd5b61065f836105c9565b915061066d602084016105c9565b90509250929050565b60006020828403121561068857600080fd5b8151801515811461063c57600080fd5b6000602082840312156106aa57600080fd5b5051919050565b6000825160005b818110156106d257602081860181015185830152016106b8565b818111156106e1576000828501525b50919091019291505056fea2646970667358221220b778a6bc43d58e44d7b366508501d87d9f250abf13b2dc2ef619fa723232674f64736f6c634300080c0033";

export class StakePoolRewardFund__factory extends ContractFactory {
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
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakePoolRewardFund> {
    return super.deploy(overrides || {}) as Promise<StakePoolRewardFund>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StakePoolRewardFund {
    return super.attach(address) as StakePoolRewardFund;
  }
  connect(signer: Signer): StakePoolRewardFund__factory {
    return super.connect(signer) as StakePoolRewardFund__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakePoolRewardFundInterface {
    return new utils.Interface(_abi) as StakePoolRewardFundInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakePoolRewardFund {
    return new Contract(address, _abi, signerOrProvider) as StakePoolRewardFund;
  }
}
