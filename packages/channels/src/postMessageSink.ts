import type {IEvent, IEventSink} from "@circlesland/interfaces-channels";
import type {DestroyEventSinkSubscription} from "@circlesland/interfaces-channels/src";
import {IPostMessageWindow} from "../tests/mocks/MockWindow";

/**
 * Listens for events that arrive via 'postMessage' from the 'sourceWindow'.
 */
export class PostMessageSink implements IEventSink {

  readonly sourceWindow:IPostMessageWindow;
  readonly sinkOrigin:string;

  constructor(sourceWindow:IPostMessageWindow, sinkOrigin:string) {
    this.sourceWindow = sourceWindow;
    this.sinkOrigin = sinkOrigin;
  }

  receive(type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription {
    const filterAndSink = (e: MessageEvent) => {
      if (!e.source) {
        return; // No source
      }
      if (e.source == this.sourceWindow) {
        return; // We sent this event and already know it
      }

      if (!this.sinkOrigin.includes(e.origin, 0) || e.origin.length < this.sinkOrigin.length) {
        return; // The message is not directed to us
      }
      if (type != `*` && e.data.type !== type) {
        return; // Wrong type
      }

      handler(e.data);
    };

    this.sourceWindow.addEventListener("message", filterAndSink);
    return () => this.sourceWindow.removeEventListener("message", filterAndSink);
  }
}