<script>
  import { onMount } from "svelte";
  import Level from "./Level.svelte";
  import Room from "./Room.svelte";
  import panzoom from "panzoom";
  import { selectedStore, countryStore } from "./stores.js";
  import { dataStructure as data } from "./dataStructure.js";

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
  let countries = ["ALB", "BIH", "KOS", "MNE", "MKD", "SRB"];

  onMount(() => {
    zoom = setupZoom(tower);
    return () => {
      zoom.dispose();
    };
  });
</script>

<div class="tower" bind:this={tower}>
  <Level
    --margin-top="-2vh"
    --z="60"
    selectable={true}
    label="Economies"
    level="economies"
  >
    {#each countries as country}
      <Room
        data={[data.findNodeByKey(country)]}
        store={countryStore}
        showLabels={true}
      />
    {/each}
  </Level>
  <Level --z="50" label="Dimensions" level="dimensions">
    {#each countries as country}
      <Room
        data={data.findNodeByKey(country).findNodesBy("level", "dimensions")}
        store={selectedStore}
      />
    {/each}
  </Level>
  <Level --z="40" label="Subdimensions" level="subdimensions">
    {#each countries as country}
      <Room
        data={data.findNodeByKey(country).findNodesBy("level", "subdimensions")}
        store={selectedStore}
      />
    {/each}
  </Level>
  <Level --z="30" label="Indicators" level="indicators">
    {#each countries as country}
      <Room
        data={data.findNodeByKey(country).findNodesBy("level", "indicators")}
        store={selectedStore}
      />
    {/each}
  </Level>
  <Level --z="20" label="Levels" level="levels">
    {#each countries as country}
      <Room
        data={data.findNodeByKey(country).findNodesBy("level", "levels")}
        store={selectedStore}
      />
    {/each}
  </Level>
</div>

<style>
  .tower {
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    /* transform: scale(var(--zoom)); */
    --margin-top: -24vh;
  }
</style>
