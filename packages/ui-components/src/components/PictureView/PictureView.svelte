<script lang="ts">
  import type { View, PictureView } from '../../types';

  export let view: View & PictureView;

  const { testId } = view;
  $: image = view.args.image;
</script>

{#if view}
  <img src={image} data-testId={testId} on:click />
{/if}
