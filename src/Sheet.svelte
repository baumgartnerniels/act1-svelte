<script>
  import NodeTable from "./NodeTable.svelte";
  import ChildTable from "./ChildTable.svelte";
  import { selectedCountryStore } from "./stores.js";

  export let data;
  export let n;
  let sheet;
</script>

<div class="sheet" bind:this={sheet} style="--n: {n};">
  <NodeTable {data} countries={$selectedCountryStore} />
  <ChildTable children={data.children} countries={$selectedCountryStore} />
</div>

<style>
  :root {
    --sheetGap: 7em;
    --sheetOffset: 1em;
    --sheetPadding: 5em;
    --sheetHeightDiff: 5%;
  }

  .sheet {
    overflow: hidden;
    border: 1px solid var(--main-color);
    background-color: var(--background-color);
    position: absolute; /* Allow sheets to overlap */
    margin: 1em;
    width: 70%;
    height: calc(75% - var(--n) * var(--sheetHeightDiff));
    transition: margin-top 0.3s ease;
    z-index: calc(1 + var(--n));
    top: calc(var(--sheetGap) * var(--n) + var(--sheetPadding));
    right: calc(var(--sheetOffset) * var(--n) + var(--sheetPadding));
    scrollbar-color: var(--highlight-color) var(--background-color);
  }

  .sheet:last-child {
    border: 1px solid var(--highlight-color);
    overflow: auto;
  }
</style>
