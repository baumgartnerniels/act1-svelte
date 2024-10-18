<script>
  import { countries, selectedCountryStore } from "./stores.js";
</script>

<div>
  {#each countries as country}
    <button
      class:active={$selectedCountryStore.has(country)}
      on:click={() => selectedCountryStore.toggleSelection(country)}
      >{country}</button
    >
  {/each}
</div>

<style>
  button {
    margin-left: 0.1em;
    margin-right: 0.1em;
  }
  button.active {
    background-color: black;
    color: white;
  }
</style>
