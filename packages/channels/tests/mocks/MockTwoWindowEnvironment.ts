import {PostMessageChannel} from "../../src";
import {DuplexChannel} from "../../src";
import type {IChannel, IDuplexChannel, IEndpoint} from "@circlesland/interfaces-channels";

export class MockTwoWindowEnvironment {
  constructor(leftOrigin:Window, rightOrigin:Window) {
    this.leftWindow = leftOrigin;
    this.rightWindow = rightOrigin;

    this.leftToRight = new PostMessageChannel(this.leftWindow, this.rightWindow);
    this.rightToLeft = new PostMessageChannel(this.rightWindow, this.leftWindow);

    this.duplexChannel = new DuplexChannel(this.leftToRight, this.rightToLeft);

    this.leftEndpoint = this.duplexChannel.left;
    this.rightEndpoint = this.duplexChannel.right;
  }

  readonly leftWindow: Window;
  readonly rightWindow: Window;

  readonly leftToRight: IChannel;
  readonly rightToLeft: IChannel;

  readonly duplexChannel:IDuplexChannel;

  readonly leftEndpoint: IEndpoint;
  readonly rightEndpoint: IEndpoint;
}