import type {IFlowManifest} from "./IFlowManifest";

export interface IFlowRepository {
  /**
   * Allowed character set: [a-z|\-|\.|_]
   */
  id: string;
  add(flowManifest: IFlowManifest<any, any>) : void;
  tryGet(flowId: string) : IFlowManifest<any, any>|undefined;
}