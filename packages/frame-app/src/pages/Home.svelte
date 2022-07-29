<script lang="ts">
  import { FrameCommunicator } from "./../../utils/FrameCommunicator";
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import SafeAppsSDK from "@gnosis.pm/safe-apps-sdk";
  import {
    getSDKVersion,
    SDKMessageEvent,
    MethodToResponse,
    Methods,
    SafeInfo,
    MessageFormatter,
    RequestId,
    BaseTransaction,
    RPCPayload,
  } from "@gnosis.pm/safe-apps-sdk";

  let profileData;
  let address: string;
  let appUrl = "https://framedapp.circles.land";

  const loadProfileData = async () => {
    profileData = window.authApi.getDataFromLocalStorage();

    if (profileData?.privateKey) {
      const privateKey = "0x" + profileData.privateKey;
      const wallet = new ethers.Wallet(privateKey);
      address = wallet.address;
      const signature = await wallet.signMessage("my awesome message");
      console.log("signed msg", signature);
      // const signingKey = new ethers.utils.SigningKey(privateKey);
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
  <!-- <p class="text-gray-600 text-4xl mt-8">
    Hello from the frame app :) {profileData?.name || profileData?.email || ""}
  </p>

  {#if address}
    <p>Address: {address}</p>
  {/if}
  <div class="flex space-x-16">
    <div><button on:click={login}>login</button></div>
    <div><button on:click={(e) => login(e, 0)}>login test account 1</button></div>
    <div><button on:click={logout}>logout</button></div>
  </div> -->

  <iframe src={appUrl} frameborder="0" width="100%" height="100%" class="h-screen w-screen" id="myIframe" />
</div>
