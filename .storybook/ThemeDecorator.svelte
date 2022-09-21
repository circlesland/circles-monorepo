<script>
  export let theme;
</script>

<div data-theme={theme || 'default'}>
  <slot />
</div>
