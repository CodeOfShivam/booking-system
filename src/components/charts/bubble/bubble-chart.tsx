"use client";

import { SimpleBubbleChart } from "./simple-bubble-chart";

export type BubbleDataPoint = {
  id: string | number;
  x: number;
  y: number;
  z: number;
  name?: string;
  color?: string;
  category?: string;
};

export type BubbleChartProps = {
  data: BubbleDataPoint[];
  title?: string;
  description?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  zAxisLabel?: string;
  height?: number;
  width?: number;
  className?: string;
  colorMap?: Record<string, string>;
  showTabs?: boolean;
  defaultVariant?: "simple" | "3d";
};

export function BubbleChart({
  data,
  xAxisLabel = "X Axis",
  yAxisLabel = "Y Axis",
  height = 400,
  colorMap,
}: BubbleChartProps) {
  // Generate default colors if not provided
  const defaultColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  // Process data to ensure all points have colors
  const processedData = data.map((point, index) => {
    const category = point.category || "default";
    const color =
      point.color ||
      (colorMap && category in colorMap
        ? colorMap[category]
        : defaultColors[index % defaultColors.length]);

    return {
      ...point,
      color,
    };
  });

  return (
    <SimpleBubbleChart
      data={processedData}
      xAxisLabel={xAxisLabel}
      yAxisLabel={yAxisLabel}
      height={height}
    />
  );
}
