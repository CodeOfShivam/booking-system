"use client";

import {
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface PyramidDataItem {
  name: string;
  value: number;
  fill: string;
}

interface PyramidChartProps {
  data?: PyramidDataItem[];
  className?: string;
}

export function PyramidChart({ data = [], className }: PyramidChartProps) {
  return (
    <ChartContainer
      config={{
        basic: {
          label: "Basic",
          color: "var(--chart-1)",
        },
        intermediate: {
          label: "Intermediate",
          color: "var(--chart-2)",
        },
        advanced: {
          label: "Advanced",
          color: "var(--chart-3)",
        },
        expert: {
          label: "Expert",
          color: "var(--chart-4)",
        },
        master: {
          label: "Master",
          color: "var(--chart-5)",
        },
      }}
      className={`min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList dataKey="name" fill="var(--foreground)" stroke="none" />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
