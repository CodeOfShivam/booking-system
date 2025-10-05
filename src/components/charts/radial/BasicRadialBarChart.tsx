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

interface BasicRadialBarChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function BasicRadialBarChart({
  data = [
    { name: "18-24", value: 31.47, fill: "var(--color-18-24)" },
    { name: "25-29", value: 26.69, fill: "var(--color-25-29)" },
    { name: "30-34", value: 15.69, fill: "var(--color-30-34)" },
    { name: "35-39", value: 8.22, fill: "var(--color-35-39)" },
    { name: "40-49", value: 8.63, fill: "var(--color-40-49)" },
    { name: "50+", value: 2.63, fill: "var(--color-50-plus)" },
  ],
  className,
}: BasicRadialBarChartProps) {
  return (
    <ChartContainer
      config={{
        "18-24": {
          label: "18-24",
          color: "var(--chart-1)",
        },
        "25-29": {
          label: "25-29",
          color: "var(--chart-2)",
        },
        "30-34": {
          label: "30-34",
          color: "var(--chart-3)",
        },
        "35-39": {
          label: "35-39",
          color: "var(--chart-4)",
        },
        "40-49": {
          label: "40-49",
          color: "var(--chart-5)",
        },
        "50-plus": {
          label: "50+",
          color: "var(--chart-6)",
        },
      }}
      className={`aspect-square min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minPointSize={15}
            background
            dataKey="value"
            cornerRadius={10}
          />
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
