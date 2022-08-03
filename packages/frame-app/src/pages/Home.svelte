<script lang="ts">
  import { ceramic, getCeramicSeed, getProfileFromCeramic, updateProfileOnCeramic } from "./../../utils/CeramicHelpers";
  import { FrameCommunicator } from "./../../utils/FrameCommunicator";
  import { onMount } from "svelte";

  import { DID } from "dids";

  import { Ed25519Provider } from "key-did-provider-ed25519";
  import KeyResolver from "key-did-resolver";

  let profileData;
  let address: string;
  let appUrl = "https://framedapp.circles.land";

  const loadProfileData = async () => {
    profileData = window.authApi.getDataFromLocalStorage();
    const privateKey = profileData?.privateKey;
    if (privateKey) {
      const signature = await getCeramicSeed(privateKey);

      const provider = new Ed25519Provider(signature);

      const did = new DID({ provider, resolver: KeyResolver.getResolver() });
      await did.authenticate();

      ceramic.setDID(did);

      const res = await getProfileFromCeramic();
      console.log("update res", res);
    }
  };

  onMount(async () => {
    // Get user data base64 string from url and save it to localStorage
    const _url = new URL(window.location.toString());
    const userDataParam = _url.searchParams.get("user_data");
    if (userDataParam) window.authApi.processAuth(userDataParam);

    loadProfileData();

    const iframeEl = document.getElementById("myIframe");

    const frameCommunicator = new FrameCommunicator(
      {
        // @ts-ignore
        chainId: window?.ethereum?.networkVersion || 100,
        address,
      },
      appUrl,
      iframeEl as HTMLIFrameElement
    );

    // TODO: Move this
    window.addEventListener("message", function (message) {
      frameCommunicator.handleMessage(message);
      console.log("event", message);

      if (message?.data?.method === "login") {
        login();
      } else if (message?.data?.method === "logout") {
        logout();
      }
    });
  });

  const login = (e?: any, testAccount?: number) => {
    if (e) e.preventDefault();
    window.authApi.login(testAccount);
  };
  const logout = () => {
    window.authApi.logout();
    window.location.reload();
  };
</script>

<div>
  <p class="text-gray-600 text-4xl mt-8">
    Hello from the frame app :) {profileData?.name || profileData?.email || ""}
  </p>

  {#if address}
    <p>Address: {address}</p>
  {/if}
  <div class="flex space-x-16">
    <div><button on:click={login}>login</button></div>
    <div><button on:click={(e) => login(e, 0)}>login test account 1</button></div>
    <div><button on:click={logout}>logout</button></div>
  </div>
  <!-- <iframe src={appUrl} frameborder="0" width="100%" height="100%" class="h-screen w-screen" id="myIframe" /> -->
</div>
