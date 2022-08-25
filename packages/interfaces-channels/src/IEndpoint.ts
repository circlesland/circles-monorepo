import {IEventSource} from "./IEventSource";
import {IEventSink} from "./IEventSink";

export interface IEndpoint {
  source: IEventSource;
  sink: IEventSink;
}