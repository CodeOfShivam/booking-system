"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DateTimeData = {
  date: number; // Use timestamp for date
  value: number;
};

interface DateTimeAreaChartProps {
  data: DateTimeData[];
}

export default function DatetimeAreaChart({ data }: DateTimeAreaChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Monthly Value",
          color: "var(--chart-3)",
        },
      }}
      className="min-h-[350px]"
    >
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(timestamp) => {
            return new Date(timestamp).toLocaleDateString("en-US", {
              month: "short",
            });
          }}
          domain={["dataMin", "dataMax"]}
          type="number"
          scale="time"
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) => {
                return new Date(label).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
              }}
            />
          }
          cursor={false}
        />
        <Area
          type="monotone"
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.3}
          stroke="var(--color-value)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
