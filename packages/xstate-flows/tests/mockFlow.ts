import type {IFlowManifest} from "@circlesland/interfaces-xstate-flows";

export type MockFlowContext = {
  name?: string,
  age?: number
};

export const MockFlow = <IFlowManifest<MockFlowContext, any>> {
  id: "xstate-flows.tests.mockFlow",
  version: 1,
  name: "Mock flow",
  nameI18nKey: "xstate-flows.tests.mockFlow.description",
  description: "A mockup flow that does nothing useful",
  descriptionI18nKey: "xstate-flows.tests.mockFlow.description",
  flow: {
    context: {
    },
    states: {
      "name": {
        always: "age"
      },
      "age": {
        always: "success"
      },
      "success": {
        type: "final"
      }
    }
  }
};