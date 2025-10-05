"use client";

import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GradientChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function GradientChart({
  data = [
    { name: "A", value: 80, fill: "url(#gradientA)" },
    { name: "B", value: 65, fill: "url(#gradientB)" },
    { name: "C", value: 45, fill: "url(#gradientC)" },
  ],
  className,
}: GradientChartProps) {
  return (
    <ChartContainer
      config={{
        A: {
          label: "Group A",
          color: "hsl(var(--chart-1))",
        },
        B: {
          label: "Group B",
          color: "hsl(var(--chart-2))",
        },
        C: {
          label: "Group C",
          color: "hsl(var(--chart-3))",
        },
      }}
      className={`aspect-square min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="90%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <defs>
            <linearGradient id="gradientA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-1))" />
              <stop offset="100%" stopColor="hsl(var(--chart-1) / 0.5)" />
            </linearGradient>
            <linearGradient id="gradientB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-2))" />
              <stop offset="100%" stopColor="hsl(var(--chart-2) / 0.5)" />
            </linearGradient>
            <linearGradient id="gradientC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--chart-3))" />
              <stop offset="100%" stopColor="hsl(var(--chart-3) / 0.5)" />
            </linearGradient>
          </defs>
          <RadialBar background dataKey="value" cornerRadius={10} />
          <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadialBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
