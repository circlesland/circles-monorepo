import { CeramicClient } from './CeramicClient';
import { dummyTestAccounts } from './test-data/dummy-accounts';
import { CeramicSchema } from './types';

let ceramicClient: CeramicClient;

describe('Ceramic Profile', () => {
  beforeAll(async () => {
    ceramicClient = new CeramicClient(CeramicSchema.basicProfile);
    await ceramicClient.connect(dummyTestAccounts[0]);
  });

  it('should set the name John Doe', async () => {
    const ceramicUpdateProfilePromise = ceramicClient.updateData({
      name: 'John Doe',
      country: 'RO',
      gender: 'barbat',
    });

    expect(ceramicUpdateProfilePromise).resolves.not.toThrow();
  });

  it('should get the name', async () => {
    const profile = await ceramicClient.getData();

    expect(profile?.name === 'John Doe');
  });

  it('should get the country', async () => {
    const profile = await ceramicClient.getData();

    expect(profile?.country === 'RO');
  });

  it('should get the gender', async () => {
    const profile = await ceramicClient.getData();

    expect(profile?.gender === 'barbat');
  });
});
