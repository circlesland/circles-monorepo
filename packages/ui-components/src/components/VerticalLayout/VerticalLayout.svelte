<!-- svelteStrictMode: true -->
<script lang="ts">
  import type { VerticalLayout } from '../../types';
  import { SupportedViews } from '../../types';
  import type { View } from '../../types';

  export let view: View & VerticalLayout;

  const classList = 'flex flex-col justify-around flex-wrap max-w-full';

  const trigger = (trg: string) => {
    window.parent.postMessage(
      {
        method: trg,
        requestId: '123',
      },
      '*'
    );
  };
</script>

{#if view && view.children}
  <div data-testId={view.testId} class={classList}>
    {#each view.children as child}
      {#if child.trigger}
        <svelte:component
          this={SupportedViews[child.type]}
          view={child}
          on:click={() => trigger(child.trigger)}
        />
      {:else}
        <svelte:component this={SupportedViews[child.type]} view={child} />
      {/if}
    {/each}
  </div>
{/if}
