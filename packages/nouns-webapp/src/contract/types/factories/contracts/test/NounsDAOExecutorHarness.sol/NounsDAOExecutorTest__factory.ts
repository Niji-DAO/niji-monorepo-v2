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
  NounsDAOExecutorTest,
  NounsDAOExecutorTestInterface,
} from "../../../../contracts/test/NounsDAOExecutorHarness.sol/NounsDAOExecutorTest";

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
        internalType: "contract Administered",
        name: "administered",
        type: "address",
      },
    ],
    name: "harnessAcceptAdmin",
    outputs: [],
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
  "0x60803461007c57601f610eef38819003918201601f19168301916001600160401b0383118484101761008157808492604094855283398101031261007c5780516001600160a01b038116919082900361007c5760200151600080546001600160a01b031916909217909155600255604051610e5790816100988239f35b600080fd5b634e487b7160e01b600052604160045260246000fdfe6040608081526004908136101561001d575b5050361561001b57005b005b600091823560e01c9081630825f38f146108ba5781630e18b681146107e557816326782247146107bc5781633a66f9011461060a57839082634dd18bf514610525578263591fcdfe1461041a5782636a42b8f8146103fb57826372b812b4146103af5782637d645fab14610391578263b1b43ae514610373578263c1a287e214610355578263e177246e146101b3578263f2b0653714610182578263f79efaf1146100f857505063f851a4400361001157346100f457816003193601126100f457905490516001600160a01b039091168152602090f35b5080fd5b8382913461017e57602036600319011261017e5780356001600160a01b03811690819003610179576020918351809581936374e38a7960e11b83525af19081156101705750610145575080f35b602090813d8111610169575b61015b8183610c39565b810103126101665780f35b80fd5b503d610151565b513d84823e3d90fd5b505050fd5b5050fd5b8390346101af5760203660031901126101af578160209360ff923581526003855220541690519015158152f35b8280fd5b8390346101af5760203660031901126101af578035913033036102e2576202a30083106102795762278d008311610211575050806002557f948b1f6a42ee138b7e34058ba85a37f716d55ff25ff05a763f15bed6a04c8d2c8280a280f35b60849250602081519262461bcd60e51b845283015260248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2044656c6160448201527f79206d757374206e6f7420657863656564206d6178696d756d2064656c61792e6064820152fd5b906020608492519162461bcd60e51b8352820152603c60248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2044656c6160448201527f79206d75737420657863656564206d696e696d756d2064656c61792e000000006064820152fd5b90602060a492519162461bcd60e51b8352820152604160248201527f4e6f756e7344414f4578656375746f723a3a73657444656c61793a2043616c6c60448201527f206d75737420636f6d652066726f6d204e6f756e7344414f4578656375746f726064820152601760f91b6084820152fd5b5082346100f457816003193601126100f45760209051621275008152f35b5082346100f457816003193601126100f457602090516202a3008152f35b5082346100f457816003193601126100f4576020905162278d008152f35b5034610166576020366003190112610166576103c9610c1e565b8154906001600160a01b039081831633036103f75716906bffffffffffffffffffffffff60a01b1617815580f35b8380fd5b5082346100f457816003193601126100f4576020906002549051908152f35b83346101af5761042936610cc4565b875493966001600160a01b039594919391861633036104bc5750916104b6917f2fffc091a501fd91bfbff27141450d3acb40fb8e6d8382b243ec7a812a3aaf879594938888516104938161048587878760208501978d89610d91565b03601f198101835282610c39565b51902097888b526003602052808b2060ff19815416905551958695169885610dd3565b0390a380f35b608490602088519162461bcd60e51b8352820152603f60248201527f4e6f756e7344414f4578656375746f723a3a63616e63656c5472616e7361637460448201527f696f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e006064820152fd5b8390346101af5760203660031901126101af57610540610c1e565b91303303610590575050600180546001600160a01b0319166001600160a01b039290921691821790557f69d78e38a01985fbb1462961809b4b2d65531bc93b2b94037f3334b82ca4a7568280a280f35b90602060a492519162461bcd60e51b8352820152604860248201527f4e6f756e7344414f4578656375746f723a3a73657450656e64696e6741646d6960448201527f6e3a2043616c6c206d75737420636f6d652066726f6d204e6f756e7344414f456064820152673c32b1baba37b91760c11b6084820152fd5b905082346101665761061b36610cc4565b855493966001600160a01b039594919391861633036107535760025442018042116107405784106106bd57602089808a8a7f76e2796dc3a81d57b0e8504b647febcbeeb5f4af818e164f11eef8131a6a763f8b8b6106b48c8c8c888a5161068e818f878787610485938501978d89610d91565b5190209a888c809a5260038e5220600160ff198254161790558951958695169885610dd3565b0390a351908152f35b60a49060208a519162461bcd60e51b8352820152605160248201527f4e6f756e7344414f4578656375746f723a3a71756575655472616e736163746960448201527f6f6e3a20457374696d6174656420657865637574696f6e20626c6f636b206d7560648201527039ba1039b0ba34b9b33c903232b630bc9760791b6084820152fd5b634e487b7160e01b885260118252602488fd5b60849060208a519162461bcd60e51b8352820152603e60248201527f4e6f756e7344414f4578656375746f723a3a71756575655472616e736163746960448201527f6f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e00006064820152fd5b5050346100f457816003193601126100f45760015490516001600160a01b039091168152602090f35b9050346101af57826003193601126101af57600154916001600160a01b03831633036108525750506bffffffffffffffffffffffff60a01b90338284541617835516600155337f71614071b88dee5e0b2ae578a9dd7b2ebbe9ae832ba419dc0242cd065a290b6c8280a280f35b60849250602081519262461bcd60e51b845283015260248201527f4e6f756e7344414f4578656375746f723a3a61636365707441646d696e3a204360448201527f616c6c206d75737420636f6d652066726f6d2070656e64696e6741646d696e2e6064820152fd5b839150346100f4576108cb36610cc4565b86546001600160a01b039893969395929089163303610bc75785519660209788810190610900816104858787878d8c89610d91565b51902094858a526003895260ff888b20541615610b6257834210610af557621275008401808511610ae2574211610a8b57858a5260038952878a20805460ff1916905581518a908a81610a4757505080845b8b815191018a895af13d15610a3e573d61096b81610c71565b906109788b519283610c39565b8152809b8b3d92013e5b156109d957506109d5979899927fa560e3198060a2f10670c1ec5b403077ea6ae93ca8de1c32b451dc1a943cd6e794926109c3928951958695169885610dd3565b0390a351928284938452830190610d6c565b0390f35b875162461bcd60e51b815290810189905260456024820152600080516020610e0283398151915260448201527f74696f6e3a205472616e73616374696f6e20657865637574696f6e2072657665606482015264393a32b21760d91b608482015260a490fd5b60609a50610982565b610a866024849363ffffffff60e01b9084890120168d5193849181830152610a778a518092858501908d01610d49565b81010386810184520182610c39565b610952565b875162461bcd60e51b8152908101899052603b6024820152600080516020610e0283398151915260448201527f74696f6e3a205472616e73616374696f6e206973207374616c652e00000000006064820152608490fd5b634e487b7160e01b8b526011825260248bfd5b875162461bcd60e51b8152908101899052604d6024820152600080516020610e0283398151915260448201527f74696f6e3a205472616e73616374696f6e206861736e2774207375727061737360648201526c32b2103a34b6b2903637b1b59760991b608482015260a490fd5b875162461bcd60e51b815290810189905260456024820152600080516020610e0283398151915260448201527f74696f6e3a205472616e73616374696f6e206861736e2774206265656e20717560648201526432bab2b21760d91b608482015260a490fd5b855162461bcd60e51b815260208186015260248101879052600080516020610e0283398151915260448201527f74696f6e3a2043616c6c206d75737420636f6d652066726f6d2061646d696e2e6064820152608490fd5b600435906001600160a01b0382168203610c3457565b600080fd5b90601f8019910116810190811067ffffffffffffffff821117610c5b57604052565b634e487b7160e01b600052604160045260246000fd5b67ffffffffffffffff8111610c5b57601f01601f191660200190565b929192610c9982610c71565b91610ca76040519384610c39565b829481845281830111610c34578281602093846000960137010152565b9060a0600319830112610c34576004356001600160a01b0381168103610c3457916024359167ffffffffffffffff604435818111610c345783602382011215610c345783816024610d1a93600401359101610c8d565b92606435918211610c345780602383011215610c3457816024610d4293600401359101610c8d565b9060843590565b60005b838110610d5c5750506000910152565b8181015183820152602001610d4c565b90602091610d8581518092818552858086019101610d49565b601f01601f1916010190565b95949390608093610dce93610dc09260018060a01b03168952602089015260a0604089015260a0880190610d6c565b908682036060880152610d6c565b930152565b949392610df3606093610dce938852608060208901526080880190610d6c565b908682036040880152610d6c56fe4e6f756e7344414f4578656375746f723a3a657865637574655472616e736163a2646970667358221220c2408bfa705e571087c7c9ccb4aff53c7b9ec6ab983a0d4a5855527f089f403064736f6c63430008140033";

type NounsDAOExecutorTestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NounsDAOExecutorTestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NounsDAOExecutorTest__factory extends ContractFactory {
  constructor(...args: NounsDAOExecutorTestConstructorParams) {
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
  ): Promise<NounsDAOExecutorTest> {
    return super.deploy(
      admin_,
      delay_,
      overrides || {}
    ) as Promise<NounsDAOExecutorTest>;
  }
  override getDeployTransaction(
    admin_: PromiseOrValue<string>,
    delay_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(admin_, delay_, overrides || {});
  }
  override attach(address: string): NounsDAOExecutorTest {
    return super.attach(address) as NounsDAOExecutorTest;
  }
  override connect(signer: Signer): NounsDAOExecutorTest__factory {
    return super.connect(signer) as NounsDAOExecutorTest__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NounsDAOExecutorTestInterface {
    return new utils.Interface(_abi) as NounsDAOExecutorTestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NounsDAOExecutorTest {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as NounsDAOExecutorTest;
  }
}
