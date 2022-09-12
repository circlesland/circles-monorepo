import type {IDuplexChannel, IChannel, IEndpoint} from "@circlesland/interfaces-channels";
import {DestroyEventSinkSubscription, IEvent} from "@circlesland/interfaces-channels";

export class DuplexChannel implements IDuplexChannel {
  private readonly leftToRight: IChannel;
  private readonly rightToLeft: IChannel;

  constructor(leftToRight: IChannel, rightToLeft: IChannel) {
    this.leftToRight = leftToRight;
    this.rightToLeft = rightToLeft;
  }

  readonly left: IEndpoint = {
    send: (event: IEvent) => {
      this.leftToRight.source.emit(event);
    },
    receive: (type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription => {
      return this.rightToLeft.sink.receive(type, handler);
    }
  };

  readonly right: IEndpoint = {
    send: (event: IEvent) => {
      this.rightToLeft.source.emit(event);
    },
    receive: (type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription => {
      return this.leftToRight.sink.receive(type, handler);
    }
  };
}