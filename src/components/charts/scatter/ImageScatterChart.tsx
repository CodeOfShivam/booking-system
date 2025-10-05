"use client";

import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { useEffect, useRef } from "react";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ImageScatterChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
  imageUrl?: string;
}

export function ImageScatterChart({
  data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ],
  imageUrl = "/placeholder.svg?height=30&width=30",
  className,
}: ImageScatterChartProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    imgRef.current = new Image();
    imgRef.current.src = imageUrl;
    imgRef.current.crossOrigin = "anonymous";
  }, [imageUrl]);

  return (
    <ChartContainer
      config={{
        scatter: {
          label: "Data Points",
          color: "var(--chart-1)",
        },
      }}
      className={`min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="X Value" />
          <YAxis type="number" dataKey="y" name="Y Value" />
          <ZAxis type="number" dataKey="z" range={[60, 400]} name="Z Value" />
          <ChartTooltip
            cursor={{ strokeDasharray: "3 3" }}
            content={<ChartTooltipContent />}
          />
          <Scatter
            name="Data Points"
            data={data}
            fill="var(--color-scatter)"
            // shape={renderCustomShape}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
