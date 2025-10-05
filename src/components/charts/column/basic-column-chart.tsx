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

interface ChartDataItem {
  [key: string]: unknown;
}

interface BasicColumnChartProps {
  data: ChartDataItem[];
  xKey: string;
  yKey: string;
  barColor?: string;
  label?: string;
  className?: string;
}

export default function BasicColumnChart({
  data,
  xKey,
  yKey,
  barColor = "var(--chart-1)",
  label = "Value",
  className = "h-[400px]",
}: BasicColumnChartProps) {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <ShadcnChartContainer
          config={{
            [yKey]: {
              label,
              color: barColor,
            },
          }}
        >
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
              dataKey={yKey}
              fill={barColor}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
