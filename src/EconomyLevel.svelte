<script>
  import {
    selectedCountryStore,
    selectedNodeDimStore,
    countries,
  } from "./stores.js";
  import { styleBgColorAuto } from "./colors.js";
  let hovered = false;

  $: active = $selectedNodeDimStore.key === "Dimensions";
</script>

<div class="level-container">
  <div class="level" class:hovered class:active>
    {#each countries as country}
      <div
        class="country-tile"
        class:active
        class:inactive={!$selectedCountryStore.has(country)}
      >
        <button
          class="country-button"
          style={styleBgColorAuto($selectedNodeDimStore, country)}
          on:click={() => {
            selectedCountryStore.toggleSelection(country);
          }}
        >
          {country}
        </button>
      </div>
    {/each}
  </div>
  <button
    class="level-button selectable"
    class:active
    on:mouseenter={() => (hovered = true)}
    on:mouseleave={() => (hovered = false)}
    on:click={() => {
      selectedCountryStore.resetSelection();
    }}
  >
    <p class="level-label">Economies</p>
  </button>
</div>

<style>
  .country-tile {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid var(--main-color);
  }
  .country-tile.active {
    border: 2px solid var(--highlight-color);
  }

  .country-tile:hover {
    border: 1px solid var(--main-color);
  }
  .country-button {
    box-sizing: border-box;
    background-color: var(--fill);
    width: 100%;
    height: 100%;
    color: var(--main-color);
    font-size: 1.7vh;
    text-align: center;
  }

  .inactive {
    opacity: 0.2;
  }
</style>
