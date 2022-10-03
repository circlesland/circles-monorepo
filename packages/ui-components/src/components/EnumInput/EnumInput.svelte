<script lang="ts">
  import type { View, EnumInput } from '../../types';

  export let view: View & EnumInput;

  const { testId } = view;
  const { labelConfig, placeholderConfig, type, items } = view.args;

  const inputClass = 'rounded-lg bg-secondary py-2 px-4 text-white';
  const labelClass = 'rounded-lg py-2 px-4 text-primary';
</script>

{#if view}
  <div data-testId={testId}>
    <label class={labelClass} data-i18n-key={labelConfig.localizationKey}
      >{labelConfig.label}</label
    >
    {#if type === 'radio'}
      {#each items as item}
        {item.localizationKey}
        <!-- TODO: Generate some kind of unqiue name -->
        <input type="radio" value={item.value} name="random123" />
      {/each}
    {:else if type === 'multiselect'}
      <select multiple>
        {#each items as item}
          <option value={item.value}>{item.localizationKey}</option>
        {/each}
      </select>
    {:else}
      <select>
        {#each items as item}
          <option value={item.value}>{item.localizationKey}</option>
        {/each}
      </select>
    {/if}
  </div>
{/if}
