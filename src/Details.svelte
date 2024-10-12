<script>
  import Sheet from "./Sheet.svelte";

  import { selectedStore } from "./stores.js";

  $: selected = Array.from($selectedStore)[0];
  $: ancestors = selected
    .getAncestors()
    .filter((n) => {
      //get the levels above up to economies
      return [
        "economies",
        "dimensions",
        "subdimensions",
        "indicators",
      ].includes(n.level);
    })
    .reverse();

  $: {
    console.log(ancestors);
  }
</script>

<div class="details">
  {#each ancestors as ancestor}
    <Sheet data={ancestor} showChildren={false} />
  {/each}
  <Sheet data={selected} showChildren={true} />
</div>

<style>
  .details {
    position: relative;
    /* padding: 1em; */
    box-sizing: border-box;

    margin: 1em;
    text-align: left;
  }
</style>
