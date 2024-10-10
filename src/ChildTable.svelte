<script>
  import { selectedStore, countryStore } from "./stores.js";
  import { colorScale, colorScaleBinary, styleBgColor } from "./colors.js";
  export let data = {};
  export let sheet;
  function getDataNode(country, node) {
    if (node.level == "economies") {
      return node;
    }
    return country.findNodeByKey(node.key);
  }
</script>

<div class="table" style={`--num-countries: ${$countryStore.size};`}>
  {#each data.children as row}
    <div class="row">
      <button
        class="label"
        on:click={() => {
          selectedStore.toggleSelection(row);
          sheet.scrollTop = 0;
        }}>{row.label}</button
      >
      {#each $countryStore as country}
        {@const node = getDataNode(country, row)}
        {@const scale = row.level == "levels" ? colorScaleBinary : colorScale}
        <button style={styleBgColor(node.value, scale)}>
          {node.value.toFixed(1)}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  .table {
    display: grid;
    grid-auto-rows: 1fr;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr repeat(var(--num-countries), 3em);
    justify-content: center;
    align-items: center;
  }
  .row button.label {
    width: auto;
    height: auto;
    text-align: left;
    justify-content: left;
  }
  .row button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5em;
    height: 2.5em;
    margin: 0.25em;
    text-align: center;
  }
</style>
