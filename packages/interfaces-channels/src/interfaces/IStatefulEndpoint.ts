import type { IEndpoint } from './IEndpoint';
import type { IUniqueEvent } from './IUniqueEvent';

/**
 * Supports stateful Request/Response patterns .
 */
export interface IStatefulEndpoint {
  endpoint: IEndpoint;
  request(requestEvent: IUniqueEvent, timeoutIn?: number): Promise<IUniqueEvent>;
}
