<script>
  import { selectedNodeDimStore, detailsTitles } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { dataStructureDim } from "./dataStructureDim.js";
  import { levelColors } from "./colors.js";

  export let data;
  export let countries;
  export let n;

  function getCategoryNumber(data){
    return data.parent.children.indexOf(data) + 1;
  }

  function getDataNumber(data){
    let dataNumber = [];
    //dataNumberString = String(getAncestorNumber(data));
    let currentNode = data;
    for (let i=0; i < data.getDepth(); i++){
      dataNumber.push(getCategoryNumber(currentNode));
      currentNode = currentNode.parent;
    }
    return dataNumber.reverse().join(".");
  }

</script>

<div
  class="node-table"
  class:selectedTable={$selectedNodeDimStore.level === data.level}
>
  <button on:click={() => selectedNodeDimStore.toggleSelection(data, false)} style="--n: {n}">
    {#if data.level !== "root"}
      <h1 style="color: {levelColors[n - 1]}">{getDataNumber(data)} {data.label}</h1>
    {:else}
      <h1 class="node-table-title">Economies</h1>
    {/if}
  </button>
  {#if data.level === "root"}
  <div class="scores">
    <ScoreTable {data} {countries} showCountries={true} />
  </div>
  {:else}
  <div class="scores">
    <ScoreTable {data} {countries} showCountries={false}  />
  </div>
  {/if}
  
</div>

<style>
  .node-table {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--main-color);
    align-items: center;
    height: fit-content;
  }

  .node-table.selectedTable{
    background-color: #242424;
    border-bottom: none;
    box-shadow: 0 5px 10px 0px rgb(18, 18, 18);
    position: relative;
    z-index: 100;
  }

  .scores {
    padding-right: 3em;
  }

  button {
    padding: 1.5em 2em 1.5em calc(2em + (var(--n) * 0.5em));

  }

  button h1 {
    margin: 0;
  }
  button p {
    text-transform: capitalize;
    margin: 0;
  }
</style>
