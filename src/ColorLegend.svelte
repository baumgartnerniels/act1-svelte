<script>
  import { colorScale } from "./colors.js";

  // Number of stops for the gradient
  const numStops = 10;

  // Generate an array of stop values from 0 to 1
  const stops = Array.from({ length: numStops }, (_, i) => i / (numStops - 1));
</script>

<div class="legend">
  <svg viewBox="0 0 1 1" preserveAspectRatio="none">
    <!-- Define the gradient in the defs -->
    <defs>
      <linearGradient id="color-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
        {#each stops as stop}
          <stop offset="{stop * 100}%" stop-color={colorScale(stop * 5)} />
        {/each}
      </linearGradient>
    </defs>

    <!-- Rectangle filled with the gradient -->
    <rect x="0" y="0" width="1" height="1" fill="url(#color-gradient)" />
  </svg>
  <p class="label-1">Level 0</p>
  <p class="label-2">Level 5</p>
</div>

<style>
  .legend {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  svg {
    display: block;
    margin: auto;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: 1;
    width: 100%;
    height: 1.5em;
  }
  p {
    margin: 0;
    /* font-size: 12px; */
  }
  .label-1 {
    position: absolute;
    text-align: left;
    grid-column: 1;
    grid-row: 2;
    bottom: 0;
    left: 1em;
  }
  .label-2 {
    position: absolute;
    bottom: 0;
    right: 1em;
    text-align: right;
    grid-column: 3;
    grid-row: 2;
    color: var(--background-color);
  }
</style>
