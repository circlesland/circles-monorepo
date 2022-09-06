import {FlowRepository} from "../src";
import {nop} from "./flows/nop";
import {getRandomInteger} from "./flows/getRandomInteger";
import {missingService} from "./flows/missingService";
import {test} from "./flows/test";
import {FlowDependencySearch} from "../src/flowDependencySearch";

describe("FlowDependencySearch", () => {

  const repo = new FlowRepository("dependency_search_test_repo");
  repo.add(nop);
  repo.add(getRandomInteger);
  repo.add(missingService);
  repo.add(test);

  describe('findDependencies', function () {
    it("should throw if a referenced flow doesn't exist", () => {
      expect(() => FlowDependencySearch.findDependencies(repo, "xstate-flows.tests.missing_service_flow"))
        .toThrow();
    });

    it("should return all dependencies of a flow", () => {
      const deps = FlowDependencySearch.findDependencies(repo, "xstate-flows.tests.test_flow");
      expect(deps["xstate-flows.tests.test_flow"]).not.toBeUndefined();
      expect(deps["xstate-flows.tests.test_flow"].dependencies).not.toBeUndefined();
      expect(deps["xstate-flows.tests.test_flow"].dependencies["xstate-flows.tests.get_random_integer"]).not.toBeUndefined();
      expect(deps["xstate-flows.tests.get_random_integer"]).not.toBeUndefined();
      expect(deps["xstate-flows.tests.get_random_integer"].dependencies).not.toBeUndefined();
      expect(deps["xstate-flows.tests.get_random_integer"].dependencies["xstate-flows.tests.nop"]).not.toBeUndefined();
    });

    it("should also return all leafs as node in the FlowDependencyGraph", () => {
      const deps = FlowDependencySearch.findDependencies(repo, "xstate-flows.tests.test_flow");
      expect(deps["xstate-flows.tests.nop"]).not.toBeUndefined();
      expect(deps["xstate-flows.tests.nop"].dependencies).not.toBeUndefined();
      expect(Object.keys(deps["xstate-flows.tests.nop"].dependencies).length).toBe(0);
    });
  });
});