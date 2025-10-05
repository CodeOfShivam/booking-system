"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RefreshCw } from "lucide-react";

interface ZoomableTimeChartProps {
  data: Array<Record<string, number | string>>;
  xKey: string;
  yKey: string;
  title?: string;
  height?: number;
  color?: string;
  xAxisFormatter?: (value: number | string) => string;
  yAxisFormatter?: (value: number | string) => string;
}

export function ZoomableTimeChart({
  data,
  xKey,
  yKey,
  title,
  height = 300,
  color = "var(--chart-1)",
  xAxisFormatter = (value) => String(value),
  yAxisFormatter = (value) => String(value),
}: ZoomableTimeChartProps) {
  const [refAreaLeft, setRefAreaLeft] = useState("");
  const [refAreaRight, setRefAreaRight] = useState("");
  const [zoomedData, setZoomedData] = useState(data);

  const handleMouseDown = (e: { activeLabel?: string | number }) => {
    if (e?.activeLabel) {
      setRefAreaLeft(String(e.activeLabel));
    }
  };

  const handleMouseMove = (e: { activeLabel?: string | number }) => {
    if (refAreaLeft && e?.activeLabel) {
      setRefAreaRight(String(e.activeLabel));
    }
  };

  const handleMouseUp = () => {
    if (refAreaLeft && refAreaRight) {
      // Ensure left is always less than right
      const left = Math.min(
        data.findIndex((item) => item[xKey] === refAreaLeft),
        data.findIndex((item) => item[xKey] === refAreaRight)
      );
      const right = Math.max(
        data.findIndex((item) => item[xKey] === refAreaLeft),
        data.findIndex((item) => item[xKey] === refAreaRight)
      );

      if (left !== right) {
        setZoomedData(data.slice(left, right + 1));
      }
    }

    setRefAreaLeft("");
    setRefAreaRight("");
  };

  const resetZoom = () => {
    setZoomedData(data);
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        {title && <h3 className="text-lg font-medium">{title}</h3>}
        <Button
          variant="outline"
          size="sm"
          onClick={resetZoom}
          className="ml-auto"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Zoom
        </Button>
      </div>
      <ChartContainer
        config={{
          [yKey]: {
            label: yKey,
            color: color,
          },
        }}
        className={`min-h-[${height}px] w-full`}
      >
        <LineChart
          data={zoomedData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={xAxisFormatter}
            allowDataOverflow
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={yAxisFormatter}
            allowDataOverflow
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={`var(--color-${yKey})`}
            strokeWidth={2}
            dot={{
              r: 4,
              fill: `var(--color-${yKey})`,
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
              fill: `var(--color-${yKey})`,
              strokeWidth: 0,
            }}
          />
          {refAreaLeft && refAreaRight && (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
              fill="var(--primary)"
              fillOpacity={0.1}
            />
          )}
        </LineChart>
      </ChartContainer>
      <p className="text-center text-sm text-muted-foreground">
        Click and drag to zoom in on a specific area
      </p>
    </div>
  );
}
