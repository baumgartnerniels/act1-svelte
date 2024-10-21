<script>
  import { selectedNodeDimStore } from "./stores.js";
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
      <h1>{data.label}</h1>
      <p class="node-table-title">{data.level}</p>
    {:else}
      <h1 class="node-table-title">Economies</h1>
    {/if}
  </button>
  <ScoreTable {data} {countries} showCountries={false} />
</div>

<style>
  .node-table {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 1em 0 1em;
    border-left: 1px solid var(--main-color);
    border-bottom: 1px solid var(--main-color);
  }

  button h1 {
    margin: 0;
  }
  button p {
    text-transform: capitalize;
    margin: 0;
  }
</style>
