<script>
  import { selectedNodeDimStore } from "./stores.js";
  import ScoreTable from "./ScoreTable.svelte";
  import DataPoint from "./DataPoint.svelte";

  export let children;
  export let countries;
  let showScores = false;
</script>

<div class="child-table">
  <div class="child-table-title">
    {#if children.length}
      <div>{children[0].level}</div>
      <p>Economy Score 2024</p>
    {/if}
  </div>
  <div class="sheet-table">
    <button on:click={() => (showScores = !showScores)} class="show-button"
      >show scores</button
    >
    {#each children as child}
      <div class="child-table-entries">
        <DataPoint
          data={child}
          showLabels={true}
          country={countries[0]}
          active={$selectedNodeDimStore === child}
        />
        {#if showScores}
          <ScoreTable data={child} {countries} />
        {/if}
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

  .show-button {
    background-color: rgb(194, 194, 202);
    border-radius: 0.5em;
    font-size: small;
    padding: 0.5em;
    margin: 0.5em;
    align-self: flex-end;
  }
</style>
