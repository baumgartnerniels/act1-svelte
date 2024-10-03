<script>
  import { createEventDispatcher } from "svelte";
  import { selectedStore } from './stores.js';

  let selected = false;
  let hovered = false;
  let level;

  export let label = "";
  export let selectable = false;

</script>

<div class="level-container">
  <div class="level" class:hovered class:selected={$selectedStore.has(label)} bind:this={level}>
    <slot />
  </div>
  <button
    class="label"
    on:mouseenter={() => (hovered = selectable)}
    on:mouseleave={() => (hovered = false)}
    on:click={() => selectedStore.toggleSelection(label)}
  >
    <p>{label}</p>
</button>
</div>

<style>
  :root {
    --room-size: 14vh;
    --rotation: 30deg;
  }
  .level-container {
    z-index: var(--z);
    display: grid;
    grid-template-columns: 95% 5%;

    grid-template-rows: 100%;
    transform: rotateX(60deg) rotateZ(var(--rotation));
    position: relative;
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

  .level.hovered {
    outline: 2px solid var(--main-color);
  }
  .label {
    position: relative;
    margin-top: 3vh;
    padding-left: 3vh;
    grid-column: 2;
    cursor: pointer;
  }
  .label p {
    color: var(--main-color);
    position: absolute;
    transform-origin: top left;
    left: 0;
    top: 0;
    transform: rotate(-90deg) translateX(-100%);

    margin: 0; /* Remove default margin */
  }
</style>
