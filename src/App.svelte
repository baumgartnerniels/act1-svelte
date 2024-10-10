<script>
  import Tower from "./Tower.svelte";
  import Hover from "./Hover.svelte";
  import Details from "./Details.svelte";
  import { selectedStore, hoveredStore, countryStore } from "./stores.js";
</script>

<main>
  <Hover />
  <div class="tower">
    <Tower />
  </div>
  <Details />
  <!-- <p>Selected countries:</p>
    <ul>
      {#each Array.from($countryStore) as item}
        <li>{item.key}</li>
      {/each}
    </ul>
    <p>Selected items:</p>
    <ul>
      {#each Array.from($selectedStore) as item}
        <li>{item.key}</li>
      {/each}
    </ul>
    <p>Hovered: {$hoveredStore}</p> -->
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
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    width: 100%;
    height: 100%;
  }
</style>
