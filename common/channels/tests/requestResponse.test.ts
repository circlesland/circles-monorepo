import {MockStatefulEndpoint} from "./mocks/MockStatefulEndpoint";
import {MockRequest} from "./mocks/MockRequest";

it('should respond to requests', async function () {
  const mockRequest = new MockRequest();
  const mockResponse = await new MockStatefulEndpoint().request(mockRequest);

  expect(mockResponse._id == mockRequest._id);
});

it(`should time out when no response was sent in time`, async function () {

})
