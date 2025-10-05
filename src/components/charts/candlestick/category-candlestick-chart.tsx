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
  category: string;
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

interface CategoryCandlestickChartProps {
  data: OHLCData[];
  config?: ChartConfig;
  className?: string;
}

export default function CategoryCandlestickChart({
  data,
  config,
  className,
}: CategoryCandlestickChartProps) {
  const defaultConfig = {
    bullish: {
      label: "Bullish",
      color: "hsl(142, 76%, 36%)", // green
    },
    bearish: {
      label: "Bearish",
      color: "hsl(346, 84%, 46%)", // red
    },
    wick: {
      label: "Price Range",
      color: "hsl(var(--foreground))", // neutral
    },
  };

  const chartConfig = { ...defaultConfig, ...config };

  const processedData = data.map((item) => ({
    ...item,
    bodyHeight: Math.abs(item.close - item.open),
    bodyY: Math.min(item.close, item.open),
    wickHeight: item.high - item.low,
    wickY: item.low,
    isBullish: item.close > item.open,
  }));

  return (
    <ChartContainer config={chartConfig} className={className}>
      <ComposedChart
        data={processedData}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <YAxis
          domain={["auto", "auto"]}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <Legend />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />

        {/* Wicks */}
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
          y="wickY"
        />

        {/* Bullish */}
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
          y="bodyY"
        />

        {/* Bearish */}
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
