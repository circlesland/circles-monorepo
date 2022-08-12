<script lang="ts">
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  export let params = {};

  import rootManifest from "../../apps/root.json";

  let appManifest;
  onMount(() => {
    appManifest = rootManifest.find((app) => app.id === params.appId);
    console.log(appManifest);
  });
</script>

<div>AppView page for app {appManifest?.id} - <a href="/" use:link>go back to loader</a></div>

{#if appManifest}
<iframe src="{appManifest.url}" frameborder="0" class="w-screen h-screen"></iframe>
{/if}
