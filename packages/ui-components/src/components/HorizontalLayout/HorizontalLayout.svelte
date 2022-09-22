<script lang="ts">
  import type { HorizontalLayoutType, View } from '../../types';
  import { ViewType, SupportedViews } from '../../types';

  export let view: View & HorizontalLayoutType;

  const classList = 'flex justify-around flex-wrap max-w-full';
</script>

{#if view && view.children}
  <div data-testId={view.testId} class={classList}>
    {#each view.children as child}
      <!-- Container Views(Ex: Layouts) need to be verified by type explicitly to avoid circular dependencies -->
      {#if child.type === ViewType.HORIZONTAL_LAYOUT}
        <svelte:self view={child} />
      {:else}
        <svelte:component this={SupportedViews[child.type]} view={child} />
      {/if}
    {/each}
  </div>
{/if}
