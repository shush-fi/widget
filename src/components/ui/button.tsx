import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "sh-w-inline-flex sh-w-items-center sh-w-justify-center sh-w-whitespace-nowrap sh-w-rounded-md sh-w-text-sm sh-w-font-medium sh-w-ring-offset-background sh-w-transition-colors focus-visible:sh-w-outline-none focus-visible:sh-w-ring-2 focus-visible:sh-w-ring-ring focus-visible:sh-w-ring-offset-2 disabled:sh-w-pointer-events-none disabled:sh-w-opacity-50",
  {
    variants: {
      variant: {
        default:
          "sh-w-bg-primary sh-w-text-primary-foreground hover:sh-w-bg-primary/90",
        destructive:
          "sh-w-bg-destructive sh-w-text-destructive-foreground hover:sh-w-bg-destructive/90",
        outline:
          "sh-w-border sh-w-border-input sh-w-bg-background hover:sh-w-bg-accent hover:sh-w-text-accent-foreground",
        secondary:
          "sh-w-bg-secondary sh-w-text-secondary-foreground hover:sh-w-bg-secondary/80",
        ghost: "hover:sh-w-bg-accent hover:sh-w-text-accent-foreground",
        link: "sh-w-text-primary sh-w-underline-offset-4 hover:sh-w-underline",
      },
      size: {
        default: "sh-w-h-10 sh-w-px-4 sh-w-py-2",
        sm: "sh-w-h-9 sh-w-rounded-md sh-w-px-3",
        lg: "sh-w-h-11 sh-w-rounded-md sh-w-px-8",
        icon: "sh-w-h-10 sh-w-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {loading && (
          <svg
            className="sh-w-animate-spin sh-w-h-4 sh-w-w-4 sh-w-mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="sh-w-opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="sh-w-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button"

export { Button, buttonVariants }
