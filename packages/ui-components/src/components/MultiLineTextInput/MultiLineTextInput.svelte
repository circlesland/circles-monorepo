<script lang="ts">
  import type { View, MultiLineTextInput } from '../../types';

  export let view: View & MultiLineTextInput;

  const { testId } = view;
  const { labelConfig, placeholderConfig, rows, cols } = view.args;

  const inputClass = 'rounded-lg bg-secondary py-2 px-4 text-white';
  const labelClass = 'rounded-lg py-2 px-4 text-primary';
</script>

{#if view}
  <div data-testId={testId} class="flex flex-col">
    <label class={labelClass} data-i18n-key={labelConfig.localizationKey}
      >{labelConfig.label}</label
    >
    <textarea
      class={inputClass}
      placeholder={placeholderConfig.value}
      data-i18n-key={placeholderConfig.localizationKey}
      rows={rows || 4}
      cols={cols || 50}
    />
  </div>
{/if}
