<script lang="typescript">
import type { View, Button } from "../../types";

export let view: View & Button;

const { testId } = view;
const { label, localizationKey } = view.args.labelConfig;

// TailwindCSS class list -> TODO: Customize this based on button types
const classes = 'rounded-full bg-blue-500 py-2 px-4';
</script>

<!-- TODO: Render button based on button config (icon-rounded, icon with text, etc) -->
{#if view}
  <button class={classes} data-testId={testId} data-i18n-key={localizationKey}>{label}</button>
{/if}