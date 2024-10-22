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
  class:selected={$selectedNodeDimStore === data}
  class:active
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
    /* flex-basis: 60%; */
    /* border: 1px solid var(--main-color); */
  }
  /*   .inactive p {
    opacity: 1 !important;
  } */
  button:hover {
    border: 1px solid var(--main-color);
  }

  button:focus {
  outline: 1px solid var(--main-color);
}
  .active {
    opacity: 1;
    outline: none;
  }

  .selected {
    box-shadow: 2px 2px var(--levelColor);
    /* outline: 2px solid var(--parent-color); */
  }
  .connected {
    transform: translate(-0.2em, -0.3em);
    text-shadow: 2px 2px 7px rgba(161, 68, 68, 0.363);
  }
</style>
