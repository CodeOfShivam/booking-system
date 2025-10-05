"use client";

import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type StackedDataPoint = {
  name: string;
  [key: string]: string | number;
};

export interface StackedHorizontalBarChartProps {
  data: StackedDataPoint[];
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
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  tooltipContent?: ReactNode;
  legendProps?: Record<string, unknown>;
  accessibilityLabel?: string;
}

export function StackedHorizontalBarChart({
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
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  colors = {
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  legendProps = {},
  accessibilityLabel = "Stacked horizontal bar chart",
}: StackedHorizontalBarChartProps) {
  const chartConfig: Record<string, { label: string; color: string }> =
    dataKeys.reduce((config, key, index) => {
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
        accessibilityLayer
      >
        {showGrid && (
          <CartesianGrid
            horizontal
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
            stackId="stack"
          />
        ))}

        {showLegend && (
          <Legend verticalAlign="top" align="right" {...legendProps} />
        )}
      </BarChart>
    </ChartContainer>
  );
}
