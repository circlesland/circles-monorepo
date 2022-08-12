<script lang="ts">
  const doLogin = (e?: any) => {
    if (e) e.preventDefault();
    window.authApi.login();
  };
</script>

<div><button on:click={doLogin}>click to login</button></div>
