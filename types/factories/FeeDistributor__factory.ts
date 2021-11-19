/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FeeDistributor,
  FeeDistributorInterface,
} from "../FeeDistributor";

const _abi = [
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
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferFee",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "getSwapConfig",
    outputs: [
      {
        internalType: "enum FeeDistributor.SwapPoolType",
        name: "poolType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "basePool",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
      {
        internalType: "address",
        name: "_swapRouter",
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
        name: "",
        type: "address",
      },
    ],
    name: "operators",
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
    inputs: [
      {
        internalType: "address",
        name: "_fromToken",
        type: "address",
      },
      {
        internalType: "enum FeeDistributor.SwapPoolType",
        name: "poolType",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        internalType: "address",
        name: "basePool",
        type: "address",
      },
    ],
    name: "setSwapConfig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract RequiemStableSwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "target",
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
        internalType: "address",
        name: "_operator",
        type: "address",
      },
    ],
    name: "toggleOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "whiteListedTokens",
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
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61007a565b600080546001600160a01b038381166201000081810262010000600160b01b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b611370806100896000396000f3fe608060405234801561001057600080fd5b50600436106100af5760003560e01c806313e7c9d8146100b45780633fe529f0146100ec57806342b054f014610101578063485cc9551461014e5780636aee0e6314610161578063715018a6146101815780638119c065146101895780638da5cb5b14610191578063a166a94d14610199578063beabacc8146101ac578063c31c9c07146101bf578063d4b83992146101d2578063f2fde38b146101e5575b600080fd5b6100d76100c236600461105c565b60036020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6100ff6100fa36600461105c565b6101f8565b005b61013f61010f36600461105c565b6002602052600090815260409020805460019091015460ff8216916001600160a01b036101009091048116911683565b6040516100e393929190611096565b6100ff61015c3660046110d6565b610259565b61017461016f36600461110f565b61036d565b6040516100e39190611128565b6100ff610397565b6100ff6103d2565b6101746104a3565b6100ff6101a736600461113c565b6104b8565b6100ff6101ba36600461119c565b610706565b600454610174906001600160a01b031681565b600154610174906001600160a01b031681565b6100ff6101f336600461105c565b6108c2565b336102016104a3565b6001600160a01b0316146102305760405162461bcd60e51b8152600401610227906111dd565b60405180910390fd5b6001600160a01b03166000908152600360205260409020805460ff19811660ff90911615179055565b336102626104a3565b6001600160a01b0316146102885760405162461bcd60e51b8152600401610227906111dd565b600054610100900460ff16806102a1575060005460ff16155b6103045760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610227565b600054610100900460ff16158015610326576000805461ffff19166101011790555b600180546001600160a01b038086166001600160a01b03199283161790925560048054928516929091169190911790558015610368576000805461ff00191690555b505050565b6005818154811061037d57600080fd5b6000918252602090912001546001600160a01b0316905081565b336103a06104a3565b6001600160a01b0316146103c65760405162461bcd60e51b8152600401610227906111dd565b6103d0600061095b565b565b3360009081526003602052604090205460ff161515600114156103d05760005b6005548110156104a05760006005828154811061041157610411611212565b60009182526020808320909101546001600160a01b031680835260029091526040822090925090815460ff16600181111561044e5761044e611080565b14156104635761045e81836109b6565b61048b565b6001815460ff16600181111561047b5761047b611080565b141561048b5761048b8183610bfb565b505080806104989061123e565b9150506103f2565b50565b6000546201000090046001600160a01b031690565b336104c16104a3565b6001600160a01b0316146104e75760405162461bcd60e51b8152600401610227906111dd565b6001600160a01b0384166105345760405162461bcd60e51b81526020600482015260146024820152737a65726f46726f6d546f6b656e4164647265737360601b6044820152606401610227565b6001600160a01b03821661057c5760405162461bcd60e51b815260206004820152600f60248201526e7a65726f506f6f6c4164647265737360881b6044820152606401610227565b600183600181111561059057610590611080565b14156105e2576001600160a01b0381166105e25760405162461bcd60e51b81526020600482015260136024820152727a65726f42617365506f6f6c4164647265737360681b6044820152606401610227565b6001600160a01b0384811660009081526002602052604090205461010090041661065257600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0386161790555b604051806060016040528084600181111561066f5761066f611080565b81526001600160a01b03808516602080840191909152848216604093840152908716600090815260029091522081518154829060ff1916600183818111156106b9576106b9611080565b021790555060208201518154610100600160a81b0319166101006001600160a01b0392831602178255604090920151600190910180546001600160a01b0319169190921617905550505050565b3360009081526003602052604090205460ff16151560011415610368576040516370a0823160e01b81526000906001600160a01b038516906370a0823190610752903090600401611128565b602060405180830381865afa15801561076f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107939190611259565b90508181106108bc576107b06001600160a01b0385168484610e52565b6040516370a0823160e01b81526000906001600160a01b038616906370a08231906107df903090600401611128565b602060405180830381865afa1580156107fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108209190611259565b90508261082d8284611272565b1461086a5760405162461bcd60e51b815260206004820152600d60248201526c1d1c985b9cd9995c8b59985a5b609a1b6044820152606401610227565b604080513381526001600160a01b0386811660208301528716818301526060810185905290517f399b8b2d1a2cd048deba86f2732270178911b7def887b957d4e4530a5955e1249181900360800190a1505b50505050565b336108cb6104a3565b6001600160a01b0316146108f15760405162461bcd60e51b8152600401610227906111dd565b6001600160a01b0381166109565760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610227565b6104a0815b600080546001600160a01b038381166201000081810262010000600160b01b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b6040516370a0823160e01b815281906000906001600160a01b038316906370a08231906109e7903090600401611128565b602060405180830381865afa158015610a04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a289190611259565b905080156108bc5783546040516319b02f4960e21b81526101009091046001600160a01b03169060009082906366c0bd2490610a68908890600401611128565b602060405180830381865afa158015610a85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa99190611289565b6001546040516319b02f4960e21b81529192506000916001600160a01b03858116926366c0bd2492610ae19290911690600401611128565b602060405180830381865afa158015610afe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b229190611289565b8754909150610b43906001600160a01b038781169161010090041686610ea8565b6001600160a01b03831663bfd3956b838387600030610b64610e10426112ac565b6040516001600160e01b031960e089901b16815260ff9687166004820152959094166024860152604485019290925260648401526001600160a01b0316608483015260a482015260c4016020604051808303816000875af1158015610bcd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bf19190611259565b5050505050505050565b6040516370a0823160e01b815281906000906001600160a01b038316906370a0823190610c2c903090600401611128565b602060405180830381865afa158015610c49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c6d9190611259565b905080156108bc57835460018501546040516319b02f4960e21b81526101009092046001600160a01b039081169291169060009083906366c0bd2490610cb7908990600401611128565b602060405180830381865afa158015610cd4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf89190611289565b6001546040516319b02f4960e21b81529192506000916001600160a01b03858116926366c0bd2492610d309290911690600401611128565b602060405180830381865afa158015610d4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d719190611289565b600454909150610d8e906001600160a01b03888116911687610ea8565b6004546001600160a01b031663ff969322858585858a6000610db2610e10426112ac565b6040516001600160e01b031960e08a901b1681526001600160a01b03978816600482015296909516602487015260ff9384166044870152929091166064850152608484015260a483015260c482015260e4016020604051808303816000875af1158015610e23573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e479190611259565b505050505050505050565b6103688363a9059cbb60e01b8484604051602401610e719291906112c4565b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152610f48565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015610ef9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1d9190611259565b610f2791906112ac565b90506108bc8463095ea7b360e01b8584604051602401610e719291906112c4565b600080836001600160a01b031683604051610f6391906112dd565b6000604051808303816000865af19150503d8060008114610fa0576040519150601f19603f3d011682016040523d82523d6000602084013e610fa5565b606091505b50915091506000821415610fbd573d6000803e3d6000fd5b6108bc815160001480610fdf575081806020019051810190610fdf9190611318565b6101a281610ff057610ff081610ff4565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b6001600160a01b03811681146104a057600080fd5b60006020828403121561106e57600080fd5b813561107981611047565b9392505050565b634e487b7160e01b600052602160045260246000fd5b60608101600285106110b857634e487b7160e01b600052602160045260246000fd5b9381526001600160a01b039283166020820152911660409091015290565b600080604083850312156110e957600080fd5b82356110f481611047565b9150602083013561110481611047565b809150509250929050565b60006020828403121561112157600080fd5b5035919050565b6001600160a01b0391909116815260200190565b6000806000806080858703121561115257600080fd5b843561115d81611047565b935060208501356002811061117157600080fd5b9250604085013561118181611047565b9150606085013561119181611047565b939692955090935050565b6000806000606084860312156111b157600080fd5b83356111bc81611047565b925060208401356111cc81611047565b929592945050506040919091013590565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060001982141561125257611252611228565b5060010190565b60006020828403121561126b57600080fd5b5051919050565b60008282101561128457611284611228565b500390565b60006020828403121561129b57600080fd5b815160ff8116811461107957600080fd5b600082198211156112bf576112bf611228565b500190565b6001600160a01b03929092168252602082015260400190565b6000825160005b818110156112fe57602081860181015185830152016112e4565b8181111561130d576000828501525b509190910192915050565b60006020828403121561132a57600080fd5b8151801515811461107957600080fdfea26469706673582212200cf37307fcc58e54af857a18d8e7dfe2c20103de819dee0c809e5742f2e47b3864736f6c634300080a0033";

export class FeeDistributor__factory extends ContractFactory {
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
  ): Promise<FeeDistributor> {
    return super.deploy(overrides || {}) as Promise<FeeDistributor>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): FeeDistributor {
    return super.attach(address) as FeeDistributor;
  }
  connect(signer: Signer): FeeDistributor__factory {
    return super.connect(signer) as FeeDistributor__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FeeDistributorInterface {
    return new utils.Interface(_abi) as FeeDistributorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FeeDistributor {
    return new Contract(address, _abi, signerOrProvider) as FeeDistributor;
  }
}