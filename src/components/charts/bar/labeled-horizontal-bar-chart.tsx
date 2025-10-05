"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type LabeledDataPoint = {
  name: string;
  value: number;
  [key: string]: unknown;
};

export interface LabeledHorizontalBarChartProps {
  data: LabeledDataPoint[];
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
    label?: string;
  };
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  tooltipContent?: ReactNode;
  labelPosition?:
    | "inside"
    | "outside"
    | "insideLeft"
    | "insideRight"
    | "insideTop"
    | "insideBottom"
    | "right";
  labelOffset?: number;
  labelFormatter?: (value: unknown) => string;
  accessibilityLabel?: string;
}

export function LabeledHorizontalBarChart({
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
  margin = { top: 5, right: 50, left: 20, bottom: 5 },
  colors = {
    bar: "var(--color-chart-1)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
    label: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  labelPosition = "right",
  labelOffset = 8,
  labelFormatter = (value) => String(value),
  accessibilityLabel = "Horizontal bar chart with labels",
}: LabeledHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.bar,
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

        <Bar
          dataKey={dataKey}
          fill={`var(--color-${dataKey})`}
          radius={barRadius}
        >
          <LabelList
            dataKey={dataKey}
            position={labelPosition}
            offset={labelOffset}
            formatter={labelFormatter}
            className={`fill-[${colors.label}]`}
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
