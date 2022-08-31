import type { MachineConfig, EventObject } from 'xstate';

export interface IFlowManifest<TContext, TEvent extends EventObject> {
  id: string;
  version: number;
  name: string;
  description: string;
  nameI18nKey?: string;
  descriptionI18nKey?: string;
  flow: MachineConfig<TContext, any, TEvent>
}