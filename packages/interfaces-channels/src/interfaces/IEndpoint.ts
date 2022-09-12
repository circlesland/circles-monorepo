import {DestroyEventSinkSubscription, IEvent} from "@circlesland/interfaces-channels";

export interface IEndpoint {
  send(event: IEvent):void;
  receive(type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription;
}
