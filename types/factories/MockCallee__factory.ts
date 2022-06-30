/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockCallee, MockCalleeInterface } from "../MockCallee";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "callSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pool",
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
    name: "reenter",
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
    name: "repayInExcess",
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
    name: "repayLoan",
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
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "requiemCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_reenter",
        type: "bool",
      },
    ],
    name: "setReenter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_repayInExcess",
        type: "bool",
      },
    ],
    name: "setRepayInExcess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_repayLoan",
        type: "bool",
      },
    ],
    name: "setRepayLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610fc8380380610fc883398101604081905261002f9161004f565b6001600160a01b03166080526000805462ffffff1916600117905561007f565b60006020828403121561006157600080fd5b81516001600160a01b038116811461007857600080fd5b9392505050565b608051610f136100b56000396000818160ad0152818161029a0152818161078e015281816108b901526109f30152610f136000f3fe608060405234801561001057600080fd5b50600436106100a35760003560e01c8063a0fe97e311610076578063b77f3a231161005b578063b77f3a23146101c8578063bfd38a9f1461020d578063f966ade71461022057600080fd5b8063a0fe97e31461016f578063a6af17031461018257600080fd5b806316f0115b146100a85780633207ce3c146100f957806362a823991461011b578063849292311461015c575b600080fd5b6100cf7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b60005461010b90610100900460ff1681565b60405190151581526020016100f0565b61015a610129366004610a88565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b005b61015a61016a366004610ace565b61022d565b60005461010b9062010000900460ff1681565b61015a610190366004610a88565b6000805491151562010000027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ffff909216919091179055565b61015a6101d6366004610a88565b60008054911515610100027fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff909216919091179055565b61015a61021b366004610b64565b610945565b60005461010b9060ff1681565b600061023b82840184610bb5565b60005490915062010000900460ff161561035557604080516000815260208101918290527f022c0d9f0000000000000000000000000000000000000000000000000000000090915273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063022c0d9f906102d49088908890339060248101610cef565b6020604051808303816000875af11580156102f3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103179190610d34565b50806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034c9190610d4d565b60405180910390fd5b60003373ffffffffffffffffffffffffffffffffffffffff1663a5ea11da6040518163ffffffff1660e01b8152600401608060405180830381865afa1580156103a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c69190610d79565b5063ffffffff1692505050600061271082886103e29190610dfc565b6103ec9190610e39565b905060006127106103fd8489610dfc565b6104079190610e39565b90503373ffffffffffffffffffffffffffffffffffffffff16630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa158015610454573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104789190610e74565b73ffffffffffffffffffffffffffffffffffffffff166340c10f1930600060019054906101000a900460ff166104ae57846104b9565b6104b9856001610e91565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff90921660048301526024820152604401600060405180830381600087803b15801561052457600080fd5b505af1158015610538573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff1663d21220a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015610587573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ab9190610e74565b73ffffffffffffffffffffffffffffffffffffffff166340c10f1930600060019054906101000a900460ff166105e157836105ec565b6105ec846001610e91565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815273ffffffffffffffffffffffffffffffffffffffff90921660048301526024820152604401600060405180830381600087803b15801561065757600080fd5b505af115801561066b573d6000803e3d6000fd5b505050506000828961067d9190610e91565b9050600061068b838a610e91565b60005490915060ff166106b7576106a3600183610ea9565b91506106b0600182610ea9565b90506106e2565b600054610100900460ff16156106e2576106d2826001610e91565b91506106df816001610e91565b90505b3373ffffffffffffffffffffffffffffffffffffffff16630dfe16816040518163ffffffff1660e01b8152600401602060405180830381865afa15801561072d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107519190610e74565b6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201859052919091169063a9059cbb906044016020604051808303816000875af11580156107e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061080c9190610ec0565b503373ffffffffffffffffffffffffffffffffffffffff1663d21220a76040518163ffffffff1660e01b8152600401602060405180830381865afa158015610858573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087c9190610e74565b6040517fa9059cbb00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201849052919091169063a9059cbb906044016020604051808303816000875af1158015610913573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109379190610ec0565b505050505050505050505050565b60006040516020016109889060208082526007908201527f6d65737361676500000000000000000000000000000000000000000000000000604082015260600190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403018152908290527f022c0d9f000000000000000000000000000000000000000000000000000000008252915073ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000169063022c0d9f90610a2e908690869030908790600401610cef565b6020604051808303816000875af1158015610a4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a719190610d34565b50505050565b8015158114610a8557600080fd5b50565b600060208284031215610a9a57600080fd5b8135610aa581610a77565b9392505050565b73ffffffffffffffffffffffffffffffffffffffff81168114610a8557600080fd5b600080600080600060808688031215610ae657600080fd5b8535610af181610aac565b94506020860135935060408601359250606086013567ffffffffffffffff80821115610b1c57600080fd5b818801915088601f830112610b3057600080fd5b813581811115610b3f57600080fd5b896020828501011115610b5157600080fd5b9699959850939650602001949392505050565b60008060408385031215610b7757600080fd5b50508035926020909101359150565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060208284031215610bc757600080fd5b813567ffffffffffffffff80821115610bdf57600080fd5b818401915084601f830112610bf357600080fd5b813581811115610c0557610c05610b86565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f01168101908382118183101715610c4b57610c4b610b86565b81604052828152876020848701011115610c6457600080fd5b826020860160208301376000928101602001929092525095945050505050565b6000815180845260005b81811015610caa57602081850181015186830182015201610c8e565b81811115610cbc576000602083870101525b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b84815283602082015273ffffffffffffffffffffffffffffffffffffffff83166040820152608060608201526000610d2a6080830184610c84565b9695505050505050565b600060208284031215610d4657600080fd5b5051919050565b602081526000610aa56020830184610c84565b805163ffffffff81168114610d7457600080fd5b919050565b60008060008060808587031215610d8f57600080fd5b610d9885610d60565b9350610da660208601610d60565b9250610db460408601610d60565b9150610dc260608601610d60565b905092959194509250565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610e3457610e34610dcd565b500290565b600082610e6f577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b600060208284031215610e8657600080fd5b8151610aa581610aac565b60008219821115610ea457610ea4610dcd565b500190565b600082821015610ebb57610ebb610dcd565b500390565b600060208284031215610ed257600080fd5b8151610aa581610a7756fea26469706673582212208141b15a7596dbc8f2c0da4cba882a8c0e1000ec95794c4a1662d6a98dbd2f5264736f6c634300080f0033";

export class MockCallee__factory extends ContractFactory {
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
    _pool: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MockCallee> {
    return super.deploy(_pool, overrides || {}) as Promise<MockCallee>;
  }
  getDeployTransaction(
    _pool: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_pool, overrides || {});
  }
  attach(address: string): MockCallee {
    return super.attach(address) as MockCallee;
  }
  connect(signer: Signer): MockCallee__factory {
    return super.connect(signer) as MockCallee__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockCalleeInterface {
    return new utils.Interface(_abi) as MockCalleeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockCallee {
    return new Contract(address, _abi, signerOrProvider) as MockCallee;
  }
}
