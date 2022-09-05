import {InvokeTreeVisitor} from "./invokeTreeVisitor";
import type {IFlowManifest, IFlowRepository, FlowInvocationMap} from "@circlesland/interfaces-xstate-flows";
import {FlowVisitor} from "./flowVisitor";

export type FlowDictionary = { [id:string]: IFlowManifest<any, any> };

export class FlowRepository implements IFlowRepository {

  tryGet(flowId:string) : IFlowManifest<any, any>|undefined {
    // TODO: Add id-parser and use a key in a format that supports versions
    return this._flows[flowId];
  }
  private readonly _flows: FlowDictionary = {};

  /**
   * Adds a new manifest to the repository
   * @param flowManifest
   */
  add(flowManifest: IFlowManifest<any, any>) : void {
    // TODO: Add id-parser and use a key in a format that supports versions
    const existingManifest = this._flows[flowManifest.id];
    if (existingManifest) {
      throw new Error(`A flowManifest with id '${flowManifest.id}' already exists in the repository.`);
    }
    this._flows[flowManifest.id] = flowManifest;
  }

  /**
   * Finds the dependency tree of the specified flowId
   * @param flowId
   */
  findDependencies(flowId: string) : FlowInvocationMap {
    // TODO: Add id-parser and use a key in a format that supports versions
    const dependencyScanBacklog: string[] = [flowId];
    const allDependencies: FlowInvocationMap = {};

    while (dependencyScanBacklog.length > 0) {
      const currentDependency = dependencyScanBacklog.pop();
      const currentDependencyManifest = this._flows[currentDependency];
      if (!currentDependencyManifest)
        throw new Error(`Couldn't find flow '${currentDependency}'.`);

      const dependencyCollector = new InvokeTreeVisitor();
      FlowVisitor.visitFlow(currentDependencyManifest, dependencyCollector);
      const flowDependencies = dependencyCollector.getDependencies();

      // Merge the newly discovered dependencies into the result
      Object.entries(flowDependencies).forEach(dep => {
        if (!allDependencies[dep[0]]) {
          allDependencies[dep[0]] = {
            flowId: dep[0],
            dependencies: {}
          }
        }
        const exisingDependency = allDependencies[dep[0]];
        Object.keys(dep[1].dependencies).forEach(newDep => {
          exisingDependency.dependencies[newDep] = null;
        })
      });

      Object.values(flowDependencies)
        .flatMap(o => Object.keys(o.dependencies))
        .forEach(o => dependencyScanBacklog.push(o));
    }
    return allDependencies;
  }
}