"use client";
import { HeatmapBase, type HeatmapProps } from "./heatmap-base";

export interface ColorRangeHeatmapProps extends HeatmapProps {
  colorRange: string[];
}

export function ColorRangeHeatmap({
  data = [],
  colorRange = ["#f3f4f6", "#4f46e5"],
  ...props
}: ColorRangeHeatmapProps) {
  // Ensure colorRange is valid
  const safeColorRange =
    Array.isArray(colorRange) && colorRange.length > 0
      ? colorRange
      : ["#f3f4f6", "#4f46e5"];

  return <HeatmapBase data={data} colorRange={safeColorRange} {...props} />;
}
