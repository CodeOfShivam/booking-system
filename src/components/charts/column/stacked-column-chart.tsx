"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  [key: string]: string | number | null | undefined;
}

interface StackKeyConfig {
  label: string;
  color: string;
}

interface StackedColumnChartProps {
  data: ChartDataItem[];
  xKey: string;
  stackKeys: string[];
  config: Record<string, StackKeyConfig>;
  className?: string;
  barSize?: number;
  stackId?: string;
}

export default function StackedColumnChart({
  data,
  xKey,
  stackKeys,
  config,
  className = "h-[400px] w-full",
  barSize = 40,
  stackId = "stack",
}: StackedColumnChartProps) {
  return (
    <ShadcnChartContainer config={config}>
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
            <Legend />
            {stackKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId={stackId}
                fill={`var(--${config[key].color})`}
                barSize={barSize}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ShadcnChartContainer>
  );
}
