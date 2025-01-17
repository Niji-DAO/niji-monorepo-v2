// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class AuctionBid extends ethereum.Event {
  get params(): AuctionBid__Params {
    return new AuctionBid__Params(this);
  }
}

export class AuctionBid__Params {
  _event: AuctionBid;

  constructor(event: AuctionBid) {
    this._event = event;
  }

  get nounId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get extended(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class AuctionCreated extends ethereum.Event {
  get params(): AuctionCreated__Params {
    return new AuctionCreated__Params(this);
  }
}

export class AuctionCreated__Params {
  _event: AuctionCreated;

  constructor(event: AuctionCreated) {
    this._event = event;
  }

  get nounId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get startTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AuctionExtended extends ethereum.Event {
  get params(): AuctionExtended__Params {
    return new AuctionExtended__Params(this);
  }
}

export class AuctionExtended__Params {
  _event: AuctionExtended;

  constructor(event: AuctionExtended) {
    this._event = event;
  }

  get nounId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class AuctionMinBidIncrementPercentageUpdated extends ethereum.Event {
  get params(): AuctionMinBidIncrementPercentageUpdated__Params {
    return new AuctionMinBidIncrementPercentageUpdated__Params(this);
  }
}

export class AuctionMinBidIncrementPercentageUpdated__Params {
  _event: AuctionMinBidIncrementPercentageUpdated;

  constructor(event: AuctionMinBidIncrementPercentageUpdated) {
    this._event = event;
  }

  get minBidIncrementPercentage(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class AuctionReservePriceUpdated extends ethereum.Event {
  get params(): AuctionReservePriceUpdated__Params {
    return new AuctionReservePriceUpdated__Params(this);
  }
}

export class AuctionReservePriceUpdated__Params {
  _event: AuctionReservePriceUpdated;

  constructor(event: AuctionReservePriceUpdated) {
    this._event = event;
  }

  get reservePrice(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class AuctionSettled extends ethereum.Event {
  get params(): AuctionSettled__Params {
    return new AuctionSettled__Params(this);
  }
}

export class AuctionSettled__Params {
  _event: AuctionSettled;

  constructor(event: AuctionSettled) {
    this._event = event;
  }

  get nounId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AuctionTimeBufferUpdated extends ethereum.Event {
  get params(): AuctionTimeBufferUpdated__Params {
    return new AuctionTimeBufferUpdated__Params(this);
  }
}

export class AuctionTimeBufferUpdated__Params {
  _event: AuctionTimeBufferUpdated;

  constructor(event: AuctionTimeBufferUpdated) {
    this._event = event;
  }

  get timeBuffer(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class NounsAuctionHouse__auctionResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: Address;
  value5: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: Address,
    value5: boolean,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    return map;
  }

  getNounId(): BigInt {
    return this.value0;
  }

  getAmount(): BigInt {
    return this.value1;
  }

  getStartTime(): BigInt {
    return this.value2;
  }

  getEndTime(): BigInt {
    return this.value3;
  }

  getBidder(): Address {
    return this.value4;
  }

  getSettled(): boolean {
    return this.value5;
  }
}

export class NounsAuctionHouse extends ethereum.SmartContract {
  static bind(address: Address): NounsAuctionHouse {
    return new NounsAuctionHouse("NounsAuctionHouse", address);
  }

  auction(): NounsAuctionHouse__auctionResult {
    let result = super.call(
      "auction",
      "auction():(uint256,uint256,uint256,uint256,address,bool)",
      [],
    );

    return new NounsAuctionHouse__auctionResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toAddress(),
      result[5].toBoolean(),
    );
  }

  try_auction(): ethereum.CallResult<NounsAuctionHouse__auctionResult> {
    let result = super.tryCall(
      "auction",
      "auction():(uint256,uint256,uint256,uint256,address,bool)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new NounsAuctionHouse__auctionResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toAddress(),
        value[5].toBoolean(),
      ),
    );
  }

  duration(): BigInt {
    let result = super.call("duration", "duration():(uint256)", []);

    return result[0].toBigInt();
  }

  try_duration(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("duration", "duration():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  minBidIncrementPercentage(): i32 {
    let result = super.call(
      "minBidIncrementPercentage",
      "minBidIncrementPercentage():(uint8)",
      [],
    );

    return result[0].toI32();
  }

  try_minBidIncrementPercentage(): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "minBidIncrementPercentage",
      "minBidIncrementPercentage():(uint8)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  nouns(): Address {
    let result = super.call("nouns", "nouns():(address)", []);

    return result[0].toAddress();
  }

  try_nouns(): ethereum.CallResult<Address> {
    let result = super.tryCall("nouns", "nouns():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  reservePrice(): BigInt {
    let result = super.call("reservePrice", "reservePrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_reservePrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("reservePrice", "reservePrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  timeBuffer(): BigInt {
    let result = super.call("timeBuffer", "timeBuffer():(uint256)", []);

    return result[0].toBigInt();
  }

  try_timeBuffer(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("timeBuffer", "timeBuffer():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  weth(): Address {
    let result = super.call("weth", "weth():(address)", []);

    return result[0].toAddress();
  }

  try_weth(): ethereum.CallResult<Address> {
    let result = super.tryCall("weth", "weth():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateBidCall extends ethereum.Call {
  get inputs(): CreateBidCall__Inputs {
    return new CreateBidCall__Inputs(this);
  }

  get outputs(): CreateBidCall__Outputs {
    return new CreateBidCall__Outputs(this);
  }
}

export class CreateBidCall__Inputs {
  _call: CreateBidCall;

  constructor(call: CreateBidCall) {
    this._call = call;
  }

  get nounId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CreateBidCall__Outputs {
  _call: CreateBidCall;

  constructor(call: CreateBidCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _nouns(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _weth(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _timeBuffer(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _reservePrice(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _minBidIncrementPercentage(): i32 {
    return this._call.inputValues[4].value.toI32();
  }

  get _duration(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetMinBidIncrementPercentageCall extends ethereum.Call {
  get inputs(): SetMinBidIncrementPercentageCall__Inputs {
    return new SetMinBidIncrementPercentageCall__Inputs(this);
  }

  get outputs(): SetMinBidIncrementPercentageCall__Outputs {
    return new SetMinBidIncrementPercentageCall__Outputs(this);
  }
}

export class SetMinBidIncrementPercentageCall__Inputs {
  _call: SetMinBidIncrementPercentageCall;

  constructor(call: SetMinBidIncrementPercentageCall) {
    this._call = call;
  }

  get _minBidIncrementPercentage(): i32 {
    return this._call.inputValues[0].value.toI32();
  }
}

export class SetMinBidIncrementPercentageCall__Outputs {
  _call: SetMinBidIncrementPercentageCall;

  constructor(call: SetMinBidIncrementPercentageCall) {
    this._call = call;
  }
}

export class SetReservePriceCall extends ethereum.Call {
  get inputs(): SetReservePriceCall__Inputs {
    return new SetReservePriceCall__Inputs(this);
  }

  get outputs(): SetReservePriceCall__Outputs {
    return new SetReservePriceCall__Outputs(this);
  }
}

export class SetReservePriceCall__Inputs {
  _call: SetReservePriceCall;

  constructor(call: SetReservePriceCall) {
    this._call = call;
  }

  get _reservePrice(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetReservePriceCall__Outputs {
  _call: SetReservePriceCall;

  constructor(call: SetReservePriceCall) {
    this._call = call;
  }
}

export class SetTimeBufferCall extends ethereum.Call {
  get inputs(): SetTimeBufferCall__Inputs {
    return new SetTimeBufferCall__Inputs(this);
  }

  get outputs(): SetTimeBufferCall__Outputs {
    return new SetTimeBufferCall__Outputs(this);
  }
}

export class SetTimeBufferCall__Inputs {
  _call: SetTimeBufferCall;

  constructor(call: SetTimeBufferCall) {
    this._call = call;
  }

  get _timeBuffer(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetTimeBufferCall__Outputs {
  _call: SetTimeBufferCall;

  constructor(call: SetTimeBufferCall) {
    this._call = call;
  }
}

export class SettleAuctionCall extends ethereum.Call {
  get inputs(): SettleAuctionCall__Inputs {
    return new SettleAuctionCall__Inputs(this);
  }

  get outputs(): SettleAuctionCall__Outputs {
    return new SettleAuctionCall__Outputs(this);
  }
}

export class SettleAuctionCall__Inputs {
  _call: SettleAuctionCall;

  constructor(call: SettleAuctionCall) {
    this._call = call;
  }
}

export class SettleAuctionCall__Outputs {
  _call: SettleAuctionCall;

  constructor(call: SettleAuctionCall) {
    this._call = call;
  }
}

export class SettleCurrentAndCreateNewAuctionCall extends ethereum.Call {
  get inputs(): SettleCurrentAndCreateNewAuctionCall__Inputs {
    return new SettleCurrentAndCreateNewAuctionCall__Inputs(this);
  }

  get outputs(): SettleCurrentAndCreateNewAuctionCall__Outputs {
    return new SettleCurrentAndCreateNewAuctionCall__Outputs(this);
  }
}

export class SettleCurrentAndCreateNewAuctionCall__Inputs {
  _call: SettleCurrentAndCreateNewAuctionCall;

  constructor(call: SettleCurrentAndCreateNewAuctionCall) {
    this._call = call;
  }
}

export class SettleCurrentAndCreateNewAuctionCall__Outputs {
  _call: SettleCurrentAndCreateNewAuctionCall;

  constructor(call: SettleCurrentAndCreateNewAuctionCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}
