"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

interface BasicSlopeChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function BasicSlopeChart({
  data = [
    { value: 10 },
    { value: 15 },
    { value: 13 },
    { value: 17 },
    { value: 20 },
    { value: 25 },
    { value: 22 },
  ],
  className,
}: BasicSlopeChartProps) {
  return (
    <ChartContainer
      config={{
        value: {
          label: "Value",
          color: "hsl(var(--chart-1))",
        },
      }}
      className={`h-10 ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
