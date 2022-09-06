import type {IFlowRepository} from "@circlesland/interfaces-flow-repository";
import type {ITriggerCommand} from "@circlesland/interfaces-triggers";

export interface IFlowTriggerCommand extends ITriggerCommand {
  repository: IFlowRepository;
  flowId: string;
  context: {[x:string]:any}
}