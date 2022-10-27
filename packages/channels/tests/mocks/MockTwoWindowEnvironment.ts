import { ChannelProps, PostMessageChannel } from '../../src';
import { DuplexChannel } from '../../src';
import type {
  IChannel,
  IDuplexChannel,
  IEndpoint,
} from '@circlesland/interfaces-channels';

export class MockTwoWindowEnvironment {
  constructor(leftOrigin: Window, rightOrigin: Window) {
    this.leftWindow = {
      origin: leftOrigin.location.origin,
      window: leftOrigin
    };

    this.rightWindow = {
      origin: rightOrigin.location.origin,
      window: rightOrigin
    };

    this.leftToRight = new PostMessageChannel(
      this.leftWindow,
      this.rightWindow
    );
    this.rightToLeft = new PostMessageChannel(
      this.rightWindow,
      this.leftWindow
    );

    this.duplexChannel = new DuplexChannel(this.leftToRight, this.rightToLeft);

    this.leftEndpoint = this.duplexChannel.left;
    this.rightEndpoint = this.duplexChannel.right;
  }

  readonly leftWindow: ChannelProps;
  readonly rightWindow: ChannelProps;

  readonly leftToRight: IChannel;
  readonly rightToLeft: IChannel;

  readonly duplexChannel: IDuplexChannel;

  readonly leftEndpoint: IEndpoint;
  readonly rightEndpoint: IEndpoint;
}
