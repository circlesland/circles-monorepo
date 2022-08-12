<script lang="ts">
  import Home from "./pages/Home.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "../utils/routes";
  import { link } from "svelte-spa-router";
  import Layout from "./components/Layout.svelte";
  import { push, pop, replace } from "svelte-spa-router";
  import { onMount } from "svelte";

  function conditionsFailed(event) {
    replace("/login");
  }
</script>

<main>
  <Router {routes} on:conditionsFailed={conditionsFailed} />
</main>
