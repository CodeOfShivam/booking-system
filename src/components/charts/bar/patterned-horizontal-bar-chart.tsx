"use client";

import type { ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type PatternType =
  | "stripe"
  | "dots"
  | "zigzag"
  | "grid"
  | "diagonal"
  | "solid";

export type PatternedDataPoint = {
  name: string;
  value: number;
  pattern?: PatternType;
  [key: string]: string | number | undefined;
};

export interface PatternedHorizontalBarChartProps {
  data: PatternedDataPoint[];
  dataKey?: string;
  nameKey?: string;
  height?: number | string;
  width?: number | string;
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  barSize?: number;
  barRadius?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  colors?: {
    bar?: string;
    grid?: string;
    text?: string;
  };
  xAxisProps?: Record<string, unknown>;
  yAxisProps?: Record<string, unknown>;
  tooltipContent?: ReactNode;
  legendProps?: Record<string, unknown>;
  accessibilityLabel?: string;
}

export function PatternedHorizontalBarChart({
  data,
  dataKey = "value",
  nameKey = "name",
  height = 400,
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  barSize,
  barRadius = 4,
  margin = { top: 20, right: 30, left: 20, bottom: 5 },
  colors = {
    bar: "var(--color-chart-1)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  legendProps = {},
  accessibilityLabel = "Patterned horizontal bar chart",
}: PatternedHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.bar,
    },
  };

  return (
    <ChartContainer
      config={chartConfig}
      className={cn("w-full", className)}
      style={{ height }}
      aria-label={accessibilityLabel}
    >
      <>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <pattern
              id="stripe-pattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M0,0 l8,8"
                stroke={colors.bar}
                strokeWidth="2"
                fill="none"
              />
            </pattern>
            <pattern
              id="dots-pattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <circle cx="4" cy="4" r="2" fill={colors.bar} />
            </pattern>
            <pattern
              id="zigzag-pattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M0,0 l2,4 l-2,4"
                stroke={colors.bar}
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <pattern
              id="grid-pattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M0,0 h8 v8"
                stroke={colors.bar}
                strokeWidth="1"
                fill="none"
              />
            </pattern>
            <pattern
              id="diagonal-pattern"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M0,8 l8,-8"
                stroke={colors.bar}
                strokeWidth="2"
                fill="none"
              />
            </pattern>
          </defs>
        </svg>

        <BarChart
          data={data}
          layout="vertical"
          margin={margin}
          barSize={barSize}
          accessibilityLayer
        >
          {showGrid && (
            <CartesianGrid
              horizontal
              vertical={false}
              stroke={colors.grid}
              strokeDasharray="3 3"
            />
          )}

          {showYAxis && (
            <YAxis
              type="category"
              dataKey={nameKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text }}
              width={120}
              {...yAxisProps}
            />
          )}

          {showXAxis && (
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: colors.text }}
              {...xAxisProps}
            />
          )}

          {showTooltip && (
            <ChartTooltip
              cursor={{ fill: "var(--color-muted)", opacity: 0.1 }}
              content={<ChartTooltipContent />}
            />
          )}

          <Bar dataKey={dataKey} radius={barRadius}>
            {data.map((entry, index) => {
              const pattern = entry.pattern;
              const fill =
                pattern === "stripe"
                  ? "url(#stripe-pattern)"
                  : pattern === "dots"
                  ? "url(#dots-pattern)"
                  : pattern === "zigzag"
                  ? "url(#zigzag-pattern)"
                  : pattern === "grid"
                  ? "url(#grid-pattern)"
                  : pattern === "diagonal"
                  ? "url(#diagonal-pattern)"
                  : colors.bar;

              return <Cell key={`cell-${index}`} fill={fill} />;
            })}
          </Bar>

          {showLegend && (
            <Legend verticalAlign="top" align="right" {...legendProps} />
          )}
        </BarChart>
      </>
    </ChartContainer>
  );
}
