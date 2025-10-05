"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export interface DistributedTimelineEvent {
  date: string | number;
  category: string;
  value: number;
  [key: string]: string | number | Date | null | undefined;
}

export interface DistributedTimelineProps {
  data: DistributedTimelineEvent[];
  config: ChartConfig;
  dateKey?: string;
  categoryKey?: string;
  valueKey?: string;
  height?: number;
  className?: string;
  showGrid?: boolean;
  dateFormatter?: (date: string | number) => string;
  categories?: string[];
}

export function DistributedTimeline({
  data,
  config,
  dateKey = "date",
  categoryKey = "category",
  valueKey = "value",
  height = 400,
  className,
  showGrid = true,
  dateFormatter = (date) => new Date(date).toLocaleDateString(),
  categories,
}: DistributedTimelineProps) {
  // Transform data for scatter chart
  const transformedData = data.map((item) => ({
    ...item,
    x: item[dateKey] ? new Date(item[dateKey]).getTime() : new Date().getTime(),
    y: categories ? categories.indexOf(String(item[categoryKey] ?? "")) : 0,
    z: item[valueKey],
  }));

  return (
    <ChartContainer config={config} className={cn("h-full w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border"
            />
          )}
          <XAxis
            dataKey="x"
            type="number"
            domain={["dataMin", "dataMax"]}
            name="Date"
            tickFormatter={(value) => dateFormatter(value)}
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            dataKey="y"
            type="number"
            name="Category"
            tickFormatter={(value) =>
              categories ? categories[value] : String(value)
            }
            className="text-xs"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <ZAxis dataKey="z" range={[50, 500]} name="Value" />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  if (typeof value === "object" && value !== null) {
                    const date = value.x ? dateFormatter(value.x) : "";
                    const category =
                      value.y !== undefined && categories
                        ? categories[value.y]
                        : "";
                    return `${date} - ${category}`;
                  }
                  return String(value);
                }}
              />
            }
            cursor={false}
          />
          <Scatter
            name="Events"
            data={transformedData}
            fill="var(--color-primary)"
            shape="circle"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
