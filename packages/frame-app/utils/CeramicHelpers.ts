import { CeramicClient } from '@ceramicnetwork/http-client';
import { DIDDataStore } from '@glazed/did-datastore';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';

export const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");

const aliases = {
  schemas: {
    basicProfile: "ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
  },
  definitions: {
    BasicProfile: "kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic",
  },
  tiles: {},
};

export const datastore = new DIDDataStore({ ceramic, model: aliases });

export const getCeramicSeed = async (privateKey: string) => {
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  return new Uint8Array(privateKeyBuffer).slice(0, 32);
};

export const getProfileFromCeramic = async () => {
  try {
    const profile = await datastore.get("BasicProfile");

    return profile;
  } catch (error) {
    console.error(error);
  }
};

export const updateProfileOnCeramic = async ({ name, country, gender }) => {
  try {
    const updatedProfile = {
      name,
      country,
      gender,
    };

    await datastore.merge("BasicProfile", updatedProfile);

    return updatedProfile;
  } catch (error) {
    console.error(error);
  }
};

export const getWallet = () => {
  // @ts-ignore
  const profileData = window.authApi.getDataFromLocalStorage();
  const wallet = new ethers.Wallet(profileData?.privateKey);

  return [wallet.address, profileData?.privateKey];
};
