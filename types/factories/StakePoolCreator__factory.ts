/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakePoolCreator,
  StakePoolCreatorInterface,
} from "../StakePoolCreator";

const _abi = [
  {
    inputs: [],
    name: "create",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "pair",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "timelock",
        type: "address",
      },
      {
        internalType: "address",
        name: "stakePoolRewardFund",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
];

const _bytecode =
  "0x6080604052610bb960005534801561001657600080fd5b506139bc806100266000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301f79fb61461004657806354fd4d501461005b578063efc81a8c14610077575b600080fd5b6100596100543660046102e1565b6100a4565b005b61006460005481565b6040519081526020015b60405180910390f35b61007f610253565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161006e565b8660006100b3838501856103f8565b90508173ffffffffffffffffffffffffffffffffffffffff1663c0eac9ea88836000015184602001518560400151866060015187608001518860a001518960c001518a60e001516040518a63ffffffff1660e01b81526004016101769998979695949392919073ffffffffffffffffffffffffffffffffffffffff998a16815297891660208901529590971660408701526060860193909352608085019190915260a084015260c083015260e08201929092526101008101919091526101200190565b600060405180830381600087803b15801561019057600080fd5b505af11580156101a4573d6000803e3d6000fd5b505050506101008101516040517f358394d800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a811660048301526024820192909252868216604482015287821660648201529083169063358394d890608401600060405180830381600087803b15801561023057600080fd5b505af1158015610244573d6000803e3d6000fd5b50505050505050505050505050565b60008033600054604051610266906102ab565b73ffffffffffffffffffffffffffffffffffffffff90921682526020820152604001604051809103906000f0801580156102a4573d6000803e3d6000fd5b5092915050565b6135058061048283390190565b803573ffffffffffffffffffffffffffffffffffffffff811681146102dc57600080fd5b919050565b600080600080600080600060c0888a0312156102fc57600080fd5b610305886102b8565b9650610313602089016102b8565b9550610321604089016102b8565b945061032f606089016102b8565b935061033d608089016102b8565b925060a088013567ffffffffffffffff8082111561035a57600080fd5b818a0191508a601f83011261036e57600080fd5b81358181111561037d57600080fd5b8b602082850101111561038f57600080fd5b60208301945080935050505092959891949750929550565b604051610120810167ffffffffffffffff811182821017156103f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b6000610120828403121561040b57600080fd5b6104136103a7565b61041c836102b8565b815261042a602084016102b8565b602082015260408301356040820152606083013560608201526080830135608082015260a083013560a082015260c083013560c082015260e083013560e0820152610100808401358183015250809150509291505056fe60806040526203f4806008556001600955600a805460ff191690553480156200002757600080fd5b5060405162003505380380620035058339810160408190526200004a916200007d565b600680546001600160a01b039093166001600160a01b0319938416179055600580549092163317909155600055620000b9565b600080604083850312156200009157600080fd5b82516001600160a01b0381168114620000a957600080fd5b6020939093015192949293505050565b61343c80620000c96000396000f3fe608060405234801561001057600080fd5b50600436106102265760003560e01c80638583f6a51161012a578063c0eac9ea116100bd578063e2589d381161008c578063efe2226611610071578063efe22266146105be578063f36c0a72146105de578063f77c4791146105e657600080fd5b8063e2589d38146105a3578063e9fad8ee146105b657600080fd5b8063c0eac9ea14610555578063d33219b414610568578063d9fa1de114610588578063db2e21bc1461059b57600080fd5b8063b69ef8a8116100f9578063b69ef8a81461051e578063b88a802f14610527578063be6153351461052f578063c012c42e1461054257600080fd5b80638583f6a5146104d257806385cc179e146104e55780639c3962cb146104f8578063a694fc3a1461050b57600080fd5b80634bf69206116101bd57806360d470881161018c5780636d3c6d92116101715780636d3c6d921461041957806372aa0a601461042c57806376d743fe146104bf57600080fd5b806360d47088146103f357806364467bbe1461040657600080fd5b80634bf692061461037f57806351ed6a301461039257806354fd4d50146103d7578063597293f3146103e057600080fd5b80633468a5b8116101f95780633468a5b81461032e578063358394d814610351578063362a3fad14610364578063437686491461037757600080fd5b806317837baa1461022b5780631959a0021461024757806329d79588146102835780632e1a7d4d14610319575b600080fd5b61023460085481565b6040519081526020015b60405180910390f35b61026e610255366004613069565b6001602052600090815260409020805460069091015482565b6040805192835260208301919091520161023e565b6102f1610291366004613095565b73ffffffffffffffffffffffffffffffffffffffff166000908152600160208181526040808420805460ff909616855292830182528084205460038401835281852054600485018452828620546005909501909352932054939492939092565b604080519586526020860194909452928401919091526060830152608082015260a00161023e565b61032c6103273660046130c8565b610606565b005b61034161033c366004613069565b6106e6565b604051901515815260200161023e565b61032c61035f3660046130e1565b610780565b61032c610372366004613069565b610917565b600254610234565b61032c61038d366004613069565b61094a565b6003546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161023e565b61023460005481565b6102346103ee36600461312e565b610ac4565b610234610401366004613069565b610bbd565b61032c61041436600461316a565b610bfa565b61032c610427366004613095565b610d7b565b61043f61043a3660046130c8565b61123f565b6040805173ffffffffffffffffffffffffffffffffffffffff9e8f1681529c8e1660208e01529a909c16998b019990995260608a0197909752608089019590955260a088019390935260c087019190915260e08601526101008501526101208401526101408301526101608201526101808101919091526101a00161023e565b61032c6104cd366004613185565b6112d2565b61032c6104e0366004613095565b6114c6565b61032c6104f336600461316a565b611780565b610234610506366004613185565b6118be565b61032c6105193660046130c8565b611955565b61023460075481565b61032c6119f4565b61023461053d366004613095565b6119ff565b6102346105503660046131b8565b611bd2565b61032c6105633660046131f1565b611cf4565b6005546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b61023461059636600461316a565b6123a2565b61032c6123b4565b61032c6105b1366004613095565b6125c3565b61032c61286f565b6004546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b61032c612888565b6006546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b600954600114610677576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b45440000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b6000600955610685816128b9565b6003546106a99073ffffffffffffffffffffffffffffffffffffffff163383612a54565b60405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a2506001600955565b6000805b60025460ff8216101561077757600060028260ff168154811061070f5761070f61326c565b60009182526020909120600d90910201805490915073ffffffffffffffffffffffffffffffffffffffff808616911603610766576005810154610755906203f4806132ca565b421015610766575060009392505050565b50610770816132e2565b90506106ea565b50600192915050565b600a5460ff16156107ed576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f53503a20496e697469616c697a65206d7573742062652066616c73652e000000604482015260640161066e565b62278d006008541115610882576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f53503a20756e7374616b696e6746726f7a656e54696d65203e2033302064617960448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161066e565b6003805473ffffffffffffffffffffffffffffffffffffffff9586167fffffffffffffffffffffffff000000000000000000000000000000000000000091821617909155600893909355600480549285169284169290921790915560058054919093169116179055600a80547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b60025460005b8160ff168160ff161015610945576109358184610d7b565b61093e816132e2565b905061091d565b505050565b6009546001146109b6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b60006009556006546040517f393a748400000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff9091169063393a748490602401602060405180830381865afa158015610a29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4d9190613301565b610ab3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601260248201527f53503a20496e76616c69642073656e6465720000000000000000000000000000604482015260640161066e565b610abc81612bbd565b506001600955565b60008060028560ff1681548110610add57610add61326c565b60009182526020909120600d90910201600181015490915073ffffffffffffffffffffffffffffffffffffffff1680610b1a578392505050610bb6565b6040517f2e81056600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff868116600483015260248201869052821690632e81056690604401602060405180830381865afa158015610b8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb19190613323565b925050505b9392505050565b60085473ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260408120600601549091610bf4916132ca565b92915050565b600954600114610c66576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560055473ffffffffffffffffffffffffffffffffffffffff163314610cec576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f53503a202174696d656c6f636b00000000000000000000000000000000000000604482015260640161066e565b600060028260ff1681548110610d0457610d0461326c565b90600052602060002090600d02019050610d1d82611780565b426005820181905560006006830181905560405160ff8516927fd50c9d621671c3fc38b7813912936d3cee3f956bdbf5f6c61b5091f2ff2b0fd592610d6a92918252602082015260400190565b60405180910390a250506001600955565b610d8482611780565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001602052604081206002805491929160ff8616908110610dc357610dc361326c565b600091825260208083206007600d909302019182015460ff881684526001860190915260408320548554929450909291610e1c9190610e1690670de0b6b3a764000090610e109087612dc9565b90612dd5565b90612de1565b60088401549091508015610fae5783600a0154421115610eb15760ff8716600090815260058601602090815260408083205460048901909252822054610e6191612de1565b90508015610eab57610e738382612def565b60ff89166000908152600588016020526040902054909350610e959082612def565b60ff891660009081526005880160205260409020555b50610fae565b8115610f0d576000610ec86064610e108585612dc9565b9050610ed48382612de1565b60ff89166000908152600488016020526040902054909350610ef69082612def565b60ff89166000908152600488016020526040902055505b600984015442811015610fac57600b850154600090610f4e90610e10610f334286612de1565b60ff8d16600090815260048c01602052604090205490612dc9565b60ff8a16600090815260058901602052604090205490915080821115610fa9576000610f7a8383612de1565b9050610f868282612def565b60ff8c16600090815260058b016020526040902055610fa58682612def565b9550505b50505b505b81156112365760ff87166000908152600386016020526040902054610fd39083612def565b60ff88166000908152600387016020526040902055600c840154610ff79083612def565b600c850155845461101690670de0b6b3a764000090610e109086612dc9565b60ff88166000908152600187016020908152604080832093909355600288019052908120546110459084612def565b60ff8916600090815260028801602052604080822083905587546004805492517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff93841691810191909152939450169182906370a0823190602401602060405180830381865afa1580156110d4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110f89190613323565b905080156112325760ff8a16600090815260028901602052604081208190556111228b8486610ac4565b905060008282116111335781611135565b825b600480546040517fd1660f9900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff888116938201939093528e8316602482015260448101849052929350169063d1660f9990606401600060405180830381600087803b1580156111b557600080fd5b505af11580156111c9573d6000803e3d6000fd5b5050604080518881526020810186905290810184905273ffffffffffffffffffffffffffffffffffffffff808f1693508716915060ff8f16907f16dc511f817964d1eb39e0c3e84ce317f07b5b12cdfa1f8c2f179a08836af51a9060600160405180910390a450505b5050505b50505050505050565b6002818154811061124f57600080fd5b60009182526020909120600d9091020180546001820154600283015460038401546004850154600586015460068701546007880154600889015460098a0154600a8b0154600b8c0154600c909c015473ffffffffffffffffffffffffffffffffffffffff9b8c169d50998b169b9a9098169996989597949693959294919390928d565b60095460011461133e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146113c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f53503a202174696d656c6f636b00000000000000000000000000000000000000604482015260640161066e565b600060028460ff16815481106113dc576113dc61326c565b90600052602060002090600d02019050806005015442111580156114005750824211155b611466576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f53503a20626c6f636b54696d65203e20656e6452657761726454696d65000000604482015260640161066e565b61146f84611780565b6005810183905560068101829055604080518481526020810184905260ff8616917fd50c9d621671c3fc38b7813912936d3cee3f956bdbf5f6c61b5091f2ff2b0fd5910160405180910390a2505060016009555050565b600954600114611532576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146115b8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f53503a202174696d656c6f636b00000000000000000000000000000000000000604482015260640161066e565b6006546040517fbd5b622a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83811660048301529091169063bd5b622a90602401602060405180830381865afa158015611628573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061164c9190613301565b6116b2576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f53503a20496e76616c6964207265776172642072656261736572000000000000604482015260640161066e565b600060028360ff16815481106116ca576116ca61326c565b60009182526020909120600d909102016001810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516179055905061172783611780565b60405173ffffffffffffffffffffffffffffffffffffffff8316815260ff8416907fe6b2c8a01867d369cd4952ca70fea492ef433a6ff31b8c8d15c4781f136e60ed906020015b60405180910390a25050600160095550565b600060028260ff16815481106117985761179861326c565b90600052602060002090600d0201905060008160050154905060008142116117c057426117c2565b815b6004840154909150808211156118b7576003546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009173ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa158015611841573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118659190613323565b905080156118ae57600061189582610e10670de0b6b3a764000061188f8b888a8d60060154611bd2565b90612dc9565b60078701549091506118a79082612def565b6007870155505b50600484018290555b5050505050565b60008060028560ff16815481106118d7576118d761326c565b90600052602060002090600d0201905060008160060154905081600301548510806119055750816005015485115b1561191557600092505050610bb6565b600061192387878785611bd2565b835490915061194a90889073ffffffffffffffffffffffffffffffffffffffff1683610ac4565b979650505050505050565b6009546001146119c1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b60006009556003546119eb9073ffffffffffffffffffffffffffffffffffffffff16333084612e0c565b610abc33612bbd565b6119fd33610917565b565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001602052604081206002805483919060ff8716908110611a3e57611a3e61326c565b600091825260208220600d919091020160078101546003546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015292945090929173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa158015611ac7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611aeb9190613323565b60058401549091506000428210611b025742611b04565b815b60048601549091508082118015611b1a57508315155b15611b51576000611b4185610e10670de0b6b3a764000061188f8f87898e60060154611bd2565b9050611b4d8682612def565b9550505b60ff8a16600090815260018801602090815260408083205460028b019092528220548954611b9c9291610e1691611b9690670de0b6b3a764000090610e10908d612dc9565b90612def565b8754909150611bc3908c9073ffffffffffffffffffffffffffffffffffffffff1683610ac4565b9b9a5050505050505050505050565b60008060028660ff1681548110611beb57611beb61326c565b60009182526020909120600d90910201600281015490915073ffffffffffffffffffffffffffffffffffffffff1680611c3557611c2c8461188f8789612de1565b92505050611cec565b600382015460058301546040517e9fc0470000000000000000000000000000000000000000000000000000000081526004810192909252602482015260448101879052606481018690526084810185905273ffffffffffffffffffffffffffffffffffffffff821690629fc0479060a401602060405180830381865afa158015611cc3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ce79190613323565b925050505b949350505050565b600954600114611d60576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560055473ffffffffffffffffffffffffffffffffffffffff163314611de6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f53503a202174696d656c6f636b00000000000000000000000000000000000000604482015260640161066e565b60025460101015611e53576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f53503a2052657761726420706f6f6c206c656e677468203e2031360000000000604482015260640161066e565b6006546040517fbd5b622a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a811660048301529091169063bd5b622a90602401602060405180830381865afa158015611ec3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ee79190613301565b611f4d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f53503a20496e76616c6964207265776172642072656261736572000000000000604482015260640161066e565b6006546040517fa5120bd500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff89811660048301529091169063a5120bd590602401602060405180830381865afa158015611fbd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611fe19190613301565b612047576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f53503a20496e76616c696420726577617264206d756c7469706c696572000000604482015260640161066e565b808211156120d7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f53503a20737461727456657374696e6754696d65203e20656e6456657374696e60448201527f6754696d65000000000000000000000000000000000000000000000000000000606482015260840161066e565b8542116120e457856120e6565b425b9550848610612151576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601e60248201527f53503a20737461727454696d65203e3d20656e6452657761726454696d650000604482015260640161066e565b60648311156121bc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f53503a20696e76616c6964206c6f636b52657761726450657263656e74000000604482015260640161066e565b6121c4612888565b6002604051806101a001604052808b73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1681526020018973ffffffffffffffffffffffffffffffffffffffff168152602001888152602001888152602001878152602001868152602001600081526020018581526020018481526020018381526020018484612263919061333c565b815260006020918201819052835460018082018655948252908290208351600d9092020180547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff93841617825592840151818601805485169184169190911790556040840151600280830180549095169190931617909255606083015160038301556080830151600483015560a0830151600583015560c0830151600683015560e0830151600783015561010083015160088301556101208301516009830155610140830151600a830155610160830151600b83015561018090920151600c9091015554612369919061333c565b6040517fa2c202ffa25e71dc0d2875a9b67a9e2572541a0a246c21d72355cca968fd4be190600090a25050600160095550505050505050565b6000610bf482426105068160016132ca565b600954600114612420576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560085415806124c157506006546040517fea74109e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff9091169063ea74109e90602401602060405180830381865afa15801561249d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124c19190613301565b612527576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f53503a204e6f7420616c6c6f7720656d657267656e6379576974686472617700604482015260640161066e565b33600090815260016020526040902080546007546125459082612de1565b600755600082556003546125709073ffffffffffffffffffffffffffffffffffffffff163383612a54565b60025460005b8160ff168160ff1610156125b85760ff811660009081526001850160209081526040808320839055600287019091528120556125b1816132e2565b9050612576565b505060016009555050565b60095460011461262f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a204c4f434b454400000000000000000000000000000000000000000000604482015260640161066e565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146126b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f53503a202174696d656c6f636b00000000000000000000000000000000000000604482015260640161066e565b6006546040517fa5120bd500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83811660048301529091169063a5120bd590602401602060405180830381865afa158015612725573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127499190613301565b6127af576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f53503a20496e76616c696420726577617264206d756c7469706c696572000000604482015260640161066e565b600060028360ff16815481106127c7576127c761326c565b60009182526020909120600d909102016002810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8516179055905061282483611780565b60405173ffffffffffffffffffffffffffffffffffffffff8316815260ff8416907fa5e6b0a10fde1bb3c6184cb03bd87ce234e172121088195454746cf4a2e8094d9060200161176e565b336000908152600160205260409020546119fd90610606565b60025460005b8160ff168160ff1610156128b5576128a581611780565b6128ae816132e2565b905061288e565b5050565b3360009081526001602052604090208054821115612933576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601b60248201527f53503a20696e76616c696420776974686472617720616d6f756e740000000000604482015260640161066e565b600854600682015461294491612def565b4210156129ad576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600a60248201527f53503a2066726f7a656e00000000000000000000000000000000000000000000604482015260640161066e565b6129b633610917565b6007546129c39083612de1565b60075580546129d29083612de1565b815560025460005b8160ff168160ff161015612a4e57612a29670de0b6b3a7640000610e1060028460ff1681548110612a0d57612a0d61326c565b600091825260209091206007600d909202010154865490612dc9565b60ff82166000908152600185016020526040902055612a47816132e2565b90506129da565b50505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb000000000000000000000000000000000000000000000000000000001790529151600092839290871691612aeb9190613353565b6000604051808303816000865af19150503d8060008114612b28576040519150601f19603f3d011682016040523d82523d6000602084013e612b2d565b606091505b5091509150818015612b57575080511580612b57575080806020019051810190612b579190613301565b6118b7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c454400604482015260640161066e565b6007546003546040517f70a08231000000000000000000000000000000000000000000000000000000008152306004820152600092612c5b92909173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa158015612c37573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e169190613323565b905060008111612cc7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601360248201527f53503a20496e76616c69642062616c616e636500000000000000000000000000604482015260640161066e565b600754612cd49082612def565b60075573ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260409020612d0583610917565b8054612d119083612def565b815560025460005b8160ff168160ff161015612d7157612d4c670de0b6b3a7640000610e1060028460ff1681548110612a0d57612a0d61326c565b60ff82166000908152600185016020526040902055612d6a816132e2565b9050612d19565b5042600683015560405183815273ffffffffffffffffffffffffffffffffffffffff8516907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a250505050565b6000610bb6828461338e565b6000610bb682846133cb565b6000610bb683836001612faa565b600080612dfc83856132ca565b9050610bb6848210156000612fce565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790529151600092839290881691612eab9190613353565b6000604051808303816000865af19150503d8060008114612ee8576040519150601f19603f3d011682016040523d82523d6000602084013e612eed565b606091505b5091509150818015612f17575080511580612f17575080806020019051810190612f179190613301565b612fa2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c454400000000000000000000000000000000000000000000000000000000606482015260840161066e565b505050505050565b6000612fb98484111583612fce565b6000612fc5848661333c565b95945050505050565b816128b5577f08c379a0000000000000000000000000000000000000000000000000000000006000908152602060045260076024526652455123000030600a808404818106603090810160081b83870601918390049283060160101b019190910160c81b60448190526128b592606490fd5b803573ffffffffffffffffffffffffffffffffffffffff8116811461306457600080fd5b919050565b60006020828403121561307b57600080fd5b610bb682613040565b803560ff8116811461306457600080fd5b600080604083850312156130a857600080fd5b6130b183613084565b91506130bf60208401613040565b90509250929050565b6000602082840312156130da57600080fd5b5035919050565b600080600080608085870312156130f757600080fd5b61310085613040565b93506020850135925061311560408601613040565b915061312360608601613040565b905092959194509250565b60008060006060848603121561314357600080fd5b61314c84613084565b925061315a60208501613040565b9150604084013590509250925092565b60006020828403121561317c57600080fd5b610bb682613084565b60008060006060848603121561319a57600080fd5b6131a384613084565b95602085013595506040909401359392505050565b600080600080608085870312156131ce57600080fd5b6131d785613084565b966020860135965060408601359560600135945092505050565b60008060008060008060008060006101208a8c03121561321057600080fd5b6132198a613040565b985061322760208b01613040565b975061323560408b01613040565b989b979a5097986060810135985060808101359760a0820135975060c0820135965060e08201359550610100909101359350915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082198211156132dd576132dd61329b565b500190565b600060ff821660ff81036132f8576132f861329b565b60010192915050565b60006020828403121561331357600080fd5b81518015158114610bb657600080fd5b60006020828403121561333557600080fd5b5051919050565b60008282101561334e5761334e61329b565b500390565b6000825160005b81811015613374576020818601810151858301520161335a565b81811115613383576000828501525b509190910192915050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156133c6576133c661329b565b500290565b600082613401577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea26469706673582212200e6a3e964289f6afde19462ad3d293a07ec4c7277f971c76ff4ba402ab73526464736f6c634300080f0033a26469706673582212207a7af0e580edc6ee7fd6b0e3033502fe1266cdd6fcca92241142e47bb521d9ef64736f6c634300080f0033";

export class StakePoolCreator__factory extends ContractFactory {
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
  ): Promise<StakePoolCreator> {
    return super.deploy(overrides || {}) as Promise<StakePoolCreator>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StakePoolCreator {
    return super.attach(address) as StakePoolCreator;
  }
  connect(signer: Signer): StakePoolCreator__factory {
    return super.connect(signer) as StakePoolCreator__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakePoolCreatorInterface {
    return new utils.Interface(_abi) as StakePoolCreatorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakePoolCreator {
    return new Contract(address, _abi, signerOrProvider) as StakePoolCreator;
  }
}
