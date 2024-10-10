<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import ColorLegend from "./ColorLegend.svelte";
</script>

<main>
  <Hover />
  <div class="tower">
    <h1>Western Balkans<br />Competitiveness Data Hub</h1>
    <Tower />
    <ColorLegend />
  </div>
  <Details />
</main>

<style>
  .tower {
    overflow: hidden;
  }
  main {
    text-align: center;
    margin: 0 auto;
    display: grid;
    /* grid-template-columns: 61.803% 38.197%; */
    grid-template-columns: 40% 60%;
    grid-template-rows: 100%;
    width: 100%;
    height: 100%;
  }
</style>
