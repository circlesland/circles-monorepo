/**
 * @jest-environment jsdom
 */

import {MockRequest} from "./mocks/MockRequest";
import {DuplexChannel, StatefulEndpoint} from "../src";
import {MockTwoWindowEnvironment} from "./mocks/MockTwoWindowEnvironment";
import {MockWindow} from "./mocks/MockWindow";
import { JSDOM } from 'jsdom';

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

      const dom = new JSDOM('<!DOCTYPE html>', {
        url: 'http://localhost:1234'
      });
      
      const wind = dom.window;
      const containerWindow = wind;

      const frame:HTMLIFrameElement = containerWindow.document.createElement("iframe");
      
      frame.src = "http://localhost:8080/content.html";
      containerWindow.document.body.appendChild(frame);
      
      const contentWindow = frame.contentWindow;

      const env = new MockTwoWindowEnvironment(containerWindow as unknown as Window, contentWindow);
      const request = new MockRequest();

      const rightStatefulEndpoint = new StatefulEndpoint(env.leftEndpoint, 1000 * 2);

      env.leftEndpoint.receive(MockRequest.type, (e) => {
        console.log('AAAAA', e);
        done();
      });

      env.rightEndpoint.receive(MockRequest.type, (e) => {
        console.log('BBBBB', e);
        done();
      });

      rightStatefulEndpoint.endpoint.send(request);

      // // Setup an environment which links the left to the right window
      // const env = new MockTwoWindowEnvironment(container, content);
      // const mockRequest = new MockRequest();

      // // Setup a stateful endpoint which can wait for specific events
      // const rightStatefulEndpoint = new StatefulEndpoint(env.rightEndpoint, 1000 * 5);

      // env.leftEndpoint.receive(MockRequest.type, (event) => {
      //   console.info(`Received event at left endpoint!`, event);
      // });

      // env.rightEndpoint.receive(MockRequest.type, (event) => {
      //   console.info(`Received event at right endpoint!`, event);
      // });

      // setTimeout(() => {

      //   // Send the event from the left side ...
      //   env.leftEndpoint.send(mockRequest);
      // });

      // // and expect it to appear on the right
      // const receivedRightEvent = await rightStatefulEndpoint.receiveNext(MockRequest.type);


      // expect((<any>receivedRightEvent).id == mockRequest.id);
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