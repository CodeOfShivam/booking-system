"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
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

interface DataLabelsColumnChartProps {
  data: ChartDataItem[];
  xKey: string;
  yKey: string;
  label?: string;
  barColor?: string;
  className?: string;
  labelColor?: string;
}

export default function DataLabelsColumnChart({
  data,
  xKey,
  yKey,
  label = "Value",
  barColor = "var(--chart-2)",
  labelColor = "var(--foreground)",
  className = "h-[400px]",
}: DataLabelsColumnChartProps) {
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
            margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
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
            >
              <LabelList
                dataKey={yKey}
                position="top"
                style={{
                  fill: labelColor,
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              />
            </Bar>
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
