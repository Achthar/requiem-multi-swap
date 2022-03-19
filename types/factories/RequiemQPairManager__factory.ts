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
  "0x60e06040523480156200001157600080fd5b50604051620024e5380380620024e58339810160408190526200003491620000db565b6001600160a01b038216608081905260408051634b75f54f60e01b81529051634b75f54f916004808201926020929091908290030181865afa1580156200007f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000a5919062000113565b6001600160a01b0390811660a0521660c0525062000138565b80516001600160a01b0381168114620000d657600080fd5b919050565b60008060408385031215620000ef57600080fd5b620000fa83620000be565b91506200010a60208401620000be565b90509250929050565b6000602082840312156200012657600080fd5b6200013182620000be565b9392505050565b60805160a05160c051612315620001d06000396000818160f30152818161025b015281816106b3015281816108f701528181610bd801528181610e020152818161151a01528181611b010152611bc901526000818161019a015281816111a6015281816116490152818161171501526118530152600081816102af015281816106f4015281816109c20152610f4a01526123156000f3fe6080604052600436106100d65760003560e01c8063ad5c46481161007f578063d0f2c82a11610059578063d0f2c82a146102d1578063e1f4a784146102f1578063ebb5d2e914610311578063fbf451351461033157600080fd5b8063ad5c464814610249578063b56b681d1461027d578063c45a01551461029d57600080fd5b80634c17fd7c116100b05780634c17fd7c146101e15780636cb4942814610216578063a4aabb081461022957600080fd5b80630e2f024c146101275780633990ba541461015a5780634b75f54f1461018857600080fd5b36610122573373ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000161461012057610120611d59565b005b600080fd5b34801561013357600080fd5b50610147610142366004611dd1565b610351565b6040519081526020015b60405180910390f35b61016d610168366004611e7b565b61044e565b60408051938452602084019290925290820152606001610151565b34801561019457600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610151565b3480156101ed57600080fd5b506102016101fc366004611eed565b6104e5565b60408051928352602083019190915201610151565b610147610224366004611fbd565b61066e565b34801561023557600080fd5b50610201610244366004611dd1565b61077f565b34801561025557600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b34801561028957600080fd5b50610201610298366004611e7b565b610882565b3480156102a957600080fd5b506101bc7f000000000000000000000000000000000000000000000000000000000000000081565b3480156102dd57600080fd5b506101476102ec366004612021565b61095c565b3480156102fd57600080fd5b5061020161030c3660046120a1565b610ad5565b34801561031d57600080fd5b5061014761032c366004611e7b565b610b64565b34801561033d57600080fd5b5061016d61034c366004612126565b610ccc565b6000808561035f578a610381565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b6040517fd505accf000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018290526064810189905260ff8716608482015260a4810186905260c4810185905290915073ffffffffffffffffffffffffffffffffffffffff8e169063d505accf9060e401600060405180830381600087803b15801561041657600080fd5b505af115801561042a573d6000803e3d6000fd5b5050505061043d8d8d8d8d8d8d8d610b64565b9d9c50505050505050505050505050565b600080600083428110156104c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064015b60405180910390fd5b6104d18b8b8b8b8b8b610df6565b919d909c50909a5098505050505050505050565b6000808642811015610553576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104ba565b600087610560578c610582565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b90508f73ffffffffffffffffffffffffffffffffffffffff1663d505accf3330848d8c8c8c6040518863ffffffff1660e01b8152600401610612979695949392919073ffffffffffffffffffffffffffffffffffffffff97881681529590961660208601526040850193909352606084019190915260ff16608083015260a082015260c081019190915260e00190565b600060405180830381600087803b15801561062c57600080fd5b505af1158015610640573d6000803e3d6000fd5b50505050506106548f8f8f8f8f8f8f610f00565b8093508194505050509c509c9a5050505050505050505050565b6040517f14572adb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff86811660048301527f00000000000000000000000000000000000000000000000000000000000000008116602483015263ffffffff80861660448401528416606483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906314572adb906084016020604051808303816000875af115801561073d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061076191906121b5565b905061077281888860008088610df6565b9998505050505050505050565b60008060008661078f578b6107b1565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5b6040517fd505accf00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101829052606481018a905260ff8816608482015260a4810187905260c4810186905290915073ffffffffffffffffffffffffffffffffffffffff8f169063d505accf9060e401600060405180830381600087803b15801561084657600080fd5b505af115801561085a573d6000803e3d6000fd5b5050505061086d8e8e8e8e8e8e8e610882565b909f909e509c50505050505050505050505050565b60008082428110156108f0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104ba565b61091f8a8a7f00000000000000000000000000000000000000000000000000000000000000008b8b8b30610f00565b909350915061092f898685611338565b61094e73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee86846114a8565b505097509795505050505050565b6040517f14572adb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152878116602483015263ffffffff80861660448401528416606483015260009182917f000000000000000000000000000000000000000000000000000000000000000016906314572adb906084016020604051808303816000875af1158015610a0b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a2f91906121b5565b9050610a41818a8a8a8a6000806115b0565b50506040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8481166004830152821690636a627842906024016020604051808303816000875af1158015610ab1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077291906121d2565b6000808242811015610b43576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104ba565b610b528b8b8b8b8b8b8b610f00565b909c909b509950505050505050505050565b60008142811015610bd1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104ba565b610c0189897f00000000000000000000000000000000000000000000000000000000000000008a8a8a308a610ad5565b6040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152909350610ca091508990869073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa158015610c77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9b91906121d2565b611338565b610cbf73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee85846114a8565b5050979650505050505050565b60008060008342811015610d3c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f526f757465723a2045585049524544000000000000000000000000000000000060448201526064016104ba565b610d4b8d8d8d8d8d8d8d6115b0565b6040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8981166004830152929650909450908e1690636a627842906024016020604051808303816000875af1158015610dc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de491906121d2565b91505099509950999650505050505050565b6000806000610e2a89897f00000000000000000000000000000000000000000000000000000000000000008a348b8b6115eb565b9093509150610e3b88338b86611961565b610e45828a611aff565b6040517f6a62784200000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85811660048301528a1690636a627842906024016020604051808303816000875af1158015610eb3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ed791906121d2565b905081341115610ef457610ef433610eef84346121eb565b611c4a565b96509650969350505050565b6040517fe5e31b1300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff888116600483015260009182917f0000000000000000000000000000000000000000000000000000000000000000169063e5e31b1390602401602060405180830381865afa158015610f91573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fb59190612229565b61101b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f526f757465723a20496e76616c6964207061697200000000000000000000000060448201526064016104ba565b6040517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8a166024820181905260448201889052906323b872dd906064016020604051808303816000875af1158015611095573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110b99190612229565b506040517f89afcb4400000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff848116600483015260009182918c16906389afcb449060240160408051808303816000875af115801561112c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111509190612246565b6040517f544caa5600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8d811660048301528c811660248301529294509092506000917f0000000000000000000000000000000000000000000000000000000000000000169063544caa56906044016040805180830381865afa1580156111ec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611210919061226a565b5090508073ffffffffffffffffffffffffffffffffffffffff168b73ffffffffffffffffffffffffffffffffffffffff161461124d578183611250565b82825b9095509350878510156112bf576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f415f414d4f554e5400000060448201526064016104ba565b86841015611329576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f425f414d4f554e5400000060448201526064016104ba565b50505097509795505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905291516000928392908716916113cf91906122a4565b6000604051808303816000865af19150503d806000811461140c576040519150601f19603f3d011682016040523d82523d6000602084013e611411565b606091505b509150915081801561143b57508051158061143b57508080602001905181019061143b9190612229565b6114a1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c45440060448201526064016104ba565b5050505050565b6000816000036114ba575060016115a9565b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff85160361159a576040517f2e1a7d4d000000000000000000000000000000000000000000000000000000008152600481018390527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1690632e1a7d4d90602401600060405180830381600087803b15801561157357600080fd5b505af1158015611587573d6000803e3d6000fd5b505050506115958383611c4a565b6115a5565b6115a5848484611338565b5060015b9392505050565b6000806115c2898989898989896115eb565b90925090506115d388338b85611961565b6115df87338b84611961565b97509795505050505050565b6040517f3274946100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8881166004830152878116602483015286811660448301526000918291829182917f000000000000000000000000000000000000000000000000000000000000000016906332749461906064016040805180830381865afa15801561168f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b39190612246565b915091508160001480156116c5575080155b156116d55787935086925061094e565b6040517fad615dec0000000000000000000000000000000000000000000000000000000081526004810189905260248101839052604481018290526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063ad615dec90606401602060405180830381865afa158015611771573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061179591906121d2565b90508781116118135785811015611808576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f425f414d4f554e5400000060448201526064016104ba565b889450925082611329565b6040517fad615dec0000000000000000000000000000000000000000000000000000000081526004810189905260248101839052604481018490526000907f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063ad615dec90606401602060405180830381865afa1580156118af573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118d391906121d2565b9050898111156118e5576118e5611d59565b8781101561194f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f526f757465723a20494e53554646494349454e545f415f414d4f554e5400000060448201526064016104ba565b9c979b50969950505050505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790529151600092839290881691611a0091906122a4565b6000604051808303816000865af19150503d8060008114611a3d576040519150601f19603f3d011682016040523d82523d6000602084013e611a42565b606091505b5091509150818015611a6c575080511580611a6c575080806020019051810190611a6c9190612229565b611af7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c45440000000000000000000000000000000000000000000000000000000060648201526084016104ba565b505050505050565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0836040518263ffffffff1660e01b81526004016000604051808303818588803b158015611b6757600080fd5b505af1158015611b7b573d6000803e3d6000fd5b50506040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8581166004830152602482018790527f000000000000000000000000000000000000000000000000000000000000000016935063a9059cbb925060440190506020604051808303816000875af1158015611c16573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c3a9190612229565b611c4657611c46611d59565b5050565b6040805160008082526020820190925273ffffffffffffffffffffffffffffffffffffffff8416908390604051611c8191906122a4565b60006040518083038185875af1925050503d8060008114611cbe576040519150601f19603f3d011682016040523d82523d6000602084013e611cc3565b606091505b5050905080611d54576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f5472616e7366657248656c7065723a204554485f5452414e534645525f46414960448201527f4c4544000000000000000000000000000000000000000000000000000000000060648201526084016104ba565b505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff81168114611daa57600080fd5b50565b8015158114611daa57600080fd5b803560ff81168114611dcc57600080fd5b919050565b60008060008060008060008060008060006101608c8e031215611df357600080fd5b8b35611dfe81611d88565b9a5060208c0135611e0e81611d88565b995060408c0135985060608c0135975060808c0135965060a08c0135611e3381611d88565b955060c08c0135945060e08c0135611e4a81611dad565b9350611e596101008d01611dbb565b92506101208c013591506101408c013590509295989b509295989b9093969950565b600080600080600080600060e0888a031215611e9657600080fd5b8735611ea181611d88565b96506020880135611eb181611d88565b955060408801359450606088013593506080880135925060a0880135611ed681611d88565b8092505060c0880135905092959891949750929550565b6000806000806000806000806000806000806101808d8f031215611f1057600080fd5b8c35611f1b81611d88565b9b5060208d0135611f2b81611d88565b9a5060408d0135611f3b81611d88565b995060608d0135985060808d0135975060a08d0135965060c08d0135611f6081611d88565b955060e08d013594506101008d0135611f7881611dad565b9350611f876101208e01611dbb565b92506101408d013591506101608d013590509295989b509295989b509295989b565b803563ffffffff81168114611dcc57600080fd5b600080600080600060a08688031215611fd557600080fd5b8535611fe081611d88565b945060208601359350611ff560408701611fa9565b925061200360608701611fa9565b9150608086013561201381611d88565b809150509295509295909350565b600080600080600080600060e0888a03121561203c57600080fd5b873561204781611d88565b9650602088013561205781611d88565b9550604088013594506060880135935061207360808901611fa9565b925061208160a08901611fa9565b915060c088013561209181611d88565b8091505092959891949750929550565b600080600080600080600080610100898b0312156120be57600080fd5b88356120c981611d88565b975060208901356120d981611d88565b965060408901356120e981611d88565b9550606089013594506080890135935060a0890135925060c089013561210e81611d88565b8092505060e089013590509295985092959890939650565b60008060008060008060008060006101208a8c03121561214557600080fd5b893561215081611d88565b985060208a013561216081611d88565b975060408a013561217081611d88565b965060608a0135955060808a0135945060a08a0135935060c08a0135925060e08a013561219c81611d88565b809250506101008a013590509295985092959850929598565b6000602082840312156121c757600080fd5b81516115a981611d88565b6000602082840312156121e457600080fd5b5051919050565b600082821015612224577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b500390565b60006020828403121561223b57600080fd5b81516115a981611dad565b6000806040838503121561225957600080fd5b505080516020909101519092909150565b6000806040838503121561227d57600080fd5b825161228881611d88565b602084015190925061229981611d88565b809150509250929050565b6000825160005b818110156122c557602081860181015185830152016122ab565b818111156122d4576000828501525b50919091019291505056fea26469706673582212203511e82e8e913da90d52bf5d0b8dfcbd495ccdedf422ba710ae4c013f4de571964736f6c634300080d0033";

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
