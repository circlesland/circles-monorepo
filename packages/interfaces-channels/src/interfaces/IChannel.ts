import type { IEventSource } from './IEventSource';
import type { IEventSink } from './IEventSink';

export interface IChannel {
  source: IEventSource;
  sink: IEventSink;
}
