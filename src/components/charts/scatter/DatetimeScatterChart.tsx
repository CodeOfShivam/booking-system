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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DatetimeScatterChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function DatetimeScatterChart({
  data = [
    { date: new Date("2023-01-01").getTime(), value: 200, size: 20 },
    { date: new Date("2023-02-01").getTime(), value: 100, size: 40 },
    { date: new Date("2023-03-01").getTime(), value: 300, size: 30 },
    { date: new Date("2023-04-01").getTime(), value: 250, size: 25 },
    { date: new Date("2023-05-01").getTime(), value: 400, size: 35 },
    { date: new Date("2023-06-01").getTime(), value: 280, size: 15 },
  ],
  className,
}: DatetimeScatterChartProps) {
  return (
    <ChartContainer
      config={{
        scatter: {
          label: "Time Series",
          color: "var(--chart-1)",
        },
      }}
      className={`min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="date"
            name="Date"
            domain={["dataMin", "dataMax"]}
            tickFormatter={(unixTime) =>
              new Date(unixTime).toLocaleDateString()
            }
            scale="time"
          />
          <YAxis type="number" dataKey="value" name="Value" />
          <ZAxis type="number" dataKey="size" range={[60, 400]} name="Size" />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
            }
          />
          <Scatter name="Time Series" data={data} fill="var(--color-scatter)" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
