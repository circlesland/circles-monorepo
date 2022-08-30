import {IRequestEvent} from "@circlesland/interfaces-channels/src/IRequestEvent";
import {IUniqueEvent} from "@circlesland/interfaces-channels/src/IUniqueEvent";

export class MockIdCounter {
  private static counter: number = 0;
  static next() :number {
    return ++this.counter;
  }
}

export class MockRequest implements IRequestEvent {
  _id: string;
  static readonly type: string = "mock_request";
  readonly _type: string = MockRequest.type;
  readonly _responseType: string = MockResponse.type;

  constructor() {
    this._id = MockIdCounter.next().toString();
  }

}

export class MockResponse implements IUniqueEvent {
  _id: string;
  static readonly type: string = "mock_response";
  readonly _type: string = MockResponse.type;

  constructor(id:string) {
    this._id = id;
  }
}