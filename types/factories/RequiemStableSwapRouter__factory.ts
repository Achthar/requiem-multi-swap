/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RequiemStableSwapRouter,
  RequiemStableSwapRouterInterface,
} from "../RequiemStableSwapRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "meta_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "base_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "minToMint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "fromPool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "toPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calculateConvert",
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
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "calculateRemoveLiquidity",
    outputs: [
      {
        internalType: "uint256[]",
        name: "meta_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "base_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenIndexFrom",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "tokenIndexTo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256",
      },
    ],
    name: "calculateSwapFromBase",
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
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenIndexFrom",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "tokenIndexTo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256",
      },
    ],
    name: "calculateSwapToBase",
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
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "meta_amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "base_amounts",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "is_deposit",
        type: "bool",
      },
    ],
    name: "calculateTokenAmount",
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
        internalType: "contract IRequiemStableSwap",
        name: "fromPool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "toPool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minToMint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "convert",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "min_amounts_meta",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "min_amounts_base",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "base_amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenIndexFrom",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "tokenIndexTo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minDy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapFromBase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IRequiemStableSwap",
        name: "pool",
        type: "address",
      },
      {
        internalType: "contract IRequiemStableSwap",
        name: "basePool",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "tokenIndexFrom",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "tokenIndexTo",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minDy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "swapToBase",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506134cb806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063643abb8611610066578063643abb861461012757806377269e291461013a578063797018211461014d5780638a311c5714610160578063ff9693221461017357600080fd5b80630c8b2216146100a35780630d6307eb146100cd57806324a5bf21146100ee5780633214b8c91461010157806338c7897314610114575b600080fd5b6100b66100b1366004612d1c565b610186565b6040516100c4929190612d98565b60405180910390f35b6100e06100db366004612e91565b610398565b6040519081526020016100c4565b6100b66100fc366004612f76565b610a57565b6100e061010f36600461302a565b611222565b6100e061012236600461308e565b61140c565b6100e0610135366004612d1c565b61185a565b6100e0610148366004613113565b611b3c565b6100e061015b3660046131b0565b611cfc565b6100e061016e36600461302a565b612464565b6100e061018136600461308e565b612719565b6060806000846001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156101c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101ed9190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918816906366c0bd2490602401602060405180830381865afa158015610239573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025d9190613225565b604051637c61e56160e01b8152306004820152602481018790529091506001600160a01b03881690637c61e56190604401600060405180830381865afa1580156102ab573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526102d39190810190613242565b93506000848260ff16815181106102ec576102ec6132c7565b602002602001015190506000858360ff168151811061030d5761030d6132c7565b6020908102919091010152604051637c61e56160e01b8152306004820152602481018290526001600160a01b03881690637c61e56190604401600060405180830381865afa158015610363573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261038b9190810190613242565b9350505050935093915050565b600080876001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156103d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103fd9190613201565b9050866001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa15801561043d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061046191906132dd565b8551146104b55760405162461bcd60e51b815260206004820152601860248201527f696e76616c696442617365416d6f756e74734c656e677468000000000000000060448201526064015b60405180910390fd5b876001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa1580156104f3573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051791906132dd565b8651146105665760405162461bcd60e51b815260206004820152601860248201527f696e76616c69644d657461416d6f756e74734c656e677468000000000000000060448201526064016104ac565b6000805b86518160ff1610156106e1576000878260ff168151811061058d5761058d6132c7565b6020026020010151905060008111156106ce5760405162415c3360e91b815260ff83166004820152600193506000906001600160a01b038c16906382b8660090602401602060405180830381865afa1580156105ed573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106119190613201565b90506106286001600160a01b038216333085612aad565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561066f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069391906132dd565b90506106a96001600160a01b0383168d83612b1e565b808a8560ff16815181106106bf576106bf6132c7565b60200260200101818152505050505b50806106d98161330c565b91505061056a565b50801561075e57604051634d49e87d60e01b81526001600160a01b03891690634d49e87d90610719908990600090899060040161332c565b6020604051808303816000875af1158015610738573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075c91906132dd565b505b60005b87518160ff1610156108f55760405162415c3360e91b815260ff821660048201526000906001600160a01b038c16906382b8660090602401602060405180830381865afa1580156107b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107da9190613201565b90506000898360ff16815181106107f3576107f36132c7565b6020026020010151111561083d5761083d33308b8560ff168151811061081b5761081b6132c7565b6020026020010151846001600160a01b0316612aad909392919063ffffffff16565b6040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610884573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a891906132dd565b90506108be6001600160a01b0383168d83612b1e565b808a8460ff16815181106108d4576108d46132c7565b602002602001018181525050505080806108ed9061330c565b915050610761565b50604051634d49e87d60e01b81526001600160a01b038a1690634d49e87d90610926908a908990899060040161332c565b6020604051808303816000875af1158015610945573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061096991906132dd565b506040516370a0823160e01b81523060048201526000906001600160a01b038416906370a0823190602401602060405180830381865afa1580156109b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d591906132dd565b60405163a9059cbb60e01b8152336004820152602481018290529091506001600160a01b0384169063a9059cbb906044016020604051808303816000875af1158015610a25573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a499190613351565b509998505050505050505050565b60608060008a6001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a9a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abe9190613201565b905060008a6001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015610b00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b249190613201565b6040516323b872dd60e01b8152336004820152306024820152604481018c90529091506001600160a01b038316906323b872dd906064016020604051808303816000875af1158015610b7a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b9e9190613351565b50610bb36001600160a01b0383168d8c612b1e565b60405163031cd52b60e41b81526001600160a01b038d16906331cd52b090610be5908d908d908d908b9060040161336e565b6000604051808303816000875af1158015610c04573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610c2c9190810190613242565b506040516370a0823160e01b81523060048201526000906001600160a01b038316906370a0823190602401602060405180830381865afa158015610c74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9891906132dd565b9050610cae6001600160a01b0383168d83612b1e565b60405163031cd52b60e41b81526001600160a01b038d16906331cd52b090610ce09084908c908c908c9060040161336e565b6000604051808303816000875af1158015610cff573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610d279190810190613242565b508c6001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015610d66573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d8a91906132dd565b6001600160401b03811115610da157610da1612dbd565b604051908082528060200260200182016040528015610dca578160200160208202803683370190505b50945060005b8d6001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015610e0e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3291906132dd565b8160ff161015610fb25760008e6001600160a01b03166382b86600836040518263ffffffff1660e01b8152600401610e73919060ff91909116815260200190565b602060405180830381865afa158015610e90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb49190613201565b6040516370a0823160e01b81523060048201529091506001600160a01b038216906370a0823190602401602060405180830381865afa158015610efb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1f91906132dd565b878360ff1681518110610f3457610f346132c7565b6020026020010181815250506000878360ff1681518110610f5757610f576132c7565b60200260200101511115610f9f57610f9f33888460ff1681518110610f7e57610f7e6132c7565b6020026020010151836001600160a01b0316612bd09092919063ffffffff16565b5080610faa8161330c565b915050610dd0565b508b6001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ff1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061101591906132dd565b6001600160401b0381111561102c5761102c612dbd565b604051908082528060200260200182016040528015611055578160200160208202803683370190505b50935060005b8c6001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015611099573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110bd91906132dd565b8160ff1610156112115760405162415c3360e91b815260ff821660048201526000906001600160a01b038f16906382b8660090602401602060405180830381865afa158015611110573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111349190613201565b6040516370a0823160e01b81523060048201529091506001600160a01b038216906370a0823190602401602060405180830381865afa15801561117b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061119f91906132dd565b868360ff16815181106111b4576111b46132c7565b6020026020010181815250506000868360ff16815181106111d7576111d76132c7565b602002602001015111156111fe576111fe33878460ff1681518110610f7e57610f7e6132c7565b50806112098161330c565b91505061105b565b505050509850989650505050505050565b600080856001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611263573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112879190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918916906366c0bd2490602401602060405180830381865afa1580156112d3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112f79190613225565b90508360ff808316908816146113845760405163a95b089f60e01b815260ff808916600483015283166024820152604481018690526001600160a01b038a169063a95b089f90606401602060405180830381865afa15801561135d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061138191906132dd565b90505b604051630262267d60e61b81523060048201526024810182905260ff871660448201526001600160a01b038916906398899f40906064015b602060405180830381865afa1580156113d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113fd91906132dd565b93505050505b95945050505050565b600080876001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561144d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114719190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918b16906366c0bd2490602401602060405180830381865afa1580156114bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114e19190613225565b90506000896001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015611523573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061154791906132dd565b6001600160401b0381111561155e5761155e612dbd565b604051908082528060200260200182016040528015611587578160200160208202803683370190505b50905086818a60ff16815181106115a0576115a06132c7565b602090810291909101015260405162415c3360e91b815260ff8a1660048201526000906001600160a01b038c16906382b8660090602401602060405180830381865afa1580156115f4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116189190613201565b905061162f6001600160a01b03821633308b612aad565b6116436001600160a01b0382168c8a612b1e565b604051634d49e87d60e01b81526000906001600160a01b038d1690634d49e87d9061167690869085908c9060040161332c565b6020604051808303816000875af1158015611695573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b991906132dd565b90508960ff168460ff1614611757576116dc6001600160a01b0386168e83612b1e565b60405163bfd3956b60e01b81526001600160a01b038e169063bfd3956b906117129087908e9086908e9030908f906004016133bc565b6020604051808303816000875af1158015611731573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061175591906132dd565b505b60405162415c3360e91b815260ff8b1660048201526000906001600160a01b038f16906382b8660090602401602060405180830381865afa1580156117a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117c49190613201565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561180e573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061183291906132dd565b90506118486001600160a01b0383163383612bd0565b9e9d5050505050505050505050505050565b600080846001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa15801561189b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118bf91906132dd565b604051637c61e56160e01b8152306004820152602481018590529091506000906001600160a01b03871690637c61e56190604401600060405180830381865afa158015611910573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526119389190810190613242565b90506000826001600160401b0381111561195457611954612dbd565b60405190808252806020026020018201604052801561197d578160200160208202803683370190505b50905060005b838160ff161015611ac05760405162415c3360e91b815260ff821660048201526000906001600160a01b038a16906382b8660090602401602060405180830381865afa1580156119d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119fb9190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918a16906366c0bd2490602401602060405180830381865afa158015611a47573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a6b9190613225565b60ff169050848360ff1681518110611a8557611a856132c7565b6020026020010151848281518110611a9f57611a9f6132c7565b60200260200101818152505050508080611ab89061330c565b915050611983565b50604051637355940360e11b81526001600160a01b0387169063e6ab280690611af09084906001906004016133f5565b602060405180830381865afa158015611b0d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b3191906132dd565b979650505050505050565b600080856001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611b7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ba19190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918916906366c0bd2490602401602060405180830381865afa158015611bed573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c119190613225565b90506000876001600160a01b031663e6ab280687876040518363ffffffff1660e01b8152600401611c439291906133f5565b602060405180830381865afa158015611c60573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c8491906132dd565b905080878360ff1681518110611c9c57611c9c6132c7565b6020026020010151611cae9190613419565b878360ff1681518110611cc357611cc36132c7565b6020908102919091010152604051637355940360e11b81526001600160a01b038a169063e6ab2806906113bc908a9089906004016133f5565b600080866001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015611d3d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d6191906132dd565b90506000866001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa158015611da3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611dc791906132dd565b9050866001600160a01b0316886001600160a01b03161415611e1f5760405162461bcd60e51b8152602060048201526011602482015270199c9bdb541bdbdb080f481d1bd41bdbdb607a1b60448201526064016104ac565b808214611e6e5760405162461bcd60e51b815260206004820152601960248201527f706f6f6c546f6b656e734c656e6774684d6973736d617463680000000000000060448201526064016104ac565b6000886001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611eae573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ed29190613201565b90506000886001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa158015611f14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f389190613201565b90506000846001600160401b03811115611f5457611f54612dbd565b604051908082528060200260200182016040528015611f7d578160200160208202803683370190505b50905060005b858160ff16101561207e5760405162415c3360e91b815260ff821660048201526000906001600160a01b038e16906382b8660090602401602060405180830381865afa158015611fd7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ffb9190613201565b6040516319b02f4960e21b81526001600160a01b038083166004830152919250908d16906366c0bd2490602401602060405180830381865afa158015612045573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120699190613225565b505080806120769061330c565b915050611f83565b506040516323b872dd60e01b8152336004820152306024820152604481018a90526001600160a01b038416906323b872dd906064016020604051808303816000875af11580156120d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120f69190613351565b5061210b6001600160a01b0384168c8b612b1e565b60405163031cd52b60e41b81526001600160a01b038c16906331cd52b09061213b908c9085908c90600401613431565b6000604051808303816000875af115801561215a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526121829190810190613242565b506000846001600160401b0381111561219d5761219d612dbd565b6040519080825280602002602001820160405280156121c6578160200160208202803683370190505b50905060005b858160ff1610156122ff5760405162415c3360e91b815260ff821660048201526000906001600160a01b038e16906382b8660090602401602060405180830381865afa158015612220573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122449190613201565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa15801561228e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122b291906132dd565b90506122c86001600160a01b0383168f83612b1e565b80848460ff16815181106122de576122de6132c7565b602002602001018181525050505080806122f79061330c565b9150506121cc565b50604051634d49e87d60e01b81526001600160a01b038c1690634d49e87d906123309084908d908d9060040161332c565b6020604051808303816000875af115801561234f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061237391906132dd565b506040516370a0823160e01b81523060048201526000906001600160a01b038516906370a0823190602401602060405180830381865afa1580156123bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123df91906132dd565b60405163a9059cbb60e01b8152336004820152602481018290529091506001600160a01b0385169063a9059cbb906044016020604051808303816000875af115801561242f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124539190613351565b509c9b505050505050505050505050565b600080856001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156124a5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124c99190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918916906366c0bd2490602401602060405180830381865afa158015612515573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125399190613225565b90506000876001600160a01b031663efeecb516040518163ffffffff1660e01b8152600401602060405180830381865afa15801561257b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061259f91906132dd565b6001600160401b038111156125b6576125b6612dbd565b6040519080825280602002602001820160405280156125df578160200160208202803683370190505b50905084818860ff16815181106125f8576125f86132c7565b6020908102919091010152604051637355940360e11b81526000906001600160a01b038a169063e6ab2806906126359085906001906004016133f5565b602060405180830381865afa158015612652573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061267691906132dd565b90508660ff168360ff16141561269157935061140392505050565b60405163a95b089f60e01b815260ff808516600483015288166024820152604481018290526001600160a01b038b169063a95b089f90606401602060405180830381865afa1580156126e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061270b91906132dd565b9a9950505050505050505050565b600080876001600160a01b0316638214f5a46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561275a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061277e9190613201565b6040516319b02f4960e21b81526001600160a01b0380831660048301529192506000918b16906366c0bd2490602401602060405180830381865afa1580156127ca573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127ee9190613225565b60405162415c3360e91b815260ff8a1660048201529091506000906001600160a01b038c16906382b8660090602401602060405180830381865afa15801561283a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061285e9190613201565b90506128756001600160a01b03821633308a612aad565b8660ff838116908b1614612914576128976001600160a01b0383168d8a612b1e565b60405163bfd3956b60e01b81526001600160a01b038d169063bfd3956b906128ce908d9087908d9060009030908e906004016133bc565b6020604051808303816000875af11580156128ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061291191906132dd565b90505b6129286001600160a01b0385168c83612b1e565b6040516301f1d0ab60e51b81526004810182905260ff8a16602482015260448101889052606481018790526001600160a01b038c1690633e3a1560906084016020604051808303816000875af1158015612986573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129aa91906132dd565b5060405162415c3360e91b815260ff8a1660048201526000906001600160a01b038d16906382b8660090602401602060405180830381865afa1580156129f4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a189190613201565b6040516370a0823160e01b81523060048201529091506000906001600160a01b038316906370a0823190602401602060405180830381865afa158015612a62573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a8691906132dd565b9050612a9c6001600160a01b0383163383612bd0565b9d9c50505050505050505050505050565b6040516001600160a01b0380851660248301528316604482015260648101829052612b189085906323b872dd60e01b906084015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152612c05565b50505050565b604051636eb1769f60e11b81523060048201526001600160a01b038381166024830152600091839186169063dd62ed3e90604401602060405180830381865afa158015612b6f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b9391906132dd565b612b9d9190613419565b6040516001600160a01b038516602482015260448101829052909150612b1890859063095ea7b360e01b90606401612ae1565b6040516001600160a01b038316602482015260448101829052612c0090849063a9059cbb60e01b90606401612ae1565b505050565b600080836001600160a01b031683604051612c20919061345a565b6000604051808303816000865af19150503d8060008114612c5d576040519150601f19603f3d011682016040523d82523d6000602084013e612c62565b606091505b50915091506000821415612c7a573d6000803e3d6000fd5b612b18815160001480612c9c575081806020019051810190612c9c9190613351565b6101a281612cad57612cad81612cb1565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b6001600160a01b0381168114612d1957600080fd5b50565b600080600060608486031215612d3157600080fd5b8335612d3c81612d04565b92506020840135612d4c81612d04565b929592945050506040919091013590565b600081518084526020808501945080840160005b83811015612d8d57815187529582019590820190600101612d71565b509495945050505050565b604081526000612dab6040830185612d5d565b82810360208401526114038185612d5d565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715612dfb57612dfb612dbd565b604052919050565b60006001600160401b03821115612e1c57612e1c612dbd565b5060051b60200190565b600082601f830112612e3757600080fd5b81356020612e4c612e4783612e03565b612dd3565b82815260059290921b84018101918181019086841115612e6b57600080fd5b8286015b84811015612e865780358352918301918301612e6f565b509695505050505050565b60008060008060008060c08789031215612eaa57600080fd5b8635612eb581612d04565b95506020870135612ec581612d04565b945060408701356001600160401b0380821115612ee157600080fd5b612eed8a838b01612e26565b95506060890135915080821115612f0357600080fd5b50612f1089828a01612e26565b9350506080870135915060a087013590509295509295509295565b60008083601f840112612f3d57600080fd5b5081356001600160401b03811115612f5457600080fd5b6020830191508360208260051b8501011115612f6f57600080fd5b9250929050565b60008060008060008060008060c0898b031215612f9257600080fd5b8835612f9d81612d04565b97506020890135612fad81612d04565b96506040890135955060608901356001600160401b0380821115612fd057600080fd5b612fdc8c838d01612f2b565b909750955060808b0135915080821115612ff557600080fd5b506130028b828c01612f2b565b999c989b50969995989497949560a00135949350505050565b60ff81168114612d1957600080fd5b600080600080600060a0868803121561304257600080fd5b853561304d81612d04565b9450602086013561305d81612d04565b9350604086013561306d8161301b565b9250606086013561307d8161301b565b949793965091946080013592915050565b600080600080600080600060e0888a0312156130a957600080fd5b87356130b481612d04565b965060208801356130c481612d04565b955060408801356130d48161301b565b945060608801356130e48161301b565b9699959850939660808101359560a0820135955060c0909101359350915050565b8015158114612d1957600080fd5b600080600080600060a0868803121561312b57600080fd5b853561313681612d04565b9450602086013561314681612d04565b935060408601356001600160401b038082111561316257600080fd5b61316e89838a01612e26565b9450606088013591508082111561318457600080fd5b5061319188828901612e26565b92505060808601356131a281613105565b809150509295509295909350565b600080600080600060a086880312156131c857600080fd5b85356131d381612d04565b945060208601356131e381612d04565b94979496505050506040830135926060810135926080909101359150565b60006020828403121561321357600080fd5b815161321e81612d04565b9392505050565b60006020828403121561323757600080fd5b815161321e8161301b565b6000602080838503121561325557600080fd5b82516001600160401b0381111561326b57600080fd5b8301601f8101851361327c57600080fd5b805161328a612e4782612e03565b81815260059190911b820183019083810190878311156132a957600080fd5b928401925b82841015611b31578351825292840192908401906132ae565b634e487b7160e01b600052603260045260246000fd5b6000602082840312156132ef57600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff811415613323576133236132f6565b60010192915050565b60608152600061333f6060830186612d5d565b60208301949094525060400152919050565b60006020828403121561336357600080fd5b815161321e81613105565b848152606060208201819052810183905260006001600160fb1b0384111561339557600080fd5b8360051b808660808501376000908301608001908152604090920192909252949350505050565b60ff9687168152949095166020850152604084019290925260608301526001600160a01b0316608082015260a081019190915260c00190565b6040815260006134086040830185612d5d565b905082151560208301529392505050565b6000821982111561342c5761342c6132f6565b500190565b83815260606020820152600061344a6060830185612d5d565b9050826040830152949350505050565b6000825160005b8181101561347b5760208186018101518583015201613461565b8181111561348a576000828501525b50919091019291505056fea26469706673582212208879f1665d87882e6350259d6976dba16f19f523f9f58a1ea5a640db4f8932b764736f6c634300080a0033";

export class RequiemStableSwapRouter__factory extends ContractFactory {
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
  ): Promise<RequiemStableSwapRouter> {
    return super.deploy(overrides || {}) as Promise<RequiemStableSwapRouter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RequiemStableSwapRouter {
    return super.attach(address) as RequiemStableSwapRouter;
  }
  connect(signer: Signer): RequiemStableSwapRouter__factory {
    return super.connect(signer) as RequiemStableSwapRouter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemStableSwapRouterInterface {
    return new utils.Interface(_abi) as RequiemStableSwapRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemStableSwapRouter {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as RequiemStableSwapRouter;
  }
}
