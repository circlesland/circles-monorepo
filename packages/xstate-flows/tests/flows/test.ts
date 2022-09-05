import type {IFlowManifest} from "@circlesland/interfaces-xstate-flows";
import type {IEvent} from "@circlesland/interfaces-channels";
import {assign} from "xstate";
import type {MachineConfig} from "xstate";

export type TestFlowContext = {
  name?: string,
  isAdult: boolean
};

export const test = <IFlowManifest<TestFlowContext, any>> {
  id: "xstate-flows.tests.test_flow",
  version: 1,
  name: "Mock flow",
  nameI18nKey: "xstate-flows.tests.test_flow.description",
  description: "A mockup flow that does nothing useful",
  descriptionI18nKey: "xstate-flows.tests.test_flow.description",
  flow: () => <MachineConfig<TestFlowContext, any, IEvent>>{
    context: {
      isAdult: false
    },
    initial: "nested_nop",
    states: {
      "nested_nop": {
        initial: "nop_1",
        states: {
          "nop_1": {
            invoke: {
              src: "xstate-flows.tests.nop",
              onDone: "nop_2",
              onError: "nop_2"
            }
          },
          "nop_2": {
            invoke: {
              src: "xstate-flows.tests.nop",
              onDone: "#name",
              onError: "#name"
            }
          }
        }
      },
      "name": {
        id: "#name",
        entry: assign({
          name: () => "Static Name"
        }),
        always: "age"
      },
      "age": {
        invoke: {
          src: "xstate-flows.tests.get_random_integer",
          onError: "error",
          onDone: [{
            cond: (context, event) => event.data.randomNumber >= 18,
            action: assign({
              isAdult: () => true
            }),
            target: "summarize"
          }, {
            cond: (context, event) => event.data.randomNumber < 18,
            action: assign({
              isAdult: () => false
            }),
            target: "summarize"
          }]
        }
      },
      "summarize": {
        entry:[
          () => console.log(`Summary`),
          () => console.log(`=====================================`),
          (context) => console.log(`name:    ${context.name}`),
          (context) => console.log(`isAdult: ${context.isAdult}`),
        ],
        always: "success"
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