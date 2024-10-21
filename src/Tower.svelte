<script>
  import { onMount } from "svelte";
  import Room from "./Room.svelte";
  import panzoom from "panzoom";
  import CategoryLevel from "./CategoryLevel.svelte";
  import EconomyLevel from "./EconomyLevel.svelte";
  import { categories, countries, selectedCountryStore } from "./stores.js";
  import { levelColors } from "./colors";

  let tower;
  let zoom;

  export function zoomTo(element, scale = 3) {
    let targetRect = element.getBoundingClientRect();
    let containerRect = tower.parentElement.getBoundingClientRect();
    let t = zoom.getTransform();
    if (t.scale < scale) {
      zoom.smoothZoom(targetRect.x, targetRect.y, scale);
    } else {
      var cx = targetRect.left + targetRect.width / 2;
      var cy = targetRect.top + targetRect.height / 2;

      var dx = containerRect.width / 2 - cx;
      var dy = containerRect.height / 2 - cy;
      zoom.smoothMoveTo(dx + t.x, dy + t.y);
    }
  }

  export function resetZoom() {
    zoom.smoothZoom(0, 0, 1);
  }

  function setupZoom(el) {
    let pz = panzoom(el, {
      minZoom: 1,
      maxZoom: 4,
      bounds: false,
      smoothScroll: false,
    });
    let zoomcenter = { x: 0, y: 0, scale: 1 };
    pz.on("panend", function (e) {
      if (zoomcenter.scale < 1.05) {
        pz.smoothMoveTo(0, 0);
      } else {
        pz.smoothMoveTo(zoomcenter.x, zoomcenter.y);
      }
    });
    pz.on("zoom", function (e) {
      let t = pz.getTransform();
      zoomcenter = { ...t };
      if (zoomcenter.scale < 1.05) {
        pz.smoothMoveTo(0, 0);
      }
    });

    return pz;
  }

  onMount(() => {
    zoom = setupZoom(tower);
    return () => {
      zoom.dispose();
    };
  });
</script>

<div class="tower-container">
  <div class="tower" bind:this={tower}>
    <EconomyLevel --z={60} />

    {#each categories as category, i}
      <CategoryLevel
        --z={50 - i * 10}
        level={category}
        levelColor={levelColors[i]}
      >
        {#each Array.from($selectedCountryStore).reverse() as country}
          <Room level={category} {country} />
        {/each}
      </CategoryLevel>
    {/each}
  </div>
</div>

<style>
  .tower-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .tower {
    height: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 15vh);
    padding-top: 1.5em;
  }
</style>
