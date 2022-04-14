/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  WeightedMathTest,
  WeightedMathTestInterface,
} from "../WeightedMathTest";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
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
  "0x608060405234801561001057600080fd5b50611ab6806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063572c58a314610030575b600080fd5b61004361003e36600461167f565b610055565b60405190815260200160405180910390f35b670de0b6b3a764000060005b83518110156100cd576100b96100b2858381518110610082576100826116e3565b602002602001015185848151811061009c5761009c6116e3565b602002602001015161014390919063ffffffff16565b8390610192565b9150806100c581611741565b915050610061565b506000811161013d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f5a45524f5f494e56415249414e5400000000000000000000000000000000000060448201526064015b60405180910390fd5b92915050565b6000806101508484610236565b9050600061016a6101638361271061050d565b60016105da565b90508082101561017f5760009250505061013d565b610189828261065a565b9250505061013d565b60008061019f8385611779565b90508315806101b65750826101b485836117e5565b145b61021c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4d554c5f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610134565b61022e670de0b6b3a7640000826117e5565b949350505050565b60008160000361024f5750670de0b6b3a764000061013d565b8260000361025f5750600061013d565b7f800000000000000000000000000000000000000000000000000000000000000083106102e8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f585f4f55545f4f465f424f554e445300000000000000000000000000000000006044820152606401610134565b8261031c68056bc75e2d631000007f40000000000000000000000000000000000000000000000000000000000000006117e5565b8310610384576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f595f4f55545f4f465f424f554e445300000000000000000000000000000000006044820152606401610134565b826000826103a267016345785d8a0000670de0b6b3a76400006117f9565b1280156103c757506103c4670de0b6b3a764000067016345785d8a000061186d565b83125b156104305760006103d7846106d2565b9050670de0b6b3a7640000836103ed82846118e1565b6103f791906118f5565b61040191906119b1565b83610414670de0b6b3a7640000846119b1565b61041e91906118f5565b610428919061186d565b915050610447565b8161043a84610913565b61044491906118f5565b90505b610459670de0b6b3a7640000826119b1565b9050807ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc000013158015610494575068070c1cc73b00c800008113155b6104fa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f50524f445543545f4f55545f4f465f424f554e445300000000000000000000006044820152606401610134565b61050381610ef9565b9695505050505050565b60008061051a8385611779565b905083158061053157508261052f85836117e5565b145b610597576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4d554c5f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610134565b806000036105a957600091505061013d565b670de0b6b3a76400006105bd600183611a19565b6105c791906117e5565b6105d2906001611a30565b91505061013d565b6000806105e78385611a30565b905083811015610653576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f4144445f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610134565b9392505050565b6000828211156106c6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f5355425f4f564552464c4f5700000000000000000000000000000000000000006044820152606401610134565b600061022e8385611a19565b60006106e6670de0b6b3a7640000836118f5565b915060006107036ec097ce7bc90715b34b9f10000000008461186d565b6ec097ce7bc90715b34b9f100000000061071d81866117f9565b61072791906118f5565b61073191906119b1565b905060006ec097ce7bc90715b34b9f100000000061074f83806118f5565b61075991906119b1565b905081806ec097ce7bc90715b34b9f100000000061077784836118f5565b61078191906119b1565b915061078e6003836119b1565b610798908261186d565b90506ec097ce7bc90715b34b9f10000000006107b484846118f5565b6107be91906119b1565b91506107cb6005836119b1565b6107d5908261186d565b90506ec097ce7bc90715b34b9f10000000006107f184846118f5565b6107fb91906119b1565b91506108086007836119b1565b610812908261186d565b90506ec097ce7bc90715b34b9f100000000061082e84846118f5565b61083891906119b1565b91506108456009836119b1565b61084f908261186d565b90506ec097ce7bc90715b34b9f100000000061086b84846118f5565b61087591906119b1565b9150610882600b836119b1565b61088c908261186d565b90506ec097ce7bc90715b34b9f10000000006108a884846118f5565b6108b291906119b1565b91506108bf600d836119b1565b6108c9908261186d565b90506ec097ce7bc90715b34b9f10000000006108e584846118f5565b6108ef91906119b1565b91506108fc600f836119b1565b610906908261186d565b90506105038160026118f5565b6000670de0b6b3a76400008212156109535761094a8261093b670de0b6b3a7640000806118f5565b61094591906119b1565b610913565b61013d90611a48565b600061097f670de0b6b3a7640000770195e54c5dd42177f53a27172fa9ec6302628270000000006118f5565b83126109bf576109a7770195e54c5dd42177f53a27172fa9ec630262827000000000846119b1565b92506109bc6806f05b59d3b20000008261186d565b90505b6109dd670de0b6b3a76400006b1425982cf597cd205cef73806118f5565b8312610a11576109f96b1425982cf597cd205cef7380846119b1565b9250610a0e6803782dace9d90000008261186d565b90505b610a1c6064826118f5565b9050610a296064846118f5565b92506e01855144814a7ff805980ff00840008312610a86576e01855144814a7ff805980ff0084000610a6468056bc75e2d63100000856118f5565b610a6e91906119b1565b9250610a8368ad78ebc5ac620000008261186d565b90505b6b02df0ab5a80a22c61ab5a7008312610adb576b02df0ab5a80a22c61ab5a700610ab968056bc75e2d63100000856118f5565b610ac391906119b1565b9250610ad86856bc75e2d6310000008261186d565b90505b693f1fce3da636ea5cf8508312610b2c57693f1fce3da636ea5cf850610b0a68056bc75e2d63100000856118f5565b610b1491906119b1565b9250610b29682b5e3af16b188000008261186d565b90505b690127fa27722cc06cc5e28312610b7d57690127fa27722cc06cc5e2610b5b68056bc75e2d63100000856118f5565b610b6591906119b1565b9250610b7a6815af1d78b58c4000008261186d565b90505b68280e60114edb805d038312610bcc5768280e60114edb805d03610baa68056bc75e2d63100000856118f5565b610bb491906119b1565b9250610bc9680ad78ebc5ac62000008261186d565b90505b680ebc5fb417461211108312610c1b57680ebc5fb41746121110610bf968056bc75e2d63100000856118f5565b610c0391906119b1565b9250610c1868056bc75e2d631000008261186d565b90505b6808f00f760a4b2db55d8312610c6a576808f00f760a4b2db55d610c4868056bc75e2d63100000856118f5565b610c5291906119b1565b9250610c676802b5e3af16b18800008261186d565b90505b6806f5f17757889379378312610cb9576806f5f1775788937937610c9768056bc75e2d63100000856118f5565b610ca191906119b1565b9250610cb668015af1d78b58c400008261186d565b90505b6806248f33704b2866038312610d07576806248f33704b286603610ce668056bc75e2d63100000856118f5565b610cf091906119b1565b9250610d0467ad78ebc5ac6200008261186d565b90505b6805c548670b9510e7ac8312610d55576805c548670b9510e7ac610d3468056bc75e2d63100000856118f5565b610d3e91906119b1565b9250610d526756bc75e2d63100008261186d565b90505b6000610d6a68056bc75e2d631000008561186d565b68056bc75e2d63100000610d7e81876117f9565b610d8891906118f5565b610d9291906119b1565b9050600068056bc75e2d63100000610daa83806118f5565b610db491906119b1565b9050818068056bc75e2d63100000610dcc84836118f5565b610dd691906119b1565b9150610de36003836119b1565b610ded908261186d565b905068056bc75e2d63100000610e0384846118f5565b610e0d91906119b1565b9150610e1a6005836119b1565b610e24908261186d565b905068056bc75e2d63100000610e3a84846118f5565b610e4491906119b1565b9150610e516007836119b1565b610e5b908261186d565b905068056bc75e2d63100000610e7184846118f5565b610e7b91906119b1565b9150610e886009836119b1565b610e92908261186d565b905068056bc75e2d63100000610ea884846118f5565b610eb291906119b1565b9150610ebf600b836119b1565b610ec9908261186d565b9050610ed66002826118f5565b90506064610ee4828761186d565b610eee91906119b1565b979650505050505050565b60007ffffffffffffffffffffffffffffffffffffffffffffffffdc702bd3a30fc00008212158015610f34575068070c1cc73b00c800008213155b610f9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f494e56414c49445f4558504f4e454e54000000000000000000000000000000006044820152606401610134565b6000821215610fd057610fb4610faf83611a48565b610ef9565b610fc6670de0b6b3a7640000806118f5565b61013d91906119b1565b60006806f05b59d3b2000000831261101757610ff56806f05b59d3b2000000846117f9565b9250770195e54c5dd42177f53a27172fa9ec6302628270000000009050611054565b6803782dace9d900000083126110505761103a6803782dace9d9000000846117f9565b92506b1425982cf597cd205cef73809050611054565b5060015b61105f6064846118f5565b925068056bc75e2d6310000068ad78ebc5ac6200000084126110c05761108e68ad78ebc5ac62000000856117f9565b935068056bc75e2d631000006110b36e01855144814a7ff805980ff0084000836118f5565b6110bd91906119b1565b90505b6856bc75e2d6310000008412611112576110e36856bc75e2d631000000856117f9565b935068056bc75e2d631000006111056b02df0ab5a80a22c61ab5a700836118f5565b61110f91906119b1565b90505b682b5e3af16b18800000841261116257611135682b5e3af16b18800000856117f9565b935068056bc75e2d63100000611155693f1fce3da636ea5cf850836118f5565b61115f91906119b1565b90505b6815af1d78b58c40000084126111b2576111856815af1d78b58c400000856117f9565b935068056bc75e2d631000006111a5690127fa27722cc06cc5e2836118f5565b6111af91906119b1565b90505b680ad78ebc5ac62000008412611201576111d5680ad78ebc5ac6200000856117f9565b935068056bc75e2d631000006111f468280e60114edb805d03836118f5565b6111fe91906119b1565b90505b68056bc75e2d6310000084126112505761122468056bc75e2d63100000856117f9565b935068056bc75e2d63100000611243680ebc5fb41746121110836118f5565b61124d91906119b1565b90505b6802b5e3af16b1880000841261129f576112736802b5e3af16b1880000856117f9565b935068056bc75e2d631000006112926808f00f760a4b2db55d836118f5565b61129c91906119b1565b90505b68015af1d78b58c4000084126112ee576112c268015af1d78b58c40000856117f9565b935068056bc75e2d631000006112e16806f5f1775788937937836118f5565b6112eb91906119b1565b90505b68056bc75e2d6310000084611303818361186d565b9150600268056bc75e2d6310000061131b88846118f5565b61132591906119b1565b61132f91906119b1565b905061133b818361186d565b9150600368056bc75e2d6310000061135388846118f5565b61135d91906119b1565b61136791906119b1565b9050611373818361186d565b9150600468056bc75e2d6310000061138b88846118f5565b61139591906119b1565b61139f91906119b1565b90506113ab818361186d565b9150600568056bc75e2d631000006113c388846118f5565b6113cd91906119b1565b6113d791906119b1565b90506113e3818361186d565b9150600668056bc75e2d631000006113fb88846118f5565b61140591906119b1565b61140f91906119b1565b905061141b818361186d565b9150600768056bc75e2d6310000061143388846118f5565b61143d91906119b1565b61144791906119b1565b9050611453818361186d565b9150600868056bc75e2d6310000061146b88846118f5565b61147591906119b1565b61147f91906119b1565b905061148b818361186d565b9150600968056bc75e2d631000006114a388846118f5565b6114ad91906119b1565b6114b791906119b1565b90506114c3818361186d565b9150600a68056bc75e2d631000006114db88846118f5565b6114e591906119b1565b6114ef91906119b1565b90506114fb818361186d565b9150600b68056bc75e2d6310000061151388846118f5565b61151d91906119b1565b61152791906119b1565b9050611533818361186d565b9150600c68056bc75e2d6310000061154b88846118f5565b61155591906119b1565b61155f91906119b1565b905061156b818361186d565b915060648468056bc75e2d6310000061158485876118f5565b61158e91906119b1565b61159891906118f5565b61050391906119b1565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600082601f8301126115e257600080fd5b8135602067ffffffffffffffff808311156115ff576115ff6115a2565b8260051b6040517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f83011681018181108482111715611642576116426115a2565b60405293845285810183019383810192508785111561166057600080fd5b83870191505b84821015610eee57813583529183019190830190611666565b6000806040838503121561169257600080fd5b823567ffffffffffffffff808211156116aa57600080fd5b6116b6868387016115d1565b935060208501359150808211156116cc57600080fd5b506116d9858286016115d1565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361177257611772611712565b5060010190565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156117b1576117b1611712565b500290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000826117f4576117f46117b6565b500490565b6000808312837f80000000000000000000000000000000000000000000000000000000000000000183128115161561183357611833611712565b837f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff01831381161561186757611867611712565b50500390565b6000808212827f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038413811516156118a7576118a7611712565b827f80000000000000000000000000000000000000000000000000000000000000000384128116156118db576118db611712565b50500190565b6000826118f0576118f06117b6565b500790565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60008413600084138583048511828216161561193657611936611712565b7f8000000000000000000000000000000000000000000000000000000000000000600087128682058812818416161561197157611971611712565b6000871292508782058712848416161561198d5761198d611712565b878505871281841616156119a3576119a3611712565b505050929093029392505050565b6000826119c0576119c06117b6565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83147f800000000000000000000000000000000000000000000000000000000000000083141615611a1457611a14611712565b500590565b600082821015611a2b57611a2b611712565b500390565b60008219821115611a4357611a43611712565b500190565b60007f80000000000000000000000000000000000000000000000000000000000000008203611a7957611a79611712565b506000039056fea26469706673582212208e5f22e8a1cac97813bfea11aa556945c670e91dee043089fbcd6b99e0bcf71464736f6c634300080d0033";

export class WeightedMathTest__factory extends ContractFactory {
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
  ): Promise<WeightedMathTest> {
    return super.deploy(overrides || {}) as Promise<WeightedMathTest>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): WeightedMathTest {
    return super.attach(address) as WeightedMathTest;
  }
  connect(signer: Signer): WeightedMathTest__factory {
    return super.connect(signer) as WeightedMathTest__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WeightedMathTestInterface {
    return new utils.Interface(_abi) as WeightedMathTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): WeightedMathTest {
    return new Contract(address, _abi, signerOrProvider) as WeightedMathTest;
  }
}
