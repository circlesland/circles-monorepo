<script lang="ts">
  import AuthGuard from "./../components/AuthGuard.svelte";
  import CompleteProfileForm from "./../components/CompleteProfileForm.svelte";

  import { onMount } from "svelte";

  onMount(async () => {
    // Get user data base64 string from url and save it to localStorage
    const _url = new URL(window.location.toString());
    const userDataParam = _url.searchParams.get("user_data");
    if (userDataParam) window.authApi.processAuth(userDataParam);
  });

  const logout = () => {
    window.authApi.logout();
    window.location.reload();
  };

  import { interpret } from "xstate";
  import { toggleMachine } from "../../xstate/user-profile-machine";

  const toggleService = interpret(toggleMachine).start();
</script>

<AuthGuard>
  <div>
    <div><button on:click={logout}>logout</button></div>

    {#if $toggleService?.value === "success"}
      <p>Welcome to the loader {$toggleService?.context?.profile?.name}</p>
    {:else}
      <CompleteProfileForm />
    {/if}
  </div>
</AuthGuard>
