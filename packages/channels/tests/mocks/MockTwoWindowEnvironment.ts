import {IPostMessageWindow, MockWindow} from "./MockWindow";
import {PostMessageChannel} from "../../src/postMessageChannel";
import {DuplexChannel} from "../../src/duplexChannel";
import {IChannel, IDuplexChannel, IEndpoint} from "@circlesland/interfaces-channels";

export class MockTwoWindowEnvironment {
  constructor(leftOrigin:string, rightOrigin:string) {
    this.leftWindow = new MockWindow();
    this.leftWindow.location = <any>{
      origin: leftOrigin
    };

    this.rightWindow = new MockWindow();
    this.rightWindow.location = <any>{
      origin: rightOrigin
    };

    this.leftToRight = new PostMessageChannel(this.leftWindow, this.rightWindow);
    this.rightToLeft = new PostMessageChannel(this.rightWindow, this.leftWindow);

    this.duplexChannel = new DuplexChannel(this.leftToRight, this.rightToLeft);

    this.leftEndpoint = this.duplexChannel.left;
    this.rightEndpoint = this.duplexChannel.right;
  }

  readonly leftWindow: IPostMessageWindow;
  readonly rightWindow: IPostMessageWindow;

  readonly leftToRight: IChannel;
  readonly rightToLeft: IChannel;

  readonly duplexChannel:IDuplexChannel;

  readonly leftEndpoint: IEndpoint;
  readonly rightEndpoint: IEndpoint;
}