import type { MachineConfig, EventObject } from 'xstate';

export interface IFlowManifest<TContext, TEvent extends EventObject> {
  /**
   * Allowed character set: [a-z|\-|\.|_]
   */
  id: string;
  /**
   * Numeric version of the flow (integers)
   */
  version: number;
  /**
   * A human-readable english name
   */
  name: string;
  /**
   * The translation key of the flow's name
   */
  description: string;
  /**
   * A human-readable english description
   */
  nameI18nKey?: string;
  /**
   * The translation key of the flow's description
   */
  descriptionI18nKey?: string;
  /**
   * The MachineConfig
   */
  flow: () => MachineConfig<TContext, any, TEvent>
}