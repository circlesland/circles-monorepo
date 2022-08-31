import type { IEvent } from '@circlesland/interfaces-channels/src/IEvent';
import type { MethodToResponse } from './MethodToResponse';
import type { SafeMethod } from './SafeMethod';

export interface SafeResponse<T = MethodToResponse[SafeMethod]> extends IEvent {
  type: 'safe-response';
  id: string;
  data: T;
  version?: string;
  success: boolean;
  error?: string;
}
