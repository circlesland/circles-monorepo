import { IEvent } from "./IEvent";
import { DestroyEventSinkSubscription } from "./IEventSink";


export interface IEndpoint {
  send(event: IEvent):void;
  receive(type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription;
}
