export interface IPostMessageWindow {
  location: IMockLocation;
  postMessage: (message: any, targetOrigin: string) => void;
  addEventListener: (type: string, handler: () => any) => void;
  removeEventListener: (type: string, handler: () => any) => void;
}

export interface IMockLocation {
  origin: string;
}

export class MockWindow implements IPostMessageWindow {
  location: IMockLocation;
  messageOrigin: string;
  eventPipeline: { [key: string]: any };

  constructor(origin: string, messageOrigin: string, eventPipeline: { [key:string]: any }) {
    this.location = {
      origin,
    };
    this.messageOrigin = messageOrigin;
    this.eventPipeline = eventPipeline;
  }

  postMessage(message: any, targetOrigin: string): void {
    const handler = this.eventPipeline[`${this.messageOrigin} - message`];
    if (handler) {
      handler(message);
    }
  }

  addEventListener(type: string, handler: () => any): void {
    const key = `${this.messageOrigin} - ${type}`;
    this.eventPipeline[key] = handler;
  }

  removeEventListener(type: string, handler: () => any): void {
    delete this.eventPipeline[type];
  }
}
