"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type NegativeDataPoint = {
  name: string;
  value: number;
  [key: string]: string | number | undefined;
};

export interface NegativeHorizontalBarChartProps {
  data: NegativeDataPoint[];
  dataKey?: string;
  nameKey?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showReferenceLine?: boolean;
  barSize?: number;
  barRadius?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  colors?: {
    positive?: string;
    negative?: string;
    grid?: string;
    text?: string;
    referenceLine?: string;
  };
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  tooltipContent?: ReactNode;
  accessibilityLabel?: string;
}

export function NegativeHorizontalBarChart({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 400,
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showReferenceLine = true,
  barSize,
  barRadius = 4,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  colors = {
    positive: "var(--color-chart-1)",
    negative: "var(--color-chart-2)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
    referenceLine: "var(--color-muted-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  accessibilityLabel = "Horizontal bar chart with negative values",
}: NegativeHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.positive,
    },
  };

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

        {showReferenceLine && (
          <ReferenceLine x={0} stroke={colors.referenceLine} strokeWidth={2} />
        )}

        <Bar dataKey={dataKey} radius={barRadius}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                typeof entry[dataKey] === "number" && entry[dataKey] >= 0
                  ? colors.positive
                  : colors.negative
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
