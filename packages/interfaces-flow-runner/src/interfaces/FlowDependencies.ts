export type FlowDependencies = {
  flowId: string
  dependencies: {[flowId:string]: undefined};
};