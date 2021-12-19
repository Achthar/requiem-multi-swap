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
  "0x60806040526001600c55600d805460ff1916905534801561001f57600080fd5b506040516200259a3803806200259a83398101604081905261004091610114565b600a80546001600160a01b039093166001600160a01b031993841617905560098054909216331790915560009081556040805160608101825243815260208101838152918101838152600680546001810182559452905160039093027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019390935590517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d40830155517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015561014e565b6000806040838503121561012757600080fd5b82516001600160a01b038116811461013e57600080fd5b6020939093015192949293505050565b61243c806200015e6000396000f3fe608060405234801561001057600080fd5b506004361061025b5760003560e01c80635a9c064411610145578063c5967c26116100bd578063e7d80e311161008c578063efe2226611610071578063efe2226614610532578063f77c479114610552578063f7c618c11461057257600080fd5b8063e7d80e3114610517578063e9fad8ee1461052a57600080fd5b8063c5967c26146104d4578063d33219b4146104dc578063db2e21bc146104fc578063e2dcb6161461050457600080fd5b8063900cf0cf11610114578063b33f9527116100f9578063b33f9527146104b0578063b69ef8a8146104c3578063b88a802f146104cc57600080fd5b8063900cf0cf14610495578063a694fc3a1461049d57600080fd5b80635a9c06441461042d57806362e7e463146104405780636bb987fe14610453578063714b46581461045c57600080fd5b806322455618116101d85780633f9e3f04116101a75780634bf692061161018c5780634bf69206146103f157806351ed6a301461040457806354fd4d501461042457600080fd5b80633f9e3f04146103e1578063446a2ec8146103e957600080fd5b8063224556181461039e5780632e1a7d4d146103a65780632ffaaa09146103bb5780633468a5b8146103ce57600080fd5b806307284ce91161022f57806319262d301161021457806319262d301461032d5780631959a002146103405780631e85cd651461039557600080fd5b806307284ce9146102f757806311815a39146102ff57600080fd5b80628cc26214610260578063022ba18d1461028657806303df48681461028f578063046335d0146102d4575b600080fd5b61027361026e3660046121bd565b610592565b6040519081526020015b60405180910390f35b61027360045481565b6001546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161027d565b6102e76102e23660046121bd565b610645565b604051901515815260200161027d565b61027361068c565b61031261030d3660046121d8565b610725565b6040805193845260208401929092529082015260600161027d565b6102e761033b3660046121bd565b610758565b61037561034e3660046121bd565b60056020526000908152604090208054600182015460028301546003909301549192909184565b60408051948552602085019390935291830152606082015260800161027d565b61027360035481565b610273610798565b6103b96103b43660046121d8565b610807565b005b6103b96103c93660046121f1565b6108e7565b6102e76103dc3660046121bd565b610a60565b610273610abd565b610273610ace565b6103b96103ff3660046121bd565b610ae1565b6007546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b61027360005481565b6103b961043b3660046121bd565b610c5b565b61027361044e3660046121bd565b610db9565b61027361708081565b61027361046a3660046121bd565b73ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090206001015490565b610273610df7565b6103b96104ab3660046121d8565b610e67565b6103b96104be366004612213565b610f06565b610273600b5481565b6103b9611061565b61027361106d565b6009546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b6103b96110dd565b6103b96105123660046121d8565b611295565b6102736105253660046121bd565b61169c565b6103b96116d2565b6008546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b600a546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b6002546102af9073ffffffffffffffffffffffffffffffffffffffff1681565b60008061059d6116eb565b60400151905060006105ae84611765565b60409081015173ffffffffffffffffffffffffffffffffffffffff86166000908152600560209081529083902083516080810185528154815260018201549281019290925260028101549382018490526003015460608201529092509061063c90610636670de0b6b3a76400006106306106288888611808565b86519061181d565b90611829565b90611835565b95945050505050565b600061064f610df7565b60045473ffffffffffffffffffffffffffffffffffffffff841660009081526005602052604090206003015461068491611835565b111592915050565b600154604080517f07284ce9000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff16916307284ce99160048083019260209291908290030181865afa1580156106fc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610720919061228b565b905090565b6006818154811061073557600080fd5b600091825260209091206003909102018054600182015460029092015490925083565b6000610762610df7565b6003805473ffffffffffffffffffffffffffffffffffffffff851660009081526005602052604090209091015461068491611835565b6001546040517f7effa5b600000000000000000000000000000000000000000000000000000000815230600482015260009173ffffffffffffffffffffffffffffffffffffffff1690637effa5b690602401602060405180830381865afa1580156106fc573d6000803e3d6000fd5b600c54600114610878576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b4544000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6000600c5561088681611852565b6007546108aa9073ffffffffffffffffffffffffffffffffffffffff16338361198d565b60405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a2506001600c55565b600c54600114610953576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c5560095473ffffffffffffffffffffffffffffffffffffffff1633146109d9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f535045523a202174696d656c6f636b0000000000000000000000000000000000604482015260640161086f565b8082101580156109ea575060388211155b610a50576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f5f77697468647261774c6f636b757045706f6368733a2072616e676500000000604482015260640161086f565b6003919091556004556001600c55565b60025460009073ffffffffffffffffffffffffffffffffffffffff83811691161415610ab557610a9361708060076122d3565b610a9b6116eb565b51610aa69190612310565b431015610ab557506000919050565b506001919050565b600654600090610720906001611808565b6000610ad86116eb565b60400151905090565b600c54600114610b4d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c55600a546040517f393a748400000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff9091169063393a748490602401602060405180830381865afa158015610bc0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be49190612328565b610c4a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f535045523a20496e76616c69642073656e646572000000000000000000000000604482015260640161086f565b610c5381611afd565b506001600c55565b600c54600114610cc7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c5560095473ffffffffffffffffffffffffffffffffffffffff163314610d4d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f535045523a202174696d656c6f636b0000000000000000000000000000000000604482015260640161086f565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316179055610d95610df7565b50610d9e61106d565b50610da761068c565b50610db0610798565b50506001600c55565b60045473ffffffffffffffffffffffffffffffffffffffff82166000908152600560205260408120600301549091610df19190611835565b92915050565b600154604080517f900cf0cf000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163900cf0cf9160048083019260209291908290030181865afa1580156106fc573d6000803e3d6000fd5b600c54600114610ed3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c55600754610efd9073ffffffffffffffffffffffffffffffffffffffff16333084611cad565b610c5333611afd565b600d5460ff1615610f73576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f535045523a20496e697469616c697a65206d7573742062652066616c73652e00604482015260640161086f565b6007805473ffffffffffffffffffffffffffffffffffffffff808a167fffffffffffffffffffffffff000000000000000000000000000000000000000092831617909255600280548684169083161790556008805492891692909116919091179055610fde84610c5b565b610fe882826108e7565b5050600980547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff94909416939093179092555050600d80547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790555050565b61106b6001611e4b565b565b600154604080517fc5967c26000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163c5967c269160048083019260209291908290030181865afa1580156106fc573d6000803e3d6000fd5b600c54600114611149576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c55600a546040517fea74109e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff9091169063ea74109e90602401602060405180830381865afa1580156111bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e09190612328565b611246576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f535045523a204e6f7420616c6c6f776564000000000000000000000000000000604482015260640161086f565b3360009081526005602052604090208054600b546112649082611808565b600b5560008083556002830155600754610db09073ffffffffffffffffffffffffffffffffffffffff16338361198d565b600c54600114611301576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f535045523a204c4f434b45440000000000000000000000000000000000000000604482015260640161086f565b6000600c5560015473ffffffffffffffffffffffffffffffffffffffff163314611387576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601660248201527f535045523a202165706f6368436f6e74726f6c6c657200000000000000000000604482015260640161086f565b600081116113f1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601760248201527f535045523a2043616e6e6f7420616c6c6f636174652030000000000000000000604482015260640161086f565b6002546008546040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015260009291909116906370a0823190602401602060405180830381865afa158015611468573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061148c919061228b565b6002546008549192506114bb9173ffffffffffffffffffffffffffffffffffffffff9182169133911685611cad565b600b5415610db0576002546008546040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015260009291909116906370a0823190602401602060405180830381865afa15801561153a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061155e919061228b565b905061156a8183611808565b925060006115766116eb565b60400151905060006115a96115a2600b54610630670de0b6b3a76400008961181d90919063ffffffff16565b8390611835565b604080516060810182524380825260208083018a905282840185905283519182528101899052929350917fae0e1452e3105698745005d16edaee897b9daf225b8434ea419008b58e60cb76910160405180910390a160068054600181018255600091909152815160039091027ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d3f81019190915560208201517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d408201556040909101517ff652222313e28459528d920b65115c16c04f3efc82aaedc97be59f3f377c0d419091015550505050506001600c55565b6003805473ffffffffffffffffffffffffffffffffffffffff8316600090815260056020526040812090920154610df191611835565b3360009081526005602052604090205461106b90610807565b61170f60405180606001604052806000815260200160008152602001600081525090565b6006611719610abd565b815481106117295761172961234a565b90600052602060002090600302016040518060600160405290816000820154815260200160018201548152602001600282015481525050905090565b61178960405180606001604052806000815260200160008152602001600081525090565b60066117ba8373ffffffffffffffffffffffffffffffffffffffff1660009081526005602052604090206001015490565b815481106117ca576117ca61234a565b906000526020600020906003020160405180606001604052908160008201548152602001600182015481526020016002820154815250509050919050565b6000611816838360016120fa565b9392505050565b600061181682846122d3565b60006118168284612379565b6000806118428385612310565b9050611816848210156000612115565b3360009081526005602052604081209061186a610df7565b905080611886600354846003015461183590919063ffffffff16565b11156118ee576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f535045523a207374696c6c20696e207769746864726177206c6f636b75700000604482015260640161086f565b8154831115611959576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f535045523a20696e76616c696420776974686472617720616d6f756e74000000604482015260640161086f565b6119636000611e4b565b600b546119709084611808565b600b556003820181905581546119869084611808565b9091555050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790529151600092839290871691611a2491906123b4565b6000604051808303816000865af19150503d8060008114611a61576040519150601f19603f3d011682016040523d82523d6000602084013e611a66565b606091505b5091509150818015611a90575080511580611a90575080806020019051810190611a909190612328565b611af6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015260640161086f565b5050505050565b600b546007546040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152600092611ba192909173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa158015611b77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b9b919061228b565b90611808565b905060008111611c0d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f535045523a20496e76616c69642062616c616e63650000000000000000000000604482015260640161086f565b600b54611c1a9082611835565b600b5573ffffffffffffffffffffffffffffffffffffffff82166000908152600560205260409020611c4a610df7565b60038201558054611c5b9083611835565b815560405182815273ffffffffffffffffffffffffffffffffffffffff8416907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a2505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790529151600092839290881691611d4c91906123b4565b6000604051808303816000865af19150503d8060008114611d89576040519150601f19603f3d011682016040523d82523d6000602084013e611d8e565b606091505b5091509150818015611db8575080511580611db8575080806020019051810190611db89190612328565b611e43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c454400000000000000000000000000000000000000000000000000000000606482015260840161086f565b505050505050565b338015611e945773ffffffffffffffffffffffffffffffffffffffff81166000908152600560205260409020611e8082610592565b6002820155611e8d610abd565b6001909101555b336000908152600560205260409020600281015480156120f4578315611f48576000611ebe610df7565b905080611eda600454856003015461183590919063ffffffff16565b1115611f42576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f535045523a207374696c6c20696e20726577617264206c6f636b757000000000604482015260640161086f565b60038301555b60006002838101829055546008546040517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff91821660048201529116906370a0823190602401602060405180830381865afa158015611fc2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fe6919061228b565b90506000828211611ff75781611ff9565b825b6008546002546040517fd1660f9900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff918216600482015233602482015260448101849052929350169063d1660f9990606401600060405180830381600087803b15801561207757600080fd5b505af115801561208b573d6000803e3d6000fd5b5050600254604080518781526020810188905290810185905233935073ffffffffffffffffffffffffffffffffffffffff90911691506000907f16dc511f817964d1eb39e0c3e84ce317f07b5b12cdfa1f8c2f179a08836af51a9060600160405180910390a450505b50505050565b60006121098484111583612115565b600061063c84866123ef565b816121235761212381612127565b5050565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b803573ffffffffffffffffffffffffffffffffffffffff811681146121b857600080fd5b919050565b6000602082840312156121cf57600080fd5b61181682612194565b6000602082840312156121ea57600080fd5b5035919050565b6000806040838503121561220457600080fd5b50508035926020909101359150565b600080600080600080600060e0888a03121561222e57600080fd5b61223788612194565b965061224560208901612194565b955061225360408901612194565b945061226160608901612194565b935061226f60808901612194565b925060a0880135915060c0880135905092959891949750929550565b60006020828403121561229d57600080fd5b5051919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561230b5761230b6122a4565b500290565b60008219821115612323576123236122a4565b500190565b60006020828403121561233a57600080fd5b8151801515811461181657600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000826123af577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b6000825160005b818110156123d557602081860181015185830152016123bb565b818111156123e4576000828501525b509190910192915050565b600082821015612401576124016122a4565b50039056fea2646970667358221220c95da54abf480e950f5d677a3dc481960edbe9a80d9361598ec7164c49f7108f64736f6c634300080a0033";

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
