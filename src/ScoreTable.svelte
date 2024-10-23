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
    gap: 0.4em;
  }

  .score-button {
    width: 2.8em;
    height: 2.8em;
    text-align: center;
    color: rgb(22, 22, 22);
    vertical-align: middle;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
  }
  .score-button :global(.Check) {
    margin-top: 8px;
    width: 1em;
  }
  .score-button :global(.Cross) {
    margin-top: 8px;
    fill: var(--main-color);
    width: 0.8em;
  }
</style>
