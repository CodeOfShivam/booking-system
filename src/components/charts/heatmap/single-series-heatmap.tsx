"use client";
import { HeatmapBase, type HeatmapProps } from "./heatmap-base";

export function SingleSeriesHeatmap({ data = [], ...props }: HeatmapProps) {
  return <HeatmapBase data={data} {...props} />;
}
