<script>
  import { selectedNodeDimStore } from "./stores.js";
  import { colorScale, colorScaleBinary, styleBgColorAuto } from "./colors.js";
  import ScoreTable from "./ScoreTable.svelte";

  export let data;
  export let countries;
</script>

<div
  class="node-table"
  class:selectedTable={$selectedNodeDimStore.level === data.level}
>
  <button on:click={() => selectedNodeDimStore.toggleSelection(data, false)}>
    {#if data.level !== "root"}
      <div class="node-table-title">{data.level}</div>
      <div>{data.label}</div>
    {:else}
      <h2 class="node-table-title">Economies</h2>
    {/if}
  </button>
  <ScoreTable {data} {countries} showCountries={true} />
</div>

<style>
  .node-table {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
  }

  .node-table-title {
    font-size: 1.5em;
    font-weight: bold;
    text-transform: capitalize;
  }

  .node-table-title h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
</style>
