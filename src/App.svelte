<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import CountryList from "./CountryList.svelte";
  import ColorLegend from "./ColorLegend.svelte";
  import Header from "./Header.svelte";
</script>

<main>
  <Header />
  <Hover />
  <div class="tower">
    <CountryList />
    <Tower />
    <ColorLegend />
  </div>
  <Details />
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
