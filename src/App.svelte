<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import ColorLegend from "./ColorLegend.svelte";
</script>

<header>
  <div class="bar">
    <img class="logo" src="public/oecd.svg" alt="OECD Logo" />
  </div>
  <h1 class="title">Western Balkans<br />Competitiveness Data Hub</h1>
</header>
<main>
  <Hover />
  <div class="tower">
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
    grid-template-columns: 40% 60%;
    grid-template-rows: 100%;
    height: 100%;
    width: 100%;
  }
  .title {
    border-bottom: 1px solid var(--main-color);
    margin: 0;
    padding: 0.5em 0 0.5em 0.5em;
  }
  .bar {
    background-color: var(--main-color);
    color: var(--background-color);
    width: 100%;
    height: 1em;
  }
  .logo {
    height: 1em;
  }
</style>
