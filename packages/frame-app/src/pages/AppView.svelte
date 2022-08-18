<script lang="ts">
  import { toggleMachine } from "./../../xstate/user-profile-machine";
  import { interpret } from "xstate";
  import { onDestroy, onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { getProfileFromCeramic, getWallet } from "../../utils/CeramicHelpers";
  export let params = {};

  import rootManifest from "../../apps/root.json";
  import { FrameCommunicator, Methods } from "../../utils/FrameCommunicator";

  import Center from "../components/Center.svelte";
  import CompleteProfileForm from "../components/CompleteProfileForm.svelte";

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
    const iframeEl = document.getElementById("appFrame") as HTMLIFrameElement;
    if (!frameCommunicator && iframeEl) {
      frameCommunicator = new FrameCommunicator();
      frameCommunicatorDestroy = frameCommunicator.connect(iframeEl, window);

      ceramicProfile = await getProfileFromCeramic();

      const [address] = getWallet();

      frameCommunicator.on(Methods.init, () => {
        return { address, ceramicProfile };
      });

      frameCommunicator.on(Methods.editProfile, () => {
        isEditProfileOpen = true;
      });
    }
  };

  onDestroy(() => {
    if (frameCommunicator) {
      frameCommunicatorDestroy();
    }
  });
</script>

<div>AppView page for app {appManifest?.id} - <a href="/" use:link>go back to loader</a></div>

{#if $toggleService?.value === "success"}
  {#if appManifest}
    <iframe src={appManifest?.url} frameborder="0" class="w-screen h-screen" id="appFrame" on:load={onIframeLoad} />
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
{/if}
