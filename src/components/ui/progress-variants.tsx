"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  height?: "sm" | "md" | "lg" | number;
  color?: string;
  showLabel?: boolean;
  labelPosition?: "inside" | "outside";
  striped?: boolean;
  animated?: boolean;
  steps?: number;
  multiple?: { value: number; color: string }[];
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      height = "md",
      color = "bg-primary",
      showLabel = false,
      labelPosition = "outside",
      striped = false,
      animated = false,
      steps,
      multiple,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    const heightClass =
      height === "sm"
        ? "h-2"
        : height === "md"
        ? "h-4"
        : height === "lg"
        ? "h-6"
        : typeof height === "number"
        ? `h-[${height}px]`
        : "h-4";

    // For stepped progress
    const renderSteps = () => {
      if (!steps || steps <= 1) return null;

      const stepsArray = Array.from({ length: steps }, (_, i) => i + 1);
      const stepPercentage = 100 / steps;

      return (
        <div className="absolute inset-0 flex">
          {stepsArray.map((step, index) => (
            <div
              key={index}
              className={cn(
                "h-full flex-1 border-r last:border-r-0 border-background/30",
                percentage >= stepPercentage * index
                  ? "bg-primary/20"
                  : "bg-transparent"
              )}
            />
          ))}
        </div>
      );
    };

    // For striped effect
    const stripedClass = striped
      ? "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-size-[1rem_1rem]"
      : "";

    // For animated stripes
    const animatedClass =
      animated && striped
        ? "animate-[progress-bar-stripes_1s_linear_infinite]"
        : "";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <div
          className="relative w-full overflow-hidden rounded-full"
          style={{
            height: typeof height === "number" ? `${height}px` : undefined,
          }}
        >
          {steps && steps > 1 ? renderSteps() : null}

          {multiple ? (
            <div className="flex h-full w-full">
              {multiple.map((item, index) => {
                const itemPercentage = Math.min(
                  Math.max(0, (item.value / max) * 100),
                  100
                );
                return (
                  <div
                    key={index}
                    className={cn(
                      "h-full transition-all",
                      stripedClass,
                      animatedClass
                    )}
                    style={{
                      width: `${itemPercentage}%`,
                      backgroundColor: item.color,
                    }}
                  >
                    {showLabel && labelPosition === "inside" && (
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {Math.round(itemPercentage)}%
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className={cn(
                "h-full w-full flex-1 transition-all",
                color,
                stripedClass,
                animatedClass,
                heightClass
              )}
              style={{
                width: `${percentage}%`,
                backgroundColor: color.startsWith("bg-") ? undefined : color,
              }}
            >
              {showLabel && labelPosition === "inside" && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  {Math.round(percentage)}%
                </span>
              )}
            </div>
          )}
        </div>

        {showLabel && labelPosition === "outside" && (
          <div className="mt-1 text-right text-sm">
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";
