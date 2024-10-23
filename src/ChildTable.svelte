<script>
  import { selectedNodeDimStore, hoveredStore, levelTitles } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import { levelColors, styleBgColorAuto } from "./colors.js";
  import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
  import "simplebar/dist/simplebar.css";

  export let children;
  export let countries;
  export let n;

  $: levelColor = levelColors[n];
</script>

<div class="child-table" style="--n: {n}">
  <div class="child-table-title" style="color: {levelColor}">
    {#if children.length}
      <h1>{levelTitles[children[0].level]} Scoring</h1>
    {/if}
  </div>
  <div class="table-scrollbar" data-simplebar>
    <div class="sheet-table">
      {#each children as child}
        <button
          class="child-table-entries"
          class:connected={$hoveredStore === child.label}
          on:click={() => {
            selectedNodeDimStore.toggleSelection(child);
          }}
          on:mouseenter={() => {
            if (child.level === "levels") return;
            hoveredStore.set(child.label);
          }}
          on:mouseleave={() => {
            hoveredStore.set("");
          }}
        >
          <div>
            {child.label}
          </div>
          <ScoreTable data={child} {countries} />
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .child-table {
    box-sizing: border-box;
    overflow: hidden;
    height: 100%;
    display: grid;
    padding: 1.5em 0em 1.5em 4em;
    grid-template-columns: 1fr;
    grid-template-rows: max-content auto;
    gap: 2%;
    background-color: var(--background-color);
    margin-left: calc((var(--n) - 1) * 2%);
  }

  .sheet-table {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: 100%;
  }

  .table-scrollbar {
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 2em;
    scrollbar-width: none;
  }

  .child-table-entries {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 5%;
  }

  .child-table-entries div {
    margin-bottom: 1%;
    margin: 1%;
  }

  .child-table-title {
    font-size: 90%;
    margin-bottom: 2%;
  }

  .child-table-entries:hover {
    background-color: transparent;
    transform: translate(0, -2px);
    text-decoration: underline;
    cursor: pointer;
  }
  .child-table-entries.connected {
    transform: translate(0, -2px);
  }

  h1 {
    margin: 0;
    text-transform: capitalize;
  }

  :global(.simplebar-scrollbar::before) {
    background-color: var(--main-color);
  }
</style>
