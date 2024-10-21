<script>
  import { selectedNodeDimStore } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { styleBgColorAuto } from "./colors.js";

  export let children;
  export let countries;
</script>

<div class="child-table">
  <div class="child-table-title">
    {#if children.length}
      <h1>{children[0].level}</h1>
      <p>Economy Score 2024</p>
    {/if}
  </div>
  <div class="sheet-table">
    {#each children as child}
      <div class="child-table-entries">
        <button
          on:click={() => {
            selectedNodeDimStore.toggleSelection(child);
          }}
        >
          {child.label}
        </button>
        <ScoreTable data={child} {countries} />
      </div>
    {/each}
  </div>
</div>

<style>
  .child-table {
    display: flex;
    flex-direction: column;
    padding: 1.5em 2em 1.5em 2em;
    border-left: 1px solid var(--main-color);
    height: 100%;
    overflow: scroll;
  }

  .sheet-table {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .child-table-entries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  button:hover {
    text-shadow: 0 0 1px black;
  }

  h1 {
    margin: 0;
    text-transform: capitalize;
  }
  p {
    text-transform: capitalize;
    margin: 0;
  }
</style>
