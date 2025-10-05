"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Use more specific union types for axis value instead of any
type AxisValue = string | number | Date | undefined;

interface Annotation {
  type: "dot" | "line";
  axis: "x" | "y";
  value: AxisValue;
  label?: string;
  color?: string;
}

interface AnnotatedLineChartProps<T extends Record<string, AxisValue>> {
  data: T[];
  xKey: keyof T;
  yKey: keyof T;
  annotations?: Annotation[];
  title?: string;
  height?: number;
  color?: string;
  xAxisFormatter?: (value: AxisValue) => string;
  yAxisFormatter?: (value: AxisValue) => string;
}

export function AnnotatedLineChart<T extends Record<string, AxisValue>>({
  data,
  xKey,
  yKey,
  annotations = [],
  title,
  height = 300,
  color = "var(--chart-1)",
  xAxisFormatter = (value) => String(value ?? ""),
  yAxisFormatter = (value) => String(value ?? ""),
}: AnnotatedLineChartProps<T>) {
  return (
    <div className="w-full space-y-2">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      <ChartContainer
        config={{
          [String(yKey)]: {
            label: String(yKey),
            color: color,
          },
        }}
        className={`min-h-[${height}px] w-full`}
      >
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={String(xKey)}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisFormatter}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={yAxisFormatter}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey={String(yKey)}
            stroke={`var(--color-${String(yKey)})`}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: `var(--color-${String(yKey)})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: `var(--color-${String(yKey)})`,
              strokeWidth: 0,
            }}
          />

          {annotations.map((annotation, index) => {
            if (annotation.type === "dot") {
              return (
                <ReferenceDot
                  key={`dot-${index}`}
                  x={
                    annotation.axis === "x"
                      ? (annotation.value as string | number | undefined)
                      : undefined
                  }
                  y={
                    annotation.axis === "y"
                      ? (annotation.value as string | number | undefined)
                      : undefined
                  }
                  r={6}
                  fill={annotation.color || "var(--destructive)"}
                  stroke="none"
                  label={annotation.label}
                />
              );
            } else {
              return (
                <ReferenceLine
                  key={`line-${index}`}
                  x={
                    annotation.axis === "x"
                      ? annotation.value instanceof Date
                        ? annotation.value.getTime()
                        : annotation.value
                      : undefined
                  }
                  y={
                    annotation.axis === "y"
                      ? annotation.value instanceof Date
                        ? annotation.value.getTime()
                        : annotation.value
                      : undefined
                  }
                  stroke={annotation.color || "var(--destructive)"}
                  strokeDasharray="3 3"
                  label={annotation.label}
                />
              );
            }
          })}
        </LineChart>
      </ChartContainer>
    </div>
  );
}
