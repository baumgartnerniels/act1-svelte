<script>
  import { scaleLinear, interpolateRgb } from "d3";
  import { hoveredStore, relatedStore } from "./stores.js";
  import { onMount } from "svelte";
  import { dataStructure } from "./dataStructure.js";

  export let data = {};
  export let store;
  export let showLabels = false;

  let inStructure;

  let colorScale = scaleLinear()
    .domain([0, 0.5, 1])
    .range(["red", "pink", "blue"])
    .interpolate(interpolateRgb.gamma(2.2));

  function style(e) {
    let color = colorScale(e.score / 5.0);
    return "background-color: " + color + ";";
  }

  $: inactive = !$relatedStore.has(inStructure);

  onMount(() => {
    inStructure = dataStructure
      .findNodeByKey(data.eco_key)
      .findNodeByKey(data.key);
  });
</script>

<button
  data-score={data.score}
  data-eco={data.eco_key}
  data-key={data.key}
  data-parent={data.parent_key}
  style={style(data)}
  on:click={() => {
    store.toggleSelection(inStructure);
  }}
  on:mouseenter={() => {
    hoveredStore.set(data.key);
  }}
  on:mouseleave={() => {
    hoveredStore.set("");
  }}
  class:selected={$store.has(inStructure)}
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
