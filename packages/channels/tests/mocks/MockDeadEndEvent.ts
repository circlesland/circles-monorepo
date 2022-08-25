import {IUniqueEvent} from "@circlesland/interfaces-channels/src/IUniqueEvent";
import {MockIdCounter} from "./MockRequest";

export class MockDeadEndEvent implements IUniqueEvent {
  _id: string;
  static readonly type: string = "mock_dead_end";
  readonly _type: string = MockDeadEndEvent.type;

  constructor() {
    this._id = MockIdCounter.next().toString();
  }
}