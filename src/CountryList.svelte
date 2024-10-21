<script>
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
    >{/each}<button class="close" on:click={() => (hidden = !hidden)}
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="white"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  </button><button class="open" on:click={() => (hidden = !hidden)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="white"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
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
    left: -218px;
  }

  .country.active {
    background-color: var(--main-color);
    color: var(--background-color);
    border-right: 1px solid var(--background-color);
  }
  button {
    box-sizing: border-box;
    padding-left: 0.1em;
    padding-right: 0.1em;
    background-color: var(--background-color);
  }
  .country {
    border-right: 1px solid var(--main-color);
  }
  .open {
    display: none;
  }
  .hidden .open {
    display: inline-block;
  }
  .hidden .close {
    display: none;
  }
  button svg {
    stroke: var(--main-color);
    width: 1em;
    height: 1em;
    vertical-align: middle;
  }
</style>
