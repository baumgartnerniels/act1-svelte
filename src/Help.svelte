<script>
  import Add from "./icons/Add.svelte";
  import ArrowLeft from "./icons/ArrowLeft.svelte";
  import ArrowRight from "./icons/ArrowRight.svelte";
  import Presentation from "./icons/Presentation.svelte";
  import Save from "./icons/Save.svelte";
  import Trash from "./icons/Trash.svelte";
  import Cross from "./icons/Cross.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let visible = false;

  function closeHelp() {
    dispatch("closeHelp", {
      visible: visible,
    });
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="help-container" class:visible on:click|self={closeHelp}>
  <div class="help">
    <button class="close" on:click={closeHelp}><Cross /></button>
    <Add />
    <span>Add a new slide with the current view</span>
    <Save />
    <span>Override the current slide with the current view</span>
    <Trash />
    <span>Delete the current slide</span>
    <Presentation />
    <span>Start presentation in full screen</span>
    <span><ArrowLeft /><ArrowRight /></span>
    <span>
      Switch slide (You can also use the left and right arrow keys on your
      keyboard)
    </span>
  </div>
</div>

<style>
  .help-container.visible {
    display: flex;
  }
  .help-container {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .help {
    text-align: left;
    background-color: var(--background-color);
    display: grid;
    grid-template-columns: 1.5em 1fr;
    position: relative;
    height: 10em;
    width: 30em;
    padding: 2em;
    border: 1px solid var(--main-color);
  }
  .help :global(.ArrowLeft),
  .help :global(.ArrowRight) {
    width: 0.5em;
    padding-top: 0px;
    padding-bottom: 2px;
  }
  .help :global(.ArrowLeft) {
    margin-right: 0.1em;
  }
  .help :global(svg) {
    fill: var(--main-color);
    display: inline;
    height: 1em;
    vertical-align: middle;
    padding-top: 3px;
  }
  .close {
    position: absolute;
    right: 0;
    padding-right: 6px;
    margin: 0;
    height: 1em;
  }
</style>
