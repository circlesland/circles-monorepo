import type {InvokeConfig, StateNodeConfig} from "xstate";
import type {InvokeSourceDefinition} from "xstate/lib/types";
import type {IFlowVisitor,Invocation} from "@circlesland/interfaces-flow-repository";

/**
 * Walks down the invocation (invoke:{src:"x"},...) tree of a IFlowManifest's flow and collects all FlowDependencies dependencies.
 */
export class InvokeTreeVisitor implements IFlowVisitor {
  constructor() {
  }

  /**
   * Gets the collected dependencies.
   */
  getDependencies() : {
    [flowId: string]: Invocation
  } {
    return this._dependencies;
  }
  private readonly _dependencies: {
    [flowId: string]: Invocation
  } = {};

  visitInvoke(
    flowId: string,
    invokeNode: InvokeConfig<any, any>): void {
    // TODO: Check if we ever use arrays at this point...
    const invokeSourceDefinitions: (string | InvokeSourceDefinition)[] = Array.isArray(invokeNode)
      ? invokeNode.map(o => o.src)
      : [invokeNode.src];

    invokeSourceDefinitions.forEach(o => {
      const invokeId = typeof o === "string"
        ? o
        : o.type;

      if (!this._dependencies[flowId]) {
        this._dependencies[flowId] = {
          flowId: flowId,
          dependencies: {}
        };
      }

      this._dependencies[flowId].dependencies[invokeId] = null;
    });
  }

  visitState(_: string, __: StateNodeConfig<any, any, any, any>): void {
  }
}