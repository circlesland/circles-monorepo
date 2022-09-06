import type {ITriggerCommand} from "./ITriggerCommand";

export interface ITrigger<TTriggerEnvironment extends ITriggerCommand> {
  execute(environment: TTriggerEnvironment) : Promise<void>;
}