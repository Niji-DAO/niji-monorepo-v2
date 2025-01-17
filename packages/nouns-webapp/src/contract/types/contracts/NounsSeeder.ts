/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace INounsSeeder {
  export type SeedStruct = {
    background: PromiseOrValue<BigNumberish>;
    backDecoration: PromiseOrValue<BigNumberish>;
    backgroundDecoration: PromiseOrValue<BigNumberish>;
    special: PromiseOrValue<BigNumberish>;
    leftHand: PromiseOrValue<BigNumberish>;
    back: PromiseOrValue<BigNumberish>;
    clothe: PromiseOrValue<BigNumberish>;
    choker: PromiseOrValue<BigNumberish>;
    ear: PromiseOrValue<BigNumberish>;
    hair: PromiseOrValue<BigNumberish>;
    hat: PromiseOrValue<BigNumberish>;
    headphone: PromiseOrValue<BigNumberish>;
  };

  export type SeedStructOutput = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ] & {
    background: number;
    backDecoration: number;
    backgroundDecoration: number;
    special: number;
    leftHand: number;
    back: number;
    clothe: number;
    choker: number;
    ear: number;
    hair: number;
    hat: number;
    headphone: number;
  };
}

export interface NounsSeederInterface extends utils.Interface {
  functions: {
    "generateSeed(uint256,address)": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "generateSeed"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "generateSeed",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "generateSeed",
    data: BytesLike
  ): Result;

  events: {};
}

export interface NounsSeeder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NounsSeederInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    generateSeed(
      nounId: PromiseOrValue<BigNumberish>,
      descriptor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[INounsSeeder.SeedStructOutput]>;
  };

  generateSeed(
    nounId: PromiseOrValue<BigNumberish>,
    descriptor: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<INounsSeeder.SeedStructOutput>;

  callStatic: {
    generateSeed(
      nounId: PromiseOrValue<BigNumberish>,
      descriptor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<INounsSeeder.SeedStructOutput>;
  };

  filters: {};

  estimateGas: {
    generateSeed(
      nounId: PromiseOrValue<BigNumberish>,
      descriptor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    generateSeed(
      nounId: PromiseOrValue<BigNumberish>,
      descriptor: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
