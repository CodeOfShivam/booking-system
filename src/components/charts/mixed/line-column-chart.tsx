"use client";

import { useState } from "react";
import {
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

export interface LineColumnChartProps {
  data: Array<Record<string, number | string>>;
  config: ChartConfig;
  lineKeys: string[];
  barKeys: string[];
  xAxisKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function LineColumnChart({
  data,
  config,
  lineKeys,
  barKeys,
  xAxisKey,
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
}: LineColumnChartProps) {
  const [focusBar, setFocusBar] = useState<string | null>(null);
  const [focusLine, setFocusLine] = useState<string | null>(null);

  const handleLegendMouseLeave = () => {
    setFocusBar(null);
    setFocusLine(null);
  };

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
            yAxisId="left"
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

          {barKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              yAxisId="left"
              fill={`var(--color-${key})`}
              radius={[4, 4, 0, 0]}
              className={cn(focusBar && focusBar !== key ? "opacity-30" : "")}
            />
          ))}

          {lineKeys.map((key) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              yAxisId="right"
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              className={cn(focusLine && focusLine !== key ? "opacity-30" : "")}
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
