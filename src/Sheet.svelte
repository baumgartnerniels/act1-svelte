<script>
  import { countryStore, selectedStore } from "./stores.js";
  import ChildTable from "./ChildTable.svelte";
  import NodeTable from "./NodeTable.svelte";
  export let data;
  let sheet;
</script>

<div class="sheet" bind:this={sheet}>
  <NodeTable {data} {sheet} />
  <br />
  <br />
  <br />
  <ChildTable {data} {sheet} />
</div>

<style>
  .sheet {
    overflow: hidden;
    border: 1px solid var(--main-color);
    /* border-radius: 5px; */
    background-color: var(--background-color);
    position: absolute; /* Absolute positioning to allow overlap */
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin-right: var(--sheet-right);
    margin-left: var(--sheet-left);
    margin-top: var(--sheet-top);
    margin-bottom: var(--sheet-bottom);
    padding: 2em;
    transition: margin-top 0.3s ease; /* Smooth transition */
    z-index: 1; /* Ensures that sheets overlap */
    scrollbar-color: var(--highlight-color) var(--background-color);
  }
  .sheet:only-child {
    --sheet-bottom: 0em !important;
  }

  .sheet:last-child {
    border: 1px solid var(--highlight-color);
    overflow: scroll;
  }

  .sheet:nth-of-type(1) {
    --sheet-top: 0em;
    --sheet-right: 0em;
    --sheet-left: 5em;
    --sheet-bottom: 4em;
    z-index: 2;
  }

  .sheet:nth-of-type(2) {
    --sheet-top: 6em;
    --sheet-right: 1em;
    --sheet-left: 4em;
    --sheet-bottom: 3em;
    z-index: 2;
  }

  .sheet:nth-of-type(3) {
    --sheet-top: 12em;
    --sheet-right: 2em;
    --sheet-left: 3em;
    --sheet-bottom: 2em;
    z-index: 3;
  }

  .sheet:nth-of-type(4) {
    --sheet-top: 18em;
    --sheet-right: 3em;
    --sheet-left: 2em;
    --sheet-bottom: 1em;
    z-index: 4;
  }

  .sheet:nth-of-type(5) {
    --sheet-top: 24em;
    --sheet-right: 4em;
    --sheet-left: 1em;
    --sheet-bottom: 0em;
    z-index: 4;
  }
</style>
