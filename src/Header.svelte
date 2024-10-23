<script>
  import SlideManager from "./SlideManager.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  function handleAbout() {
    dispatch("about", {});
  }
</script>

<header>
  <div class="infoBar">
    <img class="logo" src="oecd.svg" alt="OECD Logo" />
    <div class="infos">
      <a href="https://westernbalkans-competitiveness.oecd.org/methodology/"
        >Methodology</a
      >
      <a href="#about" on:click|preventDefault={handleAbout}>About</a>
    </div>
  </div>
  <div class="titleBar">
    <div>
      <h1 class="title">Western Balkans<br />Competitiveness Data Hub</h1>
    </div>
    <div><SlideManager /></div>
  </div>
</header>

<style>
  .title {
    margin: 0;
    padding: 0.5em 0 0.5em 0.5em;
  }
  .infoBar {
    background-color: var(--main-color);
    color: var(--background-color);
    width: 100%;
    height: 1.5em;
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .infoBar a {
    color: var(--background-color);
    margin-right: 0.5em;
  }
  .titleBar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--main-color);
  }
  header {
    grid-column: 1 / span 2;
  }
  .logo {
    height: 1.5em;
    margin-left: 0.5em;
  }
</style>
