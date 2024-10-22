import { scaleLinear, interpolateRgb } from "d3";

export let mainColor = "#003e9d";
export let highlightColor = "#f2a039";
export let levelColors = ["#65afd9", "#eb81b1 ", "#E7DD66", "#6EDC9B"];

export const colorScale = scaleLinear()
  .domain([0, 5])
  .range(["#303031", "#ffffff"])
  .interpolate(interpolateRgb);
// .interpolate(interpolateRgb.gamma(2.2));

export const colorScaleBinary = scaleLinear()
  .domain([0, 1])
  .range(["#303031", "#ffffff"])
  .interpolate(interpolateRgb);
// .interpolate(interpolateRgb.gamma(2.2));

export function styleBgColor(val, scale = colorScale) {
  let color = scale(val);
  return "background-color: " + color + ";";
}

export function styleBgColorAuto(data, country) {
  const scale = data.level !== "levels" ? colorScale : colorScaleBinary;
  let color = scale(data.scores[country]);
  return "background-color: " + color + ";";
}
