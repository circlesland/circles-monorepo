import type { IEventSource } from '@circlesland/interfaces-channels';
import type { IEventSink } from '@circlesland/interfaces-channels';
import type { IEvent } from '@circlesland/interfaces-channels';
import type { IChannel } from '@circlesland/interfaces-channels';

export class MockChannel implements IChannel {
  private static readonly receivers: {
    [type: string]: (event: IEvent) => void;
  } = {};

  constructor() {}

  sink: IEventSink = {
    receive(type: string, handler: (event: IEvent) => void) {
      MockChannel.receivers[type] = handler;
      return () => {
        delete MockChannel.receivers[type];
      };
    },
  };

  source: IEventSource = {
    emit(event: IEvent) {
      const receiver = MockChannel.receivers[event.type];
      if (receiver) {
        receiver(event);
      }

      const catchAllReceiver = MockChannel.receivers['*'];
      if (catchAllReceiver) {
        catchAllReceiver(event);
      }
    },
  };
}
