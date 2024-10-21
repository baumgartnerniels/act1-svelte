<script>
  import { selectedNodeDimStore } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { levelColors, styleBgColorAuto } from "./colors.js";

  export let children;
  export let countries;
  export let n;
</script>

<div class="child-table" style="--n: {n}">
  <div class="child-table-title" style="color: {levelColors[n]}">
    {#if children.length}
      <h1>{children[0].level} Scoring</h1>
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
    overflow: hidden;
    height: 100%;
    display: grid;
    padding: 1.5em 2em 1.5em calc(2.5em + (var(--n) * 0.5em));
    grid-template-columns: 1fr;
    grid-template-rows: max-content auto;
    gap: 2%;
    background-color: #242424;
  }

  .sheet-table {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
  }

  .child-table-entries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 5%;
  }

  .child-table-entries button {
    margin-bottom: 1%;
    margin-top: 1%;
  }

  .child-table-title {
    font-size: 90%;
    margin-bottom: 2%;
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
