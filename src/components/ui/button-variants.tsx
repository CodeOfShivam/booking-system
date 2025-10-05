"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Extended button variants
const buttonVariantsExtended = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // Custom variants
        rounded:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
        "outline-rounded":
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-full",
        soft: "bg-primary/10 text-primary hover:bg-primary/20",
        "soft-rounded":
          "bg-primary/10 text-primary hover:bg-primary/20 rounded-full",
        gradient:
          "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600",
        "gradient-rounded":
          "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-full",
        "ghost-rounded":
          "hover:bg-accent hover:text-accent-foreground rounded-full",
        basic:
          "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        block: "h-10 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsExtended> {
  asChild?: boolean;
}

const ButtonExtended = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariantsExtended({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

ButtonExtended.displayName = "ButtonExtended";

export { ButtonExtended, buttonVariantsExtended };
