"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface PolygonFillRadarChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function PolygonFillRadarChart({
  data = [
    { subject: "Math", A: 120, fullMark: 150 },
    { subject: "English", A: 110, fullMark: 150 },
    { subject: "History", A: 98, fullMark: 150 },
    { subject: "Physics", A: 99, fullMark: 150 },
    { subject: "Geography", A: 85, fullMark: 150 },
    { subject: "Biology", A: 65, fullMark: 150 },
  ],
  className,
}: PolygonFillRadarChartProps) {
  return (
    <ChartContainer
      config={{
        A: {
          label: "Student A",
          color: "hsl(var(--chart-1))",
        },
      }}
      className={`aspect-square min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Radar
            name="Student A"
            dataKey="A"
            stroke="var(--color-A)"
            fill="var(--color-A)"
            fillOpacity={0.6}
            dot
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
