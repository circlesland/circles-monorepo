import {IEndpoint} from "./IEndpoint";
import {IEvent} from "./IEvent";
import {IUniqueEvent} from "./IUniqueEvent";

/**
 * Supports stateful Request/Response patterns .
 */
export interface IStatefulEndpoint {
  endpoint: IEndpoint;
  request(request:IUniqueEvent, timeoutIn?:number): Promise<IUniqueEvent>;
}