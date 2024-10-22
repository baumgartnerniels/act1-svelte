<script>
  import { hoveredStore, selectedNodeDimStore } from "./stores.js";
  import { styleBgColorAuto, levelColors } from "./colors.js";

  export let data = {};
  export let showLabels = false;
  export let country;
  export let active = false;
</script>

<button
  data-score={data.scores[country]}
  data-id={data.id}
  data-key={data.key}
  style="{styleBgColorAuto(data, country)} --levelColor: {levelColors[data.getDepth()-1]};"
  on:click={() => {
    selectedNodeDimStore.toggleSelection(data);
  }}
  on:mouseenter={() => {
    if (data.level === "levels") return;
    hoveredStore.set(data.label);
  }}
  on:mouseleave={() => {
    hoveredStore.set("");
  }}
  class:selected={$selectedNodeDimStore === data || $selectedNodeDimStore.getAncestors().includes(data)}
  class:active={active}
  class:connected={$hoveredStore === data.label}
>
  {#if showLabels}
    <div>{data.label}</div>
  {/if}
</button>

<style>
  button {
    box-sizing: border-box;
    background-color: var(--fill);
    width: 100%;
    height: 100%;
    color: var(--main-color);
    font-size: 1.2vh;
    opacity: 0.2;
  }

  button:hover {
    border: 1px solid var(--levelColor);
  }
  .active {
    opacity: 1;
    outline: none;
  }

  .selected {
    outline: 0.15em solid var(--levelColor);
    transform: translate(-30%, -30%);

  }
  .connected {
    transform: translate(-20%, -20%);
    box-shadow: 2px 2px 4px var(--levelColor);
  }
</style>
