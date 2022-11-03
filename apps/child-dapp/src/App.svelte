<script lang="ts">
  import { ChannelProps, PostMessageSink } from '@circlesland/channels';
  import { onMount } from 'svelte';
  import {
    AppCommunicator,
    contextKey as communicatorContextKey,
  } from './communication/appCommunicator';
  import Counter from './components/Counter.svelte';

  let communicator: AppCommunicator = null;
  let sink: PostMessageSink = null;

  onMount(() => {
    sink = new PostMessageSink(window, '*');
  });

  setTimeout(() => {
    sink.receive('initialize', (event) => {
      const containerProps: ChannelProps = {
        window: window.top,
        origin: event?.data?.origin
      };

      const childProps: ChannelProps = {
        window: window,
        origin: window.location.origin
      };
      communicator = new AppCommunicator(childProps, containerProps);

      communicator.receiveEvent('prompt', (event) => {
        console.log("RECEIVED: ", event.data);
      });
    })
  }, 1500)
</script>

<h1>Child Dapp - Getting started to create Dapps</h1>

<Counter />
