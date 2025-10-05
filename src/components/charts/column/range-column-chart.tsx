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

type RangeColumnChartProps = {
  data: { [key: string]: number | string }[]; // The chart data
  config: {
    min: {
      label: string;
      color: string;
    };
    max: {
      label: string;
      color: string;
    };
  };
};

export default function RangeColumnChart({
  data,
  config,
}: RangeColumnChartProps) {
  return (
    <ShadcnChartContainer
      config={{
        min: {
          label: config.min.label,
          color: config.min.color,
        },
        max: {
          label: config.max.label,
          color: config.max.color,
        },
      }}
      className="h-[400px] w-full"
    >
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={0}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
              dataKey="min"
              fill={config.min.color}
              radius={[0, 0, 4, 4]}
              barSize={30}
            />
            <Bar
              dataKey="max"
              fill={config.max.color}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ShadcnChartContainer>
  );
}
