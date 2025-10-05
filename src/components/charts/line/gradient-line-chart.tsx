"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface GradientLineChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  yKey: string;
  title?: string;
  height?: number;
  startColor?: string;
  endColor?: string;
  xAxisFormatter?: (value: number | string) => string;
  yAxisFormatter?: (value: number | string) => string;
}

export function GradientLineChart({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  startColor = "var(--chart-1)",
  endColor = "var(--chart-2)",
  xAxisFormatter = (value) => String(value),
  yAxisFormatter = (value) => String(value),
}: GradientLineChartProps) {
  const gradientId = `gradient-${yKey}`;

  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <ChartContainer
        config={{
          [yKey]: {
            label: yKey,
            color: startColor,
          },
        }}
        className={`min-h-[${height}px] w-full`}
      >
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisFormatter}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={yAxisFormatter}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={`url(#${gradientId})`}
            strokeWidth={3}
            dot={{
              r: 4,
              fill: startColor,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: startColor,
              strokeWidth: 0,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
