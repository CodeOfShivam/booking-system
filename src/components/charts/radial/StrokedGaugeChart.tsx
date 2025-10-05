"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface StrokedGaugeChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
  value?: number;
  maxValue?: number;
}

export function StrokedGaugeChart({
  data,
  value = 75,
  maxValue = 100,
  className,
}: StrokedGaugeChartProps) {
  console.log(maxValue);

  // Generate data if not provided
  const chartData = data || [
    { name: "value", value, fill: "var(--color-value)" },
  ];

  return (
    <ChartContainer
      config={{
        value: {
          label: "Progress",
          color: "hsl(var(--chart-1))",
        },
      }}
      className={`aspect-square min-h-[300px] relative ${className}`}
    >
      <>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-3xl font-bold">{value}%</div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="80%"
            outerRadius="90%"
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </>
    </ChartContainer>
  );
}
