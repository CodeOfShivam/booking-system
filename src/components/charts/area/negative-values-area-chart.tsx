"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type NegativeValueData = {
  month: string;
  value: number;
};

interface NegativeValuesAreaChartProps {
  data: NegativeValueData[];
}

export default function NegativeValuesAreaChart({
  data,
}: NegativeValuesAreaChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Profit/Loss",
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
        <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
        <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
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
