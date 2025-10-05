"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { BubbleDataPoint } from "./bubble-chart";

interface SimpleBubbleChartProps {
  data: BubbleDataPoint[];
  xAxisLabel: string;
  yAxisLabel: string;
  height: number;
  onBubbleClick?: (bubble: BubbleDataPoint) => void;
}

export function SimpleBubbleChart({
  data,
  xAxisLabel,
  yAxisLabel,
  height,
  onBubbleClick,
}: SimpleBubbleChartProps) {
  // Group data by category for multiple scatter plots
  const groupedData = data.reduce((acc, item) => {
    const category = item.category || "default";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, BubbleDataPoint[]>);

  // Get unique categories
  const categories = Object.keys(groupedData);

  // Handle click on a bubble
  const handleClick = (data: {
    payload?: BubbleDataPoint;
    // Other Recharts event data fields can be added if needed
  }) => {
    if (onBubbleClick && data.payload) {
      onBubbleClick(data.payload);
    }
  };

  return (
    <ChartContainer
      config={{
        x: {
          label: xAxisLabel,
        },
        y: {
          label: yAxisLabel,
        },
        z: {
          label: "Size",
        },
        ...categories.reduce((acc, category) => {
          const color = groupedData[category][0].color ?? "#000000";
          acc[category] = {
            label: category,
            color: color,
          };
          return acc;
        }, {} as Record<string, { label: string; color: string }>),
      }}
      className={`min-h-[${height}px]`}
    >
      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisLabel}
            label={{
              value: xAxisLabel,
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel}
            label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
          />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Size" />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  if (name === "x") return [value, xAxisLabel];
                  if (name === "y") return [value, yAxisLabel];
                  if (name === "z") return [value, "Size"];
                  return [value, name];
                }}
              />
            }
          />
          <Legend />

          {categories.map((category) => (
            <Scatter
              key={category}
              name={category}
              data={groupedData[category]}
              fill={groupedData[category][0].color}
              onClick={handleClick}
              cursor="pointer"
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
