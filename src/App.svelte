<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import CountryList from "./CountryList.svelte";
  import ColorLegend from "./ColorLegend.svelte";
</script>

<main>
  <header>
    <div class="bar">
      <img class="logo" src="/oecd.svg" alt="OECD Logo" />
      <div class="infos">
        <a href="https://westernbalkans-competitiveness.oecd.org/dimensions/"
          >Policy Dimensions</a
        >
        <a href="https://westernbalkans-competitiveness.oecd.org/methodology/"
          >Methodology</a
        >
        <a href="https://westernbalkans-competitiveness.oecd.org/about/"
          >About</a
        >
      </div>
    </div>
    <h1 class="title">Western Balkans<br />Competitiveness Data Hub</h1>
  </header>
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
  .title {
    border-bottom: 1px solid var(--main-color);
    margin: 0;
    padding: 0.5em 0 0.5em 0.5em;
  }
  .bar {
    background-color: var(--main-color);
    color: var(--background-color);
    width: 100%;
    height: 1.5em;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .bar a {
    color: var(--background-color);
    margin-right: 0.5em;
  }

  header {
    grid-column: 1 / span 2;
  }
  .logo {
    height: 1.5em;
    margin-left: 0.5em;
  }
</style>
