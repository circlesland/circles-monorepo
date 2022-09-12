<script lang="typescript">
  import type { View, TextInput } from '../../types';

  export let view: View & TextInput;

  const { testId } = view;
  const { labelConfig, placeholderConfig, minLength, maxLength, type } =
    view.args;

  const inputClass = 'rounded-full bg-blue-500 py-2 px-4';
  const labelClass = 'rounded-full bg-blue-500 py-2 px-4';
</script>

{#if view}
  <div data-testId={testId}>
    <label class={labelClass} data-i18n-key={labelConfig.localizationKey}
      >{labelConfig.label}</label
    >
    <input
      {type}
      class={inputClass}
      minlength={minLength}
      maxlength={maxLength}
      placeholder={placeholderConfig.value}
      data-i18n-key={placeholderConfig.localizationKey}
    />
  </div>
{/if}
