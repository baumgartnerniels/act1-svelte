<script>
  import NodeTable from "./NodeTable.svelte";
  import ChildTable from "./ChildTable.svelte";
  import { selectedCountryStore, selectedNodeDimStore } from "./stores.js";

  export let data;
  export let n;
  let sheet;
</script>

<div class="sheet" bind:this={sheet}>
  <NodeTable {data} countries={$selectedCountryStore} />
  {#if data.level == $selectedNodeDimStore.level}
    <ChildTable children={data.children} countries={$selectedCountryStore} />
  {/if}
</div>

<style>
  :root {
    --sheetGap: 7em;
    --sheetOffset: 0;
    --sheetPadding: 5em;
    --sheetHeightDiff: 5%;
  }

  .sheet {
    overflow: hidden;
    background-color: var(--background-color);
    border-bottom: 1px solid var(--main-color);
    position: relative;
    box-sizing: border-box;
    width: 100%;
    scrollbar-color: var(--highlight-color) var(--background-color);
  }
</style>
