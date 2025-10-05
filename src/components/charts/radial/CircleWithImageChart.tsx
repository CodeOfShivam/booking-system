"use client";

import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import Image from "next/image";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CircleWithImageChartProps {
  data?: Array<Record<string, number | string>>;
  className?: string;
  imageUrl?: string;
}

export function CircleWithImageChart({
  data = [{ name: "A", value: 80, fill: "var(--color-A)" }],
  imageUrl = "/placeholder.svg?height=100&width=100",
  className,
}: CircleWithImageChartProps) {
  return (
    <ChartContainer
      config={{
        A: {
          label: "Completion",
          color: "hsl(var(--chart-1))",
        },
      }}
      className={`aspect-square min-h-[300px] relative ${className}`}
    >
      <>
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="rounded-full overflow-hidden w-16 h-16">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt="Center image"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="60%"
            outerRadius="90%"
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar background dataKey="value" cornerRadius={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </>
    </ChartContainer>
  );
}
