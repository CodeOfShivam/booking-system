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

export interface GroupedTimelineData {
  date: string | number;
  groups: {
    [groupName: string]: {
      [seriesName: string]: number;
    };
  };
}

export interface MultiSeriesGroupRowsProps {
  data: GroupedTimelineData[];
  config: ChartConfig;
  groups: string[];
  seriesPerGroup: { [groupName: string]: string[] };
  dateKey?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  dateFormatter?: (date: string | number) => string;
}

export function MultiSeriesGroupRows({
  data,
  config,
  groups,
  seriesPerGroup,
  dateKey = "date",
  height = 400,
  className,
  showGrid = true,
  showLegend = true,
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
}: MultiSeriesGroupRowsProps) {
  const [focusGroup, setFocusGroup] = useState<string | null>(null);
  const [focusSeries, setFocusSeries] = useState<string | null>(null);

  // Transform data for Recharts
  const transformedData = data.map((item) => {
    const result: Record<string, number | string> = {
      [dateKey]: item.date,
    };

    groups.forEach((group) => {
      if (item.groups[group]) {
        Object.entries(item.groups[group]).forEach(([series, value]) => {
          result[`${group}-${series}`] = value;
        });
      }
    });

    return result;
  });

  // Generate all series keys
  const allSeriesKeys = groups.flatMap((group) =>
    (seriesPerGroup[group] || []).map((series) => `${group}-${series}`)
  );

  // const handleLegendMouseEnter = (payload: { dataKey?: string }) => {
  //   if (!payload.dataKey) return;
  //   const [group, series] = payload.dataKey.split("-");
  //   setFocusGroup(group);
  //   setFocusSeries(series);
  // };

  const handleLegendMouseLeave = () => {
    setFocusGroup(null);
    setFocusSeries(null);
  };

  const isSeriesFocused = (key: string) => {
    if (!focusGroup && !focusSeries) return true;

    const [group, series] = key.split("-");
    return focusGroup === group && (!focusSeries || focusSeries === series);
  };

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={transformedData}
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
                formatter={(value, name) => {
                  const [group, series] = String(name).split("-");
                  return [value, `${group}: ${series}`];
                }}
              />
            }
            cursor={false}
          />

          {allSeriesKeys.map((key) => {
            const [group] = key.split("-");
            return (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={`var(--color-${group})`}
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
                className={cn(!isSeriesFocused(key) ? "opacity-30" : "")}
              />
            );
          })}

          {showLegend && (
            <Legend
              verticalAlign="top"
              height={60}
              // onMouseEnter={handleLegendMouseEnter}
              onMouseLeave={handleLegendMouseLeave}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
