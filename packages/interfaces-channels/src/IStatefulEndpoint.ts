import {IEndpoint} from "./IEndpoint";
import {IUniqueEvent} from "./IUniqueEvent";
import {IRequestEvent} from "./IRequestEvent";

/**
 * Supports stateful Request/Response patterns .
 */
export interface IStatefulEndpoint {
  endpoint: IEndpoint;
  request(request:IRequestEvent, timeoutIn?:number): Promise<IUniqueEvent>;
}