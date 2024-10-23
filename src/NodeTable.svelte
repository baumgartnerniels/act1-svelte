<script>
  import { selectedNodeDimStore, hoveredStore } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { levelColors } from "./colors.js";

  export let data;
  export let countries;
  export let n;
</script>

<div
  class="table-wrapper"
  style="--n: {n}"
  class:selectedTable={$selectedNodeDimStore.level === data.level}
>
  <button
    class="node-table table-border"
    class:selectedTable={$selectedNodeDimStore.level === data.level}
    on:click={() => selectedNodeDimStore.toggleSelection(data, true)}
    on:mouseenter={() => {
      if (data.level === "levels") return;
      hoveredStore.set(data.label);
      console.log($hoveredStore);
    }}
    on:mouseleave={() => {
      hoveredStore.set("");
    }}
    style="--border-width: {n * 3}%; --n: {n}"
  >
    <div>
      <button class="node-table-text" style="--n: {n}; --levelColor: {levelColors[n - 1]};">
        {#if data.level !== "root"}
          {#if data.level == "dimensions" || data.level == "subdimensions"}
            <h1 style="color: {levelColors[n - 1]}">
              {data.label}
            </h1>
          {:else}
            <h1 style="color: {levelColors[n - 1]}">{data.label}</h1>
          {/if}
        {:else}
          <h1 class="node-table-title">Economies</h1>
        {/if}
      </button>
    </div>
    {#if data.level === "root"}
      <div class="scores">
        <ScoreTable {data} {countries} countriesOnly={true} />
      </div>
    {:else}
      <div class="scores">
        <ScoreTable {data} {countries} showCountries={false} />
      </div>
    {/if}
  </button>
</div>

<style>
  .node-table {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    width: 100%;
    padding-right: 1.98em;
  }

  .node-table:hover .node-table-text {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: var(--levelColor);
    cursor: pointer;
  }

  .node-table:hover .node-table-text::after {
    text-decoration: none;
  }

  .node-table.selectedTable {
    position: relative;
    z-index: 100;
  }
  .table-wrapper {
    margin-left: calc((var(--n)) * 2%);
  }

  .table-wrapper.selectedTable {
    margin-left: calc((var(--n)) * 2%);
  }

  .table-border {
    position: relative;
    box-shadow: inset 0px -1px var(--main-color);
  }

  .table-border.selectedTable::after {
    border-bottom: 2px solid var(--main-color);
    box-shadow: none;
  }

  .table-border.selectedTable {
    border-bottom: 1px solid var(--main-color);
    box-shadow: none;
  }

  /* .scores {
    padding-right: 2em;
  } */

  .node-table-text {
    padding: 1.5em 2em 1.5em 0em;
  }
  .node-table-text h1 {
    margin: 0;
  }

  .node-table-title {
    padding-left: 0;
  }

  .node-table.selectedTable .node-table-title {
    padding-left: 1em;
  }
</style>
