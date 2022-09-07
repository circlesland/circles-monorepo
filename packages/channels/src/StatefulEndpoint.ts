import type { IStatefulEndpoint } from '@circlesland/interfaces-channels';
import type { IUniqueEvent } from '@circlesland/interfaces-channels';
import type { IEndpoint } from '@circlesland/interfaces-channels';
import type { IRequest } from '@circlesland/interfaces-channels';

/**
 * A special endpoint that's used for request/response scenarios.
 */
export class StatefulEndpoint implements IStatefulEndpoint {
  readonly endpoint: IEndpoint;
  readonly requests: { [uniqueEventId: string]: IRequest } = {};
  readonly defaultTimeout: number;

  private processTimeoutsIntervalHandle?: any;

  /**
   * Creates a new instance on top of an existing IEndpoint
   * @param endpoint
   * @param defaultTimeout
   */
  constructor(endpoint: IEndpoint, defaultTimeout: number) {
    this.endpoint = endpoint;
    this.defaultTimeout = defaultTimeout;
  }

  /**
   * Request a response for the given event or time-out.
   * @param requestEvent
   * @param timeoutIn
   */
  request(
    requestEvent: IUniqueEvent,
    timeoutIn?: number
  ): Promise<IUniqueEvent> {
    if (this.requests[requestEvent.id]) {
      throw new Error(`Request with id '${requestEvent.id}' is a duplicate.`);
    }

    // Calculate the point in time when the request will time out
    const now = new Date().getTime();
    const timeout = new Date(now + (timeoutIn ?? this.defaultTimeout));

    // Set up the promise that represents the response (either the response event or a timeout)
    let resolveHandler: (response: IUniqueEvent) => void;
    let rejectHandler: (error: Error) => void;

    const responseOrTimeoutPromise = new Promise<IUniqueEvent>(
      (resolve, reject) => {
        resolveHandler = resolve;
        rejectHandler = reject;
      }
    );

    // Remember the request
    this.requests[requestEvent.id] = {
      error: rejectHandler,
      response: resolveHandler,
      request: requestEvent,
      timeout: timeout,
    };

    // If there aren't already any timeout handlers, set one up
    if (!this.processTimeoutsIntervalHandle) {
      this.setupTimeoutHandler();
    }

    // Register the result handler that resolves the promise on response
    this.endpoint.sink.receive('*', (responseEvent: IUniqueEvent) => {
      if (responseEvent == requestEvent) {
        // Ignore reflection
        return;
      }
      if (!this.requests[responseEvent.id]) {
        return;
      }
      this.requests[responseEvent.id].response(responseEvent);
      delete this.requests[responseEvent.id];
    });

    // Send the request
    this.endpoint.source.emit(requestEvent);

    // Return the result promise that either resolves with the event or times-out
    return responseOrTimeoutPromise;
  }

  // As long as there are pending requests check for timeouts ever 100 ms
  private setupTimeoutHandler() {
    this.processTimeoutsIntervalHandle = setInterval(() => {
      const pendingRequestIds = Object.keys(this.requests);

      if (pendingRequestIds.length == 0) {
        this.removeTimeoutHandler();
        return;
      }

      const now = new Date().getTime();
      const timeoutError = new Error(
        `The request timed out at ${new Date(now).toJSON()}`
      );
      const timedOutRequestIds = pendingRequestIds.filter(
        (requestId) => this.requests[requestId].timeout.getTime() < now
      );

      timedOutRequestIds.forEach((timedOutRequestId) => {
        console.log(`Task ${timedOutRequestId} timed out at ${now}.`);
        const timedOutRequest = this.requests[timedOutRequestId];
        delete this.requests[timedOutRequestId];
        timedOutRequest.error(timeoutError);
      });
    }, 100);
  }

  // Whenever there aren't any pending requests stop watching for timeouts.
  private removeTimeoutHandler() {
    clearInterval(this.processTimeoutsIntervalHandle);
    this.processTimeoutsIntervalHandle = undefined;
  }
}
