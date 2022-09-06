import {FlowRepository} from "../src";
import {nop} from "./flows/nop";
import {getRandomInteger} from "./flows/getRandomInteger";
import {missingService} from "./flows/missingService";
import {test} from "./flows/test";

describe("FlowRepository", () => {

  const repo = new FlowRepository("repository_test_repo");

  it("should have the id that was set in the constructor", () => {
    expect(repo.id).toBe("repository_test_repo");
  });

  describe('add', function () {
    it("should add all test flows", () => {
      repo.add(nop);
      repo.add(getRandomInteger);
      repo.add(missingService);
      repo.add(test);
    });
    it("should throw when a flow with the same id is added again", () => {
      expect(() => repo.add(nop)).toThrow();
    })
  });

  describe('tryGet', function () {
    it("should return existing flows", () => {
      expect(repo.tryGet("xstate-flows.tests.get_random_integer")).not.toBe(undefined);
      expect(repo.tryGet("xstate-flows.tests.nop")).not.toBe(undefined);
      expect(repo.tryGet("xstate-flows.tests.test_flow")).not.toBe(undefined);
      expect(repo.tryGet("xstate-flows.tests.missing_service_flow")).not.toBe(undefined);
    });
    it("should return 'undefined' for unknown flows", () => {
      expect(repo.tryGet("i.dont.exist")).toBe(undefined);
    });
  });
});