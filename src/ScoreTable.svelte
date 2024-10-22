<script>
  import { styleBgColorAuto } from "./colors.js";
  import { hoveredStore } from "./stores.js";
  import Check from "./icons/Check.svelte";
  import Cross from "./icons/Cross.svelte";

  export let data; // Object with country names as keys and scores as values
  export let countries; // Array of selected countries
  export let showCountries = false; // Whether to show country names
  export let countriesOnly = false;
</script>

<div class="score-table">
  {#each countries as country}
    {@const score = data.scores[country]?.toFixed(1)}
    {#if score}
      <div>
        {#if showCountries}
          <div>{country}</div>
        {/if}
        {#if countriesOnly}
          <button
            class="score-button"
            style="background-color: transparent; color: var(--main-color);"
          >
            {country}
          </button>
        {:else}
          <button class="score-button" style={styleBgColorAuto(data, country)}>
            {#if data.level !== "levels"}
              {score}
            {:else if score > 0}
              <Check />
            {:else}
              <Cross />
            {/if}
          </button>
        {/if}
      </div>
    {/if}
  {/each}
</div>

<style>
  .score-table {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: stretch;
    text-align: center;
  }

  .score-button {
    width: 50px;
    height: 50px;
    margin: 0.2em;
    padding: 0.2em;
    text-align: center;
    color: rgb(22, 22, 22);
    flex-basis: 100%;
    vertical-align: middle;
  }
  .score-button :global(.check) {
    margin-top: 5px;
    width: 1.5em;
  }
  .score-button :global(.cross) {
    margin-top: 5px;
    fill: var(--main-color);
    width: 1em;
  }
</style>
