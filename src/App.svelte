<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import CountryList from "./CountryList.svelte";
  import ColorLegend from "./ColorLegend.svelte";
  import Header from "./Header.svelte";
  import About from "./About.svelte";
  $: showAbout = false;
  function handleAbout() {
    showAbout = !showAbout;
    console.log("about");
  }
</script>

<main>
  <Header on:about={handleAbout} />
  <Hover />
  <div class="tower">
    <CountryList />
    <Tower />
    <ColorLegend />
  </div>
  {#if showAbout}
    <About on:about={handleAbout} />
  {:else}
    <Details />
  {/if}
</main>

<style>
  .tower {
    overflow: hidden;
    position: relative;
  }
  main {
    position: relative;
    text-align: center;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: auto 1fr;
    height: 100%;
    width: 100%;
  }
</style>
