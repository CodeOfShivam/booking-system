"use client";

import {
  Legend,
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

interface MultipleSeriesRadarChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
}

export function MultipleSeriesRadarChart({
  data = [
    { subject: "Math", A: 120, B: 110, fullMark: 150 },
    { subject: "English", A: 110, B: 130, fullMark: 150 },
    { subject: "History", A: 98, B: 100, fullMark: 150 },
    { subject: "Physics", A: 99, B: 90, fullMark: 150 },
    { subject: "Geography", A: 85, B: 85, fullMark: 150 },
    { subject: "Biology", A: 65, B: 85, fullMark: 150 },
  ],
  className,
}: MultipleSeriesRadarChartProps) {
  return (
    <ChartContainer
      config={{
        A: {
          label: "Student A",
          color: "hsl(var(--chart-1))",
        },
        B: {
          label: "Student B",
          color: "hsl(var(--chart-2))",
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
          />
          <Radar
            name="Student B"
            dataKey="B"
            stroke="var(--color-B)"
            fill="var(--color-B)"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
