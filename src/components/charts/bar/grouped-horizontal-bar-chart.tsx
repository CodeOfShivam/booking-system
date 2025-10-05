"use client";

import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type GroupedDataPoint = {
  name: string;
  [key: string]: number | string;
};

export interface GroupedHorizontalBarChartProps {
  data: GroupedDataPoint[];
  dataKeys: string[];
  nameKey?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  barSize?: number;
  barRadius?: number;
  barGap?: number;
  barCategoryGap?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  colors?: {
    grid?: string;
    text?: string;
  };
  xAxisProps?: Record<string, number | string>;
  yAxisProps?: Record<string, number | string>;
  tooltipContent?: ReactNode;
  legendProps?: Record<string, number | string>;
  accessibilityLabel?: string;
}

export function GroupedHorizontalBarChart({
  data,
  dataKeys,
  nameKey = "name",
  height = 400,
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  barSize,
  barRadius = 4,
  barGap = 4,
  barCategoryGap = 16,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  colors = {
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  legendProps = {},
  accessibilityLabel = "Grouped horizontal bar chart",
}: GroupedHorizontalBarChartProps) {
  // Create chart config with all data keys
  const chartConfig = dataKeys.reduce((config, key, index) => {
    return {
      ...config,
      [key]: {
        label: key,
        color: `var(--color-chart-${(index % 5) + 1})`,
      },
    };
  }, {});

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("w-full", className)}
      style={{ height }}
      aria-label={accessibilityLabel}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={margin}
        barSize={barSize}
        barGap={barGap}
        barCategoryGap={barCategoryGap}
        accessibilityLayer
      >
        {showGrid && (
          <CartesianGrid
            horizontal={true}
            vertical={false}
            stroke={colors.grid}
            strokeDasharray="3 3"
          />
        )}

        {showYAxis && (
          <YAxis
            type="category"
            dataKey={nameKey}
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text }}
            width={120}
            {...yAxisProps}
          />
        )}

        {showXAxis && (
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text }}
            {...xAxisProps}
          />
        )}

        {showTooltip && (
          <ChartTooltip
            cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            content={<ChartTooltipContent />}
          />
        )}

        {dataKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={barRadius}
          />
        ))}

        {showLegend && (
          <Legend verticalAlign="top" align="right" {...legendProps} />
        )}
      </BarChart>
    </ChartContainer>
  );
}
