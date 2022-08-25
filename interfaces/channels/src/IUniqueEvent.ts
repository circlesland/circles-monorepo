import {IEvent} from "./IEvent";

export interface IUniqueEvent extends IEvent{
  _id: string;
}