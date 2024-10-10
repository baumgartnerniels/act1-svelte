<script>
  import { onMount } from "svelte";
  import DataPoint from "./DataPoint.svelte";
  import { selectedStore } from "./stores";

  export let data = [];
  export let store;
  export let showLabels = false;

  let gridSize = Math.ceil(Math.sqrt(data.length));

  let room;

  $: active = data[0].level == Array.from($selectedStore)[0].level;

  onMount(() => {
    room.style = "--grid-size: " + gridSize;
  });
</script>

<div class="room" class:active bind:this={room}>
  {#each data as dot}
    <DataPoint data={dot} {store} {showLabels} />
  {/each}
</div>

<style>
  .room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid var(--main-color);
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    grid-template-rows: repeat(var(--grid-size), 1fr);
    justify-content: center;
    align-items: center;
  }
  .room.active {
    border: 2px solid var(--highlight-color);
  }
</style>
