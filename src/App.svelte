<script>
  import { onMount } from "svelte";
  import Tower from "./Tower.svelte";
  import data from "../data/app_data.json";
  import { selectedStore, hoveredStore } from "./stores.js";

  let selected;
  selectedStore.subscribe((value) => (selected = value));

  console.log(data);
</script>

<main>
  <div class="tower">
    <Tower {data} />
  </div>
  <div class="details">
    <p>Selected items:</p>
    <ul>
      {#each Array.from(selected) as item}
        <li>{item}</li>
      {/each}
    </ul>
    <p>Hovered: {$hoveredStore}</p>
  </div>
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

  .details {
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 1em;
    text-align: left;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>
