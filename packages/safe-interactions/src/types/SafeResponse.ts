import type { IEvent } from '@circlesland/interfaces-channels/src/IEvent';
import type { MethodToResponse } from './MethodToResponse';
import type { SafeMethod } from './SafeMethod';

export interface SafeResponse extends IEvent {
  _type: 'safe-response';
  id: string;
  version?: string;
  success: boolean;
}

export interface SafeResponseSuccess<T = MethodToResponse[SafeMethod]>
  extends SafeResponse {
  data: T;
  success: true;
}

export interface SafeResponseError extends SafeResponse {
  success: false;
  error: string;
}
