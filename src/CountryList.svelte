<script>
  import ArrowLeft from "./icons/ArrowLeft.svelte";
  import ArrowRight from "./icons/ArrowRight.svelte";
  import {
    countries,
    selectedCountryStore,
    hoveredStore,
    countryLabels,
  } from "./stores.js";
  let hidden = false;
</script>

<div class="countryList" class:hidden>
  {#each countries as country}
    <button
      class="country"
      class:active={$selectedCountryStore.has(country)}
      on:click={() => selectedCountryStore.toggleSelection(country)}
      on:mouseenter={() => {
        hoveredStore.set(countryLabels[country]);
      }}
      on:mouseleave={() => {
        hoveredStore.set("");
      }}>{country}</button
    >{/each}<button class="country" on:click={() => selectedCountryStore.resetSelection()} >ALL</button><button class="close" on:click={() => (hidden = !hidden)}
    ><ArrowLeft />
</button><button class="open" on:click={() => (hidden = !hidden)}>
    <ArrowRight />
  </button>
</div>

<style>
  .countryList {
    box-sizing: content-box;
    position: absolute;
    text-align: left;
    left: 0;
    width: fit-content;
    z-index: 100;
    border-bottom: 1px solid var(--main-color);
    border-right: 1px solid var(--main-color);
    transition: left 0.3s;
  }
  .countryList.hidden {
    text-align: left;
    left: -21.2em;
  }

  .country.active {
    background-color: var(--main-color);
    color: var(--background-color);
    border-right: 1px solid var(--background-color);
  }
  button {
    box-sizing: border-box;
    background-color: var(--background-color);
    text-align: center;
    padding-left: 0.5em;
    padding-right: 0.5em;
  }

  button:hover {
    text-decoration: underline;
  }
  .country {
    border-right: 1px solid var(--main-color);
  }
  .open {
    display: none;
    width: 1.5em;
    text-align: center;
  }
  .close {
    width: 1.5em;
    text-align: center;
  }
  .hidden .open {
    display: inline-block;
  }
  .hidden .close {
    display: none;
  }
  button :global(svg) {
    fill: var(--main-color);
    height: 0.8em;
    vertical-align: baseline;
  }
</style>
