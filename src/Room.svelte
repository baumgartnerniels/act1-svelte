<script>
  import { onMount } from "svelte";
  import DataPoint from "./DataPoint.svelte";

  export let data = [];
  export let store;

  let gridSize = Math.ceil(Math.sqrt(data.length));

  let room;

  onMount(() => {
    room.style = "--grid-size: " + gridSize;
  });
</script>

<div class="room" bind:this={room}>
  {#each data as dot}
    <DataPoint data={dot} {store} />
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
</style>
