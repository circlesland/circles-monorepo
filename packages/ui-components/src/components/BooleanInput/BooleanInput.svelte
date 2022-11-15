<script lang="ts">
	import { TRIGGER_EVENT_NAME } from '../../constants';
  import type { ToggleType, View } from '../../types';
  import { BooleanInputType } from './types/booleanInputType';

  export let view: View & ToggleType;

  const { id, testId, args, trigger } = view;
  const { type, labelConfig, checked } = args;

  let value = checked;

  let editorRef;
  function onValueChange(e: Event) {
    const eventName = trigger ?? TRIGGER_EVENT_NAME;
    editorRef.dispatchEvent(new CustomEvent(eventName, { detail: { view, eventDetails: e, value }}))
  }
</script>

{#if type === BooleanInputType.Checkbox}
  <div class="flex items-center mb-4">
    <input
      {id}
      data-testId={testId}
      type="checkbox"
      bind:this={editorRef}
      bind:checked={value}
      on:change={onValueChange}
      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    />
    <label
      for={id}
      data-i18n-key={labelConfig?.localizationKey}
      class="ml-2 text-sm font-medium text-black-900 dark:text-black-300"
      >{labelConfig?.label}</label
    >
  </div>
{:else}
  <label for={id} class="inline-flex relative items-center cursor-pointer">
    <input
      {id}
      data-testId={testId}
      type="checkbox"
      class="sr-only peer"
      bind:this={editorRef}
      bind:checked={value}
      on:change={onValueChange}
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    />
    <span
      data-i18n-key={labelConfig?.localizationKey}
      class="ml-3 text-sm font-medium text-black-900 dark:text-black-300"
      >{labelConfig?.label}</span
    >
  </label>
{/if}
