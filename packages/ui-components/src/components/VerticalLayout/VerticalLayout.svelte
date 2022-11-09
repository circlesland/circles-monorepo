<script lang="ts">
  import type { VerticalLayout } from '../../types';
  import type { View } from '../../types';
  import { SupportedViews } from '../../types/supported';

  export let view: View & VerticalLayout;

  const classList = 'flex flex-col justify-around flex-wrap max-w-full';
</script>

{#if view && view.children}
  <div data-testId={view.testId} class={classList}>
    {#each view.children as child}
      {#if child.trigger}
        <svelte:component
          this={SupportedViews[child.type]}
          view={child}
        />
      {:else}
        <svelte:component this={SupportedViews[child.type]} view={child} />
      {/if}
    {/each}
  </div>
{/if}
