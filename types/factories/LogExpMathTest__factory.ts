/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LogExpMathTest,
  LogExpMathTestInterface,
} from "../LogExpMathTest";

const _abi = [
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "_ln",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "_ln_36",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "x",
        type: "int256",
      },
    ],
    name: "exp",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "a",
        type: "int256",
      },
    ],
    name: "ln",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "int256",
        name: "arg",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "base",
        type: "int256",
      },
    ],
    name: "log",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "x",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "y",
        type: "uint256",
      },
    ],
    name: "pow",
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
];

const _bytecode =
  "0x6117cc61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061007c5760003560e01c806388fb77af1161005a57806388fb77af146100cc5780638e6f2353146100df578063e46751e3146100f257600080fd5b80632e4c697f1461008157806335a4f9ce146100a65780636f9a4c4e146100b9575b600080fd5b61009461008f366004611491565b610105565b60405190815260200160405180910390f35b6100946100b43660046114b3565b6103e3565b6100946100c7366004611491565b6109c4565b6100946100da3660046114b3565b610ad7565b6100946100ed3660046114b3565b610d22565b6100946101003660046114b3565b610df7565b60008160000361011e5750670de0b6b3a76400006103dd565b8260000361012e575060006103dd565b7f800000000000000000000000000000000000000000000000000000000000000083106101bc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f585f4f55545f4f465f424f554e4453000000000000000000000000000000000060448201526064015b60405180910390fd5b826101f068056bc75e2d631000007f400000000000000000000000000000000000000000000000000000000000000061152a565b8310610258576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f595f4f55545f4f465f424f554e4453000000000000000000000000000000000060448201526064016101b3565b8260008261027667016345785d8a0000670de0b6b3a764000061153e565b12801561029b5750610298670de0b6b3a764000067016345785d8a00006115b2565b83125b156103045760006102ab84610ad7565b9050670de0b6b3a7640000836102c18284611626565b6102cb919061163a565b6102d591906116f6565b836102e8670de0b6b3a7640000846116f6565b6102f2919061163a565b6102fc91906115b2565b91505061031b565b8161030e846103e3565b610318919061163a565b90505b61032d670de0b6b3a7640000826116f6565b9050807ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc000013158015610368575068070c1cc73b00c800008113155b6103ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f50524f445543545f4f55545f4f465f424f554e4453000000000000000000000060448201526064016101b3565b6103d781610df7565b93505050505b92915050565b6000670de0b6b3a764000082121561041e576104158261040b670de0b6b3a76400008061163a565b6100b491906116f6565b6103dd9061175e565b600061044a670de0b6b3a7640000770195e54c5dd42177f53a27172fa9ec63026282700000000061163a565b831261048a57610472770195e54c5dd42177f53a27172fa9ec630262827000000000846116f6565b92506104876806f05b59d3b2000000826115b2565b90505b6104a8670de0b6b3a76400006b1425982cf597cd205cef738061163a565b83126104dc576104c46b1425982cf597cd205cef7380846116f6565b92506104d96803782dace9d9000000826115b2565b90505b6104e760648261163a565b90506104f460648461163a565b92506e01855144814a7ff805980ff00840008312610551576e01855144814a7ff805980ff008400061052f68056bc75e2d631000008561163a565b61053991906116f6565b925061054e68ad78ebc5ac62000000826115b2565b90505b6b02df0ab5a80a22c61ab5a70083126105a6576b02df0ab5a80a22c61ab5a70061058468056bc75e2d631000008561163a565b61058e91906116f6565b92506105a36856bc75e2d631000000826115b2565b90505b693f1fce3da636ea5cf85083126105f757693f1fce3da636ea5cf8506105d568056bc75e2d631000008561163a565b6105df91906116f6565b92506105f4682b5e3af16b18800000826115b2565b90505b690127fa27722cc06cc5e2831261064857690127fa27722cc06cc5e261062668056bc75e2d631000008561163a565b61063091906116f6565b92506106456815af1d78b58c400000826115b2565b90505b68280e60114edb805d0383126106975768280e60114edb805d0361067568056bc75e2d631000008561163a565b61067f91906116f6565b9250610694680ad78ebc5ac6200000826115b2565b90505b680ebc5fb4174612111083126106e657680ebc5fb417461211106106c468056bc75e2d631000008561163a565b6106ce91906116f6565b92506106e368056bc75e2d63100000826115b2565b90505b6808f00f760a4b2db55d8312610735576808f00f760a4b2db55d61071368056bc75e2d631000008561163a565b61071d91906116f6565b92506107326802b5e3af16b1880000826115b2565b90505b6806f5f17757889379378312610784576806f5f177578893793761076268056bc75e2d631000008561163a565b61076c91906116f6565b925061078168015af1d78b58c40000826115b2565b90505b6806248f33704b28660383126107d2576806248f33704b2866036107b168056bc75e2d631000008561163a565b6107bb91906116f6565b92506107cf67ad78ebc5ac620000826115b2565b90505b6805c548670b9510e7ac8312610820576805c548670b9510e7ac6107ff68056bc75e2d631000008561163a565b61080991906116f6565b925061081d6756bc75e2d6310000826115b2565b90505b600061083568056bc75e2d63100000856115b2565b68056bc75e2d63100000610849818761153e565b610853919061163a565b61085d91906116f6565b9050600068056bc75e2d63100000610875838061163a565b61087f91906116f6565b9050818068056bc75e2d63100000610897848361163a565b6108a191906116f6565b91506108ae6003836116f6565b6108b890826115b2565b905068056bc75e2d631000006108ce848461163a565b6108d891906116f6565b91506108e56005836116f6565b6108ef90826115b2565b905068056bc75e2d63100000610905848461163a565b61090f91906116f6565b915061091c6007836116f6565b61092690826115b2565b905068056bc75e2d6310000061093c848461163a565b61094691906116f6565b91506109536009836116f6565b61095d90826115b2565b905068056bc75e2d63100000610973848461163a565b61097d91906116f6565b915061098a600b836116f6565b61099490826115b2565b90506109a160028261163a565b905060646109af82876115b2565b6109b991906116f6565b979650505050505050565b600080826109e267016345785d8a0000670de0b6b3a764000061153e565b128015610a075750610a04670de0b6b3a764000067016345785d8a00006115b2565b83125b15610a1c57610a1583610ad7565b9050610a3b565b670de0b6b3a7640000610a2e846103e3565b610a38919061163a565b90505b600084610a5867016345785d8a0000670de0b6b3a764000061153e565b128015610a7d5750610a7a670de0b6b3a764000067016345785d8a00006115b2565b85125b15610a9257610a8b85610ad7565b9050610ab1565b670de0b6b3a7640000610aa4866103e3565b610aae919061163a565b90505b81610ac4670de0b6b3a76400008361163a565b610ace91906116f6565b95945050505050565b6000610aeb670de0b6b3a76400008361163a565b91506000610b086ec097ce7bc90715b34b9f1000000000846115b2565b6ec097ce7bc90715b34b9f1000000000610b22818661153e565b610b2c919061163a565b610b3691906116f6565b905060006ec097ce7bc90715b34b9f1000000000610b54838061163a565b610b5e91906116f6565b905081806ec097ce7bc90715b34b9f1000000000610b7c848361163a565b610b8691906116f6565b9150610b936003836116f6565b610b9d90826115b2565b90506ec097ce7bc90715b34b9f1000000000610bb9848461163a565b610bc391906116f6565b9150610bd06005836116f6565b610bda90826115b2565b90506ec097ce7bc90715b34b9f1000000000610bf6848461163a565b610c0091906116f6565b9150610c0d6007836116f6565b610c1790826115b2565b90506ec097ce7bc90715b34b9f1000000000610c33848461163a565b610c3d91906116f6565b9150610c4a6009836116f6565b610c5490826115b2565b90506ec097ce7bc90715b34b9f1000000000610c70848461163a565b610c7a91906116f6565b9150610c87600b836116f6565b610c9190826115b2565b90506ec097ce7bc90715b34b9f1000000000610cad848461163a565b610cb791906116f6565b9150610cc4600d836116f6565b610cce90826115b2565b90506ec097ce7bc90715b34b9f1000000000610cea848461163a565b610cf491906116f6565b9150610d01600f836116f6565b610d0b90826115b2565b9050610d1881600261163a565b9695505050505050565b6000808213610d8d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4f55545f4f465f424f554e44530000000000000000000000000000000000000060448201526064016101b3565b81610da867016345785d8a0000670de0b6b3a764000061153e565b128015610dcd5750610dca670de0b6b3a764000067016345785d8a00006115b2565b82125b15610dee57670de0b6b3a7640000610de483610ad7565b6103dd91906116f6565b6103dd826103e3565b60007ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc00008212158015610e32575068070c1cc73b00c800008213155b610e98576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f494e56414c49445f4558504f4e454e540000000000000000000000000000000060448201526064016101b3565b6000821215610ebf57610ead6101008361175e565b610de4670de0b6b3a76400008061163a565b60006806f05b59d3b20000008312610f0657610ee46806f05b59d3b20000008461153e565b9250770195e54c5dd42177f53a27172fa9ec6302628270000000009050610f43565b6803782dace9d90000008312610f3f57610f296803782dace9d90000008461153e565b92506b1425982cf597cd205cef73809050610f43565b5060015b610f4e60648461163a565b925068056bc75e2d6310000068ad78ebc5ac620000008412610faf57610f7d68ad78ebc5ac620000008561153e565b935068056bc75e2d63100000610fa26e01855144814a7ff805980ff00840008361163a565b610fac91906116f6565b90505b6856bc75e2d631000000841261100157610fd26856bc75e2d6310000008561153e565b935068056bc75e2d63100000610ff46b02df0ab5a80a22c61ab5a7008361163a565b610ffe91906116f6565b90505b682b5e3af16b18800000841261105157611024682b5e3af16b188000008561153e565b935068056bc75e2d63100000611044693f1fce3da636ea5cf8508361163a565b61104e91906116f6565b90505b6815af1d78b58c40000084126110a1576110746815af1d78b58c4000008561153e565b935068056bc75e2d63100000611094690127fa27722cc06cc5e28361163a565b61109e91906116f6565b90505b680ad78ebc5ac620000084126110f0576110c4680ad78ebc5ac62000008561153e565b935068056bc75e2d631000006110e368280e60114edb805d038361163a565b6110ed91906116f6565b90505b68056bc75e2d63100000841261113f5761111368056bc75e2d631000008561153e565b935068056bc75e2d63100000611132680ebc5fb417461211108361163a565b61113c91906116f6565b90505b6802b5e3af16b1880000841261118e576111626802b5e3af16b18800008561153e565b935068056bc75e2d631000006111816808f00f760a4b2db55d8361163a565b61118b91906116f6565b90505b68015af1d78b58c4000084126111dd576111b168015af1d78b58c400008561153e565b935068056bc75e2d631000006111d06806f5f17757889379378361163a565b6111da91906116f6565b90505b68056bc75e2d63100000846111f281836115b2565b9150600268056bc75e2d6310000061120a888461163a565b61121491906116f6565b61121e91906116f6565b905061122a81836115b2565b9150600368056bc75e2d63100000611242888461163a565b61124c91906116f6565b61125691906116f6565b905061126281836115b2565b9150600468056bc75e2d6310000061127a888461163a565b61128491906116f6565b61128e91906116f6565b905061129a81836115b2565b9150600568056bc75e2d631000006112b2888461163a565b6112bc91906116f6565b6112c691906116f6565b90506112d281836115b2565b9150600668056bc75e2d631000006112ea888461163a565b6112f491906116f6565b6112fe91906116f6565b905061130a81836115b2565b9150600768056bc75e2d63100000611322888461163a565b61132c91906116f6565b61133691906116f6565b905061134281836115b2565b9150600868056bc75e2d6310000061135a888461163a565b61136491906116f6565b61136e91906116f6565b905061137a81836115b2565b9150600968056bc75e2d63100000611392888461163a565b61139c91906116f6565b6113a691906116f6565b90506113b281836115b2565b9150600a68056bc75e2d631000006113ca888461163a565b6113d491906116f6565b6113de91906116f6565b90506113ea81836115b2565b9150600b68056bc75e2d63100000611402888461163a565b61140c91906116f6565b61141691906116f6565b905061142281836115b2565b9150600c68056bc75e2d6310000061143a888461163a565b61144491906116f6565b61144e91906116f6565b905061145a81836115b2565b915060648468056bc75e2d63100000611473858761163a565b61147d91906116f6565b611487919061163a565b610d1891906116f6565b600080604083850312156114a457600080fd5b50508035926020909101359150565b6000602082840312156114c557600080fd5b5035919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082611539576115396114cc565b500490565b6000808312837f800000000000000000000000000000000000000000000000000000000000000001831281151615611578576115786114fb565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0183138116156115ac576115ac6114fb565b50500390565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038413811516156115ec576115ec6114fb565b827f8000000000000000000000000000000000000000000000000000000000000000038412811615611620576116206114fb565b50500190565b600082611635576116356114cc565b500790565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60008413600084138583048511828216161561167b5761167b6114fb565b7f800000000000000000000000000000000000000000000000000000000000000060008712868205881281841616156116b6576116b66114fb565b600087129250878205871284841616156116d2576116d26114fb565b878505871281841616156116e8576116e86114fb565b505050929093029392505050565b600082611705576117056114cc565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83147f800000000000000000000000000000000000000000000000000000000000000083141615611759576117596114fb565b500590565b60007f8000000000000000000000000000000000000000000000000000000000000000820361178f5761178f6114fb565b506000039056fea26469706673582212209116b02a9b2f0f6bdb836d53c90da4e4d0de4bfb7acf73362f76eb01b78cc63364736f6c634300080f0033";

export class LogExpMathTest__factory extends ContractFactory {
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
  ): Promise<LogExpMathTest> {
    return super.deploy(overrides || {}) as Promise<LogExpMathTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LogExpMathTest {
    return super.attach(address) as LogExpMathTest;
  }
  connect(signer: Signer): LogExpMathTest__factory {
    return super.connect(signer) as LogExpMathTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LogExpMathTestInterface {
    return new utils.Interface(_abi) as LogExpMathTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LogExpMathTest {
    return new Contract(address, _abi, signerOrProvider) as LogExpMathTest;
  }
}
