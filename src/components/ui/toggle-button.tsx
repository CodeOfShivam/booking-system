"use client";

import type React from "react";

import { useState, forwardRef, type ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariantsExtended } from "./button-variants";

interface ToggleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariantsExtended> {
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  activeClassName?: string;
}

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      defaultPressed = false,
      onPressedChange,
      activeClassName = "bg-accent text-accent-foreground",
      children,
      ...props
    },
    ref
  ) => {
    const [pressed, setPressed] = useState(defaultPressed);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const newPressed = !pressed;
      setPressed(newPressed);
      props.onClick?.(e);
      onPressedChange?.(newPressed);
    };

    return (
      <button
        type="button"
        aria-pressed={pressed}
        className={cn(
          buttonVariantsExtended({ variant, size }),
          pressed && activeClassName,
          className
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
ToggleButton.displayName = "ToggleButton";

export { ToggleButton };
