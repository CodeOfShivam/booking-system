"use client";

import {
  CartesianGrid,
  Line,
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

interface OHLCData {
  [key: string]: unknown;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: OHLCData[];
  xKey: string;
  maKey?: string;
  showMA?: boolean;
  colorConfig?: {
    bullish?: string;
    bearish?: string;
    wick?: string;
    ma?: string;
  };
  className?: string;
}

export default function CandlestickWithLineChart({
  data,
  xKey,
  maKey = "ma",
  showMA = false,
  colorConfig,
  className = "min-h-[400px]",
}: CandlestickChartProps) {
  const config = {
    bullish: colorConfig?.bullish || "hsl(142, 76%, 36%)",
    bearish: colorConfig?.bearish || "hsl(346, 84%, 46%)",
    wick: colorConfig?.wick || "hsl(var(--foreground))",
    ma: colorConfig?.ma || "hsl(217, 91%, 60%)",
  };

  const processedData = data.map((item) => ({
    ...item,
    bodyHeight: Math.abs(item.close - item.open),
    bodyY: Math.min(item.close, item.open),
    wickHeight: item.high - item.low,
    wickY: item.low,
    isBullish: item.close > item.open,
  }));

  return (
    <ChartContainer
      config={{
        bullish: { label: "Bullish", color: config.bullish },
        bearish: { label: "Bearish", color: config.bearish },
        wick: { label: "Price Range", color: config.wick },
        ...(showMA && { ma: { label: "Moving Average", color: config.ma } }),
      }}
      className={className}
    >
      <ComposedChart
        data={processedData}
        margin={{ top: 20, right: 0, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xKey}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            typeof value === "string" && !isNaN(Date.parse(value))
              ? new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : value
          }
        />
        <YAxis domain={["auto", "auto"]} tickLine={false} axisLine={false} />

        <Legend />

        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(label) =>
                typeof label === "string" && !isNaN(Date.parse(label))
                  ? new Date(label).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : label
              }
            />
          }
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />

        {/* Wick */}
        <Bar
          dataKey="wickHeight"
          fill={config.wick}
          stroke={config.wick}
          barSize={2}
          stackId="wick"
          radius={0}
          name="wick"
          isAnimationActive={false}
          yAxisId={0}
        />

        {/* Bullish */}
        <Bar
          dataKey={(d) => (d.isBullish ? d.bodyHeight : 0)}
          fill={config.bullish}
          stroke={config.bullish}
          barSize={10}
          stackId="body"
          radius={0}
          name="open"
          isAnimationActive={false}
          yAxisId={0}
        />

        {/* Bearish */}
        <Bar
          dataKey={(d) => (!d.isBullish ? d.bodyHeight : 0)}
          fill={config.bearish}
          stroke={config.bearish}
          barSize={10}
          stackId="body"
          radius={0}
          name="close"
          isAnimationActive={false}
          yAxisId={0}
        />

        {/* Moving Average Line */}
        {showMA && (
          <Line
            type="monotone"
            dataKey={maKey}
            stroke={config.ma}
            strokeWidth={2}
            dot={false}
            name="ma"
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
