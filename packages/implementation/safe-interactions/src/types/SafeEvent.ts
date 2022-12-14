import type { IUniqueEvent } from '@circlesland/interfaces-channels';
import type { SafeMethod } from './SafeMethod';

export interface SafeEvent<M extends SafeMethod = SafeMethod, P = unknown>
  extends IUniqueEvent {
  type: 'safe-event';
  id: string;
  method: M;
  params: P;
  env: {
    sdkVersion: string;
  };
}
