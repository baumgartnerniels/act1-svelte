<script>
  import { selectedNodeDimStore } from "./stores.js";
  export let level = "";
</script>

<div class="level-container">
  <div class="level" class:active={$selectedNodeDimStore.level === level}>
    <slot />
  </div>
  <button
    class="level-button"
    class:active={$selectedNodeDimStore.level === level}
  >
    <p class="level-label">{level}</p>
  </button>
</div>
