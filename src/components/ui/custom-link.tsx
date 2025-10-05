"use client";

import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-primary hover:text-primary/80",
        destructive: "text-destructive hover:text-destructive/80",
        muted: "text-muted-foreground hover:text-foreground",
        accent: "text-accent-foreground hover:text-accent-foreground/80",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      textStyle: {
        normal: "",
        italic: "italic",
      },
      opacity: {
        "100": "opacity-100",
        "90": "opacity-90",
        "75": "opacity-75",
        "50": "opacity-50",
      },
      hoverOpacity: {
        100: "hover:opacity-100",
        90: "hover:opacity-90",
        75: "hover:opacity-75",
        50: "hover:opacity-50",
      },
      underline: {
        none: "no-underline",
        default: "underline",
        hover: "no-underline hover:underline",
        always: "underline hover:no-underline",
      },
      underlineColor: {
        default: "decoration-current",
        primary: "decoration-primary",
        secondary: "decoration-secondary",
        accent: "decoration-accent",
        destructive: "decoration-destructive",
      },
      underlineOpacity: {
        100: "decoration-opacity-100",
        90: "decoration-opacity-90",
        75: "decoration-opacity-75",
        50: "decoration-opacity-50",
      },
      underlineOffset: {
        auto: "underline-offset-auto",
        1: "underline-offset-1",
        2: "underline-offset-2",
        4: "underline-offset-4",
        8: "underline-offset-8",
      },
      hoverEffect: {
        none: "",
        background:
          "hover:bg-accent hover:text-accent-foreground rounded-sm px-2 py-1 -mx-2 -my-1",
        scale: "hover:scale-105 transition-transform",
        glow: "hover:text-primary hover:drop-shadow-[0_0_0.5rem_theme(colors.primary.DEFAULT)]",
      },
    },
    defaultVariants: {
      variant: "default",
      weight: "normal",
      textStyle: "normal",
      opacity: "100",
      hoverOpacity: 100,
      underline: "none",
      underlineColor: "default",
      underlineOpacity: 100,
      underlineOffset: "auto",
      hoverEffect: "none",
    },
  }
);

export interface CustomLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  className?: string;
  color?: string;
  external?: boolean;
}

const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (
    {
      className,
      href,
      variant,
      weight,
      textStyle,
      opacity,
      hoverOpacity,
      underline,
      underlineColor,
      underlineOpacity,
      underlineOffset,
      hoverEffect,
      color,
      external = false,
      ...props
    },
    ref
  ) => {
    // Custom color style if provided
    const customColorStyle = color ? { color } : {};

    // Determine if the link is external
    const isExternal = external || href.startsWith("http");

    // External link props
    const externalProps = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <Link
        className={cn(
          linkVariants({
            variant,
            weight,
            textStyle,
            opacity,
            hoverOpacity,
            underline,
            underlineColor,
            underlineOpacity,
            underlineOffset,
            hoverEffect,
            className,
          })
        )}
        style={customColorStyle}
        href={href}
        ref={ref}
        {...externalProps}
        {...props}
      />
    );
  }
);
CustomLink.displayName = "CustomLink";

export { CustomLink, linkVariants };
