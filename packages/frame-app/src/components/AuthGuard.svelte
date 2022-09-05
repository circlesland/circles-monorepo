<script lang="ts">
  import { AuthService } from '../../services/AuthService';

  import { onMount } from 'svelte';
  let isUserAuth = false;
  const isAuth = () => {
    const profileData = AuthService.getDataFromLocalStorage();
    const privateKey = profileData?.privateKey;
    if (privateKey) {
      return true;
    }

    return false;
  };

  const doLogin = (e?: any) => {
    if (e) e.preventDefault();
    AuthService.login();
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
