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
  "0x608060405234801561001057600080fd5b50610671806100206000396000f3fe608060405234801561001057600080fd5b506004361061006d5760003560e01c80630c612694146100725780633468a5b814610087578063485cc955146100af578063afb9d3ca146100c2578063d1660f99146100d5578063d33219b4146100e8578063f8ea475614610108575b600080fd5b610085610080366004610520565b61011b565b005b61009a61009536600461055c565b6101fb565b60405190151581526020015b60405180910390f35b6100856100bd36600461057e565b610273565b6100856100d036600461057e565b610319565b6100856100e3366004610520565b61038f565b6001546100fb906001600160a01b031681565b6040516100a691906105b1565b6000546100fb906001600160a01b031681565b6001546001600160a01b0316331461017a5760405162461bcd60e51b815260206004820152601e60248201527f5374616b65506f6f6c52657761726446756e643a202174696d656c6f636b000060448201526064015b60405180910390fd5b610183836101fb565b6101eb5760405162461bcd60e51b815260206004820152603360248201527f5374616b65506f6f6c52657761726446756e643a206e6f7420616c6c6f77207260448201527232b1b7bb32b9103932bbb0b932103a37b5b2b760691b6064820152608401610171565b6101f68383836103e9565b505050565b6000805460405163068d14b760e31b81526001600160a01b0390911690633468a5b89061022c9085906004016105b1565b602060405180830381865afa158015610249573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026d91906105c5565b92915050565b600154600160a01b900460ff16156102de5760405162461bcd60e51b815260206004820152602860248201527f5374616b65506f6f6c52657761726446756e643a20616c726561647920696e696044820152671d1a585b1a5e995960c21b6064820152608401610171565b600080546001600160a01b039384166001600160a01b0319909116179055600180546001600160a81b0319169190921617600160a01b179055565b61038b8282846001600160a01b03166370a08231306040518263ffffffff1660e01b815260040161034a91906105b1565b602060405180830381865afa158015610367573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061008091906105e7565b5050565b6000546001600160a01b031633146101eb5760405162461bcd60e51b815260206004820152601f60248201527f5374616b65506f6f6c52657761726446756e643a20217374616b65506f6f6c006044820152606401610171565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392908716916104459190610600565b6000604051808303816000865af19150503d8060008114610482576040519150601f19603f3d011682016040523d82523d6000602084013e610487565b606091505b50915091508180156104b15750805115806104b15750808060200190518101906104b191906105c5565b6104fd5760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c4544006044820152606401610171565b5050505050565b80356001600160a01b038116811461051b57600080fd5b919050565b60008060006060848603121561053557600080fd5b61053e84610504565b925061054c60208501610504565b9150604084013590509250925092565b60006020828403121561056e57600080fd5b61057782610504565b9392505050565b6000806040838503121561059157600080fd5b61059a83610504565b91506105a860208401610504565b90509250929050565b6001600160a01b0391909116815260200190565b6000602082840312156105d757600080fd5b8151801515811461057757600080fd5b6000602082840312156105f957600080fd5b5051919050565b6000825160005b818110156106215760208186018101518583015201610607565b81811115610630576000828501525b50919091019291505056fea2646970667358221220a9ca8caff5312464a23fddf9ef190d7f4911c9e19b9376883badf0d1b3e4224464736f6c634300080a0033";

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