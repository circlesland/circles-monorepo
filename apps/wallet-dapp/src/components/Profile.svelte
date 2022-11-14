<script lang="ts">
  import type { Profile } from "src/types";

  import QrCode from "./QrCode.svelte";
  import WalletHeader from "./WalletHeader.svelte";

  export let profile: Profile;
</script>

<WalletHeader {profile} />

{#if profile}
  <div class="flex flex-col px-4 mx-auto mb-20 -mt-3 space-y-6 md:w-2/3 xl:w-1/2">
    <div class="flex flex-col w-full p-4 space-y-4 bg-white rounded-lg shadow-md cardborder">
      <section class="justify-center">
        <div class="flex flex-col w-full space-y-2">
          <div class="text-left text-2xs text-dark-lightest">QR Code</div>
          <div class="container">
            <center>
              {#if profile?.address}
                <QrCode value={profile.address} />
              {/if}
            </center>
          </div>
        </div>
      </section>
    </div>
    <div class="flex flex-col w-full p-4 space-y-4 bg-white rounded-lg shadow-md cardborder">
      {#if profile.address}
        <section class="justify-center">
          <div class="flex flex-col w-full space-y-1">
            <div class="text-left text-2xs text-dark-lightest">Address</div>

            <div class="flex items-center w-full space-x-2 sm:space-x-4">
              <div class="text-left">
                <div class="inline-block break-all" id="clipboard">
                  {#if profile}
                    {profile.address ? profile.address : ""}
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </section>
      {/if}
    </div>
  </div>
{/if}
