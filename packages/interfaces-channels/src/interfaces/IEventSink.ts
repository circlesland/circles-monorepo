import type { IEvent } from './IEvent';

export interface IEventSink {
  receive(type: string, handler: (event: IEvent) => void);
}
