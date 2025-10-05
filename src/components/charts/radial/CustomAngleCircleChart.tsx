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

interface CustomAngleCircleChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
  startAngle?: number;
  endAngle?: number;
}

export function CustomAngleCircleChart({
  data = [
    { name: "A", value: 80, fill: "var(--color-A)" },
    { name: "B", value: 65, fill: "var(--color-B)" },
    { name: "C", value: 45, fill: "var(--color-C)" },
  ],
  startAngle = 90,
  endAngle = -270,
  className,
}: CustomAngleCircleChartProps) {
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
          startAngle={startAngle}
          endAngle={endAngle}
        >
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
