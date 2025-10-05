"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

export type MarkerDataPoint = {
  name: string;
  value: number;
  [key: string]: unknown;
};

export interface MarkerHorizontalBarChartProps {
  data: MarkerDataPoint[];
  dataKey?: string;
  nameKey?: string;
  markers: Array<{
    value: number;
    label?: string;
    color?: string;
    dashed?: boolean;
  }>;
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
    marker?: string;
  };
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  tooltipContent?: ReactNode;
  accessibilityLabel?: string;
}

export function MarkerHorizontalBarChart({
  data,
  dataKey = "value",
  nameKey = "name",
  markers = [],
  height = 400,
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  barSize,
  barRadius = 4,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  colors = {
    bar: "var(--color-chart-1)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
    marker: "var(--color-destructive)",
  },
  xAxisProps = {},
  yAxisProps = {},
  accessibilityLabel = "Horizontal bar chart with markers",
}: MarkerHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.bar,
    },
  };

  const CustomTooltipContent = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const value = payload[0]?.value as number;

      const nearbyMarkers = markers.filter((marker) => {
        const diff = Math.abs(marker.value - value);
        const range = Math.max(...data.map((d) => Number(d[dataKey]))) * 0.05;
        return diff <= range;
      });

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="font-medium">{label}</div>
          <div className="flex items-center gap-2 text-sm">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: payload[0]?.color }}
            />
            <span>{payload[0]?.name}: </span>
            <span className="font-medium">{value}</span>
          </div>

          {nearbyMarkers.length > 0 && (
            <div className="mt-2 border-t pt-1 text-sm">
              <div className="font-medium">Nearby Markers:</div>
              {nearbyMarkers.map((marker, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: marker.color || colors.marker,
                    }}
                  />
                  <span>{marker.label || `Marker at ${marker.value}`}</span>
                </div>
              ))}
            </div>
          )}
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
            {...xAxisProps}
          />
        )}

        {showTooltip && (
          <ChartTooltip
            cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
            content={<CustomTooltipContent />}
          />
        )}

        {markers.map((marker, index) => (
          <ReferenceLine
            key={`marker-${index}`}
            x={marker.value}
            stroke={marker.color || colors.marker}
            strokeWidth={2}
            strokeDasharray={marker.dashed ? "5 5" : undefined}
            label={{
              value: marker.label,
              position: "top",
              fill: marker.color || colors.marker,
              fontSize: 12,
            }}
          />
        ))}

        <Bar
          dataKey={dataKey}
          fill={`var(--color-${dataKey})`}
          radius={barRadius}
        />
      </BarChart>
    </ChartContainer>
  );
}
