/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ThiefRouter, ThiefRouterInterface } from "../ThiefRouter";

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
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToSteal",
        type: "uint256",
      },
    ],
    name: "onSwapExactTokensForTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "amountLast",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "pools",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMax",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountToSteal",
        type: "uint256",
      },
    ],
    name: "onSwapTokensForExactTokens",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
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
  "0x60e060405234801561001057600080fd5b50604051610f52380380610f5283398101604081905261002f916100d1565b6001600160a01b038216608081905260408051634b75f54f60e01b81529051634b75f54f916004808201926020929091908290030181865afa158015610079573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061009d9190610104565b6001600160a01b0390811660a0521660c05250610126565b80516001600160a01b03811681146100cc57600080fd5b919050565b600080604083850312156100e457600080fd5b6100ed836100b5565b91506100fb602084016100b5565b90509250929050565b60006020828403121561011657600080fd5b61011f826100b5565b9392505050565b60805160a05160c051610df861015a60003960008181607b015261014c0152600060c1015260006101ae0152610df86000f3fe60806040526004361061005e5760003560e01c8063ad5c464811610043578063ad5c46481461013a578063b4e819fd1461016e578063c45a01551461019c57600080fd5b80634b75f54f146100af57806351bf18301461010d57600080fd5b366100aa573373ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016146100a8576100a8610a30565b005b600080fd5b3480156100bb57600080fd5b506100e37f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b34801561011957600080fd5b5061012d610128366004610b77565b6101d0565b6040516101049190610c07565b34801561014657600080fd5b506100e37f000000000000000000000000000000000000000000000000000000000000000081565b34801561017a57600080fd5b5061018e610189366004610b77565b61064f565b604051908152602001610104565b3480156101a857600080fd5b506100e37f000000000000000000000000000000000000000000000000000000000000000081565b6060855167ffffffffffffffff8111156101ec576101ec610a5f565b604051908082528060200260200182016040528015610215578160200160208202803683370190505b509050848188518151811061022c5761022c610c4b565b6020026020010181815250506000600182516102489190610ca9565b90505b80156103c1578761025d600183610ca9565b8151811061026d5761026d610c4b565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663cc56fd438860018461029e9190610ca9565b815181106102ae576102ae610c4b565b60200260200101518984815181106102c8576102c8610c4b565b60200260200101518585815181106102e2576102e2610c4b565b60209081029190910101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b16815273ffffffffffffffffffffffffffffffffffffffff93841660048201529290911660248301526044820152606401602060405180830381865afa158015610364573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103889190610cc0565b82610394600184610ca9565b815181106103a4576103a4610c4b565b6020908102919091010152806103b981610cd9565b91505061024b565b5083816000815181106103d6576103d6610c4b565b6020026020010151111561044b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f4558434553534956455f494e505554000000000000000000000000000000000060448201526064015b60405180910390fd5b6104b08660008151811061046157610461610c4b565b6020026020010151338960008151811061047d5761047d610c4b565b6020026020010151858560008151811061049957610499610c4b565b60200260200101516104ab9190610ca9565b610892565b60005b8751811015610644576000600189516104cc9190610ca9565b82146104fb57886104de836001610d0e565b815181106104ee576104ee610c4b565b60200260200101516104fd565b845b905088828151811061051157610511610c4b565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663d182f93889848151811061054657610546610c4b565b60200260200101518a85600161055c9190610d0e565b8151811061056c5761056c610c4b565b6020026020010151868660016105829190610d0e565b8151811061059257610592610c4b565b60209081029190910101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b16815273ffffffffffffffffffffffffffffffffffffffff9384166004820152918316602483015260448201529084166064820152608401600060405180830381600087803b15801561061857600080fd5b505af115801561062c573d6000803e3d6000fd5b5050505050808061063c90610d26565b9150506104b3565b509695505050505050565b600084905061069a8660008151811061066a5761066a610c4b565b6020026020010151338960008151811061068657610686610c4b565b602002602001015185896104ab9190610ca9565b60005b875181101561081d576000600189516106b69190610ca9565b82146106e557886106c8836001610d0e565b815181106106d8576106d8610c4b565b60200260200101516106e7565b845b90508882815181106106fb576106fb610c4b565b602002602001015173ffffffffffffffffffffffffffffffffffffffff1663822ac3f989848151811061073057610730610c4b565b60200260200101518a8560016107469190610d0e565b8151811061075657610756610c4b565b60209081029190910101516040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff928316600482015290821660248201526044810187905290841660648201526084016020604051808303816000875af11580156107e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108079190610cc0565b925050808061081590610d26565b91505061069d565b5080841115610888576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f494e53554646494349454e545f4f5554505554000000000000000000000000006044820152606401610442565b9695505050505050565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd0000000000000000000000000000000000000000000000000000000017905291516000928392908816916109319190610d5e565b6000604051808303816000865af19150503d806000811461096e576040519150601f19603f3d011682016040523d82523d6000602084013e610973565b606091505b509150915081801561099d57508051158061099d57508080602001905181019061099d9190610d99565b610a28576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c4544000000000000000000000000000000000000000000000000000000006064820152608401610442565b505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052600160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b803573ffffffffffffffffffffffffffffffffffffffff81168114610ab257600080fd5b919050565b600082601f830112610ac857600080fd5b8135602067ffffffffffffffff80831115610ae557610ae5610a5f565b8260051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f83011681018181108482111715610b2857610b28610a5f565b604052938452858101830193838101925087851115610b4657600080fd5b83870191505b84821015610b6c57610b5d82610a8e565b83529183019190830190610b4c565b979650505050505050565b60008060008060008060c08789031215610b9057600080fd5b863567ffffffffffffffff80821115610ba857600080fd5b610bb48a838b01610ab7565b97506020890135915080821115610bca57600080fd5b50610bd789828a01610ab7565b9550506040870135935060608701359250610bf460808801610a8e565b915060a087013590509295509295509295565b6020808252825182820181905260009190848201906040850190845b81811015610c3f57835183529284019291840191600101610c23565b50909695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082821015610cbb57610cbb610c7a565b500390565b600060208284031215610cd257600080fd5b5051919050565b600081610ce857610ce8610c7a565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b60008219821115610d2157610d21610c7a565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610d5757610d57610c7a565b5060010190565b6000825160005b81811015610d7f5760208186018101518583015201610d65565b81811115610d8e576000828501525b509190910192915050565b600060208284031215610dab57600080fd5b81518015158114610dbb57600080fd5b939250505056fea26469706673582212206a073c3a8b4d002ddbe960c2ecc2ea940b7c04df8cd0b2bda3fdd0d95bc6f8b464736f6c634300080d0033";

export class ThiefRouter__factory extends ContractFactory {
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
  ): Promise<ThiefRouter> {
    return super.deploy(
      _factory,
      _WETH,
      overrides || {}
    ) as Promise<ThiefRouter>;
  }
  getDeployTransaction(
    _factory: string,
    _WETH: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_factory, _WETH, overrides || {});
  }
  attach(address: string): ThiefRouter {
    return super.attach(address) as ThiefRouter;
  }
  connect(signer: Signer): ThiefRouter__factory {
    return super.connect(signer) as ThiefRouter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ThiefRouterInterface {
    return new utils.Interface(_abi) as ThiefRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ThiefRouter {
    return new Contract(address, _abi, signerOrProvider) as ThiefRouter;
  }
}
