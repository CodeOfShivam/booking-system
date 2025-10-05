"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { XAxisProps, YAxisProps } from "recharts";

export type ImageFillDataPoint = {
  name: string;
  value: number;
  [key: string]: unknown;
};

export interface ImageFillHorizontalBarChartProps {
  data: ImageFillDataPoint[];
  dataKey?: string;
  nameKey?: string;
  imageUrl: string;
  height?: number | string;
  // Removed unused width prop:
  // width?: number | string
  className?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  barSize?: number;
  barRadius?: number;
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  colors?: {
    fallback?: string;
    grid?: string;
    text?: string;
  };
  xAxisProps?: Partial<XAxisProps>;
  yAxisProps?: Partial<YAxisProps>;
  tooltipContent?: ReactNode;
  accessibilityLabel?: string;
}

export function ImageFillHorizontalBarChart({
  data,
  dataKey = "value",
  nameKey = "name",
  imageUrl,
  height = 400,
  // width,  <-- removed unused
  className,
  showGrid = true,
  showTooltip = true,
  showXAxis = true,
  showYAxis = true,
  barSize,
  barRadius = 4,
  margin = { top: 5, right: 30, left: 20, bottom: 5 },
  colors = {
    fallback: "var(--color-chart-1)",
    grid: "var(--color-border)",
    text: "var(--color-foreground)",
  },
  xAxisProps = {},
  yAxisProps = {},
  accessibilityLabel = "Horizontal bar chart with image fill",
}: ImageFillHorizontalBarChartProps) {
  const chartConfig = {
    [dataKey]: {
      label: dataKey,
      color: colors.fallback,
    },
  };

  const patternRef = useRef<SVGPatternElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!patternRef.current) return;

    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      imageRef.current = img;
    };
  }, [imageUrl]);

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
              id="image-pattern"
              patternUnits="objectBoundingBox"
              width={1}
              height={1}
              ref={patternRef}
            >
              <image
                href={imageUrl}
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
                crossOrigin="anonymous"
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
              horizontal={true}
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
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#image-pattern)" />
            ))}
          </Bar>
        </BarChart>
      </>
    </ChartContainer>
  );
}
