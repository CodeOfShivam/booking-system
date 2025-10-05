"use client";

import {
  CartesianGrid,
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

export interface TimelineEvent {
  date: string | number;
  value: number;
  [key: string]: number | string;
}

export interface BasicTimelineProps {
  data: TimelineEvent[];
  config: ChartConfig;
  dateKey?: string;
  valueKey?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  dateFormatter?: (date: string | number) => string;
}

export function BasicTimeline({
  data,
  config,
  dateKey = "date",
  valueKey = "value",
  height = 400,
  className,
  showGrid = true,
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
}: BasicTimelineProps) {
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
          <Line
            type="monotone"
            dataKey={valueKey}
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
