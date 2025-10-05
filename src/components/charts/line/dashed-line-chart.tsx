"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DashedLineChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  yKeys: string[];
  title?: string;
  height?: number;
  colors?: string[];
  dashArrays?: string[];
  xAxisFormatter?: (value: number | string) => string;
  yAxisFormatter?: (value: number | string) => string;
}

export function DashedLineChart({
  data,
  xKey,
  yKeys,
  title,
  height = 300,
  colors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"],
  dashArrays = ["", "5 5", "3 3"],
  xAxisFormatter = (value) => String(value),
  yAxisFormatter = (value) => String(value),
}: DashedLineChartProps) {
  // Create config object for ChartContainer
  const config: Record<string, { label: string; color: string }> = {};
  yKeys.forEach((key, index) => {
    config[key] = {
      label: key,
      color: colors[index % colors.length],
    };
  });

  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <ChartContainer config={config} className={`min-h-[${height}px] w-full`}>
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

          {yKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              strokeDasharray={dashArrays[index % dashArrays.length]}
              dot={{
                r: 4,
                fill: `var(--color-${key})`,
                strokeWidth: 0,
              }}
              activeDot={{
                r: 6,
                fill: `var(--color-${key})`,
                strokeWidth: 0,
              }}
            />
          ))}
        </LineChart>
      </ChartContainer>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        {yKeys.map((key, index) => (
          <div key={key} className="flex items-center">
            <div
              className="mr-2 h-3 w-8 rounded-full"
              style={{
                backgroundColor: dashArrays[index % dashArrays.length]
                  ? "transparent"
                  : `var(--color-${key})`,
                borderTop: dashArrays[index % dashArrays.length]
                  ? `2px ${
                      dashArrays[index % dashArrays.length]
                    } var(--color-${key})`
                  : "none",
              }}
            ></div>
            <span>{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
