<script lang="ts">
  import Center from "./Center.svelte";

  import { createEventDispatcher } from "svelte";

  import type { RuntimeLayout } from "./layout";
  import NavPill from "./NavPill.svelte";
  import ActionButton from "./ActionButton.svelte";

  let dapp = "homepage:1";
  let menuOpen: boolean;

  const eventDispatcher = createEventDispatcher();

  export let layout: RuntimeLayout;

  $: {
    // console.log("LayoutChanged:", layout);
    if (
      (layout?.dialogs.center && layout?.dialogs.center.isOpen) ||
      (layout?.dialogs.left && layout?.dialogs.left.isOpen)
    ) {
      menuOpen = true;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";

      // document.getElementById("main").style.height = "100%";
      document.body.style.height = "100%";
      document.body.style.width = "100%";
    } else {
      menuOpen = false;
      document.body.style.overflow = "inherit";
      document.body.style.position = "inherit";

      // document.getElementById("main").style.height = "inherit";
      document.body.style.height = "inherit";
      document.body.style.width = "inherit";
    }
  }

  function handleClickOutside(event) {
    event.preventDefault();
    console.log("click outside");
  }

  function onkeydown(e: KeyboardEvent) {
    console.log("key down");
  }
</script>

<svelte:window on:keydown={onkeydown} />
{#if layout}
  <div class="absolute flex flex-row w-full overflow-auto">
    <main id="main" class="relative w-full overflow-auto overflow-hidden">
      <div
        class="flex flex-row w-full bg-pagebackground mainContent"
        class:mb-16={layout.dialogs.center && !layout.dialogs.center.isOpen && dapp === "homepage:1"}
        class:blur={layout.dialogs.center && layout.dialogs.center.isOpen}
      >
        <div class="z-50" />
        <div class="flex-grow">
          {#if layout.main}
            <svelte:component this={layout.main.component} {...layout.main.params ? layout.main.params : {}} />
          {/if}
        </div>
        <div />
      </div>
    </main>
  </div>

  <footer
    id="nextnav"
    class="fixed bottom-0 right-0 z-50 grid justify-center w-full h-20
      grid-cols-3 pb-3 auto-cols-max place-content-center text-dark"
  >
    <div class="absolute bottom-0 right-0">
      <a href="/" class="w-2 h-2">&nbsp;</a>
    </div>
  </footer>

  {#if layout.dialogs.center && layout.dialogs.center.isOpen}
    <Center blur={true} on:clickedOutside={handleClickOutside}>
      <svelte:component
        this={layout.dialogs.center.component}
        {...layout.dialogs.center.params ? layout.dialogs.center.params : {}}
      />
    </Center>
  {/if}
{/if}

<style>
  /* Background Blurring for firefox and other non supportive browsers */
  @supports not ((backdrop-filter: blur(4px)) or (-webkit-backdrop-filter: blur(4px))) {
    .blur {
      filter: blur(4px);
      -webkit-transition: all 0.35s ease-in-out;
      -moz-transition: all 0.35s ease-in-out;
      transition: all 0.35s ease-in-out;
      margin: 0;
    }
  }
  main {
    z-index: 9;
  }
  :global(.menu-open main) {
    z-index: 12;
  }
</style>
