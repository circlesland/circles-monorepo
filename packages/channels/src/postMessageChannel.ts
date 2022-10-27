import type {IChannel, IEventSink, IEventSource} from "@circlesland/interfaces-channels";
import {PostMessageSource} from "./postMessageSource";
import {PostMessageSink} from "./postMessageSink";
import type { ChannelProps } from "./types";

export class PostMessageChannel implements IChannel {
  readonly sink: IEventSink;
  readonly source: IEventSource;

  constructor(sourceWindow: ChannelProps, sinkWindow: ChannelProps) {
    this.source = new PostMessageSource(sinkWindow.window, sinkWindow.origin);
    this.sink = new PostMessageSink(sourceWindow.window, sourceWindow.origin);
  }
}