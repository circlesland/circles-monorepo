import type { IEvent } from './IEvent';

export type DestroyEventSinkSubscription = () => void;

export interface IEventSink {
  receive(type: string, handler: (event: IEvent) => void) : DestroyEventSinkSubscription;
}
