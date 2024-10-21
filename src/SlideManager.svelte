<script>
  import Add from "./icons/Add.svelte";
  import ArrowLeft from "./icons/ArrowLeft.svelte";
  import ArrowRight from "./icons/ArrowRight.svelte";
  import Presentation from "./icons/Presentation.svelte";
  import Save from "./icons/Save.svelte";
  import Trash from "./icons/Trash.svelte";
  import { selectedCountryStore, selectedNodeDimStore } from "./stores.js";
  import { dataStructureDim } from "./dataStructureDim.js";
  import { onMount } from "svelte";
  import SaveAs from "./icons/SaveAs.svelte";
  let currentSlide = 1;
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

  // up = 38
  // down = 40
  // right = 39
  // left = 37
  function onKeyDown(e) {
    switch (e.keyCode) {
      case 37:
        prevSlide();
        break;
      case 39:
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
    slides.splice(currentSlide - 1, 0, slide);
    slides = slides;
    currentSlide++;
  }
  function saveSlides() {
    slides[currentSlide - 1] = slide;
    localStorage.setItem("slides", JSON.stringify(slides));
  }
  function deleteSlide() {
    if (totalSlides > 1) {
      slides.splice(currentSlide - 1, 1);
      slides = slides;
      prevSlide();
      console.log("delete", currentSlide);
    }
  }
  function loadSlides() {
    let slidesStr = localStorage.getItem("slides");
    return JSON.parse(slidesStr) || [slide];
  }

  function startPresentation() {
    document
      .querySelector("#app")
      .requestFullscreen()
      .catch((err) => {
        alert(
          `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
        );
      });
  }

  onMount(() => {
    slides = loadSlides();
    loadSlide();
  });
</script>

<div class="slideManager" class:hidden>
  <span>Slide</span><button on:click={prevSlide}> <ArrowLeft /></button>
  <input type="number" bind:value={currentSlide} />
  <button on:click={nextSlide}>
    <ArrowRight />
  </button>
  <span>of &nbsp;</span>
  <input type="number" bind:value={totalSlides} />
  <button on:click={addSlide}>
    <Add />
  </button>
  <button on:click={saveSlides}>
    <Save />
  </button>
  <button on:click={deleteSlide}><Trash /></button>
  <button on:click={startPresentation}><Presentation /></button>
</div>

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
    padding: 0.2em;
  }
  button {
    vertical-align: middle;
    min-width: 0.5em;
  }
  button :global(svg) {
    color: var(--main-color);
    fill: var(--main-color);
    width: 1em;
    height: 1em;
  }
  input[type="number"] {
    appearance: textfield;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    background-color: var(--background-color);
    border: 1px solid var(--main-color);
  }
  input[type="number"]:focus {
    outline: none;
  }
</style>
