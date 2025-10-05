"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface StepLineChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  yKey: string;
  title?: string;
  height?: number;
  color?: string;
  xAxisFormatter?: (value: number | string) => string;
  yAxisFormatter?: (value: number | string) => string;
  stepType?: "step" | "stepBefore" | "stepAfter";
}

export function StepLineChart({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  color = "var(--chart-1)",
  xAxisFormatter = (value) => String(value),
  yAxisFormatter = (value) => String(value),
  stepType = "step",
}: StepLineChartProps) {
  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <ChartContainer
        config={{
          [yKey]: {
            label: yKey,
            color: color,
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
            type={stepType}
            dataKey={yKey}
            stroke={`var(--color-${yKey})`}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: `var(--color-${yKey})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: `var(--color-${yKey})`,
              strokeWidth: 0,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
