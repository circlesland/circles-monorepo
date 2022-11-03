import type {
  IDuplexChannel,
  IEndpoint,
  IEventSink,
  IEventSource,
} from '@circlesland/interfaces-channels';
import type {
  DestroyEventSinkSubscription,
  IEvent,
} from '@circlesland/interfaces-channels';
export class DuplexChannel implements IDuplexChannel {
  private readonly source: IEventSource;
  private readonly sink: IEventSink;

  constructor(source: IEventSource, sink: IEventSink) {
    this.source = source;
    this.sink = sink;
  }

  readonly endpoint: IEndpoint = {
    send: (event: IEvent) => {
      console.log(`DuplexChannel.send(): `, event);
      setTimeout(() => {
        this.source.emit(event);
      });
    },
    receive: (
      type: string,
      handler: (event: IEvent) => void
    ): DestroyEventSinkSubscription => {
      const h = (e: IEvent) => {
        console.log(`DuplexChannel.received(type: ${type}): `, e);
        handler(e);
      };
      return this.sink.receive(type, h);
    },
  };
}
