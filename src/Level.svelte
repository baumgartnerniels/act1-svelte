<script>
  import { selectedStore, countryStore } from "./stores.js";
  let hovered = false;
  export let level = "";
  export let label = "";
  export let selectable = false;
  export let store = countryStore;

  $: active = level == Array.from($selectedStore)[0].level;
</script>

<div class="level-container">
  <div class="level" class:hovered class:active>
    <slot />
  </div>
  <button class="level-button"
    class:active
    class:selectable
    on:mouseenter={() => (hovered = selectable)}
    on:mouseleave={() => (hovered = false)}
    on:click={() => {
      if (selectable) store.resetSelection();
    }}
  >
    <p class="level-label">{label}</p>
  </button>
</div>

<style>
  :root {
    --room-size: 12vh;
    --rotation: 30deg;
  }
  .level-container {
    z-index: var(--z);
    display: grid;
    grid-template-columns: 95% 5%;

    grid-template-rows: 100%;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
    height: fit-content;
    margin-top: var(--margin-top);
  }
  .level {
    display: grid;
    grid-template-columns: repeat(3, var(--room-size));
    grid-template-rows: repeat(2, var(--room-size));
    grid-gap: 5px;
    align-items: center;
    width: fit-content;
    height: fit-content;
    padding: 5px;
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
    position: absolute;
    transform-origin: top left;
    left: 0;
    top: 0;
    transform: rotate(-90deg) translateX(-100%);

    margin: 0; /* Remove default margin */
  }
</style>
