<script lang="ts">
  import { ThemeHelper, Themes } from './../../utils/ThemeHelper';
  const changeTheme = (theme: Themes) => {
    ThemeHelper.changeTheme(theme);
  };
</script>

<div class="mt-16">
  <div>
    <button on:click={() => changeTheme(Themes.default)}
      >Change to default</button
    >
    <button on:click={() => changeTheme(Themes.dark)}>Change to dark</button>
  </div>
  <slot />
</div>
