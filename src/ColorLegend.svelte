<script>
  // Props for customizing the color scale or size of the legend
  export let width = 200;
  export let height = 15;

  import { colorScale } from "./colors.js";

  // Number of stops for the gradient
  const numStops = 10;

  // Generate an array of stop values from 0 to 1
  const stops = Array.from({ length: numStops }, (_, i) => i / (numStops - 1));
</script>

<div class="legend">
  <svg {width} {height}>
    <!-- Define the gradient in the defs -->
    <defs>
      <linearGradient id="color-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
        {#each stops as stop}
          <stop offset="{stop * 100}%" stop-color={colorScale(stop * 5)} />
        {/each}
      </linearGradient>
    </defs>

    <!-- Rectangle filled with the gradient -->
    <rect x="0" y="0" {width} {height} fill="url(#color-gradient)" />
  </svg>
  <p class="label-1">Level 0</p>
  <p class="label-2">Level 5</p>
</div>

<style>
  .legend {
    position: absolute;
    bottom: 1em;
    left: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 15px 1em;
  }
  svg {
    display: inline-block;
    margin: auto;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 1;
  }
  p {
    margin: 0;
    font-size: 12px;
  }
  .label-1 {
    text-align: left;
    grid-column: 1;
    grid-row: 2;
  }
  .label-2 {
    text-align: right;
    grid-column: 3;
    grid-row: 2;
  }
</style>
