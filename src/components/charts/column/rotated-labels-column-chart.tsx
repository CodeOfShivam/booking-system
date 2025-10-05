"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface RotatedBarChartProps<T> {
  data: T[];
  xKey: keyof T & string;
  yKey: keyof T & string;
  config: Record<string, { label: string; color: string }>;
  height?: number;
  barSize?: number;
  xAxisLabelAngle?: number;
}

// Custom annotation above bars
const CustomAnnotation = ({
  x,
  y,
  value,
}: {
  x: number;
  y: number;
  value: number;
}) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={-10}
      textAnchor="middle"
      fill="hsl(var(--foreground))"
      fontSize={12}
    >
      {value}
    </text>
  </g>
);

export default function RotatedBarChart<T>({
  data,
  xKey,
  yKey,
  config,
  height = 400,
  barSize = 40,
  xAxisLabelAngle = -45,
}: RotatedBarChartProps<T>) {
  return (
    <div style={{ height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ShadcnChartContainer config={config}>
          <BarChart
            data={data}
            margin={{ top: 40, right: 30, left: 20, bottom: 100 }}
            barCategoryGap={30}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={30}
              angle={xAxisLabelAngle}
              textAnchor="end"
              height={100}
              interval={0}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
              dataKey={yKey}
              fill="var(--color-value)"
              radius={[4, 4, 0, 0]}
              barSize={barSize}
              label={({ x, y, value }) => (
                <CustomAnnotation
                  x={x + barSize / 2}
                  y={y}
                  value={value as number}
                />
              )}
            />
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
