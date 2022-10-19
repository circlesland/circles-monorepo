import type {IDuplexChannel, IChannel, IEndpoint} from "@circlesland/interfaces-channels";
import type { DestroyEventSinkSubscription, IEvent } from "@circlesland/interfaces-channels";

export class DuplexChannel implements IDuplexChannel {
  private readonly leftToRight: IChannel;
  private readonly rightToLeft: IChannel;

  constructor(leftToRight: IChannel, rightToLeft: IChannel) {
    this.leftToRight = leftToRight;
    this.rightToLeft = rightToLeft;
  }

  readonly left: IEndpoint = {
    send: (event: IEvent) => {
      console.log(`DuplexChannel.left.send(): `, event);
      setTimeout(() => {
        this.leftToRight.source.emit(event);
      });
    },
    receive: (type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription => {
      const h = (e:IEvent) => {
        console.log(`DuplexChannel.left.received(type: ${type}): `, e);
        handler(e);
      }
      return this.rightToLeft.sink.receive(type, h);
    }
  };

  readonly right: IEndpoint = {
    send: (event: IEvent) => {
      console.log(`DuplexChannel.right.send(): `, event);
      setTimeout(() => {
        this.rightToLeft.source.emit(event);
      });
    },
    receive: (type: string, handler: (event: IEvent) => void): DestroyEventSinkSubscription => {
      const h = (e:IEvent) => {
        console.log(`DuplexChannel.right.received(type: ${type}): `, e);
        handler(e);
      }
      return this.leftToRight.sink.receive(type, h);
    }
  };
}