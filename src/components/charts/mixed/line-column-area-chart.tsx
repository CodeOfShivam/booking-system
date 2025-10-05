"use client";

import { useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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

export interface LineColumnAreaChartProps {
  data: Array<Record<string, number | string>>;
  config: ChartConfig;
  lineKeys: string[];
  barKeys: string[];
  areaKeys: string[];
  xAxisKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function LineColumnAreaChart({
  data,
  config,
  lineKeys,
  barKeys,
  areaKeys,
  xAxisKey,
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
}: LineColumnAreaChartProps) {
  const [focusKey, setFocusKey] = useState<string | null>(null);

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
            dataKey={xAxisKey}
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

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

          {barKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={`var(--color-${key})`}
              radius={[4, 4, 0, 0]}
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
              onMouseLeave={handleLegendMouseLeave}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
