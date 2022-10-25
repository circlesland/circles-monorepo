<script lang="ts">
  import type { View, LabelType } from '../../types';

  export let view: View & LabelType;

  const { testId } = view;
  const { text } = view.args;

  const inputClass = 'rounded-full bg-secondary py-2 px-4';
  const labelClass = 'rounded-full bg-blue-500 py-2 px-4 text-primary';
</script>

{#if view}
  <div data-testId={testId}>
    {text}
  </div>
{/if}
