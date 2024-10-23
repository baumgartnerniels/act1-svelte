<script>
  import Add from "./icons/Add.svelte";
  import ArrowLeft from "./icons/ArrowLeft.svelte";
  import ArrowRight from "./icons/ArrowRight.svelte";
  import Presentation from "./icons/Presentation.svelte";
  import Save from "./icons/Save.svelte";
  import Trash from "./icons/Trash.svelte";
  import Help from "./Help.svelte";
  import { selectedCountryStore, selectedNodeDimStore } from "./stores.js";
  import { dataStructureDim } from "./dataStructureDim.js";
  import { onMount } from "svelte";
  let currentSlide = 1;
  let helpVisible = false;
  $: totalSlides = slides.length;

  $: slide = {
    countries: Array.from($selectedCountryStore),
    node: $selectedNodeDimStore.key,
  };
  $: slides = loadSlides();

  $: hidden = Boolean(document.fullscreenElement);

  function handleFullScreenChange() {
    hidden = Boolean(document.fullscreenElement);
  }

  function onKeyDown(e) {
    switch (e.keyCode) {
      case 37: // left = 37
        prevSlide();
        break;
      case 39: // right = 39
        nextSlide();
        break;
    }
  }

  function nextSlide() {
    if (currentSlide <= totalSlides - 1) {
      currentSlide++;
      loadSlide();
    }
  }

  function prevSlide() {
    if (currentSlide > 1) {
      currentSlide--;
      loadSlide();
    }
  }

  function loadSlide() {
    slide = slides[currentSlide - 1];
    selectedCountryStore.set(new Set(slide.countries));
    let node = dataStructureDim.findNodeByKey(slide.node);
    selectedNodeDimStore.set(node);
  }

  function addSlide() {
    slides.splice(currentSlide, 0, slide);
    slides = slides;
    currentSlide++;
    saveSlides();
  }

  function saveSlides() {
    slides[currentSlide - 1] = slide;
    localStorage.setItem("slides", JSON.stringify(slides));
  }

  function deleteSlide() {
    if (totalSlides > 1) {
      slides.splice(currentSlide - 1, 1);
      slides = slides;
      if (currentSlide == 1) {
        loadSlide();
      } else {
        prevSlide();
      }
      saveSlides();
    }
  }

  function loadSlides() {
    let slidesStr = localStorage.getItem("slides");
    return JSON.parse(slidesStr) || [slide];
  }

  function startPresentation() {
    document
      .querySelector("body")
      .requestFullscreen()
      .catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
  }

  function closeHelp() {
    helpVisible = false;
  }

  onMount(() => {
    slides = loadSlides();
    loadSlide();
  });
</script>

<div class="slideManager" class:hidden>
  <span>Slide</span>
  <div class="current">
    <button class="left" on:click={prevSlide}><ArrowLeft /></button>
    <input type="number" bind:value={currentSlide} />
    <button class="right" on:click={nextSlide}><ArrowRight /></button>
  </div>
  <span class="of">of</span>
  <input type="number" bind:value={totalSlides} />&nbsp;
  <button on:click={addSlide}><Add /></button>
  <button on:click={saveSlides}><Save /></button>
  <button on:click={deleteSlide}><Trash /></button>
  <button on:click={startPresentation}><Presentation /></button>
  <button
    on:click={() => {
      helpVisible = true;
    }}
    class="help">?</button
  >
</div>

<Help visible={helpVisible} on:closeHelp={closeHelp} />

<svelte:window
  on:fullscreenchange={handleFullScreenChange}
  on:keydown|preventDefault={onKeyDown}
/>

<style>
  .slideManager {
    padding-right: 2em;
    height: 100%;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    display: flex;
    opacity: 1;
    transition: all 1s;
  }
  .slideManager.hidden {
    opacity: 0;
    display: none;
  }
  .slideManager * {
    display: inline-block;
    margin: 0.25em;
  }
  .slideManager *:last-child {
    margin-right: 0;
  }
  .current {
    margin: 0;
  }
  .current * {
    margin: 0;
  }
  /* .of {
    margin-right: 0;
  } */
  .current :global(svg) {
    width: 1em;
    padding-bottom: 2px;
  }
  .help {
    background-color: var(--main-color);
    color: var(--background-color);
    padding-top: 0;
    padding-bottom: 0;
    width: 1.5em;
    height: 1.5em;
  }

  button {
    vertical-align: middle;
    min-width: 0.5em;
  }
  button :global(svg) {
    color: var(--main-color);
    fill: var(--main-color);
    width: 1.5em;
    height: 1.5em;
    vertical-align: middle;
  }

  button :global(svg):hover, .help:hover {
    opacity: 0.9;

  }
  input[type="number"] {
    appearance: textfield;
    font: inherit;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    background-color: var(--background-color);
    border: 1px solid var(--main-color);
  }
  input[type="number"]:focus {
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
</style>
