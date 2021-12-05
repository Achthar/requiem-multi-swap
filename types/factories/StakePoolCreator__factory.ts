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
  "0x6080604052610bb960005534801561001657600080fd5b50613662806100266000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806301f79fb61461004657806354fd4d501461005b578063efc81a8c14610077575b600080fd5b6100596100543660046102e1565b6100a4565b005b61006460005481565b6040519081526020015b60405180910390f35b61007f610253565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161006e565b8660006100b3838501856103f8565b90508173ffffffffffffffffffffffffffffffffffffffff1663c0eac9ea88836000015184602001518560400151866060015187608001518860a001518960c001518a60e001516040518a63ffffffff1660e01b81526004016101769998979695949392919073ffffffffffffffffffffffffffffffffffffffff998a16815297891660208901529590971660408701526060860193909352608085019190915260a084015260c083015260e08201929092526101008101919091526101200190565b600060405180830381600087803b15801561019057600080fd5b505af11580156101a4573d6000803e3d6000fd5b505050506101008101516040517f358394d800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a811660048301526024820192909252868216604482015287821660648201529083169063358394d890608401600060405180830381600087803b15801561023057600080fd5b505af1158015610244573d6000803e3d6000fd5b50505050505050505050505050565b60008033600054604051610266906102ab565b73ffffffffffffffffffffffffffffffffffffffff90921682526020820152604001604051809103906000f0801580156102a4573d6000803e3d6000fd5b5092915050565b6131ab8061048283390190565b803573ffffffffffffffffffffffffffffffffffffffff811681146102dc57600080fd5b919050565b600080600080600080600060c0888a0312156102fc57600080fd5b610305886102b8565b9650610313602089016102b8565b9550610321604089016102b8565b945061032f606089016102b8565b935061033d608089016102b8565b925060a088013567ffffffffffffffff8082111561035a57600080fd5b818a0191508a601f83011261036e57600080fd5b81358181111561037d57600080fd5b8b602082850101111561038f57600080fd5b60208301945080935050505092959891949750929550565b604051610120810167ffffffffffffffff811182821017156103f2577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60405290565b6000610120828403121561040b57600080fd5b6104136103a7565b61041c836102b8565b815261042a602084016102b8565b602082015260408301356040820152606083013560608201526080830135608082015260a083013560a082015260c083013560c082015260e083013560e0820152610100808401358183015250809150509291505056fe60806040526203f4806008556001600955600a805460ff191690553480156200002757600080fd5b50604051620031ab380380620031ab8339810160408190526200004a916200007d565b600680546001600160a01b039093166001600160a01b0319938416179055600580549092163317909155600055620000b9565b600080604083850312156200009157600080fd5b82516001600160a01b0381168114620000a957600080fd5b6020939093015192949293505050565b6130e280620000c96000396000f3fe608060405234801561001057600080fd5b50600436106102265760003560e01c80638583f6a51161012a578063c0eac9ea116100bd578063e2589d381161008c578063efe2226611610071578063efe22266146105be578063f36c0a72146105de578063f77c4791146105e657600080fd5b8063e2589d38146105a3578063e9fad8ee146105b657600080fd5b8063c0eac9ea14610555578063d33219b414610568578063d9fa1de114610588578063db2e21bc1461059b57600080fd5b8063b69ef8a8116100f9578063b69ef8a81461051e578063b88a802f14610527578063be6153351461052f578063c012c42e1461054257600080fd5b80638583f6a5146104d257806385cc179e146104e55780639c3962cb146104f8578063a694fc3a1461050b57600080fd5b80634bf69206116101bd57806360d470881161018c5780636d3c6d92116101715780636d3c6d921461041957806372aa0a601461042c57806376d743fe146104bf57600080fd5b806360d47088146103f357806364467bbe1461040657600080fd5b80634bf692061461037f57806351ed6a301461039257806354fd4d50146103d7578063597293f3146103e057600080fd5b80633468a5b8116101f95780633468a5b81461032e578063358394d814610351578063362a3fad14610364578063437686491461037757600080fd5b806317837baa1461022b5780631959a0021461024757806329d79588146102835780632e1a7d4d14610319575b600080fd5b61023460085481565b6040519081526020015b60405180910390f35b61026e610255366004612d0e565b6001602052600090815260409020805460069091015482565b6040805192835260208301919091520161023e565b6102f1610291366004612d3a565b73ffffffffffffffffffffffffffffffffffffffff166000908152600160208181526040808420805460ff909616855292830182528084205460038401835281852054600485018452828620546005909501909352932054939492939092565b604080519586526020860194909452928401919091526060830152608082015260a00161023e565b61032c610327366004612d6d565b610606565b005b61034161033c366004612d0e565b6106cc565b604051901515815260200161023e565b61032c61035f366004612d86565b610767565b61032c610372366004612d0e565b6108ca565b600254610234565b61032c61038d366004612d0e565b6108fd565b6003546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161023e565b61023460005481565b6102346103ee366004612dd3565b610a43565b610234610401366004612d0e565b610b3c565b61032c610414366004612e0f565b610b79565b61032c610427366004612d3a565b610cc6565b61043f61043a366004612d6d565b61118a565b6040805173ffffffffffffffffffffffffffffffffffffffff9e8f1681529c8e1660208e01529a909c16998b019990995260608a0197909752608089019590955260a088019390935260c087019190915260e08601526101008501526101208401526101408301526101608201526101808101919091526101a00161023e565b61032c6104cd366004612e2a565b61121d565b61032c6104e0366004612d3a565b6113c3565b61032c6104f3366004612e0f565b61162f565b610234610506366004612e2a565b61176d565b61032c610519366004612d6d565b611804565b61023460075481565b61032c611889565b61023461053d366004612d3a565b611894565b610234610550366004612e5d565b611a67565b61032c610563366004612e96565b611b89565b6005546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b610234610596366004612e0f565b612167565b61032c612179565b61032c6105b1366004612d3a565b612354565b61032c6125b2565b6004546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b61032c6125cb565b6006546103b29073ffffffffffffffffffffffffffffffffffffffff1681565b60095460011461065d5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b45440000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600060095561066b816125fc565b60035461068f9073ffffffffffffffffffffffffffffffffffffffff163383612763565b60405181815233907f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243649060200160405180910390a2506001600955565b6000805b60025460ff8216101561075e57600060028260ff16815481106106f5576106f5612f11565b60009182526020909120600d90910201805490915073ffffffffffffffffffffffffffffffffffffffff8581169116141561074d57600581015461073c906203f480612f6f565b42101561074d575060009392505050565b5061075781612f87565b90506106d0565b50600192915050565b600a5460ff16156107ba5760405162461bcd60e51b815260206004820152601d60248201527f53503a20496e697469616c697a65206d7573742062652066616c73652e0000006044820152606401610654565b62278d0060085411156108355760405162461bcd60e51b815260206004820152602160248201527f53503a20756e7374616b696e6746726f7a656e54696d65203e2033302064617960448201527f73000000000000000000000000000000000000000000000000000000000000006064820152608401610654565b6003805473ffffffffffffffffffffffffffffffffffffffff9586167fffffffffffffffffffffffff000000000000000000000000000000000000000091821617909155600893909355600480549285169284169290921790915560058054919093169116179055600a80547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b60025460005b8160ff168160ff1610156108f8576108e88184610cc6565b6108f181612f87565b90506108d0565b505050565b60095460011461094f5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b60006009556006546040517f393a748400000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff9091169063393a748490602401602060405180830381865afa1580156109c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e69190612fa7565b610a325760405162461bcd60e51b815260206004820152601260248201527f53503a20496e76616c69642073656e64657200000000000000000000000000006044820152606401610654565b610a3b816128b2565b506001600955565b60008060028560ff1681548110610a5c57610a5c612f11565b60009182526020909120600d90910201600181015490915073ffffffffffffffffffffffffffffffffffffffff1680610a99578392505050610b35565b6040517f2e81056600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff868116600483015260248201869052821690632e81056690604401602060405180830381865afa158015610b0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b309190612fc9565b925050505b9392505050565b60085473ffffffffffffffffffffffffffffffffffffffff82166000908152600160205260408120600601549091610b7391612f6f565b92915050565b600954600114610bcb5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b600060095560055473ffffffffffffffffffffffffffffffffffffffff163314610c375760405162461bcd60e51b815260206004820152600d60248201527f53503a202174696d656c6f636b000000000000000000000000000000000000006044820152606401610654565b600060028260ff1681548110610c4f57610c4f612f11565b90600052602060002090600d02019050610c688261162f565b426005820181905560006006830181905560405160ff8516927fd50c9d621671c3fc38b7813912936d3cee3f956bdbf5f6c61b5091f2ff2b0fd592610cb592918252602082015260400190565b60405180910390a250506001600955565b610ccf8261162f565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001602052604081206002805491929160ff8616908110610d0e57610d0e612f11565b600091825260208083206007600d909302019182015460ff881684526001860190915260408320548554929450909291610d679190610d6190670de0b6b3a764000090610d5b9087612aa4565b90612ab0565b90612abc565b60088401549091508015610ef95783600a0154421115610dfc5760ff8716600090815260058601602090815260408083205460048901909252822054610dac91612abc565b90508015610df657610dbe8382612aca565b60ff89166000908152600588016020526040902054909350610de09082612aca565b60ff891660009081526005880160205260409020555b50610ef9565b8115610e58576000610e136064610d5b8585612aa4565b9050610e1f8382612abc565b60ff89166000908152600488016020526040902054909350610e419082612aca565b60ff89166000908152600488016020526040902055505b600984015442811015610ef757600b850154600090610e9990610d5b610e7e4286612abc565b60ff8d16600090815260048c01602052604090205490612aa4565b60ff8a16600090815260058901602052604090205490915080821115610ef4576000610ec58383612abc565b9050610ed18282612aca565b60ff8c16600090815260058b016020526040902055610ef08682612aca565b9550505b50505b505b81156111815760ff87166000908152600386016020526040902054610f1e9083612aca565b60ff88166000908152600387016020526040902055600c840154610f429083612aca565b600c8501558454610f6190670de0b6b3a764000090610d5b9086612aa4565b60ff8816600090815260018701602090815260408083209390935560028801905290812054610f909084612aca565b60ff8916600090815260028801602052604080822083905587546004805492517f70a0823100000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff93841691810191909152939450169182906370a0823190602401602060405180830381865afa15801561101f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110439190612fc9565b9050801561117d5760ff8a166000908152600289016020526040812081905561106d8b8486610a43565b9050600082821161107e5781611080565b825b600480546040517fd1660f9900000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff888116938201939093528e8316602482015260448101849052929350169063d1660f9990606401600060405180830381600087803b15801561110057600080fd5b505af1158015611114573d6000803e3d6000fd5b5050604080518881526020810186905290810184905273ffffffffffffffffffffffffffffffffffffffff808f1693508716915060ff8f16907f16dc511f817964d1eb39e0c3e84ce317f07b5b12cdfa1f8c2f179a08836af51a9060600160405180910390a450505b5050505b50505050505050565b6002818154811061119a57600080fd5b60009182526020909120600d9091020180546001820154600283015460038401546004850154600586015460068701546007880154600889015460098a0154600a8b0154600b8c0154600c909c015473ffffffffffffffffffffffffffffffffffffffff9b8c169d50998b169b9a9098169996989597949693959294919390928d565b60095460011461126f5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146112db5760405162461bcd60e51b815260206004820152600d60248201527f53503a202174696d656c6f636b000000000000000000000000000000000000006044820152606401610654565b600060028460ff16815481106112f3576112f3612f11565b90600052602060002090600d02019050806005015442111580156113175750824211155b6113635760405162461bcd60e51b815260206004820152601d60248201527f53503a20626c6f636b54696d65203e20656e6452657761726454696d650000006044820152606401610654565b61136c8461162f565b6005810183905560068101829055604080518481526020810184905260ff8616917fd50c9d621671c3fc38b7813912936d3cee3f956bdbf5f6c61b5091f2ff2b0fd5910160405180910390a2505060016009555050565b6009546001146114155760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146114815760405162461bcd60e51b815260206004820152600d60248201527f53503a202174696d656c6f636b000000000000000000000000000000000000006044820152606401610654565b6006546040517fbd5b622a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83811660048301529091169063bd5b622a90602401602060405180830381865afa1580156114f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115159190612fa7565b6115615760405162461bcd60e51b815260206004820152601a60248201527f53503a20496e76616c69642072657761726420726562617365720000000000006044820152606401610654565b600060028360ff168154811061157957611579612f11565b60009182526020909120600d909102016001810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff851617905590506115d68361162f565b60405173ffffffffffffffffffffffffffffffffffffffff8316815260ff8416907fe6b2c8a01867d369cd4952ca70fea492ef433a6ff31b8c8d15c4781f136e60ed906020015b60405180910390a25050600160095550565b600060028260ff168154811061164757611647612f11565b90600052602060002090600d02019050600081600501549050600081421161166f5742611671565b815b600484015490915080821115611766576003546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009173ffffffffffffffffffffffffffffffffffffffff16906370a0823190602401602060405180830381865afa1580156116f0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117149190612fc9565b9050801561175d57600061174482610d5b670de0b6b3a764000061173e8b888a8d60060154611a67565b90612aa4565b60078701549091506117569082612aca565b6007870155505b50600484018290555b5050505050565b60008060028560ff168154811061178657611786612f11565b90600052602060002090600d0201905060008160060154905081600301548510806117b45750816005015485115b156117c457600092505050610b35565b60006117d287878785611a67565b83549091506117f990889073ffffffffffffffffffffffffffffffffffffffff1683610a43565b979650505050505050565b6009546001146118565760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b60006009556003546118809073ffffffffffffffffffffffffffffffffffffffff16333084612ae7565b610a3b336128b2565b611892336108ca565b565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001602052604081206002805483919060ff87169081106118d3576118d3612f11565b600091825260208220600d919091020160078101546003546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015292945090929173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa15801561195c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119809190612fc9565b600584015490915060004282106119975742611999565b815b600486015490915080821180156119af57508315155b156119e65760006119d685610d5b670de0b6b3a764000061173e8f87898e60060154611a67565b90506119e28682612aca565b9550505b60ff8a16600090815260018801602090815260408083205460028b019092528220548954611a319291610d6191611a2b90670de0b6b3a764000090610d5b908d612aa4565b90612aca565b8754909150611a58908c9073ffffffffffffffffffffffffffffffffffffffff1683610a43565b9b9a5050505050505050505050565b60008060028660ff1681548110611a8057611a80612f11565b60009182526020909120600d90910201600281015490915073ffffffffffffffffffffffffffffffffffffffff1680611aca57611ac18461173e8789612abc565b92505050611b81565b600382015460058301546040517e9fc0470000000000000000000000000000000000000000000000000000000081526004810192909252602482015260448101879052606481018690526084810185905273ffffffffffffffffffffffffffffffffffffffff821690629fc0479060a401602060405180830381865afa158015611b58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b7c9190612fc9565b925050505b949350505050565b600954600114611bdb5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b600060095560055473ffffffffffffffffffffffffffffffffffffffff163314611c475760405162461bcd60e51b815260206004820152600d60248201527f53503a202174696d656c6f636b000000000000000000000000000000000000006044820152606401610654565b60025460101015611c9a5760405162461bcd60e51b815260206004820152601b60248201527f53503a2052657761726420706f6f6c206c656e677468203e20313600000000006044820152606401610654565b6006546040517fbd5b622a00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff8a811660048301529091169063bd5b622a90602401602060405180830381865afa158015611d0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d2e9190612fa7565b611d7a5760405162461bcd60e51b815260206004820152601a60248201527f53503a20496e76616c69642072657761726420726562617365720000000000006044820152606401610654565b6006546040517fa5120bd500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff89811660048301529091169063a5120bd590602401602060405180830381865afa158015611dea573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e0e9190612fa7565b611e5a5760405162461bcd60e51b815260206004820152601d60248201527f53503a20496e76616c696420726577617264206d756c7469706c6965720000006044820152606401610654565b80821115611ed05760405162461bcd60e51b815260206004820152602560248201527f53503a20737461727456657374696e6754696d65203e20656e6456657374696e60448201527f6754696d650000000000000000000000000000000000000000000000000000006064820152608401610654565b854211611edd5785611edf565b425b9550848610611f305760405162461bcd60e51b815260206004820152601e60248201527f53503a20737461727454696d65203e3d20656e6452657761726454696d6500006044820152606401610654565b6064831115611f815760405162461bcd60e51b815260206004820152601d60248201527f53503a20696e76616c6964206c6f636b52657761726450657263656e740000006044820152606401610654565b611f896125cb565b6002604051806101a001604052808b73ffffffffffffffffffffffffffffffffffffffff1681526020018a73ffffffffffffffffffffffffffffffffffffffff1681526020018973ffffffffffffffffffffffffffffffffffffffff1681526020018881526020018881526020018781526020018681526020016000815260200185815260200184815260200183815260200184846120289190612fe2565b815260006020918201819052835460018082018655948252908290208351600d9092020180547fffffffffffffffffffffffff000000000000000000000000000000000000000090811673ffffffffffffffffffffffffffffffffffffffff93841617825592840151818601805485169184169190911790556040840151600280830180549095169190931617909255606083015160038301556080830151600483015560a0830151600583015560c0830151600683015560e0830151600783015561010083015160088301556101208301516009830155610140830151600a830155610160830151600b83015561018090920151600c909101555461212e9190612fe2565b6040517fa2c202ffa25e71dc0d2875a9b67a9e2572541a0a246c21d72355cca968fd4be190600090a25050600160095550505050505050565b6000610b738242610506816001612f6f565b6009546001146121cb5760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b6000600955600854158061226c57506006546040517fea74109e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff9091169063ea74109e90602401602060405180830381865afa158015612248573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061226c9190612fa7565b6122b85760405162461bcd60e51b815260206004820152601f60248201527f53503a204e6f7420616c6c6f7720656d657267656e63795769746864726177006044820152606401610654565b33600090815260016020526040902080546007546122d69082612abc565b600755600082556003546123019073ffffffffffffffffffffffffffffffffffffffff163383612763565b60025460005b8160ff168160ff1610156123495760ff8116600090815260018501602090815260408083208390556002870190915281205561234281612f87565b9050612307565b505060016009555050565b6009546001146123a65760405162461bcd60e51b815260206004820152600a60248201527f53503a204c4f434b4544000000000000000000000000000000000000000000006044820152606401610654565b600060095560055473ffffffffffffffffffffffffffffffffffffffff1633146124125760405162461bcd60e51b815260206004820152600d60248201527f53503a202174696d656c6f636b000000000000000000000000000000000000006044820152606401610654565b6006546040517fa5120bd500000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff83811660048301529091169063a5120bd590602401602060405180830381865afa158015612482573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906124a69190612fa7565b6124f25760405162461bcd60e51b815260206004820152601d60248201527f53503a20496e76616c696420726577617264206d756c7469706c6965720000006044820152606401610654565b600060028360ff168154811061250a5761250a612f11565b60009182526020909120600d909102016002810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff851617905590506125678361162f565b60405173ffffffffffffffffffffffffffffffffffffffff8316815260ff8416907fa5e6b0a10fde1bb3c6184cb03bd87ce234e172121088195454746cf4a2e8094d9060200161161d565b3360009081526001602052604090205461189290610606565b60025460005b8160ff168160ff1610156125f8576125e88161162f565b6125f181612f87565b90506125d1565b5050565b336000908152600160205260409020805482111561265c5760405162461bcd60e51b815260206004820152601b60248201527f53503a20696e76616c696420776974686472617720616d6f756e7400000000006044820152606401610654565b600854600682015461266d91612aca565b4210156126bc5760405162461bcd60e51b815260206004820152600a60248201527f53503a2066726f7a656e000000000000000000000000000000000000000000006044820152606401610654565b6126c5336108ca565b6007546126d29083612abc565b60075580546126e19083612abc565b815560025460005b8160ff168160ff16101561275d57612738670de0b6b3a7640000610d5b60028460ff168154811061271c5761271c612f11565b600091825260209091206007600d909202010154865490612aa4565b60ff8216600090815260018501602052604090205561275681612f87565b90506126e9565b50505050565b6040805173ffffffffffffffffffffffffffffffffffffffff8481166024830152604480830185905283518084039091018152606490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fa9059cbb0000000000000000000000000000000000000000000000000000000017905291516000928392908716916127fa9190612ff9565b6000604051808303816000865af19150503d8060008114612837576040519150601f19603f3d011682016040523d82523d6000602084013e61283c565b606091505b50915091508180156128665750805115806128665750808060200190518101906128669190612fa7565b6117665760405162461bcd60e51b815260206004820152601f60248201527f5472616e7366657248656c7065723a205452414e534645525f4641494c4544006044820152606401610654565b6007546003546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015260009261295092909173ffffffffffffffffffffffffffffffffffffffff909116906370a0823190602401602060405180830381865afa15801561292c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d619190612fc9565b9050600081116129a25760405162461bcd60e51b815260206004820152601360248201527f53503a20496e76616c69642062616c616e6365000000000000000000000000006044820152606401610654565b6007546129af9082612aca565b60075573ffffffffffffffffffffffffffffffffffffffff821660009081526001602052604090206129e0836108ca565b80546129ec9083612aca565b815560025460005b8160ff168160ff161015612a4c57612a27670de0b6b3a7640000610d5b60028460ff168154811061271c5761271c612f11565b60ff82166000908152600185016020526040902055612a4581612f87565b90506129f4565b5042600683015560405183815273ffffffffffffffffffffffffffffffffffffffff8516907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a250505050565b6000610b358284613034565b6000610b358284613071565b6000610b3583836001612c6b565b600080612ad78385612f6f565b9050610b35848210156000612c8f565b6040805173ffffffffffffffffffffffffffffffffffffffff85811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f23b872dd000000000000000000000000000000000000000000000000000000001790529151600092839290881691612b869190612ff9565b6000604051808303816000865af19150503d8060008114612bc3576040519150601f19603f3d011682016040523d82523d6000602084013e612bc8565b606091505b5091509150818015612bf2575080511580612bf2575080806020019051810190612bf29190612fa7565b612c635760405162461bcd60e51b8152602060048201526024808201527f5472616e7366657248656c7065723a205452414e534645525f46524f4d5f464160448201527f494c4544000000000000000000000000000000000000000000000000000000006064820152608401610654565b505050505050565b6000612c7a8484111583612c8f565b6000612c868486612fe2565b95945050505050565b816125f85762461bcd60e51b600090815260206004526007602452600a808304818104828106603090810160101b848706949093060160081b929092010166524551230000300160c81b6044526125f891606490fd5b803573ffffffffffffffffffffffffffffffffffffffff81168114612d0957600080fd5b919050565b600060208284031215612d2057600080fd5b610b3582612ce5565b803560ff81168114612d0957600080fd5b60008060408385031215612d4d57600080fd5b612d5683612d29565b9150612d6460208401612ce5565b90509250929050565b600060208284031215612d7f57600080fd5b5035919050565b60008060008060808587031215612d9c57600080fd5b612da585612ce5565b935060208501359250612dba60408601612ce5565b9150612dc860608601612ce5565b905092959194509250565b600080600060608486031215612de857600080fd5b612df184612d29565b9250612dff60208501612ce5565b9150604084013590509250925092565b600060208284031215612e2157600080fd5b610b3582612d29565b600080600060608486031215612e3f57600080fd5b612e4884612d29565b95602085013595506040909401359392505050565b60008060008060808587031215612e7357600080fd5b612e7c85612d29565b966020860135965060408601359560600135945092505050565b60008060008060008060008060006101208a8c031215612eb557600080fd5b612ebe8a612ce5565b9850612ecc60208b01612ce5565b9750612eda60408b01612ce5565b989b979a5097986060810135985060808101359760a0820135975060c0820135965060e08201359550610100909101359350915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008219821115612f8257612f82612f40565b500190565b600060ff821660ff811415612f9e57612f9e612f40565b60010192915050565b600060208284031215612fb957600080fd5b81518015158114610b3557600080fd5b600060208284031215612fdb57600080fd5b5051919050565b600082821015612ff457612ff4612f40565b500390565b6000825160005b8181101561301a5760208186018101518583015201613000565b81811115613029576000828501525b509190910192915050565b6000817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561306c5761306c612f40565b500290565b6000826130a7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b50049056fea2646970667358221220c920aa94c51750fbb4f64389d28fe6ef2a06946584fbaebd9d7bfcfc5a79de2764736f6c634300080a0033a26469706673582212206cd3ecac491d35c25286cfd896c147e24b70fa1092e4918c9b21ebe4dcead2b564736f6c634300080a0033";

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
