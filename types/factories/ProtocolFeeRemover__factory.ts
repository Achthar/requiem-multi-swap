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
  "0x608060405234801561001057600080fd5b50600180546001600160a01b031916331790556109a2806100326000396000f3fe608060405234801561001057600080fd5b506004361061006d5760003560e01c80635aa6e675146100725780635e4ba17c1461009b578063718da7ee146100b0578063a9059cbb146100c3578063ab033ea9146100d6578063f7260d3e146100e9578063ffb769f4146100fc575b600080fd5b600154610085906001600160a01b031681565b6040516100929190610707565b60405180910390f35b6100ae6100a936600461071b565b61010f565b005b6100ae6100be3660046107ab565b61033f565b6100ae6100d13660046107cd565b6103bf565b6100ae6100e43660046107ab565b61042d565b600054610085906001600160a01b031681565b6100ae61010a36600461071b565b6104a2565b6000546001600160a01b0316806101415760405162461bcd60e51b8152600401610138906107f7565b60405180910390fd5b60005b8281101561033957600084848381811061016057610160610843565b905060200201602081019061017591906107ab565b90506000816001600160a01b03166370a08231306040518263ffffffff1660e01b81526004016101a59190610707565b602060405180830381865afa1580156101c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e69190610859565b905080156103245760405163a9059cbb60e01b81526001600160a01b0383169063a9059cbb9061021c9085908590600401610872565b6020604051808303816000875af115801561023b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025f919061088b565b50600080836001600160a01b03166389afcb44876040518263ffffffff1660e01b815260040161028f9190610707565b60408051808303816000875af11580156102ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d191906108ad565b91509150836001600160a01b03167f0fbf06c058b90cb038a618f8c2acbf6145f8b3570fd1fa56abb8f0f3f05b36e88383604051610319929190918252602082015260400190565b60405180910390a250505b50508080610331906108d1565b915050610144565b50505050565b6001546001600160a01b031633146103695760405162461bcd60e51b8152600401610138906108fa565b600080546001600160a01b0319166001600160a01b0383161790556040517f2f69edf1b496867b439a36a0d934c9770b139d2790222bdeafc4f6daaa79c83a906103b4908390610707565b60405180910390a150565b6001546001600160a01b031633146103e95760405162461bcd60e51b8152600401610138906108fa565b6000546001600160a01b03166104115760405162461bcd60e51b8152600401610138906107f7565b6000546104299083906001600160a01b0316836105ea565b5050565b6001546001600160a01b031633146104575760405162461bcd60e51b8152600401610138906108fa565b600180546001600160a01b0319166001600160a01b0383161790556040517f13079bd259b6c430f434e223f09ff073409b818146629085e53378cf536d3ce8906103b4908390610707565b6001546001600160a01b031633146104cc5760405162461bcd60e51b8152600401610138906108fa565b6000546001600160a01b03166104f45760405162461bcd60e51b8152600401610138906107f7565b60005b818110156105e557600083838381811061051357610513610843565b905060200201602081019061052891906107ab565b6001600160a01b03166370a08231306040518263ffffffff1660e01b81526004016105539190610707565b602060405180830381865afa158015610570573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105949190610859565b90506105d28484848181106105ab576105ab610843565b90506020020160208101906105c091906107ab565b6000546001600160a01b0316836105ea565b50806105dd816108d1565b9150506104f7565b505050565b600080846001600160a01b031663a9059cbb858560405160240161060f929190610872565b6040516020818303038152906040529060e01b6020820180516001600160e01b0383818316178352505050506040516106489190610931565b6000604051808303816000865af19150503d8060008114610685576040519150601f19603f3d011682016040523d82523d6000602084013e61068a565b606091505b50915091508180156106b45750805115806106b45750808060200190518101906106b4919061088b565b6107005760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c4544006044820152606401610138565b5050505050565b6001600160a01b0391909116815260200190565b6000806020838503121561072e57600080fd5b82356001600160401b038082111561074557600080fd5b818501915085601f83011261075957600080fd5b81358181111561076857600080fd5b8660208260051b850101111561077d57600080fd5b60209290920196919550909350505050565b80356001600160a01b03811681146107a657600080fd5b919050565b6000602082840312156107bd57600080fd5b6107c68261078f565b9392505050565b600080604083850312156107e057600080fd5b6107e98361078f565b946020939093013593505050565b6020808252602c908201527f50726f746f636f6c46656552656d6f7665723a20496e76616c6964205265636560408201526b69766572206164647265737360a01b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b60006020828403121561086b57600080fd5b5051919050565b6001600160a01b03929092168252602082015260400190565b60006020828403121561089d57600080fd5b815180151581146107c657600080fd5b600080604083850312156108c057600080fd5b505080516020909101519092909150565b60006000198214156108f357634e487b7160e01b600052601160045260246000fd5b5060010190565b6020808252601d908201527f50726f746f636f6c46656552656d6f7665723a20464f5242494444454e000000604082015260600190565b6000825160005b818110156109525760208186018101518583015201610938565b81811115610961576000828501525b50919091019291505056fea2646970667358221220569804e0262afab9bbe7191e31f90fbf2db2a4f87480e526ee099b65a841b51e64736f6c634300080a0033";

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