import {FlowRepository} from "../src";
import {nop} from "./flows/nop";
import {getRandomInteger} from "./flows/getRandomInteger";
import {FlowRunner} from "../src/flowRunner";
import {IFlowTriggerEnvironment} from "@circlesland/interfaces-flow-runner/src";
import {test} from "./flows/test-flow";

describe("FlowRunner", () => {
  const repo = new FlowRepository("flow_runner_test_repo");
  repo.add(nop);
  repo.add(getRandomInteger);
  repo.add(test);

  it("should be able to start a flow", async () => {
    const runner = new FlowRunner("test_runner");
    const triggerEnv = <IFlowTriggerEnvironment>{
      repository: repo,
      flowId: test.id,
      context: {}
    };
    await runner.execute(triggerEnv);
  });
});