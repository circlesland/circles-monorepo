<script lang="ts">
  import type { View, LabelType } from '../../types';

  export let view: View & LabelType;

  const { testId } = view;
  $: text = view.args.text;
</script>

{#if view}
  <div data-testId={testId}>
    {text}
  </div>
{/if}
