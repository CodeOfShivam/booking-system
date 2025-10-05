"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type NullValueData = {
  month: string;
  value: number | null; // Allow null values
};

interface NullValuesAreaChartProps {
  data: NullValueData[];
}

export default function NullValuesAreaChart({
  data,
}: NullValuesAreaChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Monthly Value",
          color: "var(--chart-4)",
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
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Area
          type="monotone"
          dataKey="value"
          fill="var(--color-value)"
          fillOpacity={0.3}
          stroke="var(--color-value)"
          strokeWidth={2}
          // Set to true to connect across null values, false to show gaps
          connectNulls={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
