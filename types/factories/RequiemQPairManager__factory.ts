/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RequiemQPairManager,
  RequiemQPairManagerInterface,
} from "../RequiemQPairManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_WETH",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "output",
        type: "address",
      },
    ],
    name: "Exchange",
    type: "event",
  },
  {
    inputs: [],
    name: "WETH",
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
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
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
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "tokenWeightA",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "swapFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "createPair",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "tokenWeight",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "swapFee",
        type: "uint32",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "createPairETH",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
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
    name: "formula",
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
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
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
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidityETHSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162002377380380620023778339810160408190526200003491620000db565b6001600160a01b038216608081905260408051634b75f54f60e01b81529051634b75f54f916004808201926020929091908290030181865afa1580156200007f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000a5919062000113565b6001600160a01b0390811660a0521660c0525062000138565b80516001600160a01b0381168114620000d657600080fd5b919050565b60008060408385031215620000ef57600080fd5b620000fa83620000be565b91506200010a60208401620000be565b90509250929050565b6000602082840312156200012657600080fd5b6200013182620000be565b9392505050565b60805160a05160c0516121a7620001d06000396000818160f30152818161025b0152818161067f015281816108a901528181610b5601528181610d6601528181611414015281816119ad0152611a7501526000818161019a015281816110f0015281816115430152818161160f01526117330152600081816102af015281816106c0015281816109740152610eae01526121a76000f3fe6080604052600436106100d65760003560e01c8063ad5c46481161007f578063d0f2c82a11610059578063d0f2c82a146102d1578063e1f4a784146102f1578063ebb5d2e914610311578063fbf451351461033157600080fd5b8063ad5c464814610249578063b56b681d1461027d578063c45a01551461029d57600080fd5b80634c17fd7c116100b05780634c17fd7c146101e15780636cb4942814610216578063a4aabb081461022957600080fd5b80630e2f024c146101275780633990ba541461015a5780634b75f54f1461018857600080fd5b36610122573373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461012057610120611beb565b005b600080fd5b34801561013357600080fd5b50610147610142366004611c63565b610351565b6040519081526020015b60405180910390f35b61016d610168366004611d0d565b61044e565b60408051938452602084019290925290820152606001610151565b34801561019457600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610151565b3480156101ed57600080fd5b506102016101fc366004611d7f565b6104cb565b60408051928352602083019190915201610151565b610147610224366004611e4f565b61063a565b34801561023557600080fd5b50610201610244366004611c63565b61074b565b34801561025557600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b34801561028957600080fd5b50610201610298366004611d0d565b61084e565b3480156102a957600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b3480156102dd57600080fd5b506101476102ec366004611eb3565b61090e565b3480156102fd57600080fd5b5061020161030c366004611f33565b610a87565b34801561031d57600080fd5b5061014761032c366004611d0d565b610afc565b34801561033d57600080fd5b5061016d61034c366004611fb8565b610c4a565b6000808561035f578a610381565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b6040517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018290526064810189905260ff8716608482015260a4810186905260c4810185905290915073ffffffffffffffffffffffffffffffffffffffff8e169063d505accf9060e401600060405180830381600087803b15801561041657600080fd5b505af115801561042a573d6000803e3d6000fd5b5050505061043d8d8d8d8d8d8d8d610afc565b9d9c50505050505050505050505050565b600080600083428110156104a95760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064015b60405180910390fd5b6104b78b8b8b8b8b8b610d5a565b919d909c50909a5098505050505050505050565b600080864281101561051f5760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104a0565b60008761052c578c61054e565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b90508f73ffffffffffffffffffffffffffffffffffffffff1663d505accf3330848d8c8c8c6040518863ffffffff1660e01b81526004016105de979695949392919073ffffffffffffffffffffffffffffffffffffffff97881681529590961660208601526040850193909352606084019190915260ff16608083015260a082015260c081019190915260e00190565b600060405180830381600087803b1580156105f857600080fd5b505af115801561060c573d6000803e3d6000fd5b50505050506106208f8f8f8f8f8f8f610e64565b8093508194505050509c509c9a5050505050505050505050565b6040517f14572adb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301527f00000000000000000000000000000000000000000000000000000000000000008116602483015263ffffffff80861660448401528416606483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906314572adb906084016020604051808303816000875af1158015610709573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072d9190612047565b905061073e81888860008088610d5a565b9998505050505050505050565b60008060008661075b578b61077d565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b6040517fd505accf00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101829052606481018a905260ff8816608482015260a4810187905260c4810186905290915073ffffffffffffffffffffffffffffffffffffffff8f169063d505accf9060e401600060405180830381600087803b15801561081257600080fd5b505af1158015610826573d6000803e3d6000fd5b505050506108398e8e8e8e8e8e8e61084e565b909f909e509c50505050505050505050505050565b60008082428110156108a25760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104a0565b6108d18a8a7f00000000000000000000000000000000000000000000000000000000000000008b8b8b30610e64565b90935091506108e189868561124e565b61090073eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee86846113a4565b505097509795505050505050565b6040517f14572adb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152878116602483015263ffffffff80861660448401528416606483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906314572adb906084016020604051808303816000875af11580156109bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e19190612047565b90506109f3818a8a8a8a6000806114aa565b50506040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152821690636a627842906024016020604051808303816000875af1158015610a63573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073e9190612064565b6000808242811015610adb5760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104a0565b610aea8b8b8b8b8b8b8b610e64565b909c909b509950505050505050505050565b60008142811015610b4f5760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104a0565b610b7f89897f00000000000000000000000000000000000000000000000000000000000000008a8a8a308a610a87565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152909350610c1e91508990869073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610bf5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c199190612064565b61124e565b610c3d73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee85846113a4565b5050979650505050505050565b60008060008342811015610ca05760405162461bcd60e51b815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104a0565b610caf8d8d8d8d8d8d8d6114aa565b6040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8981166004830152929650909450908e1690636a627842906024016020604051808303816000875af1158015610d24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d489190612064565b91505099509950999650505050505050565b6000806000610d8e89897f00000000000000000000000000000000000000000000000000000000000000008a348b8b6114e5565b9093509150610d9f88338b86611827565b610da9828a6119ab565b6040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528a1690636a627842906024016020604051808303816000875af1158015610e17573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3b9190612064565b905081341115610e5857610e5833610e53843461207d565b611af6565b96509650969350505050565b6040517fe5e31b1300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff888116600483015260009182917f0000000000000000000000000000000000000000000000000000000000000000169063e5e31b1390602401602060405180830381865afa158015610ef5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f1991906120bb565b610f655760405162461bcd60e51b815260206004820152601460248201527f526f757465723a20496e76616c6964207061697200000000000000000000000060448201526064016104a0565b6040517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8a166024820181905260448201889052906323b872dd906064016020604051808303816000875af1158015610fdf573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061100391906120bb565b506040517f89afcb4400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260009182918c16906389afcb449060240160408051808303816000875af1158015611076573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109a91906120d8565b6040517f544caa5600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8d811660048301528c811660248301529294509092506000917f0000000000000000000000000000000000000000000000000000000000000000169063544caa56906044016040805180830381865afa158015611136573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115a91906120fc565b5090508073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff161461119757818361119a565b82825b9095509350878510156111ef5760405162461bcd60e51b815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f415f414d4f554e5400000060448201526064016104a0565b8684101561123f5760405162461bcd60e51b815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f425f414d4f554e5400000060448201526064016104a0565b50505097509795505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905291516000928392908716916112e59190612136565b6000604051808303816000865af19150503d8060008114611322576040519150601f19603f3d011682016040523d82523d6000602084013e611327565b606091505b509150915081801561135157508051158061135157508080602001905181019061135191906120bb565b61139d5760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c45440060448201526064016104a0565b5050505050565b6000816113b3575060016114a3565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff85161415611494576040517f2e1a7d4d000000000000000000000000000000000000000000000000000000008152600481018390527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690632e1a7d4d90602401600060405180830381600087803b15801561146d57600080fd5b505af1158015611481573d6000803e3d6000fd5b5050505061148f8383611af6565b61149f565b61149f84848461124e565b5060015b9392505050565b6000806114bc898989898989896114e5565b90925090506114cd88338b85611827565b6114d987338b84611827565b97509795505050505050565b6040517f3274946100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152878116602483015286811660448301526000918291829182917f000000000000000000000000000000000000000000000000000000000000000016906332749461906064016040805180830381865afa158015611589573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115ad91906120d8565b915091508160001480156115bf575080155b156115cf57879350869250610900565b6040517fad615dec0000000000000000000000000000000000000000000000000000000081526004810189905260248101839052604481018290526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063ad615dec90606401602060405180830381865afa15801561166b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061168f9190612064565b90508781116116f357858110156116e85760405162461bcd60e51b815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f425f414d4f554e5400000060448201526064016104a0565b88945092508261123f565b6040517fad615dec0000000000000000000000000000000000000000000000000000000081526004810189905260248101839052604481018490526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063ad615dec90606401602060405180830381865afa15801561178f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117b39190612064565b9050898111156117c5576117c5611beb565b878110156118155760405162461bcd60e51b815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f415f414d4f554e5400000060448201526064016104a0565b9c979b50969950505050505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd0000000000000000000000000000000000000000000000000000000017905291516000928392908816916118c69190612136565b6000604051808303816000865af19150503d8060008114611903576040519150601f19603f3d011682016040523d82523d6000602084013e611908565b606091505b509150915081801561193257508051158061193257508080602001905181019061193291906120bb565b6119a35760405162461bcd60e51b8152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c45440000000000000000000000000000000000000000000000000000000060648201526084016104a0565b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b158015611a1357600080fd5b505af1158015611a27573d6000803e3d6000fd5b50506040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018790527f000000000000000000000000000000000000000000000000000000000000000016935063a9059cbb925060440190506020604051808303816000875af1158015611ac2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ae691906120bb565b611af257611af2611beb565b5050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611b2d9190612136565b60006040518083038185875af1925050503d8060008114611b6a576040519150601f19603f3d011682016040523d82523d6000602084013e611b6f565b606091505b5050905080611be65760405162461bcd60e51b815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104a0565b505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff81168114611c3c57600080fd5b50565b8015158114611c3c57600080fd5b803560ff81168114611c5e57600080fd5b919050565b60008060008060008060008060008060006101608c8e031215611c8557600080fd5b8b35611c9081611c1a565b9a5060208c0135611ca081611c1a565b995060408c0135985060608c0135975060808c0135965060a08c0135611cc581611c1a565b955060c08c0135945060e08c0135611cdc81611c3f565b9350611ceb6101008d01611c4d565b92506101208c013591506101408c013590509295989b509295989b9093969950565b600080600080600080600060e0888a031215611d2857600080fd5b8735611d3381611c1a565b96506020880135611d4381611c1a565b955060408801359450606088013593506080880135925060a0880135611d6881611c1a565b8092505060c0880135905092959891949750929550565b6000806000806000806000806000806000806101808d8f031215611da257600080fd5b8c35611dad81611c1a565b9b5060208d0135611dbd81611c1a565b9a5060408d0135611dcd81611c1a565b995060608d0135985060808d0135975060a08d0135965060c08d0135611df281611c1a565b955060e08d013594506101008d0135611e0a81611c3f565b9350611e196101208e01611c4d565b92506101408d013591506101608d013590509295989b509295989b509295989b565b803563ffffffff81168114611c5e57600080fd5b600080600080600060a08688031215611e6757600080fd5b8535611e7281611c1a565b945060208601359350611e8760408701611e3b565b9250611e9560608701611e3b565b91506080860135611ea581611c1a565b809150509295509295909350565b600080600080600080600060e0888a031215611ece57600080fd5b8735611ed981611c1a565b96506020880135611ee981611c1a565b95506040880135945060608801359350611f0560808901611e3b565b9250611f1360a08901611e3b565b915060c0880135611f2381611c1a565b8091505092959891949750929550565b600080600080600080600080610100898b031215611f5057600080fd5b8835611f5b81611c1a565b97506020890135611f6b81611c1a565b96506040890135611f7b81611c1a565b9550606089013594506080890135935060a0890135925060c0890135611fa081611c1a565b8092505060e089013590509295985092959890939650565b60008060008060008060008060006101208a8c031215611fd757600080fd5b8935611fe281611c1a565b985060208a0135611ff281611c1a565b975060408a013561200281611c1a565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013561202e81611c1a565b809250506101008a013590509295985092959850929598565b60006020828403121561205957600080fd5b81516114a381611c1a565b60006020828403121561207657600080fd5b5051919050565b6000828210156120b6577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500390565b6000602082840312156120cd57600080fd5b81516114a381611c3f565b600080604083850312156120eb57600080fd5b505080516020909101519092909150565b6000806040838503121561210f57600080fd5b825161211a81611c1a565b602084015190925061212b81611c1a565b809150509250929050565b6000825160005b81811015612157576020818601810151858301520161213d565b81811115612166576000828501525b50919091019291505056fea2646970667358221220da4fe6ad16810e43660da329ef221c13f661ab500ae53b1fc66bbfe0558c7c2564736f6c634300080a0033";

export class RequiemQPairManager__factory extends ContractFactory {
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
    _factory: string,
    _WETH: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RequiemQPairManager> {
    return super.deploy(
      _factory,
      _WETH,
      overrides || {}
    ) as Promise<RequiemQPairManager>;
  }
  getDeployTransaction(
    _factory: string,
    _WETH: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_factory, _WETH, overrides || {});
  }
  attach(address: string): RequiemQPairManager {
    return super.attach(address) as RequiemQPairManager;
  }
  connect(signer: Signer): RequiemQPairManager__factory {
    return super.connect(signer) as RequiemQPairManager__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemQPairManagerInterface {
    return new utils.Interface(_abi) as RequiemQPairManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemQPairManager {
    return new Contract(address, _abi, signerOrProvider) as RequiemQPairManager;
  }
}
