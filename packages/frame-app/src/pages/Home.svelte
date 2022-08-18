<script lang="ts">
  import AuthGuard from "./../components/AuthGuard.svelte";
  import CompleteProfileForm from "./../components/CompleteProfileForm.svelte";
  import rootManifest from "../../apps/root.json";
  import { link } from "svelte-spa-router";
  const logout = () => {
    window.authApi.logout();
    window.location.reload();
  };

  import { interpret } from "xstate";
  import { toggleMachine } from "../../xstate/user-profile-machine";

  const toggleService = interpret(toggleMachine).start();
</script>

<div>
  <div><button on:click={logout}>logout</button></div>

  {#if $toggleService?.value === "success"}
    <p>Welcome to the loader {$toggleService?.context?.profile?.name}</p>

    <div class="flex items-center space-x-16">
      {#each rootManifest as app}
        <div class="p-8 border border-blue-100"><a href={"/app/" + app.id} use:link>{app.label}</a></div>
      {/each}
    </div>
  {/if}
</div>
