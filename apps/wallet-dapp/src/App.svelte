<script lang="ts">
  import { onMount } from 'svelte';
  import Profile from './components/Profile.svelte';
  import {
    DuplexChannel,
    PostMessageSink,
    PostMessageSource,
    StatefulEndpoint,
  } from '@circlesland/channels/src';
  import type { IStatefulEndpoint } from '@circlesland/interfaces-channels';
  let profile;

  onMount(() => {
    (async () => {
      const source = new PostMessageSource(window.parent, '*');
      const sink = new PostMessageSink(window, window.location.origin);

      const duplexChannel = new DuplexChannel(source, sink);

      const dappEndpoint = new StatefulEndpoint(duplexChannel.endpoint, 5500);

      const initResponse = await dappEndpoint.request({
        id: '1',
        type: 'safeDappSdkMessage',
        method: 'init',
        requestId: '123',
      });

      profile = initResponse;
    })();
  });
</script>

<div class="bg-gray-200"><Profile {profile} /></div>
