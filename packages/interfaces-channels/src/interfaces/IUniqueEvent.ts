import type { IEvent } from './IEvent';

export interface IUniqueEvent extends IEvent {
  _id: string;
}
