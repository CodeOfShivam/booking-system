import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const placeholderVariants = cva(
  "block rounded relative overflow-hidden bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        primary: "bg-primary/20",
        destructive: "bg-destructive/20",
        success: "bg-green-100 dark:bg-green-900/20",
      },
      size: {
        sm: "h-4",
        md: "h-6",
        lg: "h-8",
        xl: "h-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        shimmer:
          "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
      },
      rounded: {
        default: "rounded",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animation: "none",
      width: "full",
      rounded: "default",
    },
  }
);

export interface PlaceholderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof placeholderVariants> {}

const Placeholder = React.forwardRef<HTMLDivElement, PlaceholderProps>(
  ({ className, variant, size, animation, width, rounded, ...props }, ref) => {
    return (
      <div
        className={cn(
          placeholderVariants({
            variant,
            size,
            animation,
            width,
            rounded,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Placeholder.displayName = "Placeholder";

export { Placeholder, placeholderVariants };
