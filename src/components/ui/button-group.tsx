import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  vertical?: boolean;
  attached?: boolean;
}

export function ButtonGroup({
  children,
  className,
  vertical = false,
  attached = true,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex",
        vertical ? "flex-col" : "flex-row",
        attached
          ? vertical
            ? "space-y-0"
            : "space-x-0"
          : vertical
          ? "space-y-2"
          : "space-x-2",
        attached &&
          (vertical
            ? "[&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none [&>button:not(:last-child)]:border-b-0"
            : "[&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:last-child)]:border-r-0"),
        className
      )}
      role="group"
      aria-label="Button group"
      {...props}
    >
      {children}
    </div>
  );
}
