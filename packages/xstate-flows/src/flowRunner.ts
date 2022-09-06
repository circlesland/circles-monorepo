import type {IFlowTriggerEnvironment} from "@circlesland/interfaces-flow-runner";
import type {ITrigger} from "@circlesland/interfaces-triggers";
import type {IFlowRepository} from "@circlesland/interfaces-flow-repository";
import {FlowDependencySearch} from "./flowDependencySearch";
import { createMachine, StateMachine, interpret} from 'xstate';

export class FlowRunner implements ITrigger<IFlowTriggerEnvironment> {
  readonly id:string;

  constructor(id:string) {
    this.id = id;
  }

  execute(environment: IFlowTriggerEnvironment) : Promise<any> {
    const repo: IFlowRepository = environment.repository;
    const flowId: string = environment.flowId;
    const dependencyGraph = FlowDependencySearch.findDependencies(repo, flowId);
    const entryManifest = repo.tryGet(flowId);
    const entryFlow = entryManifest.flow();
    const servicesMap: {[flowId:string]: StateMachine<any, any, any, {value: any, context: any}>} = {};

    for (let dependencyGraphKey in dependencyGraph) {
      const dependencyFlow = repo.tryGet(dependencyGraphKey);
      servicesMap[dependencyGraphKey] = createMachine({
        predictableActionArguments: true,
        ...dependencyFlow.flow()
      }, {
        services: servicesMap
      });
    }

    const machine = createMachine({
      predictableActionArguments: true,
      ...entryFlow
    }, {
      services: servicesMap
    });

    return new Promise((resolve, reject) => {
      // TODO: Handle the error case
      interpret(machine)
        .onTransition((state, event) => {
          console.info(`Got event: `, event);
          console.info("New state: ", state);
          if (state.done) {
            resolve("done");
            console.log("flow finished")
            return;
          }
        })
        .start();
    });
  }
}