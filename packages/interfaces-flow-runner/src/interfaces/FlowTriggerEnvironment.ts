import type {ITriggerData} from "@circlesland/interfaces-triggers";
import type {IFlowRepository} from "@circlesland/interfaces-flow-repository";

export interface IFlowTriggerEnvironment extends ITriggerData {
  repository: IFlowRepository;
  flowId: string;
  context: {[x:string]:any}
}