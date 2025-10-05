"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

import { ChartContainer } from "@/components/ui/chart";

interface MultipleSlopeChartsProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function MultipleSlopeCharts({
  data = [
    { a: 10, b: 20, c: 15 },
    { a: 15, b: 15, c: 18 },
    { a: 13, b: 18, c: 16 },
    { a: 17, b: 22, c: 19 },
    { a: 20, b: 19, c: 22 },
    { a: 25, b: 25, c: 20 },
    { a: 22, b: 30, c: 25 },
  ],
  className,
}: MultipleSlopeChartsProps) {
  return (
    <ChartContainer
      config={{
        a: {
          label: "Series A",
          color: "hsl(var(--chart-1))",
        },
        b: {
          label: "Series B",
          color: "hsl(var(--chart-2))",
        },
        c: {
          label: "Series C",
          color: "hsl(var(--chart-3))",
        },
      }}
      className={`h-10 ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="a"
            stroke="var(--color-a)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="b"
            stroke="var(--color-b)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="c"
            stroke="var(--color-c)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
