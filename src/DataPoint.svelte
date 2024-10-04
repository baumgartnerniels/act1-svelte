<script>
  import { scaleLinear, interpolateRgb } from "d3";
  import { selectedStore, hoveredStore } from "./stores.js";
  import { onMount } from "svelte";
  import { dataStructure } from "./dataStructure.js";

  export let data = {};
  let inStructure;

  let colorScale = scaleLinear()
    .domain([0, 0.5, 1])
    .range(["red", "pink", "blue"])
    .interpolate(interpolateRgb.gamma(2.2));

  function style(e) {
    let color = colorScale(e.score / 5.0);
    return "background-color: " + color + ";";
  }

  function isInactive(items) {
    if (!inStructure) return true;
    for (let item of items) {
      if (inStructure.isRelated(item)) return false;
    }
    return true;
  }

  $: inactive = isInactive($selectedStore);

  onMount(() => {
    inStructure = dataStructure.findNode(data.eco_key).findNode(data.key);
    //console.log(inStructure.isRelated("EDUCATION"));
  });
</script>

<button
  data-score={data.score}
  data-eco={data.eco_key}
  data-key={data.key}
  data-parent={data.parent_key}
  style={style(data)}
  on:click={() => {
    selectedStore.toggleSelection(data.key);
  }}
  on:mouseenter={() => {
    hoveredStore.set(data.key);
  }}
  class:selected={$selectedStore.has(data.key)}
  class:inactive
></button>

<style>
  button {
    box-sizing: border-box;
    background-color: var(--fill);
    width: 100%;
    height: 100%;
  }
  button:hover {
    border: 1px solid var(--main-color);
  }
</style>
