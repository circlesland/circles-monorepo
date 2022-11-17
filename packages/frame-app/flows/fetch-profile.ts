import { CeramicClient, CeramicSchema } from '@circlesland/ceramic';
import { assign } from 'xstate';

import { AuthService } from '../services/AuthService';

import type { IFlowManifest } from '@circlesland/interfaces-flow-repository';
import type { IEvent } from '@circlesland/interfaces-channels';
import type { MachineConfig } from 'xstate';
const fetchProfile = async () => {
  // @ts-ignore
  const profileData = AuthService.getDataFromLocalStorage();
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

export type FetchCeramicProfileContext = {
  profile: any;
  error: any;
};

export const fetchCeramicProfile = <
  IFlowManifest<FetchCeramicProfileContext, any>
>{
  id: 'xstate-flows.frame.fetch_profile',
  version: 1,
  name: 'Get profile from Ceramic',
  nameI18nKey: 'xstate-flows.frame.fetch_profile.description',
  description: 'Get profile from Ceramic',
  descriptionI18nKey: 'xstate-flows.frame.fetch_profile.description',
  flow: () =>
    <MachineConfig<FetchCeramicProfileContext, any, IEvent>>{
      context: {
        profile: undefined,
        error: undefined,
      },
      initial: 'loading',
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
        success: { type: 'final' },
        no_profile: { type: 'final' },
        failure: {
          on: {
            RETRY: { target: 'loading' },
          },
        },
      },
    },
};
