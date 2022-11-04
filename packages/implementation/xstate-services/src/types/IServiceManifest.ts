import type { InvokeCreator, EventObject } from 'xstate';
export interface IServiceManifest<TContext, TEvent extends EventObject> {
  id: string;
  version: number;
  service: InvokeCreator<TContext, TEvent, any>;
}
