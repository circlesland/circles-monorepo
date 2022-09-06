import type {ITriggerEnvironment} from "./ITriggerEnvironment";

export interface ITrigger<TTriggerEnvironment extends ITriggerEnvironment> {
  execute(environment: TTriggerEnvironment) : Promise<any> ;
}