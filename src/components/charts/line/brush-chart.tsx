"use client";

import { Brush, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BrushChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  yKey: string;
  title?: string;
  height?: number;
  color?: string;
  xAxisFormatter?: (value: number | string) => string;
  yAxisFormatter?: (value: number | string) => string;
  brushHeight?: number;
  brushStartIndex?: number;
  brushEndIndex?: number;
}

export function BrushChart({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  color = "var(--chart-1)",
  xAxisFormatter = (value) => String(value),
  yAxisFormatter = (value) => String(value),
  brushHeight = 40,
  brushStartIndex = 0,
  brushEndIndex = data.length > 10 ? 9 : data.length - 1,
}: BrushChartProps) {
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
        className={`min-h-[${height + brushHeight + 20}px] w-full`}
      >
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: brushHeight + 20,
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
            type="monotone"
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
          <Brush
            dataKey={xKey}
            height={brushHeight}
            stroke="var(--border)"
            fill="var(--background)"
            startIndex={brushStartIndex}
            endIndex={brushEndIndex}
            tickFormatter={xAxisFormatter}
          />
        </LineChart>
      </ChartContainer>
      <p className="text-center text-sm text-muted-foreground">
        Use the brush below to select a time range
      </p>
    </div>
  );
}
