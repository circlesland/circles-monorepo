import type {IEvent, IEventSource} from "@circlesland/interfaces-channels";
import {IPostMessageWindow} from "../tests/mocks/MockWindow";

/**
 * Sends events via 'postMessage' to the 'sinkWindow'.
 */
export class PostMessageSource implements IEventSource {

  readonly sinkOrigin:string;
  readonly sinkWindow:IPostMessageWindow;

  constructor(sinkWindow:IPostMessageWindow, sinkOrigin:string) {
    this.sinkWindow = sinkWindow;
    this.sinkOrigin = sinkOrigin;
  }

  emit(event: IEvent): void {
    this.sinkWindow.postMessage(event, this.sinkOrigin);
  }
}