import type {IFlowManifest} from "@circlesland/interfaces-xstate-flows";
import type {IEvent} from "@circlesland/interfaces-channels";
import {assign} from "xstate";
import type {MachineConfig} from "xstate";

export type GetRandomIntegerContext = {
  randomNumber: number
};

export const getRandomInteger = <IFlowManifest<GetRandomIntegerContext, any>> {
  id: "xstate-flows.tests.get_random_integer",
  version: 1,
  name: "Get random integer",
  nameI18nKey: "xstate-flows.tests.get_random_integer.description",
  description: "Returns a random integer",
  descriptionI18nKey: "xstate-flows.tests.get_random_integer.description",
  flow: () => <MachineConfig<GetRandomIntegerContext, any, IEvent>>{
    context: {
      randomNumber: 0
    },
    initial: "nop_1",
    states: {
      "nop_1": {
        invoke: [{
          src: "xstate-flows.tests.nop",
          onDone: "generate",
          onError: "generate"
        },{
          src: "xstate-flows.tests.nop",
          onDone: "generate",
          onError: "generate"
        }]
      },
      "generate": {
        entry: assign({
          randomNumber: () => Math.floor(Math.random())
        })
      },
      "return": {
        type: "final",
        data: (context) => context
      }
    }
  }
};