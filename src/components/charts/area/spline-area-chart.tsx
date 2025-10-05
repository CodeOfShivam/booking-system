"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type SplineData = {
  month: string;
  value: number;
};

interface SplineAreaChartProps {
  data: SplineData[];
}

export default function SplineAreaChart({ data }: SplineAreaChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Monthly Value",
          color: "var(--chart-2)",
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
          type="natural" // This creates the spline/curved effect
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
