<script lang="ts">
	import { DEFAULT_CIRCULAR_BUTTON_WIDTH, DEFAULT_CIRCULAR_BUTTON_HEIGHT} from './constants';
  import type { View, ButtonType } from "../../types";
  import { ButtonTypes, type CustomButtonTheme } from "./types";
  import { Icon } from '@steeze-ui/svelte-icon';

  export let view: View & ButtonType;

  const { testId, args } = view;
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
    const baseClass = 'bg-blue-300 hover:bg-blue-700 text-white cursor-pointer';
    switch(type) {
      case ButtonTypes.CircularWithIcon: {
        const width = getCircularButtonWidth(customTheme);
        const height = getCircularButtonHeight(customTheme);
        return `${baseClass} w-${width} h-${height} rounded-full flex justify-center items-center`;
      }
      case ButtonTypes.IconText: {
        return `${baseClass} font-bold py-2 px-4 rounded-full inline-flex items-center`;
      }
      default: return `${baseClass} font-bold py-2 px-4 rounded-full`;
    }
  };
</script>

{#if view}
  {#if type === ButtonTypes.CircularWithIcon}
    <button class={getButtonClass(type)} data-testId={testId}>
      <Icon src="{icon.source}" size="24" solid="{icon.solid}" />
    </button>
  {:else if type === ButtonTypes.IconText}
    <button
      class={getButtonClass(type)}
      data-testId={testId}
      data-i18n-key={localizationKey}>
        <Icon class="mr-2" src="{icon.source}" size="24" solid="{icon.solid}" />
        {label}
    </button>
  {:else}
      <button
      class={getButtonClass(type)}
      data-testId={testId}
      data-i18n-key={localizationKey}>{label}</button>
  {/if}
{/if}
