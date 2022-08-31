import { CeramicClient as _CeramicClient } from '@ceramicnetwork/http-client';
import { DIDDataStore } from '@glazed/did-datastore';
import { Buffer } from 'buffer';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyResolver from 'key-did-resolver';

import modelLoader from './modelLoader';
import { CeramicSchema } from './types';

import type { ICeramicReader } from './interfaces';
import type { ICeramicWriter } from './interfaces';
import type { CeramicDataType } from './types';

export class CeramicClient implements ICeramicReader, ICeramicWriter {
  private ceramic: _CeramicClient;
  private datastore: DIDDataStore;
  private schema: CeramicSchema;
  constructor(schema = CeramicSchema.basicProfile) {
    this.ceramic = new _CeramicClient('https://ceramic-clay.3boxlabs.com');
    const model = modelLoader(CeramicSchema.basicProfile);

    this.datastore = new DIDDataStore({ ceramic: this.ceramic, model });
    this.schema = schema;
  }

  get did(): DID {
    return this.ceramic.did;
  }

  /**
   * We use this method to authenticate the user on the Ceramic Network using his private key
   * @param privateKey - this is the private key that we use to connect to the Ceramic Network
   */
  async connect(privateKey: string) {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const privateKeyUint8Array = new Uint8Array(privateKeyBuffer).slice(0, 32);
    const provider = new Ed25519Provider(privateKeyUint8Array);
    const did = new DID({ provider, resolver: KeyResolver.getResolver() });
    await did.authenticate();

    this.ceramic.setDID(did);
  }

  async getData(): Promise<CeramicDataType | null> {
    if (!this.ceramic.did) throw new Error('You need to connect first');
    try {
      const profile = await this.datastore.get(this.schema);

      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateData(data: CeramicDataType) {
    if (!this.ceramic.did) throw new Error('You need to connect first');
    try {
      await this.datastore.merge(this.schema, data);
    } catch (error) {
      console.error(error);
    }
  }
}
