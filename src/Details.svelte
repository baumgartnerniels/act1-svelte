<script>
  import NodeTable from "./NodeTable.svelte";
  import ChildTable from "./ChildTable.svelte";
  import { dataStructureDim as dataStructDim } from "./dataStructureDim.js";

  import { selectedNodeDimStore, selectedCountryStore } from "./stores.js";

  $: dataDim = [].concat(
    $selectedNodeDimStore
      .getAncestors()
      .filter((n) => {
        //get the levels above up to dimension
        return (
          ["dimensions", "subdimensions", "indicators"].includes(n.level) ||
          n.key === "Dimensions"
        );
      })
      .reverse(),
    $selectedNodeDimStore
  );
</script>

<div class="details">
  <div class="node-tables">
    {#each dataDim as sheetData, i (sheetData.id)}
  <NodeTable data={sheetData} countries={$selectedCountryStore} n={sheetData.getDepth()}/>
  {/each}
  </div>
  <ChildTable children={dataDim[dataDim.length -1].children} countries={$selectedCountryStore} n={dataDim[dataDim.length -1].getDepth()} />
</div>

<style>
  .details {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content auto;
    box-sizing: border-box;
    text-align: left;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
</style>
