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

interface MultipleRadialBarsChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function MultipleRadialBarsChart({
  data = [
    { name: "18-24", uv: 31.47, pv: 25.69, fill: "var(--color-18-24)" },
    { name: "25-29", uv: 26.69, pv: 31.47, fill: "var(--color-25-29)" },
    { name: "30-34", uv: 15.69, pv: 19.69, fill: "var(--color-30-34)" },
    { name: "35-39", uv: 8.22, pv: 10.22, fill: "var(--color-35-39)" },
  ],
  className,
}: MultipleRadialBarsChartProps) {
  return (
    <ChartContainer
      config={{
        "18-24": {
          label: "18-24",
          color: "hsl(var(--chart-1))",
        },
        "25-29": {
          label: "25-29",
          color: "hsl(var(--chart-2))",
        },
        "30-34": {
          label: "30-34",
          color: "hsl(var(--chart-3))",
        },
        "35-39": {
          label: "35-39",
          color: "hsl(var(--chart-4))",
        },
        uv: {
          label: "UV",
          color: "hsl(var(--chart-5))",
        },
        pv: {
          label: "PV",
          color: "hsl(var(--chart-6))",
        },
      }}
      className={`aspect-square min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            label={{ fill: "hsl(var(--foreground))", position: "insideStart" }}
            background
            dataKey="uv"
            cornerRadius={10}
          />
          <RadialBar
            label={{ fill: "hsl(var(--foreground))", position: "insideStart" }}
            background
            dataKey="pv"
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
