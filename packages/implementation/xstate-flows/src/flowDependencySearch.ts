import { FlowVisitor } from './flowVisitor';
import { InvokeTreeVisitor } from './invokeTreeVisitor';

import type {
  FlowDependencyGraph,
  FlowDependencies,
} from '@circlesland/interfaces-flow-runner';
import type { IFlowRepository } from '@circlesland/interfaces-flow-repository';

export class FlowDependencySearch {
  /**
   * Finds the dependency tree of the specified flowId in the given repository
   * @param flowRepository
   * @param flowId
   */
  static findDependencies(
    flowRepository: IFlowRepository,
    flowId: string
  ): FlowDependencyGraph {
    // TODO: Add id-parser and use a key in a format that supports versions
    const dependencyScanBacklog: string[] = [flowId];
    const allDependencies: FlowDependencyGraph = {};

    const upsertDependencies = (flow: FlowDependencies) => {
      if (!allDependencies[flow.flowId]) {
        allDependencies[flow.flowId] = {
          flowId: flow.flowId,
          dependencies: flow.dependencies,
        };
      }
      const exisingDependency = allDependencies[flow.flowId];
      Object.keys(flow.dependencies).forEach((newDep) => {
        exisingDependency.dependencies[newDep] = null;
      });
    };

    while (dependencyScanBacklog.length > 0) {
      const currentDependency = dependencyScanBacklog.pop();
      const currentDependencyManifest =
        flowRepository.tryGet(currentDependency);
      if (!currentDependencyManifest)
        throw new Error(`Couldn't find flow '${currentDependency}'.`);

      upsertDependencies({ flowId: currentDependency, dependencies: {} });

      const dependencyCollector = new InvokeTreeVisitor();
      FlowVisitor.visitFlow(currentDependencyManifest, dependencyCollector);
      const flowDependencies = dependencyCollector.getDependencies();

      // Merge the newly discovered dependencies into the result
      Object.values(flowDependencies).forEach((dep) => {
        upsertDependencies(dep);
      });

      Object.values(flowDependencies)
        .flatMap((o) => Object.keys(o.dependencies))
        .filter((e) => !!e && e !== 'undefined') // TODO: Remove this
        .forEach((o) => dependencyScanBacklog.push(o));
    }

    return allDependencies;
  }
}
