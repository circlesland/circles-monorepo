<script lang="ts">
  import type { View, PictureView } from '../../types';

  export let view: View & PictureView;

  const { testId } = view;
  $: image = view.args.image;

  const inputClass = 'rounded-full bg-secondary py-2 px-4';
  const labelClass = 'rounded-full bg-blue-500 py-2 px-4 text-primary';
</script>

{#if view}
  <img src={image} data-testId={testId} on:click />
{/if}
