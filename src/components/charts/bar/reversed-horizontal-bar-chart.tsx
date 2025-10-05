"use client";

import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type ReversedDataPoint = {
  name: string;
  value: number;
  [key: string]: unknown; // changed from any to unknown
};

export interface ReversedHorizontalBarChartProps {
  data: ReversedDataPoint[];
  dataKey?: string;
  nameKey?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  barSize?: number;
  barRadius?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  colors?: {
    bar?: string;
    grid?: string;
    text?: string;
  };
  xAxisProps?: Record<string, string | number | boolean>; // stricter typing than any
  yAxisProps?: Record<string, string | number | boolean>;
  tooltipContent?: ReactNode;
  accessibilityLabel?: string;
}

export function ReversedHorizontalBarChart({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 400,
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  barSize,
  barRadius = 4,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  colors = {
    bar: "var(--color-chart-1)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  accessibilityLabel = "Reversed horizontal bar chart",
}: ReversedHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.bar,
    },
  };

  // Sort data in descending order
  const sortedData = [...data].sort(
    (a, b) => (b[dataKey] as number) - (a[dataKey] as number)
  );

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("w-full", className)}
      style={{ height }}
      aria-label={accessibilityLabel}
    >
      <BarChart
        data={sortedData}
        layout="vertical"
        margin={margin}
        barSize={barSize}
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

        <Bar dataKey={dataKey} fill={colors.bar} radius={barRadius} />
      </BarChart>
    </ChartContainer>
  );
}
