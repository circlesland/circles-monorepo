import { DIDDataStore } from '@glazed/did-datastore';
import { CeramicClient as _CeramicClient } from '@ceramicnetwork/http-client';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyResolver from 'key-did-resolver';

import { CeramicSchemas } from '../../interfaces-ceramic/src/Schemas';
import modelLoader from './modelLoader';

import type { CeramicDataType } from "../../interfaces-ceramic/src/data-types";
import type { ICeramicReader } from "@circlesland/interfaces-ceramic/src/ICeramicReader";
import type { ICeramicWriter } from "@circlesland/interfaces-ceramic/src/ICeramicWriter";
export class CeramicClient implements ICeramicReader, ICeramicWriter {
  private ceramic: _CeramicClient;
  private datastore: DIDDataStore;
  constructor() {
    this.ceramic = new _CeramicClient("https://ceramic-clay.3boxlabs.com");
    const model = modelLoader(CeramicSchemas.basicProfile);

    this.datastore = new DIDDataStore({ ceramic: this.ceramic, model });
  }

  async connect(privateKey: string) {
    // @ts-ignore
    const privateKeyBuffer = Buffer.from(privateKey, "hex");
    const privateKeyUint8Array = new Uint8Array(privateKeyBuffer).slice(0, 32);
    const provider = new Ed25519Provider(privateKeyUint8Array);
    const did = new DID({ provider, resolver: KeyResolver.getResolver() });
    await did.authenticate();

    this.ceramic.setDID(did);
  }

  async getData(): Promise<CeramicDataType | null> {
    if (!this.ceramic.did) throw new Error("You need to connect first");
    try {
      const profile = await this.datastore.get("BasicProfile");

      return profile;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateData(schema: CeramicSchemas, data: CeramicDataType) {
    if (!this.ceramic.did) throw new Error("You need to connect first");
    try {
      await this.datastore.merge(schema, data);
    } catch (error) {
      console.error(error);
    }
  }
}
