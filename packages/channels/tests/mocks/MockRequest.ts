import type { IUniqueEvent } from '@circlesland/interfaces-channels';

export class MockIdCounter {
  private static counter: number = 0;
  static next(): number {
    return ++this.counter;
  }
}

export class MockRequest implements IUniqueEvent {
  id: string;
  static readonly type: string = 'mock_request';
  readonly _type: string = MockRequest.type;

  constructor() {
    this.id = MockIdCounter.next().toString();
  }
}

export class MockResponse implements IUniqueEvent {
  id: string;
  static readonly type: string = 'mock_response';
  readonly _type: string = MockResponse.type;

  constructor(id: string) {
    this.id = id;
  }
}
