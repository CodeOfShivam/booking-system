"use client";

import {
  Cell,
  Funnel,
  FunnelChart as RechartsFunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface FunnelDataItem {
  name: string;
  value: number;
  fill: string;
}

interface FunnelChartProps {
  data?: FunnelDataItem[];
  className?: string;
}

export function FunnelChart({ data = [], className }: FunnelChartProps) {
  return (
    <ChartContainer
      config={{
        awareness: {
          label: "Awareness",
          color: "var(--chart-1)",
        },
        interest: {
          label: "Interest",
          color: "var(--chart-2)",
        },
        consideration: {
          label: "Consideration",
          color: "var(--chart-3)",
        },
        purchase: {
          label: "Purchase",
          color: "var(--chart-4)",
        },
        loyalty: {
          label: "Loyalty",
          color: "var(--chart-5)",
        },
      }}
      className={`min-h-[300px] ${className}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsFunnelChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList
              position="right"
              dataKey="name"
              fill="var(--foreground)"
              stroke="none"
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Funnel>
        </RechartsFunnelChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
