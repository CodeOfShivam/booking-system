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

interface GroupedBarChartProps {
  data: unknown[];
  xKey: string;
  groupKey: string;
  barKey: string;
  config: Record<string, { label: string; color: string }>;
  height?: number;
  barSize?: number;
}

interface XAxisProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const CustomGroupedXAxis = ({
  groupKey,
  data,
  xAxisProps,
}: {
  xKey: string;
  groupKey: string;
  data: unknown[];
  xAxisProps: XAxisProps;
}) => {
  const quarters = Array.from(
    new Set(data.map((d) => (d as Record<string, unknown>)[groupKey]))
  );

  const quarterPositions = quarters.map((quarter) => {
    const items = data.filter(
      (d) => (d as Record<string, unknown>)[groupKey] === quarter
    );
    const firstIndex = data.findIndex(
      (d) => (d as Record<string, unknown>)[groupKey] === quarter
    );
    const lastIndex = firstIndex + items.length - 1;
    return {
      quarter,
      position: (firstIndex + lastIndex) / 2,
      width: items.length,
    };
  });

  return (
    <g>
      <XAxis />
      {quarterPositions.map((q, i) => (
        <g
          key={i}
          transform={`translate(${
            xAxisProps.x + (q.position * xAxisProps.width) / data.length
          }, ${xAxisProps.y + 30})`}
        >
          <text
            x={0}
            y={0}
            dy={16}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
            fontWeight="bold"
          >
            {String(q.quarter)}
          </text>
          <line
            x1={-((q.width * xAxisProps.width) / data.length / 2) + 15}
            y1={-5}
            x2={(q.width * xAxisProps.width) / data.length / 2 - 15}
            y2={-5}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
          />
        </g>
      ))}
    </g>
  );
};

export default function GroupedBarChart({
  data,
  xKey,
  groupKey,
  barKey,
  config,
  height = 450,
  barSize = 30,
}: GroupedBarChartProps) {
  return (
    <div className={`h-[${height}px] w-full`}>
      <ResponsiveContainer width="100%" height="100%">
        <ShadcnChartContainer config={config}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={
                <CustomGroupedXAxis
                  xKey={xKey}
                  groupKey={groupKey}
                  data={data}
                  xAxisProps={{
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                  }}
                />
              }
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label, payload) => {
                    if (payload && payload.length > 0) {
                      const item = payload[0].payload;
                      return `${item[groupKey]} - ${label}`;
                    }
                    return label;
                  }}
                />
              }
              cursor={false}
            />
            <Bar
              dataKey={barKey}
              fill={`var(--color-${barKey})`}
              radius={[4, 4, 0, 0]}
              barSize={barSize}
            />
          </BarChart>
        </ShadcnChartContainer>
      </ResponsiveContainer>
    </div>
  );
}
