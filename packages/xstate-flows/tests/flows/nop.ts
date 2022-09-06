import type {IFlowManifest} from "@circlesland/interfaces-flow-repository";
import type {IEvent} from "@circlesland/interfaces-channels";
import type {MachineConfig} from "xstate";

export type NopFlowContext = {};

export const nop = <IFlowManifest<NopFlowContext, any>> {
  id: "xstate-flows.tests.nop",
  version: 1,
  name: "Do nothing",
  nameI18nKey: "xstate-flows.tests.nop.description",
  description: "Does nothing.tests.nop.description",
  flow: () => <MachineConfig<NopFlowContext, any, IEvent>>{
    context: {},
    initial: "return",
    states: {
      "return": {
        entry: () => console.log(`... Nop nop nop ...`),
        type: "final",
        data: (context) => context
      }
    }
  }
};