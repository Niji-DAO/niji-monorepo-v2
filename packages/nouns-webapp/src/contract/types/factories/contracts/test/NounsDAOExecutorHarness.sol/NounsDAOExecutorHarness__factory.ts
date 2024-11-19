/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  NounsDAOExecutorHarness,
  NounsDAOExecutorHarnessInterface,
} from "../../../../contracts/test/NounsDAOExecutorHarness.sol/NounsDAOExecutorHarness";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "delay_",
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
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
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
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "CancelTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
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
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "ExecuteTransaction",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "NewAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "newDelay",
        type: "uint256",
      },
    ],
    name: "NewDelay",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newPendingAdmin",
        type: "address",
      },
    ],
    name: "NewPendingAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "txHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "target",
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
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "QueueTransaction",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "GRACE_PERIOD",
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
    name: "MAXIMUM_DELAY",
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
    name: "MINIMUM_DELAY",
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
    name: "acceptAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "cancelTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delay",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "executeTransaction",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin_",
        type: "address",
      },
    ],
    name: "harnessSetAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingAdmin_",
        type: "address",
      },
    ],
    name: "harnessSetPendingAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingAdmin",
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
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "signature",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "eta",
        type: "uint256",
      },
    ],
    name: "queueTransaction",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "queuedTransactions",
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
        internalType: "uint256",
        name: "delay_",
        type: "uint256",
      },
    ],
    name: "setDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pendingAdmin_",
        type: "address",
      },
    ],
    name: "setPendingAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60803461016657610f7990601f38839003908101601f19168201906001600160401b0382118383101761016b57808391604095869485528339810103126101665780516001600160a01b03811691908290036101665760200151906202a30082106100fc5762278d00821161009257600080546001600160a01b03191691909117905560025551610df790816101828239f35b825162461bcd60e51b815260206004820152602481018490527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2044656c6160448201527f79206d757374206e6f7420657863656564206d6178696d756d2064656c61792e6064820152608490fd5b825162461bcd60e51b815260206004820152603f60248201527f4e6f756e7344414f4578656375746f723a3a636f6e7374727563746f723a204460448201527f656c6179206d75737420657863656564206d696e696d756d2064656c61792e006064820152608490fd5b600080fd5b634e487b7160e01b600052604160045260246000fdfe6040608081526004908136101561001d575b5050361561001b57005b005b600091823560e01c9081630825f38f1461085a5781630e18b68114610785578163267822471461075c5781633a66f901146105aa5781634dd18bf5146104c5578163591fcdfe146103b85781636a42b8f81461039957816372b812b4146103635781637d645fab146103455781639ddf774f14610304578163b1b43ae5146102e6578163c1a287e2146102c8578163e177246e14610126578163f2b06537146100f5575063f851a4400361001157346100f157816003193601126100f157905490516001600160a01b039091168152602090f35b5080fd5b905034610122576020366003190112610122578160209360ff923581526003855220541690519015158152f35b8280fd5b90503461012257602036600319011261012257803591303303610255576202a30083106101ec5762278d008311610184575050806002557f948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c8280a280f35b60849250602081519262461bcd60e51b845283015260248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2044656c6160448201527f79206d757374206e6f7420657863656564206d6178696d756d2064656c61792e6064820152fd5b906020608492519162461bcd60e51b8352820152603c60248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2044656c6160448201527f79206d75737420657863656564206d696e696d756d2064656c61792e000000006064820152fd5b90602060a492519162461bcd60e51b8352820152604160248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2043616c6c60448201527f206d75737420636f6d652066726f6d204e6f756e7344414f4578656375746f726064820152601760f91b6084820152fd5b5050346100f157816003193601126100f15760209051621275008152f35b5050346100f157816003193601126100f157602090516202a3008152f35b8334610342576020366003190112610342576001600160a01b03610326610bbe565b166bffffffffffffffffffffffff60a01b600154161760015580f35b80fd5b5050346100f157816003193601126100f1576020905162278d008152f35b8334610342576020366003190112610342576001600160a01b03610385610bbe565b82546001600160a01b031916911617815580f35b5050346100f157816003193601126100f1576020906002549051908152f35b91905034610122576103c936610c64565b875493966001600160a01b0395949193918616330361045c575091610456917f2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf879594938888516104338161042587878760208501978d89610d31565b03601f198101835282610bd9565b51902097888b526003602052808b2060ff19815416905551958695169885610d73565b0390a380f35b608490602088519162461bcd60e51b8352820152603f60248201527f4e6f756e7344414f4578656375746f723a3a63616e63656c5472616e7361637460448201527f696f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e006064820152fd5b905034610122576020366003190112610122576104e0610bbe565b91303303610530575050600180546001600160a01b0319166001600160a01b039290921691821790557f69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a7568280a280f35b90602060a492519162461bcd60e51b8352820152604860248201527f4e6f756e7344414f4578656375746f723a3a73657450656e64696e6741646d6960448201527f6e3a2043616c6c206d75737420636f6d652066726f6d204e6f756e7344414f456064820152673c32b1baba37b91760c11b6084820152fd5b90508234610342576105bb36610c64565b855493966001600160a01b039594919391861633036106f35760025442018042116106e057841061065d57602089808a8a7f76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f8b8b6106548c8c8c888a5161062e818f878787610425938501978d89610d31565b5190209a888c809a5260038e5220600160ff198254161790558951958695169885610d73565b0390a351908152f35b60a49060208a519162461bcd60e51b8352820152605160248201527f4e6f756e7344414f4578656375746f723a3a71756575655472616e736163746960448201527f6f6e3a20457374696d6174656420657865637574696f6e20626c6f636b206d7560648201527039ba1039b0ba34b9b33c903232b630bc9760791b6084820152fd5b634e487b7160e01b885260118252602488fd5b60849060208a519162461bcd60e51b8352820152603e60248201527f4e6f756e7344414f4578656375746f723a3a71756575655472616e736163746960448201527f6f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e00006064820152fd5b5050346100f157816003193601126100f15760015490516001600160a01b039091168152602090f35b905034610122578260031936011261012257600154916001600160a01b03831633036107f25750506bffffffffffffffffffffffff60a01b90338284541617835516600155337f71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c8280a280f35b60849250602081519262461bcd60e51b845283015260248201527f4e6f756e7344414f4578656375746f723a3a61636365707441646d696e3a204360448201527f616c6c206d75737420636f6d652066726f6d2070656e64696e6741646d696e2e6064820152fd5b839150346100f15761086b36610c64565b86546001600160a01b039893969395929089163303610b6757855196602097888101906108a0816104258787878d8c89610d31565b51902094858a526003895260ff888b20541615610b0257834210610a9557621275008401808511610a82574211610a2b57858a5260038952878a20805460ff1916905581518a908a816109e757505080845b8b815191018a895af13d156109de573d61090b81610c11565b906109188b519283610bd9565b8152809b8b3d92013e5b156109795750610975979899927fa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e79492610963928951958695169885610d73565b0390a351928284938452830190610d0c565b0390f35b875162461bcd60e51b815290810189905260456024820152600080516020610da283398151915260448201527f74696f6e3a205472616e73616374696f6e20657865637574696f6e2072657665606482015264393a32b21760d91b608482015260a490fd5b60609a50610922565b610a266024849363ffffffff60e01b9084890120168d5193849181830152610a178a518092858501908d01610ce9565b81010386810184520182610bd9565b6108f2565b875162461bcd60e51b8152908101899052603b6024820152600080516020610da283398151915260448201527f74696f6e3a205472616e73616374696f6e206973207374616c652e00000000006064820152608490fd5b634e487b7160e01b8b526011825260248bfd5b875162461bcd60e51b8152908101899052604d6024820152600080516020610da283398151915260448201527f74696f6e3a205472616e73616374696f6e206861736e2774207375727061737360648201526c32b2103a34b6b2903637b1b59760991b608482015260a490fd5b875162461bcd60e51b815290810189905260456024820152600080516020610da283398151915260448201527f74696f6e3a205472616e73616374696f6e206861736e2774206265656e20717560648201526432bab2b21760d91b608482015260a490fd5b855162461bcd60e51b815260208186015260248101879052600080516020610da283398151915260448201527f74696f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e6064820152608490fd5b600435906001600160a01b0382168203610bd457565b600080fd5b90601f8019910116810190811067ffffffffffffffff821117610bfb57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff8111610bfb57601f01601f191660200190565b929192610c3982610c11565b91610c476040519384610bd9565b829481845281830111610bd4578281602093846000960137010152565b9060a0600319830112610bd4576004356001600160a01b0381168103610bd457916024359167ffffffffffffffff604435818111610bd45783602382011215610bd45783816024610cba93600401359101610c2d565b92606435918211610bd45780602383011215610bd457816024610ce293600401359101610c2d565b9060843590565b60005b838110610cfc5750506000910152565b8181015183820152602001610cec565b90602091610d2581518092818552858086019101610ce9565b601f01601f1916010190565b95949390608093610d6e93610d609260018060a01b03168952602089015260a0604089015260a0880190610d0c565b908682036060880152610d0c565b930152565b949392610d93606093610d6e938852608060208901526080880190610d0c565b908682036040880152610d0c56fe4e6f756e7344414f4578656375746f723a3a657865637574655472616e736163a26469706673582212207bb9f298e036a0d04d0acbd4e39e53ca2d20583d89a8a55d30fb1200e3c6f21064736f6c63430008140033";

type NounsDAOExecutorHarnessConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NounsDAOExecutorHarnessConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NounsDAOExecutorHarness__factory extends ContractFactory {
  constructor(...args: NounsDAOExecutorHarnessConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    admin_: PromiseOrValue<string>,
    delay_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NounsDAOExecutorHarness> {
    return super.deploy(
      admin_,
      delay_,
      overrides || {}
    ) as Promise<NounsDAOExecutorHarness>;
  }
  override getDeployTransaction(
    admin_: PromiseOrValue<string>,
    delay_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(admin_, delay_, overrides || {});
  }
  override attach(address: string): NounsDAOExecutorHarness {
    return super.attach(address) as NounsDAOExecutorHarness;
  }
  override connect(signer: Signer): NounsDAOExecutorHarness__factory {
    return super.connect(signer) as NounsDAOExecutorHarness__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NounsDAOExecutorHarnessInterface {
    return new utils.Interface(_abi) as NounsDAOExecutorHarnessInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsDAOExecutorHarness {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NounsDAOExecutorHarness;
  }
}