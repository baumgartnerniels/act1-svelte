<script>
  import { scaleLinear, interpolateRgb } from "d3";
  import { hoveredStore, relatedStore } from "./stores.js";

  export let data = {};
  export let store;
  export let showLabels = false;

  let colorScale = scaleLinear()
    .domain([0, 0.5, 1])
    .range(["red", "pink", "blue"])
    .interpolate(interpolateRgb.gamma(2.2));

  function style(e) {
    let color = colorScale(e.value / 5.0);
    return "background-color: " + color + ";";
  }

  $: inactive = !$relatedStore.has(data);
</script>

<button
  data-score={data.value}
  data-id={data.id}
  data-key={data.key}
  style={style(data)}
  on:click={() => {
    store.toggleSelection(data);
  }}
  on:mouseenter={() => {
    hoveredStore.set(data.key);
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
  }
  button:hover {
    border: 1px solid var(--main-color);
  }
</style>
