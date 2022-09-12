import type {IChannel, IEventSink, IEventSource} from "@circlesland/interfaces-channels";
import {PostMessageSource} from "./postMessageSource";
import {PostMessageSink} from "./postMessageSink";
import {IPostMessageWindow} from "../tests/mocks/MockWindow";

export class PostMessageChannel implements IChannel {
  readonly sink: IEventSink;
  readonly source: IEventSource;

  constructor(sourceWindow: IPostMessageWindow, sinkWindow: IPostMessageWindow) {
    this.source = new PostMessageSource(sinkWindow, sinkWindow.location.origin);
    this.sink = new PostMessageSink(sourceWindow, sinkWindow.location.origin);
  }
}