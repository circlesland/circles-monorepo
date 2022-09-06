import type {ITriggerEnvironment} from "@circlesland/interfaces-triggers";
import type {IFlowRepository} from "@circlesland/interfaces-flow-repository";

export interface IFlowTriggerEnvironment extends ITriggerEnvironment {
  repository: IFlowRepository;
  flowId: string;
  context: {[x:string]:any}
}