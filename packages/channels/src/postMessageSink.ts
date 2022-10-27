import type { IEvent, IEventSink } from '@circlesland/interfaces-channels';
import type { DestroyEventSinkSubscription } from '@circlesland/interfaces-channels';

/**
 * Listens for events that arrive via 'postMessage' from the 'sourceWindow'.
 */
export class PostMessageSink implements IEventSink {
  readonly sourceWindow: Window;
  readonly sinkOrigin: string;

  constructor(sourceWindow: Window, sinkOrigin: string) {
    this.sourceWindow = sourceWindow;
    this.sinkOrigin = sinkOrigin;
  }

  receive(
    type: string,
    handler: (event: IEvent) => void
  ): DestroyEventSinkSubscription {
    const filterAndSink = (e: MessageEvent) => {
      if (!e.source) {
        return; // No source
      }

      // if (e.source.origin == this.sourceWindow.origin) {
      //   return; // We sent this event and already know it
      // }

      // TODO: Is this valid? sinkOrigin is the framed app, while e.origin might be the frame container
      // if (
      //   !this.sinkOrigin.includes(e.origin, 0) ||
      //   e.origin.length < this.sinkOrigin.length
      // ) {
      //   return; // The message is not directed to us
      // }

      console.log(type, e.data.type);

      if (type != `*` && e.data.type !== type) {
        return; // Wrong type
      }

      handler(e.data);
    };

    this.sourceWindow.addEventListener('message', filterAndSink);
    return () =>
      this.sourceWindow.removeEventListener('message', filterAndSink);
  }
}
