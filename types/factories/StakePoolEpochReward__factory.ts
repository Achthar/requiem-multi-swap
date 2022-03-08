/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakePoolEpochReward,
  StakePoolEpochRewardInterface,
} from "../StakePoolEpochReward";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_controller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_version",
        type: "uint256",
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
        internalType: "uint256",
        name: "blocktime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AllocateReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "poolId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pendingReward",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rebaseAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paidReward",
        type: "uint256",
      },
    ],
    name: "PayRewardPool",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "BLOCKS_PER_DAY",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "allocateReward",
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
    inputs: [],
    name: "balance",
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
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "canClaimReward",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "canWithdraw",
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
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "controller",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "earned",
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
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "epoch",
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
    inputs: [],
    name: "epochController",
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
    name: "exit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "getLastSnapshotIndexOf",
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
        internalType: "address",
        name: "_stakeToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardFund",
        type: "address",
      },
      {
        internalType: "address",
        name: "_timelock",
        type: "address",
      },
      {
        internalType: "address",
        name: "_epochController",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_withdrawLockupEpochs",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardLockupEpochs",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "latestSnapshotIndex",
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
    inputs: [],
    name: "nextEpochAllocatedReward",
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
    inputs: [],
    name: "nextEpochLength",
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
    inputs: [],
    name: "nextEpochPoint",
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
    inputs: [],
    name: "rewardFund",
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
    name: "rewardLockupEpochs",
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
    inputs: [],
    name: "rewardPerShare",
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
    inputs: [],
    name: "rewardToken",
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
        name: "_epochController",
        type: "address",
      },
    ],
    name: "setEpochController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawLockupEpochs",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_rewardLockupEpochs",
        type: "uint256",
      },
    ],
    name: "setLockUp",
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
    name: "snapshotHistory",
    outputs: [
      {
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardReceived",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardPerShare",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "stakeFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakeToken",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "unlockRewardEpoch",
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
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "unlockWithdrawEpoch",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastSnapshotIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rewardEarned",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "epochTimerStart",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawLockupEpochs",
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
];

const _bytecode =
  "0x60806040526001600c55600d805460ff1916905534801561001f57600080fd5b50604051611fa9380380611fa983398101604081905261003e91610112565b600a80546001600160a01b039093166001600160a01b031993841617905560098054909216331790915560009081556040805160608101825243815260208101838152918101838152600680546001810182559452905160039093027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019390935590517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d40830155517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015561014c565b6000806040838503121561012557600080fd5b82516001600160a01b038116811461013c57600080fd5b6020939093015192949293505050565b611e4e8061015b6000396000f3fe608060405234801561001057600080fd5b506004361061025b5760003560e01c80635a9c064411610145578063c5967c26116100bd578063e7d80e311161008c578063efe2226611610071578063efe22266146104f1578063f77c479114610504578063f7c618c11461051757600080fd5b8063e7d80e31146104d6578063e9fad8ee146104e957600080fd5b8063c5967c26146104a0578063d33219b4146104a8578063db2e21bc146104bb578063e2dcb616146104c357600080fd5b8063900cf0cf11610114578063b33f9527116100f9578063b33f95271461047c578063b69ef8a81461048f578063b88a802f1461049857600080fd5b8063900cf0cf14610461578063a694fc3a1461046957600080fd5b80635a9c06441461040657806362e7e463146104195780636bb987fe1461042c578063714b46581461043557600080fd5b806322455618116101d85780633f9e3f04116101a75780634bf692061161018c5780634bf69206146103d757806351ed6a30146103ea57806354fd4d50146103fd57600080fd5b80633f9e3f04146103c7578063446a2ec8146103cf57600080fd5b806322455618146103845780632e1a7d4d1461038c5780632ffaaa09146103a15780633468a5b8146103b457600080fd5b806307284ce91161022f57806319262d301161021457806319262d30146103135780631959a002146103265780631e85cd651461037b57600080fd5b806307284ce9146102dd57806311815a39146102e557600080fd5b80628cc26214610260578063022ba18d1461028657806303df48681461028f578063046335d0146102ba575b600080fd5b61027361026e366004611c38565b61052a565b6040519081526020015b60405180910390f35b61027360045481565b6001546102a2906001600160a01b031681565b6040516001600160a01b03909116815260200161027d565b6102cd6102c8366004611c38565b6105d0565b604051901515815260200161027d565b61027361060a565b6102f86102f3366004611c53565b610696565b6040805193845260208401929092529082015260600161027d565b6102cd610321366004611c38565b6106c9565b61035b610334366004611c38565b60056020526000908152604090208054600182015460028301546003909301549192909184565b60408051948552602085019390935291830152606082015260800161027d565b61027360035481565b6102736106fc565b61039f61039a366004611c53565b61075e565b005b61039f6103af366004611c6c565b610806565b6102cd6103c2366004611c38565b610913565b610273610963565b610273610974565b61039f6103e5366004611c38565b610987565b6007546102a2906001600160a01b031681565b61027360005481565b61039f610414366004611c38565b610aaf565b610273610427366004611c38565b610ba3565b61027361708081565b610273610443366004611c38565b6001600160a01b031660009081526005602052604090206001015490565b610273610bd4565b61039f610477366004611c53565b610c37565b61039f61048a366004611c8e565b610c9e565b610273600b5481565b61039f610d91565b610273610d9d565b6009546102a2906001600160a01b031681565b61039f610e00565b61039f6104d1366004611c53565b610f59565b6102736104e4366004611c38565b61129b565b61039f6112c4565b6008546102a2906001600160a01b031681565b600a546102a2906001600160a01b031681565b6002546102a2906001600160a01b031681565b6000806105356112dd565b604001519050600061054684611357565b6040908101516001600160a01b038616600090815260056020908152908390208351608081018552815481526001820154928101929092526002810154938201849052600301546060820152909250906105c7906105c1670de0b6b3a76400006105bb6105b388886113ed565b865190611402565b9061140e565b9061141a565b95945050505050565b60006105da610bd4565b6004546001600160a01b0384166000908152600560205260409020600301546106029161141a565b111592915050565b600154604080517f07284ce900000000000000000000000000000000000000000000000000000000815290516000926001600160a01b0316916307284ce99160048083019260209291908290030181865afa15801561066d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106919190611d06565b905090565b600681815481106106a657600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b60006106d3610bd4565b600380546001600160a01b0385166000908152600560205260409020909101546106029161141a565b6001546040517f7effa5b60000000000000000000000000000000000000000000000000000000081523060048201526000916001600160a01b031690637effa5b690602401602060405180830381865afa15801561066d573d6000803e3d6000fd5b600c546001146107a45760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b60448201526064015b60405180910390fd5b6000600c556107b281611437565b6007546107c9906001600160a01b0316338361153e565b60405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a2506001600c55565b600c546001146108475760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c556009546001600160a01b031633146108a65760405162461bcd60e51b815260206004820152600f60248201527f535045523a202174696d656c6f636b0000000000000000000000000000000000604482015260640161079b565b8082101580156108b7575060388211155b6109035760405162461bcd60e51b815260206004820152601c60248201527f5f77697468647261774c6f636b757045706f6368733a2072616e676500000000604482015260640161079b565b6003919091556004556001600c55565b6002546000906001600160a01b038381169116141561095b576109396170806007611d35565b6109416112dd565b5161094c9190611d54565b43101561095b57506000919050565b506001919050565b6006546000906106919060016113ed565b600061097e6112dd565b60400151905090565b600c546001146109c85760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c55600a546040517f393a74840000000000000000000000000000000000000000000000000000000081523360048201526001600160a01b039091169063393a748490602401602060405180830381865afa158015610a2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a529190611d6c565b610a9e5760405162461bcd60e51b815260206004820152601460248201527f535045523a20496e76616c69642073656e646572000000000000000000000000604482015260640161079b565b610aa781611687565b506001600c55565b600c54600114610af05760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c556009546001600160a01b03163314610b4f5760405162461bcd60e51b815260206004820152600f60248201527f535045523a202174696d656c6f636b0000000000000000000000000000000000604482015260640161079b565b6001805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b038316179055610b7f610bd4565b50610b88610d9d565b50610b9161060a565b50610b9a6106fc565b50506001600c55565b6004546001600160a01b0382166000908152600560205260408120600301549091610bce919061141a565b92915050565b600154604080517f900cf0cf00000000000000000000000000000000000000000000000000000000815290516000926001600160a01b03169163900cf0cf9160048083019260209291908290030181865afa15801561066d573d6000803e3d6000fd5b600c54600114610c785760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c55600754610c95906001600160a01b03163330846117dd565b610aa733611687565b600d5460ff1615610cf15760405162461bcd60e51b815260206004820152601f60248201527f535045523a20496e697469616c697a65206d7573742062652066616c73652e00604482015260640161079b565b600780546001600160a01b03808a1673ffffffffffffffffffffffffffffffffffffffff1992831617909255600280548684169083161790556008805492891692909116919091179055610d4484610aaf565b610d4e8282610806565b50506009805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0394909416939093179092555050600d805460ff191660011790555050565b610d9b6001611954565b565b600154604080517fc5967c2600000000000000000000000000000000000000000000000000000000815290516000926001600160a01b03169163c5967c269160048083019260209291908290030181865afa15801561066d573d6000803e3d6000fd5b600c54600114610e415760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c55600a546040517fea74109e0000000000000000000000000000000000000000000000000000000081523060048201526001600160a01b039091169063ea74109e90602401602060405180830381865afa158015610ea7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ecb9190611d6c565b610f175760405162461bcd60e51b815260206004820152601160248201527f535045523a204e6f7420616c6c6f776564000000000000000000000000000000604482015260640161079b565b3360009081526005602052604090208054600b54610f3590826113ed565b600b5560008083556002830155600754610b9a906001600160a01b0316338361153e565b600c54600114610f9a5760405162461bcd60e51b815260206004820152600c60248201526b14d411548e881313d0d2d15160a21b604482015260640161079b565b6000600c556001546001600160a01b03163314610ff95760405162461bcd60e51b815260206004820152601660248201527f535045523a202165706f6368436f6e74726f6c6c657200000000000000000000604482015260640161079b565b600081116110495760405162461bcd60e51b815260206004820152601760248201527f535045523a2043616e6e6f7420616c6c6f636174652030000000000000000000604482015260640161079b565b6002546008546040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a0823190602401602060405180830381865afa15801561109a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110be9190611d06565b6002546008549192506110e0916001600160a01b0391821691339116856117dd565b600b5415610b9a576002546008546040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a0823190602401602060405180830381865afa158015611139573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061115d9190611d06565b905061116981836113ed565b925060006111756112dd565b60400151905060006111a86111a1600b546105bb670de0b6b3a76400008961140290919063ffffffff16565b839061141a565b604080516060810182524380825260208083018a905282840185905283519182528101899052929350917fae0e1452e3105698745005d16edaee897b9daf225b8434ea419008b58e60cb76910160405180910390a160068054600181018255600091909152815160039091027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019190915560208201517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201556040909101517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015550505050506001600c55565b600380546001600160a01b038316600090815260056020526040812090920154610bce9161141a565b33600090815260056020526040902054610d9b9061075e565b61130160405180606001604052806000815260200160008152602001600081525090565b600661130b610963565b8154811061131b5761131b611d8e565b90600052602060002090600302016040518060600160405290816000820154815260200160018201548152602001600282015481525050905090565b61137b60405180606001604052806000815260200160008152602001600081525090565b600661139f836001600160a01b031660009081526005602052604090206001015490565b815481106113af576113af611d8e565b906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820154815250509050919050565b60006113fb83836001611b9c565b9392505050565b60006113fb8284611d35565b60006113fb8284611da4565b6000806114278385611d54565b90506113fb848210156000611bb7565b3360009081526005602052604081209061144f610bd4565b90508061146b600354846003015461141a90919063ffffffff16565b11156114b95760405162461bcd60e51b815260206004820152601e60248201527f535045523a207374696c6c20696e207769746864726177206c6f636b75700000604482015260640161079b565b815483111561150a5760405162461bcd60e51b815260206004820152601d60248201527f535045523a20696e76616c696420776974686472617720616d6f756e74000000604482015260640161079b565b6115146000611954565b600b5461152190846113ed565b600b5560038201819055815461153790846113ed565b9091555050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905291516000928392908716916115c89190611dc6565b6000604051808303816000865af19150503d8060008114611605576040519150601f19603f3d011682016040523d82523d6000602084013e61160a565b606091505b50915091508180156116345750805115806116345750808060200190518101906116349190611d6c565b6116805760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015260640161079b565b5050505050565b600b546007546040516370a0823160e01b81523060048201526000926117059290916001600160a01b03909116906370a0823190602401602060405180830381865afa1580156116db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116ff9190611d06565b906113ed565b9050600081116117575760405162461bcd60e51b815260206004820152601560248201527f535045523a20496e76616c69642062616c616e63650000000000000000000000604482015260640161079b565b600b54611764908261141a565b600b556001600160a01b0382166000908152600560205260409020611787610bd4565b60038201558054611798908361141a565b81556040518281526001600160a01b038416907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd00000000000000000000000000000000000000000000000000000000179052915160009283929088169161186f9190611dc6565b6000604051808303816000865af19150503d80600081146118ac576040519150601f19603f3d011682016040523d82523d6000602084013e6118b1565b606091505b50915091508180156118db5750805115806118db5750808060200190518101906118db9190611d6c565b61194c5760405162461bcd60e51b8152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c454400000000000000000000000000000000000000000000000000000000606482015260840161079b565b505050505050565b338015611990576001600160a01b038116600090815260056020526040902061197c8261052a565b6002820155611989610963565b6001909101555b33600090815260056020526040902060028101548015611b96578315611a2a5760006119ba610bd4565b9050806119d6600454856003015461141a90919063ffffffff16565b1115611a245760405162461bcd60e51b815260206004820152601c60248201527f535045523a207374696c6c20696e20726577617264206c6f636b757000000000604482015260640161079b565b60038301555b60006002838101829055546008546040516370a0823160e01b81526001600160a01b0391821660048201529116906370a0823190602401602060405180830381865afa158015611a7e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aa29190611d06565b90506000828211611ab35781611ab5565b825b6008546002546040517fd1660f990000000000000000000000000000000000000000000000000000000081526001600160a01b03918216600482015233602482015260448101849052929350169063d1660f9990606401600060405180830381600087803b158015611b2657600080fd5b505af1158015611b3a573d6000803e3d6000fd5b505060025460408051878152602081018890529081018590523393506001600160a01b0390911691506000907f16dc511f817964d1eb39e0c3e84ce317f07b5b12cdfa1f8c2f179a08836af51a9060600160405180910390a450505b50505050565b6000611bab8484111583611bb7565b60006105c78486611e01565b81611bc557611bc581611bc9565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b80356001600160a01b0381168114611c3357600080fd5b919050565b600060208284031215611c4a57600080fd5b6113fb82611c1c565b600060208284031215611c6557600080fd5b5035919050565b60008060408385031215611c7f57600080fd5b50508035926020909101359150565b600080600080600080600060e0888a031215611ca957600080fd5b611cb288611c1c565b9650611cc060208901611c1c565b9550611cce60408901611c1c565b9450611cdc60608901611c1c565b9350611cea60808901611c1c565b925060a0880135915060c0880135905092959891949750929550565b600060208284031215611d1857600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615611d4f57611d4f611d1f565b500290565b60008219821115611d6757611d67611d1f565b500190565b600060208284031215611d7e57600080fd5b815180151581146113fb57600080fd5b634e487b7160e01b600052603260045260246000fd5b600082611dc157634e487b7160e01b600052601260045260246000fd5b500490565b6000825160005b81811015611de75760208186018101518583015201611dcd565b81811115611df6576000828501525b509190910192915050565b600082821015611e1357611e13611d1f565b50039056fea264697066735822122003f8485bcdccc88161ac78177912ce51a79dee0ed4162cb04d9d7189f4a2024664736f6c634300080c0033";

export class StakePoolEpochReward__factory extends ContractFactory {
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
    _controller: string,
    _version: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakePoolEpochReward> {
    return super.deploy(
      _controller,
      _version,
      overrides || {}
    ) as Promise<StakePoolEpochReward>;
  }
  getDeployTransaction(
    _controller: string,
    _version: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_controller, _version, overrides || {});
  }
  attach(address: string): StakePoolEpochReward {
    return super.attach(address) as StakePoolEpochReward;
  }
  connect(signer: Signer): StakePoolEpochReward__factory {
    return super.connect(signer) as StakePoolEpochReward__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakePoolEpochRewardInterface {
    return new utils.Interface(_abi) as StakePoolEpochRewardInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakePoolEpochReward {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StakePoolEpochReward;
  }
}
