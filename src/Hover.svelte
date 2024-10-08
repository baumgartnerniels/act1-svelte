<script>
  import { hoveredStore, mousePosition } from "./stores.js";

  $: visible = $hoveredStore != "";
  $: style =
    "left: " + $mousePosition.x + "px; top: " + ($mousePosition.y - 30) + "px";
</script>

<div class="hoverLabel" class:visible {style}>{$hoveredStore}</div>

<style>
  .hoverLabel {
    z-index: 1000;
    position: absolute;
  }
</style>
