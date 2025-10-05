"use client";

import { ResponsiveContainer, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";

interface SparklineProps {
  data: number[];
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  fillOpacity?: number;
  className?: string;
}

export default function Sparkline({
  data,
  height = 48,
  stroke = "hsl(142, 71%, 45%)", // default green
  strokeWidth = 2,
  fillOpacity = 0.08,
  className,
}: SparklineProps) {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div
      className={cn(
        "w-full rounded-md bg-white dark:bg-neutral-900 p-1",
        className
      )}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={fillOpacity} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={strokeWidth}
            fill="url(#sparklineGradient)"
            isAnimationActive={true}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
