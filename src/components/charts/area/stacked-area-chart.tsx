"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type StackedData = {
  month: string;
  desktop: number;
  mobile: number;
  tablet: number;
};

interface StackedAreaChartProps {
  data: StackedData[];
}

export default function StackedAreaChart({ data }: StackedAreaChartProps) {
  return (
    <ChartContainer
      config={{
        desktop: {
          label: "Desktop",
          color: "var(--chart-1)",
        },
        mobile: {
          label: "Mobile",
          color: "var(--chart-2)",
        },
        tablet: {
          label: "Tablet",
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
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
        <Area
          type="monotone"
          dataKey="tablet"
          stackId="1"
          fill="var(--color-tablet)"
          fillOpacity={0.6}
          stroke="var(--color-tablet)"
          strokeWidth={1}
        />
        <Area
          type="monotone"
          dataKey="mobile"
          stackId="1"
          fill="var(--color-mobile)"
          fillOpacity={0.6}
          stroke="var(--color-mobile)"
          strokeWidth={1}
        />
        <Area
          type="monotone"
          dataKey="desktop"
          stackId="1"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          stroke="var(--color-desktop)"
          strokeWidth={1}
        />
      </AreaChart>
    </ChartContainer>
  );
}
