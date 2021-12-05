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
  "0x608060405234801561001057600080fd5b50610848806100206000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063afb9d3ca1161005b578063afb9d3ca146100d2578063d1660f99146100e5578063d33219b4146100f8578063f8ea47561461013d57600080fd5b80630c612694146100825780633468a5b814610097578063485cc955146100bf575b600080fd5b61009561009036600461070b565b61015d565b005b6100aa6100a5366004610747565b610288565b60405190151581526020015b60405180910390f35b6100956100cd366004610769565b610323565b6100956100e0366004610769565b610457565b6100956100f336600461070b565b6104f1565b6001546101189073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b6565b6000546101189073ffffffffffffffffffffffffffffffffffffffff1681565b60015473ffffffffffffffffffffffffffffffffffffffff1633146101e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f5374616b65506f6f6c52657761726446756e643a202174696d656c6f636b000060448201526064015b60405180910390fd5b6101ec83610288565b610278576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5374616b65506f6f6c52657761726446756e643a206e6f7420616c6c6f77207260448201527f65636f7665722072657761726420746f6b656e0000000000000000000000000060648201526084016101da565b610283838383610572565b505050565b600080546040517f3468a5b800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015290911690633468a5b890602401602060405180830381865afa1580156102f9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061031d919061079c565b92915050565b60015474010000000000000000000000000000000000000000900460ff16156103ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f5374616b65506f6f6c52657761726446756e643a20616c726561647920696e6960448201527f7469616c697a656400000000000000000000000000000000000000000000000060648201526084016101da565b6000805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000909116179055600180547fffffffffffffffffffffff00000000000000000000000000000000000000000016919092161774010000000000000000000000000000000000000000179055565b6040517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526104ed908390839073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061009091906107be565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff163314610278576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5374616b65506f6f6c52657761726446756e643a20217374616b65506f6f6c0060448201526064016101da565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb00000000000000000000000000000000000000000000000000000000179052915160009283929087169161060991906107d7565b6000604051808303816000865af19150503d8060008114610646576040519150601f19603f3d011682016040523d82523d6000602084013e61064b565b606091505b5091509150818015610675575080511580610675575080806020019051810190610675919061079c565b6106db576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c45440060448201526064016101da565b5050505050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461070657600080fd5b919050565b60008060006060848603121561072057600080fd5b610729846106e2565b9250610737602085016106e2565b9150604084013590509250925092565b60006020828403121561075957600080fd5b610762826106e2565b9392505050565b6000806040838503121561077c57600080fd5b610785836106e2565b9150610793602084016106e2565b90509250929050565b6000602082840312156107ae57600080fd5b8151801515811461076257600080fd5b6000602082840312156107d057600080fd5b5051919050565b6000825160005b818110156107f857602081860181015185830152016107de565b81811115610807576000828501525b50919091019291505056fea264697066735822122081fed99bec9eaadcb830dae5e9ee28b91202dddfffa57c511cb431e8fe8563af64736f6c634300080a0033";

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
