import {IUniqueEvent} from "@circlesland/interfaces-channels/src/IUniqueEvent";

export class MockIdCounter {
  private static counter: number = 0;
  static next() :number {
    return this.counter++;
  }
}

export class MockRequest implements IUniqueEvent {
  _id: string;
  static readonly type: string = "mock_request";
  readonly _type: string = MockRequest.type;

  constructor() {
    this._id = MockIdCounter.next().toString();
  }
}