export interface IPostMessageWindow {
  postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
  postMessage(message: any, options?: WindowPostMessageOptions): void;
  postMessage(message: any, targetOrigin?: string | WindowPostMessageOptions, transfer?: Transferable[]): void;

  addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
  addEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void;

  removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type, listener, options?: boolean | EventListenerOptions): void

  location: Location;
}

export class MockWindow implements IPostMessageWindow {
  location: Location;

  readonly _mockEventListeners: {type:string, listener: (this: any, ev: any) => any}[] = [];

  private wrapInEvent(data:any, targetOrigin:string) {
    return {
      bubbles: false,
      cancelBubble: false,
      cancelable: false,
      composed: false,
      currentTarget: null,
      data: data,
      defaultPrevented: false,
      eventPhase: 0,
      explicitOriginalTarget: null,
      isTrusted: true,
      lastEventId: "",
      origin: targetOrigin,
      originalTarget: null,
      ports: [],
      returnValue: true,
      source: this,
      srcElement: this,
      target: this,
      timeStamp: Date.now(),
      type: "message"
    };
  }

  postMessage(message: any, targetOrigin: string, transfer?: Transferable[]): void;
  postMessage(message: any, options?: WindowPostMessageOptions): void;
  postMessage(message: any, targetOrigin?: string | WindowPostMessageOptions, transfer?: Transferable[]): void {
    console.log(`MockWindow origin:'${this.location.origin}' received event id:${message.id},  type:${message.type}`);
    const e = this.wrapInEvent(message, targetOrigin as string);

    this._mockEventListeners
      .filter(o => o.type === "message")
      .forEach(p => {
        console.log(`MockWindow invoking listener ${p.type} for event: `, e);
        p.listener(e);
      });
  }

  addEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
  addEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type, listener, options?: boolean | AddEventListenerOptions): void {
    this._mockEventListeners.push({
      type: type,
      listener: listener
    });
  }

  removeEventListener<K extends keyof WindowEventMap>(type: K, listener: (this: Window, ev: WindowEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
  removeEventListener<K extends keyof GlobalEventHandlersEventMap>(type: K, listener: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener<K extends keyof WindowEventHandlersEventMap>(type: K, listener: (this: WindowEventHandlers, ev: WindowEventHandlersEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type, listener, options?: boolean | EventListenerOptions): void;
  removeEventListener(type, listener, options?: boolean | EventListenerOptions): void {
    const handlerEntry = this._mockEventListeners.find((o,i ) => o.type == type && o.listener == listener);
    if (!handlerEntry) {
      throw new Error(`Couldn't find a handler to remove`);
    }
    const idx = this._mockEventListeners.indexOf(handlerEntry);
    this._mockEventListeners.splice(idx, 1);
  }
}