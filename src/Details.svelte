<script>
  import Sheet from "./Sheet.svelte";
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

  $: {
    console.log(dataDim);
  }
</script>

<div class="details">
  {#each dataDim as sheetData, i (sheetData.id)}
    <Sheet data={sheetData} n={i} />
  {/each}
</div>

<style>
  .details {
    position: relative;
    box-sizing: border-box;
    text-align: left;
    height: 100%;
    width: 100%;
  }
</style>
