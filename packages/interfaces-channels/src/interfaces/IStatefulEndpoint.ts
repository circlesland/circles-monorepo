import type { IEndpoint } from './IEndpoint';
import type { IUniqueEvent } from './IUniqueEvent';
import type { IRequestEvent } from './IRequestEvent';

/**
 * Supports stateful Request/Response patterns .
 */
export interface IStatefulEndpoint {
  endpoint: IEndpoint;
  request(request: IRequestEvent, timeoutIn?: number): Promise<IUniqueEvent>;
}
