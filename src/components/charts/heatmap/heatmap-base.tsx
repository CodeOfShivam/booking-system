"use client";

import {
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ScatterChart,
  Scatter,
} from "recharts";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";

export interface HeatmapDataPoint {
  x: string | number;
  y: string | number;
  value: number;
  series?: string;
}

export interface HeatmapProps {
  data: HeatmapDataPoint[];
  width?: number;
  height?: number;
  xAxisDataKey?: string;
  yAxisDataKey?: string;
  valueDataKey?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colorRange?: string[];
  minValue?: number;
  maxValue?: number;
  cellSize?: number; // You can decide to use it later or remove this prop if unused
  showLegend?: boolean;
  showTooltip?: boolean;
  className?: string;
  config?: ChartConfig;
}

export function HeatmapBase({
  data = [],
  width = 800,
  height = 400,
  xAxisDataKey = "x",
  yAxisDataKey = "y",
  xAxisLabel,
  yAxisLabel,
  colorRange = ["#f3f4f6", "#4f46e5"],
  minValue,
  maxValue,
  cellSize = 20, // Currently unused, remove if not needed
  showLegend = true,
  showTooltip = true,
  className,
  config = {},
}: HeatmapProps) {
  console.log(cellSize);

  if (!data || data.length === 0) {
    return (
      <ChartContainer
        config={config}
        className={cn(
          "min-h-[400px] flex items-center justify-center",
          className
        )}
      >
        <div className="text-muted-foreground">No data available</div>
      </ChartContainer>
    );
  }

  const calculatedMinValue =
    minValue ?? Math.min(...data.map((item) => item.value));
  const calculatedMaxValue =
    maxValue ?? Math.max(...data.map((item) => item.value));

  // Legend content does not receive recharts LegendProps, so keep as is
  const renderLegend = () => {
    if (!colorRange || colorRange.length === 0) return null;

    return (
      <div className="flex items-center justify-end mb-4 text-xs">
        <span className="mr-2">{calculatedMinValue}</span>
        <div
          className="w-24 h-4 rounded"
          style={{
            background: `linear-gradient(to right, ${colorRange.join(", ")})`,
          }}
        />
        <span className="ml-2">{calculatedMaxValue}</span>
      </div>
    );
  };

  return (
    <ChartContainer config={config} className={cn("min-h-[400px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={width}
          height={height}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis
            type="category"
            dataKey={xAxisDataKey}
            name={xAxisLabel || xAxisDataKey}
            allowDuplicatedCategory={false}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey={yAxisDataKey}
            name={yAxisLabel || yAxisDataKey}
            allowDuplicatedCategory={false}
            tickLine={false}
            axisLine={false}
          />
          {showTooltip && <Tooltip cursor={false} />}
          <Scatter name="Heatmap" data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
          </Scatter>
          {showLegend && (
            <Legend verticalAlign="top" align="right" content={renderLegend} />
          )}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
