"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const offcanvasVariants = cva(
  "fixed z-50 flex flex-col bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto ",
  {
    variants: {
      placement: {
        left: "inset-y-0 left-0 h-full max-w-xs w-full -translate-x-full data-[state=open]:translate-x-0",
        right:
          "inset-y-0 right-0 h-full max-w-xs w-full translate-x-full data-[state=open]:translate-x-0",
        top: "inset-x-0 top-0 w-full max-h-xs h-full -translate-y-full data-[state=open]:translate-y-0",
        bottom:
          "inset-x-0 bottom-0 w-full max-h-xs h-full translate-y-full data-[state=open]:translate-y-0",
      },
      size: {
        sm: "max-w-sm max-h-sm",
        md: "max-w-md max-h-md",
        lg: "max-w-lg max-h-lg",
        xl: "max-w-xl max-h-xl",
        full: "max-w-full max-h-full",
      },
    },
    defaultVariants: {
      placement: "right",
      size: "md",
    },
  }
);

const backdropVariants = cva(
  "fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out",
  {
    variants: {
      opacity: {
        light: "bg-opacity-25",
        medium: "bg-opacity-50",
        dark: "bg-opacity-75",
      },
    },
    defaultVariants: {
      opacity: "medium",
    },
  }
);

export interface OffcanvasProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof offcanvasVariants> {
  open?: boolean;
  onClose?: () => void;
  showBackdrop?: boolean;
  backdropOpacity?: "light" | "medium" | "dark";
  closeOnBackdropClick?: boolean;
  showCloseButton?: boolean;
  closeButtonClassName?: string;
}

const Offcanvas = React.forwardRef<HTMLDivElement, OffcanvasProps>(
  (
    {
      className,
      children,
      open = false,
      onClose,
      placement = "right",
      size = "md",
      showBackdrop = true,
      backdropOpacity = "medium",
      closeOnBackdropClick = true,
      showCloseButton = true,
      closeButtonClassName,
      ...props
    },
    ref
  ) => {
    // Handle ESC key to close the offcanvas
    React.useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (open && event.key === "Escape" && onClose) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscKey);

      // Prevent scrolling when offcanvas is open
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.removeEventListener("keydown", handleEscKey);
        document.body.style.overflow = "";
      };
    }, [open, onClose]);

    // Handle backdrop click
    const handleBackdropClick = () => {
      if (closeOnBackdropClick && onClose) {
        onClose();
      }
    };

    if (!open) {
      return null;
    }

    return (
      <>
        {showBackdrop && (
          <div
            className={cn(
              backdropVariants({ opacity: backdropOpacity }),
              "opacity-0 data-[state=open]:opacity-100"
            )}
            data-state={open ? "open" : "closed"}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}
        <div
          ref={ref}
          className={cn(offcanvasVariants({ placement, size }), className)}
          data-state={open ? "open" : "closed"}
          {...props}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className={cn(
                "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                closeButtonClassName
              )}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
          {children}
        </div>
      </>
    );
  }
);
Offcanvas.displayName = "Offcanvas";

export { Offcanvas, offcanvasVariants, backdropVariants };
