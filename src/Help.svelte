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
  
    
    <div class="rows">
      <div style="align-self: flex-start; font-size: 0.9em;">
        <h1>Slide Editor</h1>
        <div style="text-wrap: wrap; margin-bottom: 1em;">
          <p>Save your selection as slides in the order you prefer to quickly switch between all the information you need.</p>
        </div>
      </div>
    <div class="row">
      <Add />
      <span>Add a new slide with the current view</span>
    </div>
    
    <div class="row">
      <Save />
      <span>Override the current slide with the current view</span>
    </div>
    
    <div class="row">
      <Trash />
      <span>Delete the current slide</span>
    </div>
    
    <div class="row">
      <Presentation />
      <span>Start presentation in full screen</span>
    </div>
    
    <div class="row">
      <div><ArrowLeft /><ArrowRight /></div>
      <span>
        Switch slide <span style="font-weight: bold;">OR</span> use arrow keys [⬅] [➡]
      </span>
    </div>
  </div>
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
    display: flex;
    flex-direction: column;
    position: relative;
    height: max-content;
    width: 30em;
    gap: 2em;
    padding: 4em;
    border: 1px solid var(--main-color);
    align-items: center;
    justify-content: center;
}

  .rows {
    display: grid;
    gap: 1em;
  }

  .row {
    display: grid;
    grid-template-columns: 1.5em 3fr;
    gap: 1.3em;
    align-items: center;
    padding: 0.5em;
  }

  span {
    justify-self: start;
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
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.8em;
    margin: 0;
  }

  .close:hover{
    opacity: 0.8;
  }


</style>
