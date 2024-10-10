<script>
  import Sheet from "./Sheet.svelte";

  import { selectedStore } from "./stores.js";

  $: data = [].concat(
    Array.from($selectedStore)[0]
      .getAncestors()
      .filter((n) => {
        //get the levels above up to dimension
        return [
          "economies",
          "dimensions",
          "subdimensions",
          "indicators",
        ].includes(n.level);
      })
      .reverse(),
    Array.from($selectedStore)[0]
  );

  $: {
    console.log(data);
  }
</script>

<div class="details">
  {#each data as sheetData}
    <Sheet data={sheetData} />
  {/each}
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
