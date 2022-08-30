import {IStatefulEndpoint} from "@circlesland/interfaces-channels/src/IStatefulEndpoint";
import {IEndpoint} from "@circlesland/interfaces-channels/src/IEndpoint";
import {IUniqueEvent} from "@circlesland/interfaces-channels/src/IUniqueEvent";
import {MockEndpoint} from "./MockEndpoint";
import {StatefulEndpoint} from "../../src/StatefulEndpoint";
import {MockRequest, MockResponse} from "./MockRequest";

export class MockStatefulEndpoint implements IStatefulEndpoint {
  readonly endpoint: IEndpoint;
  private readonly wrappedStatefulEndpoint: StatefulEndpoint;

  constructor() {
    this.endpoint = MockEndpoint.instance;

    // Register a loopback sink only for MockRequests
    this.endpoint.sink.receive(MockRequest.type, (event: IUniqueEvent) => {
      this.endpoint.source.emit(new MockResponse(event._id));
    });

    this.wrappedStatefulEndpoint = new StatefulEndpoint(this.endpoint, 1000);
  }

  request(request: IUniqueEvent, timeoutIn?: number): Promise<IUniqueEvent> {
    return this.wrappedStatefulEndpoint.request(request, timeoutIn);
  }
}