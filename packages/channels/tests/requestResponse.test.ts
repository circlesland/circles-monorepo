import {MockStatefulEndpoint} from "./mocks/MockStatefulEndpoint";
import {MockRequest} from "./mocks/MockRequest";
import {MockDeadEndRequest} from "./mocks/MockDeadEndRequest";

it('should respond to requests', async function () {
  const mockRequest = new MockRequest();
  const mockResponse = await new MockStatefulEndpoint().request(mockRequest);

  expect(mockResponse._id == mockRequest._id);
});

it(`should time out when no response was sent in time`, async function () {
  try {
    const deadEndEvent = new MockDeadEndRequest();
    const mockResponse = await new MockStatefulEndpoint().request(deadEndEvent);
    console.error(`Timout wasn't triggered after 1000 ms without a response`);
  } catch (e) {
    expect(e.message.indexOf("The request timed out") > -1);
  }
})
