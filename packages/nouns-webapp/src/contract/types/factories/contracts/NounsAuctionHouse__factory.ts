/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  NounsAuctionHouse,
  NounsAuctionHouseInterface,
} from "../../contracts/NounsAuctionHouse";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "extended",
        type: "bool",
      },
    ],
    name: "AuctionBid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "AuctionCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "AuctionExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minBidIncrementPercentage",
        type: "uint256",
      },
    ],
    name: "AuctionMinBidIncrementPercentageUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "reservePrice",
        type: "uint256",
      },
    ],
    name: "AuctionReservePriceUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "AuctionSettled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timeBuffer",
        type: "uint256",
      },
    ],
    name: "AuctionTimeBufferUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "auction",
    outputs: [
      {
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "bidder",
        type: "address",
      },
      {
        internalType: "bool",
        name: "settled",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nounId",
        type: "uint256",
      },
    ],
    name: "createBid",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "duration",
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
        internalType: "contract INounsToken",
        name: "_nouns",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_timeBuffer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_minBidIncrementPercentage",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_duration",
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
    name: "minBidIncrementPercentage",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nouns",
    outputs: [
      {
        internalType: "contract INounsToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reservePrice",
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
        internalType: "uint8",
        name: "_minBidIncrementPercentage",
        type: "uint8",
      },
    ],
    name: "setMinBidIncrementPercentage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reservePrice",
        type: "uint256",
      },
    ],
    name: "setReservePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_timeBuffer",
        type: "uint256",
      },
    ],
    name: "setTimeBuffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "settleCurrentAndCreateNewAuction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "timeBuffer",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
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
] as const;

