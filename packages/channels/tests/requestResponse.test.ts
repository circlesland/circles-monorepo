/**
 * @jest-environment jsdom
 */

import {MockStatefulEndpoint} from "./mocks/MockStatefulEndpoint";
import {MockRequest} from "./mocks/MockRequest";
import {MockDeadEndRequest} from "./mocks/MockDeadEndRequest";

describe("StatefulEndpoint", () => {

  it('should respond to requests', async function () {
    const mockRequest = new MockRequest();
    const mockResponse = await new MockStatefulEndpoint().request(mockRequest);

    expect(mockResponse.id == mockRequest.id);
  });

  it(`should time out when no response was sent within the specified time`, async function () {
    const start = Date.now();
    const specifiedTimeout = 234;
    let failed: boolean = false;
    try {
      const deadEndEvent = new MockDeadEndRequest();
      await new MockStatefulEndpoint().request(deadEndEvent, specifiedTimeout);
      failed = true;
    } catch (e) {
      const end = Date.now();
      expect(end-start >= specifiedTimeout); // Not earlier than timeout
      expect(end-start <= specifiedTimeout + 50);  // Not later than 50 ms after timeout
      expect(e.message.indexOf("The request timed out") > -1);
    }
    expect(failed).toBeFalsy();
  })

  it('should not allow subsequent requests with the same ID', async () => {
    let failed: boolean = false;
    try {
      const deadEndEvent = new MockDeadEndRequest();
      const mockEndpoint = new MockStatefulEndpoint();
      await Promise.all([
        mockEndpoint.request(deadEndEvent),
        mockEndpoint.request(deadEndEvent)
      ]);
      failed = true;
    } catch (e) {
      failed = e.message.indexOf("The request timed out") > -1;
      if (!failed) {
        expect(e.message.indexOf("is a duplicate") > -1);
      }
    }
    expect(failed).toBeFalsy();
  });

  it('should ignore events with no handler', async function () {
    const mockRequest = new MockDeadEndRequest();
    new MockStatefulEndpoint().endpoint.source.emit(mockRequest);
  });
});