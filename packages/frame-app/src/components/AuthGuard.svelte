<script lang="ts">
  import { onMount } from "svelte";
  let isUserAuth = false;
  const isAuth = () => {
    const profileData = window.authApi.getDataFromLocalStorage();
    const privateKey = profileData?.privateKey;
    if (privateKey) {
      return true;
    }

    return false;
  };

  const doLogin = (e?: any) => {
    if (e) e.preventDefault();
    window.authApi.login();
  };

  onMount(() => {
    const _isAuth = isAuth();
    isUserAuth = _isAuth;
  });
</script>

{#if isUserAuth}
  <slot />
{:else}
  <div>
    <div><button on:click={doLogin}>click to login</button></div>
  </div>
{/if}
