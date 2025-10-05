"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type StackedPercentDataPoint = {
  name: string;
  [key: string]: number | string;
};

export interface StackedPercentHorizontalBarChartProps {
  data: StackedPercentDataPoint[];
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

export function StackedPercentHorizontalBarChart({
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
  accessibilityLabel = "100% stacked horizontal bar chart",
}: StackedPercentHorizontalBarChartProps) {
  const chartConfig = dataKeys.reduce((config, key, index) => {
    return {
      ...config,
      [key]: {
        label: key,
        color: `var(--color-chart-${(index % 5) + 1})`,
      },
    };
  }, {} as Record<string, { label: string; color: string }>);

  const CustomTooltipContent = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const total = payload.reduce(
        (sum, entry) =>
          sum + (typeof entry.value === "number" ? entry.value : 0),
        0
      );

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="font-medium">{label}</div>
          {payload.map((entry, idx) => (
            <div
              key={`item-${idx}`}
              className="flex items-center gap-2 text-sm"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: entry.color || "gray" }}
              />
              <span>{entry.name}: </span>
              <span className="font-medium">
                {entry.value} (
                {total > 0 && typeof entry.value === "number"
                  ? `${((entry.value / total) * 100).toFixed(1)}%`
                  : "0%"}
                )
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
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
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            {...xAxisProps}
          />
        )}

        {showTooltip && (
          <ChartTooltip
            cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            content={<CustomTooltipContent />}
          />
        )}

        {dataKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={barRadius}
            stackId="percent"
          />
        ))}

        {showLegend && (
          <Legend verticalAlign="top" align="right" {...legendProps} />
        )}
      </BarChart>
    </ChartContainer>
  );
}
