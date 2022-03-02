/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  RequiemWeightedMath,
  RequiemWeightedMathInterface,
} from "../RequiemWeightedMath";

const _abi = [
  {
    inputs: [],
    name: "_MAX_INVARIANT_RATIO",
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
    name: "_MAX_IN_RATIO",
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
    name: "_MAX_OUT_RATIO",
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
    name: "_MAX_WEIGHTED_TOKENS",
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
    name: "_MIN_INVARIANT_RATIO",
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
    name: "_MIN_WEIGHT",
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
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBPT",
        type: "uint256",
      },
    ],
    name: "_calcAllTokensInGivenExactBptOut",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "normalizedWeights",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsOut",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFeePercentage",
        type: "uint256",
      },
    ],
    name: "_calcBptInGivenExactTokensOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "normalizedWeights",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsIn",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFeePercentage",
        type: "uint256",
      },
    ],
    name: "_calcBptOutGivenExactTokensIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "normalizedWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "previousInvariant",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentInvariant",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "protocolSwapFeePercentage",
        type: "uint256",
      },
    ],
    name: "_calcDueTokenProtocolSwapFeeAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balanceIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weightIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balanceOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weightOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "_calcInGivenOut",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balanceIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weightIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "balanceOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "weightOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "_calcOutGivenIn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "normalizedWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptAmountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFeePercentage",
        type: "uint256",
      },
    ],
    name: "_calcTokenInGivenExactBptOut",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "normalizedWeight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "bptTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFeePercentage",
        type: "uint256",
      },
    ],
    name: "_calcTokenOutGivenExactBptIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "swapFee",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "bptAmountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalBPT",
        type: "uint256",
      },
    ],
    name: "_calcTokensOutGivenExactBptIn",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "normalizedWeights",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "balances",
        type: "uint256[]",
      },
    ],
    name: "_calculateInvariant",
    outputs: [
      {
        internalType: "uint256",
        name: "invariant",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612ba6806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063a62cdb8411610097578063e9be73ef11610066578063e9be73ef14610210578063ea9c12f914610223578063f8ce54ae14610232578063ff43734e1461024557600080fd5b8063a62cdb84146101b3578063a8c79d69146101c2578063cac2832b146101ea578063e89dd41f146101fd57600080fd5b806341830784116100d3578063418307841461016c578063572c58a31461017a5780635ce3dd581461018d578063906c4175146101a057600080fd5b80631152af7a14610105578063256fae4c1461012f578063289530581461012f5780632d09954d1461014c575b600080fd5b6101186101133660046125e3565b61024d565b6040516101269291906126b8565b60405180910390f35b61013e670429d069189e000081565b604051908152602001610126565b61015f61015a3660046126d1565b6103c5565b604051610126919061271f565b61013e662386f26fc1000081565b61013e610188366004612732565b61048e565b61013e61019b366004612796565b61051c565b61015f6101ae3660046126d1565b610599565b61013e6729a2241af62c000081565b6101d56101d0366004612796565b610642565b60408051928352602083019190915201610126565b6101d56101f8366004612796565b61071f565b61011861020b3660046125e3565b6107d5565b61013e61021e366004612796565b610944565b61013e6709b6e64a8ec6000081565b61013e610240366004612796565b6109ba565b61013e606481565b600060606000855167ffffffffffffffff81111561026d5761026d612506565b604051908082528060200260200182016040528015610296578160200160208202803683370190505b5090506000805b8951811015610388576103078a82815181106102bb576102bb6127d1565b60200260200101518983815181106102d5576102d56127d1565b60200260200101518c84815181106102ef576102ef6127d1565b6020026020010151610301919061282f565b90610a2b565b838281518110610319576103196127d1565b60200260200101818152505061036a89828151811061033a5761033a6127d1565b6020026020010151848381518110610354576103546127d1565b6020026020010151610b5f90919063ffffffff16565b6103749083612846565b9150806103808161285e565b91505061029d565b5060008061039a8b8b8b87878c610c0c565b9150915060006103b36103ac84610df2565b8a90610b5f565b9c919b50909950505050505050505050565b606060006103d38484610e1c565b90506000855167ffffffffffffffff8111156103f1576103f1612506565b60405190808252806020026020018201604052801561041a578160200160208202803683370190505b50905060005b8651811015610484576104558388838151811061043f5761043f6127d1565b6020026020010151610f2c90919063ffffffff16565b828281518110610467576104676127d1565b60209081029190910101528061047c8161285e565b915050610420565b5095945050505050565b670de0b6b3a764000060005b8351811015610506576104f26104eb8583815181106104bb576104bb6127d1565b60200260200101518584815181106104d5576104d56127d1565b6020026020010151610fd090919063ffffffff16565b8390610f2c565b9150806104fe8161285e565b91505061049a565b506105166000821161013761101f565b92915050565b600061053e61053387670429d069189e0000610f2c565b83111561013061101f565b600061054a8388612846565b905060006105588883610a2b565b905060006105668887610e1c565b905060006105748383611031565b905061058961058282610df2565b8990610f2c565b9450505050505b95945050505050565b606060006105a78484610a2b565b90506000855167ffffffffffffffff8111156105c5576105c5612506565b6040519080825280602002602001820160405280156105ee578160200160208202803683370190505b50905060005b86518110156104845761061383888381518110610354576103546127d1565b828281518110610625576106256127d1565b60209081029190910101528061063a8161285e565b9150506105f4565b60008080610654856103018882612846565b905061066d6729a2241af62c000082111561013361101f565b600061068b610684670de0b6b3a76400008a610a2b565b8390611031565b905060006106ab6106a4670de0b6b3a76400008461282f565b8b90610b5f565b905060006106b88a610df2565b905060006106c68383610b5f565b905060006106d4828561282f565b905060006106f46106ed8b670de0b6b3a764000061282f565b8490610a2b565b9050610700838261282f565b975061070c8183612846565b9850505050505050509550959350505050565b6000808061073185610301888261282f565b905061074a6709b6e64a8ec6000082101561013261101f565b6000610761610684670de0b6b3a76400008a610e1c565b9050600061077861077183610df2565b8b90610f2c565b905060006107858a610df2565b905060006107938383610b5f565b905060006107a1828561282f565b90506107ad828a610b5f565b96506107b9878361282f565b6107c39082612846565b97505050505050509550959350505050565b600060606000855167ffffffffffffffff8111156107f5576107f5612506565b60405190808252806020026020018201604052801561081e578160200160208202803683370190505b5090506000805b89518110156108fa5761088f8a8281518110610843576108436127d1565b602002602001015189838151811061085d5761085d6127d1565b60200260200101518c8481518110610877576108776127d1565b60200260200101516108899190612846565b90610e1c565b8382815181106108a1576108a16127d1565b6020026020010181815250506108dc8982815181106108c2576108c26127d1565b602002602001015184838151811061043f5761043f6127d1565b6108e69083612846565b9150806108f28161285e565b915050610825565b5060008061090c8b8b8b87878c61105d565b915091506000670de0b6b3a764000083116109285760006103b3565b6103b361093d670de0b6b3a76400008561282f565b8a90610f2c565b600061096661095b85670429d069189e0000610f2c565b83111561013161101f565b600061097c610975848761282f565b8690610a2b565b9050600061098a8588610a2b565b905060006109988383611031565b905060006109ae670de0b6b3a76400008361282f565b90506105898a82610b5f565b60008383116109cb57506000610590565b60006109d78585610a2b565b905060006109ed670de0b6b3a764000088610e1c565b9050610a01826709b6e64a8ec600006111ee565b91506000610a0f8383611031565b90506000610a1f61077183610df2565b90506105898187610f2c565b600081610a99576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f5a45524f5f4449564953494f4e0000000000000000000000000000000000000060448201526064015b60405180910390fd5b82610aa657506000610516565b6000610aba670de0b6b3a764000085612897565b9050670de0b6b3a7640000610acf8583612903565b14610b36576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4449565f494e5445524e414c00000000000000000000000000000000000000006044820152606401610a90565b82610b4260018361282f565b610b4c9190612903565b610b57906001612846565b915050610516565b600080610b6c8385612897565b9050831580610b83575082610b818583612903565b145b610be9576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4d554c5f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610a90565b80610bf8576000915050610516565b670de0b6b3a7640000610b4260018361282f565b60006060855167ffffffffffffffff811115610c2a57610c2a612506565b604051908082528060200260200182016040528015610c53578160200160208202803683370190505b509050670de0b6b3a7640000915060005b8851811015610de6576000868281518110610c8157610c816127d1565b6020026020010151861115610d36576000610cb0610c9e88610df2565b8c858151811061043f5761043f6127d1565b90506000818a8581518110610cc757610cc76127d1565b6020026020010151610cd9919061282f565b90506000610cf9610cf289670de0b6b3a764000061282f565b8390610a2b565b9050610d05828261282f565b868681518110610d1757610d176127d1565b6020908102919091010152610d2c8184612846565b9350505050610d53565b878281518110610d4857610d486127d1565b602002602001015190505b6000610d978b8481518110610d6a57610d6a6127d1565b6020026020010151838d8681518110610d8557610d856127d1565b6020026020010151610889919061282f565b9050610dcf610dc88b8581518110610db157610db16127d1565b602002602001015183610fd090919063ffffffff16565b8690610f2c565b945050508080610dde9061285e565b915050610c64565b50965096945050505050565b6000670de0b6b3a76400008210610e0a576000610516565b61051682670de0b6b3a764000061282f565b600081610e85576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f5a45524f5f4449564953494f4e000000000000000000000000000000000000006044820152606401610a90565b82610e9257506000610516565b6000610ea6670de0b6b3a764000085612897565b9050670de0b6b3a7640000610ebb8583612903565b14610f22576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4449565f494e5445524e414c00000000000000000000000000000000000000006044820152606401610a90565b610b578382612903565b600080610f398385612897565b9050831580610f50575082610f4e8583612903565b145b610fb6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4d554c5f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610a90565b610fc8670de0b6b3a764000082612903565b949350505050565b600080610fdd8484611207565b90506000610ff7610ff083612710610b5f565b60016114d8565b90508082101561100c57600092505050610516565b6110168282611551565b92505050610516565b8161102d5761102d816115c9565b5050565b60008061103e8484611207565b90506000611051610ff083612710610b5f565b905061059082826114d8565b60006060855167ffffffffffffffff81111561107b5761107b612506565b6040519080825280602002602001820160405280156110a4578160200160208202803683370190505b509050670de0b6b3a7640000915060005b8851811015610de6576000858783815181106110d3576110d36127d1565b6020026020010151111561116e5760006110f8610c9e670de0b6b3a76400008961282f565b90506000818a858151811061110f5761110f6127d1565b6020026020010151611121919061282f565b9050600061112f8289610b5f565b905061113b818361282f565b6111459084612846565b93508086868151811061115a5761115a6127d1565b60200260200101818152505050505061118b565b878281518110611180576111806127d1565b602002602001015190505b60006111bd8b84815181106111a2576111a26127d1565b6020026020010151838d8681518110610877576108776127d1565b90506111d7610dc88b8581518110610db157610db16127d1565b9450505080806111e69061285e565b9150506110b5565b6000818310156111fe5781611200565b825b9392505050565b60008161121d5750670de0b6b3a7640000610516565b8261122a57506000610516565b7f800000000000000000000000000000000000000000000000000000000000000083106112b3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f585f4f55545f4f465f424f554e445300000000000000000000000000000000006044820152606401610a90565b826112e768056bc75e2d631000007f4000000000000000000000000000000000000000000000000000000000000000612903565b831061134f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f595f4f55545f4f465f424f554e445300000000000000000000000000000000006044820152606401610a90565b8260008261136d67016345785d8a0000670de0b6b3a7640000612917565b128015611392575061138f670de0b6b3a764000067016345785d8a000061298b565b83125b156113fb5760006113a284611636565b9050670de0b6b3a7640000836113b882846129ff565b6113c29190612a13565b6113cc9190612acf565b836113df670de0b6b3a764000084612acf565b6113e99190612a13565b6113f3919061298b565b915050611412565b8161140584611877565b61140f9190612a13565b90505b611424670de0b6b3a764000082612acf565b9050807ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc00001315801561145f575068070c1cc73b00c800008113155b6114c5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f50524f445543545f4f55545f4f465f424f554e445300000000000000000000006044820152606401610a90565b6114ce81611e5d565b9695505050505050565b6000806114e58385612846565b905083811015611200576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4144445f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610a90565b6000828211156115bd576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5355425f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610a90565b6000610fc8838561282f565b7f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b95839006959095019082900491820690940160101b939093010160c81b604452606490fd5b600061164a670de0b6b3a764000083612a13565b915060006116676ec097ce7bc90715b34b9f10000000008461298b565b6ec097ce7bc90715b34b9f10000000006116818186612917565b61168b9190612a13565b6116959190612acf565b905060006ec097ce7bc90715b34b9f10000000006116b38380612a13565b6116bd9190612acf565b905081806ec097ce7bc90715b34b9f10000000006116db8483612a13565b6116e59190612acf565b91506116f2600383612acf565b6116fc908261298b565b90506ec097ce7bc90715b34b9f10000000006117188484612a13565b6117229190612acf565b915061172f600583612acf565b611739908261298b565b90506ec097ce7bc90715b34b9f10000000006117558484612a13565b61175f9190612acf565b915061176c600783612acf565b611776908261298b565b90506ec097ce7bc90715b34b9f10000000006117928484612a13565b61179c9190612acf565b91506117a9600983612acf565b6117b3908261298b565b90506ec097ce7bc90715b34b9f10000000006117cf8484612a13565b6117d99190612acf565b91506117e6600b83612acf565b6117f0908261298b565b90506ec097ce7bc90715b34b9f100000000061180c8484612a13565b6118169190612acf565b9150611823600d83612acf565b61182d908261298b565b90506ec097ce7bc90715b34b9f10000000006118498484612a13565b6118539190612acf565b9150611860600f83612acf565b61186a908261298b565b90506114ce816002612a13565b6000670de0b6b3a76400008212156118b7576118ae8261189f670de0b6b3a764000080612a13565b6118a99190612acf565b611877565b61051690612b37565b60006118e3670de0b6b3a7640000770195e54c5dd42177f53a27172fa9ec630262827000000000612a13565b83126119235761190b770195e54c5dd42177f53a27172fa9ec63026282700000000084612acf565b92506119206806f05b59d3b20000008261298b565b90505b611941670de0b6b3a76400006b1425982cf597cd205cef7380612a13565b83126119755761195d6b1425982cf597cd205cef738084612acf565b92506119726803782dace9d90000008261298b565b90505b611980606482612a13565b905061198d606484612a13565b92506e01855144814a7ff805980ff008400083126119ea576e01855144814a7ff805980ff00840006119c868056bc75e2d6310000085612a13565b6119d29190612acf565b92506119e768ad78ebc5ac620000008261298b565b90505b6b02df0ab5a80a22c61ab5a7008312611a3f576b02df0ab5a80a22c61ab5a700611a1d68056bc75e2d6310000085612a13565b611a279190612acf565b9250611a3c6856bc75e2d6310000008261298b565b90505b693f1fce3da636ea5cf8508312611a9057693f1fce3da636ea5cf850611a6e68056bc75e2d6310000085612a13565b611a789190612acf565b9250611a8d682b5e3af16b188000008261298b565b90505b690127fa27722cc06cc5e28312611ae157690127fa27722cc06cc5e2611abf68056bc75e2d6310000085612a13565b611ac99190612acf565b9250611ade6815af1d78b58c4000008261298b565b90505b68280e60114edb805d038312611b305768280e60114edb805d03611b0e68056bc75e2d6310000085612a13565b611b189190612acf565b9250611b2d680ad78ebc5ac62000008261298b565b90505b680ebc5fb417461211108312611b7f57680ebc5fb41746121110611b5d68056bc75e2d6310000085612a13565b611b679190612acf565b9250611b7c68056bc75e2d631000008261298b565b90505b6808f00f760a4b2db55d8312611bce576808f00f760a4b2db55d611bac68056bc75e2d6310000085612a13565b611bb69190612acf565b9250611bcb6802b5e3af16b18800008261298b565b90505b6806f5f17757889379378312611c1d576806f5f1775788937937611bfb68056bc75e2d6310000085612a13565b611c059190612acf565b9250611c1a68015af1d78b58c400008261298b565b90505b6806248f33704b2866038312611c6b576806248f33704b286603611c4a68056bc75e2d6310000085612a13565b611c549190612acf565b9250611c6867ad78ebc5ac6200008261298b565b90505b6805c548670b9510e7ac8312611cb9576805c548670b9510e7ac611c9868056bc75e2d6310000085612a13565b611ca29190612acf565b9250611cb66756bc75e2d63100008261298b565b90505b6000611cce68056bc75e2d631000008561298b565b68056bc75e2d63100000611ce28187612917565b611cec9190612a13565b611cf69190612acf565b9050600068056bc75e2d63100000611d0e8380612a13565b611d189190612acf565b9050818068056bc75e2d63100000611d308483612a13565b611d3a9190612acf565b9150611d47600383612acf565b611d51908261298b565b905068056bc75e2d63100000611d678484612a13565b611d719190612acf565b9150611d7e600583612acf565b611d88908261298b565b905068056bc75e2d63100000611d9e8484612a13565b611da89190612acf565b9150611db5600783612acf565b611dbf908261298b565b905068056bc75e2d63100000611dd58484612a13565b611ddf9190612acf565b9150611dec600983612acf565b611df6908261298b565b905068056bc75e2d63100000611e0c8484612a13565b611e169190612acf565b9150611e23600b83612acf565b611e2d908261298b565b9050611e3a600282612a13565b90506064611e48828761298b565b611e529190612acf565b979650505050505050565b60007ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc00008212158015611e98575068070c1cc73b00c800008213155b611efe576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f494e56414c49445f4558504f4e454e54000000000000000000000000000000006044820152606401610a90565b6000821215611f3457611f18611f1383612b37565b611e5d565b611f2a670de0b6b3a764000080612a13565b6105169190612acf565b60006806f05b59d3b20000008312611f7b57611f596806f05b59d3b200000084612917565b9250770195e54c5dd42177f53a27172fa9ec6302628270000000009050611fb8565b6803782dace9d90000008312611fb457611f9e6803782dace9d900000084612917565b92506b1425982cf597cd205cef73809050611fb8565b5060015b611fc3606484612a13565b925068056bc75e2d6310000068ad78ebc5ac62000000841261202457611ff268ad78ebc5ac6200000085612917565b935068056bc75e2d631000006120176e01855144814a7ff805980ff008400083612a13565b6120219190612acf565b90505b6856bc75e2d6310000008412612076576120476856bc75e2d63100000085612917565b935068056bc75e2d631000006120696b02df0ab5a80a22c61ab5a70083612a13565b6120739190612acf565b90505b682b5e3af16b1880000084126120c657612099682b5e3af16b1880000085612917565b935068056bc75e2d631000006120b9693f1fce3da636ea5cf85083612a13565b6120c39190612acf565b90505b6815af1d78b58c4000008412612116576120e96815af1d78b58c40000085612917565b935068056bc75e2d63100000612109690127fa27722cc06cc5e283612a13565b6121139190612acf565b90505b680ad78ebc5ac6200000841261216557612139680ad78ebc5ac620000085612917565b935068056bc75e2d6310000061215868280e60114edb805d0383612a13565b6121629190612acf565b90505b68056bc75e2d6310000084126121b45761218868056bc75e2d6310000085612917565b935068056bc75e2d631000006121a7680ebc5fb4174612111083612a13565b6121b19190612acf565b90505b6802b5e3af16b18800008412612203576121d76802b5e3af16b188000085612917565b935068056bc75e2d631000006121f66808f00f760a4b2db55d83612a13565b6122009190612acf565b90505b68015af1d78b58c4000084126122525761222668015af1d78b58c4000085612917565b935068056bc75e2d631000006122456806f5f177578893793783612a13565b61224f9190612acf565b90505b68056bc75e2d6310000084612267818361298b565b9150600268056bc75e2d6310000061227f8884612a13565b6122899190612acf565b6122939190612acf565b905061229f818361298b565b9150600368056bc75e2d631000006122b78884612a13565b6122c19190612acf565b6122cb9190612acf565b90506122d7818361298b565b9150600468056bc75e2d631000006122ef8884612a13565b6122f99190612acf565b6123039190612acf565b905061230f818361298b565b9150600568056bc75e2d631000006123278884612a13565b6123319190612acf565b61233b9190612acf565b9050612347818361298b565b9150600668056bc75e2d6310000061235f8884612a13565b6123699190612acf565b6123739190612acf565b905061237f818361298b565b9150600768056bc75e2d631000006123978884612a13565b6123a19190612acf565b6123ab9190612acf565b90506123b7818361298b565b9150600868056bc75e2d631000006123cf8884612a13565b6123d99190612acf565b6123e39190612acf565b90506123ef818361298b565b9150600968056bc75e2d631000006124078884612a13565b6124119190612acf565b61241b9190612acf565b9050612427818361298b565b9150600a68056bc75e2d6310000061243f8884612a13565b6124499190612acf565b6124539190612acf565b905061245f818361298b565b9150600b68056bc75e2d631000006124778884612a13565b6124819190612acf565b61248b9190612acf565b9050612497818361298b565b9150600c68056bc75e2d631000006124af8884612a13565b6124b99190612acf565b6124c39190612acf565b90506124cf818361298b565b915060648468056bc75e2d631000006124e88587612a13565b6124f29190612acf565b6124fc9190612a13565b6114ce9190612acf565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f83011261254657600080fd5b8135602067ffffffffffffffff8083111561256357612563612506565b8260051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f830116810181811084821117156125a6576125a6612506565b6040529384528581018301938381019250878511156125c457600080fd5b83870191505b84821015611e52578135835291830191908301906125ca565b600080600080600060a086880312156125fb57600080fd5b853567ffffffffffffffff8082111561261357600080fd5b61261f89838a01612535565b9650602088013591508082111561263557600080fd5b61264189838a01612535565b9550604088013591508082111561265757600080fd5b5061266488828901612535565b9598949750949560608101359550608001359392505050565b600081518084526020808501945080840160005b838110156126ad57815187529582019590820190600101612691565b509495945050505050565b828152604060208201526000610fc8604083018461267d565b6000806000606084860312156126e657600080fd5b833567ffffffffffffffff8111156126fd57600080fd5b61270986828701612535565b9660208601359650604090950135949350505050565b602081526000611200602083018461267d565b6000806040838503121561274557600080fd5b823567ffffffffffffffff8082111561275d57600080fd5b61276986838701612535565b9350602085013591508082111561277f57600080fd5b5061278c85828601612535565b9150509250929050565b600080600080600060a086880312156127ae57600080fd5b505083359560208501359550604085013594606081013594506080013592509050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008282101561284157612841612800565b500390565b6000821982111561285957612859612800565b500190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561289057612890612800565b5060010190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156128cf576128cf612800565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600082612912576129126128d4565b500490565b6000808312837f80000000000000000000000000000000000000000000000000000000000000000183128115161561295157612951612800565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831381161561298557612985612800565b50500390565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038413811516156129c5576129c5612800565b827f80000000000000000000000000000000000000000000000000000000000000000384128116156129f9576129f9612800565b50500190565b600082612a0e57612a0e6128d4565b500790565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600084136000841385830485118282161615612a5457612a54612800565b7f80000000000000000000000000000000000000000000000000000000000000006000871286820588128184161615612a8f57612a8f612800565b60008712925087820587128484161615612aab57612aab612800565b87850587128184161615612ac157612ac1612800565b505050929093029392505050565b600082612ade57612ade6128d4565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83147f800000000000000000000000000000000000000000000000000000000000000083141615612b3257612b32612800565b500590565b60007f8000000000000000000000000000000000000000000000000000000000000000821415612b6957612b69612800565b506000039056fea264697066735822122086d783ad0c9ff8d91deb9130a5081a924f76c0b3a6beb40666a6b1aabd2b4fd264736f6c634300080b0033";

export class RequiemWeightedMath__factory extends ContractFactory {
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
  ): Promise<RequiemWeightedMath> {
    return super.deploy(overrides || {}) as Promise<RequiemWeightedMath>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RequiemWeightedMath {
    return super.attach(address) as RequiemWeightedMath;
  }
  connect(signer: Signer): RequiemWeightedMath__factory {
    return super.connect(signer) as RequiemWeightedMath__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RequiemWeightedMathInterface {
    return new utils.Interface(_abi) as RequiemWeightedMathInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RequiemWeightedMath {
    return new Contract(address, _abi, signerOrProvider) as RequiemWeightedMath;
  }
}
