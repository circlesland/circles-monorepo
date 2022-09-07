<script lang="ts">
  import { AuthService } from '../../services/AuthService';

  const doLogin = (e?: any) => {
    if (e) e.preventDefault();
    AuthService.login();
  };
</script>

<div><button on:click={doLogin}>click to login</button></div>
