import type { IUniqueEvent } from './IUniqueEvent';
import type {IEndpoint} from "./IEndpoint";
import type {IEvent} from "./IEvent";

/**
 * Supports stateful Request/Response patterns .
 */
export interface IStatefulEndpoint {
  endpoint: IEndpoint;
  receiveNext(type:string, timeoutIn?: number) : Promise<IEvent>
  request(requestEvent: IUniqueEvent, timeoutIn?: number): Promise<IUniqueEvent>;
}
