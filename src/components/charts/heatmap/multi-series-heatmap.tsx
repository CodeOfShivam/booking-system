"use client";

import { useMemo } from "react";
import {
  HeatmapBase,
  type HeatmapDataPoint,
  type HeatmapProps,
} from "./heatmap-base";

export interface MultiSeriesHeatmapProps extends Omit<HeatmapProps, "data"> {
  data: {
    series: string;
    points: HeatmapDataPoint[];
  }[];
  seriesConfig?: Record<string, { color: string; label: string }>;
}

export function MultiSeriesHeatmap({
  data = [],
  seriesConfig = {},
  ...props
}: MultiSeriesHeatmapProps) {
  // Flatten data and add series information to each point
  const flattenedData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];

    try {
      return data.flatMap((seriesData) => {
        if (
          !seriesData ||
          !seriesData.points ||
          !Array.isArray(seriesData.points)
        ) {
          return [];
        }

        return seriesData.points.map((point) => ({
          ...point,
          series: seriesData.series || "Unknown",
        }));
      });
    } catch (error) {
      console.error("Error flattening data:", error);
      return [];
    }
  }, [data]);

  // Create config for chart container with proper typing
  const chartConfig = useMemo(() => {
    if (!seriesConfig || typeof seriesConfig !== "object") return {};

    try {
      const config: Record<string, { label: string; color: string }> = {};

      Object.keys(seriesConfig).forEach((key) => {
        const value = seriesConfig[key];
        if (value && typeof value === "object") {
          config[key] = {
            label: value.label || key,
            color: value.color || "#000000",
          };
        }
      });

      return config;
    } catch (error) {
      console.error("Error creating chart config:", error);
      return {};
    }
  }, [seriesConfig]);

  return <HeatmapBase data={flattenedData} config={chartConfig} {...props} />;
}
