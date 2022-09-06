import type {InvokeConfig, StateNodeConfig} from "xstate";

export interface IFlowVisitor {
  visitState(flowId: string, stateNode: StateNodeConfig<any, any, any, any>):void
  visitInvoke(flowId: string, invokeNode: InvokeConfig<any,any>):void
}