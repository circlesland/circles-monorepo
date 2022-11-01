<script lang="ts">
  import type {
    IChannel,
    IDuplexChannel,
  } from '@circlesland/interfaces-channels';
  import type { VerticalLayout } from '../../types';
  import {
    DuplexChannel,
    PostMessageSink,
    PostMessageSource,
  } from '@circlesland/channels/src';
  import type { View } from '../../types';
  import { SupportedViews } from '../../types/supported';

  export let view: View & VerticalLayout;

  const classList = 'flex flex-col justify-around flex-wrap max-w-full';

  const trigger = (trg: string) => {
    const source = new PostMessageSource(window.parent, '*');
    const sink = new PostMessageSink(window, window.location.origin);

    const duplexChannel: IDuplexChannel = new DuplexChannel(source, sink);

    duplexChannel.endpoint.send({
      id: '2',
      type: 'safeDappSdkMessage',
      method: trg,
      requestId: '1234',
    });
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
