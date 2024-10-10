<script>
  import { hoveredStore, relatedStore } from "./stores.js";
  import { colorScale, colorScaleBinary, styleBgColor } from "./colors.js";

  export let data = {};
  export let store;
  export let showLabels = false;

  let scale = data.level == "levels" ? colorScaleBinary : colorScale;

  $: inactive = !$relatedStore.has(data);
</script>

<button
  data-score={data.value}
  data-id={data.id}
  data-key={data.key}
  style={styleBgColor(data.value, scale)}
  on:click={() => {
    store.toggleSelection(data);
  }}
  on:mouseenter={() => {
    hoveredStore.set(data.label);
  }}
  on:mouseleave={() => {
    hoveredStore.set("");
  }}
  class:selected={$store.has(data)}
  class:inactive
>
  {#if showLabels}
    <p>{data.label}</p>
  {/if}
</button>

<style>
  button {
    box-sizing: border-box;
    background-color: var(--fill);
    width: 100%;
    height: 100%;
    color: var(--main-color);
    /* border: 1px solid var(--main-color); */
  }
  .inactive p {
    opacity: 1 !important;
  }
  button:hover {
    border: 1px solid var(--main-color);
  }
  .inactive {
    /* opacity: 0.68; */
    opacity: 0.2;
    /* transform: scale(100%); */
    /* border: none; */
    /* filter: grayscale(100%); */
  }
</style>
