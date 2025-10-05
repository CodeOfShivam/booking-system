"use client";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  ComposedChart,
  Bar,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type OHLCData = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type ChartConfig = {
  bullish?: { label: string; color: string };
  bearish?: { label: string; color: string };
  wick?: { label: string; color: string };
};

interface CandlestickChartProps {
  data: OHLCData[];
  config?: ChartConfig;
  className?: string;
}

export default function CandlestickChart({
  data,
  config,
  className,
}: CandlestickChartProps) {
  const defaultConfig = {
    bullish: {
      label: "Bullish",
      color: "hsl(142, 76%, 36%)", // Green
    },
    bearish: {
      label: "Bearish",
      color: "hsl(346, 84%, 46%)", // Red
    },
    wick: {
      label: "Price Range",
      color: "var(--foreground)", // Neutral
    },
  };

  const chartConfig = { ...defaultConfig, ...config };

  const processedData = data.map((item) => {
    return {
      ...item,
      bodyHeight: Math.abs(item.close - item.open),
      bodyY: Math.min(item.close, item.open),
      wickHeight: item.high - item.low,
      y: item.low,
      isBullish: item.close > item.open,
    };
  });

  return (
    <ChartContainer config={chartConfig} className={className}>
      <ComposedChart
        data={processedData}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis
          domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <Legend />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }
            />
          }
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />

        {/* Wick line */}
        <Bar
          dataKey="wickHeight"
          fill={chartConfig.wick.color}
          stroke={chartConfig.wick.color}
          yAxisId={0}
          barSize={2}
          stackId="wick"
          radius={0}
          name="wick"
          isAnimationActive={false}
          y="y"
        />

        {/* Bullish candle */}
        <Bar
          dataKey={(d) => (d.isBullish ? d.bodyHeight : 0)}
          fill={chartConfig.bullish.color}
          stroke={chartConfig.bullish.color}
          yAxisId={0}
          barSize={10}
          stackId="body"
          radius={0}
          name="open"
          isAnimationActive={false}
        />

        {/* Bearish candle */}
        <Bar
          dataKey={(d) => (!d.isBullish ? d.bodyHeight : 0)}
          fill={chartConfig.bearish.color}
          stroke={chartConfig.bearish.color}
          yAxisId={0}
          barSize={10}
          stackId="body"
          radius={0}
          name="close"
          isAnimationActive={false}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
