import type {IFlowManifest} from "./IFlowManifest";
import type {FlowInvocationMap} from "./FlowInvocationMap";

export interface IFlowRepository {
  add(flowManifest: IFlowManifest<any, any>) : void;
  tryGet(flowId: string) : IFlowManifest<any, any>|undefined;
  findDependencies(flowId: string) : FlowInvocationMap;
}