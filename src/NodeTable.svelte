<script>
  import { selectedNodeDimStore, detailsTitles } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { dataStructureDim } from "./dataStructureDim.js";

  export let data;
  export let countries;

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
  <button on:click={() => selectedNodeDimStore.toggleSelection(data, false)}>
    {#if data.level !== "root"}
      <h1>{data.label}</h1>
      <p class="node-table-title">{detailsTitles[data.level]} {getDataNumber(data)}</p>
    {:else}
      <h1 class="node-table-title">Economies</h1>
      <p>Policy Dimensions</p>
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
    border-left: 1px solid var(--main-color);
    border-bottom: 1px solid var(--main-color);
    align-items: center;
  }

  .scores {
    padding-right: 3em;
  }

  button {
    padding: 1.5em 2em 1.5em 2em;

  }

  button h1 {
    margin: 0;
  }
  button p {
    text-transform: capitalize;
    margin: 0;
  }
</style>
