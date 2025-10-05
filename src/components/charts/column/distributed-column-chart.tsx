"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
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

interface DistributedBarChartProps {
  data: Array<Record<string, unknown>>;
  xKey: string;
  yKey: string;
  colorKey: string;
  config: Record<string, { label: string; color: string }>;
  height?: number;
  barSize?: number;
  barGap?: number;
  barCategoryGap?: number;
}

export default function DistributedBarChart({
  data,
  xKey,
  yKey,
  config,
  height = 400,
  barSize = 40,
  barGap = 20,
  barCategoryGap = 30,
}: DistributedBarChartProps) {
  return (
    <div className={`h-[${height}px] w-full`}>
      <ResponsiveContainer width="100%" height="100%">
        <ShadcnChartContainer config={config}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={barGap}
            barCategoryGap={barCategoryGap}
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
            <Bar dataKey={yKey} radius={[4, 4, 0, 0]} barSize={barSize}>
              {data.map((index) => (
                <Cell key={`bar-${index}`} />
              ))}
            </Bar>
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