const _bytecode =
  "0x6080806040523461001657611501908161001c8239f35b600080fdfe6080604081815260048036101561001557600080fd5b600092833560e01c9081630fb5a6b414610c5e575080632de45f1814610c3557806336ebdb3814610bc85780633f4ba83a14610b395780633fc8cef314610b105780635c975abb14610aec578063659dd2b4146108485780637120334b146107ee578063715018a61461078e5780637d9f6db5146107375780638456cb59146106ca57806387f49f54146103125780638da5cb5b146102e9578063a4d0a17e146102ae578063b296024d1461028c578063ce9c7c0d14610232578063db2e1eed14610213578063ec91f2a4146101f0578063f25efffc146101a15763f2fde38b146100ff57600080fd5b3461019d57602036600319011261019d578035916001600160a01b03808416908185036101995761013590609754163314610c7a565b15610147578361014484610cc5565b80f35b906020608492519162461bcd60e51b8352820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152fd5b8580fd5b8280fd5b83346101ed57806003193601126101ed576101c160026065541415610db0565b60026065556101d560ff6033541615610d71565b6101dd61110f565b6101e5610f88565b600160655580f35b80fd5b50503461020f578160031936011261020f5760209060cb549051908152f35b5080fd5b50503461020f578160031936011261020f5760209060cc549051908152f35b503461019d57602036600319011261019d577f6ab2e127d7fdf53b8f304e59d3aab5bfe97979f52a85479691a6fab27a28a6b291602091359061028060018060a01b03609754163314610c7a565b8160cc5551908152a180f35b50503461020f578160031936011261020f5760209060ff60cd54169051908152f35b83346101ed57806003193601126101ed576102cd60ff60335416610dfc565b6102dc60026065541415610db0565b60026065556101e561110f565b50503461020f578160031936011261020f5760975490516001600160a01b039091168152602090f35b503461019d5760c036600319011261019d576001600160a01b039035818116908190036106c6576024359182168092036106c6576084359160ff91828416809403610199577f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258602087549660016008878a821c16998a15809b816106bc575b61039a90610d0e565b6106ab575b508a54978089831c16988915809a816106a1575b6103bc90610d0e565b610690575b508b548181841c16908115809281610686575b6103dd90610d0e565b610675575b50610667575b8b54918183821c1692831580948161065d575b61040490610d0e565b61064c575b5060ff19998a93846033541660335561063e575b610630575b8c548d8382841c16918215809381610626575b61043e90610d0e565b610614575b508054908482851c1691821580938161060a575b61046090610d0e565b6105f8575b5050856065556105ea575b6105dc575b8c54908d8383831c169283158094816105d2575b61049290610d0e565b6105c0575b508054908482841c169182158093816105b6575b6104b490610d0e565b6105a4575b5050610596575b8d83815480931c1691821580938161058c575b6104dc90610d0e565b61057a575b50506104ec33610cc5565b61056c575b61055e575b61050560335491821615610d71565b161760335551338152a16bffffffffffffffffffffffff60a01b908160c954161760c95560ca54161760ca5560443560cb5560643560cc5560cd54161760cd5560a43560ce556105525780f35b805461ff001916815580f35b8b5461ff0019168c556104f6565b8c5461ff0019168d556104f1565b61ffff19166101011790558d386104e1565b50818616156104d3565b8d5461ff0019168e556104c0565b61ffff19166101011790558e386104b9565b50818716156104ab565b61ffff19166101011790558d38610497565b5081861615610489565b8c5461ff0019168d55610475565b8d5461ff0019168e55610470565b61ffff19166101011790558e38610465565b5081871615610457565b61ffff19166101011790558d38610443565b5081861615610435565b8c5461ff0019168d55610422565b8d5461ff0019168e5561041d565b61ffff1916610101178d5538610409565b50818416156103fb565b8b5461ff0019168c556103e8565b61ffff1916610101178d55386103e2565b50818416156103d4565b61ffff1916610101178c55386103c1565b50818316156103b3565b61ffff1916610101178b553861039f565b50818a1615610391565b8380fd5b50503461020f578160031936011261020f5760207f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2589161071560018060a01b03609754163314610c7a565b600160335461072760ff821615610d71565b60ff19161760335551338152a180f35b50503461020f578160031936011261020f5760c09060ff60cf549160d0549060d15460d2549160d3549381519687526020870152850152606084015260018060a01b038116608084015260a01c16151560a0820152f35b83346101ed57806003193601126101ed5760975481906001600160a01b038116906107ba338314610c7a565b6001600160a01b0319166097557f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e08280a380f35b503461019d57602036600319011261019d577f1b55d9f7002bda4490f467e326f22a4a847629c0f2d1ed421607d318d25b410d91602091359061083c60018060a01b03609754163314610c7a565b8160cb5551908152a180f35b50906020806003193601126106c65761086660026065541415610db0565b6002606555610873610ea7565b918335835103610aab5760608301938451421015610a785760cc543410610a3757828401805160ff60cd5416808202908282041482151715610a24579060646108bd920490610ef3565b34106109bd5760808501516001600160a01b0316806109ab575b50503460d05560d380546001600160a01b03191633179055845142810391908211610998575060cb548091109081610982575b5083517f1159164c56f277e6fc99c11731bd380e0347deb969b75523398734c252706ea36060845133815234878201528486820152a261094e575b84600160655580f35b7f6e912a3a9105bdd2af817ba5adc14e6c127c1035b5b648faa29ca0d58ab8ff4e925193519051908152a238808080610945565b61098c9042610ef3565b80865260d2553861090a565b634e487b7160e01b875260119052602486fd5b6109b6915190611357565b38806108d7565b509060849281519262461bcd60e51b845283015260248201527f4d7573742073656e64206d6f7265207468616e206c617374206269642062792060448201527f6d696e426964496e6372656d656e7450657263656e7461676520616d6f756e746064820152fd5b634e487b7160e01b895260118452602489fd5b82606492519162461bcd60e51b8352820152601f60248201527f4d7573742073656e64206174206c6561737420726573657276655072696365006044820152fd5b82606492519162461bcd60e51b8352820152600f60248201526e105d58dd1a5bdb88195e1c1a5c9959608a1b6044820152fd5b5162461bcd60e51b81529283015250601760248201527f4e6f756e206e6f7420757020666f722061756374696f6e0000000000000000006044820152606490fd5b50503461020f578160031936011261020f5760209060ff6033541690519015158152f35b50503461020f578160031936011261020f5760ca5490516001600160a01b039091168152602090f35b50503461020f578160031936011261020f5760207f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa91610b8460018060a01b03609754163314610c7a565b603354610b9360ff8216610dfc565b60ff191660335551338152a160d154158015610bb9575b610bb15780f35b610144610f88565b5060ff60d35460a01c16610baa565b503461019d57602036600319011261019d57359060ff821680920361019d577fec5ccd96cc77b6219e9d44143df916af68fc169339ea7de5008ff15eae13450d91602091610c2160018060a01b03609754163314610c7a565b8160ff1960cd54161760cd5551908152a180f35b50503461020f578160031936011261020f5760c95490516001600160a01b039091168152602090f35b84903461020f578160031936011261020f5760209060ce548152f35b15610c8157565b606460405162461bcd60e51b815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b609780546001600160a01b039283166001600160a01b0319821681179092559091167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600080a3565b15610d1557565b60405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608490fd5b15610d7857565b60405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606490fd5b15610db757565b60405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606490fd5b15610e0357565b60405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606490fd5b60c0810190811067ffffffffffffffff821117610e5b57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff8111610e5b57604052565b90601f8019910116810190811067ffffffffffffffff821117610e5b57604052565b60405190610eb482610e3f565b60cf54825260d054602083015260d154604083015260d254606083015260d3546001600160a01b038116608084015260a090811c60ff16151590830152565b91908201809211610f0057565b634e487b7160e01b600052601160045260246000fd5b600060443d10610f7457604051600319913d83016004833e815167ffffffffffffffff918282113d602484011117610f7757818401948551938411610f7f573d85010160208487010111610f775750610f7492910160200190610e85565b90565b949350505050565b50949350505050565b60018060a01b0360c9541660408051631249c58b60e01b81526020908181600481600080985af18491816110dc575b5061105057506001908360033d11611040575b6308c379a014610fe8575b50610fde575050565b51903d90823e3d90fd5b610ff0610f16565b15610fd55790507f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2588391600160335461102c60ff821615610d71565b60ff1916176033558351338152a138610fd5565b50600484803e835160e01c610fca565b92907fd6eddd1118d71820909c1197aa966dbc15ed6f508554252169cc3d5ccac756ca929161108160ce5442610ef3565b908060a0855161109081610e3f565b8881528286820152428782015284606082015282608082015201528560cf5560d0554260d1558060d2556affffffffffffffffffffff60a81b60d3541660d355825191428352820152a2565b9091508281813d8311611108575b6110f48183610e85565b8101031261110457519038610fb7565b8480fd5b503d6110ea565b611117610ea7565b906040808301511561131d5760a08301516112da57606083015142106112975760d3805460ff60a01b1916600160a01b1790556080830180516001600160a01b03949192919085168061121957508460c95416948151863b1561121457600096602488928651998a938492630852cd8d60e31b845260048401525af1958615611209577fc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d999495966111fa575b505b60208201918251806111e6575b5051945116905182519182526020820152a2565b6111f4908360975416611357565b386111d2565b61120390610e71565b386111c3565b83513d6000823e3d90fd5b600080fd5b948060c95416958251873b156112145760646000928387519a8b9485936323b872dd60e01b8552306004860152602485015260448401525af1958615611209577fc9f72b276a388619c6d185d146697036241880c36654b1a3ffdad07c24038d99949596611288575b506111c5565b61129190610e71565b38611282565b5162461bcd60e51b815260206004820152601860248201527f41756374696f6e206861736e277420636f6d706c6574656400000000000000006044820152606490fd5b5162461bcd60e51b815260206004820181905260248201527f41756374696f6e2068617320616c7265616479206265656e20736574746c65646044820152606490fd5b5162461bcd60e51b815260206004820152601460248201527320bab1ba34b7b7103430b9b713ba103132b3bab760611b6044820152606490fd5b60408051600093926020929167ffffffffffffffff90848101828111828210176114b7578452869052858080808886617530f1903d156114b1573d90811161149d578351906113af601f8201601f1916870183610e85565b815286853d92013e5b156113c5575b5050505050565b60ca546001600160a01b0391908216803b15611499578686916004865180948193630d0e30db60e41b83525af1801561148f57611477575b509060448492878360ca54168651988995869463a9059cbb60e01b865216600485015260248401525af190811561146e575061143b575b80806113be565b81813d8311611467575b61144f8183610e85565b8101031261020f5751801515036101ed578080611434565b503d611445565b513d85823e3d90fd5b84929196611486604492610e71565b969192506113fd565b84513d89823e3d90fd5b8680fd5b634e487b7160e01b87526041600452602487fd5b506113b8565b634e487b7160e01b88526041600452602488fdfea2646970667358221220f387f6ac0ce2dad17e046d3d13cc68c62d747e360c1c1e6931ab6697b4ec826e64736f6c63430008140033";

type NounsAuctionHouseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NounsAuctionHouseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NounsAuctionHouse__factory extends ContractFactory {
  constructor(...args: NounsAuctionHouseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NounsAuctionHouse> {
    return super.deploy(overrides || {}) as Promise<NounsAuctionHouse>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): NounsAuctionHouse {
    return super.attach(address) as NounsAuctionHouse;
  }
  override connect(signer: Signer): NounsAuctionHouse__factory {
    return super.connect(signer) as NounsAuctionHouse__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NounsAuctionHouseInterface {
    return new utils.Interface(_abi) as NounsAuctionHouseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsAuctionHouse {
    return new Contract(address, _abi, signerOrProvider) as NounsAuctionHouse;
  }
}
