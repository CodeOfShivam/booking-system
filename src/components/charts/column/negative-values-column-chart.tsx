"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface NegativeBarChartProps<T> {
  data: T[];
  xKey: keyof T & string;
  yKey: keyof T & string;
  config: Record<string, { label: string; color: string }>;
  height?: number;
  barSize?: number;
  positiveColor?: string;
  negativeColor?: string;
}

export default function NegativeBarChart<T>({
  data,
  xKey,
  yKey,
  config,
  height = 400,
  barSize = 30,
}: NegativeBarChartProps<T>) {
  return (
    <div style={{ height: height, width: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <ShadcnChartContainer config={config}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <ReferenceLine y={0} stroke="var(--muted-foreground)" />
            <Bar dataKey={yKey} radius={4} barSize={barSize}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
