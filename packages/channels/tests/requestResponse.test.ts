import {MockRequest} from "./mocks/MockRequest";
import {StatefulEndpoint} from "../src";
import {MockTwoWindowEnvironment} from "./mocks/MockTwoWindowEnvironment";
import {MockWindow} from "./mocks/MockWindow";

describe("StatefulEndpoint", () => {

  describe('with PostMessageChannels and MockWindows', function () {

    it(`should mock window ..`, async function() {
      const p1 = new Promise((resolve, reject) => {
        const container = new MockWindow();
        container.addEventListener("message", (e) => {
          const payload = e.data;
          console.log("container window: ", e);
          resolve(null);
        });

        container.postMessage({
          type: "connect"
        });
      });

      const p2 = new Promise((resolve, reject) => {
        const content = new MockWindow();
        content.addEventListener("message", (e) => {
          const payload = e.data;
          console.log("content window: ", e);
          resolve(null);
        });

        content.postMessage({
          type: "connect"
        });
      });

      await Promise.all([p1,p2]);
    });

    it('should respond to requests', async function () {
      jest.setTimeout(1000 * 60 * 60);

      const container = window;

      const frame:HTMLIFrameElement = window.document.createElement("iframe");
      window.document.body.appendChild(frame);
      frame.src = "http://localhost:8080/content.html";

      const content = frame.contentWindow;


      // Setup an environment which links the left to the right window
      const env = new MockTwoWindowEnvironment(container, content);
      const mockRequest = new MockRequest();

      // Setup a stateful endpoint which can wait for specific events
      const rightStatefulEndpoint = new StatefulEndpoint(env.rightEndpoint, 1000 * 60 * 60);

      env.leftEndpoint.receive(MockRequest.type, (event) => {
        console.info(`Received event at left endpoint!`, event);
      });

      env.rightEndpoint.receive(MockRequest.type, (event) => {
        console.info(`Received event at right endpoint!`, event);
      });

      setTimeout(() => {

        // Send the event from the left side ...
        env.leftEndpoint.send(mockRequest);
      });

      // and expect it to appear on the right
      const receivedRightEvent = await rightStatefulEndpoint.receiveNext(MockRequest.type);


      expect((<any>receivedRightEvent).id == mockRequest.id);
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