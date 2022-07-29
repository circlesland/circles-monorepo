<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  export let icon: string;

  const dispatcher = createEventDispatcher();

  let profileData;

  const login = (e: any, testAccount?: number) => {
    e.preventDefault();
    window.authApi.login(testAccount);
  };
  const logout = () => {
    window.authApi.logout();
    window.location.reload();
  };

  const loadProfileData = async () => {
    profileData = window.authApi.getDataFromLocalStorage();
    console.log("profile", profileData);
  };

  onMount(async () => {
    loadProfileData();
  });
</script>

{#if !profileData}
  <div on:click={login} class="bg-pink-300 rounded-full py-2 px-8">Login</div>
{:else}
  <div on:click={logout} class="bg-pink-300 rounded-full py-2 px-8">Logout</div>
{/if}
