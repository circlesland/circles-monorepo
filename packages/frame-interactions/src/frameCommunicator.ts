import { DuplexChannel, PostMessageChannel, type ChannelProps } from '@circlesland/channels';
import { IEvent } from '@circlesland/interfaces-channels';

export class FrameCommunicator {
    private channel: DuplexChannel;

    constructor(parentFrame: ChannelProps, childFrame: ChannelProps) {
        const parentToChildChannel = new PostMessageChannel(parentFrame, childFrame);
        const childToParentChannel = new PostMessageChannel(childFrame, parentFrame);

        this.channel = new DuplexChannel(parentToChildChannel, childToParentChannel);
    }

    public sendEvent(event: IEvent) {
        this.channel.left.send(event);
    }

    public receiveEvent(type: string, handler: () => any) {
        this.channel.right.receive(type, handler);
    }
}