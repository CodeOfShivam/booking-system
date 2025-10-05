import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className={cn(
        // Base layout
        "flex  w-full rounded-sm border border-border bg-background text-sm text-foreground transition-all duration-200 ease-in-out",
        // Padding
        "px-4 py-2",
        // Placeholder style
        "placeholder:text-muted-foreground",
        // Hover state
        "hover:border-primary/70 hover:shadow-sm",
        // Focus state - smooth border + glow
        "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
        // Dark mode adjustments
        "dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50",
        // File input styling
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
    />
  );
});

Input.displayName = "Input";

export { Input };
