"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface XYScatterChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function XYScatterChart({
  data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ],
  className,
}: XYScatterChartProps) {
  return (
    <ChartContainer
      config={{
        scatter: {
          label: "Data Points",
          color: "var(--chart-1)",
        },
      }}
      className={`min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X Value" />
          <YAxis type="number" dataKey="y" name="Y Value" />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Z Value" />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<ChartTooltipContent />}
          />
          <Scatter name="Data Points" data={data} fill="var(--color-scatter)" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
