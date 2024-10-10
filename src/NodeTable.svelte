<script>
  import { colorScale, colorScaleBinary, styleBgColor } from "./colors.js";
  import { selectedStore, countryStore } from "./stores.js";
  export let data;
  export let sheet;
</script>

{#if data.level != "economies"}
  <div class="table" style={`--num-countries: ${$countryStore.size};`}>
    <div class="row header">
      <button class="label"></button>
      {#each $countryStore as country}
        <button>{country.key}</button>
      {/each}
    </div>
    <div class="row">
      <button
        class="label"
        on:click={() => {
          selectedStore.toggleSelection(data, false);
          sheet.scollTop = 0;
        }}>{data.label}</button
      >
      {#each $countryStore as country}
        {@const val = country.findNodeByKey(data.key).value.toFixed(1)}
        {@const scale = data.level == "levels" ? colorScaleBinary : colorScale}
        <button style={styleBgColor(val, scale)}>{val}</button>
      {/each}
    </div>
  </div>
{/if}

<style>
  .row {
    display: grid;
    grid-template-columns: 1fr repeat(var(--num-countries), 3em);
    justify-content: center;
  }
  .row.header button {
    height: auto;
    font-weight: 600;
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
