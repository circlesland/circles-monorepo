import type {IFlowManifest} from "@circlesland/interfaces-flow-repository";
import type {IEvent} from "@circlesland/interfaces-channels";
import {assign} from "xstate";
import type {MachineConfig} from "xstate";

export type MissingServiceFlowContext = {
  isAdult: boolean
};

export const missingService = <IFlowManifest<MissingServiceFlowContext, any>> {
  id: "xstate-flows.tests.missing_service_flow",
  version: 1,
  name: "Missing service flow",
  nameI18nKey: "xstate-flows.tests.missing_service_flow.description",
  description: "A mockup only to have an invalid service reference.",
  descriptionI18nKey: "xstate-flows.tests.missing_service_flow.description",
  flow: () => <MachineConfig<MissingServiceFlowContext, any, IEvent>>{
    context: {
      isAdult: false
    },
    initial: "age",
    states: {
      "age": {
        invoke: {
          src: "xstate-flows.lib.get_random_integer____doesnt_exist",
          onError: "error",
          onDone: [{
            cond: (context, event) => event.data.randomNumber >= 18,
            action: assign({
              isAdult: () => true
            }),
            target: "success"
          }, {
            cond: (context, event) => event.data.randomNumber < 18,
            action: assign({
              isAdult: () => false
            }),
            target: "success"
          }]
        }
      },
      "error": {
        type: "final",
        data: (_, event) =>  event.data
      },
      "success": {
        type: "final",
        data: (context) => context
      }
    }
  }
};