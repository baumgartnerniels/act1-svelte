<script>
  import {
    selectedCountryStore,
    selectedNodeDimStore,
    countries,
    countryLabels,
  } from "./stores.js";
  import { styleBgColorAuto } from "./colors.js";
  let hovered = false;

  $: active = $selectedNodeDimStore.key === "Dimensions";
  $: nCountries = $selectedCountryStore.size;
  $: rooms1 = nCountries == 1;
  $: rooms2 = nCountries == 2;
  $: rooms3 = nCountries == 3;
  $: rooms4 = nCountries == 4;
  $: rooms5 = nCountries == 5;
  $: rooms6 = nCountries == 6;
</script>

<div class="level-container">
  <div
    class="level"
    class:hovered
    class:active
    class:rooms1
    class:rooms2
    class:rooms3
    class:rooms4
    class:rooms5
    class:rooms6
  >
    {#each Array.from($selectedCountryStore).reverse() as country}
      <div
        class="room"
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
          {countryLabels[country]}
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
  .level-container {
    width: fit-content;
    z-index: var(--z);
    display: grid;
    grid-template-columns: 95% 5%;
    grid-template-rows: 100%;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
    height: fit-content;
  }

  .level {
    width: fit-content;
    height: 24vh; /* 60% of the viewport width */
    align-items: center;
    aspect-ratio: 3 / 2;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 5px;
    gap: 1px;
    padding: 5px;
  }

  .level.rooms1 {
    aspect-ratio: 1 / 1;
  }
  .level.rooms2 {
    aspect-ratio: 2 / 1;
    height: 18vh;
  }
  .level.rooms3 {
    aspect-ratio: 1 / 1;
  }
  .level.rooms4 {
    aspect-ratio: 1 / 1;
  }

  .level :global(.room) {
    grid-column: span 2;
    grid-row: span 2;
    display: grid;
    align-items: center;
    color: white;
    font-size: 1.2em;
    order: revert;
  }

  .level.rooms1 :global(.room) {
    grid-column: span 6;
    grid-row: span 4;
  }

  .level.rooms2 :global(.room) {
    grid-column: span 3;
    grid-row: span 4;
  }

  .level.rooms3 :global(.room:nth-child(1)) {
    grid-column: 4 / span 3;
    grid-row: span 2;
  }
  .level.rooms3 :global(.room:nth-child(2)) {
    grid-column: span 3;
    grid-row: 3 / span 2;
  }
  .level.rooms3 :global(.room:nth-child(3)) {
    grid-column: span 3;
    grid-row: 3 / span 2;
  }

  .level.rooms4 :global(.room) {
    grid-column: span 3;
    grid-row: span 2;
  }

  .level.rooms5 :global(.room:nth-child(1)) {
    grid-column: 3 / span 2;
    grid-row: 1 / span 2;
  }
  .level.rooms5 :global(.room:nth-child(2)) {
    grid-column: 5 / span 2;
    grid-row: 1 / span 2;
  }
  .level.rooms5 :global(.room:nth-child(3)) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 2;
  }
  .level.rooms5 :global(.room:nth-child(4)) {
    grid-row: 3 / span 2;
  }
  .level.rooms5 :global(.room:nth-child(5)) {
    grid-row: 3 / span 2;
  }

  .level.active.hovered {
    outline: 2px solid var(--highlight-color);
  }
  .level.hovered {
    outline: 2px solid var(--main-color);
  }

  .level-button {
    position: relative;
    margin-top: 3vh;
    padding-left: 3vh;
    grid-column: 2;
  }

  .level-button.selectable {
    cursor: pointer;
  }

  .level-button:focus {
    outline: none;
  }

  .level-button.active .level-label {
    color: var(--highlight-color);
  }
  .level-label {
    color: var(--main-color);
    text-transform: capitalize;
    position: absolute;
    transform-origin: top left;
    left: 0;
    top: 0;
    font-size: 1.6vh;
    transform: rotate(-90deg) translateX(-100%);
    margin: 0; /* Remove default margin */
  }

  .room {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid var(--main-color);
  }
  .room.active {
    border: 2px solid var(--highlight-color);
  }

  .room:hover {
    border: 1px solid var(--main-color);
  }
  .room button {
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
