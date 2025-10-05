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

export interface MultiYAxisChartProps {
  data: Array<Record<string, number | string>>;
  config: ChartConfig;
  yAxisConfigs: {
    key: string;
    position: "left" | "right";
    domain?: [number, number];
    formatter?: (value: number) => string;
  }[];
  xAxisKey: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
}

export function MultiYAxisChart({
  data,
  config,
  yAxisConfigs,
  xAxisKey,
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
}: MultiYAxisChartProps) {
  const [focusLine, setFocusLine] = useState<string | null>(null);

  const handleLegendMouseLeave = () => {
    setFocusLine(null);
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
            dataKey={xAxisKey}
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />

          {yAxisConfigs.map((config) => (
            <YAxis
              key={config.key}
              yAxisId={config.key}
              orientation={config.position}
              domain={config.domain}
              tickFormatter={config.formatter}
              className="text-xs"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
          ))}

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

          {yAxisConfigs.map((config) => (
            <Line
              key={config.key}
              type="monotone"
              dataKey={config.key}
              yAxisId={config.key}
              stroke={`var(--color-${config.key})`}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              className={cn(
                focusLine && focusLine !== config.key ? "opacity-30" : ""
              )}
            />
          ))}

          {showLegend && (
            <Legend
              verticalAlign="top"
              height={60}
              onMouseLeave={handleLegendMouseLeave}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
