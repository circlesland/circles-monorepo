import {IEventSource} from "@circlesland/interfaces-channels/src/IEventSource";
import {IEventSink} from "@circlesland/interfaces-channels/src/IEventSink";
import {IEvent} from "@circlesland/interfaces-channels/src/IEvent";
import {IEndpoint} from "@circlesland/interfaces-channels/src/IEndpoint";

export class MockEndpoint implements IEndpoint {
  static get instance(): MockEndpoint {
    if (!this._instance) {
      this._instance = new MockEndpoint();
    }
    return this._instance;
  }

  private static _instance?: MockEndpoint;

  private static readonly receivers: { [type: string]: (event: IEvent) => void } = {};

  private constructor() {
  }

  sink: IEventSink = {
    receive(type: string, handler: (event: IEvent) => void) {
      MockEndpoint.receivers[type] = handler;
    }
  }

  source: IEventSource = {
    emit(event: IEvent) {
      const receiver = MockEndpoint.receivers[event._type];
      if (receiver) {
        receiver(event);
      }

      const catchAllReceiver = MockEndpoint.receivers["*"];
      if (catchAllReceiver) {
        catchAllReceiver(event)
      }
    }
  };
}