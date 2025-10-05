"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface SyncedChartsProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  primaryYKey: string;
  secondaryYKey: string;
  title?: string;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  xAxisFormatter?: (value: number | string) => string;
  primaryYAxisFormatter?: (value: number | string) => string;
  secondaryYAxisFormatter?: (value: number | string) => string;
}

export function SyncedCharts({
  data,
  xKey,
  primaryYKey,
  secondaryYKey,
  title,
  height = 200,
  primaryColor = "var(--chart-1)",
  secondaryColor = "var(--chart-2)",
  xAxisFormatter = (value) => String(value),
  primaryYAxisFormatter = (value) => String(value),
  secondaryYAxisFormatter = (value) => String(value),
}: SyncedChartsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  console.log(activeIndex);

  const handleMouseMove = (state: { activeTooltipIndex?: number }) => {
    if (state.activeTooltipIndex !== undefined) {
      setActiveIndex(state.activeTooltipIndex);
    }
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full space-y-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}

      {/* Primary Chart */}
      <ChartContainer
        config={{
          [primaryYKey]: {
            label: primaryYKey,
            color: primaryColor,
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
            bottom: 5,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisFormatter}
            hide
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={primaryYAxisFormatter}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Line
            type="monotone"
            dataKey={primaryYKey}
            stroke={`var(--color-${primaryYKey})`}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: `var(--color-${primaryYKey})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: `var(--color-${primaryYKey})`,
              strokeWidth: 0,
            }}
          />
        </LineChart>
      </ChartContainer>

      {/* Secondary Chart */}
      <ChartContainer
        config={{
          [secondaryYKey]: {
            label: secondaryYKey,
            color: secondaryColor,
          },
        }}
        className={`min-h-[${height}px] w-full`}
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 20,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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
            tickFormatter={secondaryYAxisFormatter}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Line
            type="monotone"
            dataKey={secondaryYKey}
            stroke={`var(--color-${secondaryYKey})`}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: `var(--color-${secondaryYKey})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: `var(--color-${secondaryYKey})`,
              strokeWidth: 0,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
