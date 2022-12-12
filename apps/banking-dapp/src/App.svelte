<script lang="ts">
	import { Button, ViewType } from '@circlesland/ui-components';
	import { DuplexChannel, PostMessageSink, PostMessageSource } from '@circlesland/channels';
    import type { IDuplexChannel } from '@circlesland/interfaces-channels';
    import { onMount } from 'svelte';
    import { FundsLabel } from "./components";
    import { Currency } from "./components/FundsLabel/types";

    // TODO: Get this information from the profile
    let balance = 200;
    let balanceCurrency = Currency.EUR;

    let source: PostMessageSource = null;
    let sink: PostMessageSink = null;
    let channel: IDuplexChannel = null;

    function handleInitialization(e) {
        source = new PostMessageSource(window.top, e.data.sinkOrigin);
        sink = new PostMessageSink(window, window.location.origin);

        channel = new DuplexChannel(source, sink);

        window.removeEventListener('message', handleInitialization);
    }

    onMount(() => {
        window.addEventListener('message', handleInitialization);
    });

    const buttonView = {
        id: 'edit-funds-button',
        testId: 'edit-funds-button',
        type: ViewType.Button,
        args: {
            labelConfig: {
                label: 'Click me to send an event',
                localizationKey: 'button'
            }
        },
        trigger: 'edit-funds-button'
    };

    function handleButtonClick() {
        channel.endpoint.send({
            type: 'safeDappSdkMessage',
            id: '15'
        });
    }

    document.addEventListener(buttonView.trigger, handleButtonClick);
</script>

<div class="flex flex-col h-full">
    <div class="basis-1/5 bg-gradient-to-r from-blue-500 to-green-500">
        <FundsLabel balance={balance} balanceCurrency={balanceCurrency}></FundsLabel>
    </div>
    <Button view={buttonView}></Button>
    <div class="bg-blue-200 grow"></div>
</div>