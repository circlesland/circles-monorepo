<script lang="ts">
  import KeyResolver from "key-did-resolver";
  import Home from "./pages/Home.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "../utils/routes";
  import { link } from "svelte-spa-router";
  import Layout from "./components/Layout.svelte";
  import { push, pop, replace } from "svelte-spa-router";
  import { onMount } from "svelte";
  import Center from "./components/Center.svelte";
  import { ceramic, getCeramicSeed } from "../utils/CeramicHelpers";
  import { Ed25519Provider } from "key-did-provider-ed25519";
  import { DID } from "dids";

  function conditionsFailed(event) {
    replace("/login");
  }
</script>

<main>
  <Layout>
    <Router {routes} on:conditionsFailed={conditionsFailed} />
  </Layout>
</main>
