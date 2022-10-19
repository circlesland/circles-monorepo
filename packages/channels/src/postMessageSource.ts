import type {IEvent, IEventSource} from "@circlesland/interfaces-channels";

/**
 * Sends events via 'postMessage' to the 'sinkWindow'.
 */
export class PostMessageSource implements IEventSource {

  readonly sinkOrigin:string;
  readonly sinkWindow:Window;

  constructor(sinkWindow:Window, sinkOrigin:string) {
    this.sinkWindow = sinkWindow;
    this.sinkOrigin = sinkOrigin;
  }

  emit(event: IEvent): void {
    this.sinkWindow.postMessage(event, this.sinkOrigin);
  }
}