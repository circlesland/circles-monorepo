import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import KeyResolver from 'key-did-resolver';
import { assign, createMachine } from 'xstate';

import { ceramic, getCeramicSeed, getProfileFromCeramic } from '../utils/CeramicHelpers';

const fetchProfile = async () => {
  // @ts-ignore
  const profileData = window.authApi.getDataFromLocalStorage();
  const privateKey = profileData?.privateKey;
  if (privateKey) {
    const signature = await getCeramicSeed(privateKey);

    const provider = new Ed25519Provider(signature);

    const did = new DID({ provider, resolver: KeyResolver.getResolver() });
    await did.authenticate();

    ceramic.setDID(did);

    return getProfileFromCeramic();
  }
};

const isProfileCompleted = (context, event) => {
  console.log(event.data);
  return !!event?.data?.name;
};

// This machine is completely decoupled from Svelte
export const toggleMachine = createMachine({
  id: "profile",
  initial: "loading",
  context: {
    profile: undefined,
    error: undefined,
  },
  states: {
    loading: {
      invoke: {
        id: "getUser",
        src: (context, event) => fetchProfile(),
        onDone: [
          {
            target: "success",
            actions: assign({ profile: (context, event) => event.data }),
            cond: isProfileCompleted,
          },
          {
            target: "no_profile",
          },
        ],
        onError: {
          target: "failure",
          actions: assign({ profile: (context, event) => event.data }),
        },
      },
    },
    success: {},
    no_profile: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
});
