import { DuplexChannel, PostMessageChannel, type ChannelProps } from '@circlesland/channels';

class AppCommunicator {
    private channel: DuplexChannel;

    constructor(containerWindow: ChannelProps, contentWindow: ChannelProps) {
        const containerToContent = new PostMessageChannel(containerWindow, contentWindow);
        const contentToContainer = new PostMessageChannel(contentWindow, containerWindow);

        this.channel = new DuplexChannel(containerToContent, contentToContainer);
    }

    public sendEvent(event: any) {
        this.channel.left.send(event);
    }

    public receiveEvent(type: string, handler: any) {
        this.channel.right.receive(type, handler);
    }
}

const contextKey = 'app-communicator';

export { AppCommunicator, contextKey };