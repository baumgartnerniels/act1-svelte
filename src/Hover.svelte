<script>
  import { hoveredStore, mousePosition } from "./stores.js";

  $: visible = $hoveredStore != "";
  $: style =
    "left: " +
    ($mousePosition.x + 10) +
    "px; top: " +
    ($mousePosition.y + 10) +
    "px";
</script>

<div class="hoverLabel" class:visible {style}><p>{$hoveredStore}</p></div>

<style>
  .hoverLabel {
    z-index: 1000;
    position: absolute;
    width: fit-content;
    max-width: 200px;
  }
  p {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
    text-align: left;
    user-select: none;
    width: fit-content;
    color: var(--background-color);
    background-color: var(--main-color);
  }
</style>
