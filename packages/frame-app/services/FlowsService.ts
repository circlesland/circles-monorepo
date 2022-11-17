import { IFlowTriggerEnvironment } from '@circlesland/interfaces-flow-runner/src';
import { FlowRepository, FlowRunner } from '@circlesland/xstate-flows';

import { fetchCeramicProfile } from '../flows/fetch-profile';

export default class FlowService {
  readonly repository: FlowRepository;
  readonly flowRunner: FlowRunner;
  constructor() {
    this.repository = new FlowRepository('frame_repository');

    this.repository.add(fetchCeramicProfile);

    this.flowRunner = new FlowRunner('frame_runner');
  }

  execute(triggerEnvironment: Partial<IFlowTriggerEnvironment>): Promise<any> {
    return this.flowRunner.execute({
      repository: this.repository,
      ...triggerEnvironment,
    });
  }
}
