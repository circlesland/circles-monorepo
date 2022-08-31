import type { IEventSource } from './IEventSource';
import type { IEventSink } from './IEventSink';

export interface IEndpoint {
  source: IEventSource;
  sink: IEventSink;
}
