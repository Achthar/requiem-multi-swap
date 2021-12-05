/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ProtocolFeeRemover,
  ProtocolFeeRemoverInterface,
} from "../ProtocolFeeRemover";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "changeValue",
        type: "address",
      },
    ],
    name: "ChangeGovernance",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "changeValue",
        type: "address",
      },
    ],
    name: "ChangeReceiver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token1",
        type: "uint256",
      },
    ],
    name: "RemoveLiquidity",
    type: "event",
  },
  {
    inputs: [],
    name: "governance",
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
    name: "receiver",
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
        internalType: "address[]",
        name: "pairs",
        type: "address[]",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_governance",
        type: "address",
      },
    ],
    name: "setGovernance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "setReceiver",
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
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_tokens",
        type: "address[]",
      },
    ],
    name: "transferAllTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600180546001600160a01b03191633179055610db5806100326000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063a9059cbb1161005b578063a9059cbb146100f3578063ab033ea914610106578063f7260d3e14610119578063ffb769f41461013957600080fd5b80635aa6e675146100825780635e4ba17c146100cb578063718da7ee146100e0575b600080fd5b6001546100a29073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6100de6100d9366004610b6c565b61014c565b005b6100de6100ee366004610c0a565b610471565b6100de610101366004610c2c565b61056c565b6100de610114366004610c0a565b6106bb565b6000546100a29073ffffffffffffffffffffffffffffffffffffffff1681565b6100de610147366004610b6c565b6107af565b60005473ffffffffffffffffffffffffffffffffffffffff16806101f7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f50726f746f636f6c46656552656d6f7665723a20496e76616c6964205265636560448201527f697665722061646472657373000000000000000000000000000000000000000060648201526084015b60405180910390fd5b60005b8281101561046b57600084848381811061021657610216610c56565b905060200201602081019061022b9190610c0a565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290915060009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa15801561029b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bf9190610c85565b90508015610456576040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff831660048201819052602482018390529063a9059cbb906044016020604051808303816000875af115801561033b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035f9190610c9e565b506040517f89afcb4400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff858116600483015260009182918516906389afcb449060240160408051808303816000875af11580156103d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f69190610cc0565b915091508373ffffffffffffffffffffffffffffffffffffffff167f0fbf06c058b90cb038a618f8c2acbf6145f8b3570fd1fa56abb8f0f3f05b36e8838360405161044b929190918252602082015260400190565b60405180910390a250505b5050808061046390610ce4565b9150506101fa565b50505050565b60015473ffffffffffffffffffffffffffffffffffffffff1633146104f2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f50726f746f636f6c46656552656d6f7665723a20464f5242494444454e00000060448201526064016101ee565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f2f69edf1b496867b439a36a0d934c9770b139d2790222bdeafc4f6daaa79c83a906020015b60405180910390a150565b60015473ffffffffffffffffffffffffffffffffffffffff1633146105ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f50726f746f636f6c46656552656d6f7665723a20464f5242494444454e00000060448201526064016101ee565b60005473ffffffffffffffffffffffffffffffffffffffff16610692576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f50726f746f636f6c46656552656d6f7665723a20496e76616c6964205265636560448201527f697665722061646472657373000000000000000000000000000000000000000060648201526084016101ee565b6000546106b790839073ffffffffffffffffffffffffffffffffffffffff16836109fc565b5050565b60015473ffffffffffffffffffffffffffffffffffffffff16331461073c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f50726f746f636f6c46656552656d6f7665723a20464f5242494444454e00000060448201526064016101ee565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556040519081527f13079bd259b6c430f434e223f09ff073409b818146629085e53378cf536d3ce890602001610561565b60015473ffffffffffffffffffffffffffffffffffffffff163314610830576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f50726f746f636f6c46656552656d6f7665723a20464f5242494444454e00000060448201526064016101ee565b60005473ffffffffffffffffffffffffffffffffffffffff166108d5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f50726f746f636f6c46656552656d6f7665723a20496e76616c6964205265636560448201527f697665722061646472657373000000000000000000000000000000000000000060648201526084016101ee565b60005b818110156109f75760008383838181106108f4576108f4610c56565b90506020020160208101906109099190610c0a565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff91909116906370a0823190602401602060405180830381865afa158015610975573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109999190610c85565b90506109e48484848181106109b0576109b0610c56565b90506020020160208101906109c59190610c0a565b60005473ffffffffffffffffffffffffffffffffffffffff16836109fc565b50806109ef81610ce4565b9150506108d8565b505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790529151600092839290871691610a939190610d44565b6000604051808303816000865af19150503d8060008114610ad0576040519150601f19603f3d011682016040523d82523d6000602084013e610ad5565b606091505b5091509150818015610aff575080511580610aff575080806020019051810190610aff9190610c9e565b610b65576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c45440060448201526064016101ee565b5050505050565b60008060208385031215610b7f57600080fd5b823567ffffffffffffffff80821115610b9757600080fd5b818501915085601f830112610bab57600080fd5b813581811115610bba57600080fd5b8660208260051b8501011115610bcf57600080fd5b60209290920196919550909350505050565b803573ffffffffffffffffffffffffffffffffffffffff81168114610c0557600080fd5b919050565b600060208284031215610c1c57600080fd5b610c2582610be1565b9392505050565b60008060408385031215610c3f57600080fd5b610c4883610be1565b946020939093013593505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600060208284031215610c9757600080fd5b5051919050565b600060208284031215610cb057600080fd5b81518015158114610c2557600080fd5b60008060408385031215610cd357600080fd5b505080516020909101519092909150565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610d3d577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b6000825160005b81811015610d655760208186018101518583015201610d4b565b81811115610d74576000828501525b50919091019291505056fea2646970667358221220135581f04bc882fd8bb3dcc705d31f824e248f3ef4f9f2a2473b53cead8a4d9864736f6c634300080a0033";

export class ProtocolFeeRemover__factory extends ContractFactory {
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
  ): Promise<ProtocolFeeRemover> {
    return super.deploy(overrides || {}) as Promise<ProtocolFeeRemover>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ProtocolFeeRemover {
    return super.attach(address) as ProtocolFeeRemover;
  }
  connect(signer: Signer): ProtocolFeeRemover__factory {
    return super.connect(signer) as ProtocolFeeRemover__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolFeeRemoverInterface {
    return new utils.Interface(_abi) as ProtocolFeeRemoverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFeeRemover {
    return new Contract(address, _abi, signerOrProvider) as ProtocolFeeRemover;
  }
}
