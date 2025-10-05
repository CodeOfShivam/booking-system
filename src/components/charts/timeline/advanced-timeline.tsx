"use client";

import { useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
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

export interface TimelineMarker {
  date: string | number;
  label: string;
  color?: string;
}

export interface AdvancedTimelineProps {
  data: Array<Record<string, number | string>>;
  config: ChartConfig;
  lineKeys: string[];
  areaKeys: string[];
  dateKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  dateFormatter?: (date: string | number) => string;
  markers?: TimelineMarker[];
}

export function AdvancedTimeline({
  data,
  config,
  lineKeys,
  areaKeys,
  dateKey,
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
  markers = [],
}: AdvancedTimelineProps) {
  const [focusKey, setFocusKey] = useState<string | null>(null);

  // const handleLegendMouseEnter = (data: { dataKey: string }) => {
  //   const { dataKey } = data;
  //   setFocusKey(dataKey);
  // };

  const handleLegendMouseLeave = () => {
    setFocusKey(null);
  };

  const isKeyFocused = (key: string) => !focusKey || focusKey === key;

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
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

          {markers.map((marker, index) => (
            <ReferenceLine
              key={`marker-${index}`}
              x={marker.date}
              stroke={marker.color || "var(--color-primary)"}
              strokeDasharray="3 3"
              label={{
                value: marker.label,
                position: "top",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
              }}
            />
          ))}

          {areaKeys.map((key) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              fill={`var(--color-${key})`}
              stroke={`var(--color-${key})`}
              fillOpacity={0.3}
              className={cn(!isKeyFocused(key) ? "opacity-30" : "")}
            />
          ))}

          {lineKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              className={cn(!isKeyFocused(key) ? "opacity-30" : "")}
            />
          ))}

          {showLegend && (
            <Legend
              verticalAlign="top"
              height={60}
              // onMouseEnter={handleLegendMouseEnter}
              onMouseLeave={handleLegendMouseLeave}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
