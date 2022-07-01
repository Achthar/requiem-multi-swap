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
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61007a565b600080546001600160a01b038381166201000081810262010000600160b01b0319851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b61172e806100896000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80638119c0651161008c578063beabacc811610066578063beabacc81461021d578063c31c9c0714610230578063d4b8399214610250578063f2fde38b1461027057600080fd5b80638119c065146101de5780638da5cb5b146101e6578063a166a94d1461020a57600080fd5b8063485cc955116100bd578063485cc9551461018b5780636aee0e631461019e578063715018a6146101d657600080fd5b806313e7c9d8146100e45780633fe529f01461011c57806342b054f014610131575b600080fd5b6101076100f2366004611411565b60036020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b61012f61012a366004611411565b610283565b005b61017c61013f366004611411565b6002602052600090815260409020805460019091015460ff82169173ffffffffffffffffffffffffffffffffffffffff6101009091048116911683565b60405161011393929190611464565b61012f6101993660046114ca565b610364565b6101b16101ac366004611503565b610559565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610113565b61012f610590565b61012f610624565b60005462010000900473ffffffffffffffffffffffffffffffffffffffff166101b1565b61012f61021836600461151c565b6106ff565b61012f61022b36600461157c565b610ad4565b6004546101b19073ffffffffffffffffffffffffffffffffffffffff1681565b6001546101b19073ffffffffffffffffffffffffffffffffffffffff1681565b61012f61027e366004611411565b610d15565b60005473ffffffffffffffffffffffffffffffffffffffff62010000909104163314610310576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff16600090815260036020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00811660ff90911615179055565b60005473ffffffffffffffffffffffffffffffffffffffff620100009091041633146103ec576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610307565b600054610100900460ff1680610405575060005460ff16155b610491576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152608401610307565b600054610100900460ff161580156104d057600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000166101011790555b6001805473ffffffffffffffffffffffffffffffffffffffff8086167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316179092556004805492851692909116919091179055801561055457600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff1690555b505050565b6005818154811061056957600080fd5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff16905081565b60005473ffffffffffffffffffffffffffffffffffffffff62010000909104163314610618576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610307565b6106226000610e45565b565b3360009081526003602052604090205460ff1615156001036106225760005b6005548110156106fc57600060058281548110610662576106626115bd565b600091825260208083209091015473ffffffffffffffffffffffffffffffffffffffff1680835260029091526040822090925090815460ff1660018111156106ac576106ac611435565b036106c0576106bb8183610ec3565b6106e7565b6001815460ff1660018111156106d8576106d8611435565b036106e7576106e78183611045565b505080806106f49061161b565b915050610643565b50565b60005473ffffffffffffffffffffffffffffffffffffffff62010000909104163314610787576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610307565b73ffffffffffffffffffffffffffffffffffffffff8416610804576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f7a65726f46726f6d546f6b656e416464726573730000000000000000000000006044820152606401610307565b73ffffffffffffffffffffffffffffffffffffffff8216610881576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f7a65726f506f6f6c4164647265737300000000000000000000000000000000006044820152606401610307565b600183600181111561089557610895611435565b036109175773ffffffffffffffffffffffffffffffffffffffff8116610917576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f7a65726f42617365506f6f6c41646472657373000000000000000000000000006044820152606401610307565b73ffffffffffffffffffffffffffffffffffffffff8481166000908152600260205260409020546101009004166109b957600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff86161790555b60405180606001604052808460018111156109d6576109d6611435565b815273ffffffffffffffffffffffffffffffffffffffff80851660208084019190915284821660409384015290871660009081526002909152208151815482907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660018381811115610a4b57610a4b611435565b0217905550602082015181547fffffffffffffffffffffff0000000000000000000000000000000000000000ff1661010073ffffffffffffffffffffffffffffffffffffffff92831602178255604090920151600190910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000169190921617905550505050565b3360009081526003602052604090205460ff161515600103610554576040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8516906370a0823190602401602060405180830381865afa158015610b5d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b819190611653565b9050818110610d0f57610bab73ffffffffffffffffffffffffffffffffffffffff8516848461111b565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009073ffffffffffffffffffffffffffffffffffffffff8616906370a0823190602401602060405180830381865afa158015610c18573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c3c9190611653565b905082610c49828461166c565b14610cb0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f7472616e736665722d6661696c000000000000000000000000000000000000006044820152606401610307565b6040805133815273ffffffffffffffffffffffffffffffffffffffff86811660208301528716818301526060810185905290517f399b8b2d1a2cd048deba86f2732270178911b7def887b957d4e4530a5955e1249181900360800190a1505b50505050565b60005473ffffffffffffffffffffffffffffffffffffffff62010000909104163314610d9d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610307565b73ffffffffffffffffffffffffffffffffffffffff8116610e40576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152608401610307565b6106fc815b6000805473ffffffffffffffffffffffffffffffffffffffff838116620100008181027fffffffffffffffffffff0000000000000000000000000000000000000000ffff851617855560405193049190911692909183917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a35050565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819060009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610f32573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f569190611653565b90508015610d0f57835473ffffffffffffffffffffffffffffffffffffffff610100909104811690610f8b90841682846111ef565b6001546040517f4ac00e0300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301529182166024820152604481018490526000606482015230608482015290821690634ac00e039060a4016020604051808303816000875af1158015611019573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103d9190611653565b505050505050565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152819060009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156110b4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110d89190611653565b90508015610d0f578354600185015460045473ffffffffffffffffffffffffffffffffffffffff6101009093048316929182169161103d918682169116856111ef565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526105549084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526112ed565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff8381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015611266573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061128a9190611653565b6112949190611683565b60405173ffffffffffffffffffffffffffffffffffffffff8516602482015260448101829052909150610d0f9085907f095ea7b3000000000000000000000000000000000000000000000000000000009060640161116d565b6000808373ffffffffffffffffffffffffffffffffffffffff1683604051611315919061169b565b6000604051808303816000865af19150503d8060008114611352576040519150601f19603f3d011682016040523d82523d6000602084013e611357565b606091505b5090925090508161136c573d6000803e3d6000fd5b8051158061138957508080602001905181019061138991906116d6565b610d0f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f534146455f45524332305f43414c4c5f4641494c4544000000000000000000006044820152606401610307565b73ffffffffffffffffffffffffffffffffffffffff811681146106fc57600080fd5b60006020828403121561142357600080fd5b813561142e816113ef565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b606081016002851061149f577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b93815273ffffffffffffffffffffffffffffffffffffffff9283166020820152911660409091015290565b600080604083850312156114dd57600080fd5b82356114e8816113ef565b915060208301356114f8816113ef565b809150509250929050565b60006020828403121561151557600080fd5b5035919050565b6000806000806080858703121561153257600080fd5b843561153d816113ef565b935060208501356002811061155157600080fd5b92506040850135611561816113ef565b91506060850135611571816113ef565b939692955090935050565b60008060006060848603121561159157600080fd5b833561159c816113ef565b925060208401356115ac816113ef565b929592945050506040919091013590565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361164c5761164c6115ec565b5060010190565b60006020828403121561166557600080fd5b5051919050565b60008282101561167e5761167e6115ec565b500390565b60008219821115611696576116966115ec565b500190565b6000825160005b818110156116bc57602081860181015185830152016116a2565b818111156116cb576000828501525b509190910192915050565b6000602082840312156116e857600080fd5b8151801515811461142e57600080fdfea26469706673582212201ee9a474b0db2e419fb8ceb4b55da0c4b4297518503c15c14ae3e2f3b2dae98664736f6c634300080f0033";

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
