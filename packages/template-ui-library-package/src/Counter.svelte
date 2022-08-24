<script lang="ts">
  let count: number = 0
  const increment = () => {
    count += 1
  }

  export let label: string = "I'm a counter from the package library. Click me to increment";
</script>

<button data-testId="increment-button" on:click={increment}>
  {label}
</button>
<br>
<br>
<div data-testId="counter-value">
  Count is: {count}
</div>