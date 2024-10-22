<script>
  import { onMount } from "svelte";
  import DataPoint from "./DataPoint.svelte";
  import {
    selectedCountryStore,
    relatedNodesDimStore,
    selectedNodeDimStore,
  } from "./stores";
  import { dataStructureDim as dataStructDim } from "./dataStructureDim.js";

  export let level = "";
  export let country;
  export let showLabels = false;
  let room;
  let data = [];
  let gridSize;

  async function fetchData() {
    data = dataStructDim.findNodesBy("level", level);
    gridSize = Math.ceil(Math.sqrt(data.length));
  }

  onMount(async () => {
    await fetchData();
    room.style = "--grid-size: " + gridSize;
  });
</script>

<div
  class="room"
  class:active={$selectedNodeDimStore.level === level}
  class:inactive={!$selectedCountryStore.has(country)}
  bind:this={room}
>
  {#each data as dot}
    <DataPoint
      active={$relatedNodesDimStore.has(dot)}
      data={dot}
      {country}
      {showLabels}
    />
  {/each}
</div>

<style>
  .room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
/*     border: 1px solid var(--main-color); */
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-template-rows: repeat(var(--grid-size), 1fr);
    justify-content: center;
    align-items: center;
  }
  .room.active {
    /* border: 1px solid var(--highlight-color); */
  }

  .room.inactive {
    opacity: 0.2;
  }
</style>
