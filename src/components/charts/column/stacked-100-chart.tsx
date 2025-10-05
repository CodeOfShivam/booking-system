"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer as ShadcnChartContainer } from "@/components/ui/chart";

interface ChartDataItem {
  [key: string]: number | string | null;
}

interface StackKeyConfig {
  label: string;
  color: string;
}

interface Stacked100ColumnChartProps {
  data: ChartDataItem[];
  xKey: string;
  stackKeys: string[];
  config: Record<string, StackKeyConfig>;
  className?: string;
  barSize?: number;
  stackId?: string;
}

// Tooltip payload item type
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

// Props for the CustomTooltip component
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

// Converts a value to a percentage of the total
const getPercent = (value: number, total: number) =>
  total > 0 ? Math.round((value / total) * 100) : 0;

// Custom tooltip to show percentages
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum, entry) => sum + entry.value, 0);

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="font-medium">{label}</div>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>
              {entry.name}: {getPercent(entry.value, total)}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function Stacked100ColumnChart({
  data,
  xKey,
  stackKeys,
  config,
  className = "h-[400px] w-full",
  barSize = 30,
  stackId = "stack",
}: Stacked100ColumnChartProps) {
  return (
    <ShadcnChartContainer config={config}>
      <div className={className}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            stackOffset="expand"
            barCategoryGap={20}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) =>
                `${Math.round((value as number) * 100)}%`
              }
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Legend />
            {stackKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                stackId={stackId}
                fill={`var(--color-${key})`}
                radius={index === 0 ? [4, 4, 0, 0] : 0}
                barSize={barSize}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ShadcnChartContainer>
  );
}
