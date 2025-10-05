"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataItem {
  [key: string]: unknown;
}

interface SeriesConfig {
  label: string;
  color: string;
}

interface MarkersColumnChartProps {
  data: ChartDataItem[];
  xKey: string;
  barKey: string;
  lineKey: string;
  config: Record<string, SeriesConfig>;
  className?: string;
  barSize?: number;
  height?: number;
}

export default function MarkersColumnChart({
  data,
  xKey,
  barKey,
  lineKey,
  config,
  className = "w-full",
  barSize = 30,
  height = 400,
}: MarkersColumnChartProps) {
  return (
    <ShadcnChartContainer config={config}>
      <div className={`h-[${height}px] ${className}`}>
        <ResponsiveContainer width="100%" height="100%">
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
            <Bar
              dataKey={barKey}
              fill={`var(--color-${barKey})`}
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
            <Line
              type="monotone"
              dataKey={lineKey}
              stroke={`var(--color-${lineKey})`}
              strokeWidth={2}
              dot={{ fill: `var(--color-${lineKey})`, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ShadcnChartContainer>
  );
}
