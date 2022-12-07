<script lang="ts">
  import type {
    IChannel,
    IDuplexChannel,
  } from '@circlesland/interfaces-channels/src';
  import {
    DuplexChannel,
    PostMessageChannel,
    PostMessageSink,
    PostMessageSource,
    StatefulEndpoint,
  } from '@circlesland/channels';
  import { toggleMachine } from './../../xstate/user-profile-machine';
  import { interpret } from 'xstate';
  import { onDestroy, onMount } from 'svelte';
  import { link } from 'svelte-spa-router';
  import { getProfileFromCeramic, getWallet } from '../../utils/CeramicHelpers';
  export let params = {};

  import rootManifest from '../../apps/root.json';
  import { FrameCommunicator, Methods } from '../../utils/FrameCommunicator';

  import Center from '../components/Center.svelte';
  import CompleteProfileForm from '../components/CompleteProfileForm.svelte';
  import { fetchProfile } from '../../xstate/user-profile-machine';
  import type { IStatefulEndpoint } from '@circlesland/interfaces-channels';
  import { log } from 'xstate/lib/actions';
  const toggleService = interpret(toggleMachine).start();

  let appManifest;
  let frameCommunicator: FrameCommunicator;
  let frameCommunicatorDestroy: () => void;
  let ceramicProfile;
  let isEditProfileOpen = false;
  onMount(() => {
    // @ts-ignore
    appManifest = rootManifest.find((app) => app.id === params.appId);
  });

  const onIframeLoad = async () => {
    const iframeEl = document.getElementById('appFrame') as HTMLIFrameElement;

    if (!frameCommunicator && iframeEl) {
      const source = new PostMessageSource(
        iframeEl.contentWindow,
        iframeEl.src
      );
      const sink = new PostMessageSink(window, window.location.origin);

      const duplexChannel: IDuplexChannel = new DuplexChannel(source, sink);
      sink.receive('safeDappSdkMessage', async (safeDappSdkMessage) => {
        console.log('got now', safeDappSdkMessage);
        switch (safeDappSdkMessage.method) {
          case Methods.init:
            const [address] = getWallet();
            ceramicProfile = await fetchProfile();

            duplexChannel.endpoint.send({
              type: 'safeDappSdkMessage',
              method: Methods.init,
              address,
              ceramicProfile,
              id: '1',
              requestId: '123',
            });

            break;

          case Methods.editProfile: {
            console.log('edit profile clicked');
            isEditProfileOpen = true;
            break;
          }
        }
      });
    }
  };

  onDestroy(() => {
    if (frameCommunicator) {
      frameCommunicatorDestroy();
    }
  });
</script>

<div>
  AppView page for app {appManifest?.id} -
  <a href="/" use:link>go back to loader</a>
</div>

<!-- {#if $toggleService?.value === 'success'} TODO: Remove when required-->
  {#if appManifest}
    <iframe
      src={appManifest?.url}
      frameborder="0"
      class="w-screen h-screen"
      id="appFrame"
      on:load={onIframeLoad}
    />
  {/if}

  {#if isEditProfileOpen && ceramicProfile}
    <Center
      blur={true}
      on:clickedOutside={() => {
        isEditProfileOpen = false;
      }}
    >
      <CompleteProfileForm profile={ceramicProfile} />
    </Center>
  {/if}
<!-- {/if} -->
