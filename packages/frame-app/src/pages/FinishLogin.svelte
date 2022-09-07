<script lang="ts">
  import { AuthService } from '../../services/AuthService';

  import { onMount } from 'svelte';
  import { push, pop, replace } from 'svelte-spa-router';

  onMount(async () => {
    // Get user data base64 string from url and save it to localStorage
    const _url = new URL(window.location.toString());
    const userDataParam = _url.searchParams.get('user_data');
    if (userDataParam) AuthService.processAuth(userDataParam);

    replace('/');
  });
</script>

<div>Loading...</div>
