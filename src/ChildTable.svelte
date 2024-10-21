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
    box-sizing: border-box;
    border-left: 1px solid var(--main-color);
    overflow: hidden;
    height: 100%;
    display: grid;
    padding: 1.5em 2em 1.5em 2em;
    grid-template-columns: 1fr;
    grid-template-rows: max-content auto;
    gap: 2%;
  }

  .sheet-table {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    gap: 2%;
  }

  .child-table-entries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 5%;
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
