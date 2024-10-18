<script>
  import { selectedNodeDimStore, selectedCountryStore } from "./stores.js";
  export let level = "";

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
    class:active={$selectedNodeDimStore.level === level}
    class:rooms1
    class:rooms2
    class:rooms3
    class:rooms4
    class:rooms5
    class:rooms6
  >
    <slot />
  </div>
  <button
    class="level-button"
    class:active={$selectedNodeDimStore.level === level}
  >
    <p class="level-label">{level}</p>
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
</style>
