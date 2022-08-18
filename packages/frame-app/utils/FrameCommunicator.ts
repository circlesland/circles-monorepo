interface IMessagePayload {
  method: Methods;
  params: any;
  requestId: string;
}

export enum Methods {
  init = "init",
  sendTransaction = "sendTransaction",
  editProfile = "editProfile",
}

export class FrameCommunicator {
  private _frame: HTMLIFrameElement | undefined;
  private appUrl: string | undefined;
  private handlers = new Map<Methods, (payload: any) => any>();

  get frame(): HTMLIFrameElement | undefined {
    return this._frame;
  }

  on(method: Methods, callback: (payload: any) => any) {
    this.handlers.set(method, callback);

    return this;
  }

  async handleMsg({ method, params, requestId }: IMessagePayload) {
    if (!method || !requestId) {
      console.error("Message received without method or requestId");
      return;
    }

    const callback = this.handlers.get(method);

    if (!callback) {
      return;
    }

    const response = await Promise.resolve(callback(params));
    this.sendResponse(method, response, requestId);
  }

  onMessage(msg: MessageEvent) {
    if (msg.source === window) {
      return;
    }

    if (!this.appUrl?.includes(msg.origin)) {
      console.log("Message received from unknown origin " + msg.origin);
    }

    this.handleMsg(msg.data);
  }

  sendResponse(method: Methods, response: any, requestId: string) {
    const frameWindow = this?._frame?.contentWindow;
    if (!frameWindow) return;
    const msg = {
      method,
      success: true,
      requestId,
      response,
    };
    frameWindow.postMessage(msg, this.appUrl as string);
  }

  connect(frame: HTMLIFrameElement, defaultWindow?: Window) {
    this._frame = frame;
    this.appUrl = frame.src;
    const eventWindow = defaultWindow || this._frame.contentWindow;
    if (!eventWindow) return;
    const callback = (e: MessageEvent) => this.onMessage(e);

    eventWindow.addEventListener("message", callback);
    return () => {
      eventWindow.removeEventListener("message", callback);
    };
  }
}
