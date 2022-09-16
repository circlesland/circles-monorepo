import type {IFlowVisitor} from "@circlesland/interfaces-flow-runner";
import type {IFlowManifest} from "@circlesland/interfaces-flow-repository";
import type {InvokeConfig, StateNodeConfig} from "xstate";

export class FlowVisitor {
  /**
   * Visits all supported properties of a FlowManifest's flow.
   * @param flowManifest
   * @param visitor
   */
  public static visitFlow(flowManifest: IFlowManifest<any, any>, visitor: IFlowVisitor) {
    const flowInstance = flowManifest.flow();

    const stateBacklog: StateNodeConfig<any, any, any, any>[] = [];
    for (let stateKey in flowInstance.states) {
      stateBacklog.push(flowInstance.states[stateKey]);
    }

    while (stateBacklog.length > 0) {
      const current = stateBacklog.pop();

      visitor.visitState(flowManifest.id, current);

      // TODO: Check if we ever use arrays at this point...
      if (current.invoke && Array.isArray(current.invoke))
      {
        const multiInvoke = <InvokeConfig<any, any>[]>current.invoke;
        multiInvoke.forEach(o => visitor.visitInvoke(flowManifest.id, o));
      }
      else if (current.invoke)
      {
        visitor.visitInvoke(flowManifest.id, <InvokeConfig<any, any>>current.invoke);
      }

      for (let stateKey in current.states) {
        stateBacklog.push(current.states[stateKey]);
      }
    }
  }
}