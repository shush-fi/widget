import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "sh-w-flex sh-w-h-10 sh-w-w-full sh-w-rounded-md sh-w-border sh-w-bg-background sh-w-px-3 sh-w-py-2 sh-w-text-sm sh-w-ring-offset-background file:sh-w-border-0 file:sh-w-bg-transparent file:sh-w-text-sm file:sh-w-font-medium placeholder:sh-w-text-muted-foreground focus-visible:sh-w-outline-none disabled:sh-w-cursor-not-allowed disabled:sh-w-opacity-50",
          { "sh-w-border-destructive": error,
          "sh-w-border-input": !error},
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  }
)

Input.displayName = "Input"

export { Input }
