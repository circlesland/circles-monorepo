import {IRequestEvent} from "@circlesland/interfaces-channels/src/IRequestEvent";
import {MockIdCounter} from "./MockRequest";

export class MockDeadEndRequest implements IRequestEvent {
  _id: string;
  static readonly type: string = "mock_dead_end_request";
  readonly _type: string = MockDeadEndRequest.type;
  readonly _responseType = "never";

  constructor() {
    this._id = MockIdCounter.next().toString();
  }

}