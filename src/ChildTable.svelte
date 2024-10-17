<script>
  import { selectedNodeDimStore } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import DataPoint from "./DataPoint.svelte";
  import { styleBgColorAuto } from "./colors.js";

  export let children;
  export let countries;
</script>

<div class="child-table">
  <div class="child-table-title">
    {#if children.length}
      <div>{children[0].level}</div>
      <p>Economy Score 2024</p>
    {/if}
  </div>
  <div class="sheet-table">
    {#each children as child}
      <div class="child-table-entries">
        <button 
        on:click={() => {
          selectedNodeDimStore.toggleSelection(child);
        }}>
          {child.label}
        </button>
          <ScoreTable data={child} {countries} />
      </div>
    {/each}
  </div>
</div>

<style>
  .child-table {
    padding: 1em;
  }

  .child-table-title {
    font-size: 1.2em;
    font-weight: bold;
    text-transform: capitalize;
    margin: 1em auto;
  }

  .child-table-title p {
    font-size: 0.8em;
    font-weight: normal;
    margin: 0;
  }

  .sheet-table {
    display: flex;
    height: 70%;
    width: 100%;
    flex-direction: column;
  }

  .child-table-entries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 3em;
  }

  button:hover {
    text-shadow: 0 0 1px black;
  }
</style>
