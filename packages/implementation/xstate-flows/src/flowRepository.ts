import type {IFlowManifest, IFlowRepository} from "@circlesland/interfaces-flow-repository";

export type FlowDictionary = { [id:string]: IFlowManifest<any, any> };

export class FlowRepository implements IFlowRepository {
  readonly id: string;

  constructor(id:string) {
    this.id = id;
  }

  tryGet(flowId:string) : IFlowManifest<any, any>|undefined {
    // TODO: Add id-parser and use a key in a format that supports versions
    return this._flows[flowId];
  }
  private readonly _flows: FlowDictionary = {};

  /**
   * Adds a new manifest to the repository
   * @param flowManifest
   */
  add(flowManifest: IFlowManifest<any, any>) : void {
    // TODO: Add id-parser and use a key in a format that supports versions
    const existingManifest = this._flows[flowManifest.id];
    if (existingManifest) {
      throw new Error(`A flowManifest with id '${flowManifest.id}' already exists in the repository.`);
    }
    this._flows[flowManifest.id] = flowManifest;
  }
}