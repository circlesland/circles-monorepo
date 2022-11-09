<script lang="ts">
	import { DEFAULT_CIRCULAR_BUTTON_WIDTH, DEFAULT_CIRCULAR_BUTTON_HEIGHT} from './constants';
  import type { View, ButtonType } from "../../types";
  import { ButtonTypes, type CustomButtonTheme } from "./types";
  import Icon from '@krowten/svelte-heroicons/Icon.svelte';

  export let view: View & ButtonType;

  const { testId, args, trigger } = view;
  const { labelConfig, type, customTheme, icon } = args;
  const { localizationKey, label} = labelConfig || {};

function getCircularButtonWidth(customTheme: CustomButtonTheme): number {
    const { width } = customTheme || {};
    if (width) {
      return width;
    }
    return DEFAULT_CIRCULAR_BUTTON_WIDTH;
  };

  function getCircularButtonHeight(customTheme: CustomButtonTheme): number {
    const { height } = customTheme || {};

    if (height) {
      return height;
    }
    return DEFAULT_CIRCULAR_BUTTON_HEIGHT
  }

  function getButtonClass(type: ButtonTypes): string {
    // TODO: Return theme colors
    const baseClass = 'bg-blue-300 hover:bg-blue-700 text-white cursor-pointer text-sm';
    switch(type) {
      case ButtonTypes.CircularWithIcon: {
        const width = getCircularButtonWidth(customTheme);
        const height = getCircularButtonHeight(customTheme);
        return `${baseClass} w-${width} h-${height} rounded-full flex justify-center items-center`;
      }
      case ButtonTypes.IconText: {
        return `${baseClass} px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 font-bold py-2.5 px-5 rounded-full flex justify-center items-center text-center`;
      }
      default: return `${baseClass} font-bold py-2 px-4 rounded-full`;
    }
  };
  
  let buttonRef;
  function handleButtonClick(e) {
    const eventName = trigger ?? 'trigger';
    buttonRef.dispatchEvent(new CustomEvent(eventName, { detail: { view, eventDetails: e }}))
  }
</script>

{#if view}
  {#if type === ButtonTypes.CircularWithIcon}
    <button
      bind:this={buttonRef}
      class={getButtonClass(type)}
      data-testId={testId}
      on:click={handleButtonClick}
    >
      <Icon
        data-testid={`${testId}-icon`}
        class="ml-1 mt-1 w-6 h-6"
        name={icon.source}
        solid={icon.solid}
      />
    </button>
  {:else if type === ButtonTypes.IconText}
    <button
      bind:this={buttonRef}
      class={getButtonClass(type)}
      data-testId={testId}
      data-i18n-key={localizationKey}
      on:click={handleButtonClick}
    >
      <Icon
        data-testid={`${testId}-icon`}
        class="mr-1.5 -ml-1.5 mt-1 w-6 h-6"
        name={icon.source}
        solid={icon.solid}
      />
      {label}
    </button>
  {:else}
    <button
      bind:this={buttonRef}
      class={getButtonClass(type)}
      data-testId={testId}
      data-i18n-key={localizationKey}
      on:click={handleButtonClick}
    >
      {label}</button
    >
  {/if}
{/if}
