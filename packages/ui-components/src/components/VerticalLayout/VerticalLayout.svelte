<!-- svelteStrictMode: true -->
<script lang="ts">
  import type { VerticalLayout } from '../../types';
  import { SupportedViews } from '../../types';
  import type { View } from '../../types';

  export let view: View & VerticalLayout;

  const classList = 'flex flex-col justify-around flex-wrap max-w-full';
</script>

{#if view && view.children}
  <div data-testId={view.testId} class={classList}>
    {#each view.children as child}
      <svelte:component this={SupportedViews[child.type]} view={child} />
    {/each}
  </div>
{/if}
