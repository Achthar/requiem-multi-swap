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
  "0x60806040526001600c55600d805460ff1916905534801561001f57600080fd5b50604051611d2f380380611d2f83398101604081905261003e91610112565b600a80546001600160a01b039093166001600160a01b031993841617905560098054909216331790915560009081556040805160608101825243815260208101838152918101838152600680546001810182559452905160039093027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019390935590517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d40830155517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015561014c565b6000806040838503121561012557600080fd5b82516001600160a01b038116811461013c57600080fd5b6020939093015192949293505050565b611bd48061015b6000396000f3fe608060405234801561001057600080fd5b506004361061021b5760003560e01c80635a9c064411610125578063c5967c26116100ad578063e7d80e311161007c578063e7d80e3114610496578063e9fad8ee146104a9578063efe22266146104b1578063f77c4791146104c4578063f7c618c1146104d757600080fd5b8063c5967c2614610460578063d33219b414610468578063db2e21bc1461047b578063e2dcb6161461048357600080fd5b8063900cf0cf116100f4578063900cf0cf14610421578063a694fc3a14610429578063b33f95271461043c578063b69ef8a81461044f578063b88a802f1461045857600080fd5b80635a9c0644146103c657806362e7e463146103d95780636bb987fe146103ec578063714b4658146103f557600080fd5b806322455618116101a85780633f9e3f04116101775780633f9e3f0414610387578063446a2ec81461038f5780634bf692061461039757806351ed6a30146103aa57806354fd4d50146103bd57600080fd5b806322455618146103445780632e1a7d4d1461034c5780632ffaaa09146103615780633468a5b81461037457600080fd5b806307284ce9116101ef57806307284ce91461029d57806311815a39146102a557806319262d30146102d35780631959a002146102e65780631e85cd651461033b57600080fd5b80628cc26214610220578063022ba18d1461024657806303df48681461024f578063046335d01461027a575b600080fd5b61023361022e366004611998565b6104ea565b6040519081526020015b60405180910390f35b61023360045481565b600154610262906001600160a01b031681565b6040516001600160a01b03909116815260200161023d565b61028d610288366004611998565b610590565b604051901515815260200161023d565b6102336105ca565b6102b86102b33660046119b3565b61063d565b6040805193845260208401929092529082015260600161023d565b61028d6102e1366004611998565b610670565b61031b6102f4366004611998565b60056020526000908152604090208054600182015460028301546003909301549192909184565b60408051948552602085019390935291830152606082015260800161023d565b61023360035481565b6102336106a3565b61035f61035a3660046119b3565b6106ec565b005b61035f61036f3660046119cc565b610779565b61028d610382366004611998565b610859565b6102336108a9565b6102336108ba565b61035f6103a5366004611998565b6108cd565b600754610262906001600160a01b031681565b61023360005481565b61035f6103d4366004611998565b6109b4565b6102336103e7366004611998565b610a6e565b61023361708081565b610233610403366004611998565b6001600160a01b031660009081526005602052604090206001015490565b610233610a9f565b61035f6104373660046119b3565b610ae9565b61035f61044a3660046119ee565b610b31565b610233600b5481565b61035f610c0a565b610233610c16565b600954610262906001600160a01b031681565b61035f610c60565b61035f6104913660046119b3565b610d75565b6102336104a4366004611998565b611091565b61035f6110ba565b600854610262906001600160a01b031681565b600a54610262906001600160a01b031681565b600254610262906001600160a01b031681565b6000806104f56110d3565b60400151905060006105068461114d565b6040908101516001600160a01b0386166000908152600560209081529083902083516080810185528154815260018201549281019290925260028101549382018490526003015460608201529092509061058790610581670de0b6b3a764000061057b61057388886111e3565b8651906111f8565b90611204565b90611210565b95945050505050565b600061059a610a9f565b6004546001600160a01b0384166000908152600560205260409020600301546105c291611210565b111592915050565b600154604080516307284ce960e01b815290516000926001600160a01b0316916307284ce99160048083019260209291908290030181865afa158015610614573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106389190611a66565b905090565b6006818154811061064d57600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b600061067a610a9f565b600380546001600160a01b0385166000908152600560205260409020909101546105c291611210565b600154604051633f7fd2db60e11b81523060048201526000916001600160a01b031690637effa5b690602401602060405180830381865afa158015610614573d6000803e3d6000fd5b600c546001146107175760405162461bcd60e51b815260040161070e90611a7f565b60405180910390fd5b6000600c556107258161122d565b60075461073c906001600160a01b03163383611334565b60405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a2506001600c55565b600c5460011461079b5760405162461bcd60e51b815260040161070e90611a7f565b6000600c556009546001600160a01b031633146107ec5760405162461bcd60e51b815260206004820152600f60248201526e535045523a202174696d656c6f636b60881b604482015260640161070e565b8082101580156107fd575060388211155b6108495760405162461bcd60e51b815260206004820152601c60248201527f5f77697468647261774c6f636b757045706f6368733a2072616e676500000000604482015260640161070e565b6003919091556004556001600c55565b6002546000906001600160a01b03838116911614156108a15761087f6170806007611abb565b6108876110d3565b516108929190611ada565b4310156108a157506000919050565b506001919050565b6006546000906106389060016111e3565b60006108c46110d3565b60400151905090565b600c546001146108ef5760405162461bcd60e51b815260040161070e90611a7f565b6000600c55600a54604051630e4e9d2160e21b81523360048201526001600160a01b039091169063393a748490602401602060405180830381865afa15801561093c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109609190611af2565b6109a35760405162461bcd60e51b815260206004820152601460248201527329a822a91d1024b73b30b634b21039b2b73232b960611b604482015260640161070e565b6109ac8161144f565b506001600c55565b600c546001146109d65760405162461bcd60e51b815260040161070e90611a7f565b6000600c556009546001600160a01b03163314610a275760405162461bcd60e51b815260206004820152600f60248201526e535045523a202174696d656c6f636b60881b604482015260640161070e565b600180546001600160a01b0319166001600160a01b038316179055610a4a610a9f565b50610a53610c16565b50610a5c6105ca565b50610a656106a3565b50506001600c55565b6004546001600160a01b0382166000908152600560205260408120600301549091610a999190611210565b92915050565b6001546040805163900cf0cf60e01b815290516000926001600160a01b03169163900cf0cf9160048083019260209291908290030181865afa158015610614573d6000803e3d6000fd5b600c54600114610b0b5760405162461bcd60e51b815260040161070e90611a7f565b6000600c55600754610b28906001600160a01b031633308461159d565b6109ac3361144f565b600d5460ff1615610b845760405162461bcd60e51b815260206004820152601f60248201527f535045523a20496e697469616c697a65206d7573742062652066616c73652e00604482015260640161070e565b600780546001600160a01b03808a166001600160a01b031992831617909255600280548684169083161790556008805492891692909116919091179055610bca846109b4565b610bd48282610779565b5050600980546001600160a01b0319166001600160a01b0394909416939093179092555050600d805460ff191660011790555050565b610c1460016116cd565b565b600154604080516362cb3e1360e11b815290516000926001600160a01b03169163c5967c269160048083019260209291908290030181865afa158015610614573d6000803e3d6000fd5b600c54600114610c825760405162461bcd60e51b815260040161070e90611a7f565b6000600c55600a5460405163753a084f60e11b81523060048201526001600160a01b039091169063ea74109e90602401602060405180830381865afa158015610ccf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cf39190611af2565b610d335760405162461bcd60e51b815260206004820152601160248201527014d411548e88139bdd08185b1b1bddd959607a1b604482015260640161070e565b3360009081526005602052604090208054600b54610d5190826111e3565b600b5560008083556002830155600754610a65906001600160a01b03163383611334565b600c54600114610d975760405162461bcd60e51b815260040161070e90611a7f565b6000600c556001546001600160a01b03163314610def5760405162461bcd60e51b815260206004820152601660248201527529a822a91d1010b2b837b1b421b7b73a3937b63632b960511b604482015260640161070e565b60008111610e3f5760405162461bcd60e51b815260206004820152601760248201527f535045523a2043616e6e6f7420616c6c6f636174652030000000000000000000604482015260640161070e565b6002546008546040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a0823190602401602060405180830381865afa158015610e90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb49190611a66565b600254600854919250610ed6916001600160a01b03918216913391168561159d565b600b5415610a65576002546008546040516370a0823160e01b81526001600160a01b03918216600482015260009291909116906370a0823190602401602060405180830381865afa158015610f2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f539190611a66565b9050610f5f81836111e3565b92506000610f6b6110d3565b6040015190506000610f9e610f97600b5461057b670de0b6b3a7640000896111f890919063ffffffff16565b8390611210565b604080516060810182524380825260208083018a905282840185905283519182528101899052929350917fae0e1452e3105698745005d16edaee897b9daf225b8434ea419008b58e60cb76910160405180910390a160068054600181018255600091909152815160039091027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019190915560208201517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201556040909101517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015550505050506001600c55565b600380546001600160a01b038316600090815260056020526040812090920154610a9991611210565b33600090815260056020526040902054610c14906106ec565b6110f760405180606001604052806000815260200160008152602001600081525090565b60066111016108a9565b8154811061111157611111611b14565b90600052602060002090600302016040518060600160405290816000820154815260200160018201548152602001600282015481525050905090565b61117160405180606001604052806000815260200160008152602001600081525090565b6006611195836001600160a01b031660009081526005602052604090206001015490565b815481106111a5576111a5611b14565b906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820154815250509050919050565b60006111f1838360016118fc565b9392505050565b60006111f18284611abb565b60006111f18284611b2a565b60008061121d8385611ada565b90506111f1848210156000611917565b33600090815260056020526040812090611245610a9f565b905080611261600354846003015461121090919063ffffffff16565b11156112af5760405162461bcd60e51b815260206004820152601e60248201527f535045523a207374696c6c20696e207769746864726177206c6f636b75700000604482015260640161070e565b81548311156113005760405162461bcd60e51b815260206004820152601d60248201527f535045523a20696e76616c696420776974686472617720616d6f756e74000000604482015260640161070e565b61130a60006116cd565b600b5461131790846111e3565b600b5560038201819055815461132d90846111e3565b9091555050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392908716916113909190611b4c565b6000604051808303816000865af19150503d80600081146113cd576040519150601f19603f3d011682016040523d82523d6000602084013e6113d2565b606091505b50915091508180156113fc5750805115806113fc5750808060200190518101906113fc9190611af2565b6114485760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015260640161070e565b5050505050565b600b546007546040516370a0823160e01b81523060048201526000926114cd9290916001600160a01b03909116906370a0823190602401602060405180830381865afa1580156114a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114c79190611a66565b906111e3565b9050600081116115175760405162461bcd60e51b8152602060048201526015602482015274535045523a20496e76616c69642062616c616e636560581b604482015260640161070e565b600b546115249082611210565b600b556001600160a01b0382166000908152600560205260409020611547610a9f565b600382015580546115589083611210565b81556040518281526001600160a01b038416907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392908816916116019190611b4c565b6000604051808303816000865af19150503d806000811461163e576040519150601f19603f3d011682016040523d82523d6000602084013e611643565b606091505b509150915081801561166d57508051158061166d57508080602001905181019061166d9190611af2565b6116c55760405162461bcd60e51b8152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f46416044820152631253115160e21b606482015260840161070e565b505050505050565b338015611709576001600160a01b03811660009081526005602052604090206116f5826104ea565b60028201556117026108a9565b6001909101555b336000908152600560205260409020600281015480156118f65783156117a3576000611733610a9f565b90508061174f600454856003015461121090919063ffffffff16565b111561179d5760405162461bcd60e51b815260206004820152601c60248201527f535045523a207374696c6c20696e20726577617264206c6f636b757000000000604482015260640161070e565b60038301555b60006002838101829055546008546040516370a0823160e01b81526001600160a01b0391821660048201529116906370a0823190602401602060405180830381865afa1580156117f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061181b9190611a66565b9050600082821161182c578161182e565b825b60085460025460405163d1660f9960e01b81526001600160a01b03918216600482015233602482015260448101849052929350169063d1660f9990606401600060405180830381600087803b15801561188657600080fd5b505af115801561189a573d6000803e3d6000fd5b505060025460408051878152602081018890529081018590523393506001600160a01b0390911691506000907f16dc511f817964d1eb39e0c3e84ce317f07b5b12cdfa1f8c2f179a08836af51a9060600160405180910390a450505b50505050565b600061190b8484111583611917565b60006105878486611b87565b816119255761192581611929565b5050565b62461bcd60e51b6000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b80356001600160a01b038116811461199357600080fd5b919050565b6000602082840312156119aa57600080fd5b6111f18261197c565b6000602082840312156119c557600080fd5b5035919050565b600080604083850312156119df57600080fd5b50508035926020909101359150565b600080600080600080600060e0888a031215611a0957600080fd5b611a128861197c565b9650611a206020890161197c565b9550611a2e6040890161197c565b9450611a3c6060890161197c565b9350611a4a6080890161197c565b925060a0880135915060c0880135905092959891949750929550565b600060208284031215611a7857600080fd5b5051919050565b6020808252600c908201526b14d411548e881313d0d2d15160a21b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615611ad557611ad5611aa5565b500290565b60008219821115611aed57611aed611aa5565b500190565b600060208284031215611b0457600080fd5b815180151581146111f157600080fd5b634e487b7160e01b600052603260045260246000fd5b600082611b4757634e487b7160e01b600052601260045260246000fd5b500490565b6000825160005b81811015611b6d5760208186018101518583015201611b53565b81811115611b7c576000828501525b509190910192915050565b600082821015611b9957611b99611aa5565b50039056fea26469706673582212208779e6ef6daa9dfb2e7ec3535dd44f9b756e334f742cdcc1c36b4627f0aa74f164736f6c634300080b0033";

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
