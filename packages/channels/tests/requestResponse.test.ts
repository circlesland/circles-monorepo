/**
 * @jest-environment jsdom
 */

import {MockRequest} from "./mocks/MockRequest";
import {DuplexChannel, StatefulEndpoint} from "../src";
import {MockTwoWindowEnvironment} from "./mocks/MockTwoWindowEnvironment";
import {MockWindow} from "./mocks/MockWindow";

describe("StatefulEndpoint", () => {

  describe('with PostMessageChannels and MockWindows', function () {

    // it(`should mock window ..`, async function() {
    //   const eventType = 'connect';
    //   const p1 = new Promise((resolve, reject) => {
    //     const container = window;
    //     container.addEventListener('message', (e) => {
    //       const { type } = e.data;
    //       if (type === eventType) {
    //         resolve(true);            
    //       }
    //       resolve(false);
    //     });

    //     container.postMessage({
    //       type: eventType
    //     }, '*');
    //   });

    //   const p2 = new Promise((resolve, reject) => {
    //     const content = window;
    //     content.addEventListener("message", (e) => {
    //       const { type } = e.data;
    //       if (type === eventType) {
    //         resolve(true);            
    //       }
    //       resolve(false);
    //     });

    //     content.postMessage({
    //       type: eventType
    //     }, '*');
    //   });

    //   const [p1Result, p2Result] = await Promise.all([p1,p2]);

    //   expect(p1Result).toBeTruthy();
    //   expect(p2Result).toBeTruthy();
    // });

    it('should respond to requests', function (done) {
      jest.setTimeout(1000 * 60 * 60);

      const eventPipeline = {};
      const parentOrigin = 'http://localhost:1111';
      const childOrigin = 'http://localhost:2222';
      const parentWindow = new MockWindow(parentOrigin, childOrigin, {});
      const childWindow = new MockWindow(childOrigin, parentOrigin, {});

      const environment = new MockTwoWindowEnvironment(parentWindow as unknown as Window, childWindow as unknown as Window);

      const leftEndpoint = new StatefulEndpoint(environment.leftEndpoint, 1000 * 2);
      const rightEndpoint = new StatefulEndpoint(environment.rightEndpoint, 1000 * 2);

      let calls =  0;
      const doneHandler = () => {
        calls++;
        if (calls === 2) {
          done();
        }
      }

      const leftRequestPayload = 'left-payload-data';
      const rightRequestPayload = 'right-payload-data';
      environment.leftEndpoint.receive(`${MockRequest.messageType}-test`, (e) => {
        console.log('AAAAAAA')
        const { payload } = e;
        expect(payload).toEqual(rightRequestPayload);
        doneHandler();
      });

      environment.rightEndpoint.receive(MockRequest.messageType, (e) => {
        console.log('BBBBBB')
        const { payload } = e;
        expect(payload).toEqual(leftRequestPayload);
        doneHandler();
      });

      const leftRequest = new MockRequest(parentOrigin, childOrigin, { type: MockRequest.messageType, payload: leftRequestPayload});
      leftEndpoint.endpoint.send(leftRequest);
      
      const rightRequest = new MockRequest(childOrigin, parentOrigin, { type: `${MockRequest.messageType}-test`, payload: rightRequestPayload});
      rightEndpoint.endpoint.send(rightRequest);
    });
  });
/*
  describe('with MockChannel', function () {
    const hostChannel = new MockChannel();
    hostChannel.source = {
      emit(event: IEvent) {
      }
    };
    hostChannel.sink = {
      receive(type: string, handler: (event: IEvent) => void): any {
      }
    };

    const dappChannel = new MockChannel();

    it('should respond to requests', async function () {
      const mockRequest = new MockRequest();
      const mockResponse = await new StatefulEndpoint(MockChannel.instance).request(mockRequest);

      expect(mockResponse.id == mockRequest.id);
    });

    it(`should time out when no response was sent within the specified time`, async function () {
      const start = Date.now();
      const specifiedTimeout = 234;
      let failed: boolean = false;
      try {
        const deadEndEvent = new MockDeadEndRequest();
        await new StatefulEndpoint(MockChannel.instance).request(deadEndEvent, specifiedTimeout);
        failed = true;
      } catch (e) {
        const end = Date.now();
        expect(end-start >= specifiedTimeout); // Not earlier than timeout
        expect(end-start <= specifiedTimeout + 50);  // Not later than 50 ms after timeout
        expect(e.message.indexOf("The request timed out") > -1);
      }
      if (failed) {
        throw new Error(`Timout wasn't triggered after ${specifiedTimeout} ms without a response`);
      }
    })

    it('should not allow subsequent requests with the same ID', async () => {
      let failed: boolean = false;
      try {
        const deadEndEvent = new MockDeadEndRequest();
        const mockChannel = new StatefulEndpoint(MockChannel.instance);
        await Promise.all([
          mockChannel.request(deadEndEvent),
          mockChannel.request(deadEndEvent)
        ]);
        failed = true;
      } catch (e) {
        failed = e.message.indexOf("The request timed out") > -1;
        if (!failed) {
          expect(e.message.indexOf("is a duplicate") > -1);
        }
      }
      if (failed) {
        throw new Error(`The StatefulEndpoint accepted subsequent duplicate requests.`);
      }
    });

    it('should ignore events with no handler', async function () {
      const mockRequest = new MockDeadEndRequest();
      new StatefulEndpoint(MockChannel.instance).endpoint.source.emit(mockRequest);
    });
  });
 */
});