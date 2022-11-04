import type { IUniqueEvent } from '@circlesland/interfaces-channels';

export class MockIdCounter {
  private static counter: number = 0;
  static next(): number {
    return ++this.counter;
  }
}

export class MockRequest implements IUniqueEvent {
  id: string;
  static readonly messageType: string = 'mock_request';
  readonly type: string;
  readonly source: string;
  readonly origin: string;
  readonly data: any;

  constructor(source: string, origin: string, data: any) {
    this.id = MockIdCounter.next().toString();
    this.source = source;
    this.origin = origin;
    this.data = data;
    this.type = data.type;
  }
}

export class MockResponse implements IUniqueEvent {
  id: string;
  static readonly type: string = 'mock_response';
  readonly type: string = MockResponse.type;

  constructor(id: string) {
    this.id = id;
  }
}
