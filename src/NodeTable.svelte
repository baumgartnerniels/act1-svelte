<script>
  import { selectedNodeDimStore, detailsTitles, categories } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { dataStructureDim } from "./dataStructureDim.js";
  import { levelColors } from "./colors.js";

  export let data;
  export let countries;
  export let n;

  function getCategoryNumber(data) {
    return data.parent.children.indexOf(data) + 1;
  }

  function getDataNumber(data) {
    let dataNumber = [...Array(data.getDepth())]
      .map(() => {
        let num = getCategoryNumber(data);
        data = data.parent;
        return num;
      })
      .reverse()
      .join(".");

    let result = parseFloat(dataNumber).toFixed(1);
    return result.endsWith(".0") ? result.slice(0, -2) : result;
  }
</script>

<div
  class="table-wrapper"
  style="--n: {n}"
  class:selectedTable={$selectedNodeDimStore.level === data.level}
>
  <button
    class="node-table table-border"
    class:selectedTable={$selectedNodeDimStore.level === data.level}
    on:click={() => selectedNodeDimStore.toggleSelection(data, false)}
    style="--border-width: {n * 3}%; --n: {n}"
  >
    <div>
      <button class="node-table-text" style="--n: {n}">
        {#if data.level !== "root"}
          {#if data.level == "dimensions" || data.level == "subdimensions"}
            <h1 style="color: {levelColors[n - 1]}">
              {getDataNumber(data)}
              {data.label}
            </h1>
          {:else}
            <h1 style="color: {levelColors[n - 1]}">{data.label}</h1>
            <!-- <p style="color: {levelColors[n - 1]}">{detailsTitles[data.level]}</p> -->
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
    /* border-bottom: 1px solid var(--main-color) */
    align-items: center;
    height: fit-content;
    width: 100%;
  }

  .node-table:hover {
    background-color: rgb(50, 50, 50);
  }

  .node-table.selectedTable {
    background-color: #343434;
    position: relative;
    z-index: 100;
  }
  .table-wrapper {
    margin-left: calc((var(--n)) * 2%);
  }

  .table-wrapper.selectedTable {
    margin-left: calc((var(--n) - 1) * 2%);
  }

  .table-border {
    position: relative;
    box-shadow: inset 0px -1px var(--main-color);
  }

  .table-border.selectedTable::after {
    background: #343434;
    border-bottom: 2px solid black;
    box-shadow: none;
  }

  .table-border.selectedTable {
    background: #343434;
    border-bottom: 2px solid black;
    box-shadow: none;
  }

  .scores {
    padding-right: 2em;
  }

  .node-table-text {
    padding: 1.5em 2em 1.5em 0;
  }

  .node-table.selectedTable .node-table-text {
    padding-left: 2em;
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
