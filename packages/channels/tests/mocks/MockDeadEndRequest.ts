import {IUniqueEvent} from "@circlesland/interfaces-channels/src/IUniqueEvent";
import {MockIdCounter} from "./MockRequest";

export class MockDeadEndRequest implements IUniqueEvent {
  _id: string;
  static readonly type: string = "mock_dead_end_request";
  readonly _type: string = MockDeadEndRequest.type;
  constructor() {
    this._id = MockIdCounter.next().toString();
  }
}