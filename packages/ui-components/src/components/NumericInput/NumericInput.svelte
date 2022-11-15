<script lang="ts">
    import { TRIGGER_EVENT_NAME } from '../../constants';
  import type { View, NumericInputType } from '../../types';

  export let view: View & NumericInputType;

  const { testId, trigger } = view;
  const { labelConfig, placeholderConfig, initialvalue } = view.args;

  const inputClass = 'rounded-full bg-primary py-2 px-4';
  const labelClass = 'rounded-full bg-secondary py-2 px-4';

  let value = initialvalue || 0;
  let inputRef;
  function onValueChange(e: Event) {
    const eventName = trigger ?? TRIGGER_EVENT_NAME;
    inputRef.dispatchEvent(new CustomEvent(eventName, { detail: { view, eventDetails: e, value }}))

  }
</script>

{#if view}
  <div data-testId={testId}>
    <label class={labelClass} data-i18n-key={labelConfig.localizationKey}
      >{labelConfig.label}</label
    >
    <input
      type="number"
      class={inputClass}
      placeholder={placeholderConfig.value}
      data-i18n-key={placeholderConfig.localizationKey}
      bind:this={inputRef}
      bind:value={value}
      on:change={onValueChange}
    />
  </div>
{/if}
