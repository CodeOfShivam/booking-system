"use client";

import React from "react";
import { HeatmapBase, type HeatmapProps } from "./heatmap-base";

export interface DiscreteHeatmapProps extends HeatmapProps {
  colorRange: string[];
  thresholds?: number[];
}

export function DiscreteHeatmap({
  data = [],
  colorRange = ["#f3f4f6", "#4f46e5"],
  thresholds = [25, 50, 75],
  ...props
}: DiscreteHeatmapProps) {
  // Memoize safeColorRange so reference doesn't change each render
  const safeColorRange = React.useMemo(() => {
    return Array.isArray(colorRange) && colorRange.length > 0
      ? colorRange
      : ["#f3f4f6", "#4f46e5"];
  }, [colorRange]);

  // Memoize safeThresholds similarly
  const safeThresholds = React.useMemo(() => {
    return Array.isArray(thresholds) && thresholds.length > 0
      ? thresholds
      : [25, 50, 75];
  }, [thresholds]);

  // Memoize transformedData based on stable dependencies
  const transformedData = React.useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];

    try {
      return data.map((point) => {
        const { value } = point;
        let discreteValue = 0;

        for (let i = 0; i < safeThresholds.length; i++) {
          if (value >= safeThresholds[i]) {
            discreteValue = i + 1;
          }
        }

        return {
          ...point,
          value: discreteValue,
        };
      });
    } catch (error) {
      console.error("Error transforming data:", error);
      return data;
    }
  }, [data, safeThresholds]);

  return (
    <HeatmapBase
      data={transformedData}
      colorRange={safeColorRange}
      minValue={0}
      maxValue={safeThresholds.length}
      {...props}
    />
  );
}
