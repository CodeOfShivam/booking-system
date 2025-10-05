"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface MultiSeriesTimelineProps {
  data: Array<Record<string, number | string>>;
  config: ChartConfig;
  seriesKeys: string[];
  dateKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  dateFormatter?: (date: string | number) => string;
}

export function MultiSeriesTimeline({
  data,
  config,
  seriesKeys,
  dateKey,
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
}: MultiSeriesTimelineProps) {
  const [focusSeries, setFocusSeries] = useState<string | null>(null);

  const handleLegendMouseEnter = (data: { value: string }) => {
    setFocusSeries(data.value);
  };

  const handleLegendMouseLeave = () => {
    setFocusSeries(null);
  };

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border"
            />
          )}
          <XAxis
            dataKey={dateKey}
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={dateFormatter}
          />
          <YAxis
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return typeof value === "string" || typeof value === "number"
                    ? dateFormatter(value)
                    : String(value);
                }}
              />
            }
            cursor={false}
          />

          {seriesKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              className={cn(
                focusSeries && focusSeries !== key ? "opacity-30" : ""
              )}
            />
          ))}

          {showLegend && (
            <Legend
              verticalAlign="top"
              height={60}
              onMouseEnter={handleLegendMouseEnter}
              onMouseLeave={handleLegendMouseLeave}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
