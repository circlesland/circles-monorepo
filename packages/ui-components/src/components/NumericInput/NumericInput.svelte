<script lang="typescript">
  import type { View, NumericInput } from '../../types';

  export let view: View & NumericInput;

  const { testId } = view;
  const { labelConfig, placeholderConfig } = view.args;

  const inputClass = 'rounded-full bg-primary py-2 px-4';
  const labelClass = 'rounded-full bg-secondary py-2 px-4';
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
    />
  </div>
{/if}
