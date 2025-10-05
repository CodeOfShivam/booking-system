"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type DynamicColumnChartProps = {
  generateData?: () => { category: string; value: number }[]; // Data generator function
  refreshInterval?: number; // Interval in milliseconds
  chartConfig?: {
    value: {
      label: string;
      color: string;
    };
  };
  barSize?: number;
  animationDuration?: number;
};

const defaultGenerateData = () => {
  const categories = [
    "Category A",
    "Category B",
    "Category C",
    "Category D",
    "Category E",
    "Category F",
  ];
  return categories.map((category) => ({
    category,
    value: Math.floor(Math.random() * 1000) + 200,
  }));
};

export default function DynamicColumnChart({
  generateData = defaultGenerateData,
  refreshInterval = 30000,
  chartConfig = {
    value: {
      label: "Value",
      color: "var(--chart-4)",
    },
  },
  barSize = 40,
  animationDuration = 500,
}: DynamicColumnChartProps) {
  const [data, setData] = useState(generateData());
  const [loading, setLoading] = useState(false);

  const refreshData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setData(generateData());
      setLoading(false);
    }, 1000);
  }, [generateData]);

  useEffect(() => {
    // Initial data load
    refreshData();

    // Refresh data every interval
    const interval = setInterval(refreshData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshData, refreshInterval]);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={refreshData}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </Button>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ShadcnChartContainer
            config={{
              value: {
                label: chartConfig.value.label,
                color: chartConfig.value.color,
              },
            }}
          >
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Bar
                dataKey="value"
                fill={chartConfig.value.color}
                radius={[4, 4, 0, 0]}
                barSize={barSize}
                animationDuration={animationDuration}
              />
            </BarChart>
          </ShadcnChartContainer>
        </ResponsiveContainer>
      </div>
    </>
  );
}
