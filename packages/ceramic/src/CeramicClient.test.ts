import { CeramicSchemas } from '@circlesland/interfaces-ceramic/src/Schemas';

import { CeramicClient } from './CeramicClient';

let ceramicClient: CeramicClient;

beforeAll(async () => {
  ceramicClient = new CeramicClient();
  const privateKey = "20cdc14c2bb87532359bf8cd5932db2111a8569b6333a6a162685f7bde57d7c1";
  await ceramicClient.connect(privateKey);
});

it("should set the name John Doe", async () => {
  await ceramicClient.updateData(CeramicSchemas.basicProfile, {
    name: "John Doe",
    country: "RO",
    gender: "barbat",
  });

  //   expect(mockResponse._id == mockRequest._id);
});

it("should respond to requests", async () => {
  const profile = await ceramicClient.getData();

  expect(profile?.name === "John Doe");
});
