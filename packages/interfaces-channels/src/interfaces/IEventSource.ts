import type { IEvent } from './IEvent';

export interface IEventSource {
  emit(event: IEvent): void;
}
