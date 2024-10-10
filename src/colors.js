import { scaleLinear, interpolateRgb } from "d3";
export const colorScale = scaleLinear()
  .domain([0, 1])
  .range(["black", "white"])
  .interpolate(interpolateRgb.gamma(2.2));

export function styleBgColor(val) {
  let color = colorScale(val / 5.0);
  return "background-color: " + color + ";";
}
