<script lang="ts">
  import { ChannelProps, PostMessageSource } from '@circlesland/channels';
  import { onMount } from 'svelte';
  import {
    AppCommunicator,
    contextKey as communicatorContextKey,
  } from './communication/appCommunicator';

  let communicator: AppCommunicator = null;
  let source: PostMessageSource = null;

  onMount(() => {
    // Get a reference to the iframe and build the app communicator
    const childFrame = document.getElementById(
      'child'
    ) as HTMLIFrameElement;
    
    const containerProps: ChannelProps = {
      window: window,
      origin: window.location.origin
    };

    const childProps: ChannelProps = {
      window: childFrame?.contentWindow,
      origin: 'http://localhost:4000' // TODO: Get this from the child app manifest
    };

    communicator = new AppCommunicator(containerProps, childProps);

    source = new PostMessageSource(childFrame?.contentWindow, '*');
  });

  setTimeout(() => {
    /* Need to send an "initialize" event to the loaded app with information about the container
      - window origin for configuring communicator between frames
      - Any other information the loaded app requires
    */
    source.emit({ type: 'initialize', data: { origin: 'http://localhost:4444' }}); // TODO: The URL would be provided via env or smth

    // Communicator would send events when triggered by user actions
    communicator.sendEvent({ type: 'prompt', data: { id: 1, data: 'Prompt configuration object here!!!' }});
  }, 2000);

</script>

<h1>Template Dapp - Getting started to create Dapps</h1>

<iframe
  title="Child Dapp"
  id="child"
  name="child"
  src="http://localhost:4000"
/>

<style>
  #child-dapp {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
