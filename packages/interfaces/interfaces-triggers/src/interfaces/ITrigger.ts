import type {ITriggerData} from "./ITriggerData";

export interface ITrigger<TTriggerEnvironment extends ITriggerData> {
  execute(environment: TTriggerEnvironment) : Promise<any> ;
}