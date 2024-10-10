import { scaleLinear, interpolateRgb } from "d3";

export let mainColor = "#003e9d";
export let highlightColor = "#f2a039";

export const colorScale = scaleLinear()
  .domain([0, 5])
  .range(["#F9DA9A", "#2367F6"])
  .interpolate(interpolateRgb);
// .interpolate(interpolateRgb.gamma(2.2));

export const colorScaleBinary = scaleLinear()
  .domain([0, 1])
  .range(["#D7C2B9", "#9E9CDA"])
  .interpolate(interpolateRgb);
// .interpolate(interpolateRgb.gamma(2.2));

export function styleBgColor(val, scale = colorScale) {
  let color = scale(val);
  return "background-color: " + color + ";";
}
