import { CeramicClient } from '@circlesland/ceramic';
import { assign, createMachine } from 'xstate';

export const fetchProfile = async () => {
  // @ts-ignore
  const profileData = window.authApi.getDataFromLocalStorage();
  const privateKey = profileData?.privateKey;
  if (privateKey) {
    try {
      const ceramicClient = new CeramicClient(CeramicSchema.basicProfile);
      await ceramicClient.connect(privateKey);

      return ceramicClient.getData();
    } catch (e) {
      console.log('fetch ceramic profile error', e);
    }
  }
};

const isProfileCompleted = (context, event) => {
  return !!event?.data?.name;
};

// This machine is completely decoupled from Svelte
export const toggleMachine = createMachine({
  id: 'profile',
  initial: 'loading',
  context: {
    profile: undefined,
    error: undefined,
  },
  states: {
    loading: {
      invoke: {
        id: 'getUser',
        src: (context, event) => fetchProfile(),
        onDone: [
          {
            target: 'success',
            actions: assign({ profile: (context, event) => event.data }),
            cond: isProfileCompleted,
          },
          {
            target: 'no_profile',
          },
        ],
        onError: {
          target: 'failure',
          actions: assign({ profile: (context, event) => event.data }),
        },
      },
    },
    success: {},
    no_profile: {},
    failure: {
      on: {
        RETRY: { target: 'loading' },
      },
    },
  },
});
