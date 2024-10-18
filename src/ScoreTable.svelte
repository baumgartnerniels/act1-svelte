<script>
  import { styleBgColorAuto } from "./colors.js";
  import { hoveredStore } from "./stores.js";

  export let data; // Object with country names as keys and scores as values
  export let countries; // Array of selected countries
  export let showCountries = false; // Whether to show country names
</script>

<div class="score-table" class:hovered={data.label === $hoveredStore}>
  {#each countries as country}
    {@const score = data.scores[country]?.toFixed(1)}
    {#if score !== undefined}
      <div>
        {#if showCountries}
          <div>{country}</div>
        {/if}
        <button class="score-button" style={styleBgColorAuto(data, country)}>
          {score}
        </button>
      </div>
    {/if}
  {/each}
</div>

<style>
  .score-table {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
  }

  .score-table.hovered {
    box-shadow: orange 0 0 1em;
  }

  .score-button {
    width: 2.7em;
    height: 2.7em;
    margin: 0.2em;
    text-align: center;
    color: rgb(22, 22, 22);
  }
</style>
